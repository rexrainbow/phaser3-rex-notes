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
uniform vec2 texSize;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float speed = config.x;
    float time = config.y;
    float lineWidth = config.z;
    float gradient = config.w;

	vec2 uv = gl_FragCoord.xy / texSize;

    vec4 tex = texture2D(uMainSampler, outTexCoord);

    vec4 col1 = vec4(0.3, 0.0, 0.0, 1.0);
    vec4 col2 = vec4(0.85, 0.85, 0.85, 1.0);

    uv.x = uv.x - mod(time * speed, 2.0) + 0.5;
    float y = uv.x * gradient;

    float s = smoothstep(y - lineWidth, y, uv.y) - smoothstep(y, y + lineWidth, uv.y);

    gl_FragColor = (((s * col1) + (s * col2)) * tex);

    if (!reveal)
    {
        //  Apply the shine effect
        gl_FragColor += tex;
    }
}
`;

export default frag;