define(["angularAMD","BaseService"],function(angularAMD,BaseService){"use strict";angularAMD.service("SourceService",["APP_CONFIG","$http","$q",function(config,$http,$q){var mapping={source:{id:"lsId",name:"lsName",location:"location",status:"lsStatus",fromSource:"fromSource",updatedAt:"updatedAt",createdAt:"createdAt",lsStatus:"lsStatus"}},sourceService=new BaseService(config,$http,$q,mapping);return sourceService.setHttpBaseUrl(config.sourceUrl),sourceService.getSourceVideo=function(id){var d=$q.defer();return $http({url:config.serverUrl+"/liveSource/"+id,method:"GET",headers:{Authorization:"Basic fdfwoeigjiewoe","Content-Type":"application/x-www-form-urlencoded"},withCredentials:!0}).then(function(resp){resp.data.rows=sourceService.changeToLocalColumns(resp.data.rows),d.resolve(resp)},function(error){d.reject(error)}),d.promise},sourceService}])});