import { Game } from "phaser";
const GameClass = Game;
var IsGame = function (object) {
    return (object instanceof GameClass);
}
export default IsGame;