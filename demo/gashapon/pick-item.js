import Gashapon from './../../plugins/gashapon.js';

function preload() {
}

function create() {
    var gashapon = new Gashapon({
        mode: 'shuffle',  // 0|'shuffle'|1|'random
        items: {
            a:1, b:2, c:3
        },
        reload: false
    });

    console.log("Pick a: " + gashapon.next('a'));  
        
    for(var i=0; i<6; i++){
        console.log("Random pick: " + gashapon.next());
    }

    console.log("Pick a: " + gashapon.next('a'));
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