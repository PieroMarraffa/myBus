import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/login']);

const redirectLoggedInToHome = () =>
  redirectLoggedInTo(['/tabs']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
      ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'tabs/busList',
    children:[
      {
      path: "",
      loadChildren: () => import('./pages/bus-list/bus-list.module').then( m => m.BusListPageModule)
    },
      {
        path: ":busId",
        loadChildren: () => import('./pages/bus-list/bus-detail/bus-detail.module').then( m => m.BusDetailPageModule)

      }
    ]
  },
  {
    path: 'map',
    children:[
      {
        path: "",
        loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
      },
      {
        path: ":busId",
        loadChildren: () => import('./pages/bus-list/bus-detail/bus-detail.module').then( m => m.BusDetailPageModule)
      }
    ]
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
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./pages/preferences/preferences.module').then( m => m.PreferencesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/tickets/tickets.module').then( m => m.TicketsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'change-credentials',
    children: [
      {
        path: ':changeId',
        loadChildren: () => import('./pages/change-credentials/change-credentials.module').then( m => m.ChangeCredentialsPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
