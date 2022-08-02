// reference : https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/

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
uniform vec2 amplitude;
uniform vec2 frequence;
uniform vec2 progress;


void main (void) {
  vec2 amp = amplitude/texSize;  
  vec2 tc = vec2(
    cos((outTexCoord.x * frequence.x ) + progress.x) * amp.x,
    sin((outTexCoord.y * frequence.y ) + progress.y) * amp.y
  ) + outTexCoord;
  gl_FragColor = texture2D(uMainSampler, tc);
}
`;

export default frag;