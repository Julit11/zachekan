import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../guards/auth.guard";
import {BlockComponent} from "./block/block.component";

const routes: Routes = [
  {
    path: '',
    component: BlockComponent,
    canActivate: [AuthGuard], data: {be: false}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRoutingModule { }
