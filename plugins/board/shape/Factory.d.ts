import Shape from './Shape';
import Board from '../board/LogicBoard';

export default function (
    board: Board,
    tileX: number, tileY: number, tileZ?: number,
    fillColor?: number | null, fillAlpha?: number | null,
    addToBoard?: boolean
): Shape;