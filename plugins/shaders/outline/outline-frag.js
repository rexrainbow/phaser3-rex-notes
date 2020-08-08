// Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

const frag = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
%MyTexture2D%
uniform vec2 texSize;

// Effect parameters
uniform vec2 thickness;
uniform vec3 outlineColor; // (0, 0, 0);

const float DOUBLE_PI = 3.14159265358979323846264 * 2.;

void main() {
  vec4 front = MyTexture2D(outTexCoord);
  if ((thickness.x > 0.0) || (thickness.y > 0.0)) {    
    vec2 mag = thickness/texSize;
    vec4 curColor;
    float maxAlpha = 0.;
    vec2 offset;
    for (float angle = 0.; angle <= DOUBLE_PI; angle += %angleStep%) {
        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        
        curColor = MyTexture2D(outTexCoord + offset);
        maxAlpha = max(maxAlpha, curColor.a);
    }
    float resultAlpha = max(maxAlpha, front.a);
    
    gl_FragColor = vec4((front.rgb + (outlineColor.rgb * (1. - front.a)) * resultAlpha), resultAlpha);
  } else {
    gl_FragColor = front;
  }

}`;

const MAX_SAMPLES = 100;
const MIN_SAMPLES = 1;
export function GetFrag({ quality = 0.1 }) {
  var samples = Math.max((quality * MAX_SAMPLES), MIN_SAMPLES);
  var angleStep = (Math.PI * 2 / samples).toFixed(7);
  return frag.replace(/%angleStep%/gi, angleStep);
}