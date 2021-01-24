import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent
	],
	imports: [
		MaterialModule,
		FlexLayoutModule
	],
	exports: [
		MaterialModule,
		FooterComponent
	]
})
export class SharedModule { }
