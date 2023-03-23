import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  public usuarioLogado = false;

  constructor(
    public accountService: AccountService,
    private router: Router
  ) {
    router.events.subscribe(
      (val) => {
        if (val instanceof NavigationEnd){
          this.accountService.currentUser$.subscribe(
            (value) => this.usuarioLogado = value != null
          )
          console.log("boll nav: " + this.usuarioLogado);
        }
      }
    )
  }

  ngOnInit(): void {}

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/user/login');
  }

  showMenu(): boolean {
    return this.router.url !== '/user/login';
  }
}
