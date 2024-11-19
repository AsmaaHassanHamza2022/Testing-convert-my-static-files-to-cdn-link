(self.webpackChunkportal=self.webpackChunkportal||[]).push([[11876],{11876:(g,m,o)=>{o.r(m),o.d(m,{IdentityClaimTypeService:()=>d,IdentityClaimValueType:()=>n,IdentityExternalLoginService:()=>u,IdentityRoleService:()=>l,IdentitySecurityLogService:()=>c,IdentitySettingsService:()=>p,IdentityUserLookupService:()=>N,IdentityUserService:()=>v,OrganizationUnitService:()=>y,identityClaimValueTypeOptions:()=>h});var r=o(81011),a=o(11705);let d=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.create=e=>this.restService.request({method:"POST",url:"/api/identity/claim-types",body:e},{apiName:this.apiName}),this.delete=e=>this.restService.request({method:"DELETE",url:`/api/identity/claim-types/${e}`},{apiName:this.apiName}),this.get=e=>this.restService.request({method:"GET",url:`/api/identity/claim-types/${e}`},{apiName:this.apiName}),this.getList=e=>this.restService.request({method:"GET",url:"/api/identity/claim-types",params:{filter:e.filter,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName}),this.update=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/claim-types/${e}`,body:i},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var n=function(t){return t[t.String=0]="String",t[t.Int=1]="Int",t[t.Boolean=2]="Boolean",t[t.DateTime=3]="DateTime",t}(n||{});const h=(0,r.mapEnumToOptions)(n);let u=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.createOrUpdate=()=>this.restService.request({method:"POST",url:"/api/identity/external-login"},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),l=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.create=e=>this.restService.request({method:"POST",url:"/api/identity/roles",body:e},{apiName:this.apiName}),this.delete=e=>this.restService.request({method:"DELETE",url:`/api/identity/roles/${e}`},{apiName:this.apiName}),this.get=e=>this.restService.request({method:"GET",url:`/api/identity/roles/${e}`},{apiName:this.apiName}),this.getAllClaimTypes=()=>this.restService.request({method:"GET",url:"/api/identity/roles/all-claim-types"},{apiName:this.apiName}),this.getAllList=()=>this.restService.request({method:"GET",url:"/api/identity/roles/all"},{apiName:this.apiName}),this.getClaims=e=>this.restService.request({method:"GET",url:`/api/identity/roles/${e}/claims`},{apiName:this.apiName}),this.getList=e=>this.restService.request({method:"GET",url:"/api/identity/roles",params:{filter:e.filter,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName}),this.update=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/roles/${e}`,body:i},{apiName:this.apiName}),this.updateClaims=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/roles/${e}/claims`,body:i},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),c=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.get=e=>this.restService.request({method:"GET",url:`/api/identity/security-logs/${e}`},{apiName:this.apiName}),this.getList=e=>this.restService.request({method:"GET",url:"/api/identity/security-logs",params:{startTime:e.startTime,endTime:e.endTime,applicationName:e.applicationName,identity:e.identity,action:e.action,userName:e.userName,clientId:e.clientId,correlationId:e.correlationId,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName}),this.getMy=e=>this.restService.request({method:"GET",url:`/api/identity/security-logs/my/${e}`},{apiName:this.apiName}),this.getMyList=e=>this.restService.request({method:"GET",url:"/api/identity/security-logs/my",params:{startTime:e.startTime,endTime:e.endTime,applicationName:e.applicationName,identity:e.identity,action:e.action,userName:e.userName,clientId:e.clientId,correlationId:e.correlationId,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),p=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.get=()=>this.restService.request({method:"GET",url:"/api/identity/settings"},{apiName:this.apiName}),this.getLdap=()=>this.restService.request({method:"GET",url:"/api/identity/settings/ldap"},{apiName:this.apiName}),this.getOAuth=()=>this.restService.request({method:"GET",url:"/api/identity/settings/oauth"},{apiName:this.apiName}),this.update=e=>this.restService.request({method:"PUT",url:"/api/identity/settings",body:e},{apiName:this.apiName}),this.updateLdap=e=>this.restService.request({method:"PUT",url:"/api/identity/settings/ldap",body:e},{apiName:this.apiName}),this.updateOAuth=e=>this.restService.request({method:"PUT",url:"/api/identity/settings/oauth",body:e},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),N=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.findById=e=>this.restService.request({method:"GET",url:`/api/identity/users/lookup/${e}`},{apiName:this.apiName}),this.findByUserName=e=>this.restService.request({method:"GET",url:`/api/identity/users/lookup/by-username/${e}`},{apiName:this.apiName}),this.getCount=e=>this.restService.request({method:"GET",url:"/api/identity/users/lookup/count",params:{filter:e.filter}},{apiName:this.apiName}),this.search=e=>this.restService.request({method:"GET",url:"/api/identity/users/lookup/search",params:{sorting:e.sorting,filter:e.filter,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),v=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.create=e=>this.restService.request({method:"POST",url:"/api/identity/users",body:e},{apiName:this.apiName}),this.delete=e=>this.restService.request({method:"DELETE",url:`/api/identity/users/${e}`},{apiName:this.apiName}),this.findByEmail=e=>this.restService.request({method:"GET",url:`/api/identity/users/by-email/${e}`},{apiName:this.apiName}),this.findByUsername=e=>this.restService.request({method:"GET",url:`/api/identity/users/by-username/${e}`},{apiName:this.apiName}),this.get=e=>this.restService.request({method:"GET",url:`/api/identity/users/${e}`},{apiName:this.apiName}),this.getAllClaimTypes=()=>this.restService.request({method:"GET",url:"/api/identity/users/all-claim-types"},{apiName:this.apiName}),this.getAssignableRoles=()=>this.restService.request({method:"GET",url:"/api/identity/users/assignable-roles"},{apiName:this.apiName}),this.getAvailableOrganizationUnits=()=>this.restService.request({method:"GET",url:"/api/identity/users/available-organization-units"},{apiName:this.apiName}),this.getClaims=e=>this.restService.request({method:"GET",url:`/api/identity/users/${e}/claims`},{apiName:this.apiName}),this.getExternalLoginProviders=()=>this.restService.request({method:"GET",url:"/api/identity/users/external-login-Providers"},{apiName:this.apiName}),this.getList=e=>this.restService.request({method:"GET",url:"/api/identity/users",params:{filter:e.filter,roleId:e.roleId,organizationUnitId:e.organizationUnitId,userName:e.userName,phoneNumber:e.phoneNumber,emailAddress:e.emailAddress,name:e.name,surname:e.surname,isLockedOut:e.isLockedOut,notActive:e.notActive,emailConfirmed:e.emailConfirmed,isExternal:e.isExternal,maxCreationTime:e.maxCreationTime,minCreationTime:e.minCreationTime,maxModifitionTime:e.maxModifitionTime,minModifitionTime:e.minModifitionTime,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName}),this.getOrganizationUnitLookup=()=>this.restService.request({method:"GET",url:"/api/identity/users/lookup/organization-units"},{apiName:this.apiName}),this.getOrganizationUnits=e=>this.restService.request({method:"GET",url:`/api/identity/users/${e}/organization-units`},{apiName:this.apiName}),this.getRoleLookup=()=>this.restService.request({method:"GET",url:"/api/identity/users/lookup/roles"},{apiName:this.apiName}),this.getRoles=e=>this.restService.request({method:"GET",url:`/api/identity/users/${e}/roles`},{apiName:this.apiName}),this.getTwoFactorEnabled=e=>this.restService.request({method:"GET",url:`/api/identity/users/${e}/two-factor-enabled`},{apiName:this.apiName}),this.importExternalUser=e=>this.restService.request({method:"POST",url:"/api/identity/users/import-external-user",body:e},{apiName:this.apiName}),this.lock=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/users/${e}/lock/${i}`},{apiName:this.apiName}),this.setTwoFactorEnabled=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/users/${e}/two-factor/${i}`},{apiName:this.apiName}),this.unlock=e=>this.restService.request({method:"PUT",url:`/api/identity/users/${e}/unlock`},{apiName:this.apiName}),this.update=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/users/${e}`,body:i},{apiName:this.apiName}),this.updateClaims=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/users/${e}/claims`,body:i},{apiName:this.apiName}),this.updatePassword=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/users/${e}/change-password`,body:i},{apiName:this.apiName}),this.updateRoles=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/users/${e}/roles`,body:i},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),y=(()=>{class t{constructor(s){this.restService=s,this.apiName="AbpIdentity",this.addMembers=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/organization-units/${e}/members`,body:i},{apiName:this.apiName}),this.addRoles=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/organization-units/${e}/roles`,body:i},{apiName:this.apiName}),this.create=e=>this.restService.request({method:"POST",url:"/api/identity/organization-units",body:e},{apiName:this.apiName}),this.delete=e=>this.restService.request({method:"DELETE",url:"/api/identity/organization-units",params:{id:e}},{apiName:this.apiName}),this.get=e=>this.restService.request({method:"GET",url:`/api/identity/organization-units/${e}`},{apiName:this.apiName}),this.getAvailableRoles=e=>this.restService.request({method:"GET",url:"/api/identity/organization-units/available-roles",params:{filter:e.filter,id:e.id,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName}),this.getAvailableUsers=e=>this.restService.request({method:"GET",url:"/api/identity/organization-units/available-users",params:{filter:e.filter,id:e.id,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName}),this.getList=e=>this.restService.request({method:"GET",url:"/api/identity/organization-units",params:{filter:e.filter,sorting:e.sorting,skipCount:e.skipCount,maxResultCount:e.maxResultCount}},{apiName:this.apiName}),this.getListAll=()=>this.restService.request({method:"GET",url:"/api/identity/organization-units/all"},{apiName:this.apiName}),this.getMembers=(e,i)=>this.restService.request({method:"GET",url:`/api/identity/organization-units/${e}/members`,params:{filter:i.filter,roleId:i.roleId,organizationUnitId:i.organizationUnitId,userName:i.userName,phoneNumber:i.phoneNumber,emailAddress:i.emailAddress,name:i.name,surname:i.surname,isLockedOut:i.isLockedOut,notActive:i.notActive,emailConfirmed:i.emailConfirmed,isExternal:i.isExternal,maxCreationTime:i.maxCreationTime,minCreationTime:i.minCreationTime,maxModifitionTime:i.maxModifitionTime,minModifitionTime:i.minModifitionTime,sorting:i.sorting,skipCount:i.skipCount,maxResultCount:i.maxResultCount}},{apiName:this.apiName}),this.getRoles=(e,i)=>this.restService.request({method:"GET",url:`/api/identity/organization-units/${e}/roles`,params:{sorting:i.sorting,skipCount:i.skipCount,maxResultCount:i.maxResultCount}},{apiName:this.apiName}),this.move=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/organization-units/${e}/move`,body:i},{apiName:this.apiName}),this.removeMember=(e,i)=>this.restService.request({method:"DELETE",url:`/api/identity/organization-units/${e}/members/${i}`},{apiName:this.apiName}),this.removeRole=(e,i)=>this.restService.request({method:"DELETE",url:`/api/identity/organization-units/${e}/roles/${i}`},{apiName:this.apiName}),this.update=(e,i)=>this.restService.request({method:"PUT",url:`/api/identity/organization-units/${e}`,body:i},{apiName:this.apiName})}static#e=this.\u0275fac=function(e){return new(e||t)(a.\u0275\u0275inject(r.RestService))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})()}}]);