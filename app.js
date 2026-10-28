const options = [
  {
    id: "option-1",
    number: "OPÇÃO 1",
    title: "Implante + coroa",
    description: "Um implante colocado no osso serve de suporte para uma coroa, após avaliação clínica.",
    benefit: "Pode substituir o dente sem preparar os dentes vizinhos, quando indicado.",
    limitation: "Envolve cirurgia; há riscos e nem todos os casos são elegíveis.",
    duration: "Varia conforme as etapas e a avaliação individual.",
    care: "Higiene diária e acompanhamento profissional; seguir instruções específicas.",
    visualDescription: "Esquema: coroa · implante · osso",
  },
  {
    id: "option-2",
    number: "OPÇÃO 2",
    title: "Ponte fixa",
    description: "Uma prótese fixa que ocupa o espaço e se apoia nos dentes adjacentes.",
    benefit: "Fica fixa na boca e não é retirada diariamente pelo utilizador.",
    limitation: "Pode exigir preparação dos dentes de suporte e higiene específica.",
    duration: "Varia conforme os dentes de suporte e o plano definido.",
    care: "Higiene diária, incluindo a zona sob a ponte, e acompanhamento profissional.",
    visualDescription: "Esquema: dentes de suporte · ponte fixa",
  },
  {
    id: "option-3",
    number: "OPÇÃO 3",
    title: "Prótese parcial removível",
    description: "Uma prótese removível que pode substituir um ou mais dentes ausentes.",
    benefit: "Pode ser retirada para limpeza e não requer cirurgia de implante.",
    limitation: "Conforto e adaptação variam; podem ser necessários ajustes.",
    duration: "Varia conforme o desenho da prótese e a adaptação individual.",
    care: "Remover e limpar conforme orientação profissional; comparecer aos ajustes.",
    visualDescription: "Esquema: dentes · base removível · encaixes",
  },
];

const comparisonRows = [
  { label: "Benefício", key: "benefit" },
  { label: "Risco / limitação", key: "limitation" },
  { label: "Duração estimada", key: "duration" },
  { label: "Manutenção e cuidados", key: "care" },
];

