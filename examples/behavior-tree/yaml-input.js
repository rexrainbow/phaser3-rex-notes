import 'phaser';
import ParseYaml from '../../plugins/utils/yaml/ParseYaml.js';
// import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';

var content = `
selector :
    repeat : 3
    children : 
        - task :
            if : i > 10
            name : print
            text : Hello {{name}}
        - task :
            name : print
            text : Goodbye {{name}}
`


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var doc = ParseYaml(content);
        console.log(doc);
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    // plugins: {
    //     global: [{
    //         key: 'rexBT',
    //         plugin: BehaviorTreePlugin,
    //         start: true
    //     }]
    // }
};

var game = new Phaser.Game(config);