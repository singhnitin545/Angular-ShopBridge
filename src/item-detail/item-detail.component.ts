import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemServiceService } from "../services/item-service.service";

@Component({
  selector: "app-item-detail",
  templateUrl: "./item-detail.component.html",
  styleUrls: ["./item-detail.component.css"]
})
export class ItemDetailComponent implements OnInit {
  item: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemServiceService: ItemServiceService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getDetails(params["id"]);
    });
  }
  getDetails(id) {
    this.itemServiceService.itemDetail(id).subscribe(res => {
      console.log(res);
      this.item = res;
    });
  }
  goBack(){
    this.router.navigate(["/"])
  }
}
