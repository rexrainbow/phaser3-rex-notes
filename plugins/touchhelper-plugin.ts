import HitTest from './utils/input/HitTest';
import IsPointerInHitArea from './utils/input/IsPointerInHitArea';
import IsPointerInBounds from './utils/input/IsPointerInBounds';
import TouchGroup from './input/touchgroup/TouchGroup';

import { Plugins as PhaserPlugins } from 'phaser';
class TouchHelperPlugin extends PhaserPlugins.BasePlugin {
    game: any;
    touchGroup: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.touchGroup = new TouchGroup(this.game);
    }

    destroy() {
        this.touchGroup.destroy();
        super.destroy();
    }

    isAtTop(groupName?: any, key?: any) {
        return this.touchGroup.isAtTop(groupName, key);
    }
}

var methods = {
    hitTest: HitTest,
    isPointerInHitArea: IsPointerInHitArea,
    isPointerInBounds: IsPointerInBounds,
};

// mixin
Object.assign(
    TouchHelperPlugin.prototype,
    methods
);

export default TouchHelperPlugin;