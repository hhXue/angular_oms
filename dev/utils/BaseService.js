define([
    'lodash'
], function() {
    'use strict';

    function BaseService(config, $http, $q, mapping) {
        var that = this;
        //        that.name = name.toLowerCase();
        that.name = '';
        that.$http = $http;
        that.$q = $q;
        that.config = config;
        that.mapping = mapping;

        //$http request base url
        that.httpBaseUrl = config.httpBaseUrl;
        that.epgBaseUrl = config.epgBaseUrl;
        that.imgBaseUrl = config.imgBaseUrl;
        that.pushBaseUrl = config.pushBaseUrl;
        that.serverUrl = config.serverUrl;
        that.areaUrl = config.areaUrl;
        that.sourceUrl = config.sourceUrl;
        that.sourceServeUrl = config.sourceServeUrl;
        that.cvaBaseUrl = config.cvaBaseUrl;
    }

    BaseService.prototype = {
        saveItem: saveItem,
        getList: getList,
        getAllArea:getAllArea,
        getAppKey:getAppKey,
        deleteItem: deleteItem,
        setName: setName,
        changeToLocalColumns: changeToLocalColumns,
        changeFromLocalColumns: changeFromLocalColumns,
        isEmptyObject: isEmptyObject,
        getHttpBaseUrl: getHttpBaseUrl,
        setHttpBaseUrl: setHttpBaseUrl
    };

    function getHttpBaseUrl() {
        var that = this;
        return that.config;
    }


    function setHttpBaseUrl(url) {
        this.httpBaseUrl = url;
        return this;
    }

    function isEmptyObject(obj) {
        for (var n in obj) {
            return false
        }
        return true;
    }
    //把本地的字段转换成服务器的字段
    function changeFromLocalColumns(array, mapping) {
        if (!_.isUndefined(mapping)) {
            var _mapping = mapping;
        } else {
            var _mapping = this.mapping[this.name];
        }
        return changeColumns(_mapping, array);

    }

    function changeToLocalColumns(array, mapping) {
        if (!_.isUndefined(mapping)) {
            var _mapping = mapping;
        } else {
            var _mapping = this.mapping[this.name];
        }
        _mapping = _.invert(_mapping);

        return changeColumns(_mapping, array);

    }

    function setName(name) {
        this.name = name;

        return this;
    }

    function getList(pageNumber, params) {
        var that = this;

        var d = that.$q.defer();

        params = params ? that.changeFromLocalColumns(params) : {};

        if(pageNumber){
            params.currentPage = pageNumber;
        }


        that.$http({
            url: that.httpBaseUrl + '/' + that.name + '/index',
            method: "GET",
            params: params,
            header: {
                'Authorization': 'Basic fdfwoeigjiewoe',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(function(resp) {
            resp.data.rows = that.changeToLocalColumns(resp.data.rows);
            d.resolve(resp);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    }

    //get appKey
    function getAppKey(params){
        var that = this;
        var d = that.$q.defer();
        that.$http({
            url:that.httpBaseUrl + '/appKey/index',
            method:'GET',
            params:params,
            headers:{
                'Authorization': 'Basic fdfwoeigjiewoe',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        }).then(function(resp) {
            d.resolve(resp);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    }

    //get all area
    function getAllArea(){
        var that = this;

        var d = that.$q.defer();

        that.$http({
            url:that.areaUrl + '/area/index',
            method:'GET',
            header:{
                'Authorization': 'Basic fdfwoeigjiewoe',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(function(resp) {
            //resp.data.rows = that.changeToLocalColumns( resp.data.rows );
            d.resolve(resp);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    }


    function saveItem(item, scope) {
        var that = this;
        var method = '';
        var url = '';
        var name = that.name;

        scope.submitStatus = true;
        if (!_.isUndefined(item['id'])) {
            method = 'PATCH';
            url = that.httpBaseUrl + '/' + name + '/update/' + item['id'];
        } else {
            method = 'POST';
            url = that.httpBaseUrl + '/' + name + '/create';
        }
        item = that.changeFromLocalColumns(item);
        console.log("after item", item);
        return that.$http({
            url: url,
            method: method,
            data: item,
            withCredentials: true
        });
    }

    function deleteItem(id) {

        console.log("删除对象", id);

        var that = this;
        var name = that.name;
        return that.$http({
            url: that.httpBaseUrl + '/' + name + '/dels/' + id.toString(),
            method: 'DELETE',
            header: {
                'Authorization': 'Basic fdfwoeigjiewoe',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
                //            params: {ids: '[' + id.toString() + ']'}
        });
    }

    function changeColumns(_mapping, array) {
        var _rs = [];
        var _obj = {};

        if (!_.isUndefined(array) && !_.isArray(array)) {
            _.forEach(array, function(n, k) {
                if (!_.isUndefined(_mapping[k])) {
                    _obj[_mapping[k]] = n;
                }
            });
            return _obj;
        } else {
            _.forEach(array, function(item) {
                _obj = {};
                _.forEach(item, function(n, k) {
                    if (!_.isUndefined(_mapping[k])) {
                        _obj[_mapping[k]] = n;
                    }
                });

                _rs.push(_obj);
            });

            return _rs;
        }
    }


    return BaseService;
});