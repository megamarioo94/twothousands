(function () {
  const DISCOVERIES = [
    { id: "apertures", number: "01", label: "Firing apertures", angle: -0.28, copy: "The openings were positioned to give machine guns a field of fire across the coast. Pillboxes were placed so their fields of fire could overlap." },
    { id: "coast", number: "02", label: "A defended coast", angle: 0.82, copy: "In the 1930s, British defences anticipated a coastal attack on Singapore. The surrounding shoreline and infrastructure have since changed dramatically." },
    { id: "pasir-panjang", number: "03", label: "Pasir Panjang", angle: 0.25, copy: "The pillbox lay within the area guarded by the 1st Battalion of the Malay Regiment during the Battle of Pasir Panjang in February 1942." }
  ];

  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

  function mount(root, options = {}) {
    const discoveries = options.discoveries || DISCOVERIES;
    const found = new Set(options.collected || []);
    let active = null;
    let yaw = 0.25;
    let scale = 1;
    let dragging = false;
    let lastX = 0;
    let completionEmitted = false;

    root.classList.add("pillbox-viewer");
    root.innerHTML = `
      <div class="pillbox-viewer__stage">
        <p class="pillbox-viewer__caption">Object study / 1930s–1942</p>
        <canvas class="pillbox-viewer__canvas" role="img" aria-label="Interactive simplified study of the Pasir Panjang Machine-Gun Pillbox"></canvas>
        <p class="pillbox-viewer__hint">Drag to rotate · pinch or wheel to zoom</p>
      </div>
      <div class="pillbox-viewer__controls" aria-label="Pillbox view controls">
        <button type="button" data-control="left" aria-label="Rotate left">← Rotate</button>
        <button type="button" data-control="zoom-out" aria-label="Zoom out">− Zoom</button>
        <button type="button" data-control="reset">Reset view</button>
        <button type="button" data-control="zoom-in" aria-label="Zoom in">+ Zoom</button>
        <button type="button" data-control="right" aria-label="Rotate right">Rotate →</button>
      </div>
      <div class="pillbox-viewer__discoveries" aria-label="Pillbox discoveries"></div>
      <p class="pillbox-viewer__annotation">Rotate the study or select a point to inspect this surviving structure closely.</p>
      <p class="pillbox-viewer__progress" aria-live="polite"></p>`;

    const stage = root.querySelector(".pillbox-viewer__stage");
    const canvas = root.querySelector(".pillbox-viewer__canvas");
    const context = canvas.getContext("2d");
    const list = root.querySelector(".pillbox-viewer__discoveries");
    const annotation = root.querySelector(".pillbox-viewer__annotation");
    const progress = root.querySelector(".pillbox-viewer__progress");

    discoveries.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pillbox-viewer__discovery";
      button.dataset.discovery = item.id;
      button.textContent = `${item.number} / ${item.label}`;
      button.addEventListener("click", () => select(item.id));
      list.appendChild(button);
    });

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    }

    function project(point, width, height) {
      const cos = Math.cos(yaw);
      const sin = Math.sin(yaw);
      const x = point[0] * cos - point[2] * sin;
      const z = point[0] * sin + point[2] * cos;
      const depth = 1 + (z + 2.4) * 0.08;
      const unit = Math.min(width, height) * 0.22 * scale / depth;
      return { x: width * 0.5 + x * unit, y: height * 0.68 - point[1] * unit, z };
    }

    function polygon(points, fill, stroke = "#141414") {
      context.beginPath();
      points.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
      context.closePath();
      context.fillStyle = fill;
      context.fill();
      context.strokeStyle = stroke;
      context.lineWidth = 1;
      context.stroke();
    }

    function aperture(cx, cy, width, height, skew) {
      context.save();
      context.translate(cx, cy);
      context.transform(1, 0, skew, 1, 0, 0);
      context.fillStyle = "#181a17";
      context.fillRect(-width / 2, -height / 2, width, height);
      context.strokeStyle = "#0f100e";
      context.lineWidth = 1;
      context.strokeRect(-width / 2, -height / 2, width, height);
      context.fillStyle = "rgba(246,246,243,.16)";
      context.fillRect(-width / 2 + 3, -height / 2 + 3, width - 6, 2);
      context.restore();
    }

    function draw() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f6f6f3";
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(width * 0.5, height * 0.75);
      context.rotate(-0.1);
      context.fillStyle = "rgba(93,122,91,.18)";
      context.beginPath();
      context.moveTo(-width * .36, 0);
      context.lineTo(width * .36, -height * .19);
      context.lineTo(width * .36, height * .03);
      context.closePath();
      context.fill();
      context.setLineDash([4, 5]);
      context.strokeStyle = "#5d7a5b";
      context.stroke();
      context.setLineDash([]);
      context.restore();

      const corners = [
        [-1.65, 0, -1.05], [1.65, 0, -1.05], [1.65, 1.25, -1.05], [-1.65, 1.25, -1.05],
        [-1.65, 0, 1.05], [1.65, 0, 1.05], [1.65, 1.25, 1.05], [-1.65, 1.25, 1.05]
      ].map(point => project(point, width, height));
      const faces = [
        { points: [corners[0], corners[1], corners[2], corners[3]], colour: "#777871", depth: (corners[0].z + corners[1].z) / 2 },
        { points: [corners[1], corners[5], corners[6], corners[2]], colour: "#8e8f86", depth: (corners[1].z + corners[5].z) / 2 },
        { points: [corners[5], corners[4], corners[7], corners[6]], colour: "#686962", depth: (corners[5].z + corners[4].z) / 2 },
        { points: [corners[4], corners[0], corners[3], corners[7]], colour: "#5d5f59", depth: (corners[4].z + corners[0].z) / 2 },
        { points: [corners[3], corners[2], corners[6], corners[7]], colour: "#b1b2a9", depth: (corners[3].z + corners[2].z) / 2 }
      ];
      faces.sort((a, b) => a.depth - b.depth).forEach(face => polygon(face.points, face.colour));

      const front = project([0, .64, -1.06], width, height);
      const right = project([1.66, .64, 0], width, height);
      const left = project([-1.66, .64, 0], width, height);
      const apertureWidth = Math.min(width, height) * .18 * scale;
      const apertureHeight = Math.min(width, height) * .038 * scale;
      aperture(front.x - apertureWidth * .48, front.y, apertureWidth * .7, apertureHeight, Math.sin(yaw) * .18);
      aperture(front.x + apertureWidth * .48, front.y, apertureWidth * .7, apertureHeight, Math.sin(yaw) * .18);
      if (right.z > -.1) aperture(right.x, right.y, apertureWidth * .58, apertureHeight, -.2);
      if (left.z > -.1) aperture(left.x, left.y, apertureWidth * .58, apertureHeight, .2);

      context.fillStyle = "rgba(20,20,20,.24)";
      for (let index = 0; index < 42; index += 1) {
        const x = width * .27 + ((index * 47) % 150) * scale;
        const y = height * .38 + ((index * 29) % 96) * scale;
        context.fillRect(x, y, 1, 1);
      }
    }

    function render() {
      draw();
      root.querySelectorAll(".pillbox-viewer__discovery").forEach((button) => {
        const id = button.dataset.discovery;
        button.classList.toggle("is-active", id === active);
        button.classList.toggle("is-found", found.has(id));
      });
      progress.textContent = `${found.size} / ${discoveries.length} discoveries collected`;
    }

    function select(id) {
      const item = discoveries.find(candidate => candidate.id === id);
      if (!item) return;
      active = id;
      yaw = item.angle;
      found.add(id);
      annotation.textContent = item.copy;
      render();
      if (found.size === discoveries.length && !completionEmitted) {
        completionEmitted = true;
        root.dispatchEvent(new CustomEvent("pillbox:collected", { bubbles: true, detail: { id: "pasir-panjang-pillbox", discoveries: [...found] } }));
      }
    }

    function reset() { yaw = .25; scale = 1; active = null; annotation.textContent = "Rotate the study or select a point to inspect this surviving structure closely."; render(); }
    root.querySelector("[data-control='left']").addEventListener("click", () => { yaw = clamp(yaw - .28, -1.25, 1.25); render(); });
    root.querySelector("[data-control='right']").addEventListener("click", () => { yaw = clamp(yaw + .28, -1.25, 1.25); render(); });
    root.querySelector("[data-control='zoom-in']").addEventListener("click", () => { scale = clamp(scale + .14, .78, 1.6); render(); });
    root.querySelector("[data-control='zoom-out']").addEventListener("click", () => { scale = clamp(scale - .14, .78, 1.6); render(); });
    root.querySelector("[data-control='reset']").addEventListener("click", reset);

    stage.addEventListener("pointerdown", (event) => { dragging = true; lastX = event.clientX; stage.setPointerCapture(event.pointerId); stage.classList.add("is-dragging"); });
    stage.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      yaw = clamp(yaw + (event.clientX - lastX) * .012, -1.25, 1.25);
      lastX = event.clientX;
      render();
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => stage.addEventListener(type, () => { dragging = false; stage.classList.remove("is-dragging"); }));
    stage.addEventListener("wheel", (event) => { event.preventDefault(); scale = clamp(scale * (event.deltaY > 0 ? .9 : 1.1), .78, 1.6); render(); }, { passive: false });
    new ResizeObserver(resize).observe(stage);
    resize();
    render();
    return { reset, select, getDiscoveries: () => [...found] };
  }

  window.PasirPanjangPillbox = { mount };
}());
