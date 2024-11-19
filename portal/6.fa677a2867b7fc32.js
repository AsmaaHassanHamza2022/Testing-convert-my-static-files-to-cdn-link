(self.webpackChunkportal=self.webpackChunkportal||[]).push([[6],{6:(Q,S,a)=>{a.r(S),a.d(S,{AbpAuthService:()=>B,AbpSettingsService:()=>D,AbpToolbarService:()=>b,AbpTranslateService:()=>O,AbpValidationErrorComponent:()=>P,AbpValidationErrorModule:()=>y,HttpErrorComponent:()=>U,HttpErrorModule:()=>T,LPX_TRANSLATE_KEY_MAP_TOKEN:()=>M,ThemeLeptonXModule:()=>w,eUserMenuItems:()=>p});var e=a(1705),g=a(4478),E=a(2411),c=a(1011),R=a(8675),l=a(2070),h=a(4125),_=a(6960),u=a(973),A=a(7437),C=a(533),f=a(14),I=a(3613),N=a(938);function x(t,s){if(1&t&&(e.\u0275\u0275elementStart(0,"span"),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275elementEnd()),2&t){const n=s.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind2(2,1,n.message,n.interpoliteParams),"")}}let P=(()=>{class t extends g.ValidationErrorComponent{get abpErrors(){return this.errors&&this.errors.length?this.errors.map(n=>{if(!n.message)return n;const o=n.message.indexOf("[");return o>-1?{...n,message:n.message.slice(0,o),interpoliteParams:n.message.slice(o+1,n.message.length-1).split(",")}:n}):[]}static#e=this.\u0275fac=function(){let n;return function(i){return(n||(n=e.\u0275\u0275getInheritedFactory(t)))(i||t)}}();static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["abp-validation-error"]],features:[e.\u0275\u0275InheritDefinitionFeature],decls:2,vars:2,consts:[["data-valmsg-for","Role.Name","data-valmsg-replace","true",1,"text-danger"],[4,"ngFor","ngForOf","ngForTrackBy"]],template:function(o,i){1&o&&(e.\u0275\u0275elementStart(0,"span",0),e.\u0275\u0275template(1,x,3,4,"span",1),e.\u0275\u0275elementEnd()),2&o&&(e.\u0275\u0275advance(1),e.\u0275\u0275property("ngForOf",i.abpErrors)("ngForTrackBy",i.trackByFn))},dependencies:[E.NgForOf,c.LocalizationPipe],encapsulation:2,changeDetection:0})}return t})(),y=(()=>{class t{static forRoot(){return{ngModule:t,providers:[{provide:g.VALIDATION_ERROR_TEMPLATE,useValue:P},{provide:g.VALIDATION_INVALID_CLASSES,useValue:"is-invalid"},{provide:g.VALIDATION_TARGET_SELECTOR,useValue:".form-group"}]}}static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:t});static#n=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[E.CommonModule,c.CoreModule,g.NgxValidateCoreModule,g.NgxValidateCoreModule]})}return t})(),U=(()=>{class t{constructor(){this.errorStatus="401"}get errorStatusText(){switch(this.errorStatus){case"401":return"AbpUi::401Message";case"403":return"AbpUi::403Message";case"404":return"AbpUi::404Message";case"500":return"AbpUi::500Message";default:return""}}get errorDetail(){switch(this.errorStatus){case"401":return"AbpUi::DefaultErrorMessage401Detail";case"403":return"AbpUi::DefaultErrorMessage403Detail";case"404":return"AbpUi::DefaultErrorMessage404Detail";case"500":return"AbpUi::DefaultErrorMessage";default:return""}}static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["abp-http-error"]],decls:24,vars:13,consts:[[1,"error-page-container"],[1,"row"],[1,"col","col-auto"],[1,"status-icon"],["aria-hidden","true",1,"fa","fa-frown-o","text-danger"],[1,"col"],[1,"status-content"],[1,"text-danger","mb-0"],[1,"text-muted"],[1,"mt-3","mb-4"],["routerLink","/",1,"btn","btn-primary",3,"click"],["href","javascript:void(0)",1,"mt-4","mb-1","d-block",3,"click"],[1,"fa","fa-long-arrow-left","me-1"]],template:function(o,i){1&o&&(e.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),e.\u0275\u0275element(4,"i",4)(5,"span"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(6,"div",5)(7,"div",6)(8,"h1"),e.\u0275\u0275text(9),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"h2",7),e.\u0275\u0275text(11),e.\u0275\u0275pipe(12,"abpLocalization"),e.\u0275\u0275elementStart(13,"small",8),e.\u0275\u0275text(14),e.\u0275\u0275pipe(15,"abpLocalization"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(16,"p",9),e.\u0275\u0275elementStart(17,"a",10),e.\u0275\u0275listener("click",function(){return i.destroy$.next()}),e.\u0275\u0275text(18),e.\u0275\u0275pipe(19,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(20,"a",11),e.\u0275\u0275listener("click",function(){return i.destroy$.next()}),e.\u0275\u0275element(21,"i",12),e.\u0275\u0275text(22),e.\u0275\u0275pipe(23,"abpLocalization"),e.\u0275\u0275elementEnd()()()()()),2&o&&(e.\u0275\u0275advance(9),e.\u0275\u0275textInterpolate(i.errorStatus),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(12,5,i.errorStatusText),""),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(15,7,i.errorDetail)),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(19,9,"AbpUi::GoHomePage")),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(23,11,"AbpUi::GoBack")))},dependencies:[R.RouterLink,c.LocalizationPipe],encapsulation:2})}return t})(),T=(()=>{class t{static forRoot(){return{ngModule:t,providers:[]}}static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:t});static#n=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[c.CoreModule,E.CommonModule]})}return t})();var p=function(t){return t.LinkedAccounts="LinkedAccounts",t.MyAccount="MyAccount",t.Logout="Logout",t.SecurityLogs="SecurityLogs",t.BackToImpersonator="BackToImpersonator",t.AuthorityDelegation="AuthorityDelegation",t}(p||{});let D=(()=>{class t{constructor(n,o,i,r,d,v,m,L,Z){this.sessionService=n,this.configStateService=o,this.languageService=i,this.userProfileService=r,this.profilePicture$=d,this.navigateToManageProfile=v,this.navigateToMySecurityLogs=m,this.openMyLinkUsersModal=L,this.userMenuService=Z}setUpListeners(){this.listenToLangChange(),this.setLanguageOptions(),this.setUserProfile(),this.setProfilePicture(),this.setUserMenuGroups()}setUserProfile(){const n=r=>r||"",o=this.configStateService.getOne$("currentUser").pipe((0,l.filter)(Boolean)),i=this.configStateService.getOne$("currentTenant").pipe((0,l.filter)(Boolean));(0,h.combineLatest)([o,i]).subscribe(([r,d])=>{this.userProfileService.patchUser({userName:r.userName,fullName:n(r.name)+" "+n(r.surName),email:r.email,tenant:d})})}setUserMenuGroups(){this.userMenuService.items$.subscribe(n=>{const o=n.reduce((i,r,d)=>(i[d===n.length-1?1:0].push({icon:r.textTemplate?.icon,text:r.textTemplate?.text,component:r?.component,action:()=>(r.action(),(0,h.of)(!0)),visible:r.visible}),i),[[],[]]);this.userProfileService.patchUser({userActionGroups:o})})}setProfilePicture(){this.profilePicture$.pipe((0,l.filter)(Boolean)).subscribe(n=>this.userProfileService.patchUser({avatar:{type:n.type,source:n.source||""}}))}setLanguageOptions(){this.sessionService.getLanguage$().pipe((0,l.switchMap)(n=>this.configStateService.getDeep$("localization.languages").pipe((0,l.filter)(Boolean),(0,l.map)(o=>o.map(({cultureName:i,...r})=>({...r,cultureName:i,selected:i===n,isRTL:"rtl"===(0,c.getLocaleDirection)(i)})))))).subscribe(n=>{this.languageService.setLanguages(n)})}listenToLangChange(){this.languageService.selectedLanguage$.pipe((0,l.filter)(Boolean)).subscribe(n=>{this.sessionService.setLanguage(n?.cultureName||"")})}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275inject(c.SessionStateService),e.\u0275\u0275inject(c.ConfigStateService),e.\u0275\u0275inject(_.TS),e.\u0275\u0275inject(_.iw),e.\u0275\u0275inject(u.PROFILE_PICTURE),e.\u0275\u0275inject(c.NAVIGATE_TO_MANAGE_PROFILE),e.\u0275\u0275inject(u.NAVIGATE_TO_MY_SECURITY_LOGS),e.\u0275\u0275inject(u.OPEN_MY_LINK_USERS_MODAL,8),e.\u0275\u0275inject(A.UserMenuService))};static#t=this.\u0275prov=e.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),b=(()=>{class t{constructor(n,o,i){this.toolbar=n,this.navItems=o,this.permissionService=i}listenNavItems(){this.navItems.items$.pipe((0,l.switchMap)(n=>this.permissionService.filterItemsByPolicy$(n))).subscribe(n=>{this.toolbar.setItems(n)})}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275inject(C.Ok),e.\u0275\u0275inject(A.NavItemsService),e.\u0275\u0275inject(c.PermissionService))};static#t=this.\u0275prov=e.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();const M=new e.InjectionToken("LPX_TRANSLATE_KEY_MAP_TOKEN");let O=(()=>{class t{constructor(n,o){this.localization=n,this.translateKeys=o}get(n,o){const i=this.getKey(n);return i?this.localization.instant({key:i,defaultValue:o}):o||n}get$(n,o){const i=this.getKey(n);return i?this.localization.get({key:i,defaultValue:o}):(0,h.of)(o||n)}getKey(n){const o=(0,_.PY)(this.translateKeys);return o[n]?o[n]:n.includes("::")?n:void 0}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275inject(c.LocalizationService),e.\u0275\u0275inject(M))};static#t=this.\u0275prov=e.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac})}return t})(),B=(()=>{class t{constructor(n,o){this.userProfileService=n,this.authService=o,this.isUserExists$=this.userProfileService.user$.pipe((0,l.map)(i=>i&&!!i.userName))}navigateToLogin(){this.authService.navigateToLogin()}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275inject(_.iw),e.\u0275\u0275inject(c.AuthService))};static#t=this.\u0275prov=e.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac})}return t})();const F={provide:e.APP_INITIALIZER,useFactory:function K(){return function t(){const s=document.querySelector("#lp-page-loader");return s&&(s.style.background="var(--background)",setTimeout(()=>s.parentNode?.removeChild(s),500)),Promise.resolve()}},multi:!0},k={provide:e.APP_INITIALIZER,useFactory:function V(t,s,n){return function o(){s.listenNavItems(),n.setUpListeners(),t.initRoutes()}},deps:[I.F2,b,D],multi:!0},j={provide:_.O,useClass:O},G={provide:M,multi:!0,useValue:{[_.Q6.SettingsTitle]:"LeptonX::Language",[f.gN.AppearanceTitle]:"LeptonX::Appearance",[f.gN.DarkMode]:"LeptonX::Theme:dark",[f.gN.LightMode]:"LeptonX::Theme:light",[f.gN.SemiDarkMode]:"LeptonX::Theme:dim",[f.gN.System]:"LeptonX::Theme:system"}},W=[{provide:e.APP_INITIALIZER,useFactory:function X(t){const s=t.get(A.UserMenuService),n=t.get(c.AuthService),o=t.get(c.NAVIGATE_TO_MANAGE_PROFILE),i=t.get(u.NAVIGATE_TO_MY_SECURITY_LOGS),r=t.get(c.ConfigStateService),d=t.get(u.ImpersonationService),v=t.get(u.OPEN_MY_LINK_USERS_MODAL,null),m=t.get(u.OPEN_AUTHORITY_DELEGATION_MODAL,null);return()=>{s.addItems([{id:p.LinkedAccounts,order:100,textTemplate:{icon:"bi bi-link",text:"AbpAccount::LinkedAccounts"},action:()=>v(),visible:()=>!!v},{id:p.AuthorityDelegation,order:100,textTemplate:{text:"AbpAccount::AuthorityDelegation",icon:"fa fa-users"},action:()=>m()},{id:p.MyAccount,order:100,textTemplate:{icon:"bi bi-sliders",text:"AbpAccount::MyAccount"},action:()=>o()},{id:p.SecurityLogs,order:100,textTemplate:{icon:"bi bi-list-ul",text:"AbpAccount::MySecurityLogs"},action:()=>i()},{id:p.Logout,order:102,textTemplate:{icon:"bi bi-box-arrow-right",text:"AbpUi::Logout"},action:()=>{n.logout().subscribe()}},{id:p.BackToImpersonator,order:101,textTemplate:{text:"AbpAccount::BackToImpersonator",icon:"fa fa-arrow-left"},visible:()=>{const{currentUser:{impersonatorUserId:L}}=r.getAll();return!!L},action:()=>d.impersonate({}).subscribe()}])}},deps:[e.Injector],multi:!0}],Y={provide:e.APP_INITIALIZER,useFactory:function z(t){return function s(){t.get(c.ReplaceableComponentsService).add({key:"Theme.AccountLayoutComponent",component:N.AccountLayoutComponent})}},deps:[e.Injector],multi:!0};let w=(()=>{class t{static forRoot(n){return{ngModule:t,providers:[F,u.PROFILE_PICTURE_PROVIDERS,W,k,y.forRoot().providers,f.Db.forRoot({...H(n)}).providers,G,j,I.Tt.forRoot().providers,Y]}}static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:t});static#n=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[T,T]})}return t})();function H(t){return{...t,styleFactory:s=>(s.push({bundleName:"abp-bundle"}),t?.styleFactory?t.styleFactory(s):s)}}}}]);