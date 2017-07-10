import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import $ from 'jquery';
import { UserData } from 'userdata';
import { Router } from 'aurelia-router';

@inject(UserData, Router)
export class PersonalInfo {
    constructor(userData, router) {
        this.userData = userData;

        this.router = router;

        this.showCounties = false;
        this.showBMI = false;


        this.showCountiesSpouse = false
        this.showBMISpouse = false;

        this.marriedOptions = ['Yes', 'No'];

        this.genders = ['Male', 'Female'];

        this.races = ["White American", "Black or African American", "Native American and Alaska Native", "Asian American", "Native Hawaiian and Other Pacific Islander", "Hispanic"];

        this.educations = ["Some High School", "High School", "Some College", "College"];

        this.professions = ["Clerical", "Professional", "Executive", "Other & Manual Labor"];

        this.smokingOptions = ["Never Smoked", "Quit Smoking", "1-10 cigarettes a day", "11-20 cigarettes a day", "21-30 cigarettes a day", "31+ cigarettes a day"];
    }

    printStuff() {
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
        this.userData.client.age = parseInt(this.userData.client.age);
        console.log("Age is below");
        console.log(this.userData.client.age);
    }

    enteredGender() {
        this.userData.client.gender = this.userData.client.gender == "Male" ? "Female" : "Male";
    }

    enteredRace() {
        if (this.userData.client.race == "")
            alert("Please select a race");
    }

    enteredMarried() {
        this.userData.client.married = !this.userData.client.married;
    }

    enteredState() {
        if (this.userData.client.state != "") {
            // this.data.counties.length = 0; //clear array NO memory leaks
            this.userData.client.data.counties = [];

            for (var i = 0; i < this.userData.client.data.countyLifeExp.length; i++) {
                if (this.userData.client.data.countyLifeExp[i][0].split(",").length === 2 && this.userData.client.data.countyLifeExp[i][0].split(",")[1].trim() === this.userData.client.state) {
                    this.userData.client.data.counties.push(this.userData.client.data.countyLifeExp[i]);
                }
            }
            this.showCounties = true;
        }
        else
            this.showCounties = false;
    }
    enteredCounty() {
        if (this.userData.client.sex != "" && this.userData.client.county != undefined && this.userData.client.county != "") {
            if (this.userData.client.gender === "Male") {
                this.userData.client.projectedAge = this.userData.client.county.split(",")[2].split("(")[1];
            }
            else if (this.userData.client.gender === "Female") {
                this.userData.client.projectedAge = this.userData.client.county.split(",")[3].split(")")[0];
            }
        }

    }

    enteredHeight() {
        console.log("here it is: " + this.userData.client.heightInput)
        if (/^\d'(\d|1[0-2])$/.test(this.userData.client.heightInput)) {
            if (this.userData.client.heightInput != "" && this.userData.client.weightInput != "")   // if user entered both weight and height, calculate BMI and show it
            {
                this.userData.client.calculateBMI(this.userData.client.heightInput, this.userData.client.weightInput);
                this.showBMI = true;
            }
        }
        else {
            this.userData.client.heightInput = "";
            this.showBMI = false;
            alert("Please enter a properly formatted height, e.g.:  5'10");
        }
    }

    enteredWeight() {
        if (/^\d+$/.test(this.userData.client.weightInput)) {
            if (this.userData.client.heightInput != "" && this.userData.client.weightInput != "")   // if user entered both weight and height, calculate BMI and show
            {
                this.userData.client.calculateBMI(this.userData.client.heightInput, this.userData.client.weightInput);
                this.showBMI = true;
            }
        }
        else {
            this.userData.client.weightInput = "";
            this.showBMI = false;
            alert("Please enter a valid weight in lbs.");
        }
    }

