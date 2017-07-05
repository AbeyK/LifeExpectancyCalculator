import {singleton} from 'aurelia-framework';
import {User} from 'user';
import {Calculations} from 'calculations';

@singleton()
export class UserData {
    constructor() {
        this.client = new User();
        this.spouse = new User();
        this.calculations = new Calculations();
    }
}