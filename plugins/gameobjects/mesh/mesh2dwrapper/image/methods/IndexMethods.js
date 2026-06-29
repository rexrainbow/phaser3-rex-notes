export default {
    setFaceIndices(faceIndices, texturePage) {
        if (texturePage === undefined) {
            texturePage = this.texturePage;
        } else {
            this.texturePage = texturePage;
        }

        this.faceIndices.length = 0;
        this.indices.length = 0;

        for (var i = 0, cnt = faceIndices.length; i < cnt; i += 3) {
            var a = faceIndices[i];
            var b = faceIndices[i + 1];
            var c = faceIndices[i + 2];

            this.faceIndices.push(a, b, c);
            this.indices.push(a, b, c, texturePage);
        }

        this.updateOrderedIndices();

        return this;
    },

    setMeshIndices(indices) {
        this.indices.length = 0;
        this.faceIndices.length = 0;

        for (var i = 0, cnt = indices.length; i < cnt; i += 4) {
            this.indices.push(indices[i], indices[i + 1], indices[i + 2], indices[i + 3]);
            this.faceIndices.push(indices[i], indices[i + 1], indices[i + 2]);
        }

        this.updateOrderedIndices();

        return this;
    },

    setUseOrderedIndexOptimization(enabled, strategy) {
        this.autoBuildOrderedIndices = !!enabled;

        if (strategy !== undefined) {
            this.orderedIndicesStrategy = strategy;
        }

        return this.updateOrderedIndices();
    },

    setUseOrderedIndicesOptimization(enabled, strategy) {
        return this.setUseOrderedIndexOptimization(enabled, strategy);
    },

    updateOrderedIndices() {
        if (this.autoBuildOrderedIndices && this.indices.length > 0) {
            this.setRenderAsTriangles(false);
            this.buildOrderedIndices(this.orderedIndicesStrategy, true);
        } else {
            this.setUseOrderedIndices(false);
        }

        return this;
    },
}
