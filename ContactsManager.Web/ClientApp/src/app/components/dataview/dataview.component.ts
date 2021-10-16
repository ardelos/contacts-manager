import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {  Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact } from 'src/app/shared/models/contact.model';
import { NavigateContactDetails, NavigateNewContactDetails } from 'src/app/shared/store/actions/contacts.action';
import { getClients } from 'src/app/shared/store/selectors/contacts.selectors';
import { AppState } from 'src/app/shared/store/state/contacts.state';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})

export class DataviewComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject<boolean>();
  displayedColumns: string[] = ["firstName", "surname", "dateOfBirth","email"];
  contacts: Contact[] = [];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router: Router, private store: Store<AppState>) {
 
  }

  ngOnInit() {
    this.store.pipe(select(getClients))
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(contacts => {
      this.dataSource = new MatTableDataSource<Contact>(contacts);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }


  addNew = () =>{
    this.store.dispatch(new NavigateNewContactDetails(this.router.url))
  }
  getClientDetails = (client: Contact) => {
    let id = client.id;
    this.store.dispatch(new NavigateContactDetails(this.router.url, id))
  }
}
