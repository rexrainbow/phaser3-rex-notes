import ComponentBase from '../../utils/componentbase/ComponentBase';
import { TileXYType } from '../types/Position';
import Board from '../board/Board';

export default PathFinder;

declare namespace PathFinder {

    /**
     * Path mode identifiers.
     */
    type PathModeTypes = 'random' | 'diagonal' | 'straight' | 'line' |
        'A*' | 'A*-random' | 'A*-line' |
        0 | 1 | 2 | 3 |
        10 | 11 | 12;

    /**
     * Node for pathfinding.
     */
    type NodeType = {
        /**
         * Tile x.
         */
        x: number,
        /**
         * Tile y.
         */
        y: number,
        /**
         * Path cost accumulated.
         */
        pathCost: number,
        /**
         * Previous nodes.
         */
        preNodes: NodeType[]
    }

    /**
     * Sentinel value for blocked tiles.
     */
    type BLOCKER = null;
    /**
     * Sentinel value for infinite cost.
     */
    type INFINITY = undefined;

    /**
     * Callback to compute path cost.
     */
    type CostCallbackType = (
        /**
         * Current tile node.
         */
        curTile: NodeType,
        /**
         * Previous tile node.
         */
        preTile: NodeType,
        /**
         * PathFinder instance.
         */
        pathFinder: PathFinder
    )
        => number | BLOCKER | INFINITY;

    /**
     * PathFinder configuration.
     */
    interface IConfig {
        /**
         * True to test for occupied tiles.
         */
        occupiedTest?: boolean,
        /**
         * True to test for blockers.
         */
        blockerTest?: boolean,

        /**
         * Fixed cost per step.
         */
        cost?: number,
        /**
         * Cost callback function.
         */
        costCallback?: CostCallbackType,
        /**
         * Callback scope for cost function.
         */
        costCallbackScope?: object,
        /**
         * True to cache path costs.
         */
        cacheCost?: boolean,

        /**
         * Path mode.
         */
        pathMode?: PathModeTypes,
        /**
         * Weight value for cost.
         */
        weight?: number,
        /**
         * True to shuffle neighbor order.
         */
        shuffleNeighbors?: boolean,
    }

}

/**
 * PathFinder component for board tiles.
 */
declare class PathFinder extends ComponentBase {
    /**
     * Create a PathFinder component.
     * @param gameObject - Chess game object.
     * @param config - PathFinder configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: PathFinder.IConfig
    );

    /**
     * Create a PathFinder component with config only.
     * @param config - PathFinder configuration.
     */
    constructor(
        config?: PathFinder.IConfig
    );

    /**
     * Set the chess game object.
     * @param gameObject - Chess game object.
     * @returns This instance.
     */
    setChess(gameObject: Phaser.GameObjects.GameObject): this;
    /**
     * Chess game object.
     */
    readonly gameObject: Phaser.GameObjects.GameObject;
    /**
     * Board instance.
     */
    readonly board: Board;

    /**
     * Set a fixed cost value.
     * @param cost - Cost value.
     * @returns This instance.
     */
    setCostFunction(cost: number): this;
    /**
     * Set a cost callback function.
     * @param callback - Cost callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    setCostFunction(
        callback: PathFinder.CostCallbackType,
        scope?: object
    ): this;

    /**
     * Set path mode.
     * @param pathMode - Path mode identifier.
     * @returns This instance.
     */
    setPathMode(
        pathMode: PathFinder.PathModeTypes
    ): this;

    /**
     * Find reachable tiles within moving points.
     * @param movingPoints - Moving points limit.
     * @param out - Optional output array.
     * @returns Array of reachable nodes.
     */
    findArea(
        movingPoints?: number | PathFinder.INFINITY,
        out?: PathFinder.NodeType[]
    ): PathFinder.NodeType[];

    /**
     * Get path to a destination tile.
     * @param endTileXY - Destination tile.
     * @returns Path nodes.
     */
    getPath(
        endTileXY: TileXYType
    ): PathFinder.NodeType[];

    /**
     * Find path to a destination tile.
     * @param endTileXY - Destination tile.
     * @param movingPoints - Moving points limit.
     * @param isClosest - True to return closest reachable.
     * @param out - Optional output array.
     * @returns Path nodes.
     */
    findPath(
        endTileXY: TileXYType,
        movingPoints?: number | PathFinder.INFINITY,
        isClosest?: boolean,
        out?: PathFinder.NodeType[]
    ): PathFinder.NodeType[];

    /**
     * Get path cost for a tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param pathCost - True to return path cost.
     * @returns Cost value.
     */
    tileXYToCost(
        tileX: number,
        tileY: number,
        pathCost?: boolean
    ): number;

    /**
     * Blocker sentinel value.
     */
    readonly BLOCKER: PathFinder.BLOCKER;
    /**
     * Infinity sentinel value.
     */
    readonly INFINITY: PathFinder.INFINITY;
}
