import {singleton} from 'aurelia-framework';

@singleton()
export class User {
    constructor() {
        this.state = "";
        this.county = "";
        
        this.smokes = false;
       
        this.weight = 0; //in lbs
        
        this.feet = 0;
        this.inches = 0;
        this.height = 0; //in inches


    }
}