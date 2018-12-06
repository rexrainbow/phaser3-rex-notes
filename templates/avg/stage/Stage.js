import ContainerLite from '../../../plugins/gameobjects/containerlite/ContainerLite.js';
import SetBackground from './SetBackground.js';
import SetCharacter from './SetCharacter.js';
import GetCharacter from './GetCharacter.js';
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

        this.characterDepth = GetValue(config, 'depth.characher', -2);
        this.backgroundDepth = GetValue(config, 'depth.background', this.characterDepth - 10);

        this.childrenMap = {};
        this.childrenMap.background;
        this.childrenMap.characters = {};
    }

    get left() {
        return this.x - (this.displayWidth * this.originX);
    }

    set left(value) {
        this.x += (value - this.left);
    }

    alignLeft(value) {
        this.left = value;
        return this;
    }

    get right() {
        return (this.x - (this.displayWidth * this.originX)) + this.displayWidth;
    }

    set right(value) {
        this.x += (value - this.right);
    }

    alignRight(value) {
        this.right = value;
        return this;
    }

    get top() {
        return this.y - (this.displayHeight * this.originY);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    alignTop(value) {
        this.top = value;
        return this;
    }

    get bottom() {
        return (this.y - (this.displayHeight * this.originY)) + this.displayHeight;
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    alignBottom(value) {
        this.bottom = value;
        return this;
    }
}

var methods = {
    setBackground: SetBackground,
    setCharacter: SetCharacter,
    getCharacter: GetCharacter,
    getElement: GetElement,
}

Object.assign(
    Stage.prototype,
    methods
);
export default Stage;