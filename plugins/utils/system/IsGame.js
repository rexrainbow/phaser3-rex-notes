import { Game as PhaserGame } from 'phaser';
const GameClass = PhaserGame;
var IsGame = function (object) {
    return (object instanceof GameClass);
}
export default IsGame;