import { Component } from "@angular/core";

@Component({
    selector: "system-dashboard",
    templateUrl: "./dashboard.component.html"
})
export class DashboardComponent {
    // ...
    constructor() { 
        console.log('DashboardComponent.constructor');
    }
}



