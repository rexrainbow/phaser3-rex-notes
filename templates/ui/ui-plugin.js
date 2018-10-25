
import ObjectFactory from './ObjectFactory.js';
import LabelFactory from './label/LabelFactory.js';
import ListFactory from './list/ListFactory.js';

class UIPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }        
}

export default UIPlugin;