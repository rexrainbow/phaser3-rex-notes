const Components = Phaser.Physics.Arcade.Components;

var BuildArcadeObject = function (gameObject, isStatic) {
    if (!gameObject.body) {
        if (isStatic === undefined) {
            isStatic = false;
        }
        gameObject.scene.physics.add.existing(gameObject, isStatic);
    }

    Object.assign(gameObject,
        Components.Acceleration,
        Components.Angular,
        Components.Bounce,
        Components.Debug,
        Components.Drag,
        Components.Enable,
        Components.Friction,
        Components.Gravity,
        Components.Immovable,
        Components.Mass,
        Components.Size,
        Components.Velocity,
    );

    return gameObject;
};

export default BuildArcadeObject;