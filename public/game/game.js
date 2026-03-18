var COLORS={
  red:    {bg:'#ef4444',lt:'rgba(239,68,68,0.62)',   glow:'rgba(239,68,68,0.28)'},
  orange: {bg:'#f97316',lt:'rgba(249,115,22,0.62)',  glow:'rgba(249,115,22,0.28)'},
  yellow: {bg:'#eab308',lt:'rgba(234,179,8,0.62)',   glow:'rgba(234,179,8,0.28)'},
  green:  {bg:'#22c55e',lt:'rgba(34,197,94,0.62)',   glow:'rgba(34,197,94,0.28)'},
  teal:   {bg:'#14b8a6',lt:'rgba(20,184,166,0.62)',  glow:'rgba(20,184,166,0.28)'},
  blue:   {bg:'#3b82f6',lt:'rgba(59,130,246,0.62)',  glow:'rgba(59,130,246,0.28)'},
  violet: {bg:'#8b5cf6',lt:'rgba(139,92,246,0.62)',  glow:'rgba(139,92,246,0.28)'},
  pink:   {bg:'#ec4899',lt:'rgba(236,72,153,0.62)',  glow:'rgba(236,72,153,0.28)'},
  lime:   {bg:'#84cc16',lt:'rgba(132,204,22,0.62)',  glow:'rgba(132,204,22,0.28)'},
  brown:  {bg:'#a16207',lt:'rgba(161,98,7,0.62)',    glow:'rgba(161,98,7,0.28)'},
  indigo: {bg:'#6366f1',lt:'rgba(99,102,241,0.62)',  glow:'rgba(99,102,241,0.28)'},
  rose:   {bg:'#e11d48',lt:'rgba(225,29,72,0.62)',   glow:'rgba(225,29,72,0.28)'}
};

var COLOR_KEYS=Object.keys(COLORS);
var TOTAL_LEVELS=40;

var EARLY_LEVELS=[
  {seg:2,e:1,b:[['red','blue'],['blue','red'],[]],meta:{colors:2}},
  {seg:2,e:1,b:[['red','blue'],['red','blue'],[]],meta:{colors:2}},
  {seg:2,e:2,b:[['red','green'],['blue','red'],['green','blue'],[]],meta:{colors:3}}
];
var LDEFS=buildLevelDefs(TOTAL_LEVELS);

/* World config */
var WORLDS=[
  {name:'World 1',emoji:'🌊',diff:'Starter',color:'#3b82f6',from:0,to:9},
  {name:'World 2',emoji:'🌿',diff:'Intermediate',color:'#10b981',from:10,to:19},
  {name:'World 3',emoji:'🔮',diff:'Advanced',color:'#8b5cf6',from:20,to:29},
  {name:'World 4',emoji:'⚡',diff:'Expert',color:'#f59e0b',from:30,to:39}
];

var CATALOG=[
  {id:'tube',  name:'Extra Tube',   desc:'Add one empty tube to the puzzle',   price:20,type:'consumable'},
  {id:'undos', name:'Undo Pack x5', desc:'Get 5 extra undos on top of normal', price:15,type:'consumable'},
  {id:'hint',  name:'Hint',         desc:'Highlights a valid pour move',        price:25,type:'consumable'},
  {id:'magic', name:'Magic Step',   desc:'Performs one optimal pour for you',   price:30,type:'consumable'},
  {id:'boost', name:'Coin Boost',   desc:'Earn 2x coins for the next 5 levels',price:50,type:'upgrade',maxOwn:1}
];

var S={coins:50,inv:{tube:0,undos:0,hint:0,magic:0},upg:{boost:0},lvls:{},streak:0,cur:0,sound:true};
var bottles=[],sel=null,moves=0,hist=[],usedUndo=false,hintFrom=-1,hintTo=-1;
var TSEG=4; /* current level seg count — set per level */
var audioCtx=null;
var musicStep=0;
var musicTimer=null;

function save(){try{localStorage.setItem('mgs5',JSON.stringify(S));}catch(e){}}
function load(){
  try{
    var raw=localStorage.getItem('mgs5');
    if(raw){
      var p=JSON.parse(raw);
      S.coins=p.coins!==undefined?p.coins:S.coins;
      S.inv=Object.assign(S.inv,p.inv||{});
      S.upg=Object.assign(S.upg,p.upg||{});
      S.lvls=p.lvls||{};
      S.streak=p.streak||0;
      S.cur=p.cur||0;
      if(typeof p.sound==='boolean')S.sound=p.sound;
    }
  }catch(e){}
  if(!S.lvls[0])S.lvls[0]={done:false};
}