    enteredDiabetic(diabetic) {
        this.userData.client.diabetic = diabetic;
        if (diabetic === 1) {
            if (this.userData.client.gender === "Male") {
                this.userData.client.diabeticOffset = 0-Math.max(-0.8791 * this.userData.client.age + 13.087, 0);
            }
            else if (this.userData.client.gender === "Female") {
                this.userData.client.diabeticOffset = 0-Math.max(-0.8121 * this.userData.client.age + 14.385, 0);
            }
        }
        else if (diabetic == 2) {
            if (this.userData.client.gender === "Male") {
                if (this.userData.client.race == "White American") {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.4333 * this.userData.client.age + 5.6667, 0);

                }
                else if (this.userData.client.race == "Asian American") {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.2 * this.userData.client.age + 1.2111, 0);

                }
                else if (this.userData.client.race == "Black or African American") {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.385 * this.userData.client.age + 2.8361, 0);

                }
                else {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.3217 * this.userData.client.age + 5.4306, 0);

                }
            } else if (this.userData.client.gender === "Female") {
                if (this.userData.client.race == "White American") {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.4867 * this.userData.client.age + 7.3778, 0);

                }
                else if (this.userData.client.race == "Asian American") {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.195 * this.userData.client.age + 0.875, 0);

                }
                else if (this.userData.client.race == "Black or African American") {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.1567 * this.userData.client.age + 1.85, 0);

                }
                else {
                    this.userData.client.diabeticOffset = 0-Math.max(-0.4517 * this.userData.client.age + 6.7472, 0);

                }
            }
        }
        else {
            this.userData.client.diabeticOffset = 0;
        }
        console.log(this.userData.client.diabeticOffset);
    }

    enteredSmoking() {
        if (this.userData.client.smokingStatus == "") {
            alert("Please select a smoking habit");
            return;
        }
        
        switch (this.userData.client.smokingStatus) {
            case "1-10 cigarettes a day": this.userData.client.smokingOffset = -4.3; return;
            case "11-20 cigarettes a day": this.userData.client.smokingOffset = -2.1; return;
            case "21-30 cigarettes a day": this.userData.client.smokingOffset = -5.8; return;
            case "31+ cigarettes a day": this.userData.client.smokingOffset = -8.8; return;
            default: this.userData.client.smokingOffset = 0;
        }
    }

    enteredEducation() {
        if (this.userData.client.education == "")
            alert("Please select a valid education");
    }

    enteredExercise(exerciseLevel) {
        this.userData.client.exerciseLevel = exerciseLevel;
    }

    enteredCholesterol(cholesterol) {
        this.userData.client.cholesterol = cholesterol;
    }

    // SPOUSE --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    enteredAgeSpouse() {
        if (this.userData.spouse.age < 0 || this.userData.spouse.age > 123)
            alert("Enter a valid age");
        this.userData.spouse.age = parseInt(this.userData.spouse.age);
    }

    enteredGenderSpouse() {
        this.userData.spouse.gender = this.userData.spouse.gender == "Male" ? "Female" : "Male";
    }

    enteredRaceSpouse() {
        if (this.userData.spouse.race == "")
            alert("Please select a race");
    }

    enteredStateSpouse() {
        if (this.userData.spouse.state != "") {
            // this.data.counties.length = 0; //clear array NO memory leaks
            this.userData.spouse.data.counties = [];

            for (var i = 0; i < this.userData.spouse.data.countyLifeExp.length; i++) {
                if (this.userData.spouse.data.countyLifeExp[i][0].split(",").length === 2 && this.userData.spouse.data.countyLifeExp[i][0].split(",")[1].trim() === this.userData.spouse.state) {
                    this.userData.spouse.data.counties.push(this.userData.spouse.data.countyLifeExp[i]);
                }
            }
            this.showCountiesSpouse = true;
        }
        else
            this.showCountiesSpouse = false;
    }
    enteredCountySpouse() {
        if (this.userData.spouse.sex != "" && this.userData.spouse.county != undefined && this.userData.spouse.county != "") {
            if (this.userData.spouse.gender === "Male") {
                this.userData.spouse.projectedAge = this.userData.spouse.county.split(",")[2].split("(")[1];
            }
            else if (this.userData.spouse.gender === "Female") {
                this.userData.spouse.projectedAge = this.userData.spouse.county.split(",")[3].split(")")[0];
            }
        }
    }

    enteredHeightSpouse() {
        console.log("here it is: " + this.userData.spouse.heightInput)
        if (/^\d'(\d|1[0-2])$/.test(this.userData.spouse.heightInput)) {
            if (this.userData.spouse.heightInput != "" && this.userData.spouse.weightInput != "")   // if user entered both weight and height, calculate BMI and show it
            {
                this.userData.spouse.calculateBMI(this.userData.spouse.heightInput, this.userData.spouse.weightInput);
                this.showBMISpouse = true;
            }
        }
        else {
            this.userData.spouse.heightInput = "";
            this.showBMISpouse = false;
            alert("Please enter a properly formatted height, e.g.:  5'10");
        }
    }

    enteredWeightSpouse() {
        if (/^\d+$/.test(this.userData.spouse.weightInput)) {
            if (this.userData.spouse.heightInput != "" && this.userData.spouse.weightInput != "")   // if user entered both weight and height, calculate BMI and show it
            {
                this.userData.spouse.calculateBMI(this.userData.spouse.heightInput, this.userData.spouse.weightInput);
                this.showBMISpouse = true;
            }
        }
        else {
            this.userData.spouse.weightInput = "";
            this.showBMISpouse = false;
            alert("Please enter a valid weight in lbs.");
        }
    }

    enteredDiabeticSpouse(diabetic) {
        this.userData.spouse.diabetic = diabetic;
        if (diabetic === 1) {
            if (this.userData.spouse.gender === "Male") {
                this.userData.spouse.diabeticOffset = 0-Math.max(-0.8791 * this.userData.spouse.age + 13.087, 0);
            }
            else if (this.userData.spouse.gender === "Female") {
                this.userData.spouse.diabeticOffset = 0-Math.max(-0.8121 * this.userData.spouse.age + 14.385, 0);
            }
        }
        else if (diabetic == 2) {
            if (this.userData.spouse.gender === "Male") {
                if (this.userData.spouse.race == "White American") {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.4333 * this.userData.spouse.age + 5.6667, 0);

                }
                else if (this.userData.spouse.race == "Asian American") {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.2 * this.userData.spouse.age + 1.2111, 0);

                }
                else if (this.userData.spouse.race == "Black or African American") {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.385 * this.userData.spouse.age + 2.8361, 0);

                }
                else {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.3217 * this.userData.spouse.age + 5.4306, 0);

                }
            } else if (this.userData.spouse.gender === "Female") {
                if (this.userData.spouse.race == "White American") {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.4867 * this.userData.spouse.age + 7.3778, 0);

                }
                else if (this.userData.spouse.race == "Asian American") {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.195 * this.userData.spouse.age + 0.875, 0);

                }
                else if (this.userData.spouse.race == "Black or African American") {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.1567 * this.userData.spouse.age + 1.85, 0);

                }
                else {
                    this.userData.spouse.diabeticOffset = 0-Math.max(-0.4517 * this.userData.spouse.age + 6.7472, 0);

                }
            }
        }
        else {
            this.userData.spouse.diabeticOffset = 0;
        }
        console.log(this.userData.spouse.diabeticOffset);
    }

    enteredSmokingSpouse() {
        if (this.userData.spouse.smokingStatus == "") {
            alert("Please select a smoking habit");
            return;
        }
        
        switch (this.userData.spouse.smokingStatus) {
            case "1-10 cigarettes a day": this.userData.spouse.smokingOffset = -4.3; return;
            case "11-20 cigarettes a day": this.userData.spouse.smokingOffset = -2.1; return;
            case "21-30 cigarettes a day": this.userData.spouse.smokingOffset = -5.8; return;
            case "31+ cigarettes a day": this.userData.spouse.smokingOffset = -8.8; return;
            default: this.userData.spouse.smokingOffset = 0;
        }
    }


    enteredEducationSpouse() {
        if (this.userData.spouse.education == "")
            alert("Please select a valid education");
    }

    enteredExerciseSpouse(exerciseLevel) {
        this.userData.spouse.exerciseLevel = exerciseLevel;
    }

    enteredCholesterolSpouse(cholesterol) {
        this.userData.spouse.cholesterol = cholesterol;
    }

    
    // SUBMIT --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    selfdestrcut() {
        alert("UH-OH ma$ter HACK30R CECELIA has HAck3d u");
        document.body.background = "meme.gif";

        var divsToHide = document.getElementsByClassName("hero"); //divsToHide is an array
        for (var i = 0; i < divsToHide.length; i++) {
            divsToHide[i].style.visibility = "hidden"; // or
            divsToHide[i].style.display = "none"; // depending on what you're doing
        }
        var Glitcher = (function () {
            function Glitcher(options) {
                this.canvas = document.createElement('canvas');
                this.context = this.canvas.getContext('2d');
                this.origCanvas = document.createElement('canvas');
                this.origContext = this.origCanvas.getContext('2d');
                this.options = options;
            }
            Glitcher.prototype.glitch = function (url, callback) {
                var _this = this;
                this.loadImage(url, function (img) {
                    _this.renderImage(img);
                    _this.process();
                    callback();
                });
            };

            Glitcher.prototype.process = function () {
                var imageData = this.origContext.getImageData(0, 0, this.width, this.height), pixels = imageData.data, length = pixels.length, options = this.options, brightness, offset, i, x, y;

                for (i = 0; i < length; i += 4) {
                    if (options.color) {
                        pixels[i] *= options.color.red;
                        pixels[i + 1] *= options.color.green;
                        pixels[i + 2] *= options.color.blue;
                    }

                    if (options.greyscale) {
                        brightness = pixels[i] * options.greyscale.red + pixels[i + 1] * options.greyscale.green + pixels[i + 2] * options.greyscale.blue;

                        pixels[i] = brightness;
                        pixels[i + 1] = brightness;
                        pixels[i + 2] = brightness;
                    }

                    if (options.stereoscopic) {
                        offset = options.stereoscopic.red;
                        pixels[i] = (pixels[i + 4 * offset] === undefined) ? 0 : pixels[i + 4 * offset];

                        offset = options.stereoscopic.green;
                        pixels[i + 1] = (pixels[i + 1 + 4 * offset] === undefined) ? 0 : pixels[i + 1 + 4 * offset];

                        offset = options.stereoscopic.blue;
                        pixels[i + 2] = (pixels[i + 2 + 4 * offset] === undefined) ? 0 : pixels[i + 2 + 4 * offset];
                    }
                }

                if (options.lineOffset) {
                    i = 0;

                    for (y = 0; y < this.height; y++) {
                        offset = (y % options.lineOffset.lineHeight === 0) ? Math.round(Math.random() * options.lineOffset.value) : offset;

                        for (x = 0; x < this.width; x++) {
                            i += 4;
                            pixels[i + 0] = (pixels[i + 4 * offset] === undefined) ? 0 : pixels[i + 4 * offset];
                            pixels[i + 1] = (pixels[i + 1 + 4 * offset] === undefined) ? 0 : pixels[i + 1 + 4 * offset];
                            pixels[i + 2] = (pixels[i + 2 + 4 * offset] === undefined) ? 0 : pixels[i + 2 + 4 * offset];
                        }
                    }
                }

                if (options.glitch) {
                }

                this.context.putImageData(imageData, 0, 0);
            };

            Glitcher.prototype.loadImage = function (url, callback) {
                var img = document.createElement('img');
                img.crossOrigin = 'anonymous';
                img.onload = function () {
                    callback(img);
                };
                img.src = url;
            };

            Glitcher.prototype.renderImage = function (img) {
                this.canvas.width = this.origCanvas.width = this.width = img.width;
                this.canvas.height = this.origCanvas.height = this.height = img.height;

                this.origContext.drawImage(img, 0, 0);
            };
            return Glitcher;
        })();

        var glitcher = new Glitcher({
            color: {
                red: 1,
                green: 1,
                blue: 1
            },
            stereoscopic: {
                red: 10,
                green: 20,
                blue: 0
            },
            lineOffset: {
                value: 4
            }
        });

        glitcher.glitch('./src/images/meme.png', function () {
            document.body.appendChild(glitcher.canvas);
        });

        function randomRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        setInterval(function () {
            glitcher.options = {
                color: {
                    red: 1,
                    green: 0.8,
                    blue: 0.58
                },
                stereoscopic: {
                    red: 10 * randomRange(1, 3),
                    green: 5 * randomRange(1, 3),
                    blue: 30 * randomRange(1, 3)
                },
                lineOffset: {
                    value: 5 * randomRange(1, 3),
                    lineHeight: 10 * randomRange(1, 3)
                }
            };
            glitcher.process();
        }, 100);

    }

    submit() {
        if (this.userData.client.age === "") {
            alert("Please enter a valid age");
            return;
        }
        else if (this.userData.client.gender === "") {
            alert("Please enter your sex");
            return;
        }
        else if (this.userData.client.race === "") {
            alert("Please enter your race");
            return;
        }
        else if (this.userData.client.state === "") {
            alert("Please enter your State");
            return;
        }
        else if (this.userData.client.county === "") {
            alert("Please enter your County");
            return;
        }
        else if (this.userData.client.heightInput === "") {
            alert("Please enter your height");
            return;
        }
        else if (this.userData.client.weightInput === "") {
            alert("Please enter your weight");
            return;
        }
        else if (this.userData.client.diabeticOffset === "") {
            alert("Please enter your diabetic status")
            return;
        }
        else if (this.userData.client.cholesterol === "") {
            alert("Please enter your cholesterol");
            return;
        }
        else if (this.userData.client.profession === "") {
            alert("Please enter your profession");
            return;
        }
        else if (this.userData.client.income === "") {
            alert("Please enter your income");
            return;
        }

        if (this.userData.client.married) {
            if (this.userData.spouse.age === "") {
                alert("Please enter your spouse's age");
                return;
            }
            else if (this.userData.spouse.gender === "") {
                alert("Please enter your spouse's sex");
                return;
            }
            else if (this.userData.spouse.race === "") {
                alert("Please enter your spouse's race");
                return;
            }
            else if (this.userData.spouse.state === "") {
                alert("Please enter your spouse's State");
                return;
            }
            else if (this.userData.spouse.county === "") {
                alert("Please enter your spouse's County");
                return;
            }
            else if (this.userData.spouse.heightInput === "") {
                alert("Please enter your spouse's height");
                return;
            }
            else if (this.userData.spouse.weightInput === "") {
                alert("Please enter your spouse's weight");
                return;
            }
            else if (this.userData.spouse.diabetic === "") {
                alert("Please enter your spouse's diabetic status")
                return;
            }
            else if (this.userData.spouse.cholesterol === "") {
                 alert("Please enter your spouse's cholesterol");
                return;
            }
            else if (this.userData.spouse.profession === "") {
                alert("Please enter your spouse's profession");
                return;
            }
            else if (this.userData.spouse.income === "") {
                alert("Please enter your spouse's income");
                return;
            }
        }

        this.userData.client.calculateRaceOffset();
        this.userData.client.calculateEducationOffset();
        this.userData.client.calculateExerciseOffset();
        this.userData.client.calculateCholesterolOffset(this.userData.client.age, this.userData.client.cholesterol);
        this.userData.client.calculateProfessionOffset(this.userData.client.age, this.userData.client.profession);
        this.userData.client.calculateIncomeOffset(this.userData.client.gender, this.userData.client.age, this.userData.client.income);

        var clientOffset = this.userData.client.raceOffset + this.userData.client.hale + this.userData.client.diabeticOffset +
                           this.userData.client.cholesterolOffset + this.userData.client.professionOffset + this.userData.client.smokingOffset + this.userData.client.incomeOffset;
        
        this.userData.client.adjustedAge = parseInt(this.userData.client.age) + parseInt(clientOffset);
        this.userData.client.projectedAge = parseInt(this.userData.client.projectedAge) + parseInt(clientOffset);

        if (this.userData.client.married) {
            this.userData.spouse.calculateRaceOffset();
            this.userData.spouse.calculateEducationOffset();
            this.userData.spouse.calculateExerciseOffset();
            this.userData.spouse.calculateCholesterolOffset(this.userData.spouse.age, this.userData.spouse.cholesterol);
            this.userData.spouse.calculateProfessionOffset(this.userData.spouse.age, this.userData.spouse.profession);
            this.userData.spouse.calculateIncomeOffset(this.userData.spouse.gender, this.userData.spouse.age, this.userData.spouse.income);

            var spouseOffset = this.userData.spouse.raceOffset + this.userData.spouse.hale + this.userData.spouse.diabeticOffset +
                           this.userData.spouse.cholesterolOffset + this.userData.spouse.professionOffset + this.userData.spouse.smokingOffset + this.userData.spouse.incomeOffset;;
        
            this.userData.spouse.adjustedAge += this.userData.spouse.age + spouseOffset;
            this.userData.spouse.projectedAge += spouseOffset;
        }

        this.router.navigate('#/results');

    }

}