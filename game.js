"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const scenes=[
 {id:"letter",act:"第一幕",title:"没有寄件人的信",class:"mailbox",speaker:"少校",author:"苏菲会把信藏进口袋。她总会照做。",caption:"绿漆还带着清晨的凉。信封没有邮票。",text:"红字比你的手先一步落在纸上。镜子里，另一个女孩握着一本厚讲义。",choices:[
  ["照他说的藏好","先让他的目光滑过去",{a:-1,c:1,type:"obey"}],
  ["当着镜子拆开","让另一边看见这封信",{a:1,h:1,flag:"trace",type:"mislead"}],
  ["把信封翻到背面","先看他忘了写的地方",{a:0,c:1,type:"observe"}]
 ]},
 {id:"mirror",act:"第一幕",title:"铜镜眨了一次眼",class:"mailbox",speaker:"苏菲",author:"她会把那一眼当成错觉。",caption:"镜面没有动。镜中的女孩先闭上眼。",text:"你只能带走一种看法。它不会替你答题，只会决定你先看见什么。",lens:true,choices:[
  ["摸一摸冰冷的镜框","相信手指留下的感觉",{a:0,c:1,type:"sense"}],
  ["找出镜中不对称的地方","相信矛盾不会撒谎",{a:0,c:1,type:"reason"}],
  ["对她点一下头","先做一件没人写下的事",{a:1,h:1,flag:"trace",type:"choice"}]
 ]},
 {id:"bookshop",act:"第二幕",title:"橱窗里的同名书",class:"street",speaker:"艾伯特",author:"苏菲当然不会停下。那只是一本书。",caption:"书脊上印着你的名字。玻璃里，红字没有倒影。",text:"艾伯特让你吸引少校的目光。他没说该用真话，还是用一场更像真的戏。",lens:true,react:true,choices:[
  ["推门问这本书的结局","把目光全引到自己身上",{a:2,c:1,type:"rebel"}],
  ["整理被风吹乱的书签","借顺手动作藏起一页",{a:-1,c:1,type:"mislead"}],
  ["照他说的继续回家","把反抗留到下一页",{a:-1,al:-1,type:"obey"}]
 ]},
 {id:"mother",act:"第二幕",title:"门口的桌布",class:"street",speaker:"妈妈",author:"她只会说学校里发生了一点怪事。",caption:"妈妈抱着洗好的桌布。她没有让开门。",text:"“苏菲，你最近总在躲什么？”她把桌布换到另一只手。",choices:[
  ["把没有邮票的信递给她","让她知道危险是真的",{a:1,m:1,flag:"truth",type:"trust"}],
  ["只说艾伯特在帮我","把计划托给一个人",{a:0,al:1,flag:"trust",type:"trust"}],
  ["说宴会的事还没准备好","把秘密全留给自己",{a:-1,type:"obey"}]
 ]},
 {id:"alberto",act:"第二幕",title:"帽檐下的沉默",class:"escape",speaker:"艾伯特",author:"老师会把计划讲给她听。每一个字。",caption:"艾伯特看了一眼墙角。那里只有风，打字声却停了。",text:"他把表扣在桌上。“后面的事，我不能说。你肯跟着一个没说出口的句子走吗？”",choices:[
  ["相信他的沉默","让空白替他守住计划",{a:-1,al:1,flag:"trust",type:"trust"}],
  ["逼他现在说清路线","宁可暴露也要答案",{a:2,c:1,type:"rebel"}],
  ["假装讨论宴会座位","把真正的问题夹在名单里",{a:-1,c:1,type:"mislead"}]
 ]},
 {id:"toast",act:"第三幕",title:"长桌上每句话都有署名",class:"garden",speaker:"少校",author:"苏菲将站起来，当众感谢这场宴会。",caption:"杯沿越过红字。苹果树下，宾客同时安静。",text:"少校把下一句留给你。他在等一个熟悉的动作。",lens:true,react:true,choices:[
  ["照着念完","让他的笔先松一口气",{a:-1,al:-1,type:"obey"}],
  ["故意念错一个名字","让红字追错目标",{a:1,c:1,type:"mislead"}],
  ["把感谢说给妈妈","让她站到这句话里面",{a:1,m:1,flag:"truth",type:"trust"}],
  ["放下杯子，不开口","把未说的话交给艾伯特",{a:2,al:1,flag:"trust",type:"rebel"}]
 ]},
 {id:"page",act:"第三幕",title:"桌布下的一页",class:"garden",speaker:"苏菲",author:"那只是一张弄脏的纸。苏菲不会碰它。",caption:"妈妈的手压住桌布。下面露出半个铅笔问号。",text:"少校的字框正罩住宾客。纸页只够一个人先看见。",lens:true,choices:[
  ["请妈妈收走桌布","把错误送给正确的人",{a:-1,c:1,need:"truth",type:"mislead"}],
  ["当众抽出那一页","拿到证据，也让他看清你",{a:2,c:1,type:"rebel"}],
  ["用杯底压住页角","留到撞响之后",{a:-1,c:1,type:"mislead"}]
 ]},
 {id:"crash",act:"第三幕",title:"白色宾士撞向苹果树",class:"crash",speaker:"艾伯特",author:"汽车会撞上树。所有人都会看过去。苏菲会留在原地。",caption:"车头擦过长桌。青苹果砸在引擎盖上。",text:"十秒。树篱后面裂开一道没有印字的白。",timed:true,react:true,choices:[
  ["追着车跑，抢走他的目光","给艾伯特留出树篱",{a:2,c:1,type:"rebel"}],
  ["拉住妈妈，再转身离开","用一次坦白换她放手",{a:-1,need:"truth",type:"trust"}],
  ["跟上艾伯特的帽檐","走进他没说出口的路线",{a:0,needAl:1,type:"trust"}]
 ]},
 {id:"hedge",act:"第三幕",title:"树篱后的空白",class:"escape",speaker:"苏菲",author:"苏菲回到了长桌。她从未离开。",caption:"枝条刮过手背。湖面、木屋、地窖门连成一条窄线。",text:"红字已经贴到身后。你还可以在合页闭上前，决定把最后的痕迹留给谁。",choices:[
  ["在铜镜边刻一个问号","让席德知道有人来过",{a:1,h:1,flag:"trace",type:"mislead"}],
  ["握住艾伯特伸来的手","两个人一起跨出边框",{a:0,al:1,flag:"trust",type:"trust"}],
  ["把信封塞进地窖门缝","留下第一道问题",{a:0,c:1,type:"observe"}]
 ]}
];
let state,idx=0,timer=null,audioOn=true;
const initial=()=>({attention:1,exposure:0,clues:0,mother:0,alberto:0,hilde:0,lens:"感官",flags:{truth:false,trust:false,trace:false},history:[],seenEndings:JSON.parse(localStorage.getItem("sufei_endings")||"[]")});
function save(){localStorage.setItem("sufei_save",JSON.stringify({state,idx}))}function load(){try{return JSON.parse(localStorage.getItem("sufei_save"))}catch{return null}}
function start(fromSave=false){const s=fromSave&&load();state=s?.state||initial();idx=s?.idx||0;$("#titleScreen").classList.add("hidden");$("#endingScreen").classList.add("hidden");$("#playScreen").classList.remove("hidden");render()}
function tone(freq=260,d=.05){if(!audioOn)return;try{const c=tone.ctx||(tone.ctx=new AudioContext),o=c.createOscillator(),g=c.createGain();o.frequency.value=freq;o.type="triangle";g.gain.setValueAtTime(.035,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+d)}catch{}}
function render(){clearInterval(timer);const s=scenes[idx],stage=$("#stage");stage.className=`stage scene-${s.class} attention-${state.attention}`;$("#actLabel").textContent=s.act;$("#sceneTitle").textContent=s.title;$("#speaker").textContent=s.speaker;$("#progress").textContent=`${idx+1} / ${scenes.length}`;$("#storyText").textContent=s.text;$("#sceneCaption").textContent=s.caption;$("#authorText").textContent=counterText(s);$("#authorBox").classList.remove("hidden");$("#hud").classList.toggle("hidden",idx===0);$("#lensBar").classList.toggle("hidden",!s.lens);$$('[data-lens]').forEach(b=>b.classList.toggle("active",b.dataset.lens===state.lens));renderChoices(s);renderHud();if(s.timed)startCountdown();save()}
function counterText(s){if(!s.react||state.history.length<2)return s.author;const counts={};state.history.forEach(h=>counts[h.type]=(counts[h.type]||0)+1);const top=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0];if(top==="rebel")return s.author+" 她总爱反抗。把那条路划掉。";if(top==="obey")return s.author+" 她已经学会照做。";if(top==="mislead")return s.author+" 别信她那些顺手的动作。";return s.author}
function renderChoices(s){const box=$("#choices");box.innerHTML="";s.choices.forEach((c,i)=>{const locked=(state.attention>=3&&c[2].type==="rebel")||(c[2].need&&!state.flags[c[2].need])||(c[2].needAl&&state.alberto<c[2].needAl);const b=document.createElement("button");b.className="choice"+(locked?" locked":"");b.innerHTML=`<b><em>${String(i+1).padStart(2,"0")}</em>${c[0]}</b><small>${locked?lockReason(c[2]):c[1]}</small>`;b.disabled=locked;b.onclick=()=>choose(i);box.appendChild(b)})}
function lockReason(e){if(state.attention>=3&&e.type==="rebel")return"红字已经封住这句话";if(e.need==="truth")return"她还没见过那封信";return"他还没把沉默交给你"}
function choose(i){clearInterval(timer);const s=scenes[idx],c=s.choices[i],e=c[2];tone(e.type==="mislead"?390:e.type==="rebel"?150:260,.09);let msg=c[1];const before=state.attention;if(e.a)state.attention=Math.max(0,Math.min(3,state.attention+e.a));if(e.c)state.clues=Math.min(3,state.clues+e.c);if(e.m)state.mother=Math.min(1,state.mother+e.m);if(e.al)state.alberto=Math.max(0,Math.min(2,state.alberto+e.al));if(e.h)state.hilde=1;if(e.flag)state.flags[e.flag]=true;if(before>=2&&e.type==="rebel"){state.exposure++;msg="红笔压住你的动作。他看见了。"}if(before===3&&e.type==="obey")state.attention=2;if(e.need==="truth"&&state.flags.truth){state.attention=Math.max(0,state.attention-1);msg="妈妈收走桌布。红字追着空掉的位置。"}state.history.push({scene:s.id,title:s.title,choice:c[0],type:e.type});toast(msg);if(state.exposure>=3){setTimeout(()=>ending("written"),650);return}setTimeout(()=>{idx++;if(idx>=scenes.length)resolveEnding();else render()},700)}
function resolveEnding(){if(state.clues<2)return ending("late");if(state.clues>=3&&state.hilde&&Object.values(state.flags).filter(Boolean).length>=2)return ending("echo");ending("escape")}
const endings={written:{title:"被写回原句",text:"你重新站在苹果树下，手里的杯子还没放下。少校把最后一次反抗抄得一字不差。下一次，别在红线贴满页边时硬顶。"},late:{title:"迟了一页",text:"你穿过树篱，又从长桌另一端走了回来。地窖门就在纸后，可你没有留下足够的纸缝。"},escape:{title:"越界而行",text:"汽水瓶从你的手里穿过去。少校的打字声停了，现实也没有看见你。海湾边，那根船绳晃了一下。"},echo:{title:"空白处有回声",text:"席德翻到页边。那里多了一个她父亲没写过的问号。扳钳轻响，船绳从木桩上慢慢松开。"}};
function ending(key){clearInterval(timer);const e=endings[key];$("#playScreen").classList.add("hidden");$("#endingScreen").classList.remove("hidden");$("#endingTitle").textContent=e.title;$("#endingText").textContent=e.text;const echoes=[];if(state.flags.truth)echoes.push("妈妈把门留了一条缝。她记得你把那封信交给她。");if(state.flags.trust)echoes.push("艾伯特没有解释。他伸出的手和你记得的一样稳。");if(state.flags.trace)echoes.push("席德的铅笔停在问号旁。她看见了你的痕迹。");$("#echoes").innerHTML=echoes.map(x=>`<div class="echo">${x}</div>`).join("");state.seenEndings=[...new Set([...(state.seenEndings||[]),key])];localStorage.setItem("sufei_endings",JSON.stringify(state.seenEndings));localStorage.removeItem("sufei_save");tone(key==="echo"?520:190,.6)}
function renderHud(){const names=["游移","贴近","警戒","锁笔"];$("#attentionLabel").textContent=names[state.attention];$("#attentionMarks").innerHTML=[1,2,3].map(n=>`<i class="${n<=state.attention?'on':''}"></i>`).join("");$("#clueLabel").textContent=`${state.clues} / 3`;$("#clueMarks").innerHTML=[1,2,3].map(n=>`<i class="${n<=state.clues?'on':''}"></i>`).join("");$("#exposureMeter").classList.toggle("hidden",!state.exposure);$("#exposureLabel").textContent=`${state.exposure} / 3`}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.remove("hidden");void el.offsetWidth;setTimeout(()=>el.classList.add("hidden"),720)}
function startCountdown(){let n=10;$("#countdown").classList.remove("hidden");$("#countdownNumber").textContent=n;timer=setInterval(()=>{n--;$("#countdownNumber").textContent=n;tone(140,.025);if(n<=0){clearInterval(timer);$("#countdown").classList.add("hidden");const safe=scenes[idx].choices.findIndex(c=>c[2].type==="trust"&&!((c[2].need&&!state.flags[c[2].need])||(c[2].needAl&&state.alberto<c[2].needAl)));choose(safe>=0?safe:0)}},1000)}
function openBranch(){const map=$("#branchMap"),hist=state?.history||[];map.innerHTML=scenes.map((s,i)=>{const h=hist.find(x=>x.scene===s.id);return `<div class="branch-node ${h?'':'unknown'}"><b>${s.act}</b><p>${h?`${s.title}：${h.choice}`:'这一页仍是空白'}</p></div>`}).join("");$("#branchDialog").showModal()}
function reset(all=true){$("#branchDialog").close();const endingsSeen=state?.seenEndings||[];state=initial();state.seenEndings=endingsSeen;idx=all?0:5;save();start(true)}
$("#startBtn").onclick=()=>start(false);$("#continueBtn").onclick=()=>start(true);$("#branchBtnTitle").onclick=openBranch;$("#branchBtn").onclick=openBranch;$("#closeBranch").onclick=()=>$("#branchDialog").close();$("#restartBtn").onclick=()=>reset(true);$("#restartAllBtn").onclick=()=>reset(true);$("#restartActBtn").onclick=()=>reset(false);$("#homeBtn").onclick=()=>location.reload();$("#muteBtn").onclick=()=>{audioOn=!audioOn;$("#muteBtn").textContent=audioOn?"声音 开":"声音 关"};$$('[data-lens]').forEach(b=>b.onclick=()=>{state.lens=b.dataset.lens;$$('[data-lens]').forEach(x=>x.classList.toggle("active",x===b));tone(410,.05);toast(`${state.lens}镜片：${b.querySelector('small').textContent}`)});document.addEventListener("keydown",e=>{if(e.key>="1"&&e.key<="4"){const b=$$(".choice:not(.locked)")[Number(e.key)-1];b?.click()}if(e.key.toLowerCase()==="m")$("#muteBtn").click()});
const saved=load();$("#continueBtn").classList.toggle("hidden",!saved);$("#branchBtnTitle").classList.toggle("hidden",!JSON.parse(localStorage.getItem("sufei_endings")||"[]").length);
