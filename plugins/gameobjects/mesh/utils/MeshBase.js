const Mesh = Phaser.GameObjects.Mesh;

class MeshBase extends Mesh {
    get tint() {
        if (this.vertices.length === 0) {
            return 0xffffff;
        } else {
            return this.vertices[0].color;
        }
    }

    setInteractive() {
        var hitAreaCallback = function (area, x, y) {
            var faces = this.faces;

            for (var i = 0; i < faces.length; i++) {
                var face = faces[i];

                //  Don't pass a calcMatrix, as the x/y are already transformed
                if (face.contains(x, y)) {
                    return true;
                }
            }

            return false;
        }.bind(this);

        this.scene.sys.input.enable(this, hitAreaCallback);

        return this;
    }

    forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
    }

}

export default MeshBase;