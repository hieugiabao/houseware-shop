import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './list-category.conponent';
import { CategoriesService } from '@shop/shell/data-access';

@NgModule({
  imports: [CommonModule, RouterModule, SkeletonModule],
  declarations: [ListCategoryComponent],
  exports: [ListCategoryComponent],
  providers: [CategoriesService],
})
export class ShellUiListCategoryModule {}
