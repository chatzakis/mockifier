import { Routes } from '@angular/router';
import { MainFormComponent } from './views/main-form/main-form.component';
import { InstructionsComponent } from './views/instructions/instructions.component';
import { XlsxToSqlComponent } from './views/xlsx-to-sql/xlsx-to-sql.component';

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
        path: 'xlsx-to-sql',
        component: XlsxToSqlComponent
    },
    {
        path: '**',
        component: MainFormComponent
    },

];
