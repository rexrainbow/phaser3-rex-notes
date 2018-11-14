var PushIntoBounds = function (bounds) {
    if (bounds === undefined) {
        var gameConfig = this.scene.sys.game.config;
        defaultBounds.setTo(0, 0, gameConfig.width, gameConfig.height);
        bounds = defaultBounds;
    }

    this.left = Math.max(this.left, bounds.left);
    this.right = Math.min(this.right, bounds.right);
    this.top = Math.max(this.top, bounds.top);
    this.bottom = Math.min(this.bottom, bounds.bottom);
    return this;
}

var defaultBounds = new Phaser.Geom.Rectangle();

export default PushIntoBounds;