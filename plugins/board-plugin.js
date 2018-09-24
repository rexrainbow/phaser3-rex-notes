import ObjectFactory from './board/ObjectFactory.js';
import BoardFactory from './board/board/BaordFactory.js';
import HexagonFactory from './board/grid/hexagon/HexagonFactory.js';
import QuadFactory from './board/grid/quad/QuadFactory.js';
import MoveToFactory from './board/moveto/MoveToFactory.js';
import ChessGroupFactory from './board/chessgroup/ChessGroupFactory.js';
import MatchFactory from './board/match/MatchFactory.js';
import PathFinderFactory from './board/pathfinder/PathFinderFactory.js';

class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }    
}

export default BoardPlugin;