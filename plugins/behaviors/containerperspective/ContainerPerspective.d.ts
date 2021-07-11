import RenderTexture from "../../gameobjects/perspective/rendertexture/RenderTexture";
import ContainerLite from "../../gameobjects/containerlite/ContainerLite";

export default ContainerPerspective;

declare namespace ContainerPerspective {

    interface IConfig {
        useParentBounds?: boolean,
    }

}

declare class ContainerPerspective extends RenderTexture {
    constructor(
        parentContainer: ContainerLite,
        config?: ContainerPerspective.IConfig
    );

    enter(): this;
    exit(): this;
    readonly perspectiveState: boolean;
}