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

    uv.x = nSin(uv.x * 9.);
    uv.y = nSin(uv.y * 9.);

    vec2 pos = vec2(cos(u_time), sin(u_time)) * 0.1;

    float sizeChange = sin(u_time * 2.) * 0.2;
    float circle = smoothstep(0.39999 + sizeChange, 0.4 + sizeChange, distance(vec2(0.5), uv + pos));

    vec3 color = vec3(circle);

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
