import RenderTexture from './RenderTexture';

export default function (
    x?: number | RenderTexture.IConfig,
    y?: number,
    width?: number,
    height?: number,
    config?: RenderTexture.IConfig
): RenderTexture;

export default function (
    config?: RenderTexture.IConfig
): RenderTexture;
