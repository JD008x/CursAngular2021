import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { InventoryListMockService } from 'src/app/app-logic/inventory-list-mock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  inventoryItems: MatTableDataSource<InventoryItem>;
  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'description',
    'user',
    'location',
    'inventoryNumber',
    'createdAt',
    'modifiedAt',
    'deleted',
    'actions'
  ];
  selection = new SelectionModel<InventoryItem>(true, []);

  constructor(private inventoryListMockService: InventoryListMockService) {
    this.inventoryItems = Object();
    this.paginator = Object();
    this.sort = Object();
  }

  ngOnInit(): void {
    this.inventoryItems = new MatTableDataSource<InventoryItem>(this.inventoryListMockService.getData());
    this.inventoryItems.paginator = this.paginator;
    this.inventoryItems.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRow = this.inventoryItems.data.length;
    return numSelected === numRow;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.inventoryItems.data.forEach((row: any) => this.selection.select(row));
  }

}
