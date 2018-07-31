import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../../account/services/auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public srvHeader: HeaderService,
    public srvAuth: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  logout() {
    const exit = confirm('Are you sure ?')
    if (exit) {
      this.srvAuth.logout();
    }
  }
}
