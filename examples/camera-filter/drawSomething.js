const Between = Phaser.Math.Between;
const GetColor = Phaser.Display.Color.GetColor;

var drawSomething = function(scene) {
    var graphics = scene.add.graphics();
    var camera = scene.cameras.main;
    var w = camera.width, h = camera.height;
    for (var i = 0; i < 500; i++) {
        graphics
            .fillStyle(Between(0, 0x1000000), Math.random())
            .fillCircle(Between(0, w), Between(0, w), Between(5, 30));
    }
}

export default drawSomething;