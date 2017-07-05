import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import $ from 'jquery';
import {UserData} from 'userdata';

@inject(UserData, HttpClient)
export class PersonalInfo {
    constructor(userData, http) {
        this.userData = userData;

        this.httpClient = http;

        this.showCounties = false;
        this.showBMI = false;


        this.showCountiesSpouse = false
        this.showBMISpouse = false;

        this.marriedOptions = ['Yes', 'No'];

        this.genders = ['Male', 'Female'];

        this.races = ["White American", "Black or African American", "Native American and Alaska Native", "Asian American", "Native Hawaiian and Other Pacific Islander"];

        this.educations = ["Some High School", "High School", "Some College", "College"];


    }

    printStuff()
    {
        console.log(this.state);
    }

    stuff() {
        // console.log("ahhhhhhhhhhhhh");

        //     this.httpClient.fetch('https://maps.googleapis.com/maps/api/geocode/json?address=23314&key=AIzaSyBM9-m7L5132H_bDe3JUn9tlwblTARBRbQ')
        //   .then(response => response.json())
        //   .then(data => {
        //      console.log(data);
        //   });

        //     this.httpClient.fetch('https://maps.googleapis.com/maps/api/geocode/json?address=23314&key=AIzaSyBM9-m7L5132H_bDe3JUn9tlwblTARBRbQ')
        //   .then(response => response.json())
        //   .then(data => {
        //      console.log(data.results[0]);
        //   });

        //   this.httpClient.fetch('https://maps.googleapis.com/maps/api/geocode/json?address=23139&key=AIzaSyBM9-m7L5132H_bDe3JUn9tlwblTARBRbQ')
        //   .then(response => response.json())
        //   .then(data => {
        //      console.log(data.results[0].address_components[3].short_name);
        //   });

        //   this.httpClient.fetch('https://maps.googleapis.com/maps/api/geocode/json?address=23139&key=AIzaSyBM9-m7L5132H_bDe3JUn9tlwblTARBRbQ')
        //   .then(response => response.json())
        //   .then(data => {
        //      console.log(data);
        //   });
    }



    attached() {
    }

    detached() {
    }

    enteredAge() {
        if (this.userData.client.age < 0 || this.userData.client.age > 123)
            alert("Enter a valid age");
    }

    enteredGender() {
        if (this.userData.client.gender == "")
            alert("Please select a valid sex");
    }

    enteredRace() {
        if (this.userData.client.race == "")
            alert("Please select a valid race");
    }

    enteredMarried(married) {
        if (married == 1)
            this.userData.client.married = true;
        else
            this.userData.client.married = false;
    }

    enteredState() {
        if (this.userData.client.state != "")
        {
            // this.data.counties.length = 0; //clear array NO memory leaks
            this.userData.client.data.counties = [];

            for(var i =0; i<this.userData.client.data.countyLifeExp.length; i++){
                if(this.userData.client.data.countyLifeExp[i][0].split(",").length === 2 && this.userData.client.data.countyLifeExp[i][0].split(",")[1].trim()===this.userData.client.state){
                    this.userData.client.data.counties.push(this.userData.client.data.countyLifeExp[i]);
                }
            }
            this.showCounties = true;
        }
        else
            this.showCounties = false;
    }
    enteredCounty(){
        if(this.userData.client.sex!="" && this.userData.client.county!=undefined && this.userData.client.county!=""){
            if(this.userData.client.gender==="Male"){
                this.userData.client.projectedAge = this.userData.client.county.split(",")[2].split("(")[1];
            }
            else if (this.userData.client.gender==="Female"){
                this.userData.client.projectedAge = this.userData.client.county.split(",")[3].split(")")[0];
            }
        }
        
    }

