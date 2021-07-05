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
    refreshSymbols(
        callback: (tileXY: TileXYType, board: Board) => string | number | null,
        scope?: unknown
    ): this;

    setSymbol(
        tileX: number,
        tileY: number,
        symbol: string | number | null
    ): this;

    getSymbol(tileX: number,
        tileY: number
    ): string | number | null;

    forEach(
        callback: (tileXY: TileXYType, symbol: string | number | null, board: Board) => void | boolean,
        scope?: unknown
    ): this;

    setWildcard(symbol: string | number): this;
    wildcard: string | number;

    setDirMask(
        dir: number,
        value: boolean
    ): this;

    match(
        n: number |
            (string | number)[],
        callback: (result: MatchResultType, board: Board) => void | boolean,
        scope?: unknown
    ): this;

    anyMatch(
        n: number |
            (string | number)[]
    ): boolean;

    group(
        startTileX: number,
        startTileY: number,
        out?: TileXYType[]
    ): TileXYType[];
}