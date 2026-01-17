import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'swaraj-portfolio';
  particles: any[] = [];

  ngOnInit() {
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        size: Math.random() * 4 + 2 + 'px',
        delay: Math.random() * 20 + 's',
        duration: Math.random() * 10 + 15 + 's'
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
}