    enteredHeight() {
        console.log("here it is: " + this.userData.client.heightInput)
        if ( /^\d'(\d|1[0-2])$/.test(this.userData.client.heightInput) )
        {
            if (this.userData.client.heightInput != "" && this.userData.client.weightInput != "")   // if user entered both weight and height, calculate BMI and show it
            {
                this.userData.client.calculateBMI(this.userData.client.heightInput, this.userData.client.weightInput);
                this.showBMI = true;
            }
        }
        else
        {
            this.userData.client.heightInput = "";
            this.showBMI = false;
            alert("Please enter a properly formatted height, e.g.:  5'10");
        }
    }

    enteredWeight() {
        if ( /^\d+$/.test(this.userData.client.weightInput) )
        {
            if (this.userData.client.heightInput != "" && this.userData.client.weightInput != "")   // if user entered both weight and height, calculate BMI and show
            {
                this.userData.client.calculateBMI(this.userData.client.heightInput, this.userData.client.weightInput);
                this.showBMI = true;
            }
        }
        else
        {
            this.userData.client.weightInput = "";
            this.showBMI = false;
            alert("Please enter a valid weight in lbs.");
        }
    }

    setDiabetic(diabetic) {
        this.userData.client.diabetic = diabetic;
        if(diabetic===1){
            if(this.userData.client.gender==="Male"){
                this.userData.client.diabeticOffset=Math.max(-0.8791*this.userData.client.age+13.087,0);
            }
            else if(this.userData.client.gender==="Female"){
                this.userData.client.diabeticOffset=Math.max(-0.8121*this.userData.client.age+14.385,0);
            }
        }
        else if(diabetic==2){
            if(this.userData.client.gender==="Male"){
               if(this.userData.client.race=="White American"){
                this.userData.client.diabeticOffset=Math.max(-0.4333*this.userData.client.age+5.6667,0);

               }
               else if(this.userData.client.race=="Asian American"){
                this.userData.client.diabeticOffset=Math.max(-0.2*this.userData.client.age+1.2111,0);

               }
               else if(this.userData.client.race=="Black or African American"){
                this.userData.client.diabeticOffset=Math.max(-0.385*this.userData.client.age+2.8361,0);

               }
               else{
                this.userData.client.diabeticOffset=Math.max(-0.3217*this.userData.client.age+5.4306,0);

               }
            }else if(this.userData.client.gender==="Female"){
               if(this.userData.client.race=="White American"){
                this.userData.client.diabeticOffset=Math.max(-0.4867*this.userData.client.age+7.3778,0);

               }
               else if(this.userData.client.race=="Asian American"){
                this.userData.client.diabeticOffset=Math.max(-0.195*this.userData.client.age+0.875,0);

               }
               else if(this.userData.client.race=="Black or African American"){
                this.userData.client.diabeticOffset=Math.max(-0.1567*this.userData.client.age+1.85,0);

               }
               else{
                this.userData.client.diabeticOffset=Math.max(-0.4517*this.userData.client.age+6.7472,0);

               }
            }
        }
        else{
            this.userData.client.diabeticOffset=0;
        }
        console.log(this.userData.client.diabeticOffset);
    }
    setSmoking(num){
            var smokingOffsetArray = [4.3,2.1,5.8,8.8]
            this.userData.client.smokingOffset=smokingOffsetArray[num];
            console.log(this.userData.client.smokingOffset);
    }
    enteredEducation() {
        if (this.userData.client.education == "")
            alert("Please select a valid education");
    }

    submit() {
        if (this.userData.client.age == "") {
            alert("Please enter a valid age");
            return;
        }
        else if (this.userData.client.gender == "") {
            alert("Please enter your sex");
            return;
        }
        else if (this.userData.client.race == "") {
            alert("Please enter your race");
            return;
        }
        else if (this.userData.client.state == "") {
            alert("Please enter your State");
            return;
        }
        else if (this.userData.client.county == "") {
            alert("Please enter your County");
            return;
        }
        else if (this.userData.client.heightInput == "") {
            alert("Please enter your height");
            return;
        }
        else if (this.userData.client.weightInput == "") {
            alert("Please enter your weight");
            return;
        }
        else if (this.userData.client.diabetic == "") {
            alert("Please enter your diabetic status")
            return;
        }

        if (this.userData.client.married) {
            if (this.userData.spouse.age == "") {
                alert("Please enter your spouse's age");
                return;
            }
            else if (this.userData.spouse.gender == "") {
                alert("Please enter your spouse's sex");
                return;
            }
            else if (this.userData.spouse.race == "") {
                alert("Please enter your spouse's race");
                return;
            }
            else if (this.userData.spouse.state == "") {
                alert("Please enter your spouse's State");
                return;
            }
            else if (this.userData.spouse.county == "") {
                alert("Please enter your spouse's County");
                return;
            }
            else if (this.userData.spouse.heightInput == "") {
                alert("Please enter your spouse's height");
                return;
            }
            else if (this.userData.spouse.weightInput == "") {
                alert("Please enter your spouse's weight");
                return;
            }
            else if (this.userData.spouse.diabetic == "") {
                alert("Please enter your spouse's diabetic status")
                return;
            }
        }



    }

    // SPOUSE --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    enteredAgeSpouse() {
        if (this.userData.spouse.age < 0 || this.userData.spouse.age > 123)
            alert("Enter a valid age");
    }

