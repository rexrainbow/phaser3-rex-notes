import CheckP3Version from '../../../utils/system/CheckP3Version.js';
import { Class as PhaserClass, GameObjects as PhaserGameObjects } from 'phaser';
CheckP3Version();

const Extern = PhaserGameObjects.Extern;

class Live2dGameObjectBase extends Extern { 

}

const Components = PhaserGameObjects.Components;
PhaserClass.mixin(Live2dGameObjectBase,
    [
        Components.AlphaSingle,
        Components.ComputedSize,
        Components.GetBounds,
    ]
);

export default Live2dGameObjectBase;