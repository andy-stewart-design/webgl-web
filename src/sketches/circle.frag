#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_canvas;
uniform float u_time;

vec2 center = u_canvas.xy / vec2(2.);

float circle(vec2 position, float radius) {
    float radialGradient = distance(center, position);
    return step(radius, radialGradient);
}

void main() {
    vec2 position = gl_FragCoord.xy;

    float shape = circle(position, u_canvas.x / 5.);
    vec3 color = vec3(shape, shape, 1.);

    gl_FragColor = vec4(color, 1.0);
}