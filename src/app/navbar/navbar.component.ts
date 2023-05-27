import { Component, OnInit, HostListener  } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbarClass: string = 'navbar-bg-transparent'
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    console.log(window.scrollY)
    if (window.scrollY > 75) {
      this.navbarClass = 'navbar-bg-black';
    } else {
      this.navbarClass = 'navbar-bg-transparent';
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
