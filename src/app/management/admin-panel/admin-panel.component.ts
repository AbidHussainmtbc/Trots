import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  loginName: string = "";
  constructor(private utilService: UtilsService) { }

  ngOnInit(): void {
    //
    this.loginName = sessionStorage.getItem("loginid")
  }

}
