// reference : https://www.geeks3d.com/20110428/shader-library-swirl-post-processing-filter-in-glsl/

const frag = `
precision mediump float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Currently not used in this demo!
uniform float time; 

// GeeXLab built-in uniform, width of
// the current render target
uniform float rt_w; 
// GeeXLab built-in uniform, height of
// the current render target
uniform float rt_h; 

// Swirl effect parameters
uniform float radius;
uniform float angle;
uniform float center_x; 
uniform float center_y;

vec4 PostFX(sampler2D tex, vec2 uv, float time)
{
  vec2 texSize = vec2(rt_w, rt_h);
  vec2 center = vec2(center_x, center_y);
  vec2 tc = uv * texSize;
  tc -= center;
  float dist = length(tc);
  if (dist < radius) 
  {
    float percent = (radius - dist) / radius;
    float theta = percent * percent * angle * 8.0;
    float s = sin(theta);
    float c = cos(theta);
    tc = vec2(dot(tc, vec2(c, -s)), dot(tc, vec2(s, c)));
  }
  tc += center;
  vec3 color = texture2D(tex, tc / texSize).rgb;
  return vec4(color, 1.0);
}

void main (void)
{
  gl_FragColor = PostFX(uMainSampler, outTexCoord, time);
}
`;

export default frag;