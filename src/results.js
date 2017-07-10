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

    attached() {
        function generateTuples(person) {
            var baseExpecArray = person.gender == "Male" ? person.data.maleLifeExpectancies : person.data.femaleLifeExpectancies;

            var tuples = [];

            for (var i = 0; i < baseExpecArray.length - person.adjustedAge; i++) {
                tuples.push([ parseInt(person.age) + i, baseExpecArray[parseInt(person.adjustedAge) + i][2] ]);
            }

            return tuples;
        }

        function makeChart(person, containerId) {
            Highcharts.chart(containerId, {
                title: {
                    text: 'Life Expectancy'
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

        console.log(this.userData.client);
        console.log(this.userData.spouse);

        makeChart(this.userData.client, 'container');

        if (this.userData.client.married)
            makeChart(this.userData.spouse, 'containerSpouse');
        
    } //end results()
}