import Gashapon from './../../src/gashapon.js';

function preload() {
}

function create() {
    var myObj = new Gashapon({
        mode: 'shuffle',  // 0|'shuffle'|1|'random
        items: {
            a:1, b:2, c:3
        },
        reload: false
    });

    for(var i=0; i<12; i++){
        console.log("Random pick: " + myObj.next());
    }

    // return null when Gashapon is empty
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