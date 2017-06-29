import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import $ from 'jquery';
import {User} from 'user';
import {Data} from './data';


@inject(User, HttpClient, Data)
export class PersonalInfo {
    constructor(user, http, data) {
        this.user = user;
        this.data = data;
        this.blah = "";
        this.httpClient = http;
        this.handleBodyClick = e => {
            console.log("ahh" + e.target);
        };

        this.showCounties = false;
        this.showBMI = false;

        this.weightInput = "";
        this.heightInput = "";
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

    showCounty() {
        if (this.data.selectedState != "")
        {
            // this.data.counties.length = 0; //clear array NO memory leaks
            this.data.counties = [];

            this.data.countyLifeExp
            for(var i =0; i<this.data.countyLifeExp.length; i++){
                if(this.data.countyLifeExp[i][0].split(",").length === 2 && this.data.countyLifeExp[i][0].split(",")[1].trim()===this.data.selectedState){
                    this.data.counties.push(this.data.countyLifeExp[i]);
                }
            }
            this.showCounties = true;
        }
        else
            this.showCounties = false;
    }
    lol(){
        console.log(this.data.selectedCounty);
    }

    enteredHeight() {
        if ( /^\d'(\d|1[0-2])$/.test(this.heightInput) )
        {
            if (this.heightInput != "" && this.weightInput != "")   // if user entered both weight and height, calculate BMI and show it
            {
                this.user.calculateBMI(this.heightInput, this.weightInput);
                this.showBMI = true;
            }
        }
        else
        {
            this.heightInput = "";
            this.showBMI = false;
            alert("Please enter a properly formatted height, e.g.:  5'10");
        }
    }

    enteredWeight() {
        if ( /^\d+$/.test(this.weightInput) )
        {
            if (this.heightInput != "" && this.weightInput != "")   // if user entered both weight and height, calculate BMI and show
            {
                this.user.calculateBMI(this.heightInput, this.weightInput);
                this.showBMI = true;
            }
        }
        else
        {
            this.weightInput = "";
            this.showBMI = false;
            alert("Please enter a valid weight in lbs.");
        }
    }

    calculateBMI(heightInput, weightInput) {
        var weightLbs = parseInt(weightInput);
        var heightIn = parseInt(heightInput.split("'")[0]) * 12 + parseInt(heightInput.split("'")[1]);
        this.bmi = weightLbs * 0.45 / ( (heightIn * 0.025) * (heightIn * 0.025) );
    }

}