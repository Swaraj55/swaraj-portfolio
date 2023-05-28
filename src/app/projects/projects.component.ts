import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { Overlay } from '@angular/cdk/overlay';
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
      platform_name: 'Mailer Service',
      description: `A mailer service is an online platform that enables sending, receiving, and managing emails. 
      It provides SMTP servers for sending, POP3/IMAP servers for retrieval, and features like storage, folder organization, 
      and spam filtering. Popular services include Gmail, Outlook.com, and Yahoo Mail.`,
      image: '/assets/mailer.png',
      project_link: ''
    },
    {
      id: 'angular',
      project_name: 'URL Shortner',
      technical_lang: 'Angular 11+ / NodeJS / MongoDB',
      platform_name: 'Online Service',
      description: `URL Shortner is a convenient web tool that reduces the length of long URLs, providing shorter and more manageable
       links. With this free service, users can easily share and track their shortened URLs, enhancing readability, and enabling
       effective analytics.`,
      image: '/assets/url-shortner.png',
      project_link: 'https://url-shortner-nhiy.onrender.com/#/Home'
    },
    {
      id: 'angular',
      project_name: 'Current Weather',
      technical_lang: 'Angular 11+ / NodeJS',
      platform_name: 'Weather Applications',
      description: `Current Weather is a weather application that provides real-time weather information. It offers accurate forecasts,
       temperature, humidity, wind speed, and other meteorological data for a specified location. With an intuitive interface and 
       reliable data sources, users can stay updated on the current weather conditions effortlessly.`,
      image: '/assets/current-weather.png',
      project_link: ''
    }
  ];

  selectedProjects: any[] = [];

  constructor(
    private _matDialog: MatDialog,
    private overlay: Overlay
  ) { }

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

  detailsOfSpecificProject(project: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.maxWidth = '900px';
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.disableClose = false;         // Closing the dialog if user click outside the dialog
    dialogConfig.position = {top: '100px'}
    // The above written because
    /**
     * If you're using Angular Material's MatDialog and you want to retain the scrollbar when the dialog is open, 
     * you can achieve this by adding custom CSS styles to the dialog component.
     * By default, Angular Material's MatDialog applies a class called cdk-global-scrollblock to the body element when a dialog is open.
     * This class is responsible for hiding the scrollbar on the body. To prevent this behavior, you can override the styles for this class.
     */
    dialogConfig.data = project;

    const dialogRef = this._matDialog.open(ProjectDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
    })
  }
  
  /* The hasBackdrop and backdropClass options in Angular Material's MatDialog configuration allow you to customize the appearance
   and behavior of the backdrop behind the dialog.

  * hasBackdrop: true indicates that the dialog should display a backdrop. The backdrop is a semi-transparent overlay that covers
    the rest of the screen, making the dialog stand out and preventing interactions with elements outside the dialog while it is open.

  * backdropClass: 'my-dialog-backdrop' is used to specify a CSS class that will be applied to the backdrop element. This allows you to
    define custom styles for the backdrop, such as its background color, opacity, or other visual properties.
  */
}
