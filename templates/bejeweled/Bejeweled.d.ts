import ComponentBase from '../../plugins/utils/componentbase/ComponentBase';
import Board from '../../plugins/board/board/Board';
import Match from '../../plugins/board/match/Match';
import MoveTo from '../../plugins/board/moveto/MoveTo';
import { TileXYType, TileXYZType } from '../../plugins/board/types/Position';

export default Bejeweled;

declare namespace Bejeweled {
    type SymbolType = number | string;

    interface IBoardConfig {
        x?: number, y?: number,
        cellSize?: number, cellWidth?: number, cellHeight?: number,
        width?: number, height?: number,
    }

    type ChessSymbol = number | string;

    type GenerateSymbolCallbackType = (
        board: Board,
        tileX: number, tileY: number,
        excluded: undefined | ChessSymbol[]
    ) => ChessSymbol;

    type CreateChessCallbackType = (
        board: Board
    ) => Phaser.GameObjects.GameObject;

    type SwapActionType = (
        chess1: Phaser.GameObjects.GameObject,
        chess2: Phaser.GameObjects.GameObject,
        board: Board,
        bejeweled: Bejeweled,
    ) => void;

    type EliminatingActionType = (
        chessArray: Phaser.GameObjects.GameObject[],
        board: Board,
        bejeweled: Bejeweled,
    ) => void;

    type FallingActionType = (
        board: Board,
        bejeweled: Bejeweled,
    ) => void;

    interface IMatch extends Match.IConfig {
        accept?: SymbolType[],
        ignore?: SymbolType[],
    }

    interface IConfig {
        rexBoard?: string,

        board: IBoardConfig | Board.IConfig,
        match?: IMatch,

        chess: {
            symbols: ChessSymbol[] | GenerateSymbolCallbackType,

            create: CreateChessCallbackType,

            scope?: object,

            moveTo?: MoveTo.IConfig,

            tileZ?: number | string,
        },

        swapAction?: SwapActionType,

        undoSwapAction?: SwapActionType,

        eliminatingAction?: EliminatingActionType,

        fallingAction?: FallingActionType,

        input?: boolean,

        mask?: boolean,

        debug?: boolean,

    }

    namespace Events {
        type Select1CallbackType = (board: Board, bejeweled: Bejeweled) => void;

        type Select2CallbackType = (board: Board, bejeweled: Bejeweled) => void;

        type SwapCallbackType = (
            selectedChess1: Phaser.GameObjects.GameObject,
            selectedChess2: Phaser.GameObjects.GameObject,
            board: Board, bejeweled: Bejeweled
        ) => void;

        type MatchStartCallbackType = (board: Board, bejeweled: Bejeweled) => void;

        type MatchCallbackType = (
            lines: Set<Phaser.GameObjects.GameObject>[],
            board: Board, bejeweled: Bejeweled
        ) => void;

        type EliminateCallbackType = (
            chessArray: Phaser.GameObjects.GameObject[],
            board: Board, bejeweled: Bejeweled
        ) => void;

        type FallCallbackType = (board: Board, bejeweled: Bejeweled) => void;

        type FillCallbackType = (board: Board, bejeweled: Bejeweled) => void;

        type MatchEndCallbackType = (board: Board, bejeweled: Bejeweled) => void;

        type UndoSwapCallbackType = (
            selectedChess1: Phaser.GameObjects.GameObject,
            selectedChess2: Phaser.GameObjects.GameObject,
            board: Board, bejeweled: Bejeweled
        ) => void;

        type SetDataCallback = (
            bejeweled: Bejeweled,
            key: string, value: any
        ) => void;

        type ChangeetAnyDataCallback = (
            bejeweled: Bejeweled,
            key: string, value: any, previousValue: any
        ) => void;

        type ChangeetDataCallback = (
            bejeweled: Bejeweled,
            value: any, previousValue: any
        ) => void;
    }
}

declare class Bejeweled extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: Bejeweled.IConfig
    );

    start(): this;

    setInputEnable(enable?: boolean): this;

    worldXYToChess(
        worldX: number,
        worldY: number
    ): Phaser.GameObjects.GameObject;

    tileXYToChess(
        tileX: number,
        tileY: number
    ): Phaser.GameObjects.GameObject;

    getNeighborChessAtAngle(
        chess: Phaser.GameObjects.GameObject | TileXYType,
        angle: number
    ): Phaser.GameObjects.GameObject;

    getNeighborChessAtDirection(
        chess: Phaser.GameObjects.GameObject | TileXYType,
        direction: number
    ): Phaser.GameObjects.GameObject;

    getChessArray(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getChessArrayAtTileX(
        tileX: number,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getChessArrayAtTileY(
        tileY: number,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getChessArrayWithinTileRadius(
        tileX: number, tileY: number, rangeX: number, rangeY: number,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getChessArrayWithSymbol(
        symbol: Bejeweled.ChessSymbol,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getSymbolAt(
        tileX: number, tileY: number
    ): Bejeweled.ChessSymbol;
    getSymbolAt(
        chess: Phaser.GameObjects.GameObject
    ): Bejeweled.ChessSymbol;

    setSymbolAt(
        tileX: number, tileY: number,
        newSymbol: Bejeweled.ChessSymbol
    ): this;
    setSymbolAt(
        chess: Phaser.GameObjects.GameObject,
        newSymbol: Bejeweled.ChessSymbol
    ): this;

    isAwaitingInput(): boolean;

    dumpSymbols(): any[][];

    loadSymbols(symbols?: any[][]): this;

    selectChess1(
        chess: Phaser.GameObjects.GameObject
    ): this;
    getSelectedChess1(): Phaser.GameObjects.GameObject;

    selectChess2(
        chess: Phaser.GameObjects.GameObject
    ): this;
    getSelectedChess2(): Phaser.GameObjects.GameObject;

    getChessMoveTo(
        chess: Phaser.GameObjects.GameObject
    ): MoveTo | undefined;

    getChessTileZ(): number | string;

    setMatchAcceptList(acceptList?: Bejeweled.SymbolType[]): this;
    setMatchIgnoreList(ignoreList?: Bejeweled.SymbolType[]): this;

    getBoardBounds(
        out?: Phaser.Geom.Rectangle
    ): Phaser.Geom.Rectangle;

    getBoard(): Board;
    getMatch(): Match;
    getLayer(): Phaser.GameObjects.Layer;

    // Custom eliminateChess, falling action
    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName?: string
    ): this;
    isWaitingEvent(): boolean;

    // Data manager
    setDataEnabled(): this;
    setData(key: string, value: any): this;
    incData(key: string, value: number): this;
    toggleData(key: string): this;
    getData(key: string): any;
    data: Phaser.Data.DataManager;

    // Other commands
    runMatch3(): this;

}