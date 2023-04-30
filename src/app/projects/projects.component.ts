import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  defaultSelectedTab: string ='All';
  allBackgroundColor: string = 'add-background-color';
  javascriptBackgroundColor: string = '';
  angularBackgroundColor: string = '';

  projects: any[] = [
    {
      id: 'angular',
      project_name: 'Mailer',
      technical_lang: 'Angular 8+ / Nodemailer',
      image: '/assets/mailer.png'
    },
    {
      id: 'angular',
      project_name: 'URL Shortner',
      technical_lang: 'Angular 11+ / NodeJS / MongoDB',
      image: '/assets/url-shortner.png'
    },
    {
      id: 'angular',
      project_name: 'Current Weather',
      technical_lang: 'Angular 11+ / NodeJS',
      image: '/assets/current-weather.png'
    }
  ];

  selectedProjects: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.projectsTab(this.defaultSelectedTab)
  }

  projectsTab(selectedTab: string) {
    switch(selectedTab) {
      case 'All' : 
          this.selectedProjects = []
          this.allBackgroundColor = 'add-background-color';
          this.angularBackgroundColor = 'remove-background-color';
          this.javascriptBackgroundColor = 'remove-background-color';
          this.selectedProjects = [...this.projects]
          break;

      case 'Angular' : 
          this.selectedProjects = [];
          this.allBackgroundColor = 'remove-background-color';
          this.angularBackgroundColor = 'add-background-color';
          this.javascriptBackgroundColor = 'remove-background-color';
          this.selectedProjects = [...this.projects];
          this.selectedProjects.forEach((item, index) => {
            if(item.id === 'javascript') {
              this.selectedProjects.splice(index, 1);
            }
          });
          break;

      case 'JavaScript' : 
          this.selectedProjects = [];
          this.allBackgroundColor = 'remove-background-color';
          this.angularBackgroundColor = 'remove-background-color';
          this.javascriptBackgroundColor = 'add-background-color';
          this.selectedProjects.forEach((item, index) => {
            if(item.id === 'angular') {
              this.selectedProjects.splice(index, 1);
            }
          });
          break;
    }
  }
}
