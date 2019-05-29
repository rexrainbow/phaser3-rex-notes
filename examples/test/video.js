class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var video = document.createElement('video');

        //video.playsinline = true;
        video.src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';
        video.width = 800;
        video.height = 450;
        video.autoplay = true;
        video.controls = false;

        var element = this.add.dom(400, 300, video);

        video.addEventListener('ended', (event) => {

            element.setVisible(false);
            element.destroy();
            element = null;
            video = null;
            console.log('video ended')

        });


        video.play();

        video.addEventListener('click', (event) => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        })
    }

    update() { }
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
    dom: {
        createContainer: true
    },
    scene: Demo,
};

var game = new Phaser.Game(config);