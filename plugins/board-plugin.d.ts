// import * as Phaser from 'phaser';

import BoardFactory from './board/board/Factory';
import QuadGridFactory from './board/grid/quad/Factory';
import HexagonGridFactory from './board/grid/hexagon/Factory';

import ShapeFactory from './board/shape/Factory';
import ImageFactory from './board/image/Factory';
import SpriteFactory from './board/sprite/Factory';

import MoveToFactory from './board/moveto/Factory';
import PathFinderFactory from './board/pathfinder/Factory';
import MatchFactory from './board/match/Factory';
import FieldOfViewFactory from './board/fieldofview/Factory';
import MonopolyFactory from './board/monopoly/Factory';
import MiniBoardFactory from './board/miniboard/Factory';

import HexagonMap from './board/hexagonmap/index';
import CreateTileTexture from './board/texture/CreateTileTexture';
import CreateBoardFromTilemap from './board/tilemap/CreateBoardFromTilemap';

export default BoardPlugin;

declare class Factories {
    board: typeof BoardFactory;
    quadGrid: typeof QuadGridFactory;
    hexagonGrid: typeof HexagonGridFactory;

    shape: typeof ShapeFactory;
    image: typeof ImageFactory;
    sprite: typeof SpriteFactory;

    moveTo: typeof MoveToFactory;
    pathFinder: typeof PathFinderFactory;
    match: typeof MatchFactory;
    fieldOfView: typeof FieldOfViewFactory;
    monopoly: typeof MonopolyFactory;
    miniBoard: typeof MiniBoardFactory;
}

declare class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    add: Factories;

    hexagonMap: HexagonMap;
    createTileTexture: typeof CreateTileTexture;
    createBoardFromTilemap: typeof CreateBoardFromTilemap;
}

import BoardClass from './board/board/Board';
import HexagonClass from './board/grid/hexagon/Hexagon';
import QuadClass from './board/grid/quad/Quad';

import ShapeClass from './board/shape/Shape';
import ImageClass from './board/image/Image';
import SpriteClass from './board/sprite/Sprite';

import MoveToClass from './board/moveto/MoveTo';
import MatchClass from './board/match/Match';
import PathFinderClass from './board/pathfinder/PathFinder';
import FieldOfViewClass from './board/fieldofview/FieldOfView';
import MonopolyClass from './board/monopoly/Monopoly';
import MiniBoardClass from './board/miniboard/MiniBoard';

declare namespace BoardPlugin {
    type Board = BoardClass;
    type Quad = QuadClass;
    type Hexagon = HexagonClass;

    type Shape = ShapeClass;
    type Image = ImageClass;
    type Sprite = SpriteClass;

    type MoveTo = MoveToClass;
    type Match = MatchClass;
    type PathFinder = PathFinderClass;
    type FieldOfView = FieldOfViewClass;
    type Monopoly = MonopolyClass;
    type MiniBoard = MiniBoardClass;
}