function buildLevelDefs(total){
  var defs=[];
  for(var i=0;i<total;i++)defs.push(makeLevelDef(i));
  return defs;
}

function makeLevelDef(idx){
  if(idx<EARLY_LEVELS.length){
    var early=EARLY_LEVELS[idx];
    return {seg:early.seg,e:early.e,b:cloneBottles(early.b),meta:early.meta};
  }
  var seg=getSegCount(idx);
  var colorCount=getColorCount(idx);
  var empties=getEmptyBottleCount(idx,seg,colorCount);
  var colors=pickColors(colorCount,idx);
  var seed=(idx+1)*9173;
  return {seg:seg,e:empties,b:createPuzzle(colors,seg,empties,seed),meta:{colors:colorCount}};
}

function getSegCount(idx){
  if(idx<3)return 2;
  if(idx<6)return 3;
  if(idx<12)return 4;
  if(idx<22)return 5;
  return 6;
}

function getColorCount(idx){
  if(idx===0)return 2;
  if(idx===1)return 2;
  if(idx===2)return 3;
  return Math.min(COLOR_KEYS.length,idx);
}

function getEmptyBottleCount(idx,seg,colorCount){
  var base=2;
  if(idx>=2)base=3;
  if(seg>=5||colorCount>=8)base=4;
  if(seg>=6&&colorCount>=10)base=5;
  return base;
}

function pickColors(count,idx){
  var colors=[];
  var start=(idx*3)%COLOR_KEYS.length;
  for(var i=0;i<count;i++)colors.push(COLOR_KEYS[(start+i)%COLOR_KEYS.length]);
  return colors;
}

function createPuzzle(colors,seg,empties,seed){
  var attempt=0;
  while(attempt<120){
    var rng=makeRng(seed+attempt*97);
    var units=[];
    colors.forEach(function(color){for(var i=0;i<seg;i++)units.push(color);});
    shuffle(units,rng);
    var result=[];
    var cursor=0;
    for(var bottle=0;bottle<colors.length;bottle++){
      result.push(units.slice(cursor,cursor+seg));
      cursor+=seg;
    }
    for(var e=0;e<empties;e++)result.push([]);
    if(isPlayableOpening(result,seg)&&isInteresting(result,seg))return result;
    attempt++;
  }
  return fallbackPuzzle(colors,seg,empties);
}

function isPlayableOpening(layout,seg){
  var solved=0,moves=0;
  for(var i=0;i<layout.length;i++){
    var bottle=layout[i];
    if(!bottle.length)continue;
    if(bottle.length===seg&&bottle.every(function(color){return color===bottle[0];}))solved++;
    for(var j=0;j<layout.length;j++)if(i!==j&&canPourState(layout,seg,i,j))moves++;
  }
  return solved===0&&moves>=2;
}

function isInteresting(layout,seg){
  var mixed=0;
  for(var i=0;i<layout.length;i++){
    var bottle=layout[i];
    if(!bottle.length)continue;
    var unique={};
    bottle.forEach(function(color){unique[color]=true;});
    if(Object.keys(unique).length>1)mixed++;
  }
  return mixed>=Math.max(2,Math.floor(layout.length/3));
}

function fallbackPuzzle(colors,seg,empties){
  var layout=[];
  var rows=[];
  for(var c=0;c<colors.length;c++)rows.push([]);
  for(var layer=0;layer<seg;layer++)for(var i=0;i<colors.length;i++)rows[(i+layer)%colors.length].push(colors[i]);
  rows.forEach(function(row){layout.push(row);});
  for(var e=0;e<empties;e++)layout.push([]);
  return layout;
}

function makeRng(seed){
  var s=seed%2147483647;
  if(s<=0)s+=2147483646;
  return function(){
    s=s*16807%2147483647;
    return (s-1)/2147483646;
  };
}

function shuffle(arr,rng){
  for(var i=arr.length-1;i>0;i--){
    var j=Math.floor(rng()*(i+1));
    var temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
  }
}

function cloneBottles(list){
  return list.map(function(bottle){return bottle.slice();});
}

function snapshot(){
  return cloneBottles(bottles);
}

function getAudio(){
  if(!S.sound)return null;
  if(!audioCtx){
    var Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return null;
    audioCtx=new Ctx();
  }
  if(audioCtx.state==='suspended')audioCtx.resume();
  ensureAmbientMusic();
  return audioCtx;
}

function playTone(freq,start,duration,type,volume,detune){
  var ctx=getAudio();
  if(!ctx)return;
  var osc=ctx.createOscillator();
  var gain=ctx.createGain();
  osc.type=type||'square';
  osc.frequency.setValueAtTime(freq,ctx.currentTime+start);
  if(detune)osc.detune.setValueAtTime(detune,ctx.currentTime+start);
  gain.gain.setValueAtTime(0.0001,ctx.currentTime+start);
  gain.gain.exponentialRampToValueAtTime(volume||0.05,ctx.currentTime+start+0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+start+duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime+start);
  osc.stop(ctx.currentTime+start+duration+0.03);
}

