import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
  constructor(public readonly commonService: CommonService) {
    
  }
  gender = false;
  ngOnInit(): void { }

  logout() {
    this.commonService.logout();
  }
}
