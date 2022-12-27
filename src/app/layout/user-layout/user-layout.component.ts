import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav : MatSidenav;

  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe(res=>{
      if(res.matches) {
        this.sidenav.mode = 'over'
        this.sidenav.close()
      } else {
        this.sidenav.mode = 'side'
        this.sidenav.open()
      }
    })
  }

}
