import Board from '../board/LogicBoard';
import { TileXYType } from '../types/Position';


export interface IConfig {
    board: Board,
    wildcard?: string | number,
    dirMask?: { [dir: number]: boolean },
}

export type MatchResultType = {
    tileXY: TileXYType[],
    direction: number,

    pattern: string | number |
    (string | number)[]
}

export default class Match {
    constructor(config?: IConfig);

    setBoard(board: Board): this;
    readonly board: Board;

    refreshSymbols(
        callback: (
            tileXY: TileXYType,
            board: Board
        ) => string | number | null,
        scope?: unknown
    ): this;

    setSymbol(
        tileX: number,
        tileY: number,
        symbol: string | number | null
    ): this;

    getSymbol(
        tileX: number,
        tileY: number
    ): string | number | null;

    forEach(
        callback: (
            tileXY: TileXYType,
            symbol: string | number | null,
            board: Board
        ) => void | boolean,
        scope?: unknown
    ): this;

    setWildcard(
        symbol: string | number
    ): this;
    wildcard: string | number;

    setDirMask(
        dir: number,
        value: boolean
    ): this;

    match(
        n: number,
        callback: (
            result: {
                tileXY: TileXYType[],
                direction: number,
                pattern: string | number
            },
            board: Board
        ) => void | boolean,
        scope?: unknown
    ): this;


    match(
        n: (string | number)[],
        callback: (
            result: {
                tileXY: TileXYType[],
                direction: number,
                pattern: (string | number)[]
            },
            board: Board
        ) => void | boolean,
        scope?: unknown
    ): this;

    anyMatch(
        n: number
    ): boolean;

    anyMatch(
        n: (string | number)[]
    ): boolean;

    group(
        startTileX: number,
        startTileY: number,
        out?: TileXYType[]
    ): TileXYType[];
}