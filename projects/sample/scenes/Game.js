class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game'
        })

    }

    preload() {
        this.load.image('textureKey', 'assets/img.png');
    }

    create() {
        console.log('Game');
        this.add.image(300, 400, 'textureKey');
    }

    update() {}
}
export default Game;