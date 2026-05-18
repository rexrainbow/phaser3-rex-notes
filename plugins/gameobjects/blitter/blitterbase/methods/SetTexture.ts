var SetTexture = function(key?: any, frame?: any) {
    this.texture = this.scene.sys.textures.get(key);
    this.frame = this.texture.get(frame);
    return this;
}

export default SetTexture;