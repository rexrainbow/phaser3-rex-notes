// import ObjectFactory from './board/ObjectFactory.js';

import BoardFactory from './board/board/BaordFactory.js';
import HexagonFactory from './board/grid/hexagon/HexagonLogicFactory.js';
import QuadFactory from './board/grid/quad/QuadLogicFactory.js';
// import ShapeFactory from './board/shape/ShapeFactory.js';

// import MoveToFactory from './board/moveto/MoveToFactory.js';
import MatchFactory from './board/match/MatchFactory.js';
import PathFinderFactory from './board/pathfinder/PathFinderFactory.js';
import MonopolyFactory from './board/monopoly/MonopolyFactory.js';

// import MiniBoardFactory from './board/miniboard/MiniBoardFactory.js';

import HexagonMap from './board/hexagonmap/index.js';

import Board from './board/board/Board.js';
import Hexagon from './board/grid/hexagon/Hexagon-logic.js';
import Quad from './board/grid/quad/Quad-logic.js';
import Match from './board/match/Match.js';
import PathFinder from './board/pathfinder/PathFinder.js';
import Monopoly from './board/monopoly/Monopoly.js';

export {
    Board,
    Hexagon,
    Quad,
    Match,
    PathFinder,
    Monopoly,
    HexagonMap,
};