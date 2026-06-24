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
uniform vec2 texSize;
uniform vec4 rect;
uniform float feather;
uniform bool invert;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    vec4 color = texture2D(uMainSampler, outTexCoord);

    vec2 position = vec2(outTexCoord.x * texSize.x, (1.0 - outTexCoord.y) * texSize.y);
    vec2 size = max(rect.zw, vec2(0.0));
    vec2 halfSize = size * 0.5;
    vec2 center = rect.xy + halfSize;

    vec2 delta = abs(position - center) - halfSize;
    float outsideDistance = length(max(delta, vec2(0.0)));
    float insideDistance = min(max(delta.x, delta.y), 0.0);
    float signedDistance = outsideDistance + insideDistance;

    float maskAlpha;

    if (feather > 0.0)
    {
        maskAlpha = 1.0 - smoothstep(-feather, feather, signedDistance);
    }
    else
    {
        maskAlpha = signedDistance <= 0.0 ? 1.0 : 0.0;
    }

    if (invert)
    {
        maskAlpha = 1.0 - maskAlpha;
    }

    gl_FragColor = color * maskAlpha;
}
`;

export default frag;
