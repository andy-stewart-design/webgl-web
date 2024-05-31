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

    float radius = u_canvas.x / 8.;
    float speed = u_time * 1.5;
    float velocity = sin(speed + sin(speed)) * radius * 1.5;
    float posX = position.x + velocity;

    vec2 dynamicPosition = vec2(posX, position.y);
    float dynamicRadius = radius + cos(speed + sin(speed)) * radius / 3.;

    float shape = circle(dynamicPosition, dynamicRadius);
    vec3 color = vec3(shape, shape, 1.);

    gl_FragColor = vec4(color, 1.0);
}