import { Component, OnInit, HostListener } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  parallaxOffset = 0;

  constructor() {}

  ngOnInit(): void {
    const options = {
      strings: ['Software Developer.', 'MEAN Developer.', 'Full-Stack Developer.', 'UI/UX Enthusiast.'],
      typeSpeed: 100,
      backSpeed: 80,
      showCursor: true,
      cursorChar: '|',
      loop: true,
      smartBackspace: true,
    };

    const typed = new Typed('.sec-text', options);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.parallaxOffset = window.pageYOffset * 0.5;
  }

  scrollToProjects() {
    const projectsSection = document.getElementById('project-section');
    if(projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if(contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
