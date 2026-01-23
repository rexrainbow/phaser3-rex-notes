import Board from '../board/Board';

export default CreateBoardFromTilemap;

/**
 * Create a board from a tilemap and layers.
 * @param tilemap - Tilemap instance.
 * @param layers - Tilemap layers or layer names.
 * @returns Board instance.
 */
declare function CreateBoardFromTilemap(
    tilemap: Phaser.Tilemaps.Tilemap,
    layers?: Phaser.Tilemaps.TilemapLayer[] | Phaser.Tilemaps.TilemapLayer | string[] | string
): Board;
