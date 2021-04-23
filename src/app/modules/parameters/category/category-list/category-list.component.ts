import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsConfig } from 'src/app/config/forms-config';
import { CategoryModel} from '../../../../models/parameters/category.model';
import { CategoryService } from '../../../../services/parameters/category.service';

declare const closeAllModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindow: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  page: number = 1;
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  recordList: CategoryModel[];
  idToRemove: String = '';

  constructor(private service: CategoryService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fillRecords();
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);
  }

  fillRecords(){
    this.service.getAllRecords().subscribe(
      data => {
        this.recordList = data;
        console.log(this.recordList);
      },
      error =>{
        showMessage("There is an error with backend communication");
      }
    );
  }

  RemoveConfirmation(id){
    this.idToRemove = id;
    showRemoveConfirmationWindow();
  }

  RemoveRecord(){
    if(this.idToRemove){
    this.service.DeleteRecord(this.idToRemove).subscribe(
      data => {
        this.idToRemove = '';
        this.fillRecords();
        closeAllModal('removeConfirmationModal');
        //showMessage("Record removed successfuly");
      },
      error =>{
        showMessage("There is an error with backend communication");
      }
    );
    }
  }

}
