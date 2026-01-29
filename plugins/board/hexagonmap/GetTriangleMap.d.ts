import { TileXYType } from '../types/Position';
import Board from '../board/LogicBoard';

/**
 * Get a triangle-shaped tile map.
 * @param board - Board instance.
 * @param type - Triangle type.
 * @param height - Height in tiles.
 * @param out - Optional output array.
 * @returns Tile positions in the map.
 */
export default function GetTriangleMap(
    board: Board,
    type: 0 | 1,
    height: number,
    out?: TileXYType[]
): TileXYType[];
