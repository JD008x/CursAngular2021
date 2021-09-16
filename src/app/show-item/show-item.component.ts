import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem } from '../app-logic/inventory-item';
import { InventoryListMockService } from '../app-logic/inventory-list-mock.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {
  itemId!: number;
  item!: InventoryItem;
  itemIsFound = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryListService: InventoryListMockService,
    private route: Router
  ) {
    this.activatedRoute.params.subscribe(
      (params) => { this.itemId = params.id; }
    );
  }

  ngOnInit(): void {
    this.item = this.inventoryListService.getItemById(this.itemId);
    this.itemIsFound = this.item ? true : false;
  }

  editItem(){
    this.route.navigate(['/edit/' + this.itemId]);
  }
}
