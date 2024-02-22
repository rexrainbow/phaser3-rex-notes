const Mesh = Phaser.GameObjects.Mesh;

class MeshBase extends Mesh {
    get tint() {
        if (this.vertices.length === 0) {
            return 0xffffff;
        } else {
            return this.vertices[0].color;
        }
    }

    forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
    }

}

export default MeshBase;