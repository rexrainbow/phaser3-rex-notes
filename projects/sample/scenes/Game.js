class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'game'
        })

    }

    preload() {
        this.load.image('classroom', 'assets/classroom.png');
    }

    create() {
        console.log('Game');
        this.add.image(400, 300, 'classroom');
    }

    update() {}
}
export default Game;