import { Component } from "@angular/core";

@Component({
    selector: "core-frame-none",
    template: "<router-outlet></router-outlet>"
})
export class FramelessComponent {
    // ...
    constructor() { 
        console.log('FramelessComponent.constructor');
    }
}