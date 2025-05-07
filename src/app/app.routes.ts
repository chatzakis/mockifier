import { Routes } from '@angular/router';
import { MainFormComponent } from './views/main-form/main-form.component';
import { InstructionsComponent } from './views/instructions/instructions.component';

export const routes: Routes = [
    {
        path: '',
        component: MainFormComponent
    },
    {
        path: 'instructions',
        component: InstructionsComponent
    },
    {
        path: '**',
        component: MainFormComponent
    },

];
