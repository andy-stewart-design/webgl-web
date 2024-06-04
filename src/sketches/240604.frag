#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Resolution of the screen
uniform float u_time; // Time for animation

// Function to map a value from one range to another
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

// Function to normalize the sine wave value
float nSin(float val) {
    return map(sin(val), -1.0, 1.0, 0.0, 1.0);
}

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // uv.x = nSin(uv.x * 9.);
    // uv.y = nSin(uv.y * 9.);

    // vec2 pos = vec2(cos(u_time), sin(u_time)) * 0.1;

    // float sizeChange = sin(u_time * 2.) * 0.2;

    // float circle = smoothstep(0.39999 + sizeChange, 0.4 + sizeChange, distance(vec2(0.5), uv + pos));
    float circle = 1.;
    const float count = 20.;
    float speed = u_time * 2.;
    float alpha = 1.;

    for(float i = 0.; i <= count; i++) {
        float off = 0.25 * i;
        float grid = 1. / count;
        float period = sin(speed + off) / 2.;
        float absPeriod = (1. - abs(period));
        float y = map(period, -0.5, 0.5, 0.1, 0.9);
        float radius = 1. / count * 1.5;
        float dynamicRadius = radius * absPeriod;
        circle *= smoothstep(dynamicRadius - 0.05, dynamicRadius, distance(vec2(grid * i, y), uv));
        circle *= smoothstep(dynamicRadius - 0.0875, dynamicRadius, distance(vec2(grid * i, 1. - y), uv));
    }

    // float circle = smoothstep(0., 1., distanceFromCenter);
    // circle = circle * step(radius, distance(vec2(0., 0.5), uv));
    // circle = circle * step(radius, distance(vec2(1., 0.5), uv));
    float foo = 0.;
    if(1. - circle >= 0.5)
        foo = 1. - uv.x;

    vec3 color = vec3(foo, 0., 1. - circle);

    // Output the final color
    gl_FragColor = vec4(color, alpha);
}
