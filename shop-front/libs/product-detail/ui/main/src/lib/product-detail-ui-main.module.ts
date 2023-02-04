import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  imports: [CommonModule, ButtonModule, SelectButtonModule, FormsModule],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class ProductDetailUiMainModule {}
