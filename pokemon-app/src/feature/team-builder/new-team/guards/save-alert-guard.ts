import {CanDeactivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';

export const saveAlertGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const modal = inject(NzModalService);

  return new Promise<boolean>((resolve) => {
    modal.confirm({
      nzTitle: 'Confirm required',
      nzContent: 'Do you want to abandon add team process?',
      nzOkText: 'Yes',
      nzCancelText: 'Cancel',
      nzOnOk: () => resolve(true),
      nzOnCancel: () => resolve(false),
    });
  });
};