const optionGrid = document.querySelector("#option-grid");
const comparisonHead = document.querySelector("#comparison-head");
const comparisonBody = document.querySelector("#comparison-body");
const dialog = document.querySelector("#details-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const detailList = document.querySelector("#detail-list");
const heroArt = document.querySelector("[data-interactive-visual]");
const activeOptionLabel = document.querySelector("[data-active-option]");
const visualDescription = document.querySelector("[data-visual-description]");
let updateParticleArtwork = () => {};
let selectedOptionId = options[0].id;

function procedureIllustration(optionId) {
  const prefix = `procedure-${optionId}`;
  const defs = `
    <defs>
      <linearGradient id="${prefix}-enamel" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#fff"/>
        <stop offset=".58" stop-color="#f8fbff"/>
        <stop offset="1" stop-color="#d5e5f4"/>
      </linearGradient>
      <linearGradient id="${prefix}-gum" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#f1b9a9"/>
        <stop offset="1" stop-color="#df9589"/>
      </linearGradient>
      <linearGradient id="${prefix}-bone" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#f0e5cf"/>
        <stop offset="1" stop-color="#dfd0b3"/>
      </linearGradient>
      <linearGradient id="${prefix}-metal" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#a9d0f0"/>
        <stop offset=".52" stop-color="#5d98c9"/>
        <stop offset="1" stop-color="#326d9e"/>
      </linearGradient>
      <filter id="${prefix}-shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#315875" flood-opacity=".16"/>
      </filter>
    </defs>
  `;
  const background = `
    <rect x="1" y="1" width="318" height="178" rx="18" fill="#f8fbfe"/>
    <path d="M1 144c44-9 78-8 116 0 37 8 80 8 119 0 34-7 59-8 83-3v20a17 17 0 0 1-17 17H18A17 17 0 0 1 1 161Z" fill="url(#${prefix}-bone)" opacity=".78"/>
    <path d="M1 124c43-14 81-8 119 0 44 10 82 10 122 0 31-8 55-8 77-2v24c-33-7-58-6-84 0-42 10-83 10-123 0-42-11-76-13-111-2Z" fill="url(#${prefix}-gum)" opacity=".9"/>
    <path d="M16 124c42-13 70-8 105 0 43 10 84 10 125 0 25-6 45-7 61-4" fill="none" stroke="#d9837d" stroke-width="2" stroke-linecap="round" opacity=".72"/>
  `;
  const tooth = (x, y, width = 46, height = 80) => `
    <path d="M${x + width * .1} ${y + height * .2}
      Q${x + width * .08} ${y} ${x + width * .3} ${y + 3}
      Q${x + width * .5} ${y + 8} ${x + width * .7} ${y + 3}
      Q${x + width * .94} ${y} ${x + width * .9} ${y + height * .2}
      L${x + width * .79} ${y + height * .62}
      Q${x + width * .74} ${y + height * .83} ${x + width * .64} ${y + height * .82}
      Q${x + width * .53} ${y + height * .81} ${x + width * .5} ${y + height}
      Q${x + width * .47} ${y + height * .81} ${x + width * .36} ${y + height * .82}
      Q${x + width * .26} ${y + height * .83} ${x + width * .21} ${y + height * .62}Z"
      fill="url(#${prefix}-enamel)" stroke="#bfd2e4" stroke-width="1.5"/>
    <path d="M${x + width * .24} ${y + height * .14}q${width * .1}-${height * .1} ${width * .22}-${height * .08}"
      fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".9"/>
  `;

  let anatomy;
  if (optionId === "option-1") {
    anatomy = `
      ${tooth(58, 37, 49, 99)}
      ${tooth(213, 37, 49, 99)}
      <g filter="url(#${prefix}-shadow)">
        <path d="M136 44q-8 0-8 9v17q0 9 8 12l3 3h34l3-3q8-3 8-12V53q0-9-8-9Z" fill="url(#${prefix}-enamel)" stroke="#bfd2e4" stroke-width="2"/>
        <path d="M145 84h28v11h-28z" fill="url(#${prefix}-metal)"/>
        <path d="M143 94h32l-4 46-12 14-12-14Z" fill="url(#${prefix}-metal)" stroke="#326d9e" stroke-width="2"/>
        <path d="m142 101 33 4m-34 7 32 4m-31 7 30 4m-29 7 27 4" stroke="#dceeff" stroke-width="2" stroke-linecap="round" opacity=".92"/>
        <path d="M143 94h32" stroke="#edf7ff" stroke-width="3" stroke-linecap="round"/>
      </g>
      <path d="M197 49h21m-21 0 10-9" fill="none" stroke="#77a7d1" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="197" cy="49" r="2.5" fill="#5d98c9"/>
      <path d="M177 130h34m-34 0 8-8" fill="none" stroke="#77a7d1" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="177" cy="130" r="2.5" fill="#5d98c9"/>
    `;
  } else if (optionId === "option-2") {
    anatomy = `
      ${tooth(31, 43, 48, 98)}
      ${tooth(241, 43, 48, 98)}
      <g filter="url(#${prefix}-shadow)">
        <path d="M77 57q2-13 13-13h35q10 0 12 12l-2 29q-1 8-9 8H88q-9 0-10-9Zm53-1q2-12 12-12h36q10 0 12 12l-2 29q-1 8-9 8h-39q-9 0-10-9Zm54 0q2-12 12-12h35q11 0 13 13l-2 28q-1 8-10 8h-39q-8 0-9-9Z"
          fill="url(#${prefix}-enamel)" stroke="#b2cbe0" stroke-width="2" stroke-linejoin="round"/>
        <path d="M88 51q5-5 12-4m53 0q6-4 12 0m52-1q5 0 9 5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        <path d="M89 93h138" stroke="#78a9d2" stroke-width="2" stroke-linecap="round" opacity=".85"/>
      </g>
      <path d="M113 106h94m-47 0v16" stroke="#77a7d1" stroke-width="1.5" stroke-dasharray="3 4" stroke-linecap="round"/>
      <circle cx="160" cy="122" r="3" fill="#5d98c9"/>
    `;
  } else {
    anatomy = `
      ${tooth(48, 42, 48, 97)}
      ${tooth(224, 42, 48, 97)}
      ${tooth(137, 43, 46, 70)}
      <path d="M109 91q51 9 102 0l-5 14q-46 14-92 0Z" fill="url(#${prefix}-gum)" stroke="#cb867c" stroke-width="2" filter="url(#${prefix}-shadow)"/>
      <path d="M105 89q-9-4-14 2l-2 5q7 3 15-1m110-6q9-4 14 2l2 5q-7 3-15-1"
        fill="none" stroke="url(#${prefix}-metal)" stroke-width="4" stroke-linecap="round"/>
      <path d="M124 106v7m72-7v7" stroke="#b97c72" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M135 39q5-4 10-2m43 0q5-2 10 2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    `;
  }

  return `
    <svg viewBox="0 0 320 180" fill="none" aria-hidden="true" focusable="false">
      ${defs}
      ${background}
      ${anatomy}
    </svg>
  `;
}

function renderCards() {
  optionGrid.innerHTML = options.map((option, index) => `
    <article class="option-card option-card--${index + 1}" data-card="${option.id}" data-reveal style="--reveal-delay: ${index * 90}ms">
      <div class="card-art">
        <span class="card-art-orbit" aria-hidden="true"></span>
        <span class="card-art-number">0${index + 1}</span>
        <div class="card-procedure-visual">${procedureIllustration(option.id)}</div>
        <span class="card-art-caption">ESQUEMA ILUSTRATIVO</span>
      </div>
      <div class="card-content">
        <div class="card-topline">
          <span class="option-number">${option.number}</span>
          <span class="selected-badge" data-badge="${option.id}" hidden>EM DESTAQUE</span>
        </div>
        <h3>${option.title}</h3>
        <p class="card-description">${option.description}</p>
        <div class="card-summary">
          <div class="summary-row">
            <span class="summary-icon" aria-hidden="true">+</span>
            <span><strong>Benefício:</strong> ${option.benefit}</span>
          </div>
          <div class="summary-row">
            <span class="summary-icon" aria-hidden="true">!</span>
            <span><strong>Risco / limitação:</strong> ${option.limitation}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="button button-primary" type="button" data-details="${option.id}">
            Ver detalhes <span aria-hidden="true">↗</span>
          </button>
          <button class="compare-select" type="button" data-select="${option.id}" aria-pressed="false">
            Destacar
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderComparison() {
  comparisonHead.innerHTML = `
    <tr>
      <th scope="col">Critério</th>
      ${options.map((option) => `
        <th scope="col" data-column="${option.id}">${option.title}</th>
      `).join("")}
    </tr>
  `;

  comparisonBody.innerHTML = comparisonRows.map((row) => `
    <tr>
      <th scope="row">${row.label}</th>
      ${options.map((option) => `
        <td data-column="${option.id}">${option[row.key]}</td>
      `).join("")}
    </tr>
  `).join("");
}

function selectOption(optionId) {
  const option = options.find((item) => item.id === optionId);
  if (!option) return;

  selectedOptionId = optionId;
  activeOptionLabel.textContent = `A explorar · ${option.title}`;
  visualDescription.textContent = option.visualDescription;
  heroArt.dataset.option = optionId;
  heroArt.setAttribute(
    "aria-label",
    `Esquema ilustrativo de ${option.title}: ${option.visualDescription.replace("Esquema: ", "")}. Não representa uma indicação clínica.`,
  );
  updateParticleArtwork(optionId);

  document.querySelectorAll("[data-card]").forEach((card) => {
    const isSelected = card.dataset.card === selectedOptionId;
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-current", isSelected ? "true" : "false");
  });

  document.querySelectorAll("[data-badge]").forEach((badge) => {
    badge.hidden = badge.dataset.badge !== selectedOptionId;
  });

  document.querySelectorAll(".compare-select").forEach((button) => {
    const isSelected = button.dataset.select === selectedOptionId;
    button.setAttribute("aria-pressed", String(isSelected));
    button.textContent = isSelected ? "Em destaque" : "Destacar";
  });

  document.querySelectorAll(".hero-option-button").forEach((button) => {
    const isSelected = button.dataset.select === selectedOptionId;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  document.querySelectorAll("[data-column]").forEach((cell) => {
    cell.classList.toggle("selected-column", cell.dataset.column === selectedOptionId);
  });
}

function showDetails(optionId) {
  const option = options.find((item) => item.id === optionId);
  if (!option) return;

  selectOption(optionId);
  dialogTitle.textContent = option.title;
  dialogDescription.textContent = option.description;
  detailList.innerHTML = comparisonRows.map((row) => `
    <section class="detail-item">
      <h3>${row.label}</h3>
      <p>${option[row.key]}</p>
    </section>
  `).join("");
  dialog.showModal();
}

function setupScrollAnimations() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  document.documentElement.classList.add("motion-ready");
  let observer;

  function revealVisibleItems() {
    revealItems.forEach((item) => {
      const isInView = item.getBoundingClientRect().top < window.innerHeight * 0.92;
      if (isInView) {
        item.classList.add("is-visible");
        observer?.unobserve(item);
      }
    });
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -36px 0px",
  });

  revealItems.forEach((item) => observer.observe(item));
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);
  revealVisibleItems();
}

function setupInteractiveArtwork() {
  const canvas = heroArt.querySelector(".tooth-canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const toothOutline = new Path2D(
    "M60 18c-12-8-20-5-31-5-15 0-21 13-18 29 3 17 14 27 18 44 4 17 6 32 15 32 9 0 8-21 16-21s7 21 16 21c9 0 11-15 15-32 4-17 15-27 18-44 3-16-3-29-18-29-11 0-19-3-31 5Z",
  );
  const crownOutline = new Path2D(
    "M17 43c-3-17 7-29 24-29 7 0 13 3 19 5 6-2 12-5 19-5 17 0 27 12 24 29-3 20-15 35-28 40H45C32 78 20 63 17 43Z",
  );
  const implantOutline = new Path2D(
    "M47 81h26l-3 37-10 10-10-10-3-37Z",
  );
  const dentureBase = new Path2D(
    "M10 77c11 13 25 20 50 20s39-7 50-20l-5 17c-10 17-26 25-45 25S25 111 15 94l-5-17Z",
  );
  const random = (() => {
    let seed = 48721;
    return () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  })();
  const palette = {
    "option-1": ["#75b8ec", "#b8dcfa", "#52c5aa", "#f2c478"],
    "option-2": ["#45b9a5", "#a8e2d6", "#78a9e8", "#f0c77c"],
    "option-3": ["#e98d74", "#f4b39f", "#85afe8", "#f1c66e"],
  };
  const anatomyPalette = {
    "option-1": { bone: "#dfa997", boneLight: "#f0c7b4", metal: "#8dbfe8", enamel: "#dceeff" },
    "option-2": { bone: "#a9c8dc", boneLight: "#d1e3f2", metal: "#55b9a5", enamel: "#e5f7f2" },
    "option-3": { bone: "#e2b08f", boneLight: "#f3d2b7", metal: "#e98d74", enamel: "#fff0e8" },
  };
  const pointer = { x: 0, y: 0, active: false };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointCount = 520;
  const seeds = Array.from({ length: pointCount }, () => ({
    phase: random() * Math.PI * 2,
    size: 0.7 + random() * 1.25,
  }));
  const layouts = {
    "option-1": [
      { path: crownOutline, weight: 0.62, scale: 0.82 },
      { path: implantOutline, weight: 0.38, scale: 0.9, offsetY: 15 },
    ],
    "option-2": [
      { path: toothOutline, weight: 0.34, scale: 0.55, offsetX: -34 },
      { path: crownOutline, weight: 0.32, scale: 0.59, offsetY: -2 },
      { path: toothOutline, weight: 0.34, scale: 0.55, offsetX: 34 },
    ],
    "option-3": [
      { path: toothOutline, weight: 0.32, scale: 0.49, offsetX: -27, offsetY: -7 },
      { path: toothOutline, weight: 0.32, scale: 0.49, offsetX: 27, offsetY: -7 },
      { path: dentureBase, weight: 0.36, scale: 0.92, offsetY: 4 },
    ],
  };
  let width = 0;
  let height = 0;
  let frameId = 0;
  let startTime = 0;
  let currentLayout = [];
  let transitionFrom = null;
  let transitionTo = null;
  let transitionStart = 0;

  function pointInside(path) {
    for (let attempt = 0; attempt < 500; attempt += 1) {
      const x = random() * 120;
      const y = random() * 132;
      if (context.isPointInPath(path, x, y)) return { x, y };
    }
    return { x: 60, y: 66 };
  }

  function createLayout(components) {
    const target = [];
    let assigned = 0;

    components.forEach((component, componentIndex) => {
      const count = componentIndex === components.length - 1
        ? pointCount - assigned
        : Math.floor(pointCount * component.weight);
      assigned += count;

      for (let index = 0; index < count; index += 1) {
        const point = pointInside(component.path);
        target.push({
          x: 60 + (point.x - 60) * component.scale + (component.offsetX ?? 0),
          y: 66 + (point.y - 66) * component.scale + (component.offsetY ?? 0),
        });
      }
    });

    return target;
  }

  const optionLayouts = Object.fromEntries(
    Object.entries(layouts).map(([optionId, components]) => [optionId, createLayout(components)]),
  );
  currentLayout = optionLayouts["option-1"].map((point) => ({ ...point }));

  updateParticleArtwork = (optionId) => {
    const nextLayout = optionLayouts[optionId];
    if (!nextLayout) return;

    if (reduceMotion.matches) {
      currentLayout = nextLayout.map((point) => ({ ...point }));
      transitionFrom = null;
      transitionTo = null;
      draw(0);
      return;
    }

    transitionFrom = currentLayout.map((point) => ({ ...point }));
    transitionTo = nextLayout;
    transitionStart = performance.now();
  };

  function traceTooth(offsetX, scale, path, strokeStyle) {
    context.save();
    context.translate(60 + offsetX, 66);
    context.scale(scale, scale);
    context.translate(-60, -66);
    context.lineWidth = 1.25 / scale;
    context.strokeStyle = strokeStyle;
    context.fillStyle = "rgba(190, 220, 246, 0.04)";
    context.fill(path);
    context.stroke(path);
    context.restore();
  }

  function traceImplantDetails(colors) {
    const bone = new Path2D(
      "M-15 89c22-7 41-9 75-6 23 2 43 7 75 4v20c-32 3-52-2-75-4-34-3-53-1-75 6v-20Z",
    );
    context.fillStyle = colors.bone;
    context.globalAlpha = 0.2;
    context.fill(bone);
    context.globalAlpha = 1;
    context.strokeStyle = colors.boneLight;
    context.lineWidth = 1.6;
    context.beginPath();
    context.moveTo(-8, 88);
    context.bezierCurveTo(22, 80, 39, 84, 60, 86);
    context.bezierCurveTo(82, 88, 103, 91, 128, 85);
    context.stroke();

    context.fillStyle = "rgba(124, 180, 225, 0.16)";
    context.strokeStyle = colors.metal;
    context.lineWidth = 2.2;
    context.fill(implantOutline);
    context.stroke(implantOutline);

    context.save();
    context.clip(implantOutline);
    context.strokeStyle = "rgba(190, 224, 250, 0.82)";
    context.lineWidth = 1.25;
    for (let y = 87; y < 122; y += 6) {
      context.beginPath();
      context.moveTo(44, y);
      context.lineTo(76, y + 4);
      context.stroke();
    }
    context.restore();

    context.strokeStyle = colors.enamel;
    context.lineWidth = 2.2;
    context.beginPath();
    context.moveTo(53, 77);
    context.lineTo(53, 83);
    context.lineTo(67, 83);
    context.lineTo(67, 77);
    context.stroke();
    traceTooth(0, 0.82, crownOutline, colors.enamel);
  }

  function traceBridgeDetails(colors) {
    traceTooth(-34, 0.55, toothOutline, "rgba(174, 211, 242, 0.82)");
    traceTooth(0, 0.59, crownOutline, colors.enamel);
    traceTooth(34, 0.55, toothOutline, "rgba(174, 211, 242, 0.82)");
    context.strokeStyle = colors.metal;
    context.lineWidth = 2.2;
    context.beginPath();
    context.moveTo(41, 64);
    context.bezierCurveTo(47, 61, 52, 61, 56, 63);
    context.moveTo(64, 63);
    context.bezierCurveTo(69, 61, 74, 61, 79, 64);
    context.stroke();
    context.fillStyle = colors.metal;
    context.beginPath();
    context.arc(43, 63, 1.8, 0, Math.PI * 2);
    context.arc(77, 63, 1.8, 0, Math.PI * 2);
    context.fill();
  }

  function traceRemovableDetails(colors) {
    context.fillStyle = "rgba(204, 139, 188, 0.16)";
    context.strokeStyle = colors.bone;
    context.lineWidth = 2;
    context.fill(dentureBase);
    context.stroke(dentureBase);
    traceTooth(-27, 0.49, toothOutline, colors.enamel);
    traceTooth(27, 0.49, toothOutline, colors.enamel);

    context.strokeStyle = colors.metal;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(36, 48);
    context.bezierCurveTo(20, 45, 19, 65, 30, 73);
    context.moveTo(84, 48);
    context.bezierCurveTo(100, 45, 101, 65, 90, 73);
    context.stroke();
    context.fillStyle = colors.metal;
    context.beginPath();
    context.arc(30, 73, 2.2, 0, Math.PI * 2);
    context.arc(90, 73, 2.2, 0, Math.PI * 2);
    context.fill();
  }

  function resizeCanvas() {
    const bounds = heroArt.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    draw(0);
  }

  function draw(timestamp) {
    if (!width || !height) return;
    if (!startTime) startTime = timestamp;

    const elapsed = reduceMotion.matches ? 0 : (timestamp - startTime) / 1000;
    const scale = Math.min(width * 0.9 / 120, height * 0.78 / 132);
    const centerX = width * 0.5;
    const centerY = height * 0.44;
    const optionId = heroArt.dataset.option ?? "option-1";
    const colors = palette[optionId] ?? palette["option-1"];
    const anatomyColors = anatomyPalette[optionId] ?? anatomyPalette["option-1"];

    if (transitionFrom && transitionTo) {
      const progress = Math.min((timestamp - transitionStart) / 680, 1);
      const eased = progress * progress * (3 - 2 * progress);
      currentLayout = transitionTo.map((point, index) => ({
        x: transitionFrom[index].x + (point.x - transitionFrom[index].x) * eased,
        y: transitionFrom[index].y + (point.y - transitionFrom[index].y) * eased,
      }));
      if (progress === 1) {
        transitionFrom = null;
        transitionTo = null;
      }
    }

    const rotation = Math.sin(elapsed * 0.22) * 0.025 + (pointer.x - 0.5) * (pointer.active ? 0.055 : 0);
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const projected = currentLayout.map((position, index) => {
      const particle = seeds[index];
      const depth = Math.sin(elapsed * 0.8 + particle.phase);
      const localX = (position.x - 60) * cos - (position.y - 66) * sin;
      const localY = (position.x - 60) * sin + (position.y - 66) * cos;
      const x = localX * (1 + depth * 0.025);
      const y = localY * (1 + depth * 0.02);
      let pointX = centerX + x * scale;
      let pointY = centerY + y * scale;

      if (pointer.active) {
        const dx = pointX - pointer.x * width;
        const dy = pointY - pointer.y * height;
        const distance = Math.hypot(dx, dy);
        if (distance < 95 && distance > 0) {
          const push = ((95 - distance) / 95) * 13;
          pointX += (dx / distance) * push;
          pointY += (dy / distance) * push;
        }
      }

      return { x: pointX, y: pointY, depth, size: particle.size, index };
    });

    context.clearRect(0, 0, width, height);
    const centerGlow = context.createRadialGradient(centerX, centerY, 8, centerX, centerY, scale * 0.82);
    centerGlow.addColorStop(0, "rgba(65, 145, 210, 0.14)");
    centerGlow.addColorStop(0.54, "rgba(71, 130, 156, 0.045)");
    centerGlow.addColorStop(1, "rgba(16, 25, 29, 0)");
    context.fillStyle = centerGlow;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(centerX, centerY);
    context.scale(scale, scale);
    context.translate(-60, -66);
    if (optionId === "option-1") traceImplantDetails(anatomyColors);
    if (optionId === "option-2") traceBridgeDetails(anatomyColors);
    if (optionId === "option-3") traceRemovableDetails(anatomyColors);
    context.restore();

    const cellSize = 27;
    const cells = new Map();
    projected.forEach((point) => {
      const cellX = Math.floor(point.x / cellSize);
      const cellY = Math.floor(point.y / cellSize);
      const key = `${cellX},${cellY}`;
      const bucket = cells.get(key) ?? [];
      bucket.push(point);
      cells.set(key, bucket);
    });

    context.lineWidth = 0.48;
    projected.forEach((point) => {
      const cellX = Math.floor(point.x / cellSize);
      const cellY = Math.floor(point.y / cellSize);
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          const neighbors = cells.get(`${cellX + offsetX},${cellY + offsetY}`) ?? [];
          neighbors.forEach((neighbor) => {
            if (neighbor.index <= point.index) return;
            const distance = Math.hypot(point.x - neighbor.x, point.y - neighbor.y);
            if (distance > 21) return;
            context.strokeStyle = `rgba(148, 198, 235, ${(1 - distance / 21) * 0.17})`;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.stroke();
          });
        }
      }
    });

    projected.forEach((point) => {
      const color = colors[(Math.floor(point.index / 23) + Math.floor((point.x / width) * 3)) % colors.length];
      const alpha = 0.62 + ((point.depth + 1) / 2) * 0.38;
      context.globalAlpha = alpha;
      context.fillStyle = color;
      if (point.index % 9 === 0) {
        const side = point.size * 2.1;
        context.beginPath();
        context.moveTo(point.x, point.y - side);
        context.lineTo(point.x + side * 0.85, point.y + side * 0.65);
        context.lineTo(point.x - side * 0.85, point.y + side * 0.65);
        context.closePath();
        context.fill();
      } else {
        context.beginPath();
        context.arc(point.x, point.y, point.size * (0.8 + (point.depth + 1) * 0.12), 0, Math.PI * 2);
        context.fill();
      }
    });
    context.globalAlpha = 1;
  }

  function animate(timestamp) {
    draw(timestamp);
    if (!reduceMotion.matches && !document.hidden) frameId = window.requestAnimationFrame(animate);
  }

  function startAnimation() {
    window.cancelAnimationFrame(frameId);
    startTime = 0;
    if (reduceMotion.matches) {
      draw(0);
      return;
    }
    frameId = window.requestAnimationFrame(animate);
  }

  const resizeObserver = new ResizeObserver(resizeCanvas);
  resizeCanvas();
  resizeObserver.observe(heroArt);
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(frameId);
    } else {
      startAnimation();
    }
  });
  reduceMotion.addEventListener("change", startAnimation);

  heroArt.addEventListener("pointermove", (event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = heroArt.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / bounds.width;
    pointer.y = (event.clientY - bounds.top) / bounds.height;
    pointer.active = true;
    heroArt.style.setProperty("--pointer-x", `${pointer.x * 100}%`);
    heroArt.style.setProperty("--pointer-y", `${pointer.y * 100}%`);
    heroArt.classList.add("is-pointer-active");
  });

  heroArt.addEventListener("pointerleave", () => {
    pointer.active = false;
    heroArt.classList.remove("is-pointer-active");
    heroArt.style.removeProperty("--pointer-x");
    heroArt.style.removeProperty("--pointer-y");
  });

  startAnimation();
}

optionGrid.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) {
    showDetails(detailsButton.dataset.details);
    return;
  }

  const selectButton = event.target.closest("[data-select]");
  if (selectButton) selectOption(selectButton.dataset.select);
});

document.querySelector(".hero-option-selector").addEventListener("click", (event) => {
  const selectButton = event.target.closest("[data-select]");
  if (selectButton) selectOption(selectButton.dataset.select);
});

dialog.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-dialog]")) dialog.close();
});

renderCards();
renderComparison();
selectOption(selectedOptionId);
setupScrollAnimations();
setupInteractiveArtwork();
