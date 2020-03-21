const Zone = Phaser.GameObjects.Zone;

class Base extends Zone {
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Base,
    [
        Components.Alpha,
        Components.Flip
    ]
);

export default Base;