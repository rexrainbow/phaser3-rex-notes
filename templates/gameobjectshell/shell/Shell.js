import PropertiesTweaker from '../propertiestweaker/PropertiesTweaker.js';
import TransformController from '../transformcontroller/TransformController.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Shell {
    constructor(scene, config) {
        var tweaker = new PropertiesTweaker(scene, GetValue(config, 'tweaker'));
        if ((tweaker.x === 0) && (tweaker.y === 0)) {
            tweaker.setOrigin(0)
        }        
        scene.add.existing(tweaker);
        tweaker.layout();

        var controller = new TransformController(scene, GetValue(config, 'controller'));
        scene.add.existing(controller);

        this.tweaker = tweaker;
        this.controller = controller;
    }

    setBindingTarget(target) {
        this.tweaker.setBindingTarget(target);
        this.controller.setBindingTarget(target);
        return this;
    }
}

export default Shell;