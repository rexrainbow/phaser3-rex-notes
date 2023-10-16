import NameValueLabel from '../namevaluelabel/NameValueLabel.js';
import LevelCounter from '../../../plugins/levelcounter.js';
import Player from '../../../plugins/logic/runcommands/tcrp/Player.js';
import OnLevelUp from './methods/OnLevelUp.js';
import ExpMethods from './methods/ExpMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ExpBar extends NameValueLabel {
    constructor(scene, config) {
        super(scene, config);

        this.type = 'rexExpBar';

        this.setTotalEaseDuration(GetValue(config, 'easeDuration', 1000));

        this.levelCounter = new LevelCounter(GetValue(config, 'levelCounter'));

        this.player = new Player(this, {
            scope: this,
            dtMode: 1
        });

        this.levelCounter.on('levelup', OnLevelUp, this)

        this.player.on('complete', function () {
            this.player.clear();
            this.emit('levelup.complete', this.level, this);
        }, this);

        this.setValue(this.exp, this.getExp(this.level), this.getExp(this.level + 1));
    }

    destroy(fromScene) {
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

    setTotalEaseDuration(duration) {
        this.totalEaseDuration = duration;
        return this;
    }
}

Object.assign(
    ExpBar.prototype,
    ExpMethods
)

export default ExpBar;