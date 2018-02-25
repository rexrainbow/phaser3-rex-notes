'use strict'

import GashaponPlugin from './../../plugins/gashapon-plugin.js';

function preload() {
}

function create() {
    var game = this.sys.game;
    // member of game instance
    game.gashapon = new GashaponPlugin(game, {
        mode: 'shuffle',  // 0|'shuffle'|1|'random
        items: {
            a:1, b:2, c:3
        },
        reload: false
    });

    for(var i=0; i<12; i++){
        console.log("Random pick: " + game.gashapon.next());
        console.log("Last picked item: " + game.gashapon.result);
    }        
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);