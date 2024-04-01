import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivationComponent } from './components/activation/activation.component';
import { LoginComponent } from './components/login/login.component';
import { NotActivatedComponent } from './components/not-activated/not-activated.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserProgramsComponent } from './components/user-programs/user-programs.component';
import { NewProgramComponent } from './components/new-program/new-program.component';
import { AllProgramsComponent } from './components/all-programs/all-programs.component';
import { OpenProgramComponent } from './components/open-program/open-program.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { SubComponent } from './components/sub/sub.component';
import { authGuard } from './guard/auth.guard';
import { DiaryComponent } from './components/diary/diary.component';
import { NewDayComponent } from './components/new-day/new-day.component';

export const routes: Routes = [
    {
        path: '', redirectTo:'home' , pathMatch:'full'  
    },
    {
        path: 'home',
        component:HomeComponent
    },
    {
        path: 'register',
        component:RegisterComponent
    },
    {
        path: 'activation',
        component:ActivationComponent
    },
    {
        path: 'login',
        component:LoginComponent
    },
    {
        path: 'notactive',
        component:NotActivatedComponent
    },
    {
        path: 'profile',
        canActivate:[authGuard],
        component:ProfileComponent
    },
    {
        path: 'support',
        canActivate:[authGuard],
        component:ContactComponent
    },
    {
        path: 'chat',
        canActivate:[authGuard],
        component:ChatComponent
    },
    {
        path: 'yp',
        canActivate:[authGuard],
        component:UserProgramsComponent
    },
    {
        path: 'newProgram',
        canActivate:[authGuard],
        component:NewProgramComponent
    },
    {
        path: 'all',
        component:AllProgramsComponent
    },
    {
        path: 'open/:id',
        component:OpenProgramComponent
    },
    {
        path: 'payment/:id',
        canActivate:[authGuard],
        component:PaymentComponent
    },
    {
        path: 'newMessage',
        canActivate:[authGuard],
        component:NewMessageComponent
    },
    {
        path: 'sub',
        canActivate:[authGuard],
        component:SubComponent
    },
    {
        path: 'diary',
        canActivate:[authGuard],
        component:DiaryComponent
    },
    {
        path: 'addDay/:id',
        canActivate:[authGuard],
        component:NewDayComponent
    }
];
