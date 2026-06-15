# Images

Raw photos live in `assets/originals/` (gitignored). Never commit originals.

## Workflow

1. Drop source files (JPEG, PNG, HEIC, etc.) into `assets/originals/`.
   Subfolders are preserved in the output (e.g. `assets/originals/gallery/photo.jpg`).
2. Run `npm run images:convert` to write WebP files to `public/images/`.
3. Reference converted files in code as `/images/...webp`.

Use `npm run images:convert:thumb` to also generate `-thumb.webp` variants (max 600px wide) for gallery grids.

SVG logos and icons can go directly in `public/` — they are not processed by the convert script.
