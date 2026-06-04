const STORAGE_KEY = "winterfall-character-sheet-v1";
const SETTINGS_KEY = "winterfall-character-sheet-font-settings-v1";
const LAYOUT_KEY = "winterfall-character-sheet-field-layout-v5";
const PORTRAIT_KEY = "winterfall-character-sheet-portrait-v1";
const MIN_ZOOM = 0.75;
const MAX_ZOOM = 1.45;
const ZOOM_STEP = 0.1;
const AREA_STEP = 4;
const PORTRAIT_FRAME = { page: 1, x: 224, y: 363, w: 390, h: 360 };
const PORTRAIT_EXPORT_SIZE = { width: 1024, height: 945 };
const PORTRAIT_ASPECT = PORTRAIT_FRAME.h / PORTRAIT_FRAME.w;
const PORTRAIT_MIN_WIDTH = 140;
const DEFAULT_FONT_SETTINGS = {
  family: "serif",
  size: 100,
  weight: "650",
  align: "auto",
  color: "#120f0a",
};
const FONT_FAMILIES = {
  serif: 'Georgia, "Times New Roman", serif',
  sans: '"Segoe UI", Arial, sans-serif',
  mono: '"Courier New", Courier, monospace',
};
const PDF_TEXT_REPLACEMENTS = new Map([
  ["\u2018", "'"],
  ["\u2019", "'"],
  ["\u201a", ","],
  ["\u201c", '"'],
  ["\u201d", '"'],
  ["\u201e", '"'],
  ["\u2013", "-"],
  ["\u2014", "-"],
  ["\u2212", "-"],
  ["\u2022", "*"],
  ["\u2026", "..."],
  ["\u00a0", " "],
]);
const BASE_FIELD_LAYOUTS = {
  Name: { dx: -1, dy: 11, dw: 0, dh: 16 },
  Race: { dx: 0, dy: 9, dw: 0, dh: 8 },
  Strength_Mod: { dx: 1, dy: -3, dw: 0, dh: 0 },
  Flexibility_Mod: { dx: 0, dy: -3, dw: 0, dh: 0 },
  Nimbleness_Mod: { dx: 0, dy: -2, dw: 0, dh: 0 },
  Concentration_Value: { dx: 1, dy: -4, dw: 0, dh: 0 },
  Concentration_Mod: { dx: 0, dy: -3, dw: 0, dh: 0 },
  Intelligence_Value: { dx: 0, dy: -5, dw: 0, dh: 0 },
  Intelligence_Mod: { dx: 0, dy: -5, dw: 0, dh: 0 },
  Willpower_Value: { dx: 1, dy: -4, dw: 0, dh: 0 },
  Willpower_Mod: { dx: -1, dy: -2, dw: 0, dh: 0 },
  School_Mastery_1: { dx: -6, dy: 0, dw: 8, dh: 0 },
  School_Skilled_1: { dx: 0, dy: 11, dw: 0, dh: 24 },
  School_Skilled_3: { dx: -20, dy: 19, dw: 40, dh: 40 },
  School_Novice_1: { dx: -15, dy: 18, dw: 20, dh: 32 },
  School_Novice_4: { dx: -4, dy: 20, dw: 16, dh: 40 },
  School_Apprentice_1: { dx: -17, dy: 17, dw: 36, dh: 32 },
  Weapon_1: { dx: -8, dy: 0, dw: 16, dh: 0 },
  Damage_1: { dx: -13, dy: 11, dw: 16, dh: 20 },
  Range_1: { dx: 0, dy: 0, dw: 0, dh: 4 },
  Weapon_2: { dx: -9, dy: -9, dw: 24, dh: 4 },
  Damage_2: { dx: -12, dy: -6, dw: 16, dh: 8 },
  Range_2: { dx: 0, dy: -8, dw: 0, dh: 4 },
  Notes_2: { dx: -3, dy: -7, dw: 0, dh: 4 },
  Weapon_3: { dx: -3, dy: -50, dw: 0, dh: 0 },
  Damage_3: { dx: -12, dy: -16, dw: 12, dh: 0 },
  Range_3: { dx: -1, dy: -10, dw: 0, dh: 12 },
  Notes_3: { dx: -5, dy: -12, dw: 0, dh: 12 },
  Weapon_4: { dx: -8, dy: 12, dw: 0, dh: 0 },
  Notes_4: { dx: -2, dy: -24, dw: 0, dh: 0 },
};
const CHECKBOX_FIELD_LAYOUTS = {
  Strength_Prof_1: { dx: -6, dy: 12, dw: 12, dh: 12 },
  Strength_Prof_2: { dx: -7, dy: 11, dw: 12, dh: 12 },
  Strength_Prof_3: { dx: -6, dy: 12, dw: 12, dh: 12 },
  Strength_Prof_4: { dx: -6, dy: 11, dw: 12, dh: 12 },
  Strength_Prof_5: { dx: -6, dy: 11, dw: 12, dh: 12 },
  Agility_Prof_1: { dx: -4, dy: 9, dw: 12, dh: 12 },
  Agility_Prof_2: { dx: -4, dy: 9, dw: 12, dh: 12 },
  Agility_Prof_3: { dx: -4, dy: 9, dw: 12, dh: 12 },
  Agility_Prof_4: { dx: -4, dy: 9, dw: 12, dh: 12 },
  Agility_Prof_5: { dx: -5, dy: 9, dw: 12, dh: 12 },
  Flexibility_Prof_1: { dx: -3, dy: 10, dw: 12, dh: 12 },
  Flexibility_Prof_2: { dx: -4, dy: 10, dw: 12, dh: 12 },
  Flexibility_Prof_3: { dx: -4, dy: 10, dw: 12, dh: 12 },
  Flexibility_Prof_4: { dx: -3, dy: 10, dw: 12, dh: 12 },
  Flexibility_Prof_5: { dx: -3, dy: 10, dw: 12, dh: 12 },
  Nimbleness_Prof_1: { dx: -7, dy: 13, dw: 12, dh: 12 },
  Nimbleness_Prof_2: { dx: -8, dy: 13, dw: 12, dh: 12 },
  Nimbleness_Prof_3: { dx: -9, dy: 13, dw: 12, dh: 12 },
  Nimbleness_Prof_4: { dx: -10, dy: 13, dw: 12, dh: 12 },
  Nimbleness_Prof_5: { dx: -12, dy: 13, dw: 12, dh: 12 },
  Concentration_Prof_1: { dx: -12, dy: 11, dw: 12, dh: 12 },
  Concentration_Prof_2: { dx: -11, dy: 11, dw: 12, dh: 12 },
  Concentration_Prof_3: { dx: -10, dy: 11, dw: 12, dh: 12 },
  Concentration_Prof_4: { dx: -10, dy: 11, dw: 12, dh: 12 },
  Concentration_Prof_5: { dx: -10, dy: 11, dw: 12, dh: 12 },
  Intelligence_Prof_1: { dx: -11, dy: 12, dw: 12, dh: 12 },
  Intelligence_Prof_2: { dx: -11, dy: 12, dw: 12, dh: 12 },
  Intelligence_Prof_3: { dx: -11, dy: 12, dw: 12, dh: 12 },
  Intelligence_Prof_4: { dx: -12, dy: 12, dw: 12, dh: 12 },
  Intelligence_Prof_5: { dx: -11, dy: 12, dw: 12, dh: 12 },
  Willpower_Prof_1: { dx: -3, dy: 14, dw: 12, dh: 12 },
  Willpower_Prof_2: { dx: -3, dy: 14, dw: 12, dh: 12 },
  Willpower_Prof_3: { dx: -3, dy: 14, dw: 12, dh: 12 },
  Willpower_Prof_4: { dx: -4, dy: 14, dw: 12, dh: 12 },
  Willpower_Prof_5: { dx: -4, dy: 14, dw: 12, dh: 12 },
  Speed_Prof_1: { dx: 1, dy: 13, dw: 12, dh: 12 },
  Speed_Prof_2: { dx: 0, dy: 13, dw: 12, dh: 12 },
  Speed_Prof_3: { dx: 0, dy: 13, dw: 12, dh: 12 },
  Speed_Prof_4: { dx: -1, dy: 13, dw: 12, dh: 12 },
  Speed_Prof_5: { dx: -2, dy: 13, dw: 12, dh: 12 },
  ArmorSlot_1: { dx: -22, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_2: { dx: -19, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_3: { dx: -16, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_4: { dx: -13, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_5: { dx: -11, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_6: { dx: -10, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_7: { dx: -9, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_8: { dx: -8, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_9: { dx: -6, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_10: { dx: -5, dy: 10, dw: 14, dh: 14 },
  ArmorSlot_11: { dx: -3, dy: 10, dw: 14, dh: 14 },
};
const FIELD_TARGET_RECTS = {
  Name: { x: 105, y: 271, w: 203, h: 24 },
  Race: { x: 98, y: 299, w: 210, h: 24 },
  Strength_Value: { x: 101, y: 386, w: 50, h: 34 },
  Strength_Mod: { x: 156, y: 386, w: 51, h: 34 },
  Agility_Value: { x: 100, y: 482, w: 50, h: 34 },
  Agility_Mod: { x: 155, y: 482, w: 50, h: 34 },
  Flexibility_Value: { x: 101, y: 578, w: 50, h: 34 },
  Flexibility_Mod: { x: 156, y: 578, w: 50, h: 34 },
  Nimbleness_Value: { x: 104, y: 677, w: 51, h: 34 },
  Nimbleness_Mod: { x: 162, y: 677, w: 51, h: 34 },
  Concentration_Value: { x: 640, y: 364, w: 56, h: 36 },
  Concentration_Mod: { x: 705, y: 364, w: 54, h: 36 },
  Intelligence_Value: { x: 660, y: 469, w: 50, h: 36 },
  Intelligence_Mod: { x: 718, y: 470, w: 45, h: 35 },
  Willpower_Value: { x: 670, y: 571, w: 47, h: 36 },
  Willpower_Mod: { x: 725, y: 571, w: 45, h: 36 },
  Speed_Value: { x: 658, y: 673, w: 51, h: 35 },
  Speed_Mod: { x: 717, y: 673, w: 49, h: 35 },
  Armor: { x: 157, y: 781, w: 126, h: 119 },
  Health: { x: 347, y: 781, w: 127, h: 119 },
  Stamina: { x: 529, y: 781, w: 126, h: 119 },
  School_Mastery_1: { x: 322, y: 119, w: 142, h: 63 },
  School_Expert_1: { x: 240, y: 228, w: 148, h: 61 },
  School_Expert_2: { x: 397, y: 228, w: 148, h: 61 },
  School_Skilled_1: { x: 154, y: 329, w: 151, h: 69 },
  School_Skilled_2: { x: 317, y: 329, w: 150, h: 69 },
  School_Skilled_3: { x: 476, y: 329, w: 149, h: 69 },
  School_Novice_1: { x: 77, y: 441, w: 148, h: 66 },
  School_Novice_2: { x: 237, y: 441, w: 148, h: 66 },
  School_Novice_3: { x: 397, y: 441, w: 148, h: 66 },
  School_Novice_4: { x: 557, y: 441, w: 148, h: 66 },
  School_Apprentice_1: { x: 14, y: 552, w: 132, h: 68 },
  School_Apprentice_2: { x: 157, y: 552, w: 149, h: 68 },
  School_Apprentice_3: { x: 317, y: 552, w: 149, h: 68 },
  School_Apprentice_4: { x: 476, y: 552, w: 149, h: 68 },
  School_Apprentice_5: { x: 636, y: 552, w: 142, h: 68 },
  Weapon_1: { x: 33, y: 748, w: 100, h: 39 },
  Damage_1: { x: 133, y: 748, w: 85, h: 39 },
  Range_1: { x: 218, y: 748, w: 82, h: 39 },
  Notes_1: { x: 300, y: 748, w: 117, h: 39 },
  Weapon_2: { x: 33, y: 787, w: 100, h: 38 },
  Damage_2: { x: 133, y: 787, w: 85, h: 38 },
  Range_2: { x: 218, y: 787, w: 82, h: 38 },
  Notes_2: { x: 300, y: 787, w: 117, h: 38 },
  Weapon_3: { x: 33, y: 825, w: 100, h: 38 },
  Damage_3: { x: 133, y: 825, w: 85, h: 38 },
  Range_3: { x: 218, y: 825, w: 82, h: 38 },
  Notes_3: { x: 300, y: 825, w: 117, h: 38 },
  Weapon_4: { x: 33, y: 863, w: 100, h: 39 },
  Damage_4: { x: 133, y: 863, w: 85, h: 39 },
  Range_4: { x: 218, y: 863, w: 82, h: 39 },
  Notes_4: { x: 300, y: 863, w: 117, h: 39 },
  Weapon_5: { x: 33, y: 902, w: 100, h: 38 },
  Damage_5: { x: 133, y: 902, w: 85, h: 38 },
  Range_5: { x: 218, y: 902, w: 82, h: 38 },
  Notes_5: { x: 300, y: 902, w: 117, h: 38 },
  Weapon_6: { x: 33, y: 940, w: 100, h: 28 },
  Damage_6: { x: 133, y: 940, w: 85, h: 28 },
  Range_6: { x: 218, y: 940, w: 82, h: 28 },
  Notes_6: { x: 300, y: 940, w: 117, h: 28 },
  Gold: { x: 588, y: 748, w: 161, h: 24 },
  Silver: { x: 589, y: 808, w: 160, h: 24 },
  Copper: { x: 598, y: 873, w: 100, h: 24 },
};

let spec;
let values = {};
let zoom = 1;
let currentStyle = { ...DEFAULT_FONT_SETTINGS };
let fieldLayouts = {};
let portraitState = { image: "" };
let activeEditable = null;
let savedRange = null;
let moveMode = false;
let dragState = null;
let portraitDragState = null;
const pageElements = new Map();

const stage = document.querySelector("#sheetStage");
const fieldCount = document.querySelector("#fieldCount");
const saveState = document.querySelector("#saveState");
const zoomValue = document.querySelector("#zoomValue");
const importFile = document.querySelector("#importFile");
const portraitFile = document.querySelector("#portraitFile");
const uploadPortraitButton = document.querySelector("#uploadPortrait");
const fontTools = document.querySelector("#fontTools");
const fontSizeValue = document.querySelector("#fontSizeValue");
const moveModeButton = document.querySelector("#moveMode");

init().catch((error) => {
  console.error(error);
  fieldCount.textContent = "Could not load the sheet.";
  saveState.textContent = error.message;
});

async function init() {
  spec = await fetchJson("assets/fields.json");
  values = loadValues();
  currentStyle = loadFontSettings();
  fieldLayouts = loadFieldLayouts();
  portraitState = loadPortraitState();
  renderPages();
  bindToolbar();
  applyFontToolState();
  updateFieldCount();
  updateZoom();
  observePageScale();
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}`);
  }
  return response.json();
}

function renderPages() {
  stage.textContent = "";
  pageElements.clear();

  for (const page of spec.pages) {
    const canvas = getPageCanvasSpec(page);
    const pageNode = document.createElement("article");
    pageNode.className = "sheet-page";
    pageNode.id = `page-${page.number}`;
    pageNode.style.setProperty("--page-width", canvas.width);
    pageNode.style.setProperty("--page-height", canvas.height);
    pageNode.dataset.page = page.number;

    const image = document.createElement("img");
    image.className = "page-image";
    image.src = page.image;
    image.alt = `Winterfall character sheet page ${page.number}`;
    image.draggable = false;
    image.style.left = "0";
    image.style.top = "0";
    image.style.width = "100%";
    image.style.height = "100%";
    pageNode.append(image);

    if (page.number === PORTRAIT_FRAME.page) {
      pageNode.append(createPortraitElement(page));
    }

    for (const field of spec.fields.filter((item) => item.page === page.number)) {
      pageNode.append(createField(field, page));
    }

    stage.append(pageNode);
    pageElements.set(page.number, pageNode);
  }
}

function createPortraitElement(page) {
  const canvas = getPageCanvasSpec(page);
  const layout = getPortraitLayout();
  const frame = document.createElement("div");
  frame.className = "portrait-frame";
  frame.style.left = `${(layout.x / canvas.width) * 100}%`;
  frame.style.top = `${(layout.y / canvas.height) * 100}%`;
  frame.style.width = `${(layout.w / canvas.width) * 100}%`;
  frame.style.height = `${(layout.h / canvas.height) * 100}%`;
  frame.tabIndex = 0;
  frame.dataset.portraitFrame = "true";
  frame.setAttribute("aria-label", "Character portrait");
  frame.setAttribute("role", "group");
  frame.title = portraitState.image ? "Drag image to reposition inside oval" : "Drag to move portrait";
  frame.addEventListener("pointerdown", onPortraitPointerDown);

  const mask = document.createElement("div");
  mask.className = "portrait-mask";

  if (portraitState.image) {
    const image = document.createElement("img");
    image.className = "portrait-image";
    image.src = portraitState.image;
    image.alt = "Character portrait";
    mask.append(image);
  } else {
    const empty = document.createElement("div");
    empty.className = "portrait-empty";
    mask.append(empty);
  }

  const resizeHandle = document.createElement("span");
  resizeHandle.className = "portrait-resize-handle";
  resizeHandle.dataset.portraitResize = "true";
  resizeHandle.setAttribute("aria-hidden", "true");
  resizeHandle.title = "Drag to resize portrait";

  const moveHandle = document.createElement("span");
  moveHandle.className = "portrait-move-handle";
  moveHandle.dataset.portraitMove = "true";
  moveHandle.setAttribute("aria-hidden", "true");
  moveHandle.title = "Drag to move portrait oval";

  frame.append(mask, moveHandle, resizeHandle);
  applyPortraitCropToFrame(frame);
  return frame;
}

function createField(field, page) {
  const canvas = getPageCanvasSpec(page);
  const [x1, y1, x2, y2] = getCanvasAdjustedRect(field);
  const width = x2 - x1;
  const height = y2 - y1;

  const wrapper = document.createElement("label");
  wrapper.className = `field field-${field.type}`;
  wrapper.dataset.fieldWrapper = field.name;
  wrapper.style.left = `${(x1 / canvas.width) * 100}%`;
  wrapper.style.top = `${((canvas.height - y2) / canvas.height) * 100}%`;
  wrapper.style.width = `${(width / canvas.width) * 100}%`;
  wrapper.style.height = `${(height / canvas.height) * 100}%`;
  wrapper.style.setProperty("--field-h", height);

  const label = document.createElement("span");
  label.className = "field-label";
  label.textContent = field.label;
  wrapper.append(label);

  const input = document.createElement("input");
  input.name = field.name;
  input.dataset.fieldName = field.name;
  input.title = field.label;

  if (field.type === "checkbox") {
    input.type = "checkbox";
    input.className = "field-checkbox";
    input.checked = Boolean(values[field.name]);
    input.addEventListener("change", onFieldChange);
  } else {
    const fieldValue = getTextFieldValue(field.name);
    const editor = document.createElement("div");
    editor.className = [
      "field-input",
      field.centered ? "centered" : "",
      field.large ? "large" : "",
      isWeaponGridField(field) ? "weapon-grid" : "",
      isLineField(field) ? "line-field" : "",
    ]
      .filter(Boolean)
      .join(" ");
    editor.contentEditable = "true";
    editor.dataset.fieldName = field.name;
    editor.setAttribute("name", field.name);
    editor.setAttribute("role", "textbox");
    editor.setAttribute("aria-label", field.label);
    editor.title = field.label;
    editor.spellcheck = false;
    editor.innerHTML = fieldValue.html;
    if (fieldValue.align) {
      editor.dataset.align = fieldValue.align;
      editor.style.textAlign = fieldValue.align;
    }
    editor.addEventListener("input", onTextFieldInput);
    editor.addEventListener("focus", () => {
      activeEditable = editor;
      saveSelection();
    });
    editor.addEventListener("blur", () => {
      editor.scrollLeft = 0;
    });
    editor.addEventListener("keyup", saveSelection);
    editor.addEventListener("mouseup", saveSelection);
    editor.addEventListener("touchend", saveSelection);
    editor.addEventListener("pointerdown", onEditorPointerDown);
    wrapper.append(editor);
    return wrapper;
  }

  wrapper.append(input);
  return wrapper;
}

function bindToolbar() {
  document.querySelector("#zoomOut").addEventListener("click", () => setZoom(zoom - ZOOM_STEP));
  document.querySelector("#zoomIn").addEventListener("click", () => setZoom(zoom + ZOOM_STEP));
  document.querySelector("#exportJson").addEventListener("click", exportJson);
  document.querySelector("#importJson").addEventListener("click", () => importFile.click());
  document.querySelector("#downloadPdf").addEventListener("click", downloadFilledPdf);
  document.querySelector("#printSheet").addEventListener("click", () => window.print());
  document.querySelector("#clearSheet").addEventListener("click", clearSheet);
  importFile.addEventListener("change", importJson);
  uploadPortraitButton?.addEventListener("click", () => portraitFile.click());
  portraitFile?.addEventListener("change", uploadPortrait);

  fontTools.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) {
      event.preventDefault();
    }
  });
  fontTools.addEventListener("click", onFontToolClick);
  document.addEventListener("selectionchange", saveSelection);

  for (const button of document.querySelectorAll("[data-align]")) {
    button.addEventListener("click", () => applyAlignment(button.dataset.align));
  }

  for (const button of document.querySelectorAll("[data-page-jump]")) {
    button.addEventListener("click", () => {
      const page = pageElements.get(Number(button.dataset.pageJump));
      page?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  const observer = new IntersectionObserver(updateActivePage, {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0,
  });
  for (const page of pageElements.values()) {
    observer.observe(page);
  }
}

function onFieldChange(event) {
  const input = event.currentTarget;
  values[input.dataset.fieldName] = input.checked;
  persistValues();
  updateFieldCount();
}

function onTextFieldInput(event) {
  activeEditable = event.currentTarget;
  saveEditorValue(activeEditable);
  saveSelection();
  persistValues();
  updateFieldCount();
}

function saveEditorValue(editor) {
  const name = editor.dataset.fieldName;
  values[name] = {
    html: sanitizeEditableHtml(editor.innerHTML),
    text: editor.textContent || "",
    align: editor.dataset.align || "",
  };
  if (editor.innerHTML !== values[name].html) {
    const selection = window.getSelection();
    const hadSelection = selection?.rangeCount;
    editor.innerHTML = values[name].html;
    if (!hadSelection) saveSelection();
  }
}

function getTextFieldValue(name) {
  const value = values[name];
  if (value && typeof value === "object") {
    return {
      html: sanitizeEditableHtml(value.html || escapeHtml(value.text || "")),
      text: value.text || textFromHtml(value.html || ""),
      align: value.align || "",
    };
  }
  const text = value == null ? "" : String(value);
  return { html: escapeHtml(text), text, align: "" };
}

function getPlainFieldValue(name) {
  const value = values[name];
  if (value && typeof value === "object") return value.text || textFromHtml(value.html || "");
  return value == null ? "" : String(value);
}

function loadFieldLayouts() {
  try {
    return normalizeFieldLayouts(JSON.parse(localStorage.getItem(LAYOUT_KEY) || "{}"));
  } catch {
    return {};
  }
}

function normalizeFieldLayouts(layouts) {
  const normalized = {};
  if (!layouts || typeof layouts !== "object") return normalized;
  for (const field of spec.fields) {
    if (field.type === "checkbox") continue;
    const layout = layouts[field.name];
    if (!layout || typeof layout !== "object") continue;
    const [x1, y1, x2, y2] = field.rect;
    const page = spec.pages.find((item) => item.number === field.page);
    const baseWidth = x2 - x1;
    const baseHeight = y2 - y1;
    const maxWidth = (page?.width || x2) - x1;
    const maxHeight = y2;
    const dw = Math.min(maxWidth - baseWidth, Math.max(8 - baseWidth, Number(layout.dw) || 0));
    const dh = Math.min(maxHeight - baseHeight, Math.max(8 - baseHeight, Number(layout.dh) || 0));
    const width = baseWidth + dw;
    const height = baseHeight + dh;
    const dx = Math.min((page?.width || x2) - x1 - width, Math.max(-x1, Number(layout.dx) || 0));
    const dy = Math.min((page?.height || y2) - y2, Math.max(height - y2, Number(layout.dy) || 0));
    if (dx !== 0 || dy !== 0 || dw !== 0 || dh !== 0) normalized[field.name] = { dx, dy, dw, dh };
  }
  return normalized;
}

function persistFieldLayouts() {
  localStorage.setItem(LAYOUT_KEY, JSON.stringify(fieldLayouts));
}

function getAdjustedRect(field) {
  const [x1, y1, x2, y2] = field.rect;
  const layout = field.type === "checkbox" ? {} : fieldLayouts[field.name] || {};
  const baseLayout = getBaseFieldLayout(field);
  const page = spec.pages.find((item) => item.number === field.page);
  const baseWidth = x2 - x1;
  const baseHeight = y2 - y1;
  const maxWidth = (page?.width || x2) - x1;
  const maxHeight = y2;
  const dw = (Number(baseLayout.dw) || 0) + (Number(layout.dw) || 0);
  const dh = (Number(baseLayout.dh) || 0) + (Number(layout.dh) || 0);
  const width = Math.min(maxWidth, Math.max(8, baseWidth + dw));
  const height = Math.min(maxHeight, Math.max(8, baseHeight + dh));
  const dx = Math.min(
    (page?.width || x2) - x1 - width,
    Math.max(-x1, (Number(baseLayout.dx) || 0) + (Number(layout.dx) || 0)),
  );
  const adjustedY2 =
    y2 +
    Math.min(
      (page?.height || y2) - y2,
      Math.max(height - y2, (Number(baseLayout.dy) || 0) + (Number(layout.dy) || 0)),
    );
  const adjustedX1 = x1 + dx;
  return [adjustedX1, adjustedY2 - height, adjustedX1 + width, adjustedY2];
}

function getPageCanvasSpec(page) {
  const width = Math.max(...spec.pages.map((item) => item.width));
  const height = Math.max(...spec.pages.map((item) => item.height));
  return {
    width,
    height,
    offsetX: 0,
    offsetY: 0,
    scaleX: width / page.width,
    scaleY: height / page.height,
  };
}

function getCanvasAdjustedRect(field) {
  const page = spec.pages.find((item) => item.number === field.page);
  const canvas = getPageCanvasSpec(page);
  const [x1, y1, x2, y2] = getAdjustedRect(field);
  return [
    x1 * canvas.scaleX + canvas.offsetX,
    y1 * canvas.scaleY + canvas.offsetY,
    x2 * canvas.scaleX + canvas.offsetX,
    y2 * canvas.scaleY + canvas.offsetY,
  ];
}

function getPortraitCanvasSpec() {
  const page = spec.pages.find((item) => item.number === PORTRAIT_FRAME.page);
  return page ? getPageCanvasSpec(page) : { width: 810, height: 1024, scaleX: 1, scaleY: 1 };
}

function getPortraitLayout() {
  return normalizePortraitLayout(portraitState.layout);
}

function getPortraitCrop() {
  return normalizePortraitCrop(portraitState.crop);
}

function normalizePortraitCrop(crop) {
  const source = crop && typeof crop === "object" ? crop : {};
  const x = Math.min(1, Math.max(0, Number.isFinite(Number(source.x)) ? Number(source.x) : 0.5));
  const y = Math.min(1, Math.max(0, Number.isFinite(Number(source.y)) ? Number(source.y) : 0.5));
  return { x, y };
}

function normalizePortraitLayout(layout) {
  const canvas = getPortraitCanvasSpec();
  const source = layout && typeof layout === "object" ? layout : {};
  let width = Number(source.w);
  if (!Number.isFinite(width)) width = PORTRAIT_FRAME.w;
  width = Math.min(canvas.width, Math.max(PORTRAIT_MIN_WIDTH, width));

  let height = width * PORTRAIT_ASPECT;
  if (height > canvas.height) {
    height = canvas.height;
    width = height / PORTRAIT_ASPECT;
  }

  const sourceX = Number(source.x);
  const sourceY = Number(source.y);
  const x = Math.min(canvas.width - width, Math.max(0, Number.isFinite(sourceX) ? sourceX : PORTRAIT_FRAME.x));
  const y = Math.min(canvas.height - height, Math.max(0, Number.isFinite(sourceY) ? sourceY : PORTRAIT_FRAME.y));
  return { x, y, w: width, h: height };
}

function persistPortraitLayout(layout) {
  portraitState = { ...portraitState, layout: normalizePortraitLayout(layout) };
  persistPortraitState();
}

function persistPortraitCrop(crop) {
  portraitState = { ...portraitState, crop: normalizePortraitCrop(crop) };
  persistPortraitState();
}

function applyPortraitLayoutToFrame(frame) {
  const pageSpec = spec.pages.find((item) => item.number === PORTRAIT_FRAME.page);
  if (!frame || !pageSpec) return;
  const canvas = getPageCanvasSpec(pageSpec);
  const layout = getPortraitLayout();
  frame.style.left = `${(layout.x / canvas.width) * 100}%`;
  frame.style.top = `${(layout.y / canvas.height) * 100}%`;
  frame.style.width = `${(layout.w / canvas.width) * 100}%`;
  frame.style.height = `${(layout.h / canvas.height) * 100}%`;
}

function applyPortraitCropToFrame(frame) {
  const image = frame?.querySelector(".portrait-image");
  if (!image) return;
  const crop = getPortraitCrop();
  image.style.objectPosition = `${crop.x * 100}% ${crop.y * 100}%`;
}

function getPortraitImageMetrics(frame) {
  const image = frame?.querySelector(".portrait-image");
  const mask = frame?.querySelector(".portrait-mask");
  if (!image || !mask || !image.naturalWidth || !image.naturalHeight) return null;

  const maskRect = mask.getBoundingClientRect();
  const scale = Math.max(maskRect.width / image.naturalWidth, maskRect.height / image.naturalHeight);
  return {
    overflowX: Math.max(0, image.naturalWidth * scale - maskRect.width),
    overflowY: Math.max(0, image.naturalHeight * scale - maskRect.height),
  };
}

function getBaseFieldLayout(field) {
  if (CHECKBOX_FIELD_LAYOUTS[field.name]) return CHECKBOX_FIELD_LAYOUTS[field.name];
  if (FIELD_TARGET_RECTS[field.name]) return getLayoutFromCanvasTarget(field, FIELD_TARGET_RECTS[field.name]);
  if (BASE_FIELD_LAYOUTS[field.name]) return BASE_FIELD_LAYOUTS[field.name];
  return {};
}

function getLayoutFromCanvasTarget(field, target) {
  const page = spec.pages.find((item) => item.number === field.page);
  if (!page) return {};
  const canvas = getPageCanvasSpec(page);
  const [x1, y1, x2, y2] = field.rect;
  const targetX = (target.x - canvas.offsetX) / canvas.scaleX;
  const targetTop = (target.y - canvas.offsetY) / canvas.scaleY;
  const targetWidth = target.w / canvas.scaleX;
  const targetHeight = target.h / canvas.scaleY;
  return {
    dx: targetX - x1,
    dy: page.height - y2 - targetTop,
    dw: targetWidth - (x2 - x1),
    dh: targetHeight - (y2 - y1),
  };
}

function getFieldSpec(name) {
  return spec.fields.find((field) => field.name === name);
}

function isWeaponGridField(field) {
  return /^(Weapon|Damage|Range|Notes)_[1-6]$/.test(field?.name || "");
}

function isLineField(field) {
  return /^(Name|Race|Gold|Silver|Copper)$/.test(field?.name || "");
}

function applyFieldLayoutToWrapper(editor) {
  const field = getFieldSpec(editor.dataset.fieldName);
  if (!field) return;
  const page = spec.pages.find((item) => item.number === field.page);
  const canvas = getPageCanvasSpec(page);
  const wrapper = editor.closest(".field");
  if (!page || !wrapper) return;

  const [x1, y1, x2, y2] = getCanvasAdjustedRect(field);
  const width = x2 - x1;
  const height = y2 - y1;
  wrapper.style.left = `${(x1 / canvas.width) * 100}%`;
  wrapper.style.top = `${((canvas.height - y2) / canvas.height) * 100}%`;
  wrapper.style.width = `${(width / canvas.width) * 100}%`;
  wrapper.style.height = `${(height / canvas.height) * 100}%`;
  wrapper.style.setProperty("--field-h", height);
}

function applyAllFieldLayouts() {
  for (const editor of document.querySelectorAll(".field-input[contenteditable='true']")) {
    applyFieldLayoutToWrapper(editor);
  }
}

function sanitizeEditableHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html || "";
  const output = document.createElement("div");

  const appendClean = (source, target) => {
    for (const child of source.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        target.append(document.createTextNode(child.textContent || ""));
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName === "BR") {
          target.append(document.createElement("br"));
          continue;
        }

        const span = document.createElement("span");
        const style = cleanTextStyle(child.style);
        for (const [key, value] of Object.entries(style)) {
          span.style[key] = value;
        }
        appendClean(child, span);
        if (span.childNodes.length > 0) target.append(span);
      }
    }
  };

  appendClean(template.content, output);
  return output.innerHTML;
}

function cleanTextStyle(style) {
  const clean = {};
  if (style.fontFamily) clean.fontFamily = FONT_FAMILIES[matchFontFamily(style.fontFamily)];
  if (style.fontSize) {
    const size = Number.parseFloat(style.fontSize);
    if (Number.isFinite(size)) clean.fontSize = `${Math.min(150, Math.max(70, size))}%`;
  }
  if (style.fontWeight) clean.fontWeight = String(nearestWeight(style.fontWeight));
  if (style.color) clean.color = rgbToHex(style.color);
  return clean;
}

function textFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = sanitizeEditableHtml(html);
  return template.content.textContent || "";
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function matchFontFamily(fontFamily) {
  const normalized = String(fontFamily || "").toLowerCase();
  if (normalized.includes("courier") || normalized.includes("mono")) return "mono";
  if (normalized.includes("segoe") || normalized.includes("arial") || normalized.includes("helvetica")) return "sans";
  return "serif";
}

function nearestWeight(weight) {
  const value = Number.parseInt(weight, 10);
  if (!Number.isFinite(value)) return 650;
  if (value >= 690) return 700;
  if (value >= 575) return 650;
  return 500;
}

function getBaseFontSize(editor) {
  if (!editor) return 12;
  const fieldHeight = Number.parseFloat(editor.closest(".field")?.style.getPropertyValue("--field-h")) || 16;
  const pageScale = Number.parseFloat(editor.closest(".sheet-page")?.style.getPropertyValue("--page-scale")) || 1;
  if (editor.classList.contains("weapon-grid")) return fieldHeight * pageScale * 0.45;
  if (editor.classList.contains("line-field")) return fieldHeight * pageScale * 0.7;
  return fieldHeight * pageScale * (editor.classList.contains("large") ? 0.44 : 0.62);
}

function normalizeHexColor(color) {
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  return rgbToHex(color);
}

function rgbToHex(color) {
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  const match = String(color || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return DEFAULT_FONT_SETTINGS.color;
  return `#${[match[1], match[2], match[3]]
    .map((value) => Number(value).toString(16).padStart(2, "0"))
    .join("")}`;
}

function loadValues() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadPortraitState() {
  try {
    return normalizePortraitState(JSON.parse(localStorage.getItem(PORTRAIT_KEY) || "{}"));
  } catch {
    return { image: "", layout: normalizePortraitLayout(), crop: normalizePortraitCrop() };
  }
}

function normalizePortraitState(state) {
  if (!state || typeof state !== "object") {
    return { image: "", layout: normalizePortraitLayout(), crop: normalizePortraitCrop() };
  }
  const image = /^data:image\/(png|jpeg|jpg|webp);base64,/i.test(state.image || "") ? state.image : "";
  return { image, layout: normalizePortraitLayout(state.layout), crop: normalizePortraitCrop(state.crop) };
}

function persistPortraitState() {
  localStorage.setItem(PORTRAIT_KEY, JSON.stringify(portraitState));
}

async function uploadPortrait() {
  const [file] = portraitFile.files;
  portraitFile.value = "";
  if (!file) return;
  if (!/^image\/(png|jpeg|webp)$/i.test(file.type)) {
    saveState.textContent = "Use a PNG, JPG, or WebP portrait";
    return;
  }

  try {
    uploadPortraitButton.disabled = true;
    saveState.textContent = "Loading portrait...";
    const image = await readFileAsDataUrl(file);
    await loadImage(image);
    portraitState = { image, layout: getPortraitLayout(), crop: normalizePortraitCrop() };
    persistPortraitState();
    updatePortraitOnSheet();
    saveState.textContent = "Portrait uploaded";
  } catch (error) {
    console.error(error);
    saveState.textContent = "Portrait upload failed";
  } finally {
    uploadPortraitButton.disabled = false;
  }
}

function updatePortraitOnSheet() {
  const pageSpec = spec.pages.find((item) => item.number === PORTRAIT_FRAME.page);
  const pageNode = pageElements.get(PORTRAIT_FRAME.page);
  const current = pageNode?.querySelector(".portrait-frame");
  if (!pageSpec || !pageNode || !current) return;
  current.replaceWith(createPortraitElement(pageSpec));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error || new Error("Could not read portrait")));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Could not load portrait image")));
    image.src = dataUrl;
  });
}

async function normalizePortraitDataUrl(dataUrl) {
  const image = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = PORTRAIT_EXPORT_SIZE.width;
  canvas.height = PORTRAIT_EXPORT_SIZE.height;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  const crop = getPortraitCrop();
  const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;
  const drawX = (canvas.width - scaledWidth) * crop.x;
  const drawY = (canvas.height - scaledHeight) * crop.y;

  context.save();
  context.beginPath();
  context.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2, 0, 0, Math.PI * 2);
  context.clip();
  context.drawImage(image, drawX, drawY, scaledWidth, scaledHeight);
  context.restore();
  return canvas.toDataURL("image/png");
}

function loadFontSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return normalizeFontSettings(saved);
  } catch {
    return { ...DEFAULT_FONT_SETTINGS };
  }
}

function normalizeFontSettings(settings) {
  const next = { ...DEFAULT_FONT_SETTINGS, ...settings };
  if (!FONT_FAMILIES[next.family]) next.family = DEFAULT_FONT_SETTINGS.family;
  if (!["auto", "left", "center", "right"].includes(next.align)) next.align = DEFAULT_FONT_SETTINGS.align;
  if (!["500", "650", "700"].includes(String(next.weight))) next.weight = DEFAULT_FONT_SETTINGS.weight;
  next.weight = String(next.weight);
  next.size = Math.min(150, Math.max(70, Number(next.size) || DEFAULT_FONT_SETTINGS.size));
  next.color = /^#[0-9a-f]{6}$/i.test(next.color) ? next.color : DEFAULT_FONT_SETTINGS.color;
  return next;
}

function persistFontSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(currentStyle));
}

function onFontToolClick(event) {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.styleFamily) {
    applySelectedTextStyle({ family: button.dataset.styleFamily });
  } else if (button.dataset.styleWeight) {
    applySelectedTextStyle({ weight: button.dataset.styleWeight });
  } else if (button.dataset.styleColor) {
    applySelectedTextStyle({ color: button.dataset.styleColor });
  } else if (button.dataset.areaWidth) {
    adjustActiveFieldArea("dw", Number(button.dataset.areaWidth));
  } else if (button.dataset.areaHeight) {
    adjustActiveFieldArea("dh", Number(button.dataset.areaHeight));
  } else if (button.id === "moveMode") {
    setMoveMode(!moveMode);
  } else if (button.id === "fontSizeDown") {
    applySelectedTextStyle({ size: currentStyle.size - 5 });
  } else if (button.id === "fontSizeUp") {
    applySelectedTextStyle({ size: currentStyle.size + 5 });
  } else if (button.id === "resetFont") {
    resetSelectedTextStyle();
  } else if (button.id === "resetArea") {
    resetActiveFieldArea();
  }
}

function updateCurrentStyle(nextStyle) {
  currentStyle = normalizeFontSettings({ ...currentStyle, ...nextStyle });
  applyFontToolState();
  persistFontSettings();
}

function applyFontToolState() {
  if (fontSizeValue) fontSizeValue.textContent = `${currentStyle.size}%`;

  for (const button of document.querySelectorAll("[data-style-family]")) {
    button.setAttribute("aria-pressed", String(button.dataset.styleFamily === currentStyle.family));
  }
  for (const button of document.querySelectorAll("[data-style-weight]")) {
    button.setAttribute("aria-pressed", String(button.dataset.styleWeight === currentStyle.weight));
  }
  for (const button of document.querySelectorAll("[data-style-color]")) {
    button.setAttribute("aria-pressed", String(button.dataset.styleColor.toLowerCase() === currentStyle.color.toLowerCase()));
  }
  for (const button of document.querySelectorAll("[data-align]")) {
    button.setAttribute("aria-pressed", String(button.dataset.align === currentStyle.align));
  }
}

function saveSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  const editor = getEditableFromNode(selection.anchorNode);
  if (!editor || editor !== getEditableFromNode(selection.focusNode)) return;

  activeEditable = editor;
  savedRange = range.cloneRange();
  updateStyleFromSelection(range);
}

function restoreSelection() {
  if (!savedRange || !activeEditable || !document.body.contains(activeEditable)) return null;
  activeEditable.focus({ preventScroll: true });
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(savedRange);
  return savedRange;
}

function getEditableFromNode(node) {
  if (!node) return null;
  const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  return element?.closest?.(".field-input[contenteditable='true']") || null;
}

function updateStyleFromSelection(range) {
  const node = range.startContainer.nodeType === Node.ELEMENT_NODE ? range.startContainer : range.startContainer.parentElement;
  if (!node) return;
  const element = node.closest(".field-input span") || node.closest(".field-input");
  if (!element) return;
  const computed = window.getComputedStyle(element);
  currentStyle = normalizeFontSettings({
    ...currentStyle,
    family: matchFontFamily(computed.fontFamily),
    size: Math.round((Number.parseFloat(computed.fontSize) / getBaseFontSize(activeEditable)) * 100),
    weight: String(nearestWeight(computed.fontWeight)),
    color: rgbToHex(computed.color),
    align: activeEditable?.dataset.align || "auto",
  });
  applyFontToolState();
  persistFontSettings();
}

function applySelectedTextStyle(nextStyle) {
  updateCurrentStyle(nextStyle);
  const range = restoreSelection();
  if (!range || range.collapsed || !activeEditable) {
    saveState.textContent = "Select text in a field first";
    return;
  }

  const style = {};
  if (Object.hasOwn(nextStyle, "family")) style.fontFamily = FONT_FAMILIES[currentStyle.family];
  if (Object.hasOwn(nextStyle, "size")) style.fontSize = `${currentStyle.size}%`;
  if (Object.hasOwn(nextStyle, "weight")) style.fontWeight = currentStyle.weight;
  if (Object.hasOwn(nextStyle, "color")) style.color = currentStyle.color;

  wrapSelection(range, style);
  saveEditorValue(activeEditable);
  saveState.textContent = "Selected text styled";
}

function resetSelectedTextStyle() {
  updateCurrentStyle(DEFAULT_FONT_SETTINGS);
  const range = restoreSelection();
  if (!range || range.collapsed || !activeEditable) {
    saveState.textContent = "Select text in a field first";
    return;
  }

  const text = range.toString();
  range.deleteContents();
  const textNode = document.createTextNode(text);
  range.insertNode(textNode);
  const selection = window.getSelection();
  const nextRange = document.createRange();
  nextRange.setStartBefore(textNode);
  nextRange.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(nextRange);
  savedRange = nextRange.cloneRange();
  saveEditorValue(activeEditable);
  saveState.textContent = "Selected text reset";
}

function applyAlignment(align) {
  updateCurrentStyle({ align });
  const range = restoreSelection();
  const editor = activeEditable || getEditableFromNode(range?.startContainer);
  if (!editor) {
    saveState.textContent = "Select a field first";
    return;
  }
  if (align === "auto") {
    delete editor.dataset.align;
    editor.style.textAlign = "";
  } else {
    editor.dataset.align = align;
    editor.style.textAlign = align;
  }
  saveEditorValue(editor);
  saveState.textContent = "Field alignment saved";
}

function adjustActiveFieldArea(axis, direction) {
  restoreSelection();
  const editor = activeEditable;
  if (!editor) {
    saveState.textContent = "Select a text field first";
    return;
  }
  const field = getFieldSpec(editor.dataset.fieldName);
  if (!field || field.type === "checkbox") return;

  const current = fieldLayouts[field.name] || { dw: 0, dh: 0 };
  const next = { ...current, [axis]: (Number(current[axis]) || 0) + direction * AREA_STEP };
  fieldLayouts = normalizeFieldLayouts({ ...fieldLayouts, [field.name]: next });
  applyFieldLayoutToWrapper(editor);
  persistFieldLayouts();
  restoreSelection();
  saveState.textContent = "Field area resized";
}

function resetActiveFieldArea() {
  restoreSelection();
  const editor = activeEditable;
  if (!editor) {
    saveState.textContent = "Select a text field first";
    return;
  }
  const field = getFieldSpec(editor.dataset.fieldName);
  if (!field) return;
  delete fieldLayouts[field.name];
  applyFieldLayoutToWrapper(editor);
  persistFieldLayouts();
  restoreSelection();
  saveState.textContent = "Field area reset";
}

function setMoveMode(enabled) {
  moveMode = enabled;
  document.body.classList.toggle("move-mode", moveMode);
  moveModeButton?.setAttribute("aria-pressed", String(moveMode));
  saveState.textContent = moveMode ? "Move mode on" : "Move mode off";
}

function onEditorPointerDown(event) {
  if (!moveMode || event.button !== 0) return;
  const editor = event.currentTarget;
  const field = getFieldSpec(editor.dataset.fieldName);
  const pageSpec = spec.pages.find((item) => item.number === field?.page);
  const pageNode = editor.closest(".sheet-page");
  if (!field || !pageSpec || !pageNode) return;

  event.preventDefault();
  activeEditable = editor;
  editor.focus({ preventScroll: true });
  const canvas = getPageCanvasSpec(pageSpec);
  const pageScale = pageNode.getBoundingClientRect().width / canvas.width;
  dragState = {
    editor,
    field,
    startX: event.clientX,
    startY: event.clientY,
    startLayout: { dx: 0, dy: 0, dw: 0, dh: 0, ...(fieldLayouts[field.name] || {}) },
    pageScale,
    coordScaleX: canvas.scaleX,
    coordScaleY: canvas.scaleY,
  };
  editor.setPointerCapture?.(event.pointerId);
  document.addEventListener("pointermove", onEditorPointerMove);
  document.addEventListener("pointerup", onEditorPointerUp, { once: true });
}

function onEditorPointerMove(event) {
  if (!dragState) return;
  const deltaX = (event.clientX - dragState.startX) / dragState.pageScale / dragState.coordScaleX;
  const deltaY = (event.clientY - dragState.startY) / dragState.pageScale / dragState.coordScaleY;
  const next = {
    ...dragState.startLayout,
    dx: dragState.startLayout.dx + deltaX,
    dy: dragState.startLayout.dy - deltaY,
  };
  fieldLayouts = normalizeFieldLayouts({ ...fieldLayouts, [dragState.field.name]: next });
  applyFieldLayoutToWrapper(dragState.editor);
}

function onEditorPointerUp() {
  if (!dragState) return;
  persistFieldLayouts();
  saveState.textContent = "Field moved";
  dragState = null;
  document.removeEventListener("pointermove", onEditorPointerMove);
}

function onPortraitPointerDown(event) {
  if (event.button !== 0) return;
  const frame = event.currentTarget;
  const pageNode = frame.closest(".sheet-page");
  const pageSpec = spec.pages.find((item) => item.number === PORTRAIT_FRAME.page);
  if (!pageNode || !pageSpec) return;

  event.preventDefault();
  event.stopPropagation();

  const canvas = getPageCanvasSpec(pageSpec);
  const pageScale = pageNode.getBoundingClientRect().width / canvas.width;
  const mode = event.target.closest("[data-portrait-resize]")
    ? "resize"
    : event.target.closest("[data-portrait-move]") || !portraitState.image
      ? "move"
      : "pan";
  portraitDragState = {
    mode,
    frame,
    startX: event.clientX,
    startY: event.clientY,
    startLayout: getPortraitLayout(),
    startCrop: getPortraitCrop(),
    imageMetrics: getPortraitImageMetrics(frame),
    pageScale,
  };

  frame.classList.add(
    mode === "resize" ? "is-resizing" : mode === "move" ? "is-dragging" : "is-panning",
  );
  frame.setPointerCapture?.(event.pointerId);
  document.addEventListener("pointermove", onPortraitPointerMove);
  document.addEventListener("pointerup", onPortraitPointerUp, { once: true });
}

function onPortraitPointerMove(event) {
  if (!portraitDragState) return;
  const deltaX = (event.clientX - portraitDragState.startX) / portraitDragState.pageScale;
  const deltaY = (event.clientY - portraitDragState.startY) / portraitDragState.pageScale;
  const start = portraitDragState.startLayout;

  if (portraitDragState.mode === "resize") {
    const nextWidth = Math.max(PORTRAIT_MIN_WIDTH, start.w + Math.max(deltaX, deltaY / PORTRAIT_ASPECT));
    portraitState = { ...portraitState, layout: normalizePortraitLayout({ ...start, w: nextWidth }) };
    applyPortraitLayoutToFrame(portraitDragState.frame);
    applyPortraitCropToFrame(portraitDragState.frame);
  } else if (portraitDragState.mode === "move") {
    portraitState = {
      ...portraitState,
      layout: normalizePortraitLayout({
        ...start,
        x: start.x + deltaX,
        y: start.y + deltaY,
      }),
    };
    applyPortraitLayoutToFrame(portraitDragState.frame);
  } else {
    const metrics = portraitDragState.imageMetrics;
    const next = { ...portraitDragState.startCrop };
    if (metrics?.overflowX > 0) next.x -= deltaX / metrics.overflowX;
    if (metrics?.overflowY > 0) next.y -= deltaY / metrics.overflowY;
    portraitState = { ...portraitState, crop: normalizePortraitCrop(next) };
    applyPortraitCropToFrame(portraitDragState.frame);
  }
}

function onPortraitPointerUp() {
  if (!portraitDragState) return;
  portraitDragState.frame.classList.remove("is-dragging", "is-resizing", "is-panning");
  if (portraitDragState.mode === "pan") {
    persistPortraitCrop(getPortraitCrop());
  } else {
    persistPortraitLayout(getPortraitLayout());
  }
  saveState.textContent =
    portraitDragState.mode === "resize"
      ? "Portrait resized"
      : portraitDragState.mode === "move"
        ? "Portrait moved"
        : "Portrait image repositioned";
  portraitDragState = null;
  document.removeEventListener("pointermove", onPortraitPointerMove);
}

function wrapSelection(range, styles) {
  const span = document.createElement("span");
  for (const [key, value] of Object.entries(styles)) {
    span.style[key] = value;
  }
  span.append(range.extractContents());
  range.insertNode(span);

  const selection = window.getSelection();
  const nextRange = document.createRange();
  nextRange.selectNodeContents(span);
  selection.removeAllRanges();
  selection.addRange(nextRange);
  savedRange = nextRange.cloneRange();
}

function persistValues() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  saveState.textContent = `Saved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

function updateFieldCount() {
  const filled = spec.fields.filter((field) => {
    return field.type === "checkbox" ? values[field.name] === true : getPlainFieldValue(field.name).trim() !== "";
  }).length;
  fieldCount.textContent = `${filled} of ${spec.fields.length} fields filled`;
}

function setZoom(nextZoom) {
  zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2))));
  updateZoom();
}

function updateZoom() {
  document.documentElement.style.setProperty("--zoom", zoom);
  zoomValue.textContent = `${Math.round(zoom * 100)}%`;
}

function observePageScale() {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const page = entry.target;
      const pageSpec = spec.pages.find((item) => item.number === Number(page.dataset.page));
      if (!pageSpec) continue;
      const canvas = getPageCanvasSpec(pageSpec);
      page.style.setProperty("--page-scale", entry.contentRect.width / canvas.width);
    }
  });

  for (const page of pageElements.values()) {
    resizeObserver.observe(page);
  }
}

function updateActivePage(entries) {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;

  for (const button of document.querySelectorAll("[data-page-jump]")) {
    button.classList.toggle("is-active", button.dataset.pageJump === visible.target.dataset.page);
  }
}

function exportJson() {
  const payload = {
    app: "Winterfall Fillable Character Sheet",
    exportedAt: new Date().toISOString(),
    fontSettings: currentStyle,
    fieldLayouts,
    portrait: portraitState,
    values,
  };
  downloadBlob(JSON.stringify(payload, null, 2), "application/json", "winterfall-character.json");
}

async function importJson() {
  const [file] = importFile.files;
  importFile.value = "";
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    values = imported.values && typeof imported.values === "object" ? imported.values : imported;
    if (imported.fontSettings) {
      currentStyle = normalizeFontSettings(imported.fontSettings);
      applyFontToolState();
      persistFontSettings();
    }
    if (imported.fieldLayouts) {
      fieldLayouts = normalizeFieldLayouts(imported.fieldLayouts);
      persistFieldLayouts();
      applyAllFieldLayouts();
    }
    if (imported.portrait) {
      portraitState = normalizePortraitState(imported.portrait);
      persistPortraitState();
      updatePortraitOnSheet();
    }
    syncInputsFromValues();
    persistValues();
    updateFieldCount();
  } catch (error) {
    saveState.textContent = "Import failed";
    console.error(error);
  }
}

