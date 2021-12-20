import { ImpressorasRoutingModule } from './impressoras-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressorasComponent } from './impressoras.component';



@NgModule({
  declarations: [
    ImpressorasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImpressorasRoutingModule
  ]
})
export class ImpressorasModule { }
