import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import $ from 'jquery';
import {UserData} from 'userdata';

@inject(UserData, HttpClient)
export class PersonalInfo {
    constructor(userData, http) {
        this.userData = userData;

        this.httpClient = http;

        this.weightInput = "";
        this.heightInput = "";

        this.showCounties = false;
        this.showBMI = false;


        this.showCountiesSpouse = false
        this.showBMISpouse = false;

        this.marriedOptions = ['Yes', 'No'];


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
    }

    enteredMarried() {
        console.log("ahhh");
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
        console.log(this.userData.client.data.counties);
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


    // SPOUSE --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    enteredStateSpouse() {
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
    enteredCountySpouse(){
        console.log(this.userData.client.data.counties);
    }

    enteredHeightSpouse() {
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

    enteredWeightSpouse() {
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
}