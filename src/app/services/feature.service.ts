import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
	providedIn: 'root'
})
export class FeatureService {

	private URL: string;

	constructor(private http: HttpClient, private globals: Globals) {
		this.URL = globals.server_url + 'features/';
	}


	getFeatures() {
		return this.http.get<any>(this.URL);
	}

}