function ensureAmbientMusic(){
  if(!S.sound||musicTimer)return;
  musicStep=0;
  musicTimer=window.setInterval(playAmbientBar,2600);
  playAmbientBar();
}

function stopAmbientMusic(){
  if(musicTimer){
    window.clearInterval(musicTimer);
    musicTimer=null;
  }
}

function playAmbientBar(){
  if(!S.sound)return;
  var progressions=[[220,277.18,329.63,392],[246.94,311.13,369.99,440],[196,246.94,293.66,392],[174.61,220,261.63,349.23]];
  var notes=progressions[musicStep%progressions.length];
  musicStep++;
  scheduleTone(notes[0],0,1.9,'triangle',0.008);
  scheduleTone(notes[1],0.18,1.5,'sine',0.006);
  scheduleTone(notes[2],0.62,1.1,'triangle',0.005);
  scheduleTone(notes[3],1.12,0.8,'square',0.004,-4);
}

function scheduleTone(freq,start,duration,type,volume,detune){
  var ctx=getAudio();
  if(!ctx)return;
  var osc=ctx.createOscillator();
  var gain=ctx.createGain();
  osc.type=type||'square';
  osc.frequency.setValueAtTime(freq,ctx.currentTime+start);
  if(detune)osc.detune.setValueAtTime(detune,ctx.currentTime+start);
  gain.gain.setValueAtTime(0.0001,ctx.currentTime+start);
  gain.gain.exponentialRampToValueAtTime(volume||0.05,ctx.currentTime+start+0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+start+duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime+start);
  osc.stop(ctx.currentTime+start+duration+0.03);
}

var SFX={
  tap:function(){playTone(660,0,0.05,'square',0.03);playTone(880,0.04,0.06,'square',0.025);},
  select:function(){playTone(523,0,0.06,'triangle',0.04);playTone(659,0.05,0.07,'square',0.03);},
  pour:function(){playTone(587,0,0.05,'triangle',0.025);playTone(784,0.04,0.08,'square',0.02);},
  error:function(){playTone(220,0,0.07,'sawtooth',0.03);playTone(196,0.06,0.12,'square',0.025);},
  undo:function(){playTone(660,0,0.06,'square',0.03);playTone(494,0.05,0.08,'triangle',0.028);},
  reset:function(){playTone(330,0,0.08,'square',0.03);playTone(247,0.06,0.1,'triangle',0.028);},
  hint:function(){playTone(784,0,0.05,'square',0.025);playTone(988,0.04,0.06,'square',0.022);playTone(1175,0.08,0.08,'triangle',0.02);},
  magic:function(){playTone(523,0,0.05,'triangle',0.025);playTone(784,0.05,0.06,'square',0.024);playTone(1047,0.1,0.11,'square',0.02);},
  complete:function(){playTone(659,0,0.06,'square',0.03);playTone(784,0.05,0.06,'square',0.028);playTone(988,0.11,0.08,'triangle',0.025);},
  coin:function(){playTone(988,0,0.04,'square',0.025);playTone(1319,0.04,0.1,'triangle',0.03);},
  win:function(){var notes=[523,659,784,1047];for(var i=0;i<notes.length;i++)playTone(notes[i],i*0.07,0.09,'square',0.028);playTone(1319,0.32,0.18,'triangle',0.03);}
};

function updateSoundToggle(){
  var btn=document.getElementById('sound-toggle');
  if(btn)btn.innerHTML='<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="4,8 8,8 12,4 12,16 8,12 4,12"/>'+(S.sound?'<path d="M15 7a4 4 0 0 1 0 6"/>':'<path d="M15 7l4 6"/><path d="M19 7l-4 6"/>')+'</svg>Sound: '+(S.sound?'On':'Off');
}

function toggleSound(){
  S.sound=!S.sound;
  if(!S.sound)stopAmbientMusic();
  save();
  updateSoundToggle();
  if(S.sound){
    getAudio();
    SFX.tap();
    toast('Sound on!');
  }else{
    toast('Sound off!');
  }
}

var SCRS=['home','levels','shop','game'];
function showScreen(id){
  SFX.tap();
  SCRS.forEach(function(s){document.getElementById(s).classList.toggle('hidden',s!==id);});
  if(id==='home')   updateHome();
  if(id==='levels') renderLevels();
  if(id==='shop')   renderShop();
}

