import Label from '../label/Label';
import ConfigurationMethods from './methods/ConfigurationMethods';
import MessageMethods from './methods/MessageMethods';
import TransitionMode from './methods/TransitionMode';
import Player from '../../../plugins/logic/runcommands/tcrp/Player';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Toast extends Label {
    ignoreDestroy: any;
    messages: any;
    player: any;
    scaleX0: any;
    scaleY0: any;
    scene: any;
    setDisplayTime: any;
    setTransitInCallback: any;
    setTransitInTime: any;
    setTransitOutCallback: any;
    setTransitOutTime: any;
    setVisible: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {
                text: createDefaultTextObject(scene)
            }
        }

        super(scene, config);
        this.type = 'rexToast';

        this.setTransitInTime(GetValue(config, 'duration.in', 200));
        this.setDisplayTime(GetValue(config, 'duration.hold', 1200));
        this.setTransitOutTime(GetValue(config, 'duration.out', 200));
        this.setTransitInCallback(GetValue(config, 'transitIn', TransitionMode.popUp));
        this.setTransitOutCallback(GetValue(config, 'transitOut', TransitionMode.scaleDown));

        this.player = new Player(this, { dtMode: 1 });
        this.messages = [];
        this.scaleX0 = undefined;
        this.scaleY0 = undefined;

        this.setVisible(false);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.player.destroy();
        this.player = undefined;
        this.messages = undefined;

        super.destroy(fromScene);
    }

    setScale(scaleX?: any, scaleY?: any) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        // Can override initial scale
        this.scaleX0 = scaleX;
        this.scaleY0 = scaleY;

        super.setScale(scaleX, scaleY);
        return this;
    }

    get isShowingMessage() {
        return this.player.isPlaying;
    }
}

Object.assign(
    Toast.prototype,
    ConfigurationMethods,
    MessageMethods,
)

export default Toast;