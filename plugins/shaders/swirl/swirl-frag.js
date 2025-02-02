// reference : https://www.geeks3d.com/20110428/shader-library-swirl-post-processing-filter-in-glsl/

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
uniform vec2 center;
uniform vec2 config;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
  float radius = config.x;
  float angle = config.y;

  vec2 tc = outTexCoord * texSize;
  tc -= center;
  float dist = length(tc);
  if (dist < radius) {
    float percent = (radius - dist) / radius;
    float theta = percent * percent * angle * 8.0;
    float s = sin(theta);
    float c = cos(theta);
    tc = vec2(dot(tc, vec2(c, -s)), dot(tc, vec2(s, c)));
  }
  tc += center;
  gl_FragColor = texture2D(uMainSampler, tc / texSize);
}
`;

export default frag;