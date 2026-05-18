import SkewRenderTexture from './SkewRenderTexture';

export default function(x?: any, y?: any, width?: any, height?: any) {
    var gameObject = new SkewRenderTexture(this.scene, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
};