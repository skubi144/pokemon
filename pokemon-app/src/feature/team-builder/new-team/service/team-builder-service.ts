import {Injectable} from '@angular/core';
import {createNewTeamForm,} from '../steps/common/form';

@Injectable()
export class TeamBuilderService {
  formGroup = createNewTeamForm()

  constructor() {
  }
}
