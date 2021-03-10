import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserTableComponent } from './user-table/user-table.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createuser', component: CreateUserComponent },
  { path: 'updateuser/:id', component: UpdateProfileComponent },
  { path: 'userlist', component: UserTableComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
