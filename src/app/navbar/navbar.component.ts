import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarClass: string = 'navbar-bg-transparent';
  isMenuOpen: boolean = false;
  activeSection: string = 'home';

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 75) {
      this.navbarClass = 'navbar-bg-black';
    } else {
      this.navbarClass = 'navbar-bg-transparent';
    }

    // Update active section based on scroll position
    this.updateActiveSection();
  }

  constructor() { }

  ngOnInit(): void {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = ['home', 'skill_section', 'experience', 'project-section', 'contact'];
    const scrollPosition = window.pageYOffset + 150;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection = sections[i];
        break;
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  scrollToConnect(): void {
    const contactSection = document.getElementById('contact');
    if(contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