function syncInputsFromValues() {
  for (const input of document.querySelectorAll("[data-field-name]")) {
    const value = values[input.dataset.fieldName];
    if (input.matches("input[type='checkbox']")) {
      input.checked = value === true;
    } else {
      const fieldValue = getTextFieldValue(input.dataset.fieldName);
      input.innerHTML = fieldValue.html;
      if (fieldValue.align) {
        input.dataset.align = fieldValue.align;
        input.style.textAlign = fieldValue.align;
      } else {
        delete input.dataset.align;
        input.style.textAlign = "";
      }
    }
  }
}

function clearSheet() {
  if (!confirm("Clear all filled fields?")) return;
  values = {};
  portraitState = { image: "", layout: normalizePortraitLayout(), crop: normalizePortraitCrop() };
  syncInputsFromValues();
  updatePortraitOnSheet();
  persistValues();
  persistPortraitState();
  updateFieldCount();
}

async function downloadFilledPdf() {
  if (!window.PDFLib) {
    saveState.textContent = "PDF library unavailable";
    return;
  }

  try {
    saveState.textContent = "Building PDF...";
    const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
    const pdfDoc = await PDFDocument.create();
    const fonts = await embedPdfFonts(pdfDoc, StandardFonts);
    let portraitExportSkipped = false;

    for (const pageSpec of spec.pages) {
      const canvas = getPageCanvasSpec(pageSpec);
      const page = pdfDoc.addPage([canvas.width, canvas.height]);
      const background = await pdfDoc.embedPng(await fetchArrayBuffer(pageSpec.image));
      page.drawImage(background, {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
      });

      if (pageSpec.number === PORTRAIT_FRAME.page) {
        try {
          await drawPortraitOnPdf(page, pdfDoc);
        } catch (error) {
          portraitExportSkipped = true;
          console.warn("Portrait could not be added to the PDF.", error);
        }
      }

      for (const field of spec.fields.filter((item) => item.page === pageSpec.number)) {
        const value = values[field.name];
        if (field.type === "checkbox" && value === true) {
          drawFallbackCheck(page, field, rgb);
        } else if (field.type !== "checkbox" && getPlainFieldValue(field.name).trim() !== "") {
          drawRichText(page, field, getTextFieldValue(field.name), fonts, rgb);
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    downloadBlob(pdfBytes, "application/pdf", "winterfall-character-sheet-filled.pdf");
    saveState.textContent = portraitExportSkipped ? "PDF ready (portrait skipped)" : "PDF ready";
  } catch (error) {
    console.error(error);
    saveState.textContent = `PDF export failed: ${error.message || "unknown error"}`;
  }
}

async function fetchArrayBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}`);
  }
  return response.arrayBuffer();
}

async function drawPortraitOnPdf(page, pdfDoc) {
  if (!portraitState.image) return;
  const image = await embedPortraitImage(pdfDoc, portraitState.image);
  const layout = getPortraitLayout();
  const canvas = getPortraitCanvasSpec();
  const x = layout.x;
  const y = canvas.height - layout.y - layout.h;
  page.drawImage(image, {
    x,
    y,
    width: layout.w,
    height: layout.h,
  });
}

async function embedPortraitImage(pdfDoc, dataUrl) {
  const candidates = [];
  try {
    candidates.push(await normalizePortraitDataUrl(dataUrl));
  } catch (error) {
    console.warn("Portrait normalization failed; trying original image.", error);
  }
  candidates.push(dataUrl);

  let lastError;
  for (const candidate of candidates) {
    try {
      const { bytes, mime } = dataUrlToBytes(candidate);
      return mime === "image/png" ? pdfDoc.embedPng(bytes) : pdfDoc.embedJpg(bytes);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Portrait image could not be embedded");
}

function dataUrlToBytes(dataUrl) {
  const match = String(dataUrl).match(/^data:(image\/(?:png|jpeg|jpg));base64,(.+)$/i);
  if (!match) throw new Error("Unsupported portrait image");
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return { bytes, mime: match[1].toLowerCase().replace("image/jpg", "image/jpeg") };
}

function collectRichTextSegments(html) {
  const template = document.createElement("template");
  template.innerHTML = sanitizeEditableHtml(html);
  const segments = [];
  const base = {
    family: "serif",
    size: 100,
    weight: 650,
    color: DEFAULT_FONT_SETTINGS.color,
  };

  const visit = (node, style) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent) segments.push({ ...style, text: node.textContent });
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.tagName === "BR") {
      segments.push({ ...style, text: "\n" });
      return;
    }

    const next = { ...style };
    if (node.style.fontFamily) next.family = matchFontFamily(node.style.fontFamily);
    if (node.style.fontSize) next.size = Number.parseFloat(node.style.fontSize) || next.size;
    if (node.style.fontWeight) next.weight = nearestWeight(node.style.fontWeight);
    if (node.style.color) next.color = rgbToHex(node.style.color);
    for (const child of node.childNodes) visit(child, next);
  };

  for (const child of template.content.childNodes) visit(child, base);
  return segments;
}

async function embedPdfFonts(pdfDoc, StandardFonts) {
  return {
    serif500: await pdfDoc.embedFont(StandardFonts.TimesRoman),
    serif650: await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
    serif700: await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
    sans500: await pdfDoc.embedFont(StandardFonts.Helvetica),
    sans650: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    sans700: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    mono500: await pdfDoc.embedFont(StandardFonts.Courier),
    mono650: await pdfDoc.embedFont(StandardFonts.CourierBold),
    mono700: await pdfDoc.embedFont(StandardFonts.CourierBold),
  };
}

function drawRichText(page, field, fieldValue, fonts, rgb) {
  const [x1, y1, x2, y2] = getCanvasAdjustedRect(field);
  const width = x2 - x1;
  const height = y2 - y1;
  const segments = collectRichTextSegments(fieldValue.html);
  if (segments.length === 0) return;

  const maxWidth = Math.max(4, width - 4);
  const lines = splitPdfLines(segments.map((segment) => preparePdfSegment(segment, field, height, fonts)));
  if (!lines.some((line) => line.length > 0)) return;

  const widestLine = Math.max(...lines.map(getPdfLineWidth));
  if (widestLine > maxWidth) scalePdfLines(lines, Math.max(0.35, maxWidth / widestLine));

  let largestSize = getLargestPdfLineSize(lines);
  let lineHeight = Math.max(1, largestSize * 1.15);
  let contentHeight = largestSize + lineHeight * (lines.length - 1);
  const maxHeight = Math.max(4, height - 2);
  if (contentHeight > maxHeight) {
    scalePdfLines(lines, Math.max(0.35, maxHeight / contentHeight));
    largestSize = getLargestPdfLineSize(lines);
    lineHeight = Math.max(1, largestSize * 1.15);
    contentHeight = largestSize + lineHeight * (lines.length - 1);
  }

  const alignment = fieldValue.align || (field.centered ? "center" : "left");
  const firstY = isLineField(field)
    ? y1 + 2 + lineHeight * (lines.length - 1)
    : y1 + Math.max(1, (height - contentHeight) / 2) + lineHeight * (lines.length - 1);

  lines.forEach((line, index) => {
    const lineWidth = getPdfLineWidth(line);
    const lineX =
      alignment === "center"
        ? x1 + Math.max(2, (width - lineWidth) / 2)
        : alignment === "right"
          ? x2 - lineWidth - 2
          : x1 + 2;
    let cursor = lineX;
    const y = firstY - index * lineHeight;

    for (const segment of line) {
      page.drawText(segment.text, {
        x: cursor,
        y,
        size: segment.size,
        font: segment.font,
        color: hexToPdfRgb(segment.color, rgb),
        maxWidth,
      });
      cursor += segment.width;
    }
  });
}

function preparePdfSegment(segment, field, height, fonts) {
  const weight = nearestWeight(segment.weight);
  const font = fonts[`${segment.family}${weight}`] || fonts.serif650;
  const text = normalizePdfText(segment.text, font);
  const rawSize = (
    isWeaponGridField(field)
      ? height * 0.45
      : isLineField(field)
        ? height * 0.7
        : field.large
          ? height * 0.44
          : height * 0.62
  ) * (segment.size / 100);
  const size = Math.min(
    rawSize,
    (isWeaponGridField(field) ? 18 : isLineField(field) ? 20 : field.large ? 48 : 22) * (segment.size / 100),
  );
  return { ...segment, text, font, size, width: 0 };
}

function splitPdfLines(segments) {
  const lines = [[]];
  for (const segment of segments) {
    const parts = segment.text.split("\n");
    parts.forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part === "") return;
      const next = { ...segment, text: part };
      next.width = next.font.widthOfTextAtSize(next.text, next.size);
      lines[lines.length - 1].push(next);
    });
  }
  return lines;
}

function getPdfLineWidth(line) {
  return line.reduce((sum, segment) => sum + segment.width, 0);
}

function getLargestPdfLineSize(lines) {
  return lines.reduce(
    (max, line) => line.reduce((lineMax, segment) => Math.max(lineMax, segment.size), max),
    0,
  );
}

function scalePdfLines(lines, scale) {
  for (const line of lines) {
    for (const segment of line) {
      segment.size *= scale;
      segment.width = segment.font.widthOfTextAtSize(segment.text, segment.size);
    }
  }
}

function normalizePdfText(text, font) {
  const normalized = String(text || "")
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  let output = "";

  for (const char of normalized) {
    if (char === "\n") {
      output += char;
      continue;
    }
    const replacement = PDF_TEXT_REPLACEMENTS.get(char) || char;
    for (const candidate of replacement) {
      try {
        font.encodeText(candidate);
        output += candidate;
      } catch {
        // Standard PDF fonts are WinAnsi-only; skip anything they cannot encode.
      }
    }
  }

  return output;
}

function hexToPdfRgb(color, rgb) {
  const hex = normalizeHexColor(color).replace("#", "");
  const red = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const green = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(hex.slice(4, 6), 16) / 255;
  return rgb(red, green, blue);
}

function drawFallbackCheck(page, field, rgb) {
  const [x1, y1, x2, y2] = getCanvasAdjustedRect(field);
  const width = x2 - x1;
  const height = y2 - y1;
  const centerX = x1 + width / 2;
  const centerY = y1 + height / 2;
  page.drawEllipse({
    x: centerX,
    y: centerY,
    xScale: width * 0.48,
    yScale: height * 0.48,
    color: rgb(0.91, 0.62, 0.18),
    borderColor: rgb(0.47, 0.28, 0.06),
    borderWidth: Math.max(1, Math.min(width, height) * 0.08),
  });
  page.drawEllipse({
    x: centerX - width * 0.1,
    y: centerY + height * 0.11,
    xScale: width * 0.26,
    yScale: height * 0.22,
    color: rgb(1, 0.9, 0.45),
  });
}

function downloadBlob(data, type, fileName) {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
