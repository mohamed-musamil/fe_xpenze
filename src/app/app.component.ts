import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './shared/services/common.service';
import { RestService } from './shared/services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fe_xpenze';
  showToast: Boolean = false;
  list = new BehaviorSubject([]);

  constructor(private readonly commonService: CommonService, private cdref: ChangeDetectorRef) {
    this.commonService.displayToast.subscribe((data:any) => {
      this.showToast = data?.showToast;
      if(data?.toast) {
        console.log(data?.toast);
        this.list.next(data?.toast);
      }
    })
  }

  ngOnInit(): void {
    this.commonService.checkServer();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
