import {Component, DestroyRef, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NzStepComponent, NzStepsComponent} from 'ng-zorro-antd/steps';
import {filter, map, of, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TeamBuilderService} from './service/team-builder-service';
import {NzFlexDirective} from 'ng-zorro-antd/flex';

@Component({
  template: `
    <div nz-flex [nzVertical]="true" nzGap="large">
      <nz-steps>
        <nz-step nzTitle="Base information" [nzStatus]="getStatus('base')" nzIcon="info-circle"></nz-step>
        <nz-step nzTitle="Pick pokemons" [nzStatus]="getStatus('pokemons')" nzIcon="aliwangwang"></nz-step>
        <nz-step nzTitle="Pick potions" [nzStatus]="getStatus('potions')" nzIcon="experiment"></nz-step>
        <nz-step nzTitle="Pick berries" [nzStatus]="getStatus('berries')" nzIcon="gift"></nz-step>
        <nz-step nzTitle="Summary" [nzStatus]="getStatus('summary')" nzIcon="appstore"></nz-step>
      </nz-steps>
      <router-outlet></router-outlet>
    </div>
  `,
  imports: [
    RouterOutlet,
    NzStepsComponent,
    NzStepComponent,
    NzFlexDirective,
  ],
  providers: []
})
export class NewTeam implements OnInit {
  steps = ['base', 'pokemons', 'potions', 'berries', 'summary'];
  currentChildPath: string | null = null
  currentStepId = 0;

  constructor(private teamBuilderService: TeamBuilderService, private destroy: DestroyRef, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  getStatus(step: string) {
    const id = this.steps.indexOf(step);
    const isValid = this.teamBuilderService.formGroup.get(step)?.valid;
    const dirty = this.teamBuilderService.formGroup.get(step)?.dirty;

    if (this.currentStepId < id) return 'wait';
    if (!dirty) return 'finish'

    return isValid ? 'finish' : 'error';
  }

  initSegmentDetector() {
    const initialUrlSegments = this.activatedRoute.firstChild?.snapshot.url ?? [];

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(initialUrlSegments),
      switchMap(urlSegments => {
        if (Array.isArray(urlSegments)) {
          return of(urlSegments);
        } else {
          return this.activatedRoute.firstChild ? this.activatedRoute.firstChild.url : of([]);
        }
      }),
      map(urlSegments => urlSegments.map(s => s.path).join('/') || null),
      takeUntilDestroyed(this.destroy),
    ).subscribe(path => {
      this.currentChildPath = path;
      this.currentStepId = this.steps.indexOf(path ?? '')
    });
  }

  ngOnInit(): void {
    this.initSegmentDetector();
  }
}
