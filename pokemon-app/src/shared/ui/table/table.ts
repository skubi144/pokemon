import {Component, DestroyRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {
  NzFilterTriggerComponent,
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTdAddOnComponent, NzThAddOnComponent, NzTheadComponent, NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzWaveDirective} from "ng-zorro-antd/core/wave";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner
} from '../../../data-access/model/apiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner';
import {Subscription} from 'rxjs';
import {PokemonService} from '../../../data-access/services/pokemon-service';
import {LoadingService} from '../../../data-access/services/loading-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-table',
  imports: [
    NzTableComponent,
    NzFilterTriggerComponent,
    NzIconDirective,
    NzTdAddOnComponent,
    NzDropdownMenuComponent,
    NzButtonComponent,
    NzInputDirective,
    FormsModule,
    NzThAddOnComponent
  ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit {
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
