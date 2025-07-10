import {Component, OnInit} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {Validators} from '../../../../../shared/utils/validators';

interface BaseParamsForm {
  name: FormControl<string>
}

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
  formGroup!: FormGroup<BaseParamsForm>;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      },)
    }, {updateOn: "submit"})
  }

  handleSubmit($event: any) {
    console.log(this.formGroup)
  }
}