function updateCoins(){
  var c=S.coins;
  ['home-coins','shop-coins','game-coins','qs-coins','levels-coins'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.textContent=c;
  });
}
function updateHome(){
  updateCoins();
  updateSoundToggle();
  var done=countDone(),total=LDEFS.length;
  document.getElementById('xp-fill').style.width=(done/total*100)+'%';
  document.getElementById('xp-label-text').textContent=done+' / '+total;
  var sb=document.getElementById('home-streak');
  if(S.streak>=2){sb.style.display='flex';document.getElementById('home-streak-num').textContent=S.streak;}
  else sb.style.display='none';
}
function countDone(){return Object.values(S.lvls).filter(function(s){return s&&s.done;}).length;}

/* ── LEVEL SELECT ── */
function renderLevels(){
  updateCoins();
  var done=countDone();
  document.getElementById('levels-sub').textContent=done+' of '+LDEFS.length+' cleared';
  var cont=document.getElementById('levels-container');
  cont.innerHTML='';
  WORLDS.forEach(function(w,wi){
    /* world progress */
    var wDone=0;
    for(var i=w.from;i<=w.to;i++){if(S.lvls[i]&&S.lvls[i].done)wDone++;}
    var wTotal=w.to-w.from+1;
    /* check if world is accessible */
    var wLocked=wi>0&&!(S.lvls[WORLDS[wi-1].to]&&S.lvls[WORLDS[wi-1].to].done)&&wDone===0;
    var sec=document.createElement('div');
    sec.className='world-section world-'+(wi+1);
    /* header */
    var hdr=document.createElement('div');hdr.className='world-header';
    hdr.innerHTML=
      '<div class="world-icon">'+w.emoji+'</div>'+
      '<div class="world-meta">'+
        '<div class="world-name">'+w.name+'</div>'+
        '<div class="world-diff" style="color:'+w.color+'">'+w.diff+(wLocked?' · Locked':'')+'</div>'+
        '<div class="world-prog-track"><div class="world-prog-fill" style="width:'+(wDone/wTotal*100)+'%;background:'+w.color+'"></div></div>'+
      '</div>'+
      '<div style="font-family:Boogaloo,cursive;font-size:.85rem;color:var(--text2)">'+wDone+'/'+wTotal+'</div>';
    sec.appendChild(hdr);
    /* level grid */
    var grid=document.createElement('div');grid.className='levels-row';
    for(var i=w.from;i<=w.to;i++){
      grid.appendChild(makeLCell(i,w.color));
    }
    sec.appendChild(grid);
    cont.appendChild(sec);
    if(wi<WORLDS.length-1){
      var div=document.createElement('div');div.className='world-divider';cont.appendChild(div);
    }
  });
}

function makeLCell(i,worldColor){
  var cell=document.createElement('div');cell.className='lcell';
  var st=S.lvls[i],done=st&&st.done;
  var locked=i>0&&!(S.lvls[i-1]&&S.lvls[i-1].done);
  var isCur=i===S.cur&&!done;
  var def=LDEFS[i];
  /* difficulty dots: seg count shown as dots */
  var dotsHtml='<div class="diff-dots">';
  for(var d=0;d<def.seg;d++){
    dotsHtml+='<div class="diff-dot" style="background:'+(done?'#10b981':locked?'#c8d5f5':worldColor)+'"></div>';
  }
  dotsHtml+='</div>';

  if(locked){
    cell.classList.add('locked');
    cell.innerHTML=
      '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="8" rx="2" fill="#b0bcd4"/><path d="M5 7V5a4 4 0 018 0v2" stroke="#b0bcd4" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'+
      '<span class="lnum" style="font-size:.8rem">'+(i+1)+'</span>';
  }else if(done){
    cell.classList.add('completed');
    cell.innerHTML=
      '<span class="lnum">'+(i+1)+'</span>'+
      dotsHtml+
      '<span class="check-icon"><svg width="12" height="12" viewBox="0 0 13 13" fill="none"><polyline points="2,7 5,10 11,3" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    cell.onclick=(function(idx){return function(){startLevel(idx);};})(i);
  }else{
    cell.classList.add('unlocked');
    if(isCur)cell.classList.add('active-level');
    cell.innerHTML='<span class="lnum">'+(i+1)+'</span>'+dotsHtml;
    cell.onclick=(function(idx){return function(){startLevel(idx);};})(i);
  }
  return cell;
}

