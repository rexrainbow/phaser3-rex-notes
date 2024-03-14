import phaser from '../../../phaser/src/phaser.js';

class GreenScene extends Phaser.Scene {
    constructor() {
        super("GreenScene");
    }

    create() {
        const { width, height } = this.scale.baseSize;
        printInfo(width, height, this.scene.key);

        const rect = this.add.rectangle(0, 0, width, height, 0x008800);
        rect.setOrigin(0);

        this.add.circle(0,0, 60, 0x880000)

        this.input.once('pointerdown', () => {
            this.scene.start("RedScene")
        })
    }
}

class RedScene extends Phaser.Scene {
    constructor() {
        super("RedScene");
    }

    create() {
        const { width, height } = this.scale.baseSize;
        printInfo(width, height, this.scene.key);

        const rect = this.add.rectangle(0, 0, width, height, 0x880808);
        rect.setOrigin(0);

        this.input.once('pointerdown', () => {
            this.scene.start("YellowScene")
        })

    }
}

class YellowScene extends Phaser.Scene {
    constructor() {
        super("YellowScene");
    }

    create() {
        const { width, height } = this.scale.baseSize;
        printInfo(width, height, this.scene.key);

        const rect = this.add.rectangle(0, 0, width, height, 0x888800);
        rect.setOrigin(0);

        this.input.once('pointerdown', () => {
            this.scene.start("GreenScene")
        })

    }
}

function printInfo(w, h, s) {
    console.log(`${s} Started.`);
    console.log(`- Base Scale -`);
    console.log(`width:${w}\n`);
    console.log(`height:${h}\n`);
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        width: 1080,
        height: 1920,
        mode: Phaser.Scale.EXPAND

    },
    backgroundColor: "#888888",
    scene: [GreenScene, RedScene, YellowScene]
};

var game = new Phaser.Game(config);