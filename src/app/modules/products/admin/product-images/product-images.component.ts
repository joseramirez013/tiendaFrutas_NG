import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductImageModel } from 'src/app/models/products/product-image.model';
import { ProductImagesService } from 'src/app/services/products/product-images.service';

declare const showMessage: any;

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {

  fgValidator: FormGroup;
  productId: String;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductImagesService) { }

  ngOnInit(): void {
    this.FormBuilding();
    this.productId = this.route.snapshot.params["id"];
    this.fgv.productId.setValue(this.productId);
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      path: ['', [Validators.required]],
      order: ['', [Validators.required]],
      productId: ['', [Validators.required]]
    });
  }

  UploadImageFn() {
    if (this.fgValidator.invalid) {
      showMessage("Invalid form.");
    } else {
      const formData = new FormData();
      formData.append('file', this.fgv.path.value);
      // call service
      this.service.UploadProductImage(formData, this.fgv.order.value, this.fgv.productId.value).subscribe(
        data =>{
          this.fgv.path.setValue(data.filename);
          showMessage("The image file was uploaded successfully.");
        },
        err =>{
          showMessage("Error uploading image file.");
        }
      );
    }
  }

  /**
   * Subir las imagenes al backend
   * @param event 
   */
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.uploadForm.get('profile').setValue(file);
      this.fgv.path.setValue(file);
    }
  }

  get fgv() {
    return this.fgValidator.controls;
  }

}
