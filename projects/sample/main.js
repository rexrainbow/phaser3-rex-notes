import Boot from './scenes/Boot.js';
import Game from './scenes/Game.js';

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 600,
    height: 800,
    scene: [Boot, Game]
};

var game = new Phaser.Game(config);