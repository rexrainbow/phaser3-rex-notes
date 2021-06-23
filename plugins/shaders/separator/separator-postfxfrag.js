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
uniform vec2 separator;
uniform float spaceLeft;
uniform float spaceRight;
uniform float spaceTop;
uniform float spaceBottom;

void main (void) {
  vec2 tc = outTexCoord * texSize;

  if (
    ((tc.x > (separator.x - spaceLeft)) && (tc.x < (separator.x + spaceRight))) ||
    ((tc.y > (separator.y - spaceTop)) && (tc.y < (separator.y + spaceBottom)))
  ) {
    gl_FragColor = vec4(0,0,0,0);
  } else {
    if (tc.x < separator.x) {
      tc.x += spaceLeft;
    } else {
      tc.x -= spaceRight;
    }
  
    if (tc.y < separator.y) {
      tc.y += spaceTop;
    } else {
      tc.y -= spaceBottom;
    }
  
    gl_FragColor = texture2D(uMainSampler, tc / texSize);
  }

}
`;

export default frag;