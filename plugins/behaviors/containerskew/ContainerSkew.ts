import MeshRenderTextureBase from '../../gameobjects/container/containerlite/rendertexture/MeshRenderTextureBase';
import RenderTexture from '../../gameobjects/mesh/quad/skewrendertexture/SkewRenderTexture';

class ContainerSkew extends MeshRenderTextureBase(RenderTexture) {
    isRunning: any;

    get skewState() {
        return this.isRunning;
    }
}

export default ContainerSkew;