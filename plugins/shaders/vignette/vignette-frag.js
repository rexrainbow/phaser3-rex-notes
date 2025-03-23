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
uniform vec2 config;
uniform vec2 position;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float radius = config.x;
    float strength = config.y;

    vec4 col = vec4(1.0);

    float d = length(outTexCoord - position);

    if (d <= radius)
    {
        float g = d / radius;
        g = sin(g * 3.14 * strength);
    	col = vec4(g * g * g);
    }

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    gl_FragColor = texture * (1.0 - col);
}
`;

export default frag;