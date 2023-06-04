import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatIconModule } from '@angular/material/icon';
import { SkillsExperienceComponent } from './skills-experience/skills-experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Angular Material Module Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';


import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { MailSuccessComponent } from './contact/mail-success/mail-success.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    SkillsExperienceComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterSectionComponent,
    ProjectDetailsComponent,
    MailSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
