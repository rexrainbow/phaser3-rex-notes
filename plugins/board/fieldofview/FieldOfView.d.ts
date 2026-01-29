import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import { TileXYType } from '../types/Position';
import Board from '../board/Board';

export default FieldOfView;

declare namespace FieldOfView {

    /**
     * Cone mode identifiers.
     */
    type ConeModeType = 0 | 1 | 'direction' | 'angle';

    /**
     * Sentinel value for blocked tiles.
     */
    type BLOCKER = null;
    /**
     * Sentinel value for infinite points.
     */
    type INFINITY = undefined;

    /**
     * Callback before field-of-view test.
     */
    type PreTestCallbackType = (
        /**
         * Visible tile list.
         */
        tileXYArray: TileXYType[],
        /**
         * Available visible points.
         */
        visiblePoints: number | INFINITY,
        /**
         * FieldOfView instance.
         */
        fieldOfView: FieldOfView
    ) => boolean;

    /**
     * Callback to compute cost per tile.
     */
    type CostCallbackType = (
        /**
         * Current tile.
         */
        curTile: TileXYType,
        /**
         * FieldOfView instance.
         */
        fieldOfView: FieldOfView,
        /**
         * Visible tile list.
         */
        tileXYArray: TileXYType[]
    ) => number | BLOCKER;


    /**
     * FieldOfView configuration.
     */
    interface IConfig {
        /**
         * Facing direction or angle.
         */
        face?: number,
        /**
         * Cone angle or direction count.
         */
        cone?: number | undefined,
        /**
         * Cone mode.
         */
        coneMode?: ConeModeType,

        // pre-test 
        /**
         * True to test for occupied tiles.
         */
        occupiedTest?: boolean,
        /**
         * True to test for blockers.
         */
        blockerTest?: boolean,
        /**
         * Pre-test callback.
         */
        preTestCallback: PreTestCallbackType,
        /**
         * Callback scope for pre-test.
         */
        preTestCallbackScope?: object,

        // cost 
        /**
         * Cost callback.
         */
        costCallback: CostCallbackType,
        /**
         * Callback scope for cost.
         */
        costCallbackScope?: object,
        /**
         * Fixed cost per tile.
         */
        cost?: number,

        /**
         * True to use perspective.
         */
        perspective?: boolean,

        /**
         * Debug configuration.
         */
        debug?: {
            /**
             * Graphics object for debug drawing.
             */
            graphics: Phaser.GameObjects.Graphics,
            /**
             * Visible line color.
             */
            visibleLineColor?: number,
            /**
             * Invisible line color.
             */
            invisibleLineColor?: number,
            /**
             * True to log debug info.
             */
            log?: boolean,
        }
    }
}

/**
 * Field of view component for board tiles.
 */
declare class FieldOfView<ChessType = Phaser.GameObjects.GameObject> extends ComponentBase {
    /**
     * Create a FieldOfView component.
     * @param gameObject - Chess game object.
     * @param config - FieldOfView configuration.
     */
    constructor(
        gameObject: ChessType,
        config?: FieldOfView.IConfig
    );

    /**
     * Create a FieldOfView component with config only.
     * @param config - FieldOfView configuration.
     */
    constructor(
        config?: FieldOfView.IConfig
    );

    /**
     * Board instance.
     */
    readonly board: Board;

    /**
     * Set pre-test callback.
     * @param callback - Pre-test callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    setPreTestFunction(
        callback: FieldOfView.PreTestCallbackType,
        scope?: object
    ): this;

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
        callback: FieldOfView.CostCallbackType,
        scope?: object
    ): this;

    /**
     * Test line of sight for a target.
     * @param chess - Target chess or tile.
     * @param visiblePoints - Visible points limit.
     * @param originTileXY - Origin tile.
     * @returns True if in line of sight.
     */
    isInLOS(
        chess: ChessType | TileXYType,
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType
    ): boolean;

    /**
     * Find field of view tiles.
     * @param visiblePoints - Visible points limit.
     * @param out - Optional output array.
     * @returns Visible tile positions.
     */
    findFOV(
        visiblePoints?: number | FieldOfView.INFINITY,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Find field of view tiles from an origin.
     * @param visiblePoints - Visible points limit.
     * @param originTileXY - Origin tile.
     * @param out - Optional output array.
     * @returns Visible tile positions.
     */
    findFOV(
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Test line of sight for a target.
     * @param chess - Target chess or tile.
     * @param visiblePoints - Visible points limit.
     * @param originTileXY - Origin tile.
     * @returns True if in line of sight.
     */
    LOS(
        chess: ChessType | TileXYType,
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType
    ): boolean;

    /**
     * Filter visible chess or tiles.
     * @param chess - Array of targets.
     * @param out - Optional output array.
     * @returns Visible targets.
     */
    LOS(
        chess: (ChessType | TileXYType)[],
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];


    /**
     * Filter visible chess or tiles from an origin.
     * @param chess - Array of targets.
     * @param originTileXY - Origin tile.
     * @param out - Optional output array.
     * @returns Visible targets.
     */
    LOS(
        chess: (ChessType | TileXYType)[],
        originTileXY?: TileXYType,
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];

    /**
     * Filter visible chess or tiles with visible points.
     * @param chess - Array of targets.
     * @param visiblePoints - Visible points limit.
     * @param out - Optional output array.
     * @returns Visible targets.
     */
    LOS(
        chess: (ChessType | TileXYType)[],
        visiblePoints?: number | FieldOfView.INFINITY,
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];

    /**
     * Filter visible chess or tiles with visible points and origin.
     * @param chess - Array of targets.
     * @param visiblePoints - Visible points limit.
     * @param originTileXY - Origin tile.
     * @param out - Optional output array.
     * @returns Visible targets.
     */
    LOS(
        chess: (ChessType | TileXYType)[],
        visiblePoints?: number | FieldOfView.INFINITY,
        originTileXY?: TileXYType,
        out?: (ChessType | TileXYType)[],
    ): (ChessType | TileXYType)[];


    /**
     * Set facing direction or angle.
     * @param direction - Direction or angle.
     * @returns This instance.
     */
    setFace(direction: number): this;
    /**
     * Facing direction or angle.
     */
    face: number;

    /**
     * Clear debug graphics.
     * @returns This instance.
     */
    clearDebugGraphics(): this;
    /**
     * Set debug line colors.
     * @param visibleLineColor - Visible line color.
     * @param invisibleLineColor - Invisible line color.
     * @returns This instance.
     */
    setDebugLineColor(
        visibleLineColor?: number | undefined,
        invisibleLineColor?: number | undefined
    ): this;

    /**
     * Blocker sentinel value.
     */
    readonly BLOCKER: FieldOfView.BLOCKER;
    /**
     * Infinity sentinel value.
     */
    readonly INFINITY: FieldOfView.INFINITY;
}
