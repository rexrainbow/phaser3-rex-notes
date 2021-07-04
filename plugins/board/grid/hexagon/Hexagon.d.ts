import { WorldXYType, TileXYType } from '../../types/Position';

type HexagonGridStaggerAxisTypes = 0 | 1 | 'y' | 'x';
type HexagonGridStaggerindexTypes = 0 | 1 | 'even' | 'odd';

export interface IConfig {
    x?: number, y?: number,
    size?: number,
    cellWidth?: number, cellHeight?: number,

    staggeraxis?: HexagonGridStaggerAxisTypes,
    staggerindex?: HexagonGridStaggerindexTypes
}

export default class Hexagon {
    constructor(config?: IConfig);

    setOriginPosition(
        worldX: number,
        worldY: number
    ): this;
    x: number;
    y: number;

    setCellSize(
        width: number,
        height: number
    ): this;
    width: number;
    height: number;
    setCellRadius(size: number): this;
    readonly size: number;

    setType(
        staggeraxis: HexagonGridStaggerAxisTypes,
        staggerindex: HexagonGridStaggerindexTypes
    ): this;
    readonly staggeraxis: number;
    readonly staggerindex: number;
    readonly mode: number;

    getWorldXY(
        tileX: number,
        tileY: number,
        out?: WorldXYType | true
    ): WorldXYType;

    getTileXY(
        worldX: number,
        worldY: number,
        out?: TileXYType | true
    ): TileXYType;
}