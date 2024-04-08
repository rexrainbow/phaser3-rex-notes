const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uMainSampler;

varying vec2 outTexCoord;
uniform float tintMode;
uniform vec4 tint;

void main ()
{
  vec4 texture = texture2D(uMainSampler, outTexCoord);
  vec4 texel = vec4(tint.rgb * tint.a, tint.a);
  vec4 color = texture * texel;
  if (tintMode == 1.0) {
    color.rgb = mix(texture.rgb, tint.rgb * tint.a, texture.a);
  } else if (tintMode == 2.0) {
    color = texel;
  }
  gl_FragColor = color;
}
`;

export default frag;