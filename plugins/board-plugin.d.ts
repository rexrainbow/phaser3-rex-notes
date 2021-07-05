
import BoardFactory from './board/board/Factory.js';
import QuadGridFactory from './board/grid/quad/Factory';
import HexagonGridFactory from './board/grid/hexagon/Factory';
import ShapeFactory from './board/shape/Factory';

declare class Factories {
    board: typeof BoardFactory;
    quadGrid: typeof QuadGridFactory;
    hexagonGrid: typeof HexagonGridFactory;
    shape: typeof ShapeFactory;

}

export default class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    add: Factories
}


// Export class definitions
import Board from './board/board/Board';
import Hexagon from './board/grid/hexagon/Hexagon';
import Quad from './board/grid/quad/Quad';
import Shape from './board/shape/Shape';

export {
    Board,
    Hexagon,
    Quad,
    Shape,
}
