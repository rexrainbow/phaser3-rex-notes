var GetDefaultBounds = function (scene) {
    var gameConfig = scene.sys.game.config;
    defaultBounds.setTo(0, 0, gameConfig.width, gameConfig.height);
    return defaultBounds;
}
var defaultBounds = new Phaser.Geom.Rectangle();

export default GetDefaultBounds;