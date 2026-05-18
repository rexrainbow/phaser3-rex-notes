var GetGLtexture = function(gameObject?: any) {
    if (gameObject.glTexture) {
        return gameObject.glTexture;
    } else if (gameObject.frame) {
        return gameObject.frame.glTexture;
    }
}

export default GetGLtexture;