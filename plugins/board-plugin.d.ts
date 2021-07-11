// import * as Phaser from 'phaser';

import BoardFactory from './board/board/Factory.js';
import QuadGridFactory from './board/grid/quad/Factory';
import HexagonGridFactory from './board/grid/hexagon/Factory';
import ShapeFactory from './board/shape/Factory';
import MoveToFactory from './board/moveto/Factory';
import PathFinderFactory from './board/pathfinder/Factory';
import MatchFactory from './board/match/Factory';

declare class Factories {
    board: typeof BoardFactory;
    quadGrid: typeof QuadGridFactory;
    hexagonGrid: typeof HexagonGridFactory;
    shape: typeof ShapeFactory;
    moveTo: typeof MoveToFactory;
    pathFinder: typeof PathFinderFactory;
    match: typeof MatchFactory;
}

export default class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    add: Factories
}