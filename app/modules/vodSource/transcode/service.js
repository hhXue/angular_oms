define(["angularAMD","BaseService"],function(angularAMD,BaseService){"use strict";angularAMD.service("TransService",["APP_CONFIG","$http","$q",function(config,$http,$q){var mapping={transcode:{id:"transId",videoId:"videoId",transParty:"transParty",uploadTime:"uploadTime",uploadStatus:"uploadStatus",transStarttime:"transStarttime",transEndtime:"transEndtime",transStatus:"transStatus",persistentId:"persistentId",videoUrl:"videoUrl",status:"status",createdAt:"createdAt",updatedAt:"updatedAt",showName:"showName",videoName:"videoName",fileName:"fileName"}},transService=new BaseService(config,$http,$q,mapping);return transService.reUpload=function(id){var that=this,method="",url="",name=that.name;return method="PATCH",url=that.httpBaseUrl+"/"+name+"/reupload/"+id,that.$http({url:url,method:method,withCredentials:!0})},transService.reTranscode=function(id){var that=this,method="",url="",name=that.name;return method="PATCH",url=that.httpBaseUrl+"/"+name+"/retranscode/"+id,that.$http({url:url,method:method,withCredentials:!0})},transService}])});