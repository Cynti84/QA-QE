import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
 // imports: [CommonModule], // to use ngIf and ngFor
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  message: string = "Hello world, be kind to us"
  message2: string = "This world is so big"

  //static data
  homes: string[] = ["Villa in Nairobi", "Apartment in Lagos", "Beach House in Cape Town"]
  
  clearHomes() {
    this.homes = []
  }
  addHome() {
    this.homes.push(`New Home ${this.homes.length +1}`)
  }

  //api data
  // books: any[] = []
  // loading = true
  // error = ''
  
  // constructor(private http: HttpClient) { }//inject httpClient
  
  // ngOnInit() {
  //   //runs before the component loads

  // }
}
