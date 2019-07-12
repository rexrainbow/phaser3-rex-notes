var GetDefaultBounds = function (scene) {
    var gameConfig = scene.game.config;
    defaultBounds.setTo(0, 0, gameConfig.width, gameConfig.height);
    return defaultBounds;
}
var defaultBounds = new Phaser.Geom.Rectangle();

export default GetDefaultBounds;