import AddViewportCoordinateProperties from './viewportcoordinate';
import { VPXYToXY } from './viewportcoordinate';

import { Plugins as PhaserPlugins } from 'phaser';
class ViewportCoordinatePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, viewport?: any, vpx?: any, vpy?: any, transformCallback?: any) {
        return AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, transformCallback);
    }

    vpxyToxy(vpx?: any, vpy?: any, viewport?: any, out?: any) {
        return VPXYToXY(vpx, vpy, viewport, out);
    }
}

export default ViewportCoordinatePlugin;