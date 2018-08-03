import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-panel',
  templateUrl: './dialog-panel.component.html',
  styleUrls: ['./dialog-panel.component.css']
})
export class DialogPanelComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }
}
