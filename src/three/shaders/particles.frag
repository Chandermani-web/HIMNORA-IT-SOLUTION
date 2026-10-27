uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vDist;
varying float vAlpha;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = pow(smoothstep(0.5, 0.0, d), 1.6);
  vec3 col = mix(uColorA, uColorB, smoothstep(0.1, 0.95, vDist));
  gl_FragColor = vec4(col, a * vAlpha);
}
