import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularTableGridModule} from 'angular-table-grid';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        TestComponent
    ],
    imports: [
        BrowserModule,
        AngularTableGridModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    entryComponents: [TestComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
