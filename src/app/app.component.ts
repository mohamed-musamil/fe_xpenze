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

  constructor(private readonly commonService: CommonService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.commonService.checkServer();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

}
