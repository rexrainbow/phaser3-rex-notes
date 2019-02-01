class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.mushrooms;
    }

    preload() {
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        this.mushrooms = this.add.group();
        for (var i = 0; i < 20; i++) {
            var inst = this.add.image(
                Phaser.Math.Between(0, 800),
                Phaser.Math.Between(0, 600),
                'arrow');
            this.mushrooms.add(inst);
        }
        
        var allInsts = this.mushrooms.getChildren();
        var picked = allInsts.filter(function(inst){ return (inst.x > 400);});
        Phaser.Actions.SetTint(picked, 0xff0000);

    }

    update() {}
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