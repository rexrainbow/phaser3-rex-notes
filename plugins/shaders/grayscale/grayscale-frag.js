const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
%MyTexture2D%

// Effect parameters
uniform float intensity;

void main (void) {
  vec4 front = MyTexture2D(outTexCoord);
  float gray = dot(front.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = mix(front, vec4(gray, gray, gray, front.a), intensity);
}\
`;

export default frag;