import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent
	],
	imports: [
		MaterialModule
	],
	exports: [
		MaterialModule,
		FooterComponent
	]
})
export class SharedModule { }
