import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { RegisterVisitor } from './pages/register-visitor/register-visitor';
import { VisitorList } from './pages/visitor-list/visitor-list';
import { EntryExit } from './pages/entry-exit/entry-exit';
import { Reports } from './pages/reports/reports';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: 'register-visitor', component: RegisterVisitor },
  { path: 'visitor-list', component: VisitorList },
  { path: 'entry-exit', component: EntryExit },
  { path: 'reports', component: Reports },
  { path: 'about', component: About },
  { path: '**', redirectTo: '' }
];