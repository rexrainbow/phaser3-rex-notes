// Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

const frag = `\
#pragma phaserTemplate(shaderName)

#define ANGLESTEP 0.314

#pragma phaserTemplate(fragmentDefine)

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
uniform float thickness;
uniform vec3 outlineColor;

const float DOUBLE_PI = 3.14159265358979323846264 * 2.;

#pragma phaserTemplate(fragmentHeader)

void main() {
  vec4 front = boundedSampler(uMainSampler, outTexCoord);

  if (thickness > 0.0) {
    vec2 mag = vec2(thickness/texSize.x, thickness/texSize.y);
    vec4 curColor;
    float maxAlpha = front.a;
    vec2 offset;
    for (float angle = 0.; angle < DOUBLE_PI; angle += ANGLESTEP) {
        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        
        curColor = boundedSampler(uMainSampler, outTexCoord + offset);
        maxAlpha = max(maxAlpha, curColor.a);
    }
    vec3 resultColor = front.rgb + (outlineColor.rgb * (1. - front.a)) * maxAlpha;
    gl_FragColor = vec4(resultColor, maxAlpha);
  } else {
    gl_FragColor = front;
  }
}
`;

export default frag;