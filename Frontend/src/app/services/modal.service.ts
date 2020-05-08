import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    show = false;
    type: string;
    data: string;

    constructor() { }
    showModal(type, data) {
        this.type = type;
        this.data = data;
        this.show = true;
    }
    hideModal() {
        this.show = false;
    }

    getShow() {
        return this.show;
    }

    getType() {
        return this.type;
    }

    getData() {
        return this.data;
    }
}
