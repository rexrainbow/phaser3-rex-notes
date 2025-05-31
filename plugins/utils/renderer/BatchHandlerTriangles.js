const ShaderSourceFS = Phaser.Renderer.WebGL.Shaders.MultiFrag
const ShaderSourceVS = Phaser.Renderer.WebGL.Shaders.MultiVert;
const ShaderAdditionMakers = Phaser.Renderer.WebGL.ShaderAdditionMakers;
const MakeApplyTint = ShaderAdditionMakers.MakeApplyTint;
const MakeDefineTexCount = ShaderAdditionMakers.MakeDefineTexCount;
const MakeGetTexCoordOut = ShaderAdditionMakers.MakeGetTexCoordOut;
const MakeGetTexRes = ShaderAdditionMakers.MakeGetTexRes;
const MakeSmoothPixelArt = ShaderAdditionMakers.MakeSmoothPixelArt;
const MakeGetTexture = ShaderAdditionMakers.MakeGetTexture;
const Utils = Phaser.Renderer.WebGL.Utils;
const BatchHandlerQuad = Phaser.Renderer.WebGL.RenderNodes.BatchHandlerQuad;
const getTint = Utils.getTintAppendFloatAlpha;

class BatchHandlerTriangles extends BatchHandlerQuad {
    constructor(manager, config) {
        super(manager, config);
        // We do not expect to use extra textures.
        this.renderOptions.multiTexturing = true;
    }

    _generateElementIndices(instances) {
        // Independent Triangles
        var buffer = new ArrayBuffer(instances * 5 * 2);
        var indices = new Uint16Array(buffer);

        // 0,0,1,2,2,3,3,4,5,5,6,6,7,8,8,....
        var offset = 0;
        for (var i = 0; i < instances; i++) {
            var index = i * 3;
            indices[offset++] = index;      // Duplicate
            indices[offset++] = index;
            indices[offset++] = index + 1;
            indices[offset++] = index + 2;
            indices[offset++] = index + 2;  // Duplicate
        }
        return buffer;
    }

    batchTriangles(
        drawingContext,
        src,
        calcMatrix,
        glTexture,
        vertices,
        uv,
        colors,
        alphas,
        alpha,
        tintFill,
        renderOptions,
        debugCallback
    ) {
        if (this.instanceCount === 0) {
            this.manager.setCurrentBatchNode(this, drawingContext);
        }

        var submittedInstanceCount = vertices.length / (2 * this.verticesPerInstance);
        if (submittedInstanceCount > this.instancesPerBatch) {
            throw new Error('rexBatchHandlerTriangle: Vertex count exceeds maximum per batch (' + this.maxVerticesPerBatch + ')');
        }

        // Check whether the batch should be rendered immediately.
        // This guarantees that none of the arrays are full below.
        if (this.instanceCount + submittedInstanceCount > this.instancesPerBatch) {
            this.run(drawingContext);

            // Now the batch is empty.
        }

        // Check render options and run the batch if they differ.
        this.updateRenderOptions(renderOptions);
        if (this._renderOptionsChanged) {
            this.run(drawingContext);
            this.updateShaderConfig();
        }

        // Process textures and get relevant data.
        var textureDatum = this.batchTextures(glTexture);

        // Update the vertex buffer.
        var vertexOffset32 = this.instanceCount * this.floatsPerInstance;
        var vertexBuffer = this.vertexBufferLayout.buffer;
        var vertexViewF32 = vertexBuffer.viewF32;
        var vertexViewU32 = vertexBuffer.viewU32;

        var debugVertices;
        if (debugCallback) {
            debugVertices = [];
        }

        var a = calcMatrix.a;
        var b = calcMatrix.b;
        var c = calcMatrix.c;
        var d = calcMatrix.d;
        var e = calcMatrix.e;
        var f = calcMatrix.f;

        var displayOffsetX = -src.displayOriginX;
        var displayOffsetY = -src.displayOriginY;

        var meshVerticesLength = vertices.length;
        for (var i = 0; i < meshVerticesLength; i += 6) {
            for (var j = 0; j < 3; j++) {
                var vertexIndex = i + j * 2;
                var x = vertices[vertexIndex];
                var y = vertices[vertexIndex + 1];

                x += displayOffsetX;
                y += displayOffsetY;

                var tx = x * a + y * c + e;
                var ty = x * b + y * d + f;

                var tintIndex = (i / 2) + j;
                var tint = getTint(
                    colors[tintIndex],
                    alphas[tintIndex] * alpha
                );

                vertexViewF32[vertexOffset32++] = tx;
                vertexViewF32[vertexOffset32++] = ty;
                vertexViewF32[vertexOffset32++] = uv[vertexIndex];
                vertexViewF32[vertexOffset32++] = uv[vertexIndex + 1];
                vertexViewF32[vertexOffset32++] = textureDatum;
                vertexViewF32[vertexOffset32++] = tintFill;
                vertexViewU32[vertexOffset32++] = tint;

                if (debugVertices) {
                    debugVertices.push(tx, ty);
                }
            }

            this.instanceCount++;
            this.currentBatchEntry.count++;
        }

        if (debugCallback) {
            debugCallback.call(src, src, meshVerticesLength, debugVertices);
        }
    }
}

BatchHandlerTriangles.prototype.defaultConfig = {
    name: 'rexBatchHandlerTriangle',
    verticesPerInstance: 3,
    indicesPerInstance: 5,
    shaderName: 'REXTRI',
    vertexSource: ShaderSourceVS,
    fragmentSource: ShaderSourceFS,
    shaderAdditions: [
        MakeGetTexCoordOut(),
        MakeGetTexRes(true),
        MakeSmoothPixelArt(true),
        MakeDefineTexCount(1),
        MakeGetTexture(),
        MakeApplyTint()
    ],
    vertexBufferLayout: {
        usage: 'DYNAMIC_DRAW',
        layout: [
            {
                name: 'inPosition',
                size: 2
            },
            {
                name: 'inTexCoord',
                size: 2
            },
            {
                name: 'inTexDatum'
            },
            {
                name: 'inTintEffect'
            },
            {
                name: 'inTint',
                size: 4,
                type: 'UNSIGNED_BYTE',
                normalized: true
            }
        ]
    }
};

export default BatchHandlerTriangles;
