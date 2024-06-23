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
uniform vec2 warp;
uniform float scanLineStrength;
uniform float scanLineWidth;

void main (void) {
  // squared distance from center
  vec2 uv = outTexCoord;
  vec2 dc = abs(0.5-uv);
  dc *= dc;
  
  // warp the fragment coordinates
  uv.x -= 0.5; 
  uv.x *= 1.0+(dc.y*warp.x);
  uv.x += 0.5;

  uv.y -= 0.5; 
  uv.y *= 1.0+(dc.x*warp.y); 
  uv.y += 0.5;

  // sample inside boundaries, otherwise set to black
  if (uv.y > 1.0 || uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0) {
    gl_FragColor = vec4(0.0,0.0,0.0,1.0);
  } else {
    // float apply = abs(sin(outTexCoord.y*scanLineWidth)*scanLineStrength);
    // gl_FragColor = vec4(mix(texture2D(uMainSampler,uv).rgb,vec3(0.0),apply),1.0);
    vec4 color = texture2D(uMainSampler,uv);
    color.rgb *= (1.-scanLineStrength)+(sin(outTexCoord.y*scanLineWidth)*scanLineStrength);
    gl_FragColor = color;
  }
}
`;

export default frag;