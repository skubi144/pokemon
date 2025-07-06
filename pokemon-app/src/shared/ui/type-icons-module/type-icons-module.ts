import {APP_INITIALIZER, makeEnvironmentProviders} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NzIconService} from 'ng-zorro-antd/icon';
import fire from '../assets/fire.svg';
import bug from '../assets/bug.svg';
import dark from '../assets/dark.svg';
import dragon from '../assets/dragon.svg';
import electric from '../assets/electric.svg';
import fairy from '../assets/fairy.svg';
import fighting from '../assets/fighting.svg';
import flying from '../assets/flying.svg';
import ghost from '../assets/ghost.svg';
import grass from '../assets/grass.svg';
import ground from '../assets/ground.svg';
import ice from '../assets/ice.svg';
import normal from '../assets/normal.svg';
import poison from '../assets/poison.svg';
import psychic from '../assets/psychic.svg';
import rock from '../assets/rock.svg';
import steel from '../assets/steel.svg';
import water from '../assets/water.svg';

export function provideTypeIcons() {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: (iconSrv: NzIconService, dom: DomSanitizer) => {
        const icons = {
          fire,
          water,
          electric,
          bug,
          dark,
          dragon,
          fairy,
          fighting,
          flying,
          ghost,
          grass,
          ground,
          ice,
          normal,
          poison,
          psychic,
          rock,
          steel,
        };

        for (const [name, svg] of Object.entries(icons)) {
          const iconName = `type:${name}`;
          iconSrv.addIconLiteral(iconName, dom.bypassSecurityTrustHtml(svg) as string);
        }
        return null;
      },
      deps: [NzIconService, DomSanitizer]
    }
  ]);
}
