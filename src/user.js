import {Data} from 'data';

export class User {
    constructor() {
        this.projectedAge=1000;
        
        this.gender = "";

        this.age = 0;

        this.race = "";

        this.state = "";
        this.county = "";
        
        this.smokes = false;
       
        this.weight = 0; //in lbs
        
        this.weightInput = "";
        this.heightInput = "";
        this.bmi = 0;
        this.bmiCatagory = "";
        this.hale = 0;

        this.data = new Data();

        this.showCounties = false;
        this.showBMI = false;

        this.married = false;

        this.diabetic=0;

    }

    calculateBMI(heightInput, weightInput) {
        var weightLbs = parseInt(weightInput);
        var heightIn = parseInt(heightInput.split("'")[0]) * 12 + parseInt(heightInput.split("'")[1]);

        this.bmi = weightLbs * 0.45 / ( (heightIn * 0.025) * (heightIn * 0.025) );
        this.bmi = this.bmi.toFixed(1);

        if (this.bmi < 18.5)
            this.gender === "Male" ? this.hale = -9 : this.hale = -5.9; //this.bmiCatagory = "underweight";
        else if (this.bmi <=18.5 && this.bmi < 25)
            this.hale = 0; //this.bmiCatagory = "normal weight";
        else if (this.bmi <= 25 && this.bmi < 30)
            this.gender === "Male" ? this.hale = 2.9 : this.hale = 1.5; //this.bmiCatagory = "overweight";
        else if (this.bmi <= 30 && this.bmi < 35)
            this.gender === "Male" ? this.hale = 0.4 : this.hale = -2.7; //this.bmiCatagory = "obese 1";
        else // this.bmi >= 35
            this.gender === "Male" ? this.hale = -6.2 : this.hale = -10; //this.bmiCatagory = "obese 2";

    }
}