import RenderTexture from "../../gameobjects/perspective/rendertexture/RenderTexture";
import ContainerLite from "../../gameobjects/containerlite/ContainerLite";

export interface IConfig {
    useParentBounds?: boolean,
}

export default class ContainerPerspective extends RenderTexture {
    constructor(
        parentContainer: ContainerLite,
        config?: IConfig
    );

    enter(): this;
    exit(): this;
    readonly perspectiveState: boolean;
}