const Graphics = Phaser.GameObjects.Graphics;

class DefaultMask extends Graphics {
    constructor(table) {
        super(table.scene, {
            x: table.x,
            y: table.y
        });
        this.table = table;
        this.resize();
        // Don't add it to display list        
    }

    destroy() {
        this.table = undefined;
        super.destroy();
        return this;
    }

    resize() {
        var table = this.table;
        this
            .clear()
            .fillStyle(0xffffff)
            .fillRect(
                -(table.width * table.originX),
                -(table.height * table.originY),
                table.width,
                table.height
            );
        return this;
    }
}
export default DefaultMask;