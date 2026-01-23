// import * as Phaser from 'phaser';
import LogicBoard from './LogicBoard';
import { TileXYZType, TileXYType } from '../types/Position';
import { Tap, Press, Swipe } from '../../gestures'

export default Board;

declare namespace Board {
    /**
     * Board config extending logic board config.
     */
    interface IConfig extends LogicBoard.IConfig { }

    /**
     * Interactive config for board input.
     */
    interface SetInteractiveIConfig {
        /**
         * True to enable interaction.
         */
        enable?: boolean;
        /**
         * True to use a touch zone.
         */
        useTouchZone?: boolean;
    }

    namespace Events {
        /**
         * Callback for a chess piece being kicked out.
         * @param chessToAdd - Chess object being added.
         * @param occupiedChess - Chess object already occupying the tile.
         * @param tileXYZ - Target tile coordinates.
         */
        type KickOutCallbackType = (
            chessToAdd: unknown,
            occupiedChess: unknown,
            tileXYZ: TileXYZType
        ) => void;

        /**
         * Callback for tile pointer down.
         * @param pointer - Pointer input.
         * @param tileXY - Tile coordinates.
         */
        type TileDownCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object pointer down.
         * @param pointer - Pointer input.
         * @param gameObject - Game object under pointer.
         */
        type GameObjectDownCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for pointer down.
         * @param pointer - Pointer input.
         */
        type PointerDownCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        /**
         * Callback for tile pointer up.
         * @param pointer - Pointer input.
         * @param tileXY - Tile coordinates.
         */
        type TileUpCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object pointer up.
         * @param pointer - Pointer input.
         * @param gameObject - Game object under pointer.
         */
        type GameObjectUpCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for pointer up.
         * @param pointer - Pointer input.
         */
        type PointerUpCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        /**
         * Callback for tile pointer move.
         * @param pointer - Pointer input.
         * @param tileXY - Tile coordinates.
         */
        type TileMoveCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object pointer move.
         * @param pointer - Pointer input.
         * @param gameObject - Game object under pointer.
         */
        type GameObjectMoveCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for pointer move.
         * @param pointer - Pointer input.
         */
        type PointerMoveCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        /**
         * Callback for tile pointer over.
         * @param pointer - Pointer input.
         * @param tileXY - Tile coordinates.
         */
        type TileOverCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object pointer over.
         * @param pointer - Pointer input.
         * @param gameObject - Game object under pointer.
         */
        type GameObjectOverCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for pointer over.
         * @param pointer - Pointer input.
         */
        type PointerOverCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        /**
         * Callback for tile pointer out.
         * @param pointer - Pointer input.
         * @param tileXY - Tile coordinates.
         */
        type TileOutCallbackType = (
            pointer: Phaser.Input.Pointer,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object pointer out.
         * @param pointer - Pointer input.
         * @param gameObject - Game object under pointer.
         */
        type GameObjectOutCallbackType = (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for pointer out.
         * @param pointer - Pointer input.
         */
        type PointerOutCallbackType = (
            pointer: Phaser.Input.Pointer
        ) => void;

        /**
         * Callback for tile tap.
         * @param tap - Tap gesture.
         * @param tileXY - Tile coordinates.
         */
        type TileTapCallbackType = (
            tap: Tap,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object tap.
         * @param tap - Tap gesture.
         * @param gameObject - Game object tapped.
         */
        type GameObjectTapCallbackType = (
            tap: Tap,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for tap.
         * @param tap - Tap gesture.
         */
        type TapCallbackType = (tap: Tap) => void;

        /**
         * Callback for tile press.
         * @param press - Press gesture.
         * @param tileXY - Tile coordinates.
         */
        type TilePressCallbackType = (
            press: Press,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object press.
         * @param press - Press gesture.
         * @param gameObject - Game object pressed.
         */
        type GameObjectPressCallbackType = (
            press: Press,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for press.
         * @param press - Press gesture.
         */
        type PressCallbackType = (press: Press) => void;

        /**
         * Callback for tile swipe.
         * @param swipe - Swipe gesture.
         * @param tileXY - Tile coordinates.
         */
        type TileSwipeCallbackType = (
            swipe: Swipe,
            tileXY: TileXYType
        ) => void;

        /**
         * Callback for game object swipe.
         * @param swipe - Swipe gesture.
         * @param gameObject - Game object swiped.
         */
        type GameObjectSwipeCallbackType = (
            swipe: Swipe,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        /**
         * Callback for swipe.
         * @param swipe - Swipe gesture.
         */
        type SwipeCallbackType = (swipe: Swipe) => void;
    }
}

/**
 * Board with input events on top of a logic board.
 *
 * ChessType usually refers to a GameObject instance, but it can be any
 * object used as a chess piece (for example, a plain data object).
 */
declare class Board<ChessType = Phaser.GameObjects.GameObject> extends LogicBoard<ChessType> {
    /**
     * Create a board with input handling.
     * @param scene - The Scene to which this board belongs.
     * @param config - Board configuration.
     */
    constructor(scene: Phaser.Scene, config?: Board.IConfig);
    /**
     * Scene that owns this board.
     */
    scene: Phaser.Scene;

    /**
     * Enable or configure interaction.
     * @param config - Interactive configuration.
     * @returns This instance.
     */
    setInteractive(config?: Board.SetInteractiveIConfig): this;
    /**
     * Enable or disable interaction.
     * @param enable - True to enable interaction.
     * @returns This instance.
     */
    setInteractive(enable?: boolean): this;

    /**
     * Get or create the touch zone.
     * @returns Touch zone game object.
     */
    getTouchZone(): Phaser.GameObjects.Zone;
    /**
     * Current touch zone.
     */
    readonly touchZone: Phaser.GameObjects.Zone;

    /**
     * Get board instance for a chess object.
     * @param chess - Chess object.
     * @returns Board instance.
     */
    chessToBoard(chess: any): Board;
    /**
     * Get board instance for a chess object.
     * @param chess - Chess object.
     * @returns Board instance.
     */
    static GetBoard(chess: any): Board;
}
