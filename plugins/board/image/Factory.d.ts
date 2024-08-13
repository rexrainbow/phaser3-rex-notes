import Image from './Image';
import Board from '../board/LogicBoard';
import MiniBoard from '../miniboard/MiniBoard';

export default function (
    board: Board | MiniBoard,
    tileX: number, tileY: number, tileZ?: number,
    key?: string | Phaser.Textures.Texture, frame?: string | number,
    addToBoard?: boolean
): Image;