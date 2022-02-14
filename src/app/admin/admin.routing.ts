import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PageProfileComponent } from '../pages/page-profile/page-profile.component';
import { PageProfileV2Component } from '../pages/page-profile-v2/page-profile-v2.component';
import {AnalitikComponent} from '../pajak/analitik/analitik.component'
import {TabelComponent} from '../pajak/tabel/tabel.component'
import { WpRegisterComponent } from '../pajak/wp-register/wp-register.component';
import { WpListComponent } from '../pajak/wp-list/wp-list.component';
import { AuthGuard } from '../services/auth.guard';
const routes: Routes = [   
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo:'pajak'},
            {
                path: 'pages',
                children: [
                    { path: 'page-profile', component: PageProfileComponent, data: { title: ':: Tax Monitoring :: Pages :: Profile ::' },canActivate: [AuthGuard] },
                    { path: 'page-profile2', component: PageProfileV2Component, data: { title: ':: Tax Monitoring :: Pages :: Profile - V2 ::' },canActivate: [AuthGuard] },                    
                ]
            },
            {
                path:'pajak',
                children:[
                    {path: '', redirectTo: 'analitik', pathMatch: 'full',canActivate: [AuthGuard] },
                    {path:'analitik',component:AnalitikComponent, data: { title: '::Tax Monitoring :: Pajak :: Analitik ::' },canActivate: [AuthGuard]},
                    {path:'tabel',component:TabelComponent, data: { title: '::Tax Monitoring :: Pajak :: Tabel ::' },canActivate: [AuthGuard]},
                    {path:'wp-register',component:WpRegisterComponent, data: { title: '::Tax Monitoring :: Pajak :: WP Register ::' },canActivate: [AuthGuard]},
                    {path:'wp-list',component:WpListComponent, data: { title: '::Tax Monitoring :: Pajak :: WP List ::' },canActivate: [AuthGuard]}
                    
                ]
            }
        ]
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminRoutingModule { }
