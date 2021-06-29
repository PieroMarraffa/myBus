import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'tabs/home',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: ":newsId",
        loadChildren: () => import('./pages/home/news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
      }
    ]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./pages/preferences/preferences.module').then( m => m.PreferencesPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'tabs/busList',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/bus-list/bus-list.module').then( m => m.BusListPageModule)
      },
      {
        path: ":busId",
        loadChildren: () => import('./pages/bus-list/bus-detail/bus-detail.module').then( m => m.BusDetailPageModule)
      }
    ]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
