(self.webpackChunkportal=self.webpackChunkportal||[]).push([[71993],{71993:(Y,N,a)=>{a.r(N),a.d(N,{takeUntilDestroyed:()=>E,toObservable:()=>R,toSignal:()=>P});var o=a(11705),y=a(4125),V=a(32070);function E(e){e||((0,o.assertInInjectionContext)(E),e=(0,o.inject)(o.DestroyRef));const r=new y.Observable(t=>e.onDestroy(t.next.bind(t)));return t=>t.pipe((0,V.takeUntil)(r))}function R(e,r){!r?.injector&&(0,o.assertInInjectionContext)(R);const t=r?.injector??(0,o.inject)(o.Injector),n=new y.ReplaySubject(1),s=(0,o.effect)(()=>{let i;try{i=e()}catch(l){return void(0,o.untracked)(()=>n.error(l))}(0,o.untracked)(()=>n.next(i))},{injector:t,manualCleanup:!0});return t.get(o.DestroyRef).onDestroy(()=>{s.destroy(),n.complete()}),n.asObservable()}class _ extends Error{constructor(r,t){super(function L(e,r){return`NG0${Math.abs(e)}${r?": "+r:""}`}(r,t)),this.code=r}}let u=null;function m(e){const r=u;return u=e,r}function P(e,r){const t=!r?.manualCleanup;t&&!r?.injector&&(0,o.assertInInjectionContext)(P);const n=t?r?.injector?.get(o.DestroyRef)??(0,o.inject)(o.DestroyRef):null;let s;return s=(0,o.signal)(r?.requireSync?{kind:0}:{kind:1,value:r?.initialValue}),function K(e){const r=m(null);try{return e()}finally{m(r)}}(()=>{const i=e.subscribe({next:l=>s.set({kind:1,value:l}),error:l=>s.set({kind:2,error:l})});n?.onDestroy(i.unsubscribe.bind(i))}),(0,o.computed)(()=>{const i=s();switch(i.kind){case 1:return i.value;case 2:throw i.error;case 0:throw new _(601,"`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.")}})}}}]);