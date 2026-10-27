uniform float uTime;
uniform vec2 uPointer;     // pointer in view-space units at the scene plane
uniform float uPixelRatio;
uniform float uProgress;   // 0 → 1 fade-in after intro
attribute float aSeed;
attribute float aSize;
varying float vDist;
varying float vAlpha;

void main() {
  vec3 p = position;
  float t = uTime * 0.12;

  // curl-ish drift: three decorrelated noise lookups
  vec3 n = vec3(
    snoise(vec3(p.xy * 0.25, t + aSeed * 10.0)),
    snoise(vec3(p.yz * 0.25 + 7.1, t + aSeed * 10.0)),
    snoise(vec3(p.zx * 0.25 + 13.3, t))
  );
  p += n * 0.9;

  // slow orbit around Y
  float a = uTime * 0.05 * (0.5 + aSeed);
  float c = cos(a), s = sin(a);
  p.xz = mat2(c, -s, s, c) * p.xz;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);

  // pointer repulsion
  vec2 d = mv.xy - uPointer;
  float dist = length(d);
  float push = smoothstep(2.4, 0.0, dist);
  mv.xy += normalize(d + vec2(1e-4)) * push * 1.2;

  vDist = clamp(length(p) / 8.0, 0.0, 1.0);
  vAlpha = (0.30 + 0.70 * aSeed) * uProgress;

  gl_PointSize = aSize * uPixelRatio * (16.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