    enteredGenderSpouse() {
        if (this.userData.spouse.gender == "")
            alert("Please select a valid sex");
    }

    enteredRaceSpouse() {
        if (this.userData.spouse.race == "")
            alert("Please select a valid race");
    }

    enteredStateSpouse() {
        if (this.userData.spouse.state != "")
        {
            // this.data.counties.length = 0; //clear array NO memory leaks
            this.userData.spouse.data.counties = [];

            for(var i =0; i<this.userData.spouse.data.countyLifeExp.length; i++){
                if(this.userData.spouse.data.countyLifeExp[i][0].split(",").length === 2 && this.userData.spouse.data.countyLifeExp[i][0].split(",")[1].trim()===this.userData.spouse.state){
                    this.userData.spouse.data.counties.push(this.userData.spouse.data.countyLifeExp[i]);
                }
            }
            this.showCountiesSpouse = true;
        }
        else
            this.showCountiesSpouse = false;
    }
    enteredCountySpouse(){
        console.log(this.userData.spouse.data.counties);
    }

    enteredHeightSpouse() {
        console.log("here it is: " + this.userData.spouse.heightInput)
        if ( /^\d'(\d|1[0-2])$/.test(this.userData.spouse.heightInput) )
        {
            if (this.userData.spouse.heightInput != "" && this.userData.spouse.weightInput != "")   // if user entered both weight and height, calculate BMI and show it
            {
                this.userData.spouse.calculateBMI(this.userData.spouse.heightInput, this.userData.spouse.weightInput);
                this.showBMISpouse = true;
            }
        }
        else
        {
            this.userData.spouse.heightInput = "";
            this.showBMISpouse = false;
            alert("Please enter a properly formatted height, e.g.:  5'10");
        }
    }

    enteredWeightSpouse() {
        if ( /^\d+$/.test(this.userData.spouse.weightInput) )
        {
            if (this.userData.spouse.heightInput != "" && this.userData.spouse.weightInput != "")   // if user entered both weight and height, calculate BMI and show it
            {
                this.userData.spouse.calculateBMI(this.userData.spouse.heightInput, this.userData.spouse.weightInput);
                this.showBMISpouse = true;
            }
        }
        else
        {
            this.userData.spouse.weightInput = "";
            this.showBMISpouse = false;
            alert("Please enter a valid weight in lbs.");
        }
    }

    setDiabeticSpouse(diabetic) {
        this.userData.spouse.diabetic = diabetic;
    }

    enteredEducationSpouse() {
        if (this.userData.spouse.education == "")
            alert("Please select a valid education");
    }
}