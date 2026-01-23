import { TileXYType } from '../types/Position';
import Board from '../board/LogicBoard';

/**
 * Get a hexagon-shaped tile map.
 * @param board - Board instance.
 * @param radius - Hexagon radius.
 * @param out - Optional output array.
 * @returns Tile positions in the map.
 */
export default function GetHexagonMap(
    board: Board,
    radius: number,
    out?: TileXYType[]
): TileXYType[];
