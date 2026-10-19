# CyberPenguin personal terminal

A buildless, dependency-free HTML/CSS/JavaScript starter with a green-phosphor CRT theme. All assets are local. Normal navigation and content work without JavaScript. No real shell commands execute.

## Edit content

Edit `index.html` directly. The marked sections contain the About, Projects, and Field notes placeholders. Replace or remove the sample content. Duplicate an `<article class="panel">` to add a project. Use normal headings, paragraphs, lists, links, images, code blocks, and `<details>` elements.

## Add a page

1. Copy `pages/template.html` to `pages/your-page.html`.
2. Change its `<title>`, description, heading, and main content.
3. Link to it from `index.html`, for example `<a href="./pages/your-page.html">My entry</a>`.
4. For pages nested more deeply, adjust the `../` asset and home-link paths.

Navigation is ordinary HTML on each page. If you change shared navigation, update each page. Add `data-command="name"` to a navigation link to make that name available in the optional shell automatically. Keep command names unique and avoid built-ins (`help`, `ls`, `whoami`, `date`, `clear`). No separate JavaScript registry is needed.

## Change the look

Edit the variables at the top of `assets/css/theme.css`: `--bg`, `--panel`, `--text`, `--bright`, `--muted`, `--line`, `--accent`, and `--glow`. The scanline and vignette overlays are in `.screen::after`. There is no flicker or forced typing delay. The CRT effects button disables the overlay and text glow; its preference is saved when browser storage is available. Reduced-motion settings disable cursor animation.

`assets/js/terminal.js` contains the optional command prompt, history (Up/Down), and unique-command completion (Tab). It renders input as text, never HTML. It does not evaluate JavaScript or execute system commands.

## Preview

Open `index.html` directly in a browser, or from this directory run:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. No Node, npm, bundler, or build step is required.

## GitHub Pages

The site files live at the repository root. In Settings → Pages, use **Deploy from a branch**, select `master`, and choose `/ (root)` when ready to publish the merged template. `.nojekyll` tells Pages to serve the files directly. The existing `CNAME` (`www.jeffenns.dev`) is preserved; domain/DNS settings have not been changed.

The previous website remains recoverable from Git history (last original commit: `9d01a7b`). Its existing `img/` photographs are retained for reuse but are not loaded by the new template.
