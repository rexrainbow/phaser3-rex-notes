const fragShader = `
precision mediump float;
uniform sampler2D uMainSampler;
uniform sampler2D uMaskSampler;
varying vec2 outTexCoord;

void main ()
{
    vec4 color = texture2D(uMainSampler, outTexCoord);
    vec4 maskColor = texture2D(uMaskSampler, outTexCoord);
    gl_FragColor = vec4(color.rgb * maskColor.a, color.a * maskColor.a);
}
`;

export default fragShader;