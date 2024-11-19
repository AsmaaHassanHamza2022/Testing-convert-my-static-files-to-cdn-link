(self.webpackChunkportal=self.webpackChunkportal||[]).push([[92938],{92938:(P,f,a)=>{a.r(f),a.d(f,{MircoFrontSettingModule:()=>j});var m=a(92134),g=a(28675),l=a(81011),e=a(11705);let d=(()=>{class n{constructor(t){this.restService=t,this.apiName="CMSService",this.create=(o,i)=>this.restService.request({method:"POST",url:"/api/cms-service/micro-fronts",body:o},{apiName:this.apiName,...i}),this.delete=(o,i)=>this.restService.request({method:"DELETE",url:`/api/cms-service/micro-fronts/${o}`},{apiName:this.apiName,...i}),this.get=(o,i)=>this.restService.request({method:"GET",url:`/api/cms-service/micro-fronts/${o}`},{apiName:this.apiName,...i}),this.getAll=o=>this.restService.request({method:"GET",url:"/api/cms-service/micro-fronts/GetAll"},{apiName:this.apiName,...o}),this.getList=(o,i)=>this.restService.request({method:"GET",url:"/api/cms-service/micro-fronts",params:{filterText:o.filterText,remoteName:o.remoteName,remoteURL:o.remoteURL,remoteAngularPath:o.remoteAngularPath,moduleName:o.moduleName,exposeModuleName:o.exposeModuleName,sorting:o.sorting,skipCount:o.skipCount,maxResultCount:o.maxResultCount}},{apiName:this.apiName,...i}),this.update=(o,i,r)=>this.restService.request({method:"PUT",url:`/api/cms-service/micro-fronts/${o}`,body:i},{apiName:this.apiName,...r})}static#e=this.\u0275fac=function(o){return new(o||n)(e.\u0275\u0275inject(l.RestService))};static#t=this.\u0275prov=e.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var c=a(78570),_=a(4125),b=a(21786),p=a(27437),u=a(92482),h=a(82830);function N(n,s){1&n&&(e.\u0275\u0275elementStart(0,"button",14),e.\u0275\u0275element(1,"img",15),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275elementStart(3,"span"),e.\u0275\u0275text(4),e.\u0275\u0275pipe(5,"abpLocalization"),e.\u0275\u0275elementEnd()()),2&n&&(e.\u0275\u0275advance(1),e.\u0275\u0275propertyInterpolate("alt",e.\u0275\u0275pipeBind1(2,2,"CMSService::Microfrontend:AddNew")),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(5,4,"CMSService::Microfrontend:AddNew")))}function x(n,s){1&n&&e.\u0275\u0275text(0),2&n&&e.\u0275\u0275textInterpolate1(" ",s.value," ")}function T(n,s){1&n&&e.\u0275\u0275text(0),2&n&&e.\u0275\u0275textInterpolate1(" ",s.value," ")}function M(n,s){1&n&&e.\u0275\u0275text(0),2&n&&e.\u0275\u0275textInterpolate1(" ",s.value," ")}function D(n,s){1&n&&e.\u0275\u0275text(0),2&n&&e.\u0275\u0275textInterpolate1(" ",s.value," ")}function E(n,s){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",20),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const i=e.\u0275\u0275nextContext().row,r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.edit(null==i?null:i.id))}),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275element(2,"i",21),e.\u0275\u0275elementEnd()}2&n&&e.\u0275\u0275propertyInterpolate("ngbTooltip",e.\u0275\u0275pipeBind1(1,1,"AbpUi::Edit"))}function S(n,s){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",22),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const i=e.\u0275\u0275nextContext().row,r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.remove(null==i?null:i.id))}),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275element(2,"i",23),e.\u0275\u0275elementEnd()}2&n&&e.\u0275\u0275propertyInterpolate("ngbTooltip",e.\u0275\u0275pipeBind1(1,1,"AbpUi::Delete"))}function O(n,s){1&n&&(e.\u0275\u0275elementStart(0,"div",16)(1,"div",17),e.\u0275\u0275template(2,E,3,3,"div",18),e.\u0275\u0275template(3,S,3,3,"div",19),e.\u0275\u0275elementEnd()()),2&n&&(e.\u0275\u0275advance(2),e.\u0275\u0275property("abpPermission","CMSService.MicroFronts.Edit"),e.\u0275\u0275advance(1),e.\u0275\u0275property("abpPermission","CMSService.MicroFronts.Delete"))}function y(n,s){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275element(0,"app-nodata-or-loading",24),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275pipe(3,"abpLocalization"),e.\u0275\u0275pipe(4,"abpLocalization"),e.\u0275\u0275elementStart(5,"div",25)(6,"app-pager",26),e.\u0275\u0275listener("pageNumberChanged",function(i){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.onPageNumberChange(i))})("pageSizeChanged",function(i){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext(),C=e.\u0275\u0275reference(7);return e.\u0275\u0275resetView(r.onPageSizeChange(i,C))}),e.\u0275\u0275elementEnd()()}if(2&n){const t=s.rowCount,o=s.pageSize,i=s.curPage,r=e.\u0275\u0275nextContext();e.\u0275\u0275property("isLoadingData",r.service.isLoading)("isDataNotEmpty",r.service.data.items.length>0)("isDataFiltered",r.service.isFiltering)("nodataMessage",e.\u0275\u0275pipeBind1(1,10,"CMSService::NoMediaCurrently"))("nodataHint",e.\u0275\u0275pipeBind1(2,12,"CMSService::YouCanAddNewMedia"))("noFilterResultMessage",e.\u0275\u0275pipeBind1(3,14,"CMSService::MediaNoFilterResult"))("noFilterResultHint",e.\u0275\u0275pipeBind1(4,16,"CMSService::ChangeFilters")),e.\u0275\u0275advance(6),e.\u0275\u0275property("page",i)("size",o)("count",t)}}function L(n){return new c.ListFilterService(n.getList)}let A=(()=>{class n extends c.AbstractListComponent{constructor(t,o){super(),this._microfrontendService=t,this.service=o}remove(t){this.confirmationService.warn("::CONF002","::DeleteConfimation",void 0,{yesSeverity:"error",yesText:"::DeleteConfimation:SaveButton"}).pipe((0,_.filter)(o=>o===c.SWConfirmation.SWStatus.confirm)).subscribe(()=>{this._microfrontendService.delete(t).subscribe(()=>{this.toasterService.success("::SuccessfullyDeleted"),this.list.get()})})}static#e=this.\u0275fac=function(o){return new(o||n)(e.\u0275\u0275directiveInject(d),e.\u0275\u0275directiveInject(c.ListFilterService))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["ng-component"]],features:[e.\u0275\u0275ProvidersFeature([l.ListService,c.SelectedFiltersBannerService,{provide:c.ListFilterService,useFactory:L,deps:[d]}]),e.\u0275\u0275InheritDefinitionFeature],decls:25,vars:47,consts:[[3,"pageTitle","icon"],[1,"card","mt-3"],[1,"card-body"],["class","btn btn-sm btn-primary  d-flex align-items-center mb-2","routerLink","create",4,"abpPermission"],[1,"ngx-datatable-container"],["default","",3,"rows","count","list","limit","columnMode","rowHeight","footerHeight"],["table",""],["prop","remoteName",3,"name","flexGrow","sortable","resizeable","draggable"],["ngx-datatable-cell-template",""],["prop","remoteURL",3,"name","flexGrow","sortable","resizeable","draggable"],["prop","remoteAngularPath",3,"name","flexGrow","sortable","resizeable","draggable"],["prop","moduleName",3,"name","flexGrow","sortable","resizeable","draggable"],["prop","exposeModuleName",3,"name","flexGrow","sortable","resizeable","draggable"],["ngx-datatable-footer-template","","ngx-datatable-footer-template",""],["routerLink","create",1,"btn","btn-sm","btn-primary","d-flex","align-items-center","mb-2"],["src","../../../../../assets/images/plus-circle-add.svg",1,"me-1",3,"alt"],[1,"card-action"],[1,"table-actions"],["class","btn btn-outline-primary","placement","top","container","body",3,"ngbTooltip","click",4,"abpPermission"],["class","btn btn-outline-danger","placement","top","container","body",3,"ngbTooltip","click",4,"abpPermission"],["placement","top","container","body",1,"btn","btn-outline-primary",3,"ngbTooltip","click"],[1,"icon-pencil"],["placement","top","container","body",1,"btn","btn-outline-danger",3,"ngbTooltip","click"],[1,"icon-trash"],["loaderImage","data-view-loader.svg","nodataImage","Events-icon.svg","nodataLink","/cmsAdmin/media/create","noFilterResultImage","no-filter-result.svg",3,"isLoadingData","isDataNotEmpty","isDataFiltered","nodataMessage","nodataHint","noFilterResultMessage","noFilterResultHint"],[1,"w-100","footer"],[3,"page","size","count","pageNumberChanged","pageSizeChanged"]],template:function(o,i){1&o&&(e.\u0275\u0275element(0,"app-page-header",0)(1,"app-selected-filters-banner"),e.\u0275\u0275elementStart(2,"div",1)(3,"div",2),e.\u0275\u0275template(4,N,6,6,"button",3),e.\u0275\u0275elementStart(5,"div",4)(6,"ngx-datatable",5,6)(8,"ngx-datatable-column",7),e.\u0275\u0275pipe(9,"abpLocalization"),e.\u0275\u0275template(10,x,1,1,"ng-template",8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(11,"ngx-datatable-column",9),e.\u0275\u0275pipe(12,"abpLocalization"),e.\u0275\u0275template(13,T,1,1,"ng-template",8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(14,"ngx-datatable-column",10),e.\u0275\u0275pipe(15,"abpLocalization"),e.\u0275\u0275template(16,M,1,1,"ng-template",8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(17,"ngx-datatable-column",11),e.\u0275\u0275pipe(18,"abpLocalization"),e.\u0275\u0275template(19,D,1,1,"ng-template",8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(20,"ngx-datatable-column",12),e.\u0275\u0275pipe(21,"abpLocalization"),e.\u0275\u0275template(22,O,4,2,"ng-template",8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(23,"ngx-datatable-footer"),e.\u0275\u0275template(24,y,7,18,"ng-template",13),e.\u0275\u0275elementEnd()()()()()),2&o&&(e.\u0275\u0275property("pageTitle","CMSService::Microfrontend:Management")("icon","Events-icon"),e.\u0275\u0275advance(4),e.\u0275\u0275property("abpPermission","CMSService.MicroFronts.Create"),e.\u0275\u0275advance(2),e.\u0275\u0275classProp("is-empty",i.service.isLoading||0===i.service.data.items.length),e.\u0275\u0275property("rows",i.service.data.items)("count",i.service.data.totalCount)("list",i.list)("limit",i.list.maxResultCount)("columnMode","flex")("rowHeight","auto")("footerHeight",50),e.\u0275\u0275advance(2),e.\u0275\u0275property("name",e.\u0275\u0275pipeBind1(9,37,"CMSService::Microfrontend:RemoteName"))("flexGrow",1)("sortable",!1)("resizeable",!1)("draggable",!1),e.\u0275\u0275advance(3),e.\u0275\u0275property("name",e.\u0275\u0275pipeBind1(12,39,"CMSService::Microfrontend:RemoteURL"))("flexGrow",1)("sortable",!1)("resizeable",!1)("draggable",!1),e.\u0275\u0275advance(3),e.\u0275\u0275property("name",e.\u0275\u0275pipeBind1(15,41,"CMSService::Microfrontend:RemoteAngularPath"))("flexGrow",1)("sortable",!1)("resizeable",!1)("draggable",!1),e.\u0275\u0275advance(3),e.\u0275\u0275property("name",e.\u0275\u0275pipeBind1(18,43,"CMSService::Microfrontend:ModuleName"))("flexGrow",1)("sortable",!1)("resizeable",!1)("draggable",!1),e.\u0275\u0275advance(3),e.\u0275\u0275property("name",e.\u0275\u0275pipeBind1(21,45,"CMSService::Microfrontend:ExposeModuleName"))("flexGrow",1)("sortable",!1)("resizeable",!1)("draggable",!1))},dependencies:[g.RouterLink,l.PermissionDirective,b.DatatableComponent,b.DataTableColumnDirective,b.DataTableColumnCellDirective,b.DataTableFooterTemplateDirective,b.DatatableFooterDirective,p.NgxDatatableDefaultDirective,p.NgxDatatableListDirective,c.PageHeaderComponent,c.SelectedFiltersBannerComponent,u.PagerComponent,u.NodataOrLoadingComponent,h.NgbTooltip,l.LocalizationPipe]})}return n})();var v=a(36394),F=a(31407),B=a(62411),U=a(42595),I=a(74478);function z(n,s){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",2)(1,"div",3)(2,"form",4),e.\u0275\u0275listener("onSubmit",function(){e.\u0275\u0275restoreView(t);const i=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(i.submitForm())})("keydown.enter",function(i){return i.preventDefault()}),e.\u0275\u0275elementStart(3,"div",5)(4,"div",6)(5,"div",7)(6,"label",8),e.\u0275\u0275text(7),e.\u0275\u0275pipe(8,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(9,"input",9),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(10,"div",6)(11,"div",7)(12,"label",10),e.\u0275\u0275text(13),e.\u0275\u0275pipe(14,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(15,"input",11),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(16,"div",6)(17,"div",7)(18,"label",12),e.\u0275\u0275text(19),e.\u0275\u0275pipe(20,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(21,"input",13),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(22,"div",6)(23,"div",7)(24,"label",14),e.\u0275\u0275text(25),e.\u0275\u0275pipe(26,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(27,"input",15),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(28,"div",6)(29,"div",7)(30,"label",16),e.\u0275\u0275text(31),e.\u0275\u0275pipe(32,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(33,"input",17),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275element(34,"hr"),e.\u0275\u0275elementStart(35,"div",2)(36,"div",18)(37,"button",19),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const i=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(i.submitForm())}),e.\u0275\u0275text(38),e.\u0275\u0275pipe(39,"abpLocalization"),e.\u0275\u0275element(40,"img",20),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(41,"button",21),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const i=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(i.cancelForm())}),e.\u0275\u0275text(42),e.\u0275\u0275pipe(43,"abpLocalization"),e.\u0275\u0275elementEnd()()()()()()}if(2&n){const t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275property("formGroup",t.form)("validateOnSubmit",!0),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(8,9,"CMSService::Microfrontend:RemoteName")),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(14,11,"CMSService::Microfrontend:RemoteURL")),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(20,13,"CMSService::Microfrontend:RemoteAngularPath")),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(26,15,"CMSService::Microfrontend:ModuleName")),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(32,17,"CMSService::Microfrontend:ExposeModuleName")),e.\u0275\u0275advance(7),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(39,19,t.isInsertMode?"CMSService::Microfrontend:Add":"AbpUi::Edit")," "),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(43,21,"AbpUi::Cancel")," ")}}let R=(()=>{class n extends c.AbstractFormComponent{constructor(t,o,i,r,C,W){super(),this._fb=t,this._microfrontendService=o,this._confirmationService=i,this._activatedRoute=r,this._router=C,this._toasterService=W,this.isInsertMode=!1}ngOnInit(){this.setting=void 0;const t=this._activatedRoute.snapshot.paramMap.get("id");this.isInsertMode=null==t||null==t,this.isInsertMode?this._buildForm():this.sub$=this._microfrontendService.get(t).subscribe(o=>{this.setting=o,this._buildForm()})}_buildForm(){const{remoteName:t,remoteURL:o,remoteAngularPath:i,moduleName:r,exposeModuleName:C}=this.setting||{};this.form=this._fb.group({remoteName:[t,[u.CustomValidators.RequiredValidator()]],remoteURL:[o,[u.CustomValidators.RequiredValidator()]],remoteAngularPath:[i,[u.CustomValidators.RequiredValidator()]],moduleName:[r,[u.CustomValidators.RequiredValidator()]],exposeModuleName:[C,[u.CustomValidators.RequiredValidator()]]})}submitForm(){if(this.form.invalid)return this._toasterService.warn("CMSService::FormValidationWarining"),void this.scrollToFirstInvalidControl();this.sub$=this._confirmationService.warn(this.isInsertMode?"::CONF001":"::CONF003","::AreYouSure",void 0,{yesSeverity:"success"}).pipe((0,_.filter)(t=>t===c.SWConfirmation.SWStatus.confirm)).subscribe(()=>{const t=this.form.getRawValue();t.mediaType===F.T.Image?t.videocode=void 0:t.mediaType===F.T.Youtube&&(t.imageAttachmentId=void 0,t.imageAttachmentIdFiles=void 0),(this.isInsertMode?this._microfrontendService.create(t):this._microfrontendService.update(this.setting.id,t)).subscribe(()=>{this._toasterService.success("::Success"),this._goToListPage()})})}_goToListPage(){this._router.navigate(["../"+(this.setting?.id?"../":"")],{relativeTo:this._activatedRoute})}cancelForm(){this._confirmationService.warn("::CONF004","::AreYouSure",void 0,{yesSeverity:"error"}).pipe((0,_.filter)(t=>t===c.SWConfirmation.SWStatus.confirm)).subscribe(()=>{this._goToListPage()})}ngOnDestroy(){return this.sub$?.unsubscribe()}static#e=this.\u0275fac=function(o){return new(o||n)(e.\u0275\u0275directiveInject(v.FormBuilder),e.\u0275\u0275directiveInject(d),e.\u0275\u0275directiveInject(c.SWConfirmationService),e.\u0275\u0275directiveInject(g.ActivatedRoute),e.\u0275\u0275directiveInject(g.Router),e.\u0275\u0275directiveInject(p.ToasterService))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["ng-component"]],features:[e.\u0275\u0275InheritDefinitionFeature],decls:3,vars:4,consts:[[3,"pageTitle","icon","isParentRoute"],["class","card",4,"ngIf"],[1,"card"],[1,"card-body"],[3,"formGroup","validateOnSubmit","onSubmit","keydown.enter"],[1,"row","gy-2"],[1,"col-lg-6","col-md-12"],[1,"form-group"],["for","remoteName",1,"form-label"],["id","TittleEn","dir","ltr","formControlName","remoteName",1,"form-control"],["for","remoteURL",1,"form-label"],["id","remoteURL","dir","ltr","formControlName","remoteURL",1,"form-control"],["for","remoteAngularPath",1,"form-label"],["id","remoteAngularPath","dir","ltr","formControlName","remoteAngularPath",1,"form-control"],["for","moduleName",1,"form-label"],["id","moduleName","dir","ltr","formControlName","moduleName",1,"form-control"],["for","exposeModuleName",1,"form-label"],["id","exposeModuleName","dir","ltr","formControlName","exposeModuleName",1,"form-control"],[1,"card-body","d-flex","justify-content-center"],["type","submit",1,"btn","btn-primary","d-flex","mx-3","btn-padding",3,"click"],["src","assets/images/checkIcon.png","alt","save",1,"ms-2"],["type","button",1,"btn-cancel",3,"click"]],template:function(o,i){1&o&&(e.\u0275\u0275elementStart(0,"abp-page"),e.\u0275\u0275element(1,"app-page-header",0),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(2,z,44,23,"div",1)),2&o&&(e.\u0275\u0275advance(1),e.\u0275\u0275property("pageTitle",i.isInsertMode?"CMSService::Media:Add":"CMSService::Media:Edit")("icon","Events-icon")("isParentRoute",!0),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",i.form))},dependencies:[B.NgIf,v.\u0275NgNoValidate,v.DefaultValueAccessor,v.NgControlStatus,v.NgControlStatusGroup,v.FormGroupDirective,v.FormControlName,U.PageComponent,I.ValidationGroupDirective,I.ValidationDirective,c.PageHeaderComponent,l.LocalizationPipe],styles:[".btn-cancel[_ngcontent-%COMP%]{border-radius:8px;border:1px solid var(--neutral-400, #94a3b8);padding:10px 30px;color:var(--neutral-500, #64748b);font-size:16px;font-weight:500;background-color:transparent;display:flex;justify-content:center;align-items:center}.btn-cancel[_ngcontent-%COMP%]:hover{background:rgba(100,116,139,.1647058824)}"]})}return n})();const w=[{path:"",component:A,canActivate:[l.PermissionGuard],data:{requiredPolicy:"CMSService.MicroFronts"}},{path:"create",component:R,canActivate:[l.PermissionGuard],data:{requiredPolicy:"CMSService.MicroFronts.Create"}},{path:"update/:id",component:R,canActivate:[l.PermissionGuard],data:{requiredPolicy:"CMSService.MicroFronts.Edit"}}];let V=(()=>{class n{static#e=this.\u0275fac=function(o){return new(o||n)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:n});static#n=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[g.RouterModule.forChild(w),g.RouterModule]})}return n})(),j=(()=>{class n{static#e=this.\u0275fac=function(o){return new(o||n)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:n});static#n=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[V,m.b]})}return n})()},92134:(P,f,a)=>{a.d(f,{b:()=>E});var m=a(81011),l=a(92482),d=a(78570),_=a(37385),p=a(82830),h=a(31093),x=a(62411),M=a(11705);let E=(()=>{class S{static#e=this.\u0275fac=function(L){return new(L||S)};static#t=this.\u0275mod=M.\u0275\u0275defineNgModule({type:S});static#n=this.\u0275inj=M.\u0275\u0275defineInjector({imports:[m.CoreModule,l.SharedModule,d.AbpUtilsModule,_.NgScrollbarModule,m.CoreModule,d.AbpUtilsModule,l.SharedModule,p.NgbTooltipModule,h.NgSelectModule,x.CommonModule,_.NgScrollbarModule,p.NgbDropdownModule,p.NgbDatepickerModule]})}return S})()},31407:(P,f,a)=>{a.d(f,{T:()=>l});var m=a(81011),l=function(d){return d[d.Image=1]="Image",d[d.Youtube=2]="Youtube",d}(l||{});(0,m.mapEnumToOptions)(l)}}]);