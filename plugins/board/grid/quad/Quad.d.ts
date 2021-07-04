import { WorldXYType, TileXYType } from '../../types/Position';

type QuadGridTypes = 0 | 1 | 'orthogonal' | 'isometric';
type QuadGridDirTypes = 4 | 8 | '4dir' | '8dir';

export interface IConfig {
    x?: number, y?: number,
    cellWidth?: number, cellHeight?: number,

    type?: QuadGridTypes,

    dir?: QuadGridDirTypes
}

export default class Quad {
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

    setType(
        type: QuadGridTypes
    ): this;
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