import MarkdownVisualNovel from './MarkdownVisualNovel.js';
import CSV2MD from '../../plugins/logic/eventsheets/markedeventsheets/CSV2MD.js';

class MarkdownVisualNovelPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new MarkdownVisualNovel(scene, config);
    }
}

var methods = {
    csv2md: CSV2MD
}

Object.assign(
    MarkdownVisualNovelPlugin.prototype,
    methods,
)

export default MarkdownVisualNovelPlugin;