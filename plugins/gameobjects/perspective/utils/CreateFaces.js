import CreatePerspectiveObject from './CreatePerspectiveObject.js';

var CreateFaces = function (scene, faceConfig, faceNames) {
    var faces;
    if (faceNames === undefined) { // Return an array of faces
        faces = [];
        var face, faceConfig;
        for (var i = 0, cnt = faceConfig.length; i < cnt; i++) {
            faceConfig = faceConfig[i];
            if (faceConfig) {
                face = CreatePerspectiveObject(scene, faceConfig);
            } else {
                face = null;
            }
            faces.push(face);
        }
    } else { // Return a face map
        faces = {};
        var face, name;
        for (var i = 0, cnt = faceNames.length; i < cnt; i++) {
            name = faceNames[i];
            if (faceConfig.hasOwnProperty(name)) {
                face = CreatePerspectiveObject(scene, faceConfig[name]);
            } else {
                face = null;
            }

            faces[name] = face;
        }
    }

    return faces;
}

export default CreateFaces;