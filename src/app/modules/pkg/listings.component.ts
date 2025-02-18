import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AppsService } from "@lethean/api-angular";

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: "core-pkg-listings",
    templateUrl: "./listings.component.html"
})
export class ListingsComponent {
    apps: AppsService;
    listings:  any;
    // ...
    constructor(apps: AppsService) { 
        this.apps = apps;
        this.listings = {};

        this.apps.listApps().subscribe(data => {
            this.listings = data;
            console.log(this.listings);
        });
        console.log('ListingsComponent.constructor');
    }
}