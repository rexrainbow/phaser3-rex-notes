class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        })

    }

    preload() {
    }

    create() {
        console.log('Boot');
        this.scene.start('game');  // Shutdown this Scene and run the given one 
        // See more : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/#start-scene        
    }

    update() {}
}
export default Boot;