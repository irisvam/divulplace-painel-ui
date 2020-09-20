import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/login/_models/user';

import { AuthenticationService } from 'src/app/login/_services/authentication.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {

  afiliado: User;
  
  constructor(private authenticationService: AuthenticationService) { 
    this.afiliado = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }

}
