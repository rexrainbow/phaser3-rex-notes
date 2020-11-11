const CoordsName = 'coords';
const MultipleTextureTemplate = `\
uniform sampler2D uMainSampler[%count%];
varying vec2 outTexCoord;
varying float outTexId;
vec4 MyTexture2D(vec2 ${CoordsName}) {
  %forloop%
}\
`;
const PostPipelineTemplate = `\
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;
vec4 MyTexture2D(vec2 ${CoordsName}) {
    return texture2D(uMainSampler, ${CoordsName});
}\
`;

var GetMyTexture2DCode = function (maxTextures) {
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
    var content = MultipleTextureTemplate.replace(/%count%/gi, maxTextures.toString());
    content = content.replace(/%forloop%/gi, loopCode);
    return content;
}

var FragCodeReplacer = function (frag, maxTextures, isPostFX) {
    if (isPostFX === undefined) {
        isPostFX = false;
    }
    var replaceBy = (isPostFX) ? PostPipelineTemplate : GetMyTexture2DCode(maxTextures);
    frag = frag.replace(/%MyTexture2D%/gi, replaceBy);
    return frag;
}

export default FragCodeReplacer;