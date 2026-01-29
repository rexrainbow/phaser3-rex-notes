import Board from '../board/Board';

/**
 * Create a tile texture for a board.
 * @param board - Board instance.
 * @param key - Texture key.
 * @param fillStyle - Fill color value.
 * @param strokeStyle - Stroke color value.
 * @param lineWidth - Stroke line width.
 * @param lineJoin - Stroke line join style.
 */
export default function CreateTileTexture(
    board: Board,
    key: string,
    fillStyle: number | string | undefined,
    strokeStyle?: number | string | undefined,
    lineWidth?: number,
    lineJoin?: 'round' | 'bevel' | 'miter'
): void;

/**
 * Create a tile texture for a board.
 * @param board - Board instance.
 * @param key - Texture key.
 * @param fillStyle - Fill color value.
 * @param strokeStyle - Stroke color value.
 * @param lineWidth - Stroke line width.
 * @param overlapGrid - True to overlap grid lines.
 * @param lineJoin - Stroke line join style.
 */
export default function CreateTileTexture(
    board: Board,
    key: string,
    fillStyle: number | string | undefined,
    strokeStyle?: number | string | undefined,
    lineWidth?: number,
    overlapGrid?: boolean,
    lineJoin?: 'round' | 'bevel' | 'miter'
): void;
