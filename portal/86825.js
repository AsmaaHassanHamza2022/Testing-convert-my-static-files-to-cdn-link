(self.webpackChunkportal=self.webpackChunkportal||[]).push([[86825],{86825:(b,a,h)=>{h.r(a),h.d(a,{AUTO_STYLE:()=>_,AnimationBuilder:()=>l,AnimationFactory:()=>u,NoopAnimationPlayer:()=>A,animate:()=>y,animateChild:()=>S,animation:()=>g,group:()=>c,keyframes:()=>m,query:()=>P,sequence:()=>p,stagger:()=>T,state:()=>F,style:()=>d,transition:()=>D,trigger:()=>f,useAnimation:()=>E,\u0275AnimationGroupPlayer:()=>k,\u0275PRE_STYLE:()=>C});class l{}class u{}const _="*";function f(s,t){return{type:7,name:s,definitions:t,options:{}}}function y(s,t=null){return{type:4,styles:t,timings:s}}function c(s,t=null){return{type:3,steps:s,options:t}}function p(s,t=null){return{type:2,steps:s,options:t}}function d(s){return{type:6,styles:s,offset:null}}function F(s,t,n){return{type:0,name:s,styles:t,options:n}}function m(s){return{type:5,steps:s}}function D(s,t,n=null){return{type:1,expr:s,animation:t,options:n}}function g(s,t=null){return{type:8,animation:s,options:t}}function S(s=null){return{type:9,options:s}}function E(s,t=null){return{type:10,animation:s,options:t}}function P(s,t,n=null){return{type:11,selector:s,animation:t,options:n}}function T(s,t){return{type:12,timings:s,animation:t}}class A{constructor(t=0,n=0){this._onDoneFns=[],this._onStartFns=[],this._onDestroyFns=[],this._originalOnDoneFns=[],this._originalOnStartFns=[],this._started=!1,this._destroyed=!1,this._finished=!1,this._position=0,this.parentPlayer=null,this.totalTime=t+n}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(t=>t()),this._onDoneFns=[])}onStart(t){this._originalOnStartFns.push(t),this._onStartFns.push(t)}onDone(t){this._originalOnDoneFns.push(t),this._onDoneFns.push(t)}onDestroy(t){this._onDestroyFns.push(t)}hasStarted(){return this._started}init(){}play(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0}triggerMicrotask(){queueMicrotask(()=>this._onFinish())}_onStart(){this._onStartFns.forEach(t=>t()),this._onStartFns=[]}pause(){}restart(){}finish(){this._onFinish()}destroy(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(t=>t()),this._onDestroyFns=[])}reset(){this._started=!1,this._finished=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}setPosition(t){this._position=this.totalTime?t*this.totalTime:1}getPosition(){return this.totalTime?this._position/this.totalTime:1}triggerCallback(t){const n="start"==t?this._onStartFns:this._onDoneFns;n.forEach(i=>i()),n.length=0}}class k{constructor(t){this._onDoneFns=[],this._onStartFns=[],this._finished=!1,this._started=!1,this._destroyed=!1,this._onDestroyFns=[],this.parentPlayer=null,this.totalTime=0,this.players=t;let n=0,i=0,o=0;const r=this.players.length;0==r?queueMicrotask(()=>this._onFinish()):this.players.forEach(e=>{e.onDone(()=>{++n==r&&this._onFinish()}),e.onDestroy(()=>{++i==r&&this._onDestroy()}),e.onStart(()=>{++o==r&&this._onStart()})}),this.totalTime=this.players.reduce((e,O)=>Math.max(e,O.totalTime),0)}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(t=>t()),this._onDoneFns=[])}init(){this.players.forEach(t=>t.init())}onStart(t){this._onStartFns.push(t)}_onStart(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(t=>t()),this._onStartFns=[])}onDone(t){this._onDoneFns.push(t)}onDestroy(t){this._onDestroyFns.push(t)}hasStarted(){return this._started}play(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(t=>t.play())}pause(){this.players.forEach(t=>t.pause())}restart(){this.players.forEach(t=>t.restart())}finish(){this._onFinish(),this.players.forEach(t=>t.finish())}destroy(){this._onDestroy()}_onDestroy(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(t=>t.destroy()),this._onDestroyFns.forEach(t=>t()),this._onDestroyFns=[])}reset(){this.players.forEach(t=>t.reset()),this._destroyed=!1,this._finished=!1,this._started=!1}setPosition(t){const n=t*this.totalTime;this.players.forEach(i=>{const o=i.totalTime?Math.min(1,n/i.totalTime):1;i.setPosition(o)})}getPosition(){const t=this.players.reduce((n,i)=>null===n||i.totalTime>n.totalTime?i:n,null);return null!=t?t.getPosition():0}beforeDestroy(){this.players.forEach(t=>{t.beforeDestroy&&t.beforeDestroy()})}triggerCallback(t){const n="start"==t?this._onStartFns:this._onDoneFns;n.forEach(i=>i()),n.length=0}}const C="!"}}]);