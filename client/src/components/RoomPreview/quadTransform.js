// Warps a rectangular image onto an arbitrary 4-point quadrilateral (e.g. a
// wall photographed at an angle) using a single CSS `transform: matrix3d(...)`.
// No canvas, no library - the browser's own GPU-accelerated 3D transform does
// the actual pixel warping.
//
// The math is Paul Heckbert's classic "square-to-quad" projective mapping
// (Heckbert, "Fundamentals of Texture Mapping and Image Warping", 1989):
// first solve the projective transform that sends the unit square to the
// destination quad, then fold in a scale so it accepts real pixel
// dimensions (w x h) as the source rectangle instead of the unit square.

const lerpPoint = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// A point at fractional position (u,v) within a quad (u,v each 0..1),
// found by bilinearly interpolating its four corners - the quad equivalent
// of `x = x0 + (x1-x0)*t` for a plain rectangle. Works whether the quad is
// an axis-aligned rectangle or a skewed trapezoid.
const quadPoint = ([tl, tr, br, bl], u, v) =>
    lerpPoint(lerpPoint(tl, tr, u), lerpPoint(bl, br, u), v);

// Every wall area in roomConfig.js is sized for its room photo, not for any
// one painting - a tall narrow piece and a wide panoramic one shouldn't both
// get stretched to fill the exact same rectangle. This finds the largest
// sub-quad, centered within `quad`, that keeps `paintingAspect` (width/height)
// intact - the quad equivalent of `object-fit: contain`. `quad` is treated as
// a plain rectangle via its own bounding box for the aspect-ratio comparison
// (true for every current room; a very sharply skewed wall would only be
// approximate here, which is fine for this purpose).
export function fitQuad(quad, paintingAspect) {
    const xs = quad.map(p => p[0]);
    const ys = quad.map(p => p[1]);
    const boundW = Math.max(...xs) - Math.min(...xs);
    const boundH = Math.max(...ys) - Math.min(...ys);
    const quadAspect = boundW / boundH;

    let u0 = 0, u1 = 1, v0 = 0, v1 = 1;
    if (paintingAspect >= quadAspect) {
        const vMargin = (1 - quadAspect / paintingAspect) / 2;
        v0 = vMargin; v1 = 1 - vMargin;
    } else {
        const uMargin = (1 - paintingAspect / quadAspect) / 2;
        u0 = uMargin; u1 = 1 - uMargin;
    }

    return [
        quadPoint(quad, u0, v0), quadPoint(quad, u1, v0),
        quadPoint(quad, u1, v1), quadPoint(quad, u0, v1),
    ];
}

// Unlike fitQuad (which always blows a painting up to the largest size that
// fits the wall, so a postcard-sized piece and a huge canvas render
// identically big), this sizes the painting at its real physical scale
// relative to the wall - a 40cm painting looks small on the wall, a 150cm
// one looks genuinely large, the way it would on an actual wall. `widthCm`/
// `heightCm` are the painting's real dimensions; `wallWidthCm` is the real
// width the wall quad's own bounding box represents (see roomConfig.js).
// Both fractions are scaled down together (never independently) when the
// painting is too big for the wall, so an oversized piece still shrinks to
// fit without distorting its aspect ratio - the same "never stretch, only
// shrink-to-fit" contract fitQuad already has.
//
// `hAnchor`/`vAnchor` (0-1, default 0.5) place the painting within whatever
// slack space is left after sizing it - 0.5 centers it (the default, used
// everywhere except where a room calls out a different anchor and says why),
// 0 pins it to the quad's own left/top edge, 1 to its right/bottom edge.
// This only repositions the painting *within* the wall zone chosen in
// roomConfig.js - it's a smaller adjustment than moving the zone itself, for
// e.g. lining a painting up with a specific piece of furniture (living
// room's console) without changing the zone's size (and so its wallWidthCm
// calibration) at all.
export function scaledQuad(quad, widthCm, heightCm, wallWidthCm, hAnchor = 0.5, vAnchor = 0.5) {
    const xs = quad.map(p => p[0]);
    const ys = quad.map(p => p[1]);
    const boundW = Math.max(...xs) - Math.min(...xs);
    const boundH = Math.max(...ys) - Math.min(...ys);
    // The quad is treated as a plain rectangle for real-world scale too (see
    // fitQuad's own comment above) - its height in cm follows from its own
    // pixel aspect ratio, so a single wallWidthCm constant is enough per room.
    const wallHeightCm = wallWidthCm * (boundH / boundW);

    let uSize = widthCm / wallWidthCm;
    let vSize = heightCm / wallHeightCm;
    const overflow = Math.max(uSize, vSize, 1);
    uSize /= overflow;
    vSize /= overflow;

    const u0 = hAnchor * (1 - uSize), u1 = u0 + uSize;
    const v0 = vAnchor * (1 - vSize), v1 = v0 + vSize;

    return [
        quadPoint(quad, u0, v0), quadPoint(quad, u1, v0),
        quadPoint(quad, u1, v1), quadPoint(quad, u0, v1),
    ];
}

// quad = [[x,y], [x,y], [x,y], [x,y]] for [topLeft, topRight, bottomRight, bottomLeft],
// all in the same pixel space the transformed element is positioned in
// (i.e. absolute coordinates within its `position: relative` parent).
export function quadToMatrix3d(w, h, quad) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = quad;

    const dx1 = x1 - x2;
    const dx2 = x3 - x2;
    const dx3 = x0 - x1 + x2 - x3;
    const dy1 = y1 - y2;
    const dy2 = y3 - y2;
    const dy3 = y0 - y1 + y2 - y3;

    let a, b, c, d, e, f, g, hh;
    if (dx3 === 0 && dy3 === 0) {
        // Source maps to a parallelogram - no perspective term needed.
        a = x1 - x0; b = x2 - x1; c = x0;
        d = y1 - y0; e = y2 - y1; f = y0;
        g = 0; hh = 0;
    } else {
        const det = dx1 * dy2 - dx2 * dy1;
        g = (dx3 * dy2 - dx2 * dy3) / det;
        hh = (dx1 * dy3 - dy1 * dx3) / det;
        a = x1 - x0 + g * x1; b = x3 - x0 + hh * x3; c = x0;
        d = y1 - y0 + g * y1; e = y3 - y0 + hh * y3; f = y0;
    }

    // Fold in the source rect's real size (w x h) so the caller can position
    // a normally-sized element at its natural (0,0)-(w,h) box instead of a
    // 0..1 unit square, then hand the 3x3 projective matrix to CSS as a 4x4
    // matrix3d (columns below - CSS matrix3d is column-major). The z row/
    // column is left as identity since this only warps a flat, 2D image.
    const m00 = a / w, m01 = b / h, m02 = c;
    const m10 = d / w, m11 = e / h, m12 = f;
    const m20 = g / w, m21 = hh / h, m22 = 1;

    return `matrix3d(${m00},${m10},0,${m20}, ${m01},${m11},0,${m21}, 0,0,1,0, ${m02},${m12},0,${m22})`;
}
