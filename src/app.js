export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Life Expectancy Calculator";
    config.map([
      { route: ['', 'personalinfo'], moduleId: 'personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true},
        
      { route: 'results', moduleId: 'results',
        name: 'results', title: 'Results', nav: true}
    ]);
  }
}
