import GetViewport from '../system/GetViewport.js';

var GetRenderTextureSize = function (value) {
    value = Math.floor(value);

    return (value % 2 === 0) ? value : value + 1;
}

var FitToViewport = function (renderTexture, camera) {
    if (camera === undefined) {
        camera = renderTexture.scene.cameras.main;
    }

    renderTexture.setOrigin(0);

    var viewport = GetViewport(renderTexture.scene, camera);
    var x = viewport.x,
        y = viewport.y,
        w = GetRenderTextureSize(viewport.width),
        h = GetRenderTextureSize(viewport.height);

    if ((w !== renderTexture.texture.width) || (h !== renderTexture.texture.height)) {
        renderTexture.resize(w, h);
    } else {
        renderTexture.clear();
    }

    renderTexture.setPosition(x, y);
    renderTexture.camera.setScroll(x, y);

    return renderTexture;
}

export default FitToViewport
