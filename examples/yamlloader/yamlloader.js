import phaser from 'phaser/src/phaser.js';
import YAMLLoaderPlugin from '../../plugins/yamlloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.rexYAML('configuration', '/assets/yaml/configuration.yml');
    }

    create() {
        console.log(this.cache.json.get('configuration'));
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
    plugins: {
        global: [{
            key: 'rexYAMLLoader',
            plugin: YAMLLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);