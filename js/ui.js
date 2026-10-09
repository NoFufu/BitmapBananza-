// UI layer on top of app.js: looks with live thumbnails, dock, split handle,
// command palette, shortcuts, toasts. app.js calls back in through window.ui.

(() => {
  const $ = (id) => document.getElementById(id);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  const openImageButton = $('openImage');
  const loadSampleButton = $('loadSample');
  const fileChip = $('fileChip');
  const fileChipName = $('fileChipName');
  const fileChipSize = $('fileChipSize');
  const splitHandle = $('splitHandle');
  const cropBar = $('cropBar');
  const dockCrop = $('dockCrop');
  const dockEraser = $('dockEraser');
  const dockMask = $('dockMask');
  const palette = $('palette');
  const paletteInput = $('paletteInput');
  const paletteList = $('paletteList');
  const shortcuts = $('shortcuts');
  const toastEl = $('toast');
  const lookButtons = Array.from(document.querySelectorAll('.look'));
  const imageOnlyControls = [
    'viewOriginal', 'viewSplit', 'viewProcessed', 'zoomOut', 'zoomReset', 'zoomIn', 'zoomFit',
    'dockCrop', 'dockEraser', 'dockMask', 'generateVariants', 'startCrop', 'resetCrop', 'makeShirtReady', 'clearEraser'
  ].map($);

  // ---------- Toast ----------

  let toastTimer = null;
  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('visible'), 3200);
  }

  // ---------- Opening images ----------

  function openFilePicker() { upload.click(); }

  openImageButton.addEventListener('click', openFilePicker);
  emptyState.addEventListener('click', openFilePicker);
  loadSampleButton.addEventListener('click', loadSampleImage);

  // A generated portrait with soft gradients, hard shapes and type, so every look has something to chew on.
  function loadSampleImage() {
    const c = document.createElement('canvas');
    c.width = 1400;
    c.height = 1050;
    const g = c.getContext('2d');
    const bg = g.createRadialGradient(420, 300, 40, 600, 520, 900);
    bg.addColorStop(0, '#fbe9d2');
    bg.addColorStop(0.45, '#a87850');
    bg.addColorStop(1, '#1e150f');
    g.fillStyle = bg;
    g.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 14; i++) {
      g.strokeStyle = `rgba(255,255,255,${0.04 + i * 0.012})`;
      g.lineWidth = 3;
      g.beginPath();
      g.arc(1150, 180, 60 + i * 26, 0, Math.PI * 2);
      g.stroke();
    }
    const face = g.createRadialGradient(640, 430, 30, 700, 520, 330);
    face.addColorStop(0, '#f7d6b6');
    face.addColorStop(0.6, '#c38a60');
    face.addColorStop(1, '#4d301f');
    g.fillStyle = face;
    g.beginPath();
    g.ellipse(700, 540, 250, 320, 0, 0, Math.PI * 2);
    g.fill();
    const hair = g.createLinearGradient(0, 160, 0, 420);
    hair.addColorStop(0, '#120b07');
    hair.addColorStop(1, '#4a2f1d');
    g.fillStyle = hair;
    g.beginPath();
    g.ellipse(700, 330, 290, 170, 0, Math.PI, 0);
    g.fill();
    g.fillStyle = '#1d120b';
    g.beginPath(); g.ellipse(605, 510, 42, 20, 0, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.ellipse(795, 510, 42, 20, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#5a2a1e';
    g.lineWidth = 16;
    g.lineCap = 'round';
    g.beginPath(); g.arc(700, 640, 90, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
    g.fillStyle = '#ffffff';
    g.font = '900 150px Archivo, Arial Black, Arial, sans-serif';
    g.fillText('BANANZA', 60, 1000);
    c.toBlob((blob) => {
      const file = new File([blob], 'beispielbild.png', { type: 'image/png' });
      setBatchFiles([file]);
      loadImageFromFile(file);
    }, 'image/png');
  }

  function onImageLoaded(file, img) {
    fileChip.hidden = false;
    fileChipName.textContent = file.name;
    fileChipName.title = file.name;
    fileChipSize.textContent = `${img.width} × ${img.height} px`;
    loadSampleButton.hidden = true;
    canvasWrap.classList.remove('is-empty');
    const base = file.name.replace(/\.[^.]+$/, '');
    if (base && base !== 'beispielbild') exportNameInput.value = sanitizeFileName(base) || exportNameInput.value;
    imageOnlyControls.forEach((el) => { if (el) el.disabled = false; });
    updateExportUI();
    scheduleLookThumbs();
    syncTools();
  }

  function onImageChanged() {
    if (originalImage) fileChipSize.textContent = `${originalImage.width} × ${originalImage.height} px`;
    scheduleLookThumbs();
  }

  imageOnlyControls.forEach((el) => { if (el) el.disabled = true; });
  canvasWrap.classList.add('is-empty');

  // ---------- Look thumbnails rendered from the current image ----------

  const THUMB_W = 240;
  const THUMB_H = 180;
  let thumbJob = 0;

  function coverSource(image) {
    const c = document.createElement('canvas');
    c.width = THUMB_W;
    c.height = THUMB_H;
    const g = c.getContext('2d');
    const scale = Math.max(THUMB_W / image.width, THUMB_H / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    g.imageSmoothingQuality = 'high';
    g.drawImage(image, (THUMB_W - w) / 2, (THUMB_H - h) / 2, w, h);
    return c;
  }

  function renderPixelThumb(source, preset) {
    const block = 5;
    const sw = Math.ceil(THUMB_W / block);
    const sh = Math.ceil(THUMB_H / block);
    const small = document.createElement('canvas');
    small.width = sw;
    small.height = sh;
    const sg = small.getContext('2d', { willReadFrequently: true });
    sg.drawImage(source, 0, 0, sw, sh);
    const data = sg.getImageData(0, 0, sw, sh);
    const factor = (259 * (preset.contrast + 255)) / (255 * (259 - preset.contrast));
    for (let i = 0; i < data.data.length; i += 4) {
      const lum = 0.299 * data.data[i] + 0.587 * data.data[i + 1] + 0.114 * data.data[i + 2];
      const v = factor * (lum - 128) + 128 < preset.threshold ? 0 : 255;
      data.data[i] = data.data[i + 1] = data.data[i + 2] = v;
      data.data[i + 3] = 255;
    }
    sg.putImageData(data, 0, 0);
    const out = document.createElement('canvas');
    out.width = THUMB_W;
    out.height = THUMB_H;
    const og = out.getContext('2d');
    og.imageSmoothingEnabled = false;
    og.drawImage(small, 0, 0, THUMB_W, THUMB_H);
    return out;
  }

  function scheduleLookThumbs() {
    const image = previewImage || originalImage;
    if (!image) return;
    const job = ++thumbJob;
    const source = coverSource(image);
    let index = 0;
    const next = () => {
      if (job !== thumbJob || index >= lookButtons.length) return;
      const button = lookButtons[index++];
      const preset = presets[button.dataset.preset];
      const thumb = button.querySelector('canvas');
      try {
        let rendered;
        if (preset.graphicMode === 'pixelBitmap') {
          rendered = renderPixelThumb(source, preset);
        } else {
          rendered = document.createElement('canvas');
          processFullDetailGraphic(getRenderSettingsFromPresetData(preset), source, rendered, rendered.getContext('2d', { willReadFrequently: true }), false);
        }
        thumb.width = THUMB_W;
        thumb.height = THUMB_H;
        const tg = thumb.getContext('2d');
        tg.fillStyle = '#fff';
        tg.fillRect(0, 0, THUMB_W, THUMB_H);
        tg.drawImage(rendered, 0, 0, THUMB_W, THUMB_H);
      } catch (err) {
        console.warn('Look thumbnail failed', button.dataset.preset, err);
      }
      setTimeout(next, 16);
    };
    next();
    $('looksNote').textContent = 'Vorschau mit deinem Bild';
  }

  // Before any image: a tiny procedural sample per look, so the grid is not blank.
  function drawPlaceholderThumbs() {
    const c = document.createElement('canvas');
    c.width = THUMB_W;
    c.height = THUMB_H;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(90, 70, 10, 120, 90, 160);
    grad.addColorStop(0, '#eee');
    grad.addColorStop(0.55, '#777');
    grad.addColorStop(1, '#111');
    g.fillStyle = grad;
    g.fillRect(0, 0, THUMB_W, THUMB_H);
    g.fillStyle = '#222';
    g.beginPath();
    g.ellipse(120, 96, 52, 64, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#ddd';
    g.beginPath();
    g.ellipse(108, 80, 26, 30, 0, 0, Math.PI * 2);
    g.fill();
    lookButtons.forEach((button) => {
      const preset = presets[button.dataset.preset];
      const thumb = button.querySelector('canvas');
      thumb.width = THUMB_W;
      thumb.height = THUMB_H;
      const tg = thumb.getContext('2d');
      try {
        const rendered = preset.graphicMode === 'pixelBitmap'
          ? renderPixelThumb(c, preset)
          : (() => {
            const out = document.createElement('canvas');
            processFullDetailGraphic(getRenderSettingsFromPresetData(preset), c, out, out.getContext('2d', { willReadFrequently: true }), false);
            return out;
          })();
        tg.drawImage(rendered, 0, 0, THUMB_W, THUMB_H);
      } catch (err) {
        tg.fillStyle = '#fff';
        tg.fillRect(0, 0, THUMB_W, THUMB_H);
      }
    });
  }

  // ---------- Range fill, dirty markers ----------

  const effectSections = Array.from(document.querySelectorAll('.left-sidebar details.control-group'));
  const toolOnly = new Set(['eraserSize', 'manualEraser', 'maskPreview']);

  effectSections.forEach((section) => {
    const dot = document.createElement('span');
    dot.className = 'section-dirty';
    dot.hidden = true;
    dot.title = 'Hier ist etwas verändert';
    section.querySelector('summary').appendChild(dot);
  });

  function defaultOf(control) {
    if (control.type === 'checkbox') return control.defaultChecked;
    if (control.tagName === 'SELECT') {
      const def = Array.from(control.options).find((o) => o.defaultSelected) || control.options[0];
      return def ? def.value : '';
    }
    return control.defaultValue;
  }

  function isChanged(control) {
    if (control.type === 'checkbox') return control.checked !== control.defaultChecked;
    return String(control.value) !== String(defaultOf(control));
  }

  function setRangeFill(input) {
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const p = ((Number(input.value) - min) / (max - min || 1)) * 100;
    input.style.setProperty('--p', `${p}%`);
  }

  function refreshControls() {
    document.querySelectorAll('input[type="range"]').forEach((input) => {
      setRangeFill(input);
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) label.classList.toggle('is-dirty', input.value !== input.defaultValue);
    });
    effectSections.forEach((section) => {
      const changed = Array.from(section.querySelectorAll('input, select'))
        .some((control) => !toolOnly.has(control.id) && isChanged(control));
      section.querySelector('.section-dirty').hidden = !changed;
    });
    canvasWrap.classList.toggle('is-transparent', transparentInput.checked);
  }

  document.addEventListener('input', (e) => { if (e.target.type === 'range') setRangeFill(e.target); });
  document.addEventListener('change', refreshControls);

  // ---------- Dock, crop bar, split handle ----------

  function syncTools() {
    const hasImage = Boolean(originalImage);
    dockCrop.setAttribute('aria-pressed', String(Boolean(cropActive)));
    dockEraser.setAttribute('aria-pressed', String(manualEraserInput.checked));
    dockMask.setAttribute('aria-pressed', String(maskPreviewInput.checked));
    cropBar.hidden = !cropActive;
    splitHandle.hidden = !(hasImage && viewModeInput.value === 'split' && !maskPreviewInput.checked && !cropActive);
    positionSplitHandle();
  }

  function toggleCrop() {
    if (!originalImage) return;
    if (cropActive) stopCropMode();
    else startCropMode();
  }

  function toggleCheckbox(input) {
    if (!originalImage) return;
    input.checked = !input.checked;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    syncTools();
  }

  function toggleSplit() {
    if (!originalImage) return;
    setViewMode(viewModeInput.value === 'split' ? 'processed' : 'split');
  }

  dockCrop.addEventListener('click', toggleCrop);
  dockEraser.addEventListener('click', () => toggleCheckbox(manualEraserInput));
  dockMask.addEventListener('click', () => toggleCheckbox(maskPreviewInput));
  $('dockKeys').addEventListener('click', () => showDialog(shortcuts));
  $('cropBarCancel').addEventListener('click', stopCropMode);
  $('cropBarApply').addEventListener('click', applyCropSelection);
  maskPreviewInput.addEventListener('change', syncTools);

  function positionSplitHandle() {
    if (splitHandle.hidden) return;
    splitHandle.style.left = `${canvas.offsetLeft + splitPosition * canvas.clientWidth}px`;
    splitHandle.style.top = `${canvas.offsetTop}px`;
    splitHandle.style.height = `${canvas.clientHeight}px`;
    splitHandle.setAttribute('aria-valuenow', String(Math.round(splitPosition * 100)));
  }

  function setSplit(value) {
    splitPosition = Math.min(1, Math.max(0, value));
    redrawDisplayCanvas();
    positionSplitHandle();
  }

  splitHandle.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    splitHandle.setPointerCapture(e.pointerId);
    const move = (ev) => {
      const rect = canvas.getBoundingClientRect();
      setSplit((ev.clientX - rect.left) / rect.width);
    };
    const up = () => {
      splitHandle.removeEventListener('pointermove', move);
      splitHandle.removeEventListener('pointerup', up);
      splitHandle.removeEventListener('pointercancel', up);
    };
    splitHandle.addEventListener('pointermove', move);
    splitHandle.addEventListener('pointerup', up);
    splitHandle.addEventListener('pointercancel', up);
  });

  splitHandle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { setSplit(splitPosition - 0.02); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setSplit(splitPosition + 0.02); e.preventDefault(); }
  });

  // ---------- Dialogs ----------

  let lastFocus = null;

  function showDialog(dialog) {
    lastFocus = document.activeElement;
    dialog.hidden = false;
    const focusTarget = dialog.querySelector('input, button');
    if (focusTarget) focusTarget.focus();
  }

  function hideDialog(dialog) {
    if (dialog.hidden) return;
    dialog.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  [palette, shortcuts].forEach((dialog) => {
    dialog.addEventListener('pointerdown', (e) => { if (e.target === dialog) hideDialog(dialog); });
  });
  $('shortcutsClose').addEventListener('click', () => hideDialog(shortcuts));

  // ---------- Command palette ----------

  const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const labelText = (label) => (label ? label.firstChild.textContent.trim() : '');
  const sectionName = (el) => {
    const section = el.closest('details.control-group');
    if (section) return section.querySelector('summary').firstChild.textContent.trim();
    return el.closest('.looks') ? 'Looks' : '';
  };

  function buildCommands() {
    const commands = [];
    const action = (label, group, run, enabled = () => true, keys = '') => commands.push({ label, group, run, enabled, keys });
    const hasImage = () => Boolean(originalImage);
    const mod = isMac ? '⌘' : 'Strg ';

    action('Bild öffnen', 'Datei', openFilePicker, () => true, `${mod}O`);
    action('Beispielbild laden', 'Datei', loadSampleImage);
    action('PNG exportieren', 'Export', downloadPNG, hasImage, `${mod}S`);
    action('Export-Paket als ZIP', 'Export', downloadExportPack, hasImage);
    action('SVG-Vektor exportieren', 'Export', downloadSVG, hasImage);
    action('Rückgängig', 'Verlauf', undoState, () => historyStack.length > 0, `${mod}Z`);
    action('Wiederholen', 'Verlauf', redoState, () => redoStack.length > 0, `${mod}⇧Z`);
    action('Einpassen', 'Ansicht', fitZoomToScreen, hasImage, 'F');
    action('Zoom 100 %', 'Ansicht', () => setZoom(100), hasImage, '1');
    action('Vorher zeigen', 'Ansicht', () => setViewMode('original'), hasImage);
    action('Vorher/Nachher teilen', 'Ansicht', () => setViewMode('split'), hasImage, 'S');
    action('Nachher zeigen', 'Ansicht', () => setViewMode('processed'), hasImage);
    action('Zuschneiden', 'Werkzeug', toggleCrop, hasImage, 'C');
    action('Radierer', 'Werkzeug', () => toggleCheckbox(manualEraserInput), hasImage, 'E');
    action('Maske anzeigen', 'Werkzeug', () => toggleCheckbox(maskPreviewInput), hasImage, 'M');
    action('Varianten rendern', 'Werkzeug', generateVariantComparison, hasImage);
    action('Shirt-fertig machen', 'Werkzeug', makeShirtReady, hasImage);
    action('Alle Regler zurücksetzen', 'Regler', resetControls);
    action('Tastenkürzel anzeigen', 'Hilfe', () => showDialog(shortcuts), () => true, '?');

    lookButtons.forEach((button) => {
      action(`Look: ${button.querySelector('.look-name').textContent}`, 'Looks', () => button.click());
    });

    document.querySelectorAll('.control-group input[type="range"], .control-group select, .control-group input[type="checkbox"]').forEach((control) => {
      const label = control.type === 'checkbox' ? control.closest('label') : document.querySelector(`label[for="${control.id}"]`);
      const name = control.type === 'checkbox' ? label.textContent.trim() : labelText(label);
      if (!name) return;
      const group = sectionName(control);
      commands.push({
        label: name,
        group,
        control,
        value: () => {
          if (control.type === 'checkbox') return control.checked ? 'an' : 'aus';
          if (control.tagName === 'SELECT') return control.options[control.selectedIndex]?.text || '';
          return control.value;
        },
        run: () => revealControl(control),
        enabled: () => true
      });
      if (control.tagName === 'SELECT' && control.options.length > 2) {
        Array.from(control.options).forEach((option) => {
          commands.push({
            label: `${name}: ${option.text}`,
            group,
            run: () => {
              control.value = option.value;
              control.dispatchEvent(new Event('change', { bubbles: true }));
              revealControl(control, false);
            },
            enabled: () => true,
            minQuery: 2
          });
        });
      }
    });
    return commands;
  }

  function revealControl(control, focus = true) {
    const section = control.closest('details');
    if (section) section.open = true;
    const target = control.type === 'checkbox' ? control.closest('label') : (document.querySelector(`label[for="${control.id}"]`) || control);
    target.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    target.classList.remove('flash');
    void target.offsetWidth;
    target.classList.add('flash');
    if (focus) control.focus({ preventScroll: true });
  }

  let commands = [];
  let results = [];
  let activeIndex = 0;

  function score(command, tokens) {
    const hay = normalize(`${command.label} ${command.group}`);
    let total = 0;
    for (const token of tokens) {
      const at = hay.indexOf(token);
      if (at < 0) return -1;
      total += at === 0 ? 3 : (hay[at - 1] === ' ' || hay[at - 1] === ':' ? 2 : 1);
    }
    if (command.control) total += 0.5;
    return total;
  }

  function highlight(label, tokens) {
    const escaped = label.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    if (!tokens.length) return escaped;
    const norm = normalize(label);
    const at = norm.indexOf(tokens[0]);
    if (at < 0) return escaped;
    const end = at + tokens[0].length;
    const raw = label;
    const enc = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    return `${enc(raw.slice(0, at))}<mark>${enc(raw.slice(at, end))}</mark>${enc(raw.slice(end))}`;
  }

  function renderPalette() {
    const query = normalize(paletteInput.value.trim());
    const tokens = query.split(/\s+/).filter(Boolean);
    results = commands
      .filter((c) => c.enabled() && (!c.minQuery || query.length >= c.minQuery))
      .map((c) => ({ c, s: tokens.length ? score(c, tokens) : (c.control ? 0 : 1) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 40)
      .map((r) => r.c);
    if (!tokens.length) results = results.filter((c) => !c.control && !c.label.startsWith('Look:')).slice(0, 12);
    activeIndex = Math.min(activeIndex, Math.max(0, results.length - 1));
    paletteList.innerHTML = '';
    if (!results.length) {
      const li = document.createElement('li');
      li.className = 'palette-empty';
      li.textContent = 'Nichts gefunden. Versuch es mit einem Reglernamen wie „Körnung“ oder „Halftone“.';
      paletteList.appendChild(li);
      return;
    }
    results.forEach((command, i) => {
      const li = document.createElement('li');
      li.className = 'palette-item';
      li.id = `palette-item-${i}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === activeIndex));
      const value = command.value ? `<span class="palette-item-value">${command.value()}</span>` : '';
      const keys = command.keys ? `<kbd>${command.keys}</kbd>` : '';
      li.innerHTML = `<span class="palette-item-label">${highlight(command.label, tokens)}</span>${value}<span class="palette-item-group">${command.group}</span>${keys}`;
      li.addEventListener('pointermove', () => setActive(i));
      li.addEventListener('click', () => runCommand(i));
      paletteList.appendChild(li);
    });
    paletteInput.setAttribute('aria-activedescendant', `palette-item-${activeIndex}`);
  }

  function setActive(i) {
    if (i === activeIndex) return;
    const prev = paletteList.children[activeIndex];
    if (prev) prev.setAttribute('aria-selected', 'false');
    activeIndex = i;
    const next = paletteList.children[activeIndex];
    if (next) {
      next.setAttribute('aria-selected', 'true');
      next.scrollIntoView({ block: 'nearest' });
    }
    paletteInput.setAttribute('aria-activedescendant', `palette-item-${activeIndex}`);
  }

  function runCommand(i) {
    const command = results[i];
    if (!command) return;
    palette.hidden = true;
    lastFocus = null;
    command.run();
  }

  function openPalette() {
    commands = buildCommands();
    paletteInput.value = '';
    activeIndex = 0;
    renderPalette();
    showDialog(palette);
  }

  paletteInput.addEventListener('input', () => { activeIndex = 0; renderPalette(); });
  paletteInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { setActive(Math.min(results.length - 1, activeIndex + 1)); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { setActive(Math.max(0, activeIndex - 1)); e.preventDefault(); }
    else if (e.key === 'Enter') { runCommand(activeIndex); e.preventDefault(); }
    else if (e.key === 'Escape') { hideDialog(palette); e.preventDefault(); }
  });
  $('paletteTrigger').addEventListener('click', openPalette);
  $('paletteHint').textContent = isMac ? '⌘K' : 'Strg K';

  // ---------- Keyboard shortcuts ----------

  let peekRestore = null;

  function isTyping(target) {
    if (!target) return false;
    if (target.isContentEditable) return true;
    if (target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return true;
    return target.tagName === 'INPUT' && !['range', 'checkbox', 'button'].includes(target.type);
  }

  document.addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;
    const key = e.key.toLowerCase();

    if (mod && key === 'k') { e.preventDefault(); palette.hidden ? openPalette() : hideDialog(palette); return; }
    if (!palette.hidden) return;

    if (e.key === 'Escape') {
      if (!shortcuts.hidden) { hideDialog(shortcuts); return; }
      if (!abCompare.classList.contains('is-hidden')) { hideABComparison(); return; }
      if (cropActive) { stopCropMode(); return; }
      if (manualEraserInput.checked) { toggleCheckbox(manualEraserInput); return; }
      return;
    }

    if (mod) {
      if (isTyping(e.target) && ['z', 'y'].includes(key)) return;
      if (key === 'z' && !e.shiftKey) { e.preventDefault(); undoState(); }
      else if ((key === 'z' && e.shiftKey) || key === 'y') { e.preventDefault(); redoState(); }
      else if (key === 'o') { e.preventDefault(); openFilePicker(); }
      else if (key === 's') { e.preventDefault(); if (originalImage) downloadPNG(); }
      return;
    }

    if (e.altKey || isTyping(e.target)) return;
    if (e.key === '?') { showDialog(shortcuts); return; }
    if (!originalImage) return;

    if (key === 'b' && !e.repeat && !peekRestore) {
      peekRestore = viewModeInput.value;
      setViewMode('original');
    } else if (key === 's' && !e.repeat) toggleSplit();
    else if (key === 'f') fitZoomToScreen();
    else if (key === '1') setZoom(100);
    else if (e.key === '+' || e.key === '=') stepZoom(1);
    else if (e.key === '-' || e.key === '_') stepZoom(-1);
    else if (key === 'c' && !e.repeat) toggleCrop();
    else if (key === 'e' && !e.repeat) toggleCheckbox(manualEraserInput);
    else if (key === 'm' && !e.repeat) toggleCheckbox(maskPreviewInput);
    else if (e.key === 'Enter' && cropActive) applyCropSelection();
  });

  document.addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'b' && peekRestore) {
      setViewMode(peekRestore);
      peekRestore = null;
    }
  });

  window.addEventListener('blur', () => {
    if (peekRestore) { setViewMode(peekRestore); peekRestore = null; }
  });

  // Dropping files anywhere on the stage, not only on the sheet.
  ['dragenter', 'dragover'].forEach((type) => stage.addEventListener(type, (e) => {
    e.preventDefault();
    canvasWrap.classList.add('dragover');
  }));
  stage.addEventListener('dragleave', (e) => { if (!stage.contains(e.relatedTarget)) canvasWrap.classList.remove('dragover'); });
  stage.addEventListener('drop', (e) => {
    e.preventDefault();
    canvasWrap.classList.remove('dragover');
    if (e.target.closest('#canvasWrap')) return;
    const files = Array.from(e.dataTransfer.files || []).filter((file) => file.type.startsWith('image/'));
    setBatchFiles(files);
    if (files[0]) loadImageFromFile(files[0]);
  });

  // ---------- Hooks for app.js ----------

  window.ui = {
    toast,
    onImageLoaded,
    onImageChanged,
    onRedraw: syncTools,
    onToolsChanged: syncTools,
    onViewportChanged: positionSplitHandle,
    onValuesChanged: refreshControls
  };

  refreshControls();
  updateHistoryButtons();
  try { drawPlaceholderThumbs(); } catch (err) { console.warn(err); }
})();
