import LoaderCallback from './parse/utils/preload/LoaderCallback';
import ObjectFactory from './parse/ObjectFactory';
import PageLoaderFactory from './parse/pageloader/Factory'
import ItemTableFactory from './parse/itemtable/Factory';
import LeaderBoardFactory from './parse/leaderboard/Factory';
import QuickLogin from './parse/quicklogin/QuickLogin';

import { Plugins as PhaserPlugins } from 'phaser';
class ParsePlugin extends PhaserPlugins.BasePlugin {
    add: any;
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    preload(scene?: any, url?: any) {
        LoaderCallback.call(scene.sys.load, url);
        return this;
    }
}

var methods = {
    quickLogin: QuickLogin
}
Object.assign(
    ParsePlugin.prototype,
    methods
);

export default ParsePlugin;