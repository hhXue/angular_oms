define(['angularAMD', 'BaseService', 'Session'], function(angularAMD, BaseService, Session) {



    angularAMD.service('AuthService', ['APP_CONFIG', '$http', 'Session', '$q', function(config, $http, Session, $q) {

        var mapping = {};

        var authService = new BaseService(config, $http, $q, mapping);

        authService.login = function(user) {
          console.log('login user',user);
            var that = this;
            var d = that.$q.defer();
          Session.create({
            "sessionId": 1,
            "userId": 1,
            "userName": "管理员",
            "userRole": "admin",
            "authKey": "",
            "systems": [
              {
                "name": "oms",
                "alias": "OMS",
                "modules": [
                  {
                    "name": "oms.home",
                    "alias": "用户概况",
                    "controllers": [],
                    "methods": [
                      {
                        "name": "create",
                        "alias": "添加权限"
                      },
                      {
                        "name": "update",
                        "alias": "编辑"
                      },
                      {
                        "name": "read",
                        "alias": "权限列表"
                      },
                      {
                        "name": "delete",
                        "alias": "删除"
                      }
                    ]
                  },
                  {
                    "name": "oms.system",
                    "alias": "权限管理",
                    "controllers": [
                      {
                        "name": "oms.system.permission",
                        "alias": "权限管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.system.role",
                        "alias": "角色管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.system.user",
                        "alias": "账号管理",
                        "methods": []
                      },
                      {
                        "name": "oms.system.permissionrole",
                        "alias": "设置权限",
                        "methods": []
                      }
                    ]
                  },
                  {
                    "name": "oms.apps",
                    "alias": "应用管理",
                    "controllers": [],
                    "methods": [
                      {
                        "name": "create",
                        "alias": "添加权限"
                      },
                      {
                        "name": "update",
                        "alias": "编辑"
                      },
                      {
                        "name": "read",
                        "alias": "权限列表"
                      },
                      {
                        "name": "delete",
                        "alias": "删除"
                      },
                      {
                        "name": "forceUpdate",
                        "alias": "强制升级"
                      }
                    ]
                  },
                  {
                    "name": "oms.cps",
                    "alias": "CP管理",
                    "controllers": [
                      {
                        "name": "oms.cps.cps",
                        "alias": "列表管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.cps.channel",
                        "alias": "频道管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "oms.basic",
                    "alias": "基础管理",
                    "controllers": [
                      {
                        "name": "oms.basic.property",
                        "alias": "属性管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "新增属性"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.basic.channelClass",
                        "alias": "频道分类管理",
                        "methods": [
                          "create",
                          "update",
                          "read",
                          "delete"
                        ]
                      },
                      {
                        "name": "oms.basic.tag",
                        "alias": "标签管理",
                        "methods": []
                      }
                    ]
                  },
                  {
                    "name": "oms.contents",
                    "alias": "内容管理",
                    "controllers": [
                      {
                        "name": "oms.contents.epg",
                        "alias": "EPG管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.contents.program",
                        "alias": "编辑节目单",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.contents.show",
                        "alias": "栏目管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "oms.client",
                    "alias": "客户端管理",
                    "controllers": [
                      {
                        "name": "oms.client.tab",
                        "alias": "TAB管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "oms.interface",
                    "alias": "接口管理",
                    "controllers": [
                      {
                        "name": "oms.interface.tmpapi",
                        "alias": "自定义接口管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "name": "jieshao",
                "alias": "活动介绍",
                "modules":[
                  {
                    "name": "jieshao.jieshao",
                    "alias": "活动介绍",
                    "controllers": [] ,
                    "methods": [{
                      "name": "create",
                      "alias": "添加权限"
                    },{
                      "name": "update",
                      "alias": "编辑"
                    },{
                      "name": "read",
                      "alias": "权限列表"
                    },{
                      "name": "delete",
                      "alias": "删除"
                    }]
                  }

                    ]
                  },
              {
                "name":"active_pho",
                "alias":"活动照片/视频",
                "modules":[
                  {
                    "name": "jieshao.active_pho",
                    "alias": "活动照片/视频",
                    "controllers": [],
                    "methods": [{
                      "name": "create",
                      "alias": "添加权限"
                    },{
                      "name": "update",
                      "alias": "编辑"
                    },{
                      "name": "read",
                      "alias": "权限列表"
                    },{
                      "name": "delete",
                      "alias": "删除"
                    }]
                  }
                ]

              }
            ]
          });

          d.resolve({
            "sessionId": 1,
            "userId": 1,
            "userName": "管理员",
            "userRole": "admin",
            "authKey": "",
            "systems": [
              {
                "name": "oms",
                "alias": "OMS",
                "modules": [
                  {
                    "name": "oms.home",
                    "alias": "用户概况",
                    "controllers": [],
                    "methods": [
                      {
                        "name": "create",
                        "alias": "添加权限"
                      },
                      {
                        "name": "update",
                        "alias": "编辑"
                      },
                      {
                        "name": "read",
                        "alias": "权限列表"
                      },
                      {
                        "name": "delete",
                        "alias": "删除"
                      }
                    ]
                  },
                  {
                    "name": "oms.system",
                    "alias": "权限管理",
                    "controllers": [
                      {
                        "name": "oms.system.permission",
                        "alias": "权限管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.system.role",
                        "alias": "角色管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.system.user",
                        "alias": "账号管理",
                        "methods": []
                      },
                      {
                        "name": "oms.system.permissionrole",
                        "alias": "设置权限",
                        "methods": []
                      }
                    ]
                  },
                  {
                    "name": "oms.apps",
                    "alias": "应用管理",
                    "controllers": [],
                    "methods": [
                      {
                        "name": "create",
                        "alias": "添加权限"
                      },
                      {
                        "name": "update",
                        "alias": "编辑"
                      },
                      {
                        "name": "read",
                        "alias": "权限列表"
                      },
                      {
                        "name": "delete",
                        "alias": "删除"
                      },
                      {
                        "name": "forceUpdate",
                        "alias": "强制升级"
                      }
                    ]
                  },
                  {
                    "name": "oms.cps",
                    "alias": "CP管理",
                    "controllers": [
                      {
                        "name": "oms.cps.cps",
                        "alias": "列表管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.cps.channel",
                        "alias": "频道管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "oms.basic",
                    "alias": "基础管理",
                    "controllers": [
                      {
                        "name": "oms.basic.property",
                        "alias": "属性管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "新增属性"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.basic.channelClass",
                        "alias": "频道分类管理",
                        "methods": [
                          "create",
                          "update",
                          "read",
                          "delete"
                        ]
                      },
                      {
                        "name": "oms.basic.tag",
                        "alias": "标签管理",
                        "methods": []
                      }
                    ]
                  },
                  {
                    "name": "oms.contents",
                    "alias": "内容管理",
                    "controllers": [
                      {
                        "name": "oms.contents.epg",
                        "alias": "EPG管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.contents.program",
                        "alias": "编辑节目单",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      },
                      {
                        "name": "oms.contents.show",
                        "alias": "栏目管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "oms.client",
                    "alias": "客户端管理",
                    "controllers": [
                      {
                        "name": "oms.client.tab",
                        "alias": "TAB管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "oms.interface",
                    "alias": "接口管理",
                    "controllers": [
                      {
                        "name": "oms.interface.tmpapi",
                        "alias": "自定义接口管理",
                        "methods": [
                          {
                            "name": "create",
                            "alias": "添加权限"
                          },
                          {
                            "name": "update",
                            "alias": "编辑"
                          },
                          {
                            "name": "read",
                            "alias": "权限列表"
                          },
                          {
                            "name": "delete",
                            "alias": "删除"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "name": "jieshao",
                "alias": "活动介绍",
                "modules":[
                  {
                    "name": "jieshao.jieshao",
                    "alias": "活动介绍",
                    "controllers": [] ,
                    "methods": [{
                      "name": "create",
                      "alias": "添加权限"
                    },{
                      "name": "update",
                      "alias": "编辑"
                    },{
                      "name": "read",
                      "alias": "权限列表"
                    },{
                      "name": "delete",
                      "alias": "删除"
                    }]
                  }

                ]
              },
              {
                "name":"active_pho",
                "alias":"活动照片/视频",
                "modules":[
                  {
                    "name": "jieshao.active_pho",
                    "alias": "活动照片/视频",
                    "controllers": [],
                    "methods": [{
                      "name": "create",
                      "alias": "添加权限"
                    },{
                      "name": "update",
                      "alias": "编辑"
                    },{
                      "name": "read",
                      "alias": "权限列表"
                    },{
                      "name": "delete",
                      "alias": "删除"
                    }]
                  }
                ]

              }
            ]
          });
            //$http({
            //    //url: that.httpBaseUrl + '/login/login',
            //    url: 'api/user.json',
            //    method: "POST",
            //    data: user,
            //    withCredentials: true
            //}).then(function(resp) {
            //  console.log('login resp',resp);
            //
            //    Session.create(resp.data.data);
            //    d.resolve(resp.data.data);
            //}, function(resp) {
            //    d.reject(resp);
            //});


            //PUSH
            //$http.get('api/user.json').success(function(resp){
            //    console.info('push data', resp);
            //  var resp = eval('('+resp+')')
            //      Session.create(resp.data.data);
            //      d.resolve(resp.data.data);
            //    //resp.data.data.systems.push(data);
            //
            //});

            //setTimeout(function(){
            //     $http.get( 'api/user.json?_=' + (new Date()).getTime() )
            //         .success(function(user){
            //             Session.create(user);
            //             d.resolve(user);
            //         })
            //         .error(function(info){
            //             d.reject({"data": {"code":404,"message":"error message"}});
            //         });
            //},1000);

            return d.promise;
        };


        authService.ckCookie = function() {
            var that = this;
            var d = that.$q.defer();
            $http({
                url: that.httpBaseUrl + '/login/checklogin',
                method: "GET",
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(function(resp) {
                console.log('response', resp);
                Session.create(resp.data.data);
                d.resolve(resp.data.data);
            }, function(resp) {
                d.reject(resp);
            });


            return d.promise;
        };



        authService.logout = function() {
            var d = $q.defer();
            setTimeout(function() {
                Session.destroy();
                d.resolve();
            }, 1000);
            return d.promise;
        }

        authService.isAuthenticated = function() {

            return !!Session.userId;
        };

        authService.isAuthorized = function(authorizedRoles) {

            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            return authorizedRoles.indexOf('*') > -1 ||
                (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;

    }]);

});
