import NameValueLabel from '../namevaluelabel/NameValueLabel';
import LevelCounter from '../../../plugins/levelcounter';
import Player from '../../../plugins/logic/runcommands/tcrp/Player';
import OnLevelUp from './methods/OnLevelUp';
import ExpMethods from './methods/ExpMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ExpBar extends NameValueLabel {
    emit: any;
    getExp: any;
    ignoreDestroy: any;
    levelCounter: any;
    player: any;
    scene: any;
    setValue: any;
    totalEaseDuration: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);

        this.type = 'rexExpBar';

        this.setTotalEaseDuration(GetValue(config, 'easeDuration', 1000));

        this.levelCounter = new LevelCounter(GetValue(config, 'levelCounter'));

        this.player = new Player(this, {
            scope: this,
            dtMode: 1
        });

        this.levelCounter.on('levelup', OnLevelUp, this)

        this.player.on('complete', function() {
            this.player.clear();
            this.emit('levelup.complete', this.level, this);
        }, this);

        this.setValue(this.exp, this.getExp(this.level), this.getExp(this.level + 1));
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.levelCounter.destroy();
        this.levelCounter = undefined;

        this.player.destroy();
        this.player = undefined;

        super.destroy(fromScene);
    }

    get exp() {
        return this.levelCounter.exp;
    }

    set exp(value) {
        this.levelCounter.exp = value;
    }

    get level() {
        return this.levelCounter.level;
    }

    set level(value) {
        this.levelCounter.level = value;
    }

    get requiredExp() {
        return this.levelCounter.requiredExp;
    }

    setTotalEaseDuration(duration?: any) {
        this.totalEaseDuration = duration;
        return this;
    }
}

Object.assign(
    ExpBar.prototype,
    ExpMethods
)

export default ExpBar;