import {Data} from 'data';

export class User {
    constructor() {
        this.projectedAge=1000;
        this.adjustedAge = this.age;
        
        this.gender = "Male";

        this.age = "";

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

        this.diabetic="";
        this.diabeticOffset = "";
        this.smokingOffset = "";

        this.smokingStatus = "";

        this.education = "";

        this.exerciseLevel = "";

        this.profession = "";
        this.professionOffset = "";

        this.cholesterol = "";
        this.cholesterolOffset = "";

        this.raceOffset = "";

        this.income = "";
        this.incomeOffset = "";
    }

    calculateBaseFromCounty() {
        // do nothing, placeholder. calculation already done in personalinfo.js
    }

    calculateRaceOffset() {
        for(var i =0; i<this.data.race_offset_list.length; i++){
            if(this.data.race_offset_list[i][0]===this.age){
                if(this.gender=="Male"){
                    if(this.race==="White American"){
                        this.raceOffset = parseInt(this.data.race_offset_list[i][1]);
                        return;
                    }
                    else if(this.race==="Black or African American"){
                        this.raceOffset = parseInt(this.data.race_offset_list[i][3]);
                        return;

                    }
                    else if(this.race==="Hispanic"){
                        this.raceOffset = parseInt(this.data.race_offset_list[i][5]);
                        return;

                    }
                    else{
                        this.raceOffset = 0;
                        return;
                    }
                }
                else if(this.gender=="Female"){
                    if(this.race==="White American"){
                        this.raceOffset = parseInt(this.data.race_offset_list[i][2]);
                        return;
                    }
                    else if(this.race==="Black or African American"){
                        this.raceOffset = parseInt(this.data.race_offset_list[i][4]);
                        return;

                    }
                    else if(this.race==="Hispanic"){
                        this.raceOffset = parseInt(this.data.race_offset_list[i][6]);
                        return;

                    }
                    else{
                        this.raceOffset = 0;
                        return;
                    }
                }
                else{
                    this.raceOffset = 0;
                    return;
                }
            }
        }
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

    calculateDiabeticOffset() {
        //do nothing, placeholder, calc done in personalinfo.js
    }

    calculateEducationOffset(gender, education) {
        var arrOffset = gender == "Male" ? 0 : 4;

        switch (education) {
            case "Some High School": this.educationOffset = this.data.educationExpecs[this.age - 1][arrOffset + 1]; return;
            case "Some High School": this.educationOffset = this.data.educationExpecs[this.age - 1][arrOffset + 2]; return;
            case "Some High School": this.educationOffset = this.data.educationExpecs[this.age - 1][arrOffset + 3]; return;
            default:                 this.educationOffset = this.data.educationExpecs[this.age - 1][arrOffset + 4]; return;
        }
    }

    calculateSmokingOffset() {
        //do nothing, placeholder, calc done in personalinfo.js
    }

    calculateExerciseOffset(smokingStatus, exerciseLevel) {
        if (smokingStatus == "Never") {
            if (exerciseLevel == "None")
                this.exerciseOffset = 0;
            else if (exerciseLevel == "Some")
                this.exerciseOffset = 1.6;
            else if (exerciseLevel == "Moderate")
                this.exerciseOffset = 2.6;
            else
                this.exerciseOffset = 3.25;
        }
        else if (smokingStatus == "Former") {
            if (exerciseLevel == "None")
                this.exerciseOffset = 0;
            else if (exerciseLevel == "Some")
                this.exerciseOffset = 2.2;
            else if (exerciseLevel == "Moderate")
                this.exerciseOffset = 3.45;
            else
                this.exerciseOffset = 5.25;
        }
        else {
            if (exerciseLevel == "None")
                this.exerciseOffset = 0;
            else if (exerciseLevel == "Some")
                this.exerciseOffset = 1.6;
            else if (exerciseLevel == "Moderate")
                this.exerciseOffset = 2.6;
            else
                this.exerciseOffset = 3.25;
        }
    }

    calculateProfessionOffset (age, profession) {
        switch (profession) {
            case "Professional":           this.professionOffset = this.data.professionExpecs[age - 1][1]; return;
            case "Clerical":               this.professionOffset = this.data.professionExpecs[age - 1][2]; return;
            case "Other & Manual Labor":     this.professionOffset = this.data.professionExpecs[age - 1][3]; return;
            default:                       this.professionOffset = this.data.professionExpecs[age - 1][4]; return;
        }
    }

    calculateCholesterolOffset (age, cholesterol) {
        switch (cholesterol) {
            case 1:     this.cholesterolOffset = this.data.cholesterolExpecs[age - 1][1];console.log(this.cholesterolOffset); console.log(this.data.cholesterolExpecs[age - 1][1]); return;
            case 2:     this.cholesterolOffset = this.data.cholesterolExpecs[age - 1][2];console.log(this.cholesterolOffset); console.log(this.data.cholesterolExpecs[age - 1][1]);return;
            case 3:     this.cholesterolOffset = this.data.cholesterolExpecs[age - 1][3];console.log(this.cholesterolOffset); console.log(this.data.cholesterolExpecs[age - 1][1]);return;
            case 4:     this.cholesterolOffset = this.data.cholesterolExpecs[age - 1][4]; console.log(this.cholesterolOffset);console.log(this.data.cholesterolExpecs[age - 1][1]);return;
            default:    this.cholesterolOffset = this.data.cholesterolExpecs[age - 1][5]; console.log(this.cholesterolOffset);console.log(this.data.cholesterolExpecs[age - 1][1]);return;
        }
    }

    calculateIncomeOffset(gender, age, income) {
        income = parseInt(income);

        if (gender === "Male") {
            if (income < 22800)
                this.incomeOffset = this.data.maleIncomeOffsets[age - 1][1];
            else if (22800 <= income && income < 43511)
                this.incomeOffset = this.data.maleIncomeOffsets[age - 1][2];
            else if (43511 <= income && income < 72001)
                this.incomeOffset = this.data.maleIncomeOffsets[age - 1][3];
            else if (72001 <= income && income < 112262)
                this.incomeOffset = this.data.maleIncomeOffsets[age - 1][4];
            else
                this.incomeOffset = this.data.maleIncomeOffsets[age - 1][5];
        }
        else {
            if (income < 22800)
                this.incomeOffset = this.data.femaleIncomeOffsets[age - 1][1];
            else if (22800 <= income && income < 43511)
                this.incomeOffset = this.data.femaleIncomeOffsets[age - 1][2];
            else if (43511 <= income && income < 72001)
                this.incomeOffset = this.data.femaleIncomeOffsets[age - 1][3];
            else if (72001 <= income && income < 112262)
                this.incomeOffset = this.data.femaleIncomeOffsets[age - 1][4];
            else
                this.incomeOffset = this.data.femaleIncomeOffsets[age - 1][5];
        }
    }

}