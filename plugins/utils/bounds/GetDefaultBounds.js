var GetDefaultBounds = function (scene, out) {
    if (out === undefined) {
        if (GlobRectangle === undefined) {
            GlobRectangle = new Phaser.Geom.Rectangle();
        }
        out = GlobRectangle;
    }
    var gameConfig = scene.game.config;
    out.setTo(0, 0, gameConfig.width, gameConfig.height);
    return out;
}

var GlobRectangle;

export default GetDefaultBounds;