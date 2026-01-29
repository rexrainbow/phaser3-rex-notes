import ComponentBase from '../../utils/componentbase/ComponentBase';
import { TileXYType } from '../types/Position';
import Board from '../board/Board';

export default Monopoly;

declare namespace Monopoly {

    /**
     * Sentinel value to stop pathing.
     */
    type STOP = -1;
    /**
     * Sentinel value for blocked tiles.
     */
    type BLOCKER = null;

    /**
     * Node for pathing.
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
         * Direction index.
         */
        direction: number
    }

    /**
     * Callback to compute path cost.
     */
    type CostCallbackType = (
        /**
         * Current tile node.
         */
        curTile: NodeType | null,
        /**
         * Previous tile node.
         */
        preTile: NodeType | null,
        /**
         * Monopoly instance.
         */
        pathFinder: Monopoly
    )
        => number | STOP | BLOCKER;

    /**
     * Monopoly configuration.
     */
    interface IConfig {
        /**
         * Facing direction.
         */
        face?: number,

        /**
         * Path tile z or layer.
         */
        pathTileZ?: number,
        /**
         * Fixed cost per step.
         */
        cost?: number,
        /**
         * Cost callback.
         */
        costCallback?: CostCallbackType,
        /**
         * Callback scope for cost.
         */
        costCallbackScope?: object,
    }
}

/**
 * Monopoly pathing component.
 */
declare class Monopoly<ChessType = Phaser.GameObjects.GameObject> extends ComponentBase {
    /**
     * Create a Monopoly component.
     * @param gameObject - Chess game object.
     * @param config - Monopoly configuration.
     */
    constructor(
        gameObject: ChessType,
        config?: Monopoly.IConfig
    );

    /**
     * Chess game object.
     */
    readonly gameObject: ChessType;
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
        callback: Monopoly.CostCallbackType,
        scope?: object
    ): this;

    /**
     * Set facing direction.
     * @param direction - Direction index.
     * @returns This instance.
     */
    setFace(direction: number): this;

    /**
     * Get path within moving points.
     * @param movingPoints - Moving points limit.
     * @param out - Optional output array.
     * @returns Path tile positions.
     */
    getPath(
        movingPoints: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Stop sentinel value.
     */
    readonly STOP: Monopoly.STOP;
    /**
     * Blocker sentinel value.
     */
    readonly BLOCKER: Monopoly.BLOCKER;

}
