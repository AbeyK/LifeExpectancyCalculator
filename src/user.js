import {singleton} from 'aurelia-framework';

@singleton()
export class User {
    constructor() {
        this.state = "";
        this.county = "";
        
        this.smokes = false;
       
        this.weight = 0; //in lbs
        
        this.bmi = 0;


    }

    calculateBMI(heightInput, weightInput) {
        var weightLbs = parseInt(weightInput);
        var heightIn = parseInt(heightInput.split("'")[0]) * 12 + parseInt(heightInput.split("'")[1]);
        this.bmi = weightLbs * 0.45 / ( (heightIn * 0.025) * (heightIn * 0.025) );
        this.bmi = this.bmi.toFixed(1);
    }
}