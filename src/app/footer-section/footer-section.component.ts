import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.scss']
})
export class FooterSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleClick(social_item: string) {
    let link = '';
    switch(social_item) {
      case 'linkedin': 
        link = 'https://www.linkedin.com/in/swaraj-kumar5/';
        window.open(link, '_blank');
        break;
      
      case 'github': 
        link = 'https://github.com/Swaraj55';
        window.open(link, '_blank');
        break;

      case 'instagram':
        link = 'https://www.instagram.com/learn.eternally/';
        window.open(link, '_blank');
        break; 

      case 'twitter': 
        link = 'https://twitter.com/SwarajV5';
        window.open(link, '_blank');
        break;

      case 'facebook': 
        link = 'https://www.facebook.com/swaraj.chaturvedi.39';
        window.open(link, '_blank');
        break;
    }
  }
  
}
