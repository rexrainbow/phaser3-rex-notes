import MeshRenderTextureBase from '../../gameobjects/container/containerlite/rendertexture/MeshRenderTextureBase';
import RenderTexture from '../../gameobjects/mesh/perspective/rendertexture/RenderTexture';

class ContainerPerspective extends MeshRenderTextureBase(RenderTexture) {
    isRunning: any;

    get perspectiveState() {
        return this.isRunning;
    }
}

export default ContainerPerspective;