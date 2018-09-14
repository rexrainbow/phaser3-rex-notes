import ObjectFactory from './board/ObjectFactory.js';
import BoardFactory from './board/board/BaordFactory.js';
import HexagonFactory from './board/grid/hexagon/HexagonFactory.js';
import QuadFactory from './board/grid/quad/QuadFactory.js';
import Match from './board/match/MatchFactory.js';

class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }
}

export default BoardPlugin;