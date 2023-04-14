import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  programmingLangSeceon: string[] = ['JavaScript', 'TypeScript', 'Angular 14+', 'Angular Material', 'Bootstrap 4 & 5', 'NodeJS'];

  constructor() { }

  ngOnInit(): void {
  }

}
