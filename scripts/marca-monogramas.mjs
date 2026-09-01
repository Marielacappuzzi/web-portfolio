import sharp from "sharp";

/*
  Re-cut both monograms from their lockups.

  The shipped mc-monograma.png was cropped 6 rows above where the drawing
  actually ends, so the bottoms of the m sat flat on the file's edge — which is
  the cut the client can see in the header. The lockups have the full mark:
  in the dark one it runs rows 2-223 with the wordmark starting at 251, in the
  light one rows 68-200 with the wordmark at 217.

  Both come out trimmed to their own ink and padded by the same fraction of it,
  so the two files finally describe the same drawing at the same scale inside
  their canvas. That is what lets the header stop scaling one of them by 1.62
  to match the other.
*/

const PAD = 0.04;                        // of the ink height, every side

async function cut({ from, to, rows, flat }) {
  const meta = await sharp(from).metadata();
  const { width, height } = meta;
  const raw = await sharp(from).ensureAlpha().raw().toBuffer();

  const isInk = (x, y) => {
    const i = (y * width + x) * 4;
    const a = raw[i + 3];
    if (flat) {
      const lum = raw[i] * 0.2126 + raw[i + 1] * 0.7152 + raw[i + 2] * 0.0722;
      return lum > 72;                   // light stroke over #303030
    }
    return a > 16;
  };

  // Horizontal extent of the monogram inside its band of rows.
  let x0 = width, x1 = -1, y0 = height, y1 = -1;
  for (let y = rows[0]; y <= rows[1]; y++)
    for (let x = 0; x < width; x++)
      if (isInk(x, y)) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }

  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  const pad = Math.round(h * PAD);

  /*
    Extract the ink exactly, then grow the canvas outwards. Padding by
    extending the crop instead would be clamped at the file's own edge — the
    dark mark starts 2px from it — and the two canvases would end up different
    proportions again, which is the whole thing being fixed here.
  */
  let img = sharp(await sharp(from).extract({ left: x0, top: y0, width: w, height: h }).png().toBuffer())
    .ensureAlpha()
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } });

  if (flat) {
    /*
      The light lockup was exported on a flat #303030 ground with no alpha, so
      the mark could only ever sit on that exact colour. Alpha is rebuilt from
      luminance — the drawing is a single near-white stroke, so how light a
      pixel is *is* how opaque it should be — and the result is white ink on
      nothing, usable over any dark ground and with its antialiasing intact.
    */
    const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const out = Buffer.alloc(info.width * info.height * 4);
    for (let p = 0; p < info.width * info.height; p++) {
      const i = p * 4;
      const lum = data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
      const a = Math.max(0, Math.min(255, Math.round(((lum - 48) / (255 - 48)) * 255)));
      out[i] = out[i + 1] = out[i + 2] = 255;
      out[i + 3] = a;
    }
    img = sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
  }

  const info = await img.png({ compressionLevel: 9 }).toFile(to);
  console.log(
    to.replace("public/marca/", "").padEnd(24),
    `ink ${w}x${h} at ${x0},${y0}`.padEnd(28),
    `pad ${pad}`.padEnd(8),
    `canvas ${info.width}x${info.height}`,
    `ratio ${(info.width / info.height).toFixed(4)}`,
  );
}

await cut({ from: "public/marca/lockup-oscuro.png", to: "public/marca/mc-monograma.png",       rows: [0, 223],  flat: false });
await cut({ from: "public/marca/lockup-claro.png",  to: "public/marca/mc-monograma-claro.png", rows: [68, 200], flat: true  });
