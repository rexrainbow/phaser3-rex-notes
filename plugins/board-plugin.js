import ObjectFactory from './board/ObjectFactory.js';
import BoardFactory from './board/board/BaordFactory.js';
import HexagonFactory from './board/grid/HexagonFactory.js';
import QuadFactory from './board/grid/QuadFactory.js';

class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }
}

export default BoardPlugin;