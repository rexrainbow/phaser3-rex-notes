import 'phaser';
import ParseYaml from '../../plugins/utils/yaml/ParseYaml.js';
// import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';

var content = `
selector :
    repeat : 3
    children : 
        - sequence :
            cooldown : 1000
            children : 
                - task :
                    name : print
                    text : B0.Start : {{$currentTime}}
                - wait : 500
                - task :
                    name : print
                    text : B0.End : {{$currentTime}}
        - sequence :
            children : 
                - task :
                    name : print
                    text : B1.Start : {{$currentTime}}
                - wait : 1000
                - task :
                    name : print
                    text : B1.End : {{$currentTime}}
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