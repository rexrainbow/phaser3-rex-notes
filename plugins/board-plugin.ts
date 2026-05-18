import ObjectFactory from './board/ObjectFactory';

import BoardFactory from './board/board/Factory';
import HexagonFactory from './board/grid/hexagon/Factory';
import QuadFactory from './board/grid/quad/Factory';

import ShapeFactory from './board/shape/Factory';
import ImageFactory from './board/image/Factory';
import SpriteFactory from './board/sprite/Factory';

import MoveToFactory from './board/moveto/Factory';
import MatchFactory from './board/match/Factory';
import PathFinderFactory from './board/pathfinder/Factory';
import FieldOfViewFactory from './board/fieldofview/Factory';
import MonopolyFactory from './board/monopoly/Factory';

import MiniBoardFactory from './board/miniboard/Factory';

import HexagonMap from './board/hexagonmap/index';

import CreateTileTexture from './board/texture/CreateTileTexture';

import CreateBoardFromTilemap from './board/tilemap/CreateBoardFromTilemap';

import { Plugins as PhaserPlugins } from 'phaser';
class BoardPlugin extends PhaserPlugins.ScenePlugin {
    add: any;
    createBoardFromTilemap: any;
    createTileTexture: any;
    hexagonMap: any;
    scene: any;

    constructor(scene?: any, pluginManager?: any) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);

        // Helper functions
        this.hexagonMap = HexagonMap;
        this.createTileTexture = CreateTileTexture;
        this.createBoardFromTilemap = CreateBoardFromTilemap;
    }

    boot() {
        var eventEmitter = this.scene.sys.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        this.add.destroy();
        super.destroy();
    }
}

export default BoardPlugin;