/* ── SHOP ── */
function renderShop(){
  document.getElementById('shop-coins').textContent=S.coins;
  var list=document.getElementById('shop-list');list.innerHTML='';
  CATALOG.forEach(function(item){
    var owned=item.type==='consumable'?(S.inv[item.id]||0):(S.upg[item.id]||0);
    var active=item.type==='upgrade'&&owned>0;
    var canBuy=S.coins>=item.price&&!(item.maxOwn&&owned>=item.maxOwn)&&!active;
    var card=document.createElement('div');card.className='shop-card';
    card.innerHTML=
      '<div class="shop-icon-box">'+shopIcon(item.id)+'</div>'+
      '<div class="shop-info"><div class="shop-name">'+item.name+'</div><div class="shop-desc">'+item.desc+'</div>'+
      (item.type==='consumable'?'<div class="shop-owned">Owned: '+owned+'</div>':'')+
      (active?'<div class="shop-owned" style="color:var(--green)">Active — '+owned+' levels left</div>':'')+
      '</div>'+
      '<button class="buy-btn '+(active?'buy-active':canBuy?'buy-can':'buy-no')+'"'+(active?' disabled':'')+' onclick="doBuy(\''+item.id+'\')">'+(active?svgCheck():'<svg width="11" height="11" viewBox="0 0 11 11"><circle cx="5.5" cy="5.5" r="5" fill="rgba(255,255,255,0.3)"/></svg> '+item.price)+'</button>';
    list.appendChild(card);
  });
}
function shopIcon(id){
  if(id==='tube')  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><path d="M9 3h6v14a3 3 0 01-6 0V3z"/><line x1="9" y1="8" x2="15" y2="8"/></svg>';
  if(id==='undos') return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><path d="M3 9h10a5 5 0 010 10H7"/><polyline points="3,5 3,9 7,9"/></svg>';
  if(id==='hint')  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="var(--gold)"/></svg>';
  if(id==='magic') return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>';
  if(id==='boost') return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round"><path d="M13 2L4.5 13H12l-1 9 8.5-11H12l1-9z"/></svg>';
  return '';
}
function svgCheck(){return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polyline points="3,8 6,11 13,4" stroke="var(--green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Active';}
function doBuy(id){
  var item=CATALOG.find(function(x){return x.id===id;});if(!item)return;
  if(S.coins<item.price){SFX.error();toast('Not enough coins!');return;}
  S.coins-=item.price;
  if(item.type==='consumable'){S.inv[id]=(S.inv[id]||0)+1;toast(item.name+' purchased!');}
  else{if(id==='boost')S.upg.boost=5;toast(item.name+' activated!');}
  SFX.coin();
  save();renderShop();updateCoins();
}

/* ── QUICK SHOP ── */
function openQShop(){
  SFX.tap();
  document.getElementById('qs-coins').textContent=S.coins;
  var list=document.getElementById('qs-list');list.innerHTML='';
  CATALOG.forEach(function(item){
    if(item.type==='upgrade'&&(S.upg[item.id]||0)>0)return;
    var owned=item.type==='consumable'?(S.inv[item.id]||0):0;
    var canBuy=S.coins>=item.price;
    var row=document.createElement('div');row.className='qs-row';
    row.innerHTML=
      '<div class="qs-icon">'+shopIcon(item.id)+'</div>'+
      '<div class="qs-info"><div class="qs-name">'+item.name+(owned>0?' <span style="color:var(--accent);font-size:.75rem">(own '+owned+')</span>':'')+'</div><div class="qs-desc">'+item.desc+'</div></div>'+
      '<div class="qs-price '+(owned>0?'owned':canBuy?'':'broke')+'">'+(owned>0?'Use':(canBuy?'<svg width="11" height="11" viewBox="0 0 11 11"><circle cx="5.5" cy="5.5" r="5" fill="rgba(255,255,255,0.3)"/></svg> '+item.price:'💸 '+item.price))+'</div>';
    row.onclick=(function(iid,own,cb){return function(){
      if(own>0){useItem(iid);closeQShop();}
      else if(S.coins>=cb){buyAndUse(iid,cb);closeQShop();}
      else {SFX.error();toast('Not enough coins!');}
    };})(item.id,owned,item.price);
    list.appendChild(row);
  });
  document.getElementById('qshop').classList.add('show');
}
function closeQShop(){document.getElementById('qshop').classList.remove('show');}
function buyAndUse(id,price){if(S.coins<price){SFX.error();toast('Not enough coins!');return;}S.coins-=price;save();updateCoins();useItem(id);}
function useItem(id){
  if(id==='tube'){if(S.inv.tube>0)S.inv.tube--;hist.push(snapshot());bottles.push([]);save();render();SFX.magic();toast('Extra tube added!');}
  else if(id==='undos'){if(S.inv.undos>0)S.inv.undos--;save();SFX.undo();toast('+5 undos added!');}
  else if(id==='hint'){if(S.inv.hint>0)S.inv.hint--;save();doHint();}
  else if(id==='magic'){if(S.inv.magic>0)S.inv.magic--;save();doMagic();}
  else if(id==='boost'){if(S.coins>=50){S.coins-=50;S.upg.boost=5;save();updateCoins();SFX.coin();toast('Coin Boost active!');}}
}

/* ── HINT / MAGIC ── */
function doHint(){
  for(var f=0;f<bottles.length;f++){
    for(var t=0;t<bottles.length;t++){
      if(canPour(f,t)){
        hintFrom=f;hintTo=t;render();
        SFX.hint();
        toast('Pour bottle '+(f+1)+' into '+(t+1));
        setTimeout(function(){hintFrom=-1;hintTo=-1;render();},2800);return;
      }
    }
  }
  SFX.error();
  toast('No obvious move found!');
}
function doMagic(){
  var best=null;
  for(var f=0;f<bottles.length;f++){
    if(!bottles[f].length)continue;
    for(var t=0;t<bottles.length;t++){
      if(!canPour(f,t))continue;
      var score=(bottles[t].length>0?10:1)+countTopRun(bottles[f]);
      if(!best||score>best.score)best={f:f,t:t,score:score};
    }
  }
  if(best){sel=null;SFX.magic();executePour(best.f,best.t,true);toast('Magic step done!');}
  else {SFX.error();toast('No move available!');}
}

function countTopRun(bottle){
  if(!bottle.length)return 0;
  var top=bottle[bottle.length-1],count=0;
  for(var i=bottle.length-1;i>=0&&bottle[i]===top;i--)count++;
  return count;
}

/* ── GAME ── */
function startLevel(idx){SFX.tap();S.cur=idx;save();showScreen('game');loadLevel(idx);}
function loadLevel(idx){
  var def=LDEFS[idx];
  TSEG=def.seg;
  bottles=cloneBottles(def.b);
  sel=null;moves=0;hist=[];usedUndo=false;hintFrom=-1;hintTo=-1;
  document.getElementById('topbar-lvl').textContent='Level '+(idx+1);
  var done=countDone();
  document.getElementById('topbar-prog').textContent=done+' / '+LDEFS.length+' cleared';
  document.getElementById('prog-fill').style.width=(done/LDEFS.length*100)+'%';
  document.getElementById('streak-val').textContent=S.streak;
  /* set bottle height based on seg count */
  document.documentElement.style.setProperty('--bottle-h', (TSEG===2?80:TSEG===3?116:TSEG===4?148:TSEG===5?184:220)+'px');
  updateMovesUI();render();
}

/* ── RENDER ── */
function render(){
  var area=document.getElementById('game-area');area.innerHTML='';
  var bottleH=TSEG===2?80:TSEG===3?116:TSEG===4?148:TSEG===5?184:220;
  bottles.forEach(function(contents,i){
    var wrap=document.createElement('div');wrap.className='bw';wrap.dataset.idx=i;
    if(sel===i)wrap.classList.add('sel');
    var done=isComplete(i);
    if(done){
      wrap.classList.add('done');
      var c=COLORS[contents[0]]||COLORS.blue;
      wrap.style.setProperty('--done-c',c.bg);
      wrap.style.setProperty('--done-g',c.glow);
    }
    if(hintFrom!==-1&&i===hintFrom)wrap.classList.add('hint-from');
    if(hintTo  !==-1&&i===hintTo)  wrap.classList.add('hint-to');
    wrap.addEventListener('click',(function(idx){return function(){handleClick(idx);};})(i));
    var neck=document.createElement('div');neck.className='bneck';
    wrap.appendChild(neck);
    var body=document.createElement('div');body.className='bbody';
    body.style.height=bottleH+'px';
    var filled=contents.length,empty=TSEG-filled,segPct=(100/TSEG)+'%';
    for(var s=0;s<empty;s++){
      var seg=document.createElement('div');seg.className='lseg';seg.style.height=segPct;
      var inn=document.createElement('div');inn.className='lseg-inner';inn.style.background='transparent';
      seg.appendChild(inn);body.appendChild(seg);
    }
    for(var s2=filled-1;s2>=0;s2--){
      var ck=contents[s2],c2=COLORS[ck]||COLORS.blue;
      var seg2=document.createElement('div');seg2.className='lseg';
      if(s2===filled-1)seg2.classList.add('top-filled');
      seg2.style.height=segPct;
      var inn2=document.createElement('div');inn2.className='lseg-inner';
      inn2.style.background='linear-gradient(180deg,'+c2.lt+' 0%,'+c2.bg+' 100%)';
      seg2.appendChild(inn2);body.appendChild(seg2);
    }
    wrap.appendChild(body);area.appendChild(wrap);
  });
}

function handleClick(idx){
  hintFrom=-1;hintTo=-1;
  if(sel===null){
    if(!bottles[idx].length){shakeBottle(idx);return;}
    sel=idx;SFX.select();render();
  }else{
    if(sel===idx){sel=null;SFX.tap();render();return;}
    if(canPour(sel,idx)){executePour(sel,idx);}
    else{shakeBottle(idx);sel=null;render();if(bottles[idx].length>0){setTimeout(function(){sel=idx;SFX.select();render();},190);}}
  }
}
function canPourState(state,seg,f,t){
  if(f===t||!state[f].length||state[t].length>=seg)return false;
  if(!state[t].length)return true;
  return state[f][state[f].length-1]===state[t][state[t].length-1];
}

function canPour(f,t){
  return canPourState(bottles,TSEG,f,t);
}
function executePour(f,t,isMagic){
  hist.push(snapshot());
  var color=bottles[f][bottles[f].length-1],count=0;
  while(bottles[f].length&&bottles[t].length<TSEG&&bottles[f][bottles[f].length-1]===color){
    bottles[t].push(bottles[f].pop());count++;
  }
  if(!isMagic)moves++;
  updateMovesUI();spawnPour(f,t,color,count);SFX.pour();sel=null;
  setTimeout(function(){
    render();
    if(isComplete(t))popBottle(t);
    setTimeout(function(){if(checkWin())doWin();},140);
  },310);
}
function isComplete(i){var b=bottles[i];return b.length===TSEG&&b.every(function(c){return c===b[0];});}
function checkWin(){return bottles.every(function(b){return !b.length||(b.length===TSEG&&b.every(function(c){return c===b[0];}));});}

function doWin(){
  var idx=S.cur,st=S.lvls[idx]||{};
  var isFirst=!st.done,beatBest=st.best&&moves<st.best;
  var earned=10;
  if(isFirst)earned+=15;
  if(beatBest)earned+=5;
  if(!usedUndo)earned+=5;
  if(S.upg.boost>0){earned*=2;S.upg.boost--;}
  S.streak=(S.streak||0)+1;
  if(S.streak%3===0){earned+=20;setTimeout(function(){toast('🔥 3-level streak! +20 bonus!');},600);}
  S.coins+=earned;
  S.lvls[idx]={done:true,best:st.best?Math.min(st.best,moves):moves};
  if(idx+1<LDEFS.length&&!S.lvls[idx+1])S.lvls[idx+1]={done:false};
  save();updateCoins();updateMovesUI();
  document.getElementById('win-moves').textContent=moves;
  document.getElementById('win-earned').textContent=earned;
  document.getElementById('next-btn').style.display=idx+1<LDEFS.length?'':'none';
  spawnConfetti();
  SFX.coin();
  setTimeout(function(){SFX.win();document.getElementById('win-ov').classList.add('show');},420);
}
function closeWin(){document.getElementById('win-ov').classList.remove('show');}
function nextLevel(){var nxt=S.cur+1;if(nxt<LDEFS.length)startLevel(nxt);else showScreen('levels');}
function undo(){
  if(!hist.length){SFX.error();toast('Nothing to undo!');return;}
  bottles=hist.pop();moves=Math.max(0,moves-1);usedUndo=true;sel=null;updateMovesUI();render();SFX.undo();
}
function resetLevel(){closeWin();SFX.reset();loadLevel(S.cur);}
function updateMovesUI(){
  document.getElementById('moves-val').textContent=moves;
  var best=S.lvls[S.cur]&&S.lvls[S.cur].best;
  document.getElementById('best-val').textContent=best||'–';
  document.getElementById('streak-val').textContent=S.streak;
}

/* ── ANIMATIONS ── */
function shakeBottle(idx){
  var el=document.querySelector('.bw[data-idx="'+idx+'"]');if(!el)return;
  el.classList.add('shake');SFX.error();setTimeout(function(){el.classList.remove('shake');},460);
}
function popBottle(idx){
  var el=document.querySelector('.bw[data-idx="'+idx+'"]');if(!el)return;
  el.classList.add('pop');SFX.complete();setTimeout(function(){el.classList.remove('pop');},580);
  var rect=el.getBoundingClientRect();
  var cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
  var colorKey=bottles[idx]&&bottles[idx][0];
  var c=COLORS[colorKey]||COLORS.blue;
  spawnRing(cx,cy,c);spawnStars(cx,cy);
}
function spawnRing(cx,cy,c){
  for(var i=0;i<14;i++){
    var angle=(i/14)*Math.PI*2,dist=38+Math.random()*26;
    var tx=Math.cos(angle)*dist,ty=Math.sin(angle)*dist;
    var p=document.createElement('div');p.className='ring-part';
    p.style.left=(cx-3.5)+'px';p.style.top=(cy-3.5)+'px';
    p.style.background=c.bg;p.style.boxShadow='0 0 5px '+c.bg;
    p.style.setProperty('--tx',tx+'px');p.style.setProperty('--ty',ty+'px');
    p.style.animationDuration=(0.46+Math.random()*0.26)+'s';
    p.style.animationDelay=(Math.random()*0.05)+'s';
    document.body.appendChild(p);
    setTimeout(function(){if(p.parentNode)p.parentNode.removeChild(p);},900);
  }
}
function spawnPour(fi,ti,colorKey,count){
  var area=document.getElementById('game-area');
  var wraps=area.querySelectorAll('.bw');
  var fe=wraps[fi],te=wraps[ti];if(!fe||!te)return;
  var fr=fe.getBoundingClientRect(),tr=te.getBoundingClientRect();
  var c=COLORS[colorKey]||COLORS.blue;
  var sx=fr.left+fr.width/2,sy=fr.top+22,tx2=tr.left+tr.width/2;
  var n=Math.min(count+3,8);
  for(var i=0;i<n;i++){
    (function(ii){
      var drop=document.createElement('div');drop.className='drop';
      var sz=7+Math.random()*5;
      drop.style.width=sz+'px';drop.style.height=(sz*1.3)+'px';
      drop.style.background='linear-gradient(180deg,'+c.lt+','+c.bg+')';
      drop.style.boxShadow='0 0 10px '+c.bg+'88';
      var xLerp=sx+(tx2-sx)*0.4+(Math.random()-0.5)*16;
      drop.style.left=(xLerp-sz/2)+'px';drop.style.top=sy+'px';
      drop.style.animationDuration=(0.24+ii*0.05+Math.random()*0.04)+'s';
      drop.style.animationDelay=(ii*0.04)+'s';
      document.body.appendChild(drop);
      setTimeout(function(){if(drop.parentNode)drop.parentNode.removeChild(drop);},700);
    })(i);
  }
  setTimeout(function(){
    var rip=document.createElement('div');rip.className='ripple';
    var rs=22;rip.style.width=rs+'px';rip.style.height=rs+'px';
    rip.style.background=c.bg+'33';rip.style.border='2px solid '+c.bg+'66';
    rip.style.left=(tx2-rs/2)+'px';rip.style.top=(tr.bottom-22)+'px';
    document.body.appendChild(rip);
    setTimeout(function(){if(rip.parentNode)rip.parentNode.removeChild(rip);},650);
  },280);
}
function spawnStars(cx,cy){
  var svgs=[
    '<svg width="18" height="18" viewBox="0 0 18 18"><polygon points="9,2 11.5,7 17,7.5 13,11.5 14,17 9,14 4,17 5,11.5 1,7.5 6.5,7" fill="#f59e0b"/></svg>',
    '<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1l2 5.5h5.5l-4.5 3.5 1.5 5.5-4.5-3-4.5 3 1.5-5.5L0 6.5h5.5z" fill="#8b5cf6"/></svg>',
    '<svg width="13" height="13" viewBox="0 0 13 13"><circle cx="6.5" cy="6.5" r="5.5" fill="#10b981" opacity="0.9"/></svg>'
  ];
  svgs.forEach(function(svg,ii){
    var el=document.createElement('div');el.className='starburst';
    el.style.left=(cx+(ii-1)*26-8)+'px';el.style.top=(cy-22)+'px';
    el.style.animationDelay=(ii*0.09)+'s';el.innerHTML=svg;
    document.body.appendChild(el);
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},1000);
  });
}
function spawnConfetti(){
  var pal=['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f59e0b','#10b981'];
  for(var i=0;i<110;i++){
    (function(){
      var p=document.createElement('div');p.className='confp';
      p.style.left=(Math.random()*100)+'vw';
      p.style.width=(5+Math.random()*10)+'px';p.style.height=(5+Math.random()*10)+'px';
      p.style.background=pal[Math.floor(Math.random()*pal.length)];
      p.style.borderRadius=Math.random()>0.4?'50%':'3px';
      p.style.animationDuration=(1.8+Math.random()*2.4)+'s';
      p.style.animationDelay=(Math.random()*0.9)+'s';
      document.body.appendChild(p);
      setTimeout(function(){if(p.parentNode)p.parentNode.removeChild(p);},5500);
    })();
  }
}
var _tt=null;
function toast(msg){
  var el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');
  if(_tt)clearTimeout(_tt);
  _tt=setTimeout(function(){el.classList.remove('show');},2500);
}
load();updateSoundToggle();showScreen('home');
