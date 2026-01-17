import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  experiences: any[] = [
    {
      id: 'instant-system',
      title: 'Software Engineer',
      company: 'Instant System Inc.',
      period: 'Feb 2024 - Present',
      location: 'Noida, India',
      website: 'https://global.instantsys.com/',
      description: 'Currently working as a Software Engineer at Instant System Inc., contributing to innovative software solutions and cutting-edge technology projects.',
      techStack: ['JavaScript', 'TypeScript', 'Angular', 'NodeJS', 'MongoDB', 'React', 'RxJS', 'NgRx'],
      logo: '/assets/instant-system.png',
      isCurrent: true
    },
    {
      id: 'seceon',
      title: 'Software Engineer',
      company: 'Seceon Inc.',
      period: 'Aug 2021 - Jan 2024',
      location: 'Mumbai, India',
      website: 'https://www.seceon.com/',
      description: 'Part of the creative Front-end team where I took care of the design Interfaces of the real-time projects and taking care of full UI/UX research and Information Architecture that includes wireframes, flowcharts, worked on the Multi-Factor Authentication Architecture and its Front-end side and also worked on SeceonBI Platform.',
      techStack: ['JavaScript', 'TypeScript', 'Angular 14+', 'Angular Material', 'Bootstrap 4 & 5', 'NodeJS', 'HTML & CSS', 'RxJS'],
      logo: '/assets/seceon.png',
      isCurrent: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
