import { TileXYType } from '../types/Position';
import Board from '../board/LogicBoard';

/**
 * Get a parallelogram-shaped tile map.
 * @param board - Board instance.
 * @param type - Parallelogram type.
 * @param width - Width in tiles.
 * @param height - Height in tiles.
 * @param out - Optional output array.
 * @returns Tile positions in the map.
 */
export default function GetParallelogramMap(
    board: Board,
    type: 0 | 1 | 2,
    width: number,
    height: number,
    out?: TileXYType[]
): TileXYType[];
