const frag = `
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

void main() {
  vec4 front = MyTexture2D(outTexCoord);
  vec4 sum = vec4(0);
  for(int xx = -4; xx <= 4; xx++) {
    for(int yy = -3; yy <= 3; yy++) {
      float dist = sqrt(float(xx*xx) + float(yy*yy));
      float factor = 0.0;
      if (dist == 0.0) {
        factor = 2.0;
      } else {
        factor = 2.0/abs(float(dist));
      }
      sum += MyTexture2D(outTexCoord + (vec2(xx, yy)* 0.002))*factor;
    }
  }
  
  gl_FragColor = mix(front, sum, intensity);
}
`;

export default frag;