import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-skills-experience',
  templateUrl: './skills-experience.component.html',
  styleUrls: ['./skills-experience.component.scss']
})
export class SkillsExperienceComponent implements OnInit {

  selectedCategory: string = 'Frontend';
  
  skillCategories: any = {
    'Frontend': [
      {
        skill_name: "Angular 14+",
        icon: 'fa-brands fa-angular',
        iconColor: '#DD0031',
        percentage: 90,
        percentage_lablel: '90%'
      },
      {
        skill_name: "JavaScript",
        icon: 'fa-brands fa-js',
        iconColor: '#F7DF1E',
        percentage: 85,
        percentage_lablel: '85%'
      },
      {
        skill_name: "TypeScript",
        icon: 'fa-brands fa-js', // Fallback icon
        iconColor: '#3178C6',
        percentage: 80,
        percentage_lablel: '80%',
        useCustomIcon: true // Use custom SVG instead
      },
      {
        skill_name: "HTML5",
        icon: 'fa-brands fa-html5',
        iconColor: '#E34F26',
        percentage: 85,
        percentage_lablel: '85%'
      },
      {
        skill_name: "CSS3",
        icon: 'fa-brands fa-css3-alt',
        iconColor: '#1572B6',
        percentage: 80,
        percentage_lablel: '80%'
      },
      {
        skill_name: "Tailwind CSS",
        icon: 'fa-solid fa-wind',
        iconColor: '#06B6D4',
        percentage: 75,
        percentage_lablel: '75%'
      },
      {
        skill_name: "RxJS",
        icon: 'fa-solid fa-bolt',
        iconColor: '#B7178C',
        percentage: 75,
        percentage_lablel: '75%'
      },
      {
        skill_name: "NgRx",
        icon: 'fa-solid fa-layer-group',
        iconColor: '#DD0031',
        percentage: 70,
        percentage_lablel: '70%'
      }
    ],
    'Backend': [
      {
        skill_name: "NodeJS",
        icon: 'fa-brands fa-node-js',
        iconColor: '#339933',
        percentage: 75,
        percentage_lablel: '75%'
      },
      {
        skill_name: "Express.js",
        icon: 'fa-solid fa-server',
        iconColor: '#000000',
        percentage: 70,
        percentage_lablel: '70%'
      },
      {
        skill_name: "Spring Boot",
        icon: 'fa-brands fa-java',
        iconColor: '#6DB33F',
        percentage: 60,
        percentage_lablel: '60%'
      },
      {
        skill_name: "Java",
        icon: 'fa-brands fa-java',
        iconColor: '#ED8B00',
        percentage: 50,
        percentage_lablel: '50%',
        isLearning: true
      },
      {
        skill_name: "RESTful APIs",
        icon: 'fa-solid fa-code',
        iconColor: '#a855f7',
        percentage: 80,
        percentage_lablel: '80%'
      },
      {
        skill_name: "GraphQL",
        icon: 'fa-solid fa-diagram-project',
        iconColor: '#E10098',
        percentage: 65,
        percentage_lablel: '65%'
      }
    ],
    'Database': [
      {
        skill_name: "MongoDB",
        icon: 'fa-solid fa-database',
        iconColor: '#47A248',
        percentage: 75,
        percentage_lablel: '75%'
      },
      {
        skill_name: "MySQL",
        icon: 'fa-solid fa-database',
        iconColor: '#4479A1',
        percentage: 70,
        percentage_lablel: '70%'
      },
      {
        skill_name: "PostgreSQL",
        icon: 'fa-solid fa-database',
        iconColor: '#336791',
        percentage: 65,
        percentage_lablel: '65%'
      }
    ],
    'Tools & Others': [
      {
        skill_name: "Git & GitHub",
        icon: 'fa-brands fa-github',
        iconColor: '#181717',
        percentage: 85,
        percentage_lablel: '85%'
      },
      {
        skill_name: "Angular Material",
        icon: 'fa-brands fa-angular',
        iconColor: '#DD0031',
        percentage: 85,
        percentage_lablel: '85%'
      },
      {
        skill_name: "Bootstrap",
        icon: 'fa-brands fa-bootstrap',
        iconColor: '#7952B3',
        percentage: 80,
        percentage_lablel: '80%'
      },
      {
        skill_name: "JIRA",
        icon: 'fa-brands fa-jira',
        iconColor: '#0052CC',
        percentage: 75,
        percentage_lablel: '75%'
      },
      {
        skill_name: "Postman",
        icon: 'fa-solid fa-paper-plane',
        iconColor: '#FF6C37',
        percentage: 80,
        percentage_lablel: '80%'
      }
    ]
  };

  get categories(): string[] {
    return Object.keys(this.skillCategories);
  }

  get currentSkills(): any[] {
    return this.skillCategories[this.selectedCategory] || [];
  }
  
  constructor(
    private ngwWowService: NgwWowService,
  ) {
    this.ngwWowService.init();
  }

  ngOnInit(): void {
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  getCategoryIcon(category: string): string {
    const icons: any = {
      'Frontend': 'fa-solid fa-code',
      'Backend': 'fa-solid fa-server',
      'Database': 'fa-solid fa-database',
      'Tools & Others': 'fa-solid fa-toolbox'
    };
    return icons[category] || 'fa-solid fa-star';
  }

}
