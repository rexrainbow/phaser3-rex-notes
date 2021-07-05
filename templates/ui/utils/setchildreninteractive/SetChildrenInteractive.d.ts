// import * as Phaser from 'phaser';
import { IConfig as IConfigClick } from '../../../../plugins/button';
import { IConfig as IConfigTap } from '../../../../plugins/input/gestures/tap/Tap';
import { IConfig as IConfigPress } from '../../../../plugins/input/gestures/press/Press';
import { IConfig as IConfigSwipe } from '../../../../plugins/input/gestures/swipe/Swipe';


export interface IConfig {
    targets?: Phaser.GameObjects.GameObject[],

    click?: IConfigClick | boolean,
    over?: {} | boolean,
    tap?: IConfigTap | boolean,
    press?: IConfigPress | boolean,
    swipe?: IConfigSwipe | boolean,

    inputEventPrefix?: string,
    eventEmitter?: Phaser.Events.EventEmitter,
}

export default function SetChildrenInteractive(
    gameObject: Phaser.GameObjects.GameObject,
    config?: IConfig
): Phaser.GameObjects.GameObject;