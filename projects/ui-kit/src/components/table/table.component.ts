import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITableHeader } from '../../interfaces/table-header.interface';
import { DataKeyTransfromedPipe } from '../../pipes/data-key-transfromed.pipe';
import { TableEventsService } from '../../services/utils/table-events.service';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [CommonModule, FormsModule, DataKeyTransfromedPipe],
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

  private tableEventsService = inject(TableEventsService);

  ngOnInit(): void {
    this.dataBodyFiltered = this.dataBody;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onSearch(this.searchContent);
  }

  onButtonClick(event: any): void {
    this.tableEventsService.emitEvent("buttonClick", event);
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

}