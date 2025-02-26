import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

const Extern = Phaser.GameObjects.Extern;

class Live2dGameObjectBase extends Extern { 

}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Live2dGameObjectBase,
    [
        Components.AlphaSingle,
        Components.ComputedSize,
        Components.GetBounds,
    ]
);

export default Live2dGameObjectBase;