import ObjectFactory from './board/ObjectFactory.js';

import BoardFactory from './board/board/BaordFactory.js';
import HexagonFactory from './board/grid/hexagon/HexagonFactory.js';
import QuadFactory from './board/grid/quad/QuadFactory.js';
import ShapeFactory from './board/shape/ShapeFactory.js';

import MoveToFactory from './board/moveto/MoveToFactory.js';
import MatchFactory from './board/match/MatchFactory.js';
import PathFinderFactory from './board/pathfinder/PathFinderFactory.js';
import MonopolyFactory from './board/monopoly/MonopolyFactory.js';

import ChessContainer from './board/chesscontainer/chesscontainer/ChessContainerFactory.js';

class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }    
}

export default BoardPlugin;