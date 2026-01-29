import TickTask from '../../utils/componentbase/TickTask';
import { TileXYType, TileXYZType } from '../types/Position';
import Board from '../board/Board';


export default MoveTo;

declare namespace MoveTo {

    /**
     * Callback to test if a move is allowed.
     */
    type MoveableTestCallbackType = (
        /**
         * Source tile coordinates.
         */
        fromTileXYZ: TileXYZType,
        /**
         * Destination tile coordinates.
         */
        toTileXYZ: TileXYZType,
        /**
         * Direction from source to destination.
         */
        direction: number,
        /**
         * Board instance.
         */
        board: Board
    ) => boolean;

    /**
     * MoveTo configuration.
     */
    interface IConfig {
        /**
         * Move speed in tiles per second.
         */
        speed?: number,
        /**
         * True to rotate toward the target.
         */
        rotateToTarget?: boolean,

        /**
         * True to test for occupied tiles.
         */
        occupiedTest?: boolean,
        /**
         * True to test for blockers.
         */
        blockerTest?: boolean,
        /**
         * Custom moveable test callback.
         */
        moveableTest?: MoveableTestCallbackType,
        /**
         * Callback scope for moveable test.
         */
        moveableTestScope?: object,

        /**
         * True to sneak and avoid occupancy checks.
         */
        sneak?: boolean,
    }

    namespace Events {
        /**
         * Callback when a move completes.
         */
        type CompleteCallbackType = (
            /**
             * Game object being moved.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * MoveTo component.
             */
            moveTo: MoveTo
        ) => void;

        /**
         * Callback when attempting to occupy a tile.
         */
        type OccupyCallbackType = (
            /**
             * Chess already occupying the tile.
             */
            occupiedGameObject: Phaser.GameObjects.GameObject,
            /**
             * Game object being moved.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * MoveTo component.
             */
            moveTo: MoveTo
        ) => void;
    }
}

/**
 * Move a chess piece between board tiles.
 */
declare class MoveTo<ChessType = Phaser.GameObjects.GameObject> extends TickTask {
    /**
     * Create a MoveTo component.
     * @param gameObject - Chess game object.
     * @param config - MoveTo configuration.
     */
    constructor(
        gameObject: ChessType,
        config?: MoveTo.IConfig
    );

    /**
     * Move to tile coordinates.
     * @param tileX - Destination tile x.
     * @param tileY - Destination tile y.
     * @returns This instance.
     */
    moveTo(
        tileX: number,
        tileY: number
    ): this;
    /**
     * Move to a tile position.
     * @param tileXY - Destination tile coordinates.
     * @returns This instance.
     */
    moveTo(tileXY: TileXYType): this;

    /**
     * Move toward a direction.
     * @param direction - Direction index.
     * @returns This instance.
     */
    moveToward(direction: number): this;

    /**
     * Move to a random neighbor tile.
     * @returns This instance.
     */
    moveToRandomNeighbor(): this;

    /**
     * Move away from a tile coordinate.
     * @param tileX - Target tile x.
     * @param tileY - Target tile y.
     * @returns This instance.
     */
    moveAway(
        tileX: number,
        tileY: number
    ): this;
    /**
     * Move away from a tile position.
     * @param tileXY - Target tile coordinates.
     * @returns This instance.
     */
    moveAway(tileXY: TileXYType): this;

    /**
     * Move closer to a tile coordinate.
     * @param tileX - Target tile x.
     * @param tileY - Target tile y.
     * @returns This instance.
     */
    moveCloser(
        tileX: number,
        tileY: number
    ): this;
    /**
     * Move closer to a tile position.
     * @param tileXY - Target tile coordinates.
     * @returns This instance.
     */
    moveCloser(tileXY: TileXYType): this;

    /**
     * Test if a tile is movable.
     * @param tileX - Destination tile x.
     * @param tileY - Destination tile y.
     * @returns True if the move is allowed.
     */
    canMoveTo(tileX: number, tileY: number): boolean;

    /**
     * Result of the last move attempt.
     */
    readonly lastMoveResult: boolean;

    /**
     * Destination tile x.
     */
    readonly destinationTileX: number;
    /**
     * Destination tile y.
     */
    readonly destinationTileY: number;
    /**
     * Destination direction.
     */
    readonly destinationDirection: number;

    /**
     * Enable or disable this component.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Set move speed.
     * @param speed - Speed value.
     * @returns This instance.
     */
    setSpeed(speed: number): this;
    /**
     * Move speed value.
     */
    speed: number;

    /**
     * Time scale factor.
     */
    timeScale: number;

    /**
     * Enable or disable rotate-to-target.
     * @param enable - True to rotate to target.
     * @returns This instance.
     */
    setRotateToTarget(enable?: boolean): this;
    /**
     * True to rotate to target.
     */
    rotateToTarget: boolean;

    /**
     * Enable or disable sneak mode.
     * @param enable - True to enable sneak.
     * @returns This instance.
     */
    setSneakEnable(enable?: boolean): this;

    /**
     * Enable or disable occupied test.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setOccupiedTest(enable?: boolean): this;
    /**
     * True to test occupied tiles.
     */
    occupiedTest: boolean;
    /**
     * Enable or disable blocker test.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setBlockerTest(enable?: boolean): this;
    /**
     * True to test blockers.
     */
    blockerTest: boolean;
    /**
     * Enable or disable edge blocker test.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEdgeBlockerTest(enable?: boolean): this;
    /**
     * True to test edge blockers.
     */
    edgeBlockerTest: boolean;

    /**
     * Set moveable test callback.
     * @param callback - Moveable test callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    setMoveableTestCallback(
        callback: MoveTo.MoveableTestCallbackType,
        scope?: object
    ): this;
}
