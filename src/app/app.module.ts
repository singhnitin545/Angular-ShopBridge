import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ItemsComponent } from "../items/items.component";
import { HttpClientModule } from "@angular/common/http";
import { ItemDetailComponent } from "../item-detail/item-detail.component";
import { RouterModule, Routes } from "@angular/router";
import { ItemServiceService } from "../services/item-service.service";

const appRoutes: Routes = [
  { path: "", component: ItemsComponent },
  { path: "itemDetail", component: ItemDetailComponent }
];
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AppComponent, ItemsComponent, ItemDetailComponent],
  providers: [ItemServiceService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
