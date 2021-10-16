import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetContactsAction } from 'src/app/shared/store/actions/contacts.action';
import { AppState } from 'src/app/shared/store/state/contacts.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>,) { 
  }
  

  ngOnInit(): void {
    this.store.dispatch(new GetContactsAction());
  
  }

}
