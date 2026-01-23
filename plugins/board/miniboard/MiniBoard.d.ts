import Container from '../../gameobjects/container/containerlite/ContainerLite';
import Quad from '../grid/quad/Quad';
import Hexagon from '../grid/hexagon/Hexagon';
import { TileXYZType } from '../types/Position';
import Board from '../board/Board';
import Rectangle from '../../utils/geom/rectangle/Rectangle';

export default MiniBoard;

declare namespace MiniBoard {

    /**
     * Callback to test if a piece can be put on the board.
     */
    type PutTestCallbackType = (
        /**
         * Target tile coordinates.
         */
        targetTileXY: TileXYZType,
        /**
         * Main board instance.
         */
        mainBoard: Board,
        /**
         * Chess game object.
         */
        chess: Phaser.GameObjects.GameObject
    ) => boolean;

    /**
     * MiniBoard configuration.
     */
    interface IConfig {
        /**
         * Grid instance.
         */
        grid: Quad | Hexagon,

        /**
         * True to enable dragging.
         */
        draggable?: boolean,
        /**
         * Facing direction.
         */
        face?: number,

        /**
         * Put test callback.
         */
        putTestCallback?: PutTestCallbackType,
        /**
         * Callback scope for put test.
         */
        putTestCallbackScpe?: unknown,
    }

    /**
     * Mirror mode identifiers.
     */
    type MirrorModeType = 0 | 1 | 3 | 'x' | 'y' | 'x&y';

    /**
     * Map of chess uid to tile coordinates.
     */
    type TileXYZMapType = { [uid: number]: TileXYZType };

    namespace Events {
        /**
         * Callback for pointer down on the mini board.
         */
        type PointerDownCallbackType = (
            /**
             * Pointer input.
             */
            pointer: Phaser.Input.Pointer,
            /**
             * MiniBoard instance.
             */
            miniBoard: MiniBoard
        ) => void;

