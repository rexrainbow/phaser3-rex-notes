import NameValueLabel from '../namevaluelabel/NameValueLabel.js';
import LevelCounter from '../../../plugins/levelcounter.js';
import Player from '../../../plugins/logic/runcommands/tcrp/Player.js';
import ExpMethods from './methods/ExpMethods.js';

class ExpBar extends NameValueLabel {
    constructor(scene, config) {
        super(scene, config);

        this.type = 'rexExpBar';

        this.levelCounter = new LevelCounter(config);

        this.player = new Player(this, { dtMode: 1 });
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
}

Object.assign(
    ExpBar.prototype,
    ExpMethods
)

export default ExpBar;