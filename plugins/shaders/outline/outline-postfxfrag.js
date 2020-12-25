// Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

const frag = `\
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
// Color0
uniform float thickness;
uniform vec3 outlineColor; // (0, 0, 0);
// Color1
uniform float thickness1;
uniform vec3 outlineColor1; // (0, 0, 0);

const float DOUBLE_PI = 3.14159265358979323846264 * 2.;

vec4 GetOutlineColor(vec4 front, float width, vec3 color) {
  if (width > 0.0) {
    vec2 mag = vec2(width/texSize.x, width/texSize.y);
    vec4 curColor;
    float maxAlpha = front.a;
    vec2 offset;
    for (float angle = 0.; angle <= DOUBLE_PI; angle += 0.6283185) {
        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        
        curColor = texture2D(uMainSampler, outTexCoord + offset);
        maxAlpha = max(maxAlpha, curColor.a);
    }
    vec3 resultColor = front.rgb + (color.rgb * (1. - front.a)) * maxAlpha;
    return vec4(resultColor, maxAlpha);
  } else {
    return front;
  }
}

void main() {
  vec4 front = texture2D(uMainSampler, outTexCoord);
  vec4 color0 = GetOutlineColor(front, thickness, outlineColor);
  vec4 color1 = GetOutlineColor(front, thickness1, outlineColor1);

  // TODO: blend color0 and color1
  gl_FragColor = color0;
}
`;

export default frag;

// const MAX_SAMPLES = 100;
// const MIN_SAMPLES = 1;
// var GetFrag = function ({ quality = 0.1 }) {
//   var samples = Math.max((quality * MAX_SAMPLES), MIN_SAMPLES);
//   var angleStep = (Math.PI * 2 / samples).toFixed(7);
//   return frag.replace(/\#\{angleStep\}/, angleStep);
// }