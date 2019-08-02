const frag = `
precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D iChannel0;

varying vec2 fragCoord;

//  The bigger the MAG, the more SAMPLES needed to smooth it out
//  0.005 + 10 = nice

#define PI 3.14159265359
#define SAMPLES 10
#define MAG 0.005

void main (void)
{
    vec2 uv = fragCoord.xy / resolution.xy;
    
    //  The color of the outline: vec3(1.0, 1.0, 0.0) = yellow
    // vec3 targetCol = vec3(1.0, 1.0, 0.0);

    //  The color of the outline: shift over time
    vec3 targetCol = vec3(sin(time), cos(time), 1.0);
    
    vec4 finalCol = vec4(0);
    
    //  Radians based on SAMPLES
    float rads = ((360.0 / float(SAMPLES)) * PI) / 180.0;
    
    for (int i = 0; i < SAMPLES; i++)
    {
        if (finalCol.w < 0.1)
        {
            //  with SAMPLES 4 this gives a nice hard outline
            // float r = radians(float((i*2+1)*180/SAMPLES));

            //  With SAMPLES 10 this gives a smooth outline
            float r = float(i + 1) * rads;

            //  Calculate vector based on current radians and multiply by magnitude
            vec2 offset = vec2(cos(r) * 1.0, -sin(r)) * MAG;

            //  Render the texture to the pixel on an offset UV
            finalCol = texture2D(iChannel0, uv + offset);

            if (finalCol.w > 0.0)
            {
                finalCol.xyz = targetCol;
            }
        }
    }
    
    vec4 tex = texture2D(iChannel0, uv);

    if (tex.w > 0.0)
    {
        //  If the centered texture's alpha is greater than 0, set finalcol to tex
        finalCol = tex;
    }
    
    gl_FragColor = finalCol;
}
`;

export default frag;