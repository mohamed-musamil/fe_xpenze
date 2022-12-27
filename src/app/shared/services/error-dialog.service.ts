import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver } from "@angular/flex-layout";
import { Observable } from 'rxjs';
import { ErrorComponent } from '../component/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  public isDialogOpen = true;
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver, public media : MediaObserver) { }

  openErrorPopup(data) {
    const filterDialog = this.dialog.open(ErrorComponent, {
      disableClose: true,
      width: this.media.isActive('lt-sm') ? '50vw' : this.media.isActive('sm') ? '100vw' : '50vw',
      height: '50vh',
      autoFocus: false,
      data : data
    })
    const smallDialogSubscription = this.isExtraSmall.subscribe(result => {
      if(result.matches) {
        filterDialog.updateSize('100%', '100%')
      }
    })
    filterDialog.afterClosed().subscribe(result => {
      smallDialogSubscription.unsubscribe()
    })
  }
}
