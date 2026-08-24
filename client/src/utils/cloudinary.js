// Product images are hosted on Cloudinary, which can resize/re-compress an
// image on the fly via URL parameters - no re-uploading or local processing
// needed. This inserts a transformation segment right after "/upload/" in a
// Cloudinary delivery URL, e.g.:
//   https://res.cloudinary.com/<cloud>/image/upload/v123/foo.jpg
//   -> https://res.cloudinary.com/<cloud>/image/upload/w_400,q_auto,f_auto,c_limit/v123/foo.jpg
//
// q_auto / f_auto let Cloudinary pick the best quality/format (e.g. WebP/AVIF
// for browsers that support it) for the requested width. c_limit means it
// only ever shrinks the image, never upscales past its real size.

function cloudinaryUrlAtWidth(url, width) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url; // Not a Cloudinary URL (or already transformed) - leave as-is.
  }
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto,c_limit/`);
}

// Builds a src (at `defaultWidth`) + srcSet pair for a Cloudinary image, so
// the browser can pick whichever listed width best fits how large the image
// is actually being displayed instead of always downloading the full-size
// original.
export function cloudinarySrcSet(url, widths, defaultWidth) {
  return {
    src: cloudinaryUrlAtWidth(url, defaultWidth ?? widths[widths.length - 1]),
    srcSet: widths.map((w) => `${cloudinaryUrlAtWidth(url, w)} ${w}w`).join(', '),
  };
}
