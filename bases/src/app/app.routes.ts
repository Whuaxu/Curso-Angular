import { Routes } from '@angular/router';
import { CounterPage } from './pages/counter/counterPage';
import { HeroPage } from './pages/hero/heroPage';
import { dragonballPage } from './pages/dragonball/dragonballPage';
import { dragonballSuperPage } from './pages/dragonball-super/dragonballSuperPage';

export const routes: Routes = [

    {
        path:'',
        component:CounterPage
        
    },

    {
        path: 'hero',
        component: HeroPage
    },

    {
        path: 'dragonball',
        component: dragonballPage
    },

    {
        path: 'dragonball-super',
        component: dragonballSuperPage
    },

    {
        path: '**',
        redirectTo: ''
    }
];
