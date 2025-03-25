// Built-in fx in phaser3

const frag = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 offset;
uniform float strength;
uniform vec3 color;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    vec4 sum = texture2D(uMainSampler, outTexCoord) * 0.204164 * strength;

    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord - offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 3.294215) * 0.093913;
    sum = sum + texture2D(uMainSampler, outTexCoord - offset * 3.294215) * 0.093913;

    gl_FragColor = sum * vec4(color, 1);
}
`;

export default frag;