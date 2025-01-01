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

    static defaultConfig = {
        name: 'rexBatchHandlerTriangle',
        verticesPerInstance: 3,
        indicesPerInstance: 3,
        shaderName: 'REXFLAT',
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
    }

    _generateElementIndices(instances) {
        var buffer = new ArrayBuffer(instances * 3 * 2); // TODO
        var indices = new Uint16Array(buffer);
        var len = indices.length;
        for (var i = 0; i < len; i++) {
            indices[i] = i;
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

        var submittedInstanceCount = vertices.length / (3 * this.verticesPerInstance);
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

        var roundPixels = drawingContext.camera.roundPixels;

        var debugVerts;
        if (debugCallback) {
            debugVerts = [];
        }

        var a = calcMatrix.a;
        var b = calcMatrix.b;
        var c = calcMatrix.c;
        var d = calcMatrix.d;
        var e = calcMatrix.e;
        var f = calcMatrix.f;

        var meshVerticesLength = vertices.length;

        for (var i = 0; i < meshVerticesLength; i += 6) {
            for (var j = 0; j < 3; j++) {
                var x = vertices[i + j * 2];
                var y = vertices[i + j * 2 + 1];

                var tx = x * a + y * c + e;
                var ty = x * b + y * d + f;

                if (roundPixels) {
                    tx = Math.round(tx);
                    ty = Math.round(ty);
                }

                vertexViewF32[vertexOffset32++] = tx;
                vertexViewF32[vertexOffset32++] = ty;
                vertexViewF32[vertexOffset32++] = uv[i + j * 2];
                vertexViewF32[vertexOffset32++] = uv[i + j * 2 + 1];
                vertexViewF32[vertexOffset32++] = textureDatum;
                vertexViewF32[vertexOffset32++] = tintFill;
                vertexViewU32[vertexOffset32++] = getTint(
                    colors[i / 2 + j],
                    alphas[i / 2 + j] * alpha
                );
            }

            this.instanceCount++;
            this.currentBatchEntry.count++;
        }

        if (debugCallback) {
            var debugVerts = [];
            for (var i = 0; i < meshVerticesLength; i += 2) {
                var x = vertices[i];
                var y = vertices[i + 1];
                var tx = x * a + y * c + e;
                var ty = x * b + y * d + f;
                if (roundPixels) {
                    tx = Math.round(tx);
                    ty = Math.round(ty);
                }
                debugVerts.push(tx, ty);
            }
            debugCallback.call(src, src, meshVerticesLength, debugVerts);
        }
    }
}

export default BatchHandlerTriangles;
