import Board from './Board';

export default function (
    config?: Board.IConfig
): Board;

declare global {
    namespace RexPlugins.Board.Board {
        const Board: Board;
    }
}