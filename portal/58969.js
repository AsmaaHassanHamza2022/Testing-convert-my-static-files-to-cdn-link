(self.webpackChunkportal=self.webpackChunkportal||[]).push([[58969],{58969:(Me,W,c)=>{c.r(W),c.d(W,{ApplicationFormModalComponent:()=>d,ApplicationsComponent:()=>b,ApplicationsService:()=>S,DEFAULT_APPLICATIONS_CREATE_FORM_PROPS:()=>M,DEFAULT_APPLICATIONS_ENTITY_ACTIONS:()=>k,DEFAULT_APPLICATIONS_ENTITY_PROPS:()=>Q,DEFAULT_APPLICATIONS_FORM_PROPS:()=>Z,DEFAULT_APPLICATIONS_TOOLBAR_ACTIONS:()=>X,DEFAULT_OPENIDDICT_PRO_CREATE_FORM_PROPS:()=>se,DEFAULT_OPENIDDICT_PRO_EDIT_FORM_PROPS:()=>re,DEFAULT_OPENIDDICT_PRO_ENTITY_ACTIONS:()=>oe,DEFAULT_OPENIDDICT_PRO_ENTITY_PROPS:()=>ae,DEFAULT_OPENIDDICT_PRO_TOOLBAR_ACTIONS:()=>ne,DEFAULT_SCOPES_ENTITY_PROPS:()=>q,DEFAULT_SCOPES_FORM_PROPS:()=>te,DEFAULT_SCOPES_TOOLBAR_ACTIONS:()=>ee,DEFAULT_SCOPE_CREATE_FORM_PROPS:()=>w,DEFAULT_SCOPE_ENTITY_ACTIONS:()=>ie,DefaultApplicationsConsentType:()=>H,OPENIDDICT_PRO_CREATE_FORM_PROP_CONTRIBUTORS:()=>j,OPENIDDICT_PRO_EDIT_FORM_PROP_CONTRIBUTORS:()=>B,OPENIDDICT_PRO_ENTITY_ACTION_CONTRIBUTORS:()=>x,OPENIDDICT_PRO_ENTITY_PROP_CONTRIBUTORS:()=>U,OPENIDDICT_PRO_TOOLBAR_ACTION_CONTRIBUTORS:()=>V,OpenIddictProExtensionsGuard:()=>z,OpeniddictproModule:()=>Fe,ScopeFormModalComponent:()=>L,ScopesComponent:()=>C,ScopesService:()=>N,UrisValidator:()=>E,allowFlow:()=>y,defaultApplicationTypes:()=>v,defaultApplicationsTypeList:()=>G,defaultUriPattern:()=>J,hashSetParser:()=>T});var e=c(11705),l=c(81011),Y=c(28675),u=c(27437),s=c(32709),f=c(53350),O=c(86418),R=c(42595),K=c(37255),$=c(4125),D=c(62411),_=c(36394),F=c(74478),h=c(32070),pe=c(82830);function ce(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"h3"),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275elementEnd()),2&t){const i=e.\u0275\u0275nextContext(2);e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(2,1,null!=i.selected&&i.selected.id?"AbpOpenIddict::Edit":"AbpOpenIddict::NewApplication"))}}function de(t,a){if(1&t&&e.\u0275\u0275element(0,"abp-extensible-form",8),2&t){const i=e.\u0275\u0275nextContext(3);e.\u0275\u0275property("selectedRecord",i.selected)}}function me(t,a){if(1&t){const i=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"form",5),e.\u0275\u0275listener("ngSubmit",function(){e.\u0275\u0275restoreView(i);const n=e.\u0275\u0275nextContext(2);return e.\u0275\u0275resetView(n.save())}),e.\u0275\u0275elementStart(1,"div",6),e.\u0275\u0275template(2,de,1,1,"abp-extensible-form",7),e.\u0275\u0275elementEnd()()}if(2&t){const i=e.\u0275\u0275nextContext().ngIf,o=e.\u0275\u0275nextContext();e.\u0275\u0275property("formGroup",o.form),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",i)}}function ue(t,a){1&t&&(e.\u0275\u0275elementStart(0,"button",9),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"abp-button",10),e.\u0275\u0275text(4),e.\u0275\u0275pipe(5,"abpLocalization"),e.\u0275\u0275elementEnd()),2&t&&(e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(2,2,"AbpOpenIddict::Cancel")," "),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(5,4,"AbpOpenIddict::Save")))}function _e(t,a){if(1&t){const i=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"abp-modal",1),e.\u0275\u0275listener("visibleChange",function(n){e.\u0275\u0275restoreView(i);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.visibleChange(n))}),e.\u0275\u0275template(1,ce,3,3,"ng-template",null,2,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275template(3,me,3,2,"ng-template",null,3,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275template(5,ue,6,6,"ng-template",null,4,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275elementEnd()}if(2&t){const i=a.ngIf,o=e.\u0275\u0275nextContext();e.\u0275\u0275property("visible",i)("options",o.options)}}function Ie(t,a){if(1&t){const i=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"abp-permission-management",7),e.\u0275\u0275listener("visibleChange",function(n){e.\u0275\u0275restoreView(i);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.visiblePermissions=n)}),e.\u0275\u0275elementEnd()}if(2&t){const i=e.\u0275\u0275nextContext();e.\u0275\u0275property("visible",i.visiblePermissions)("providerKey",i.providerKey)}}const Oe=function(){return{value:"C"}},Te=function(t){return{value:t}},be=function(t){return{value:t,twoWay:!0}},ve=function(t,a,i){return{providerName:t,providerKey:a,visible:i}},ge=function(t){return{visibleChange:t}},Ae=function(t,a){return{inputs:t,outputs:a,componentKey:"PermissionManagement.PermissionManagementComponent"}};function fe(t,a){if(1&t&&(e.\u0275\u0275elementStart(0,"h3"),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275elementEnd()),2&t){const i=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(2,1,null!=i.selected&&i.selected.id?"AbpOpenIddict::Edit":"AbpOpenIddict::NewScope"))}}function Pe(t,a){if(1&t){const i=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"form",4),e.\u0275\u0275listener("ngSubmit",function(){e.\u0275\u0275restoreView(i);const n=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(n.save())}),e.\u0275\u0275element(1,"abp-extensible-form",5),e.\u0275\u0275elementEnd()}if(2&t){const i=e.\u0275\u0275nextContext();e.\u0275\u0275property("formGroup",i.form)("blueprints",i.blueprints),e.\u0275\u0275advance(1),e.\u0275\u0275property("selectedRecord",i.selected)}}function he(t,a){1&t&&(e.\u0275\u0275elementStart(0,"button",6),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"abp-button",7),e.\u0275\u0275text(4),e.\u0275\u0275pipe(5,"abpLocalization"),e.\u0275\u0275elementEnd()),2&t&&(e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(2,2,"AbpOpenIddict::Cancel")," "),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(5,4,"AbpOpenIddict::Save")))}class S{constructor(){this.state=new l.InternalStore({isModalVisible:!1}),this.isModalVisible$=this.state.sliceState(a=>a.isModalVisible)}openModal(){this.setModalState(!0)}setModalState(a){this.state.patch({isModalVisible:a})}}const G=[{key:"Confidential client",value:"confidential"},{key:"Public client",value:"public"}],v={public:"public",confidential:"confidential"},Se=/\r?\n/,ye="\n";function T(t){return Array.isArray(t)?t.join(ye):"string"==typeof t?t?t.split(Se):null:t}const H=[{key:"Explicit consent",value:"explicit"},{key:"External consent",value:"external"},{key:"Implicit consent",value:"implicit"},{key:"Systematic consent",value:"systematic"}];let d=(()=>{class t{constructor(i,o,n,r,I){this.service=i,this.applicationsService=o,this.localizationService=n,this.subscription=r,this.injector=I,this.saved=new e.EventEmitter,this.types$=(0,$.of)(G),this.consentTypes$=(0,$.of)(H),this.options={size:"lg"},this.isModalVisible$=this.applicationsService.isModalVisible$}ngOnChanges(i){this.createForm(),this.hideFlowToType()}visibleChange(i){this.applicationsService.setModalState(i)}save(){if(this.form.invalid)return;const i=this.selected?.id,o=!!i;let n;const r=P=>Array.isArray(P)?P:T(P),I={...this.form.value,redirectUris:r(this.form.value.redirectUris),postLogoutRedirectUris:r(this.form.value.postLogoutRedirectUris),extensionGrantTypes:r(this.form.value.extensionGrantTypes)};n=o?this.service.update(i,I):this.service.create(I),n.subscribe(()=>{this.applicationsService.setModalState(!1),this.saved.emit()})}getFormValue(){return this.form?.value||{}}createForm(){const i=this.selected?.id?{...this.selected,redirectUris:T(this.selected.redirectUris),postLogoutRedirectUris:T(this.selected.postLogoutRedirectUris),extensionGrantTypes:T(this.selected.extensionGrantTypes)}:{},o=new s.FormPropData(this.injector,i);this.form=(0,s.generateFormFromProps)(o)}hideFlowToType(){const i=this.form.controls.type;this.subscription.removeOne(this.formValueChanges$),this.formValueChanges$=this.subscription.addOne(i.valueChanges,o=>{o==v.public&&this.form.patchValue({allowDeviceEndpoint:!1,allowClientCredentialsFlow:!1})})}changeTextToType(i){return this.getFormValue().type===v.public?this.localizationService.instant(i)+" ("+this.localizationService.instant("AbpOpenIddict::NotAvailableForThisType")+")":this.localizationService.instant(i)}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275directiveInject(f.ApplicationService),e.\u0275\u0275directiveInject(S),e.\u0275\u0275directiveInject(l.LocalizationService),e.\u0275\u0275directiveInject(l.SubscriptionService),e.\u0275\u0275directiveInject(e.Injector))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["abp-application-form-modal"]],inputs:{selected:"selected"},outputs:{saved:"saved"},features:[e.\u0275\u0275ProvidersFeature([]),e.\u0275\u0275NgOnChangesFeature],decls:2,vars:3,consts:[[3,"visible","options","visibleChange",4,"ngIf"],[3,"visible","options","visibleChange"],["abpHeader",""],["abpBody",""],["abpFooter",""],["id","applicationForm","validateOnSubmit","",3,"formGroup","ngSubmit"],[1,"row"],["class","row gap-x2",3,"selectedRecord",4,"ngIf"],[1,"row","gap-x2",3,"selectedRecord"],["type","button","abpClose","",1,"btn","btn-secondary"],["iconClass","fa fa-check","buttonType","submit","formName","applicationForm"]],template:function(o,n){1&o&&(e.\u0275\u0275template(0,_e,7,2,"abp-modal",0),e.\u0275\u0275pipe(1,"async")),2&o&&e.\u0275\u0275property("ngIf",e.\u0275\u0275pipeBind1(1,1,n.isModalVisible$))},dependencies:[D.NgIf,_.\u0275NgNoValidate,_.NgControlStatusGroup,_.FormGroupDirective,l.FormSubmitDirective,s.ExtensibleFormComponent,F.ValidationGroupDirective,u.ButtonComponent,u.ModalComponent,u.ModalCloseDirective,D.AsyncPipe,l.LocalizationPipe],encapsulation:2})}return t})(),b=(()=>{class t{constructor(i,o,n,r){this.service=i,this.applicationsService=o,this.confirmationService=n,this.list=r,this.data={items:[],totalCount:0},this.selected={},this.visiblePermissions=!1,this.onVisiblePermissionChange=I=>{this.visiblePermissions=I}}onSaved(){this.list.get()}edit(i){this.service.get(i).subscribe(o=>{this.selected=o,this.applicationsService.openModal()})}delete(i,o){this.confirmationService.warn("AbpOpenIddict::ApplicationDeletionWarningMessage","AbpOpenIddict::AreYouSure",{messageLocalizationParams:[o]}).subscribe(n=>{n===u.Confirmation.Status.confirm&&this.service.delete(i).subscribe(()=>this.list.get())})}ngOnInit(){this.hookToQuery()}onAdd(){this.selected={},this.applicationsService.openModal()}openPermissionsModal(i){this.providerKey=i,setTimeout(()=>{this.visiblePermissions=!0},0)}hookToQuery(){this.list.hookToQuery(i=>this.service.getList(i)).subscribe(i=>this.data=i)}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275directiveInject(f.ApplicationService),e.\u0275\u0275directiveInject(S),e.\u0275\u0275directiveInject(u.ConfirmationService),e.\u0275\u0275directiveInject(l.ListService))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["abp-applications"]],features:[e.\u0275\u0275ProvidersFeature([l.ListService,{provide:s.EXTENSIONS_IDENTIFIER,useValue:"OpenIddictPro.Applications"}])],decls:8,vars:24,consts:[[3,"title","toolbar"],["id","wrapper"],["localizationSourceName","AbpOpenIddict",3,"list"],[1,"card"],[3,"data","recordsTotal","list"],[3,"selected","saved"],["providerName","C",3,"visible","providerKey","visibleChange",4,"abpReplaceableTemplate"],["providerName","C",3,"visible","providerKey","visibleChange"]],template:function(o,n){1&o&&(e.\u0275\u0275elementStart(0,"abp-page",0),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275elementStart(2,"div",1),e.\u0275\u0275element(3,"abp-advanced-entity-filters",2),e.\u0275\u0275elementStart(4,"div",3),e.\u0275\u0275element(5,"abp-extensible-table",4),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(6,"abp-application-form-modal",5),e.\u0275\u0275listener("saved",function(){return n.onSaved()}),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(7,Ie,1,2,"abp-permission-management",6)),2&o&&(e.\u0275\u0275property("title",e.\u0275\u0275pipeBind1(1,8,"AbpOpenIddict::Applications"))("toolbar",n.data.items),e.\u0275\u0275advance(3),e.\u0275\u0275property("list",n.list),e.\u0275\u0275advance(2),e.\u0275\u0275property("data",n.data.items)("recordsTotal",n.data.totalCount)("list",n.list),e.\u0275\u0275advance(1),e.\u0275\u0275property("selected",n.selected),e.\u0275\u0275advance(1),e.\u0275\u0275property("abpReplaceableTemplate",e.\u0275\u0275pureFunction2(21,Ae,e.\u0275\u0275pureFunction3(15,ve,e.\u0275\u0275pureFunction0(10,Oe),e.\u0275\u0275pureFunction1(11,Te,n.providerKey),e.\u0275\u0275pureFunction1(13,be,n.visiblePermissions)),e.\u0275\u0275pureFunction1(19,ge,n.onVisiblePermissionChange))))},dependencies:[l.ReplaceableTemplateDirective,s.ExtensibleTableComponent,O.AdvancedEntityFiltersComponent,R.PageComponent,K.M,d,l.LocalizationPipe],encapsulation:2})}return t})();const k=s.EntityAction.createMany([{text:"AbpOpenIddict::Edit",action:t=>{t.getInjected(b).edit(t.record.id)},permission:"OpenIddictPro.Application.Update"},{text:"AbpOpenIddict::ChangeHistory",action:t=>{t.getInjected(O.SHOW_ENTITY_HISTORY)(t.record.id,"Volo.Abp.OpenIddict.Applications.OpenIddictApplication")},permission:"AuditLogging.ViewChangeHistory:Volo.Abp.OpenIddict.Pro.Applications.Application"},{text:"AbpOpenIddict::Permissions",action:t=>{t.getInjected(b).openPermissionsModal(t.record.clientId)},permission:"OpenIddictPro.Application.ManagePermissions"},{text:"LanguageManagement::Delete",action:t=>{t.getInjected(b).delete(t.record.id,t.record.clientId)},permission:"LanguageManagement.Languages.Delete"}]),Q=s.EntityProp.createMany([{type:"string",name:"clientId",displayName:"AbpOpenIddict::ClientId",columnWidth:200},{type:"string",name:"displayName",displayName:"AbpOpenIddict::DisplayName",columnWidth:200},{type:"string",name:"type",displayName:"AbpOpenIddict::Type",columnWidth:200}]),X=s.ToolbarAction.createMany([{text:"AbpOpenIddict::NewApplication",action:t=>{t.getInjected(b).onAdd()},permission:"OpenIddictPro.Application.Create",icon:"fa fa-plus"}]),y=({allowImplicitFlow:t,allowAuthorizationCodeFlow:a,allowHybridFlow:i})=>a||t||i,J=/^([a-z][a-z0-9+.-]*):(?:\/\/((?:(?=((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*))(\3)@)?(?=(\[[0-9A-F:.]{2,}\]|(?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*))\5(?::(?=(\d*))\6)?)(\/(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\8)?|(\/?(?!\/)(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*))\10)?)(?:\?(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\11)?(?:#(?=((?:[a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9A-F]{2})*))\12)?$/i,Ee=/(\r\n|\r|\n)/;function E(){const t=J;return a=>{if(function Ne(t){return null==t||("string"==typeof t||Array.isArray(t))&&0===t.length}(a.value))return null;const i=a.value,o=i.split(Ee).filter(r=>!!r.trim());return 0===o.length||o.every(r=>t.test(r))?null:{url:t.toString(),actualValue:i}}}const g={name:"left",className:"col col-md-6"},m={name:"right",className:"col col-md-6"},p="mb-1 form-group",M=s.FormProp.createMany([{type:"string",name:"clientId",displayName:"AbpOpenIddict::ClientId",id:"clientId",validators:()=>[_.Validators.required],group:g,className:p},{type:"string",name:"displayName",displayName:"AbpOpenIddict::DisplayName",id:"displayName",validators:()=>[_.Validators.required],group:g,className:p},{type:"string",name:"clientUri",displayName:"AbpOpenIddict::ClientUri",id:"clientUri",validators:()=>[E()],group:g,className:p},{type:"string",name:"logoUri",displayName:"AbpOpenIddict::LogoUri",id:"logoUri",group:g,className:p},{type:"string",name:"type",displayName:"AbpOpenIddict::Type",id:"type",validators:()=>[_.Validators.required],options:t=>t.getInjected(d).types$,group:g,className:p},{type:"string",name:"clientSecret",displayName:"AbpOpenIddict::ClientSecret",id:"clientSecret",visible:t=>t.getInjected(d).getFormValue().type===v.confidential,group:g,className:p},{type:"boolean",defaultValue:!1,name:"allowAuthorizationCodeFlow",displayName:"AbpOpenIddict::AllowAuthorizationCodeFlow",id:"allowAuthorizationCodeFlow",group:m,className:p},{type:"boolean",defaultValue:!1,name:"allowImplicitFlow",displayName:"AbpOpenIddict::AllowImplicitFlow",id:"allowImplicitFlow",group:m,className:p},{type:"boolean",defaultValue:!1,name:"allowHybridFlow",displayName:"AbpOpenIddict::AllowHybridFlow",id:"allowHybridFlow",group:m,className:p},{type:"boolean",defaultValue:!1,name:"allowPasswordFlow",displayName:"AbpOpenIddict::AllowPasswordFlow",id:"allowPasswordFlow",group:m,className:p},{type:"boolean",defaultValue:!1,name:"allowClientCredentialsFlow",displayTextResolver:t=>t.getInjected(d).changeTextToType("AbpOpenIddict::AllowClientCredentialsFlow"),disabled:t=>t.getInjected(d).getFormValue().type===v.public,id:"allowClientCredentialsFlow",group:m,className:p},{type:"boolean",defaultValue:!1,name:"allowRefreshTokenFlow",displayName:"AbpOpenIddict::AllowRefreshTokenFlow",disabled:t=>{const{allowHybridFlow:a,allowAuthorizationCodeFlow:i,allowPasswordFlow:o}=t.getInjected(d).getFormValue();return!(a||i||o)},id:"allowRefreshTokenFlow",group:m,className:p},{type:"boolean",defaultValue:!1,name:"allowDeviceEndpoint",displayTextResolver:t=>t.getInjected(d).changeTextToType("AbpOpenIddict::AllowDeviceEndpoint"),disabled:t=>t.getInjected(d).getFormValue().type===v.public,id:"allowDeviceEndpoint",group:m,className:p},{type:"string",name:"consentType",displayName:"AbpOpenIddict::ConsentType",id:"consentType",options:t=>t.getInjected(d).consentTypes$,visible:t=>{const a=t.getInjected(d).getFormValue();return y(a)},group:m,className:p},{type:"text",name:"extensionGrantTypes",displayName:"AbpOpenIddict::ExtensionGrantTypes",id:"extensionGrantTypes",className:p,group:m},{type:"multiselect",name:"scopes",displayName:"AbpOpenIddict::Scopes",id:"scopes",options:t=>t.getInjected(f.ScopeService).getAllScopes().pipe((0,h.map)(a=>a.map(i=>({key:i.name,value:i.name})))),group:m,className:p},{type:"text",name:"redirectUris",displayName:"AbpOpenIddict::RedirectUris",id:"redirectUris",validators:()=>[E()],visible:t=>{const a=t.getInjected(d).getFormValue();return y(a)},group:m,className:p},{type:"boolean",defaultValue:!1,name:"allowLogoutEndpoint",displayName:"AbpOpenIddict::AllowLogoutEndpoint",id:"allowLogoutEndpoint",visible:t=>{const a=t.getInjected(d).getFormValue();return y(a)},group:m,className:p},{type:"text",name:"postLogoutRedirectUris",displayName:"AbpOpenIddict::PostLogoutRedirectUris",id:"postLogoutRedirectUris",validators:()=>[E()],visible:t=>{const{allowLogoutEndpoint:a}=t.getInjected(d).getFormValue();return a},group:m,className:p}]),Z=M.concat(s.FormProp.createMany([{type:"boolean",name:"enabled",displayName:"AbpOpenIddict::Enabled",id:"enabled",defaultValue:!1,group:m,className:p}])),q=s.EntityProp.createMany([{type:"string",name:"name",displayName:"AbpOpenIddict::Name",columnWidth:200},{type:"string",name:"displayName",displayName:"AbpOpenIddict::DisplayName",columnWidth:200},{type:"string",name:"description",displayName:"AbpOpenIddict::Description",columnWidth:200}]);class N{constructor(){this.state=new l.InternalStore({isModalVisible:!1}),this.isModalVisible$=this.state.sliceState(a=>a.isModalVisible)}openModal(){this.setModalState(!0)}setModalState(a){this.state.patch({isModalVisible:a})}}let L=(()=>{class t{constructor(i,o,n){this.injector=i,this.scopesService=o,this.service=n,this.saved=new e.EventEmitter,this.blueprints={pattern:"AbpOpenIddict::TheScopeNameCannotContainSpaces"},this.isModalVisible$=this.scopesService.isModalVisible$}ngOnChanges(i){this.createForm()}save(){if(this.form.invalid)return;const i=this.selected.id,o=!!i;let n;const r={...this.form.value,resources:T(this.form.value.resources)};n=o?this.service.update(i,r):this.service.create(r),n.subscribe(()=>{this.scopesService.setModalState(!1),this.saved.emit()})}visibleChange(i){this.scopesService.setModalState(i)}createForm(){const i=this.selected?.id?{...this.selected,resources:T(this.selected.resources)}:{},o=new s.FormPropData(this.injector,i);this.form=(0,s.generateFormFromProps)(o)}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275directiveInject(e.Injector),e.\u0275\u0275directiveInject(N),e.\u0275\u0275directiveInject(f.ScopeService))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["abp-scope-form-modal"]],inputs:{selected:"selected"},outputs:{saved:"saved"},features:[e.\u0275\u0275NgOnChangesFeature],decls:8,vars:3,consts:[[3,"visible","visibleChange"],["abpHeader",""],["abpBody",""],["abpFooter",""],["id","scopeForm","validateOnSubmit","",3,"formGroup","blueprints","ngSubmit"],[3,"selectedRecord"],["type","button","abpClose","",1,"btn","btn-secondary"],["iconClass","fa fa-check","buttonType","submit","formName","scopeForm"]],template:function(o,n){1&o&&(e.\u0275\u0275elementStart(0,"abp-modal",0),e.\u0275\u0275listener("visibleChange",function(I){return n.visibleChange(I)}),e.\u0275\u0275pipe(1,"async"),e.\u0275\u0275template(2,fe,3,3,"ng-template",null,1,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275template(4,Pe,2,3,"ng-template",null,2,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275template(6,he,6,6,"ng-template",null,3,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275elementEnd()),2&o&&e.\u0275\u0275property("visible",e.\u0275\u0275pipeBind1(1,1,n.isModalVisible$))},dependencies:[_.\u0275NgNoValidate,_.NgControlStatusGroup,_.FormGroupDirective,l.FormSubmitDirective,s.ExtensibleFormComponent,F.ValidationGroupDirective,u.ButtonComponent,u.ModalComponent,u.ModalCloseDirective,D.AsyncPipe,l.LocalizationPipe],encapsulation:2})}return t})(),C=(()=>{class t{constructor(i,o,n,r){this.list=i,this.service=o,this.scopesService=n,this.confirmationService=r,this.data={items:[],totalCount:0},this.selected={}}hookToQuery(){this.list.hookToQuery(i=>this.service.getList(i)).subscribe(i=>this.data=i)}ngOnInit(){this.hookToQuery()}onAdd(){this.selected={},this.scopesService.openModal()}onEdit(i){this.service.get(i).subscribe(o=>{this.selected=o,this.scopesService.openModal()})}onDelete(i,o){this.confirmationService.warn("AbpOpenIddict::ScopeDeletionWarningMessage","AbpOpenIddict::AreYouSure",{messageLocalizationParams:[o]}).subscribe(r=>{r===u.Confirmation.Status.confirm&&this.service.delete(i).subscribe(()=>this.list.get())})}onSaved(){this.list.get()}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275directiveInject(l.ListService),e.\u0275\u0275directiveInject(f.ScopeService),e.\u0275\u0275directiveInject(N),e.\u0275\u0275directiveInject(u.ConfirmationService))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["abp-scopes"]],features:[e.\u0275\u0275ProvidersFeature([l.ListService,{provide:s.EXTENSIONS_IDENTIFIER,useValue:"OpenIddictPro.Scopes"}])],decls:7,vars:9,consts:[[3,"title","toolbar"],["id","wrapper"],["localizationSourceName","AbpOpenIddict",3,"list"],[1,"card"],[3,"data","recordsTotal","list"],[3,"selected","saved"]],template:function(o,n){1&o&&(e.\u0275\u0275elementStart(0,"abp-page",0),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275elementStart(2,"div",1),e.\u0275\u0275element(3,"abp-advanced-entity-filters",2),e.\u0275\u0275elementStart(4,"div",3),e.\u0275\u0275element(5,"abp-extensible-table",4),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(6,"abp-scope-form-modal",5),e.\u0275\u0275listener("saved",function(){return n.onSaved()}),e.\u0275\u0275elementEnd()),2&o&&(e.\u0275\u0275property("title",e.\u0275\u0275pipeBind1(1,7,"AbpOpenIddict::Scopes"))("toolbar",n.data.items),e.\u0275\u0275advance(3),e.\u0275\u0275property("list",n.list),e.\u0275\u0275advance(2),e.\u0275\u0275property("data",n.data.items)("recordsTotal",n.data.totalCount)("list",n.list),e.\u0275\u0275advance(1),e.\u0275\u0275property("selected",n.selected))},dependencies:[s.ExtensibleTableComponent,O.AdvancedEntityFiltersComponent,R.PageComponent,L,l.LocalizationPipe],encapsulation:2})}return t})();const ee=s.ToolbarAction.createMany([{text:"AbpOpenIddict::NewScope",action:t=>{t.getInjected(C).onAdd()},permission:"OpenIddictPro.Scope.Create",icon:"fa fa-plus"}]),w=s.FormProp.createMany([{type:"string",name:"name",displayName:"AbpOpenIddict::Name",id:"name",validators:()=>[_.Validators.required,_.Validators.pattern(/^\S+$/)]},{type:"string",name:"displayName",displayName:"AbpOpenIddict::DisplayName",id:"displayName"},{type:"string",name:"description",displayName:"AbpOpenIddict::Description",id:"description"},{type:"text",name:"resources",displayName:"AbpOpenIddict::Resources",id:"resources"}]),te=w,ie=s.EntityAction.createMany([{text:"AbpOpenIddict::Edit",action:t=>{t.getInjected(C).onEdit(t.record.id)},permission:"OpenIddictPro.Scope.Update"},{text:"AbpOpenIddict::ChangeHistory",action:t=>{t.getInjected(O.SHOW_ENTITY_HISTORY)(t.record.id,"Volo.Abp.OpenIddict.Scopes.OpenIddictScope")},permission:"AuditLogging.ViewChangeHistory:Volo.Abp.OpenIddict.Pro.Scopes.Scope",visible:t=>!!t.getInjected(O.SHOW_ENTITY_HISTORY,null)},{text:"AbpOpenIddict::Delete",action:t=>{t.getInjected(C).onDelete(t.record.id,t.record.name)},permission:"OpenIddictPro.Scope.Delete"}]),oe={"OpenIddictPro.Applications":k,"OpenIddictPro.Scopes":ie},ne={"OpenIddictPro.Applications":X,"OpenIddictPro.Scopes":ee},ae={"OpenIddictPro.Applications":Q,"OpenIddictPro.Scopes":q},se={"OpenIddictPro.Applications":M,"OpenIddictPro.Scopes":w},re={"OpenIddictPro.Applications":Z,"OpenIddictPro.Scopes":te},x=new e.InjectionToken("OPENIDDICT_PRO_ENTITY_ACTION_CONTRIBUTORS"),V=new e.InjectionToken("OPENIDDICT_PRO__TOOLBAR_ACTION_CONTRIBUTORS"),U=new e.InjectionToken("OPENIDDICT_PRO_ENTITY_PROP_CONTRIBUTORS"),j=new e.InjectionToken("OPENIDDICT_PRO_CREATE_FORM_PROP_CONTRIBUTORS"),B=new e.InjectionToken("OPENIDDICT_PRO_EDIT_FORM_PROP_CONTRIBUTORS");let z=(()=>{class t{constructor(i){this.injector=i}canActivate(){const i=this.injector.get(s.ExtensionsService),o=this.injector.get(x,null)||{},n=this.injector.get(V,null)||{},r=this.injector.get(U,null)||{},I=this.injector.get(j,null)||{},P=this.injector.get(B,null)||{},le=this.injector.get(l.ConfigStateService);return(0,s.getObjectExtensionEntitiesFromStore)(le,"OpenIddictPro").pipe((0,h.map)(A=>({"OpenIddictPro.Applications":A.ApiResource,"OpenIddictPro.Scopes":A.Scopes})),(0,s.mapEntitiesToContributors)(le,"AbpOpenIddictPro"),(0,h.tap)(A=>{(0,s.mergeWithDefaultActions)(i.entityActions,oe,o),(0,s.mergeWithDefaultActions)(i.toolbarActions,ne,n),(0,s.mergeWithDefaultProps)(i.entityProps,ae,A.prop,r),(0,s.mergeWithDefaultProps)(i.createFormProps,se,A.createForm,I),(0,s.mergeWithDefaultProps)(i.editFormProps,re,A.editForm,P)}),(0,h.mapTo)(!0))}static#e=this.\u0275fac=function(o){return new(o||t)(e.\u0275\u0275inject(e.Injector))};static#t=this.\u0275prov=e.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac})}return t})();const Re=[{path:"",redirectTo:"Applications",pathMatch:"full"},{path:"",component:l.RouterOutletComponent,canActivate:[l.AuthGuard,l.PermissionGuard,z],children:[{path:"Applications",component:l.ReplaceableRouteContainerComponent,data:{requiredPolicy:"OpenIddictPro.Application",replaceableComponent:{key:"OpenIddictPro.Applications",defaultComponent:b}}},{path:"Scopes",component:l.ReplaceableRouteContainerComponent,data:{requiredPolicy:"OpenIddictPro.Scopes",replaceableComponent:{key:"OpenIddictPro.Scopes",defaultComponent:C}}}]}];let De=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:t});static#i=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[Y.RouterModule.forChild(Re),Y.RouterModule]})}return t})(),Fe=(()=>{class t{static forChild(i={}){return{ngModule:t,providers:[{provide:x,useValue:i.entityActionContributors},{provide:V,useValue:i.toolbarActionContributors},{provide:U,useValue:i.entityPropContributors},{provide:j,useValue:i.createFormPropContributors},{provide:B,useValue:i.editFormPropContributors},z,S,N]}}static forLazy(i={}){return new l.LazyModuleFactory(t.forChild(i))}static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:t});static#i=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[De,l.CoreModule,O.CommercialUiModule,u.ThemeSharedModule,pe.NgbDropdownModule,F.NgxValidateCoreModule,R.PageModule,O.AdvancedEntityFiltersModule,K.x]})}return t})()}}]);