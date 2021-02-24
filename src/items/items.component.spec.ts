import {
  TestBed,
  fakeAsync,
  ComponentFixture,
  tick
} from "@angular/core/testing";
import { ItemsComponent } from "./items.component";
import { FormsModule } from "@angular/forms";
import { ItemServiceService } from "../services/item-service.service";

describe("AppComponent", () => {
  let itemServiceServiceStub: any;
  let itemServiceService: ItemServiceService;
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let name: HTMLInputElement;
  let des: HTMLInputElement;
  let price: HTMLInputElement;
  let submit: HTMLElement;

  beforeEach(async () => {
    itemServiceServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      providers: [
        { provide: ItemServiceService, useValue: itemServiceServiceStub }
      ],
      imports: [FormsModule]
    });

    itemServiceService = TestBed.inject(ItemServiceService);
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;

    name = fixture.nativeElement.querySelector("input#name");
    des = fixture.nativeElement.querySelector("input#des");
    price = fixture.nativeElement.querySelector("input#price");
    submit = fixture.nativeElement.querySelector("button#submit");
  });

  it("should have name input", () => {
    name.value = "car";
    name.dispatchEvent(new Event("input"));
    expect(name.value).toBe("car");
  });
  it("should have description input", () => {
    des.value = "car yellow";
    des.dispatchEvent(new Event("input"));
    expect(des.value).toBe("car yellow");
  });
  it("should have price input", () => {
    price.value = "1000";
    price.dispatchEvent(new Event("input"));
    expect(name.value).toBe("1000");
  });

  it("should create new entry for cashin", fakeAsync(() => {
    fixture.detectChanges();
    name.value = "car";
    name.dispatchEvent(new Event("input"));
    des.value = "car yellow";
    des.dispatchEvent(new Event("input"));
    price.value = "1000";
    price.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    submit.click();
    fixture.detectChanges();
    tick(5000);
    fixture.detectChanges();
    expect(component.items).toBe({
      name: "car",
      description: "car yellow",
      price: "1000"
    });
  }));
  it("should test the table ", done => {
    component.ItemList = [
      {
        name: "car",
        description: "car yellow",
        price: "1000"
      }
    ];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll("tr");
      expect(tableRows.length).toBe(2);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe("Image");
      expect(headerRow.cells[1].innerHTML).toBe("Name");
      expect(headerRow.cells[2].innerHTML).toBe("Description");
      expect(headerRow.cells[1].innerHTML).toBe("Price");
      expect(headerRow.cells[2].innerHTML).toBe("Action");

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[1].innerHTML).toBe("car");
      expect(row1.cells[2].innerHTML).toBe("car yellow");
      expect(row1.cells[2].innerHTML).toBe("1000");

      done();
    });
  });
});
