import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-skills-experience',
  templateUrl: './skills-experience.component.html',
  styleUrls: ['./skills-experience.component.scss']
})
export class SkillsExperienceComponent implements OnInit {

  skillSet1: any = [
    {
      skill_name: "Angular 14+",
      image_path: './assets/angular.png',
      percentage: '90',
      percentage_lablel: '90%',
      color: 'bg-danger',
      default: true
    },
    {
      skill_name: "TypeScript",
      image_path: './assets/typescript.png',
      percentage: '70',
      percentage_lablel: '70%',
      color: '',
      default: true
    },
    {
      skill_name: "JavaScript",
      image_path: './assets/javascript.png',
      percentage: '85',
      percentage_lablel: '85%',
      color: 'bg-warning',
      default: true
    },
    {
      skill_name: "Tailwind CSS",
      image_path: './assets/tailwind-css.png',
      percentage: '65',
      percentage_lablel: '65%',
      color: 'custom-color-tailwind-progress-bar',
      default: false
    }
  ]

  skillSet2 = [
    {
      skill_name: "HTML",
      image_path: './assets/html-5.png',
      percentage: '80',
      percentage_lablel: '80%',
      color: 'custom-color-html-progress-bar',
      default: false
    },
    {
      skill_name: "CSS3",
      image_path: './assets/css.png',
      percentage: '80',
      percentage_lablel: '80%',
      color: 'custom-color-css-progress-bar',
      default: false
    },
    {
      skill_name: "NodeJS",
      image_path: './assets/nodejs.png',
      percentage: '70',
      percentage_lablel: '70%',
      color: 'custom-color-nodejs-progress-bar',
      default: false
    },
    {
      skill_name: "MongoDB",
      image_path: './assets/database-storage.png',
      percentage: '65',
      percentage_lablel: '65%',
      color: 'custom-color-mongodb-progress-bar',
      default: false
    }
  ]
  constructor() { }

  ngOnInit(): void {
    
  }

  

}
