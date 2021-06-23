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
  tc -= separator;

  if (
    ((tc.x > -spaceLeft) && (tc.x < spaceRight)) ||
    ((tc.y > -spaceTop) && (tc.y < spaceBottom))
  ) {
    gl_FragColor = vec4(0,0,0,0);
  } else {
    tc.x += (tc.x < 0.0)? spaceLeft: -spaceRight;
    tc.y += (tc.y < 0.0)? spaceTop: -spaceBottom;

    tc += separator;
    gl_FragColor = texture2D(uMainSampler, tc / texSize);
  }

}
`;

export default frag;