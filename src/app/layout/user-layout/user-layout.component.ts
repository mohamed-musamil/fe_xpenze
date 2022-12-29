import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav : MatSidenav;

  constructor(private observer: BreakpointObserver, public readonly commonService: CommonService, public readonly storage: StorageService) { }
  
  
  ngOnInit(): void {
    this.commonService.getCurrentUser().subscribe(res => {})
  }


  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe(res=>{
      if(res.matches) {
        this.sidenav.mode = 'over'
        this.sidenav.autoFocus = false;
        this.sidenav.close()
      } else {
        this.sidenav.mode = 'side'
        this.sidenav.autoFocus = false;
        this.sidenav.open()
      }
    })
  }

}
