import Gashapon from './../../plugins/gashapon.js';

function preload() {
}

function create() {
    var gashapon = new Gashapon({
        mode: 'shuffle',  // 0|'shuffle'|1|'random
        items: {
            a:1, b:2, c:3
        }
    });

    gashapon.eachItem(function(name, count){
        console.log(name + ": " + count);
    });
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