#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 n_mouse = u_mouse / u_resolution;
    vec3 color = vec3(smoothstep(n_mouse.x - 0.2, n_mouse.x + 0.2, uv.x));

    float ar = u_resolution.x / u_resolution.y;
    float offX = 0.125;
    float offY = offX * ar;

    float hor = step(0.5 - offX, uv.x - n_mouse.x + 0.5) * step(uv.x - n_mouse.x + 0.5, 0.5 + offX);
    float ver = step(0.5 - offY, uv.y - n_mouse.y + 0.5) * step(uv.y - n_mouse.y + 0.5, 0.5 + offY);

    gl_FragColor = vec4(vec3((hor * ver)), 1.0);
}