import { Routes, RouterModule } from '@angular/router';
import { QuestionScreenComponent } from './question/question-screen.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';
import { QUESTION_ROUTES } from './question/question.routing';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: QuestionScreenComponent,
        pathMatch: 'full'
    },
    {
        path: 'signin',
        component: SigninScreenComponent
    },
    {
        path: 'signup',
        component: SignupScreenComponent
    },
    {
        path: 'questions',
        children: QUESTION_ROUTES
    }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);