(self.webpackChunkportal=self.webpackChunkportal||[]).push([[78337],{78337:(C,f,d)=>{d.d(f,{P3:()=>E,Z9:()=>p,eX:()=>S,k:()=>w,o2:()=>m});var u=d(4125),g=d(11705);class m{}function p(c){return c&&"function"==typeof c.connect&&!(c instanceof u.ConnectableObservable)}class E extends m{constructor(e){super(),this._data=e}connect(){return(0,u.isObservable)(this._data)?this._data:(0,u.of)(this._data)}disconnect(){}}class S{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(e,t,i,h,s){e.forEachOperation((n,a,o)=>{let l,r;null==n.previousIndex?(l=this._insertView(()=>i(n,a,o),o,t,h(n)),r=l?1:0):null==o?(this._detachAndCacheView(a,t),r=3):(l=this._moveView(a,o,t,h(n)),r=2),s&&s({context:l?.context,operation:r,record:n})})}detach(){for(const e of this._viewCache)e.destroy();this._viewCache=[]}_insertView(e,t,i,h){const s=this._insertViewFromCache(t,i);if(s)return void(s.context.$implicit=h);const n=e();return i.createEmbeddedView(n.templateRef,n.context,n.index)}_detachAndCacheView(e,t){const i=t.detach(e);this._maybeCacheView(i,t)}_moveView(e,t,i,h){const s=i.get(e);return i.move(s,t),s.context.$implicit=h,s}_maybeCacheView(e,t){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(e);else{const i=t.indexOf(e);-1===i?e.destroy():t.remove(i)}}_insertViewFromCache(e,t){const i=this._viewCache.pop();return i&&t.insert(i,e),i||null}}const w=new g.InjectionToken("_ViewRepeater")}}]);