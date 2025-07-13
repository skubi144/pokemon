import {Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NzButtonComponent, NzButtonModule} from "ng-zorro-antd/button";
import {NzDropdownMenuComponent, NzDropDownModule} from "ng-zorro-antd/dropdown";
import {
  NzFilterTriggerComponent,
  NzTableCellDirective,
  NzTableComponent, NzTableModule,
  NzTbodyComponent,
  NzTdAddOnComponent, NzThAddOnComponent, NzTheadComponent, NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {NzIconDirective, NzIconModule} from "ng-zorro-antd/icon";
import {NzInputDirective, NzInputModule} from "ng-zorro-antd/input";
import {NzWaveDirective} from "ng-zorro-antd/core/wave";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner
} from '../../../data-access/model/apiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner';
import {Subscription} from 'rxjs';
import {PokemonService} from '../../../data-access/services/pokemon-service';
import {LoadingService} from '../../../data-access/services/loading-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-table',
  imports: [
    NzTableComponent,
    FormsModule, NzButtonModule,
    NzDropDownModule, NzIconModule, NzInputModule,
    NzTableModule, NzFlexDirective, NzCheckboxComponent,
  ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit, OnChanges {
  @Input({required: true}) rows: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = [];
  @Input() selectable = false;
  @Input() loading = false;
  @Input() selectedItemId: string[] = [];
  @Output() toggleItem = new EventEmitter<{ id: string; value: boolean }>();
  @Output() dblClick = new EventEmitter<string>();
  searchValue = '';
  visible = false;
  filteredRows: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[] = []

  reset(): void {
    this.searchValue = '';
    this.filteredRows = this.rows;
  }

  search(): void {
    this.visible = false;
    this.filteredRows = this.filteredRows.filter((item) => item.name.indexOf(this.searchValue) !== -1);
  }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.filteredRows = [...changes['rows'].currentValue];
      this.search()
    }
  }

  ngOnInit(): void {
    this.filteredRows = [...this.rows];
  }


  handleDblClick(name: string) {
    this.dblClick.emit(name)
  }

  onItemChecked(id: string, value: boolean) {
    const payload = {id, value}

    this.toggleItem.emit(payload)
  }
}
