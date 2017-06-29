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

}