        /**
         * Callback for pointer down on a chess piece.
         */
        type ChessDownCallbackType = (
            /**
             * Pointer input.
             */
            pointer: Phaser.Input.Pointer,
            /**
             * Chess game object.
             */
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for pointer up on the mini board.
         */
        type PointerUpCallbackType = (
            /**
             * Pointer input.
             */
            pointer: Phaser.Input.Pointer,
            /**
             * MiniBoard instance.
             */
            miniBoard: MiniBoard
        ) => void;

        /**
         * Callback for pointer up on a chess piece.
         */
        type ChessUpCallbackType = (
            /**
             * Pointer input.
             */
            pointer: Phaser.Input.Pointer,
            /**
             * Chess game object.
             */
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for pointer move on the mini board.
         */
        type PointerMoveCallbackType = (
            /**
             * Pointer input.
             */
            pointer: Phaser.Input.Pointer,
            /**
             * MiniBoard instance.
             */
            miniBoard: MiniBoard
        ) => void;

        /**
         * Callback for pointer move on a chess piece.
         */
        type ChessMoveCallbackType = (
            /**
             * Pointer input.
             */
            pointer: Phaser.Input.Pointer,
            /**
             * Chess game object.
             */
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for dragging.
         */
        type DragCallbackType = (
            /**
             * Pointer input.
             */
            pointer: Phaser.Input.Pointer,
            /**
             * Drag x position.
             */
            dragX: number,
            /**
             * Drag y position.
             */
            dragY: number
        ) => void;
    }
}

/**
 * Mini board container for chess pieces.
 */
declare class MiniBoard extends Container {
    /**
     * Create a MiniBoard.
     * @param scene - The Scene to which this MiniBoard belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param config - MiniBoard configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config?: MiniBoard.IConfig
    );

    /**
     * Set facing direction.
     * @param direction - Direction index.
     * @returns This instance.
     */
    setFace(direction: number): this;
    /**
     * Facing direction.
     */
    face: number;

    /**
     * Add a chess piece.
     * @param chess - Chess game object.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z or layer.
     * @returns This instance.
     */
    addChess(
        chess: Phaser.GameObjects.GameObject,
        tileX: number,
        tileY: number,
        tileZ: number | string
    ): this;

    /**
     * Remove a chess piece by instance.
     * @param chess - Chess game object.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z or layer.
     * @param destroy - True to destroy chess.
     * @returns This instance.
     */
    removeChess(
        chess: Phaser.GameObjects.GameObject,
        tileX?: null,
        tileY?: null,
        tileZ?: null,
        destroy?: boolean
    ): this;
    /**
     * Remove a chess piece by tile position.
     * @param chess - Null to remove by tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z or layer.
     * @param destroy - True to destroy chess.
     * @returns This instance.
     */
    removeChess(
        chess: null,
        tileX: number,
        tileY: number,
        tileZ: number | string,
        destroy?: boolean
    ): this;

    /**
     * Remove all chess pieces.
     * @param destroy - True to destroy chess.
     * @returns This instance.
     */
    removeAllChess(
        destroy?: boolean
    ): this;

    /**
     * Get all chess pieces.
     * @param out - Optional output array.
     * @returns Chess array.
     */
    getAllChess(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Set origin.
     * @param originX - Origin x.
     * @param originY - Origin y.
     * @returns This instance.
     */
    setOrigin(
        originX: number,
        originY?: number
    ): this;
    /**
     * Set origin by preset name.
     * @param origin - Origin preset.
     * @returns This instance.
     */
    setOrigin(
        origin: 'center' | 'top-left' | 'left-top'
    ): this;

    /**
     * Set put test callback.
     * @param callback - Put test callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    setPutTestCallback(
        callback: MiniBoard.PutTestCallbackType,
        scope?: object
    ): this;

    /**
     * Test if this board can be put on the main board.
     * @param mainBoard - Main board instance.
     * @param tileX - Target tile x.
     * @param tileY - Target tile y.
     * @param chessTileXYMap - Optional chess tile map.
     * @returns True if the board can be placed.
     */
    canPutOnMainBoard(
        mainBoard: Board,
        tileX?: number,
        tileY?: number,
        chessTileXYMap?: MiniBoard.TileXYZMapType,
    ): boolean;
    /**
     * Put on the main board.
     * @param mainBoard - Main board instance.
     * @param tileX - Target tile x.
     * @param tileY - Target tile y.
     * @param align - True to align to the tile.
     * @returns This instance.
     */
    putOnMainBoard(
        mainBoard: Board,
        tileX?: number,
        tileY?: number,
        align?: boolean
    ): this;
    /**
     * Pull out from the main board.
     * @returns This instance.
     */
    pullOutFromMainBoard(): this;
    /**
     * Put back to original state.
     * @returns This instance.
     */
    putBack(): this;

    /**
     * Test if overlapping with the main board.
     * @param mainBoard - Main board instance.
     * @returns True if overlapping.
     */
    isOverlapping(
        mainBoard: Board
    ): boolean;

    /**
     * Align this board to the main board.
     * @param mainBoard - Main board instance.
     * @param tileX - Target tile x.
     * @param tileY - Target tile y.
     * @returns This instance.
     */
    alignToMainBoard(
        mainBoard: Board,
        tileX?: number,
        tileY?: number
    ): this;

    /**
     * Main board instance.
     */
    readonly mainBoard: Board;
    /**
     * Current tile x on main board.
     */
    readonly tileX: number;
    /**
     * Current tile y on main board.
     */
    readonly tileY: number;
    /**
     * Grid instance.
     */
    readonly grid: Quad | Hexagon;

    /**
     * Test if rotation is allowed.
     * @param n - Rotation steps.
     * @returns True if rotation is allowed.
     */
    canRotate(n: number): boolean;
    /**
     * Test if rotation to a direction is allowed.
     * @param direction - Direction index.
     * @returns True if rotation is allowed.
     */
    canRotateTo(direction: number): boolean;
    /**
     * Rotate by steps.
     * @param n - Rotation steps.
     * @returns This instance.
     */
    rotate(n: number): this;
    /**
     * Rotate to a direction.
     * @param direction - Direction index.
     * @returns This instance.
     */
    rotateTo(direction: number): this;

    /**
     * Test if mirroring is allowed.
     * @param mode - Mirror mode.
     * @returns True if mirroring is allowed.
     */
    canMirror(
        mode: MiniBoard.MirrorModeType
    ): boolean;
    /**
     * Mirror the board.
     * @param mode - Mirror mode.
     * @returns This instance.
     */
    mirror(
        mode: MiniBoard.MirrorModeType
    ): this;

    /**
     * Result of the last transfer attempt.
     */
    readonly lastTransferResult: boolean;

    /**
     * Enable or disable interaction.
     * @param enable - True to enable interaction.
     * @returns This instance.
     */
    setInteractive(enable?: boolean): this;

    /**
     * Enable or disable dragging.
     * @param enable - True to enable dragging.
     * @returns This instance.
     */
    setDragEnable(enable?: boolean): this;

    /**
     * Get bounds of the MiniBoard.
     * @param output - Optional output object.
     * @returns Bounds rectangle.
     */
    getBounds<O extends Rectangle>(output?: O): O;
}
