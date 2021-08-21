// https://github.com/ykob/glsl-dissolve/blob/master/src/glsl/dissolve.fs

import Perlin from '../utils/noise/Perlin.js';

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

// Progress
uniform float progress;
uniform float activeRate;
// Noise
uniform float noiseX;
uniform float noiseY;
uniform float noiseZ;
// Alpha
uniform float alpha0;
uniform float alpha1;

${Perlin}

void main (void) {
  float delay = (Perlin(vec3(outTexCoord.x * noiseX, outTexCoord.y * noiseY, noiseZ)) + 1.0) / 2.0;
  delay *= (1.0 - activeRate);
  float t = (progress - delay) / activeRate;
  t = min(max(t, 0.0), 1.0);
  float alpha = mix(alpha0, alpha1, t);
  vec4 front = texture2D(uMainSampler, outTexCoord);
  gl_FragColor = vec4(front.rgb * alpha, front.a * alpha);
}
`;

export default frag;