#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float square(vec2 position, float size) {
    float min = 0.5 - size;
    float max = 0.5 + size;

    float top = step(position.y, max);
    float left = step(min, position.x);
    float bottom = step(min, position.y);
    float right = step(position.x, max);

    return 1. - top * left * bottom * right;
}

float circle(vec2 position, float radius) {
    float radialGradient = distance(vec2(0.5), position);
    return step(radius, radialGradient);
}

void main() {
    vec2 position = gl_FragCoord.xy / u_resolution;

    float speed = u_time * 1.5;
    float posX = position.x + sin(speed + sin(speed)) * 0.2;
    vec2 dynamicPos = vec2(posX, position.y);
    float radius = 0.125 + cos(speed + sin(speed)) * 0.033;

    float shape = circle(dynamicPos, radius);
    vec3 color = vec3(shape);

    gl_FragColor = vec4(color, 1.0);
}