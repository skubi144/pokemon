import {Component, Input, OnInit} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {TeamBuilderService} from '../../service/team-builder-service';
import {Router} from '@angular/router';
import {BaseParamsFormGroup} from '../common/form';

@Component({
  selector: 'app-base-params',
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    NzFormDirective,
    NzInputDirective,
    NzButtonComponent,
    NzRowDirective,
    ReactiveFormsModule
  ],
  templateUrl: './base-params.html',
  styleUrl: './base-params.css'
})
export class BaseParams implements OnInit {
  formGroup!: BaseParamsFormGroup;

  constructor(private teamBuilderService: TeamBuilderService, private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.teamBuilderService.formGroup.get('baseParams') as BaseParamsFormGroup
  }

  async handleSubmit() {
    if (!this.formGroup.valid) return;

    await this.router.navigate(['team-builder', 'build', 'pokemons'])
  }
}
