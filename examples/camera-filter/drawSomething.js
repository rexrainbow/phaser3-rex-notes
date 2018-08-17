const Between = Phaser.Math.Between;
const GetColor = Phaser.Display.Color.GetColor;

var createStuff = function(scene) {
    var graphics = scene.add.graphics();
    var camera = scene.cameras.main;
    var w = camera.width, h = camera.height;
    for (var i = 0; i < 2000; i++) {
        graphics
            .fillStyle(GetColor(Between(0,255), Between(0,255), Between(0,255)), Math.random())
            .fillCircle(Between(0, w), Between(0, w), Between(5, 10));
    }
}

export default createStuff;