import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MenuOrderService } from '../../services/menu-order.service';

@Component({
  selector: 'app-menu-order',
  templateUrl: './menu-order.component.html',
  styleUrls: ['./menu-order.component.scss']
})
export class MenuOrderComponent implements OnInit {

  public lastOutput: string = "";

  public columnDefs: ColDef[] = [
    { field: 'date', width: 300 },
    { field: 'input', width: 300 },
    { field: 'output', width: 300 }
  ];

  public rowData: any = [
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  orderForm: FormGroup = this.formBuilder.group({
    orderInput: ["", Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private service: MenuOrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  async sendOrder(orderForm: any) {

    if (orderForm.valid) {

      await this.service.sendOrder(orderForm.value.orderInput)
        .then((data: string) => {
          debugger
          this.lastOutput = data;
          this.rowData.push({ date: new Date().toString(), input: orderForm.value.orderInput, output: this.lastOutput });
          this.rowData = [...this.rowData];
          orderForm.reset();
        }, (error: any) => {

          var errorMessage = JSON.parse(error.error);
          console.log(errorMessage)
          
          if (error.error.indexOf("Validacao") > -1) {

            var fieldMessage = JSON.parse(errorMessage.errors.value);
            this.toastr.error(fieldMessage.message, errorMessage.title);
          }
          else
            this.toastr.error(errorMessage.errors.value, errorMessage.title);
        });
    }
  }
}
