import HPalette from './HPalette.js';
import SVPalette from './SVPalette.js';

var CreateHPalette = function (scene, width, height) {
    var hPalette = new HPalette(scene, width, height);
    scene.add.existing(hPalette);
    return hPalette;
}

var CreateSVPalette = function (scene, width, height) {
    var svPalette = new SVPalette(scene, width, height);
    scene.add.existing(svPalette);
    return svPalette;
}

export {
    CreateHPalette,
    CreateSVPalette
}