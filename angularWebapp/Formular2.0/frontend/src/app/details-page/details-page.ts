import { Component, inject, OnInit } from '@angular/core';
import { FormularService } from '../formular-service';

@Component({
  selector: 'app-details-page',
  imports: [],
  templateUrl: './details-page.html',
  styleUrl: './details-page.css'
})
export class DetailsPage implements OnInit {
  formularService = inject(FormularService)

  ngOnInit(): void {
    
  }
}
