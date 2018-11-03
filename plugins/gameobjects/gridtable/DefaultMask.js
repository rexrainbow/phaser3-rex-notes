const Graphics = Phaser.GameObjects.Graphics;

class DefaultMask extends Graphics {
    constructor(table) {
        super(table.scene);
        this.table = table;
        this.resize();
    }

    destroy() {
        this.table = undefined;
        super.destroy();
        return this;
    }

    resize() {
        var table = this.table;
        var x = -(table.width * table.originX);
        var y = -(table.height * table.originY);
        this
            .clear()
            .fillRect(x, y, table.width, table.height)
            .setPosition(table.x, table.y)
            .fillStyle(0xffffff);
        return this;
    }
}
export default DefaultMask;