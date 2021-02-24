import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ItemServiceService } from "../services/item-service.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
  url: any = "";
  items: any = {};
  ItemList: any = [];
  @ViewChild("inputFile") myInputVariable: ElementRef;
  constructor(
    private itemServiceService: ItemServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getItems();
  }
  onFormSubmit() {
    debugger;
    this.itemServiceService.saveitems(this.items).subscribe(res => {
      this.items = {};
      this.myInputVariable.nativeElement.value = "";
      this.getItems();
    });
  }
  onFileSelected(event, imageFor) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.items.imageUrl = event.target.result;
        console.log(event.target.result);
      };
    }
  }
  getItems() {
    this.itemServiceService.getitems().subscribe(res => {
      this.ItemList = res;
    });
  }
  deleteItem(id) {
    this.itemServiceService.deleteitem(id).subscribe(res => {
      this.getItems();
    });
  }
  gotoItemDetail(id) {
    this.router.navigate(["/itemDetail/"], {
      queryParams: { id: id }
    });
  }
}
