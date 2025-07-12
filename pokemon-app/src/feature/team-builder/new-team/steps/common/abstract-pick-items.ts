import {DestroyRef, Directive, OnInit} from '@angular/core';
import {PickItemsFormGroup} from './form';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AbstractControl} from '@angular/forms';

@Directive()
export abstract class AbstractPickItemsComponent implements OnInit {
  formGroup!: PickItemsFormGroup;
  selectedId: string[] = [];

  constructor(protected destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.initData();
  }

  protected initFormGroup(): void {
    this.formGroup = this.getFormGroup();

    this.selectedId = [...this.getSelectedControl()?.value ?? []];

    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.selectedId = [...value.selectedId ?? []];
      });
  }

  protected getSelectedControl(): AbstractControl | null {
    return this.formGroup.get('selectedId');
  }

  handleToggleItem(event: { id: string; value: boolean }): void {
    const { id, value } = event;
    const current = [...(this.getSelectedControl()?.value ?? []) as string[]];

    const updated = value
      ? [...current, id]
      : current.filter(item => item !== id);

    this.getSelectedControl()?.patchValue(updated);
    this.formGroup.markAsDirty();
  }

  abstract getFormGroup(): PickItemsFormGroup;

  protected abstract initData(): void;

  abstract handleSubmit(): void;
}
