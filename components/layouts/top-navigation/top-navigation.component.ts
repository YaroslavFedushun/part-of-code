import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  @Input() themeWight: boolean;
  public currentUser: any;

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  public logout() {
    this.auth.logout();
  }

}
