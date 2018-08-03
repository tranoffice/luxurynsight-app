import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../../account/services/auth.service';
import { MatDialog } from '@angular/material';
import { DialogPanelComponent } from './../../../shared/components/dialog-panel/dialog-panel.component';

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
    const dialog = this.dialog.open(DialogPanelComponent, {
      data: {
        content: 'Are you sure ?',
        title: 'Exit',
        type: 'yesno'
      }
    });
    dialog.afterClosed().subscribe(
      resp => {
        if (resp) {
          this.srvAuth.logout();
        }
      });
    }
  }

