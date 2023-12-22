import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnInit{

    constructor(
        private dialog: MatDialog
    ) {
    }

    ngOnInit(){

    }



}
