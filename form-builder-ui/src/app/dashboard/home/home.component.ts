import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards = [
    {
      icon: 'subtitles',
      cardTitle: 'Create a Form',
      cardContent: 'Create a form with drag and drop',
      buttonText: 'Go',
      buttolUrl: '/create-form'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
