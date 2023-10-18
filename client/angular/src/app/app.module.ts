import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbFocusMonitor, NbInputModule, NbStatusService } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
  ],
  providers: [HttpClientModule, NbStatusService, NbFocusMonitor],
  bootstrap: [AppComponent]
})
export class AppModule { }
