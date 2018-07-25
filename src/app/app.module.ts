import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import {HttpClientModule} from '@angular/common/http';
import {TableGridModule} from 'table-grid';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    TableGridModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
