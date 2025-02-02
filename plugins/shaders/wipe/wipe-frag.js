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
uniform vec4 config;
uniform bool reveal;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    vec2 uv = outTexCoord;

    vec4 color0;
    vec4 color1;

    if (reveal) {
        color0 = vec4(0);
        color1 = texture2D(uMainSampler, uv);
    } else {
        color0 = texture2D(uMainSampler, uv);
        color1 = vec4(0);
    }

    float distance = config.x;
    float width = config.y;
    float direction = config.z;
    float axis = uv.x;

    if (config.w == 1.0) {
        axis = uv.y;
    }

    float adjust = mix(width, -width, distance);
    float value = smoothstep(distance - width, distance + width, abs(direction - axis) + adjust);
    gl_FragColor = mix(color1, color0, value);
}
`;

export default frag;