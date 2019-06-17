import Form from '../../plugins/logic/quest/Form.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() { }

    create() {
        var csvString = `type,title,description
q,Q1Title,Q1Description
,A1Title,A1Description
,A2Title,A2Description
,A3Title,A3Description`;

        var form = new Form();
        form.add(csvString);
        debugger;
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
    scene: Demo
};

var game = new Phaser.Game(config);