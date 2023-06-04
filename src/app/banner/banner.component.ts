import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const options = {
      strings: ['Software Developer.', 'MEAN Developer.', 'Full-Stack Developer.'],
      typeSpeed: 150,
      backSpeed: 150,
      showCursor: true,
      cursorChar: '|',
      loop: true,
    };

    const typed = new Typed('.sec-text', options);
  }

  scrollToProjects() {
    const projectsSection = document.getElementById('project-section');
    if(projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
