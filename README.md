# Life Expectancy Calculator

The Life Expectancy Calculator generates a prediction of the user’s total life expectancy using research from peer reviewed sources such as studies from the American Journal of Medicine, the Center for Disease Control, and more, as well as actuarial tables from the Social Security Administration. Inputs include income, BMI, education level, diabetes status (type 1 and 2), smoking habit, etc. to create a mortality curve with probabilities of death for each additional year of life. Our application assumes a conservative estimated death age when the probability of death within one year reaches 50%. 

![life4](https://user-images.githubusercontent.com/21178248/28226990-158304ac-68a6-11e7-8550-7a00778abdab.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* NodeJS
* AureliaJS

### Installing

Once you have the prerequisites installed, you can install the Aurelia CLI itself. From the command line, use npm to install the CLI globally:

```
npm install aurelia-cli -g
```

Using Node, install the project dependencies: 
```
npm install
```

Once the dependencies are installed (it will take a few minutes), your project is ready to go. Just change directory into the project folder and run it by typing:

```
au run --watch
```



## Built With

* [Aurelia](http://aurelia.io/) - The web framework used

