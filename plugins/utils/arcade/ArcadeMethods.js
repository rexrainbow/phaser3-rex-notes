const Components = Phaser.Physics.Arcade.Components;

var ArcadeMethods = {};
Object.assign(
    ArcadeMethods,
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
    Components.Velocity
)

export default ArcadeMethods;