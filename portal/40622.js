(self.webpackChunkportal=self.webpackChunkportal||[]).push([[40622],{40622:(z,A,l)=>{l.r(A),l.d(A,{AbstractValidationDirective:()=>R,BLUEPRINTS:()=>d,NgxValidateCoreModule:()=>P,VALIDATION_BLUEPRINTS:()=>p,VALIDATION_ERROR_TEMPLATE:()=>v,VALIDATION_INVALID_CLASSES:()=>h,VALIDATION_MAP_ERRORS_FN:()=>f,VALIDATION_TARGET_SELECTOR:()=>m,VALIDATION_VALIDATE_ON_SUBMIT:()=>g,ValidationContainerDirective:()=>M,ValidationDirective:()=>j,ValidationErrorComponent:()=>y,ValidationGroupDirective:()=>k,ValidationStyleDirective:()=>F,ValidationTargetDirective:()=>I,addCommas:()=>_,comparePasswords:()=>U,defaultMapErrorsFn:()=>S,evalPropTruthy:()=>E,generateValidationError:()=>O,interpolate:()=>T,mapReplace:()=>D,normalizeDiacritics:()=>C,takeUntilDestroy:()=>L,validatePassword:()=>x});var i=l(11705),o=l(4125),c=l(32070),V=l(62411),u=l(36394);function w(t,n){if(1&t&&(i.\u0275\u0275elementStart(0,"div",1),i.\u0275\u0275text(1),i.\u0275\u0275elementEnd()),2&t){const e=n.$implicit;i.\u0275\u0275advance(1),i.\u0275\u0275textInterpolate(e.message)}}const d={email:"Please enter a valid email address.",max:"Max. value should be {{ max }}. ({{ actual }} entered)",maxlength:"Max. {{ requiredLength }} characters are allowed. (has {{ actualLength }})",min:"Min. value should be {{ min }}. ({{ actual }} entered)",minlength:"Min. {{ requiredLength }} characters are required. (has {{ actualLength }})",pattern:"Invalid pattern. Please review your input.",required:"This field is required.",passwordMismatch:"Passwords do not match.",invalidPassword:"Password should include {{ description }}."},p=new i.InjectionToken("validation.blueprints"),v=new i.InjectionToken("validation.error.template"),h=new i.InjectionToken("validation.invalid.classes"),f=new i.InjectionToken("validation.map.errors.fn"),m=new i.InjectionToken("validation.target.selector"),g=new i.InjectionToken("validation.validate.on.submit");function E(t){return t||"string"==typeof t}const N={\u00e1:"a",\u00c1:"A",\u00c0:"A",\u00e0:"a",\u0102:"A",\u0103:"a",\u1eae:"A",\u1eaf:"a",\u1eb1:"a",\u1eb0:"A",\u1eb4:"A",\u1eb5:"a",\u1eb3:"a",\u1eb2:"A",\u00e2:"a",\u00c2:"A",\u1ea5:"a",\u1ea4:"A",\u1ea7:"a",\u1ea6:"A",\u01ce:"a",\u01cd:"A",\u00e5:"a",\u00c5:"A",\u01fa:"A",\u01fb:"a",\u00e4:"a",\u00c4:"A",a\u030b:"a",A\u030b:"A",\u00c3:"A",\u00e3:"a",A\u0327:"A",a\u0327:"a",\u0104:"A",\u0105:"a",\u0101:"a",\u0100:"A",\u0201:"a",\u0200:"A",\u0203:"a",\u0202:"A",\u1eb6:"A",\u1eb7:"a",\u00e6:"a",\u00c6:"A",\u01fc:"A",\u01fd:"a",b\u030c:"b",B\u030c:"B",b\u0327:"b",B\u0327:"B",\u0107:"c",\u0106:"C",c\u0306:"c",C\u0306:"C",\u0109:"c",\u0108:"C",\u010d:"c",\u010c:"C",\u010b:"c",\u010a:"C",\u00c7:"C",\u00e7:"c",\u1e08:"C",\u1e09:"c",\u010d\u0323:"c",\u010c\u0323:"C",\u010e:"D",\u010f:"d",\u1e11:"d",\u1e10:"D",\u0111:"d",\u0110:"D",\u00d0:"D",\u00f0:"d",\u00c9:"E",\u00e9:"e",\u00c8:"E",\u00e8:"e",\u0114:"E",\u0115:"e",\u00ea:"e",\u00ca:"E",\u1ebe:"E",\u1ebf:"e",\u1ec1:"e",\u1ec0:"E",\u00ca\u030c:"E",\u00ea\u030c:"e",\u011a:"E",\u011b:"e",\u00eb:"e",\u00cb:"E",e\u030b:"e",E\u030b:"E",\u0116:"E",\u0117:"e",\u0228:"E",\u0229:"e",\u1e1d:"e",\u1e1c:"E",\u0118:"E",\u0119:"e",\u0112:"E",\u0113:"e",\u1e16:"E",\u1e17:"e",\u1e14:"E",\u1e15:"e",\u0204:"E",\u0205:"e",\u0206:"E",\u0207:"e",\u025b\u0327:"e",\u0190\u0327:"E",f\u030c:"f",F\u030c:"F",\u0192:"f",\u01f5:"g",\u01f4:"G",\u011f:"g",\u011e:"G",\u011c:"G",\u011d:"g",\u01e7:"g",\u01e6:"G",\u0120:"G",\u0121:"g",\u0123:"g",\u0122:"G",\u0124:"H",\u0125:"h",\u021f:"h",\u021e:"H",\u1e29:"h",\u1e28:"H",\u0127:"h",\u0126:"H",\u1e2b:"h",\u1e2a:"H",\u00ed:"i",\u00cd:"I",\u00cc:"I",\u00ec:"i",\u012c:"I",\u012d:"i",\u00ce:"I",\u00ee:"i",\u01d0:"i",\u01cf:"I",\u00ef:"i",\u00cf:"I",\u1e2f:"i",\u1e2e:"I",I\u030b:"I",i\u030b:"i",\u0129:"i",\u0128:"I",\u0130:"I",I\u0327:"I",i\u0327:"i",\u012e:"I",\u012f:"i",\u012b:"i",\u012a:"I",\u0209:"i",\u0208:"I",\u020b:"i",\u020a:"I",\u0133:"i",\u0132:"I",\u0131:"i",\u0197\u0327:"I",\u0268\u0327:"i",\u0135:"j",\u0134:"J",\u01f0:"j",J\u030c:"J",\u1e30:"K",\u1e31:"k",k\u0306:"k",K\u0306:"K",\u01e9:"k",\u01e8:"K",\u0137:"k",\u0136:"K",\u0139:"L",\u013a:"l",\u013d:"L",\u013e:"l",\u013c:"l",\u013b:"L",\u0142:"l",\u0141:"l",\u013f:"L",\u0140:"l",\u1e3e:"M",\u1e3f:"m",m\u0306:"m",M\u0306:"M",m\u030c:"m",M\u030c:"M",M\u0327:"M",m\u0327:"m",\u0143:"N",\u0144:"n",\u01f8:"N",\u01f9:"n",n\u0306:"n",N\u0306:"N",\u0147:"N",\u0148:"n",\u00f1:"n",\u00d1:"N",\u0145:"N",\u0146:"n",\u00f3:"o",\u00d3:"O",\u00d2:"O",\u00f2:"o",\u014e:"O",\u014f:"o",\u00d4:"O",\u00f4:"o",\u1ed1:"o",\u1ed0:"O",\u1ed3:"o",\u1ed2:"O",\u01d1:"O",\u01d2:"o",\u00d6:"O",\u00f6:"o",\u0151:"o",\u0150:"O",\u00d5:"O",\u00f5:"o",\u1e4d:"o",\u1e4c:"O",\u00d8:"O",\u00f8:"o",\u01fe:"O",\u01ff:"o",o\u0327:"o",O\u0327:"O",\u014c:"O",\u014d:"o",\u1e53:"o",\u1e52:"O",\u1e51:"o",\u1e50:"O",\u020d:"o",\u020c:"O",\u020f:"o",\u020e:"O",\u01a1:"o",\u01a0:"O",\u0153:"o",\u0152:"O",\u1e55:"p",\u1e54:"P",p\u0306:"p",P\u0306:"P",P\u030c:"P",p\u030c:"p",Q\u030c:"Q",q\u030c:"q",Q\u0327:"Q",q\u0327:"q",\u0155:"r",\u0154:"R",r\u0306:"r",R\u0306:"R",\u0158:"R",\u0159:"r",\u0157:"r",\u0156:"R",\u0158\u0329:"R",\u0159\u0329:"r",\u0211:"r",\u0210:"R",\u0212:"R",\u0213:"r",\u015a:"S",\u015b:"s",\u1e64:"S",\u1e65:"s",\u015c:"S",\u015d:"s",\u0161:"s",\u0160:"S",\u1e66:"S",\u1e67:"s",\u015f:"s",\u015e:"S",\u0219:"s",\u0218:"S",\u017f:"s",T\u0306:"T",t\u0306:"t",\u0164:"T",\u0165:"t",\u0163:"t",\u0162:"T",\u021a:"T",\u021b:"t",\u0167:"t",\u0166:"T",\u00da:"U",\u00fa:"u",\u00f9:"u",\u00d9:"U",\u016d:"u",\u016c:"U",\u00db:"U",\u00fb:"u",\u01d4:"u",\u01d3:"U",\u016e:"U",\u016f:"u",\u00fc:"u",\u00dc:"U",\u01d8:"u",\u01d7:"U",\u01db:"U",\u01dc:"u",\u01da:"u",\u01d9:"U",\u01d6:"u",\u01d5:"U",\u0170:"U",\u0171:"u",\u0169:"u",\u0168:"U",\u1e78:"U",\u1e79:"u",u\u0327:"u",U\u0327:"U",\u0172:"U",\u0173:"u",\u016a:"U",\u016b:"u",\u0215:"u",\u0214:"U",\u0216:"U",\u0217:"u",\u01b0:"u",\u01af:"U",\u1ee9:"u",\u1ee8:"U",\u1eeb:"u",\u1eea:"U",V\u0306:"V",v\u0306:"v",v\u030c:"v",V\u030c:"V",\u1e82:"W",\u1e83:"w",\u1e80:"W",\u1e81:"w",\u0175:"w",\u0174:"W",W\u030c:"W",w\u030c:"w",x\u0301:"x",X\u0301:"X",X\u0306:"X",x\u0306:"x",x\u030c:"x",X\u030c:"X",X\u0327:"X",x\u0327:"x",\u00dd:"Y",\u00fd:"y",\u1ef2:"Y",\u1ef3:"y",y\u0306:"y",Y\u0306:"Y",\u0176:"Y",\u0177:"y",y\u030c:"y",Y\u030c:"Y",\u00ff:"y",\u0178:"Y",\u017a:"z",\u0179:"Z",\u017d:"Z",\u017e:"z",\u017b:"Z",\u017c:"z",Z\u0327:"Z",z\u0327:"z"};function T(t){return"{{\\s*("+t+")\\s*}}"}function D(t,n,e){if("string"!=typeof t)return"";if("object"!=typeof n)return t;const r=Object.keys(n).join("|"),a=new RegExp(e?T(r):r,"g");return t.replace(a,s=>String(e?n[s.replace(/\{\{\s*|\s*\}\}/g,"")]:n[s]))}function C(t){return D(t,N)}function _(t){return t.reduce((n,e,r,{length:a})=>n+(r?a<3?" and ":r===a-1?", and ":", ":"")+e,"")}function O(t,n,e){return{key:t,params:n,message:D(e,n,!0)}}const S=t=>t;function L(t){const n=Object.getPrototypeOf(t),e=n.ngOnDestroy,r=new o.Subject;return n.ngOnDestroy=function(){e.apply(this,arguments),r.next(),r.complete()},(0,c.takeUntil)(r)}let R=(()=>{class t{constructor(e){this.injector=e,this.config={blueprints:e.get(p),errorTemplate:e.get(v),invalidClasses:e.get(h),mapErrorsFn:e.get(f),targetSelector:e.get(m),validateOnSubmit:e.get(g)},this.elRef=e.get(i.ElementRef)}get group(){return(this.groupRef||{}).form||(this.groupName||{}).control}get parent(){return this.parentRef||{getStream:()=>null}}get blueprints(){return{...d,...this._blueprints||this.parent.blueprints||this.config.blueprints||{}}}get errorTemplate(){return this._errorTemplate||this.parent.errorTemplate||this.config.errorTemplate}get invalidClasses(){return this._invalidClasses||this.parent.invalidClasses||this.config.invalidClasses}get mapErrorsFn(){return this._mapErrorsFn||this.parent.mapErrorsFn||this.config.mapErrorsFn}get skipValidation(){return E(this._skipValidation)||this.parent.skipValidation||this.config.skipValidation}get targetSelector(){return this._targetSelector||this.parent.targetSelector||this.config.targetSelector}get validateOnSubmit(){return E(this._validateOnSubmit)||this.parent.validateOnSubmit||this.config.validateOnSubmit}getStream(e){return(0,o.merge)(this[e+"$"]?this[e+"$"].asObservable():o.NEVER,this.parent.getStream(e)||o.NEVER)}ngOnDestroy(){}}return t.\u0275fac=function(e){return new(e||t)(i.\u0275\u0275directiveInject(i.Injector))},t.\u0275dir=i.\u0275\u0275defineDirective({type:t,selectors:[["abstractValidationDirective"]],inputs:{_blueprints:["blueprints","_blueprints"],_errorTemplate:["errorTemplate","_errorTemplate"],_invalidClasses:["invalidClasses","_invalidClasses"],_mapErrorsFn:["mapErrorsFn","_mapErrorsFn"],_skipValidation:["skipValidation","_skipValidation"],_targetSelector:["targetSelector","_targetSelector"],_validateOnSubmit:["validateOnSubmit","_validateOnSubmit"]}}),t})(),y=(()=>{class t{constructor(){this.trackByFn=(e,r)=>r.key}get errors(){return this.validationErrors||[]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.\u0275\u0275defineComponent({type:t,selectors:[["validation-error"]],decls:1,vars:2,consts:[["class","invalid-feedback",4,"ngFor","ngForOf","ngForTrackBy"],[1,"invalid-feedback"]],template:function(e,r){1&e&&i.\u0275\u0275template(0,w,2,1,"div",0),2&e&&i.\u0275\u0275property("ngForOf",r.errors)("ngForTrackBy",r.trackByFn)},dependencies:[V.NgForOf],encapsulation:2,changeDetection:0}),t})(),I=(()=>{class t{constructor(e){this.vcRef=e}}return t.\u0275fac=function(e){return new(e||t)(i.\u0275\u0275directiveInject(i.ViewContainerRef))},t.\u0275dir=i.\u0275\u0275defineDirective({type:t,selectors:[["","validationTarget",""]],exportAs:["validationTarget"]}),t})(),M=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=i.\u0275\u0275defineDirective({type:t,selectors:[["","validationContainer",""]],contentQueries:function(e,r,a){if(1&e&&i.\u0275\u0275contentQuery(a,I,5),2&e){let s;i.\u0275\u0275queryRefresh(s=i.\u0275\u0275loadQuery())&&(r.targetRef=s.first)}},exportAs:["validationContainer"]}),t})(),k=(()=>{class t extends R{constructor(e,r,a,s,b){super(e),this.injector=e,this.cdRef=r,this.groupName=a,this.groupRef=s,this.parentRef=b,this.status$=new o.ReplaySubject(1),this.submit$=new o.ReplaySubject(1),this.value$=new o.ReplaySubject(1),this.subs=new o.Subscription}subscribeToFormSubmit(){this.elRef.nativeElement.onsubmit=e=>{this.group.invalid&&e.preventDefault(),this.submit$.next(this.group),this.cdRef.markForCheck()}}subscribeToStatusChanges(){this.subs.add(this.group.statusChanges.subscribe(()=>{this.status$.next(this.group),this.cdRef.markForCheck()}))}subscribeToValueChanges(){this.subs.add(this.group.valueChanges.subscribe(()=>{this.value$.next(this.group),this.cdRef.markForCheck()}))}ngAfterViewInit(){this.parentRef||this.subscribeToFormSubmit(),this.subscribeToStatusChanges(),this.subscribeToValueChanges()}ngOnDestroy(){this.subs.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(i.\u0275\u0275directiveInject(i.Injector),i.\u0275\u0275directiveInject(i.ChangeDetectorRef),i.\u0275\u0275directiveInject(u.FormGroupName,10),i.\u0275\u0275directiveInject(u.FormGroupDirective,10),i.\u0275\u0275directiveInject(t,12))},t.\u0275dir=i.\u0275\u0275defineDirective({type:t,selectors:[["","formGroup",""],["","formGroupName",""]],exportAs:["validationGroup"],features:[i.\u0275\u0275InheritDefinitionFeature]}),t})(),F=(()=>{class t{constructor(e){this.elRef=e}}return t.\u0275fac=function(e){return new(e||t)(i.\u0275\u0275directiveInject(i.ElementRef))},t.\u0275dir=i.\u0275\u0275defineDirective({type:t,selectors:[["","validationStyle",""]],exportAs:["validationStyle"]}),t})(),j=(()=>{class t extends R{constructor(e,r,a,s,b,G,B,$,K,W){super(e),this.injector=e,this.cdRef=r,this.control=a,this.renderer=s,this.vcRef=b,this.parentRef=G,this.markRef=B,this.targetRef=$,this.containerRef=K,this.formGroupDirective=W,this.isSubmitted=!1,this.subscriptions=new o.Subscription}get validation$(){return(0,o.merge)(this.parent.getStream("status").pipe((0,c.mapTo)(null)),this.parent.getStream("value").pipe((0,c.mapTo)(null)),this.parent.getStream("submit"))}buildErrors(e){return Object.keys(e||{}).map(r=>O(r,e[r],this.blueprints[r]))}insertErrorClasses(){this.renderer.addClass(this.markElement,this.invalidClasses)}insertErrors(e){const r=this.errorTemplate,a=this.containerRef?this.containerRef.targetRef:this.targetRef,s=a?a.vcRef:this.vcRef;this.errorRef=r instanceof i.TemplateRef?s.createEmbeddedView(r,{$implicit:e},s.length):s.createComponent(r,{index:s.length,injector:this.injector}),this.errorRef instanceof i.ComponentRef&&this.errorRef.instance&&(this.errorRef.instance.validationErrors=e)}removeErrorClasses(){this.renderer.removeClass(this.markElement,this.invalidClasses)}removeErrors(){this.errorRef&&(this.errorRef.destroy(),this.errorRef=null)}setMarkElement(){this.markElement=(this.markRef?this.markRef.elRef.nativeElement:this.targetSelector?this.elRef.nativeElement.closest(this.targetSelector):null)||this.elRef.nativeElement}shouldValidate(e){return e.length&&this.control.dirty&&(!this.validateOnSubmit||this.isSubmitted)}subscribeToValidation(){let e;this.subscriptions.add(this.validation$.pipe((0,c.filter)(()=>!this.skipValidation),(0,c.tap)(r=>{r&&this.formGroupDirective.submitted&&(this.control.control.markAsDirty(),this.isSubmitted=!0)}),(0,c.map)(()=>this.mapErrorsFn(this.buildErrors(this.control.errors),this.buildErrors((this.parentRef.group||{}).errors),this.control))).subscribe(r=>{e!==JSON.stringify(r)&&(this.removeErrors(),this.shouldValidate(r)?(this.insertErrors(r),e||this.insertErrorClasses(),e=JSON.stringify(r)):(this.removeErrorClasses(),e=""),this.cdRef.markForCheck())}))}ngAfterViewInit(){this.setMarkElement(),this.subscribeToValidation()}ngOnDestroy(){this.subscriptions.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(i.\u0275\u0275directiveInject(i.Injector),i.\u0275\u0275directiveInject(i.ChangeDetectorRef),i.\u0275\u0275directiveInject(u.NgControl,2),i.\u0275\u0275directiveInject(i.Renderer2),i.\u0275\u0275directiveInject(i.ViewContainerRef),i.\u0275\u0275directiveInject(k,4),i.\u0275\u0275directiveInject(F,12),i.\u0275\u0275directiveInject(I,12),i.\u0275\u0275directiveInject(M,8),i.\u0275\u0275directiveInject(u.FormGroupDirective,8))},t.\u0275dir=i.\u0275\u0275defineDirective({type:t,selectors:[["","formControl",""],["","formControlName",""]],exportAs:["validationDirective"],features:[i.\u0275\u0275InheritDefinitionFeature]}),t})(),P=(()=>{class t{static forRoot(e={}){return{ngModule:t,providers:[{provide:p,useValue:e.blueprints||d},{provide:v,useValue:e.errorTemplate||y},{provide:h,useValue:e.invalidClasses||"is-invalid"},{provide:f,useValue:e.mapErrorsFn||S},{provide:m,useValue:e.targetSelector},{provide:g,useValue:e.validateOnSubmit}]}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=i.\u0275\u0275defineInjector({imports:[V.CommonModule,u.FormsModule,u.ReactiveFormsModule]}),t})();function U([t,n]){return e=>{const r=e.get(t).value,a=e.get(n).value;return r&&a&&r!==a?{passwordMismatch:{fields:[t,n]}}:null}}function x(t=["small","capital","number","special"]){return n=>{if(!n.value)return null;const e=C(n.value),r={small:/.*[a-z].*/,capital:/.*[A-Z].*/,number:/.*[0-9].*/,special:/.*[^0-9a-zA-Z].*/},a=t.filter(s=>!r[s].test(e));return a.length?{invalidPassword:{missing:a,description:_(a.map(s=>({small:"a small letter",capital:"a capital",number:"a number",special:"a special character"}[s])))}}:null}}}}]);