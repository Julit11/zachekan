import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block/block.component';
import {MatCardModule} from "@angular/material/card";
import {BlockRoutingModule} from "./block-routing.module";



@NgModule({
  declarations: [BlockComponent],
  imports: [
    CommonModule,
    MatCardModule,
    BlockRoutingModule
  ]
})
export class BlockModule { }
