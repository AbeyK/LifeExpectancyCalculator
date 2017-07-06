import * as HighCharts from "highcharts";
import {UserData} from 'userdata';
import {Router} from 'aurelia-router';
import { inject } from 'aurelia-framework';

@inject(UserData, Router)
export class Results {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    results() {
        function generateTuples(person) {
            var baseExpecArray = person.gender == "Male" ? person.data.maleLifeExpectancies : person.data.femaleLifeExpectancies;

            var tuples = [];

            for (var i = 0; i < baseExpecArray.length - person.adjustedAge; i++) {
                console.log(person.adjustedAge + i);
                console.log(baseExpecArray[person.adjustedAge + i][0]);
                tuples.push([ person.age + i, baseExpecArray[person.adjustedAge + i][0] ]);
            }

                console.log(tuples);
            return tuples;
        }

        function makeChart(person, containerId) {
            Highcharts.chart(containerId, {
                title: {
                    text: 'Life Expectency'
                },
                xAxis: {
                    title: {
                        text: 'Age'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Probability of Living'
                    }
                },
                series: [{
                    name: 'Probablity of Living',
                    data:  generateTuples(person)
                }]
            }); //end Highcharts.chart()
        } // end makeChart()

        //this.userData.client.gender = "Female";
        this.userData.client.adjustedAge = 65;
        this.userData.client.age = 60;

        makeChart(this.userData.client, 'container');

        if (this.userData.client.married)
            makeChart(this.userData.spouse, 'containerSpouse');
        
    } //end results()
}