import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class ObjectService {
	constructor(http: Http) {
		this.http = http;
		this.object_call = http.get('http://duffeytech.com/objectmanager/getSomeObjects')
			.map(res => res.json());
	}
	getObjects = function() {
		return this._objects;
	}
	getObjectsAutocomplete = (request) => {
		return this.object_call.map(item => item.filter(el => el.ObjectName.indexOf(request.term) > -1).map(el => {
			return {label: el.ObjectName, value: el.ObjectID};
		}));
	}
	getObjectsFromServer = (fragment) => {
		return this.http.get('http://duffeytech.com/objectmanager/get_objects_from_string?fragment=' + fragment)
			.map(res => res.json())
			.map(item => item.map(el => {
				return {label: el.ObjectName, value: el.ObjectID};
			}));
	}
	getObjectsWithTags = (tags) => {
		return this.http.get('http://duffeytech.com/objectmanager/get_objects_with_tags?linked_objects=' + encodeURI(tags))
			.map(res => res.json());
	}
	getObjectsWithIDs = (IDs) => {
		return this.http.get('http://duffeytech.com/objectmanager/get_objects_from_ids?ids=' + encodeURI(IDs))
			.map(res => res.json());
	}
	initializeController = (TagIDs) => {
		return this.http.get('http://duffeytech.com/objectmanager/initialize_controller?ids=' + encodeURI(TagIDs))
			.map(res => res.json());
	}
	saveObject = (object) => {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		
		return this.http.post('http://duffeytech.com/objectmanager/update_object', JSON.stringify(object), options);
	}
	linkObjects = (tags, linked_object) => {
		if(linked_object.value === -1) {
			let headers = new Headers({'Content-Type': 'application/json'});
			let options = new RequestOptions({ headers: headers });
		
			var data = {
				ObjectName:			linked_object.name,
				ObjectClass:		linked_object.class,
				ObjectRank:			linked_object.rank,
				tags:						tags
			};
			return this.http.post('http://duffeytech.com/objectmanager/ng_add_and_link_objects', JSON.stringify(data), options)
				.map(res => res.json());
		} else {
			return this.http.get('http://duffeytech.com/objectmanager/ng_link_object?tags=' + tags + "&linked_object=" + linked_object.value)
				.map(res => res.json());
		}
	}
	deleteObject = (id) => {
		return this.http.get('http://duffeytech.com/objectmanager/ng_delete_object?id=' + encodeURI(id))
			.map(res => res.json());
	}
	createObject = (object) => {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});

		return this.http.post('http://duffeytech.com/objectmanager/ng_add_object', JSON.stringify(object), options)
			.map(res => res.json());
	}
	updateObjectRank = (order_array) => {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});

		return this.http.post('http://duffeytech.com/objectmanager/ng_update_object_object_order', JSON.stringify(order_array), options);
	}
	removeLinks = (link, links, tags) => {
		return this.http.get('http://duffeytech.com/objectmanager/ng_remove_links?link=' + encodeURI(link) + "&links=" + encodeURI(links) + "&tags=" + encodeURI(tags))
			.map(res => res.json());
	}
}