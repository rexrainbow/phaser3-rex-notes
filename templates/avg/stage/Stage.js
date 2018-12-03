import ContainerLite from '../../../plugins/gameobjects/containerlite/ContainerLite.js';
import Element from './Element.js';
import GetElement from './GetElement.js';

const Container = ContainerLite;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class Stage extends Container {
    constructor(scene, x, y, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
        }
        super(scene, x, y, 2, 2);
        this.setName(GetValue(config, 'name', ''));

        this.backgroundDepth = GetValue(config, 'depth.background', -10);
        this.characterDepth = GetValue(config, 'depth.characher', this.backgroundDepth + 10);

        this.childrenMap = {};
        this.childrenMap.background = new Element(scene, x, y);
        this.childrenMap.characters = [];
    }

    setBackground(gameObject, duration) {
        if (duration === undefined) {
            duration = 0;
        }

        if (gameObject) {
            gameObject.setPosition(this.x, this.y);
            gameObject.depth = this.backgroundDepth;
        }
        var background = this.childrenMap.background;
        background.replace(gameObject, duration);
        this.setSize(background.width, background.height);
        return this;
    }
}

var methods = {
    getElement: GetElement,
}

Object.assign(
    Stage.prototype,
    methods
);
export default Stage;