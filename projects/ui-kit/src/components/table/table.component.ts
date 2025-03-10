import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { IDropdown } from '../../interfaces';
import { ITableHeader } from '../../interfaces/table-header.interface';
import { DataKeyTransfromedPipe } from '../../pipes/data-key-transfromed.pipe';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [CommonModule, FormsModule, DataKeyTransfromedPipe, DropdownComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges{
  @Input() dataHeader: ITableHeader[] = [];
  @Input() dataBody: any[]= [];
  @Input() options:boolean = false;
  @Input() searchContent:string = "";
  @Output() clickedOptions: EventEmitter<any> = new EventEmitter<any>();

  dataBodyFiltered: any[] = [];
  initialNumberRecords = 5;
  numberRecordsForm = new FormGroup({'numberRecords': new FormControl(this.initialNumberRecords)});

  numberRecords: IDropdown = {
    id: "numberRecords",
    formControlName: "numberRecords",
    options: [
      {
        label: "5",
        value: 5
      },
      {
        label: "10",
        value: 10
      },
      {
        label: "20",
        value: 20
      }
    ]
  };


  ngOnInit(): void {
    this.dataBodyFiltered = this.dataBody;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onSearch(this.searchContent);
  }

  get numberShowRecords (): number {
    return this.numberRecordsForm.get('numberRecords').value;
  }

  onSearch(event: string): void {
    if (!event) {
      this.dataBodyFiltered = [...this.dataBody];
      return;
    }

    const searchTerm = event.trim().toLowerCase();

    this.dataBodyFiltered = this.dataBody.filter(item => {
      return Object.values(item).some(value => {
        if (value !== null && value !== undefined) {
          return String(value).toLowerCase().includes(searchTerm);
        }
        return false
      });
    });
  }

  optionClicked(item:any, option: string): void {
    this.clickedOptions.emit({item: item, option: option});
  }
}