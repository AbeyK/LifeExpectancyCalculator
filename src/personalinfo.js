import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class PersonalInfo {
    constructor(http) {
        this.blah = "";
        this.httpClient = http;

        this.handleBodyClick = e => {
            console.log("ahh" + e.target);
        };
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

      this.httpClient.fetch('https://maps.googleapis.com/maps/api/geocode/json?address=23139&key=AIzaSyBM9-m7L5132H_bDe3JUn9tlwblTARBRbQ')
      .then(response => response.json())
      .then(data => {
         console.log(data);
      });
    }

    attached() {
        document.getElementById("fname").onblur = function() {console.log("hello world")};
    }

     detached() {
        document.removeEventListener('click', this.handleBodyClick);
    }   
}