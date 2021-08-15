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
uniform vec2 center;
uniform float radius;

void main (void) {
  vec2 tc = outTexCoord * texSize;  
  tc -= center;
  float dist = length(tc);
  if (dist < radius) {
    dist /= radius;
    // tc *= dist * dist;
    // tc *= asin(dist) / 1.570795;
    tc *= sin(dist * 1.570795);
  }

  tc += center;
  gl_FragColor = texture2D(uMainSampler, tc / texSize);

}
`;

export default frag;