(self.webpackChunkportal=self.webpackChunkportal||[]).push([[83454],{83454:(ee,L,s)=>{s.r(L),s.d(L,{MediaLibraryModule:()=>J});var h=s(28675),m=s(81011),o=s(78570),f=s(65712),g=s(4125),u=s(31407),l=s(92482),C=s(1261),e=s(11705),b=s(62411),d=s(36394),v=s(21786),w=s(27437),M=s(82830),y=s(48310),_=s(74478),T=s(31093);function V(n,c){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"form",2),e.\u0275\u0275listener("onSubmit",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.submitFilterForm())})("keydown.enter",function(a){return a.preventDefault()}),e.\u0275\u0275elementStart(1,"div",3)(2,"div",4)(3,"div",5)(4,"label",6),e.\u0275\u0275text(5),e.\u0275\u0275pipe(6,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(7,"ng-select",7),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(8,"div",8)(9,"div",5)(10,"label",6),e.\u0275\u0275text(11),e.\u0275\u0275pipe(12,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(13,"div",9),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275reference(15);return e.\u0275\u0275resetView(a.toggle())}),e.\u0275\u0275element(14,"input",10,11),e.\u0275\u0275elementStart(16,"div",12),e.\u0275\u0275element(17,"i",13),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(18,"div",8)(19,"div",5)(20,"label",6),e.\u0275\u0275text(21),e.\u0275\u0275pipe(22,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(23,"div",9),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275reference(25);return e.\u0275\u0275resetView(a.toggle())}),e.\u0275\u0275element(24,"input",14,15),e.\u0275\u0275elementStart(26,"div",12),e.\u0275\u0275element(27,"i",13),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(28,"div",8)(29,"div",5)(30,"label",16),e.\u0275\u0275text(31),e.\u0275\u0275pipe(32,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(33,"ng-select",17),e.\u0275\u0275listener("scrollToEnd",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.loadMoreHashTags())})("change",function(a){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.changeMultiDropDownValue(a,"mediaHashtags"))}),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(34,"div",18)(35,"button",19),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.submitFilterForm())}),e.\u0275\u0275elementStart(36,"span"),e.\u0275\u0275text(37),e.\u0275\u0275pipe(38,"abpLocalization"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(39,"button",20),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.onfilterClear())}),e.\u0275\u0275text(40),e.\u0275\u0275pipe(41,"abpLocalization"),e.\u0275\u0275elementEnd()()()}if(2&n){const t=e.\u0275\u0275nextContext();e.\u0275\u0275property("formGroup",t.filtersForm)("validateOnSubmit",!0),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(6,15,"CMSService::MediaLibrary:MediaType")),e.\u0275\u0275advance(2),e.\u0275\u0275property("items",t.mediaType),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(12,17,"CMSService::MediaLibrary:PublishDateMin")),e.\u0275\u0275advance(10),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(22,19,"CMSService::MediaLibrary:PublishDateMax")),e.\u0275\u0275advance(10),e.\u0275\u0275textInterpolate1("",e.\u0275\u0275pipeBind1(32,21,"CMSService::Media:Hashtag")," "),e.\u0275\u0275advance(2),e.\u0275\u0275classProp("loading",t.isLoading),e.\u0275\u0275property("items",t.mediaHashtags)("multiple",!0)("virtualScroll",!0)("closeOnSelect",!1),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1("",e.\u0275\u0275pipeBind1(38,23,"::AdvancedFilter:Refresh")," "),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(41,25,"::AdvancedFilter:Clear")," ")}}let I=(()=>{class n extends o.AbstractAdvancedFilterComponent{constructor(t,i){super(!0),this._localizationService=t,this._mediaService=i,this.mediaHashtags=[],this.skipCount=0,this.maxResultCount=50,this.isThereMoreHashtags=!1,this.isLoading=!1}ngOnInit(){this._getMediaType(),super.ngOnInit(),this._getHashtags()}initForm(){this.filtersForm=this.fb.group({mediaType:new o.FilterFormControl({filterTitle:"CMSService::MediaLibrary:MediaType",validatorOrOpts:[],filterValueFun:t=>this.mediaType.find(i=>i.id==t).displayName}),minPublishDate:new o.FilterFormControl({filterTitle:"CMSService::MediaLibrary:PublishDateMin",validatorOrOpts:[]}),maxPublishDate:new o.FilterFormControl({filterTitle:"CMSService::MediaLibrary:PublishDateMax",validatorOrOpts:[]}),mediaHashtags:new o.FilterFormControl({filterTitle:"CMSService::Media:Hashtag",filterValueFun:null,splitBy:","})}),this.filtersForm.controls.mediaHashtags.setValue(this.mediaHashtags.map(t=>t.id)??void 0),this.loadUiStatusFormFilterValue("mediaForm",this.filtersForm)}_getMediaType(){this.mediaType=Object.values(u.T).filter(t=>!1===isNaN(Number(t))).map(t=>({id:t,displayName:this._localizationService.instant("CMSService::Enum:MediaType:"+t)}))}_getHashtags(){this.skipCount=0,this.isLoading=!0,this._mediaService.getPublicMediaHashtagsByInput({skipCount:0,maxResultCount:this.maxResultCount}).pipe((0,g.finalize)(()=>this.isLoading=!1)).subscribe(t=>{this.mediaHashtags=t.items.map(i=>({id:i.id,displayName:i.hashtagName})),this.isThereMoreHashtags=t.totalCount>this.mediaHashtags.length})}loadMoreHashTags(){this.isThereMoreHashtags&&(this.isLoading=!0,this._mediaService.getPublicMediaHashtagsByInput({skipCount:++this.skipCount*this.maxResultCount,maxResultCount:this.maxResultCount}).pipe((0,g.finalize)(()=>this.isLoading=!1)).subscribe(t=>{this.mediaHashtags=[...this.mediaHashtags,...t.items.map(i=>({id:i.id,displayName:i.hashtagName}))],this.isThereMoreHashtags=t.totalCount>this.mediaHashtags.length}))}changeMultiDropDownValue(t,i){t instanceof Event||this.changeFilterValueForDropDown(t,i)}optimizeFormData(){const t=this.filtersForm.value;return t.mediaHashtags=t.mediaHashtags?.map(i=>i.id),t}static#e=this.\u0275fac=function(i){return new(i||n)(e.\u0275\u0275directiveInject(m.LocalizationService),e.\u0275\u0275directiveInject(f.y))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-media-library-filters"]],features:[e.\u0275\u0275InheritDefinitionFeature],decls:4,vars:9,consts:[[3,"filterText","isShowFilters","searchInputText","advancedSearchText","filterTextChange","showAdvancedFilter"],["class","filters-form",3,"formGroup","validateOnSubmit","onSubmit","keydown.enter",4,"ngIf"],[1,"filters-form",3,"formGroup","validateOnSubmit","onSubmit","keydown.enter"],[1,"scroll-bar"],[1,"col-12"],[1,"form-group"],[1,"form-label"],["formControlName","mediaType","bindLabel","displayName","bindValue","id",3,"items"],[1,"col-12","pt-2"],[1,"date-picker-container",3,"click"],["name","datepicker","formControlName","minPublishDate","ngbDatepicker","","datepickerClass","filter-calendar",1,"form-control"],["PublishDateMin","ngbDatepicker"],[1,"date-picker-icon"],[1,"icon-calendar"],["name","datepicker","formControlName","maxPublishDate","ngbDatepicker","","datepickerClass","filter-calendar",1,"form-control"],["PublishDateMax","ngbDatepicker"],["for","hashtag",1,"form-label"],["bindLabel","displayName","formControlName","mediaHashtags",3,"items","multiple","virtualScroll","closeOnSelect","scrollToEnd","change"],[1,"filter-actions"],["type","submit",1,"btn","btn-primary","mx-2",3,"click"],["type","button",1,"btn","btn-close-bar",3,"click"]],template:function(i,a){1&i&&(e.\u0275\u0275elementStart(0,"app-sw-filter",0),e.\u0275\u0275listener("filterTextChange",function(p){return a.chnageFilterText(p)})("showAdvancedFilter",function(p){return p?a.showFilterSidebar():a.closeFilterSidebar()}),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275template(3,V,42,27,"form",1),e.\u0275\u0275elementEnd()),2&i&&(e.\u0275\u0275property("filterText",a.quickFilter.filterValue)("isShowFilters",a.isShowFilters)("searchInputText",e.\u0275\u0275pipeBind1(1,5,"CMSService::MediaLibrary:SearchWithName"))("advancedSearchText",e.\u0275\u0275pipeBind1(2,7,"CMSService::MediaLibrary:AdvancedFilter")),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngIf",a.filtersForm))},dependencies:[b.NgIf,d.\u0275NgNoValidate,d.DefaultValueAccessor,d.NgControlStatus,d.NgControlStatusGroup,d.FormGroupDirective,d.FormControlName,_.ValidationGroupDirective,_.ValidationDirective,l.SwFilterComponent,T.NgSelectComponent,M.NgbInputDatepicker,m.LocalizationPipe],encapsulation:2})}return n})();const D=["preview"];function E(n,c){1&n&&(e.\u0275\u0275elementStart(0,"button",10),e.\u0275\u0275element(1,"img",11),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275elementStart(3,"span"),e.\u0275\u0275text(4),e.\u0275\u0275pipe(5,"abpLocalization"),e.\u0275\u0275elementEnd()()),2&n&&(e.\u0275\u0275advance(1),e.\u0275\u0275propertyInterpolate("alt",e.\u0275\u0275pipeBind1(2,2,"CMSService::MediaLibrary:AddNew")),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(5,4,"CMSService::MediaLibrary:AddNew")))}function P(n,c){if(1&n&&(e.\u0275\u0275element(0,"app-base64-file-preview",29),e.\u0275\u0275pipe(1,"attachmentFile")),2&n){const t=e.\u0275\u0275nextContext().row,i=e.\u0275\u0275nextContext();e.\u0275\u0275property("previewMode",i.PreviewModeEnum.Image)("base64File",e.\u0275\u0275pipeBind3(1,2,t.imageAttachmentId,i.AttachmentEntities.MediaAttachment.entity,i.AttachmentEntities.MediaAttachment.module))}}function A(n,c){if(1&n&&e.\u0275\u0275element(0,"img",30),2&n){const t=e.\u0275\u0275nextContext().row;e.\u0275\u0275property("src","https://i1.ytimg.com/vi/"+t.videoCode+"/default.jpg",e.\u0275\u0275sanitizeUrl)}}function N(n,c){1&n&&e.\u0275\u0275element(0,"img",31)}function O(n,c){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",32),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext().row,r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.edit(null==a?null:a.id))}),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275element(2,"i",33),e.\u0275\u0275elementEnd()}2&n&&e.\u0275\u0275propertyInterpolate("ngbTooltip",e.\u0275\u0275pipeBind1(1,1,"AbpUi::Edit"))}function k(n,c){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",34),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext().row,r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.remove(null==a?null:a.id))}),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275element(2,"i",35),e.\u0275\u0275elementEnd()}2&n&&e.\u0275\u0275propertyInterpolate("ngbTooltip",e.\u0275\u0275pipeBind1(1,1,"AbpUi::Delete"))}function z(n,c){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",12)(1,"div",13),e.\u0275\u0275listener("click",function(){const r=e.\u0275\u0275restoreView(t).row,p=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(p.showMediaPreview(r))}),e.\u0275\u0275template(2,P,2,6,"app-base64-file-preview",14),e.\u0275\u0275template(3,A,1,1,"img",15),e.\u0275\u0275elementStart(4,"div",16),e.\u0275\u0275template(5,N,1,0,"img",17),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(6,"div",18)(7,"div",19)(8,"span",20),e.\u0275\u0275text(9),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"span",21)(11,"p-chips",22),e.\u0275\u0275listener("ngModelChange",function(a){const p=e.\u0275\u0275restoreView(t).row;return e.\u0275\u0275resetView(p.hashtags=a)}),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(12,"hr"),e.\u0275\u0275elementStart(13,"div",23)(14,"div",24)(15,"label"),e.\u0275\u0275text(16),e.\u0275\u0275pipe(17,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(18,"span"),e.\u0275\u0275text(19),e.\u0275\u0275pipe(20,"date"),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(21,"div",25)(22,"label"),e.\u0275\u0275text(23),e.\u0275\u0275pipe(24,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(25,"div",26),e.\u0275\u0275template(26,O,3,3,"div",27),e.\u0275\u0275template(27,k,3,3,"div",28),e.\u0275\u0275elementEnd()()()}if(2&n){const t=c.row,i=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",!t.videoCode),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",t.videoCode),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",t.mediaType===i.MediaTypes.Youtube),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1(" ",null==t?null:t.title," "),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngModel",t.hashtags)("disabled",!0),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate1("",e.\u0275\u0275pipeBind1(17,11,"CMSService::MediaLibrary:PublishDate")," : "),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind2(20,13,null==t?null:t.publishDate,i.AppConsts.DateOnlyFormat)),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1("",e.\u0275\u0275pipeBind1(24,16,"::Table:Actions")," : "),e.\u0275\u0275advance(3),e.\u0275\u0275property("abpPermission","CMSService.Medias.Edit"),e.\u0275\u0275advance(1),e.\u0275\u0275property("abpPermission","CMSService.Medias.Delete")}}function B(n,c){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275element(0,"app-nodata-or-loading",36),e.\u0275\u0275pipe(1,"abpLocalization"),e.\u0275\u0275pipe(2,"abpLocalization"),e.\u0275\u0275pipe(3,"abpLocalization"),e.\u0275\u0275pipe(4,"abpLocalization"),e.\u0275\u0275elementStart(5,"div",37)(6,"app-pager",38),e.\u0275\u0275listener("pageNumberChanged",function(a){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.onPageNumberChange(a))})("pageSizeChanged",function(a){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext(),p=e.\u0275\u0275reference(7);return e.\u0275\u0275resetView(r.onPageSizeChange(a,p))}),e.\u0275\u0275elementEnd()()}if(2&n){const t=c.rowCount,i=c.pageSize,a=c.curPage,r=e.\u0275\u0275nextContext();e.\u0275\u0275property("isLoadingData",r.service.isLoading)("isDataNotEmpty",r.service.data.items.length>0)("isDataFiltered",r.service.isFiltering)("nodataMessage",e.\u0275\u0275pipeBind1(1,10,"CMSService::NoMediaCurrently"))("nodataHint",e.\u0275\u0275pipeBind1(2,12,"CMSService::YouCanAddNewMedia"))("noFilterResultMessage",e.\u0275\u0275pipeBind1(3,14,"CMSService::MediaNoFilterResult"))("noFilterResultHint",e.\u0275\u0275pipeBind1(4,16,"CMSService::ChangeFilters")),e.\u0275\u0275advance(6),e.\u0275\u0275property("page",a)("size",i)("count",t)}}function H(n){return new o.ListFilterService(n.getList)}let j=(()=>{class n extends o.AbstractListComponent{constructor(t,i){super(),this._MediaService=t,this.service=i,this.MediaTypes=u.T,this.PreviewModeEnum=o.PreviewModeEnum,this.AppConsts=l.AppConsts,this.AttachmentEntities=l.AttachmentEntities}remove(t){this.confirmationService.warn("::CONF002","::DeleteConfimation",void 0,{yesSeverity:"error",yesText:"::DeleteConfimation:SaveButton"}).pipe((0,g.filter)(i=>i===o.SWConfirmation.SWStatus.confirm)).subscribe(()=>{this._MediaService.delete(t).subscribe(()=>{this.toasterService.success("::SuccessfullyDeleted"),this.list.get()})})}showMediaPreview(t){this.mediaPreviewComponent.showMediaPreview({mediaType:t.mediaType,entity:l.AttachmentEntities.MediaAttachment.entity,module:l.AttachmentEntities.MediaAttachment.module,title:t.title,attachmentImageId:t.imageAttachmentId,youtubeCode:t.videoCode})}static#e=this.\u0275fac=function(i){return new(i||n)(e.\u0275\u0275directiveInject(f.y),e.\u0275\u0275directiveInject(o.ListFilterService))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-media-library-list"]],viewQuery:function(i,a){if(1&i&&e.\u0275\u0275viewQuery(D,7),2&i){let r;e.\u0275\u0275queryRefresh(r=e.\u0275\u0275loadQuery())&&(a.mediaPreviewComponent=r.first)}},features:[e.\u0275\u0275ProvidersFeature([m.ListService,o.SelectedFiltersBannerService,{provide:o.ListFilterService,useFactory:H,deps:[f.y]}]),e.\u0275\u0275InheritDefinitionFeature],decls:14,vars:16,consts:[[3,"pageTitle","icon"],[1,"card","mt-3"],[1,"card-body"],["class","btn btn-sm btn-primary  d-flex align-items-center","routerLink","create",4,"abpPermission"],[1,"data-view",3,"rows","count","list","limit","columnMode","rowHeight","footerHeight"],["table",""],[3,"flexGrow","sortable","resizeable","draggable"],["ngx-datatable-cell-template",""],["ngx-datatable-footer-template","","ngx-datatable-footer-template",""],["preview",""],["routerLink","create",1,"btn","btn-sm","btn-primary","d-flex","align-items-center"],["src","../../../../../assets/images/plus-circle-add.svg",1,"me-1",3,"alt"],[1,"card-view"],[1,"card-image",3,"click"],[3,"previewMode","base64File",4,"ngIf"],["alt","",3,"src",4,"ngIf"],[1,"icon-container"],["class","video-icon","src","../../../../../assets/images/play.svg","alt","",4,"ngIf"],[1,"card-details"],[1,"d-flex","flex-column","w-100"],[1,"title","mb-2"],[1,"sub-title"],[1,"mb-0",3,"ngModel","disabled","ngModelChange"],[1,"list-items"],[1,"item"],[1,"card-action"],[1,"table-actions"],["class","btn btn-outline-primary","placement","top","container","body",3,"ngbTooltip","click",4,"abpPermission"],["class","btn btn-outline-danger","placement","top","container","body",3,"ngbTooltip","click",4,"abpPermission"],[3,"previewMode","base64File"],["alt","",3,"src"],["src","../../../../../assets/images/play.svg","alt","",1,"video-icon"],["placement","top","container","body",1,"btn","btn-outline-primary",3,"ngbTooltip","click"],[1,"icon-pencil"],["placement","top","container","body",1,"btn","btn-outline-danger",3,"ngbTooltip","click"],[1,"icon-trash"],["loaderImage","data-view-loader.svg","nodataImage","Events-icon.svg","nodataLink","/cmsAdmin/media/create","noFilterResultImage","no-filter-result.svg",3,"isLoadingData","isDataNotEmpty","isDataFiltered","nodataMessage","nodataHint","noFilterResultMessage","noFilterResultHint"],[1,"w-100","footer"],[3,"page","size","count","pageNumberChanged","pageSizeChanged"]],template:function(i,a){1&i&&(e.\u0275\u0275elementStart(0,"app-page-header",0),e.\u0275\u0275element(1,"app-media-library-filters"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(2,"app-selected-filters-banner"),e.\u0275\u0275elementStart(3,"div",1)(4,"div",2),e.\u0275\u0275template(5,E,6,6,"button",3),e.\u0275\u0275elementStart(6,"ngx-datatable",4,5)(8,"ngx-datatable-column",6),e.\u0275\u0275template(9,z,28,18,"ng-template",7),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"ngx-datatable-footer"),e.\u0275\u0275template(11,B,7,18,"ng-template",8),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275element(12,"app-media-preview",null,9)),2&i&&(e.\u0275\u0275property("pageTitle","CMSService::MediaLibrary:Management")("icon","Events-icon"),e.\u0275\u0275advance(5),e.\u0275\u0275property("abpPermission","CMSService.Medias.Create"),e.\u0275\u0275advance(1),e.\u0275\u0275classProp("is-empty",a.service.isLoading||0===a.service.data.items.length),e.\u0275\u0275property("rows",a.service.data.items)("count",a.service.data.totalCount)("list",a.list)("limit",a.list.maxResultCount)("columnMode","flex")("rowHeight","auto")("footerHeight",50),e.\u0275\u0275advance(2),e.\u0275\u0275property("flexGrow",1)("sortable",!1)("resizeable",!1)("draggable",!1))},dependencies:[b.NgIf,d.NgControlStatus,d.NgModel,h.RouterLink,m.PermissionDirective,v.DatatableComponent,v.DataTableColumnDirective,v.DataTableColumnCellDirective,v.DataTableFooterTemplateDirective,v.DatatableFooterDirective,w.NgxDatatableListDirective,o.PageHeaderComponent,o.Base64FilePerviewComponent,o.SelectedFiltersBannerComponent,l.PagerComponent,l.NodataOrLoadingComponent,M.NgbTooltip,y.Chips,C.$,I,b.DatePipe,m.LocalizationPipe,o.AttachmentPipe],styles:[".card-image[_ngcontent-%COMP%]{position:relative}.card-image[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]{position:absolute;top:0%;left:0%;display:flex;justify-content:center;align-items:center;width:100%;height:100%}.card-image[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{opacity:.7;border-radius:25px}.card-view[_ngcontent-%COMP%]{cursor:pointer}.card-view[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]{line-height:19px}.card-view[_ngcontent-%COMP%]   .card-image[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:100%;height:100%}.card-view[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{margin:.3rem 0px}.btn-primary[_ngcontent-%COMP%]{margin-bottom:16px}app-nodata-or-loading[_ngcontent-%COMP%]{min-height:230px}"]})}return n})();var R=s(42595);let U=(()=>{class n{constructor(t){this.LocalizationService=t}transform(t){return Object.keys(t).filter(i=>!isNaN(+i)).map(i=>({id:+i,displayName:this.LocalizationService.instant("CMSService::Enum:MediaType:"+i)}))}static#e=this.\u0275fac=function(i){return new(i||n)(e.\u0275\u0275directiveInject(m.LocalizationService,16))};static#t=this.\u0275pipe=e.\u0275\u0275definePipe({name:"enumToArray",type:n,pure:!0})}return n})();const G=["preview"];function W(n,c){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",3)(1,"div",4)(2,"form",5),e.\u0275\u0275listener("onSubmit",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.submitForm())})("keydown.enter",function(a){return a.preventDefault()}),e.\u0275\u0275elementStart(3,"div",6)(4,"div",7)(5,"div",8)(6,"input",9),e.\u0275\u0275listener("change",function(a){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.supportEn(a.currentTarget.checked))}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"label",10),e.\u0275\u0275text(8),e.\u0275\u0275pipe(9,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(10,"hr"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(11,"div",11)(12,"div",12)(13,"div",13)(14,"label",14),e.\u0275\u0275text(15),e.\u0275\u0275pipe(16,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(17,"input",15),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(18,"div",12)(19,"div",13)(20,"label",16),e.\u0275\u0275text(21),e.\u0275\u0275pipe(22,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(23,"input",17),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(24,"div",7)(25,"div",18)(26,"label",19),e.\u0275\u0275text(27),e.\u0275\u0275pipe(28,"abpLocalization"),e.\u0275\u0275elementStart(29,"span",20),e.\u0275\u0275text(30),e.\u0275\u0275pipe(31,"abpLocalization"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(32,"div",21)(33,"p-chips",22),e.\u0275\u0275listener("onAdd",function(a){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.onAddHastage(a))}),e.\u0275\u0275pipe(34,"abpLocalization"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(35,"div",11)(36,"div",23)(37,"div",24)(38,"label",25),e.\u0275\u0275text(39),e.\u0275\u0275pipe(40,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(41,"ng-select",26),e.\u0275\u0275pipe(42,"enumToArray"),e.\u0275\u0275pipe(43,"abpLocalization"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(44,"div",27)(45,"label",28),e.\u0275\u0275text(46),e.\u0275\u0275pipe(47,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(48,"div",29),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275reference(50);return e.\u0275\u0275resetView(a.toggle())}),e.\u0275\u0275element(49,"input",30,31),e.\u0275\u0275elementStart(51,"div",32),e.\u0275\u0275element(52,"i",33),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(53,"div",6)(54,"div",34)(55,"div",13)(56,"label",35),e.\u0275\u0275text(57),e.\u0275\u0275pipe(58,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(59,"app-attachment",36),e.\u0275\u0275listener("attachmentUpdated",function(a){e.\u0275\u0275restoreView(t);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.attachmentIdUpdated(a))}),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(60,"div",11)(61,"div",12)(62,"div",13)(63,"label",37),e.\u0275\u0275text(64),e.\u0275\u0275pipe(65,"abpLocalization"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(66,"input",38),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(67,"div",12)(68,"img",39),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.showMediaPreview())}),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275element(69,"hr"),e.\u0275\u0275elementStart(70,"div",3)(71,"div",40)(72,"button",41),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.submitForm())}),e.\u0275\u0275text(73),e.\u0275\u0275pipe(74,"abpLocalization"),e.\u0275\u0275element(75,"img",42),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(76,"button",43),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(t);const a=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(a.cancelForm())}),e.\u0275\u0275text(77),e.\u0275\u0275pipe(78,"abpLocalization"),e.\u0275\u0275elementEnd()()()()()()}if(2&n){const t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275property("formGroup",t.form)("validateOnSubmit",!0),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(9,34,"::SupportEn")),e.\u0275\u0275advance(7),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(16,36,"CMSService::Offers:TittleAr")),e.\u0275\u0275advance(2),e.\u0275\u0275property("minLength",t.ValidationConsts.FD012MinLength)("maxLength",t.ValidationConsts.FD012MaxLength),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(22,38,"CMSService::Offers:TittleEn")),e.\u0275\u0275advance(2),e.\u0275\u0275property("minLength",t.ValidationConsts.FD012MinLength)("maxLength",t.ValidationConsts.FD012MaxLength),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1("",e.\u0275\u0275pipeBind1(28,40,"CMSService::Media:Hashtag")," "),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(31,42,"::Optional")),e.\u0275\u0275advance(3),e.\u0275\u0275propertyInterpolate("placeholder",e.\u0275\u0275pipeBind1(34,44,"CMSService::Media:HashtagPlaceholder")),e.\u0275\u0275property("allowDuplicate",!1),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(40,46,"CMSService::Media:MediaType")),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate("placeholder",e.\u0275\u0275pipeBind1(43,50,"CMSService::Media:FD074")),e.\u0275\u0275property("items",e.\u0275\u0275pipeBind1(42,48,t.mediaTypes)),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(47,52,"CMSService::MediaLibrary:PublishDate")," "),e.\u0275\u0275advance(7),e.\u0275\u0275classProp("d-none",t.selectedMediaType!==t.mediaTypes.Image),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(58,54,"CMSService::Media:Attchement")," "),e.\u0275\u0275advance(2),e.\u0275\u0275property("acceptTypes",t.ValidationConsts.FD052FileExtension)("maxFileSize",t.ValidationConsts.FD052FileSize)("entity",t.AttachmentEntities.MediaAttachment.entity)("moduleName",t.AttachmentEntities.MediaAttachment.module)("maxFilesCount",50)("isRequired",t.selectedMediaType===t.mediaTypes.Image),e.\u0275\u0275advance(1),e.\u0275\u0275classProp("d-none",t.selectedMediaType!==t.mediaTypes.Youtube),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(65,56,"CMSService::Media:VideoCode")),e.\u0275\u0275advance(2),e.\u0275\u0275property("minLength",t.ValidationConsts.FD012MinLength)("maxLength",t.ValidationConsts.FD012MaxLength),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate1("src","https://i1.ytimg.com/vi/",t.form.value.videocode,"/default.jpg",e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(74,58,null!=t.selectedMedia&&t.selectedMedia.id?"AbpUi::Edit":"CMSService::Offers:Add")," "),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(78,60,"AbpUi::Cancel")," ")}}let F=(()=>{class n extends o.AbstractFormComponent{constructor(t,i,a,r,p,S){super(),this._fb=t,this._MediaService=i,this._confirmationService=a,this._activatedRoute=r,this._router=p,this._toasterService=S,this.ValidationConsts=l.ValidationConsts,this.AttachmentEntities=l.AttachmentEntities,this._isInsertMode=!1,this.selectedMedia={},this.mediaTypes=u.T}ngOnInit(){const t=+this._activatedRoute.snapshot.paramMap.get("id");this._isInsertMode=0==t,0!=t?this._sub$=this._MediaService.get(t).subscribe(i=>{this.selectedMedia={...i,id:t},this._buildForm()}):this._buildForm()}_buildForm(){const{titleEn:t,titleAr:i,mediaType:a,publishDate:r,hashtags:p,imageAttachmentId:S,videoCode:K,hasEnglish:X,concurrencyStamp:Z}=this.selectedMedia||{};this.form=this._fb.group({titleEn:[t,[l.CustomValidators.RequiredValidator(),l.CustomValidators.InvalidCharacterValidator(),d.Validators.minLength(l.ValidationConsts.FD012MinLength),d.Validators.maxLength(l.ValidationConsts.FD012MaxLength)]],titleAr:[i,[l.CustomValidators.RequiredValidator(),l.CustomValidators.InvalidCharacterValidator(),d.Validators.minLength(l.ValidationConsts.FD012MinLength),d.Validators.maxLength(l.ValidationConsts.FD012MaxLength)]],mediaType:[a,[l.CustomValidators.RequiredValidator()]],PublishDate:[r??new Date,[l.CustomValidators.RequiredValidator(),l.CustomValidators.DateInFuture()]],hashtags:[p,[l.CustomValidators.InvalidCharacterValidator()]],videocode:[K,[l.CustomValidators.RequiredValidator()]],imageAttachmentId:[S??0,[]],imageAttachmentIdFiles:[void 0],hasEnglish:[X??!1],concurrencyStamp:[Z]}),this.supportEn(!!this.selectedMedia?.id&&this.selectedMedia.hasEnglish),this._onMediaTypeChange(a),this.form.controls.mediaType.valueChanges.subscribe(x=>{this._onMediaTypeChange(x)}),this._isInsertMode||new Date>new Date(r)&&this.form.controls.PublishDate.disable()}_onMediaTypeChange(t){t&&(this.selectedMediaType=t,this.selectedMediaType==u.T.Image?(this.form.controls.videocode.disable(),this.form.controls.imageAttachmentId.enable()):(this.form.controls.imageAttachmentId.disable(),this.form.controls.videocode.enable()),this.form.controls.videocode.updateValueAndValidity())}submitForm(){if(this.form.invalid)return this._toasterService.warn("CMSService::FormValidationWarining"),void this.scrollToFirstInvalidControl();this._sub$=this._confirmationService.warn(this.selectedMedia?.id?"::CONF003":"::CONF001","::AreYouSure",void 0,{yesSeverity:"success"}).pipe((0,g.filter)(t=>t===o.SWConfirmation.SWStatus.confirm)).subscribe(()=>{const t=this.form.getRawValue();t.mediaType===u.T.Image?t.videocode=void 0:t.mediaType===u.T.Youtube&&(t.imageAttachmentId=void 0,t.imageAttachmentIdFiles=void 0),(this.selectedMedia?.id?this._MediaService.update(this.selectedMedia?.id,t):this._MediaService.create(t)).subscribe(()=>{this._toasterService.success("::Success"),this._goToListPage()})})}_goToListPage(){this._router.navigate(["../"+(this.selectedMedia?.id?"../":"")],{relativeTo:this._activatedRoute})}cancelForm(){this._confirmationService.warn("::CONF004","::AreYouSure",void 0,{yesSeverity:this._mediaId?"success":"error"}).pipe((0,g.filter)(t=>t===o.SWConfirmation.SWStatus.confirm)).subscribe(()=>{this._goToListPage()})}attachmentIdUpdated(t){this.form.get("imageAttachmentIdFiles").setValue(t.files.toString())}supportEn(t){this.setControlProps("titleEn",t)}onAddHastage(t){t.value.indexOf(" ")>=0&&(this._toasterService.warn("CMSService::Media:Errors:InvalidHashtag"),this.form.controls.hashtags.value.pop())}showMediaPreview(){this.mediaPreviewComponent.showMediaPreview({mediaType:u.T.Youtube,title:"",youtubeCode:this.form.value.videocode})}ngOnDestroy(){return this._sub$?.unsubscribe()}static#e=this.\u0275fac=function(i){return new(i||n)(e.\u0275\u0275directiveInject(d.FormBuilder),e.\u0275\u0275directiveInject(f.y),e.\u0275\u0275directiveInject(o.SWConfirmationService),e.\u0275\u0275directiveInject(h.ActivatedRoute),e.\u0275\u0275directiveInject(h.Router),e.\u0275\u0275directiveInject(w.ToasterService))};static#t=this.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-media-lib-create-or-update"]],viewQuery:function(i,a){if(1&i&&e.\u0275\u0275viewQuery(G,7),2&i){let r;e.\u0275\u0275queryRefresh(r=e.\u0275\u0275loadQuery())&&(a.mediaPreviewComponent=r.first)}},features:[e.\u0275\u0275InheritDefinitionFeature],decls:5,vars:4,consts:[[3,"pageTitle","icon","isParentRoute"],["class","card",4,"ngIf"],["preview",""],[1,"card"],[1,"card-body"],[3,"formGroup","validateOnSubmit","onSubmit","keydown.enter"],[1,"row","pb-2"],[1,"col-lg-12"],[1,"form-group","w-100"],["id","support","type","checkbox","formControlName","hasEnglish",1,"forn-control","me-1","form-check-input",3,"change"],["for","support",1,"form-label"],[1,"row"],[1,"col-lg-6","col-md-12"],[1,"form-group"],["for","TittleAr",1,"form-label"],["dir","rtl","id","TittleAr","formControlName","titleAr",1,"form-control",3,"minLength","maxLength"],["for","TittleEn",1,"form-label"],["id","TittleEn","dir","ltr","formControlName","titleEn",1,"form-control",3,"minLength","maxLength"],[1,"form-group","d-flex","flex-column","py-2"],["for","hashtag",1,"form-label"],[1,"optional-field"],[1,"card","p-fluid"],["formControlName","hashtags","inputId","hashtag",1,"form-control",3,"allowDuplicate","placeholder","onAdd"],[1,"col-lg-6"],[1,"form-group","pb-2"],["for","media-type",1,"form-label"],["formControlName","mediaType","bindLabel","displayName","bindValue","id",1,"border-0",3,"items","placeholder"],[1,"form-group","col-lg-6"],["for","OfferPublishDate",1,"form-label"],[1,"date-picker-container",3,"click"],["name","datepicker","formControlName","PublishDate","ngbDatepicker","",1,"form-control"],["PublishDate","ngbDatepicker"],[1,"date-picker-icon"],[1,"icon-calendar"],[1,"col-12"],["for","imageId",1,"form-label"],["id","imageId","name","imageId","formControlName","imageAttachmentId",3,"acceptTypes","maxFileSize","entity","moduleName","maxFilesCount","isRequired","attachmentUpdated"],["for","VideoCode",1,"form-label"],["id","VideoCode","formControlName","videocode",1,"form-control",3,"minLength","maxLength"],["alt","VIDEO_LOGO",1,"img-thumbnail","rounded","mb-3",3,"src","click"],[1,"card-body","d-flex","justify-content-center"],["type","submit",1,"btn","btn-primary","d-flex","mx-3","btn-padding",3,"click"],["src","assets/images/checkIcon.png","alt","save",1,"ms-2"],["type","button",1,"btn-cancel",3,"click"]],template:function(i,a){1&i&&(e.\u0275\u0275elementStart(0,"abp-page"),e.\u0275\u0275element(1,"app-page-header",0),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(2,W,79,62,"div",1),e.\u0275\u0275element(3,"app-media-preview",null,2)),2&i&&(e.\u0275\u0275advance(1),e.\u0275\u0275property("pageTitle",a._isInsertMode?"CMSService::Media:Add":"CMSService::Media:Edit")("icon","Events-icon")("isParentRoute",!0),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",a.form))},dependencies:[b.NgIf,d.\u0275NgNoValidate,d.DefaultValueAccessor,d.CheckboxControlValueAccessor,d.NgControlStatus,d.NgControlStatusGroup,d.FormGroupDirective,d.FormControlName,R.PageComponent,_.ValidationGroupDirective,_.ValidationDirective,o.PageHeaderComponent,o.AttachmentComponent,T.NgSelectComponent,M.NgbInputDatepicker,y.Chips,C.$,m.LocalizationPipe,U],styles:[".btn-cancel[_ngcontent-%COMP%]{border-radius:8px;border:1px solid var(--neutral-400, #94a3b8);padding:10px 30px;color:var(--neutral-500, #64748b);font-size:16px;font-weight:500;background-color:transparent;display:flex;justify-content:center;align-items:center}.btn-cancel[_ngcontent-%COMP%]:hover{background:rgba(100,116,139,.1647058824)}"]})}return n})();const Q=[{path:"",component:j,canActivate:[m.PermissionGuard],data:{requiredPolicy:"CMSService.Medias"}},{path:"create",component:F,canActivate:[m.PermissionGuard],data:{requiredPolicy:"CMSService.Medias.Create"}},{path:"update/:id",component:F,canActivate:[m.PermissionGuard],data:{requiredPolicy:"CMSService.Medias.Edit"}}];let Y=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:n});static#i=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[h.RouterModule.forChild(Q),h.RouterModule]})}return n})();var $=s(92134);let J=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.\u0275\u0275defineNgModule({type:n});static#i=this.\u0275inj=e.\u0275\u0275defineInjector({imports:[$.b,Y,y.ChipsModule,C.$]})}return n})()}}]);