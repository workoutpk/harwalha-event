import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    constructor(
        private authService:AuthService,
        private router:Router
    ){}
    logOut() {
        this.authService.logout();
        this.router.navigate(['/home']);
    }

}
