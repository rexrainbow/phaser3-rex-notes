const Graphics = Phaser.GameObjects.Graphics;

class DefaultMask extends Graphics {
    constructor(parent, shape) {
        if (shape === undefined) {
            shape = 0;
        }
        if (typeof (shape) === 'string') {
            shaep = SHAPEMODE[shape];
        }

        super(parent.scene, {
            x: parent.x,
            y: parent.y
        });
        this.parent = parent;
        this.shape = shape;
        this.resize();
        // Don't add it to display list        
    }

    destroy() {
        this.parent = undefined;
        super.destroy();
        return this;
    }

    setPosition(x, y) {
        if (x === undefined) {
            x = this.parent.x;
        }
        if (y === undefined) {
            y = this.parent.y;
        }
        super.setPosition(x, y);
        return this;
    }

    resize() {
        var parent = this.parent;
        if ((this.widthSave === parent.width) && (this.heightSave === parent.height)) {
            return this;
        }

        this.clear().fillStyle(0xffffff);
        switch (this.shape) {
            case 1: // circle
                var radius = Math.min(parent.width / 2, parent.height / 2);
                this.fillCircle(
                    0,
                    0,
                    radius
                );
                break;
            default: // 0|'rectangle'
                this.fillRect(
                    -(parent.width * parent.originX),
                    -(parent.height * parent.originY),
                    parent.width,
                    parent.height
                );
                break;
        }
        this.widthSave = parent.width;
        this.heightSave = parent.height;
        return this;
    }
}

const SHAPEMODE = {
    rectangle: 0,
    circle: 1,
}
export default DefaultMask;