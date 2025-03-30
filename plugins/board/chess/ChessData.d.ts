import ComponentBase from '../../utils/componentbase/ComponentBase';
import Board from '../board/LogicBoard';

export default ChessData;

declare class ChessData<BoardType=Board> extends ComponentBase {
    readonly $uid: number;

    readonly board: BoardType;

    readonly tileXYZ: { x: number, y: number, z: number };

    setTileZ(tileZ: number): this;

    getTileDirection(tileX: number, tileY: number): this;

    setBlocker(value?: boolean): this;


}
