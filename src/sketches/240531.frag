#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_canvas;
uniform float u_time;

void main() {
    vec2 position = gl_FragCoord.xy;

    vec3 color = vec3(0., 0., 1.);

    if(position.x < u_canvas.x / 2.) {
        color = vec3(1., 0., 0.);
    }

    gl_FragColor = vec4(color, 1.);
}