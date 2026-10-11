(function () {
  const FALLBACK_HOTSPOTS = [
    { id: "river", number: "01", label: "Singapore River", copy: "The plan places the Singapore River at the centre of commercial and civic life. It is the geographic anchor for this proposed town." },
    { id: "districts", number: "02", label: "Planned districts", copy: "The plan labels places such as Chinese Kampong, Chuliah Kampong, Bugis Kampong and European Town. These are proposed divisions, not a complete record of the city as built." },
    { id: "reality", number: "03", label: "Plan versus city", copy: "A plan can reveal an ambition as much as a place. The National Archives states that this proposed plan was not actually executed as shown." }
  ];

  function clamp(value, minimum, maximum) { return Math.max(minimum, Math.min(maximum, value)); }

  function mount(root, options = {}) {
    const hotspots = options.hotspots || FALLBACK_HOTSPOTS;
    const collected = new Set(options.collected || []);
    let active = null;
    let scale = 1;
    let panX = 0;
    let panY = 0;
    let pointers = new Map();
    let pinchDistance = 0;
    let pinchScale = 1;
    let completionEmitted = false;

    root.classList.add("jackson-plan");
    root.innerHTML = `
      <div class="jackson-plan__stage" aria-label="Interactive Jackson Plan schematic">
        <div class="jackson-plan__caption">Interactive schematic / 1828</div>
        <div class="jackson-plan__canvas"></div>
        <p class="jackson-plan__hint">Drag to pan · pinch to zoom</p>
      </div>
      <div class="jackson-plan__controls" aria-label="Plan controls">
        <button type="button" data-control="zoom-out">− Zoom</button>
        <button type="button" data-control="reset">Reset</button>
        <button type="button" data-control="zoom-in">+ Zoom</button>
      </div>
      <div class="jackson-plan__hotspots" aria-label="Jackson Plan discoveries"></div>
      <p class="jackson-plan__annotation">Select a point to read the plan closely.</p>
      <p class="jackson-plan__progress" aria-live="polite"></p>`;

    const stage = root.querySelector(".jackson-plan__stage");
    const canvas = root.querySelector(".jackson-plan__canvas");
    const hotspotList = root.querySelector(".jackson-plan__hotspots");
    const annotation = root.querySelector(".jackson-plan__annotation");
    const progress = root.querySelector(".jackson-plan__progress");

    fetch(options.svgUrl || "jackson-plan.svg")
      .then(response => response.ok ? response.text() : Promise.reject(new Error("Plan SVG unavailable")))
      .then(svg => { canvas.innerHTML = svg; render(); })
      .catch(() => { annotation.textContent = "The plan image could not load. Use the official source link below."; });

    hotspots.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "jackson-plan__hotspot";
      button.dataset.hotspot = item.id;
      button.textContent = `${item.number} / ${item.label}`;
      button.addEventListener("click", () => select(item.id));
      hotspotList.appendChild(button);
    });

    function render() {
      canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
      root.querySelectorAll(".jp-layer").forEach(layer => layer.classList.toggle("is-active", layer.dataset.layer === active));
      root.querySelectorAll(".jackson-plan__hotspot").forEach(button => {
        const id = button.dataset.hotspot;
        button.classList.toggle("is-active", id === active);
        button.classList.toggle("is-found", collected.has(id));
      });
      progress.textContent = `${collected.size} / ${hotspots.length} discoveries collected`;
    }

    function select(id) {
      const item = hotspots.find(candidate => candidate.id === id);
      if (!item) return;
      active = id;
      collected.add(id);
      annotation.textContent = item.copy;
      render();
      if (collected.size === hotspots.length && !completionEmitted) {
        completionEmitted = true;
        root.dispatchEvent(new CustomEvent("jacksonplan:collected", { bubbles: true, detail: { id: "jackson-plan", discoveries: [...collected] } }));
      }
    }

    function reset() { scale = 1; panX = 0; panY = 0; render(); }
    root.querySelector("[data-control='reset']").addEventListener("click", reset);
    root.querySelector("[data-control='zoom-in']").addEventListener("click", () => { scale = clamp(scale + .2, .8, 3); render(); });
    root.querySelector("[data-control='zoom-out']").addEventListener("click", () => { scale = clamp(scale - .2, .8, 3); render(); });

    stage.addEventListener("pointerdown", (event) => {
      stage.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 1) stage.classList.add("is-dragging");
      if (pointers.size === 2) {
        const points = [...pointers.values()];
        pinchDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        pinchScale = scale;
      }
    });
    stage.addEventListener("pointermove", (event) => {
      if (!pointers.has(event.pointerId)) return;
      const previous = pointers.get(event.pointerId);
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 2) {
        const points = [...pointers.values()];
        const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        scale = clamp(pinchScale * distance / Math.max(pinchDistance, 1), .8, 3);
      } else {
        panX = clamp(panX + event.clientX - previous.x, -220, 220);
        panY = clamp(panY + event.clientY - previous.y, -180, 180);
      }
      render();
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => stage.addEventListener(type, event => {
      pointers.delete(event.pointerId);
      if (!pointers.size) stage.classList.remove("is-dragging");
    }));
    stage.addEventListener("wheel", (event) => {
      event.preventDefault();
      scale = clamp(scale * (event.deltaY > 0 ? .9 : 1.1), .8, 3);
      render();
    }, { passive: false });

    return { reset, select, getDiscoveries: () => [...collected] };
  }

  window.JacksonPlan = { mount };
}());
