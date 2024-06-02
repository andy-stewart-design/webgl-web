#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float thickness) {
    return smoothstep(thickness, thickness - 0.0000001, abs(st.y - st.x));
}

void main() {
    vec2 position = gl_FragCoord.xy / u_resolution;

    // Plot a line
    float line = plot(position, 0.02);
    vec3 bgGradient = vec3(position.x);
    vec3 fgColor = vec3(0., 0., 1.);
    vec3 fragColor = (1.0 - line) * bgGradient + line * fgColor;

    gl_FragColor = vec4(fragColor, 1.0);
}