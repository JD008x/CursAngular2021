import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { InventoryListMockService } from 'src/app/app-logic/inventory-list-mock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addItemGroup!: FormGroup;
  item!: InventoryItem;
  itemId!: number;
  qrValue!:string;
  qrSize: number = 400;

  constructor(
    private formBuilder: FormBuilder,
    private inventoryListMockService: InventoryListMockService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params) => {
        if (params['id']) {
          this.itemId = params['id'];
          this.qrValue = JSON.stringify(this.itemId);
          console.log("constructor " + params['id']);
        } else {
          this.itemId = 0;
          console.log("constructor 0");
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.itemId != 0) {
      this.item = this.inventoryListMockService.getItemById(this.itemId);
      console.log("oninit  != 0:" + this.item.name);
    } else {
      this.item = new InventoryItem();
      console.log("oninit  == 0:" + this.item);
    }

    this.addItemGroup = this.formBuilder.group({
      name: [this.item.name, Validators.required],
      description: [this.item.description, Validators.maxLength(100)],
      user: [this.item.user, Validators.required],
      location: [this.item.location, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      createdAt: [this.item.createdAt, Validators.required],
    });
  }

  onSubmit() {
    if (this.itemId != 0) {
      this.item.name = this.addItemGroup.value.name;
      this.item.description = this.addItemGroup.value.description;
      this.item.user = this.addItemGroup.value.user;
      this.item.location = this.addItemGroup.value.location;
      this.item.inventoryNumber = this.addItemGroup.value.inventoryNumber;
      this.item.createdAt = this.addItemGroup.value.createdAt;
      this.item.modifiedAt = new Date();
      this.router.navigate(['/inventory'])

    } else {
      this.item = new InventoryItem(this.addItemGroup.value);
      this.item.modifiedAt = new Date();
      this.item.deleted = false;
      this.item.id = this.inventoryListMockService.getLastId() + 1;
      this.inventoryListMockService.addItem(this.item);
      console.log(this.item);
      this.router.navigate(['/inventory']);
    }

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addItemGroup.controls[controlName].hasError(errorName);
  }
}
