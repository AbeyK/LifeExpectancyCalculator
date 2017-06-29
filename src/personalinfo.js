import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import $ from 'jquery';
import {User} from 'user';


@inject(User, HttpClient)
export class PersonalInfo {
    constructor(user, http, data) {
        this.user = user;
        this.data = data;
        this.blah = "";
        this.httpClient = http;

        var countyLifeExp = [];

        var states = []
        var countyInState = []
        var count=1;
        for (var i = 0; i < countyLifeExp.length; i++) {
            if (countyLifeExp[i][0].split(",").length===1) {
                states.push(countyLifeExp[i]);
                count++;
            }
        }
        console.log(states);

        this.states = ["hello", "hi"];
        this.state = "testing";

        this.handleBodyClick = e => {
            console.log("ahh" + e.target);
        };
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
        document.getElementById("fname").onblur = function () { console.log("hello world") };
    }

    detached() {
        document.removeEventListener('click', this.handleBodyClick);
    }

    beatUpNerds(f) {
        
    }
}