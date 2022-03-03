import * as THREE from 'three';

export default class Home {
    constructor({parent} = {}) {
        this.parent = parent

        this.init();
    }

    init() {
        console.log('Home init');
    }
}