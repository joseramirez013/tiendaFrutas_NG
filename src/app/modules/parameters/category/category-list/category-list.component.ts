import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsConfig } from 'src/app/config/forms-config';
import { CategoryModel} from '../../../../models/parameters/category.model';
import { CategoryService } from '../../../../services/parameters/category.service';

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
  constructor(private service: CategoryService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fillRecords();
  }

  fillRecords(){
    this.service.getAllRecords().subscribe(
      data => {
        this.recordList = data;
        console.log(this.recordList);
        setTimeout(() => {
          /** spinner ends after 1 seconds */
          this.spinner.hide();
        }, 1000);
      },
      error =>{
        showMessage("There is an error with backend communication");
      }
    );
  }

  RemoveConfirmation(){
    showRemoveConfirmationWindow();
  }

}
