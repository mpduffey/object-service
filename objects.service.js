"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var ObjectService = (function () {
    function ObjectService(http) {
        var _this = this;
        this.getObjects = function () {
            return this._objects;
        };
        this.getObjectsAutocomplete = function (request) {
            return _this.object_call.map(function (item) { return item.filter(function (el) { return el.ObjectName.indexOf(request.term) > -1; }).map(function (el) {
                return { label: el.ObjectName, value: el.ObjectID };
            }); });
        };
        this.getObjectsFromServer = function (fragment) {
            return _this.http.get('http://duffeytech.com/objectmanager/get_objects_from_string?fragment=' + fragment)
                .map(function (res) { return res.json(); })
                .map(function (item) { return item.map(function (el) {
                return { label: el.ObjectName, value: el.ObjectID };
            }); });
        };
        this.getObjectsWithTags = function (tags) {
            return _this.http.get('http://duffeytech.com/objectmanager/get_objects_with_tags?linked_objects=' + encodeURI(tags))
                .map(function (res) { return res.json(); });
        };
        this.getObjectsWithIDs = function (IDs) {
            return _this.http.get('http://duffeytech.com/objectmanager/get_objects_from_ids?ids=' + encodeURI(IDs))
                .map(function (res) { return res.json(); });
        };
        this.initializeController = function (TagIDs) {
            return _this.http.get('http://duffeytech.com/objectmanager/initialize_controller?ids=' + encodeURI(TagIDs))
                .map(function (res) { return res.json(); });
        };
        this.saveObject = function (object) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            return _this.http.post('http://duffeytech.com/objectmanager/update_object', JSON.stringify(object), options);
        };
        this.linkObjects = function (tags, linked_object) {
            if (linked_object.value === -1) {
                var headers = new Headers({ 'Content-Type': 'application/json' });
                var options = new http_1.RequestOptions({ headers: headers });
                var data = {
                    ObjectName: linked_object.name,
                    ObjectClass: linked_object.class,
                    ObjectRank: linked_object.rank,
                    tags: tags
                };
                return _this.http.post('http://duffeytech.com/objectmanager/ng_add_and_link_objects', JSON.stringify(data), options)
                    .map(function (res) { return res.json(); });
            }
            else {
                return _this.http.get('http://duffeytech.com/objectmanager/ng_link_object?tags=' + tags + "&linked_object=" + linked_object.value)
                    .map(function (res) { return res.json(); });
            }
        };
        this.deleteObject = function (id) {
            return _this.http.get('http://duffeytech.com/objectmanager/ng_delete_object?id=' + encodeURI(id))
                .map(function (res) { return res.json(); });
        };
        this.createObject = function (object) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            return _this.http.post('http://duffeytech.com/objectmanager/ng_add_object', JSON.stringify(object), options)
                .map(function (res) { return res.json(); });
        };
        this.updateObjectRank = function (order_array) {
            var headers = new Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            return _this.http.post('http://duffeytech.com/objectmanager/ng_update_object_object_order', JSON.stringify(order_array), options);
        };
        this.removeLinks = function (link, links, tags) {
            return _this.http.get('http://duffeytech.com/objectmanager/ng_remove_links?link=' + encodeURI(link) + "&links=" + encodeURI(links) + "&tags=" + encodeURI(tags))
                .map(function (res) { return res.json(); });
        };
        this.http = http;
        this.object_call = http.get('http://duffeytech.com/objectmanager/getSomeObjects')
            .map(function (res) { return res.json(); });
    }
    ObjectService = __decorate([
        core_1.Injectable({}), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ObjectService);
    return ObjectService;
}());
exports.ObjectService = ObjectService;
//# sourceMappingURL=objects.service.js.map