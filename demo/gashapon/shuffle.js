import Gashapon from './../../src/gashapon.js';

function preload() {
}

function create() {
    var myObj = new Gashapon({
        mode: 'shuffle',  // 0|'shuffle'|1|'random
        items: {
            a:1, b:2, c:3
        }
    });

    // another way to add items:
    // var myObj = new Gashapon({mode:0});
    // myObj.addItem('a', 1).addItem('b', 2).addItem('c', 3);

    for(var i=0; i<12; i++){
        console.log(myObj.next());
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