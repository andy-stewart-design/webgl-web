// #ifdef GL_ES
// precision highp float;
// #endif

// uniform vec2 u_resolution;
// uniform float u_time;
// uniform float u_pi;

// vec2 center = u_resolution.xy / vec2(2.);

// float circle(vec2 position, float radius) {
//     float radialGradient = distance(center, position);
//     return step(radius, radialGradient);
// }

// void main() {
//     vec2 position = gl_FragCoord.xy;

//     float radius = u_resolution.x / 8.;
//     float speed = u_time * 1.5;
//     float velocity = sin(speed + sin(speed)) * radius * 1.5;
//     float posX = position.x + velocity;

//     vec2 dynamicPosition = vec2(posX, position.y);
//     float dynamicRadius = radius + cos(speed + sin(speed)) * radius / 3.;

//     float shape = circle(dynamicPosition, dynamicRadius);
//     vec3 color = vec3(shape, shape, 1.);

//     gl_FragColor = vec4(color, 1.0);
// }

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_pi;

vec2 center = vec2(0.5);

float circle(vec2 position, float radius) {
    vec2 aspectRatio = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 correctedPosition = position * aspectRatio;
    vec2 correctedCenter = center * aspectRatio;
    float radialGradient = distance(correctedCenter, correctedPosition);
    return step(radius, radialGradient);
}

void main() {
    vec2 position = gl_FragCoord.xy / u_resolution;

    float radius = 0.2;
    float speed = u_time * 1.5;
    float velocity = sin(speed + sin(speed)) * radius * 1.25;
    float posX = position.x + velocity;

    vec2 dynamicPosition = vec2(posX, position.y);
    float dynamicRadius = radius + cos(speed + sin(speed)) * radius / 3.;

    float shape = circle(dynamicPosition, dynamicRadius);
    vec3 color = vec3(shape, shape, 1.);

    gl_FragColor = vec4(color, 1.);
}
