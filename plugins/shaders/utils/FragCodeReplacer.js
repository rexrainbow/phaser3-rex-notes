const CoordsName = 'coords';
const template = `
uniform sampler2D uMainSampler[%count%];
varying vec2 outTexCoord;
varying float outTexId;
vec4 MyTexture2D(vec2 ${CoordsName}) {
  %forloop%
}
`;

var GetMyTexture2DCode = function(maxTextures) {
    var loopCode = '';
    for (var i = 0; i < maxTextures; i++) {
        if (i > 0) {
            loopCode += '  else ';
        }

        if (i < maxTextures - 1) {
            loopCode += `if (outTexId < ${i}.5) `;
        }
        loopCode += `{return texture2D(uMainSampler[${i}], ${CoordsName});}\n`;
    }
    var content = template.replace(/%count%/gi, maxTextures.toString());
    content = content.replace(/%forloop%/gi, loopCode);
    return content;
}

var FragCodeReplacer = function (frag, maxTextures) {
    frag = frag.replace(/%MyTexture2D%/gi, GetMyTexture2DCode(maxTextures));
    return frag;
}

export default FragCodeReplacer;