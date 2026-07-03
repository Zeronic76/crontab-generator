  function dowName(d){
    return ["So","Mo","Di","Mi","Do","Fr","Sa"][d] || String(d);
  }

  const minuteDropdown = document.getElementById("minuteDropdown");
  const hourDropdown = document.getElementById("hourDropdown");
  const dowDropdown = document.getElementById("dowDropdown");
  const domDropdown = document.getElementById("domDropdown");
  const monthDropdown = document.getElementById("monthDropdown");

  const everyXMinToggle = document.getElementById("everyXMinToggle");
  const everyXMinInput = document.getElementById("everyXMinInput"); // bleibt drin, wird hier aber nicht mehr zur Ableitung genutzt

  const commandEl = document.getElementById("command");
  const cronLineEl = document.getElementById("cronLine");
  const statusEl = document.getElementById("status");

  function addMultiCheckboxes(container, values, labelFn, checkboxName){
    container.innerHTML = "";

    values.forEach(v => {
      const id = `${checkboxName}_${v}`;

      const wrapper = document.createElement("div");
      wrapper.className = "form-check";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "form-check-input";
      input.id = id;
      input.value = String(v);
      input.dataset.value = String(v);

      const label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = id;
      label.textContent = labelFn(v);

      wrapper.appendChild(input);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });
  }

  function getSelectedValues(container){
    const boxes = container.querySelectorAll('input[type="checkbox"]');
    const vals = [...boxes].filter(b => b.checked).map(b => Number(b.dataset.value));
    vals.sort((a,b)=>a-b);
    return vals;
  }

  function fmtFieldFromMulti(container, fallback='*'){
    const vals = getSelectedValues(container);
    if (!vals.length) return fallback;
    return vals.join(",");
  }

function setMinuteDropdownEnabled(){
  const disabled = everyXMinToggle.checked;

  minuteDropdown.style.opacity = disabled ? "0.6" : "1";
  minuteDropdown.style.pointerEvents = disabled ? "none" : "auto";

  minuteDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.disabled = disabled;
  });
}

function updateCron(){
  const command = commandEl.value.trim() || "(kein Command)";

  let minuteField;

  if (everyXMinToggle.checked) {
    const X = Math.max(1, Math.min(59, Number(everyXMinInput.value) || 1));
    minuteField = `*/${X}`;
  } else {
    minuteField = fmtFieldFromMulti(minuteDropdown, '*');
  }

  const hourField = fmtFieldFromMulti(hourDropdown, '*');
  const domField = fmtFieldFromMulti(domDropdown, '*');
  const monthField = fmtFieldFromMulti(monthDropdown, '*');
  const dowField = fmtFieldFromMulti(dowDropdown, '*');

  cronLineEl.value = `${minuteField} ${hourField} ${domField} ${monthField} ${dowField} ${command}`;
}

  // Build dropdown contents
  addMultiCheckboxes(
    minuteDropdown,
    [...Array(60)].map((_,i)=>i),
    (v)=>String(v),
    "min"
  );

  addMultiCheckboxes(
    hourDropdown,
    [...Array(24)].map((_,i)=>i),
    (v)=>String(v),
    "hour"
  );

  addMultiCheckboxes(
    dowDropdown,
    [0,1,2,3,4,5,6],
    (v)=>`${dowName(v)} (${v})`,
    "dow"
  );
  addMultiCheckboxes(
    domDropdown,
    [...Array(31)].map((_,i)=>i+1), // 1..31
    (v)=>String(v),
    "dom"
  );

  const monthNames = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];

  addMultiCheckboxes(
    monthDropdown,
    [...Array(12)].map((_,i)=>i+1), // 1..12
    (v)=>`${monthNames[v-1]} (${v})`,
    "month"
  );

  // Wire events
  everyXMinToggle.addEventListener("change", ()=>{
    setMinuteDropdownEnabled();
    updateCron();
  });

  // nicht zwingend nötig, aber bleibt für Live-Update
  everyXMinInput.addEventListener("input", updateCron);

  [minuteDropdown, hourDropdown, dowDropdown, domDropdown, monthDropdown].forEach(container=>{
    container.addEventListener("change", (e)=>{
      if (e.target && e.target.type === "checkbox") updateCron();
    });
  });

  commandEl.addEventListener("input", updateCron);

  document.getElementById("copyBtn").addEventListener("click", async ()=>{
    const text = cronLineEl.value;
    try{
      await navigator.clipboard.writeText(text);
      statusEl.textContent = "Kopiert in die Zwischenablage.";
    }catch{
      statusEl.textContent = "Kopieren nicht möglich (Browserrechte).";
    }
  });

  document.getElementById("fillExample").addEventListener("click", ()=>{
    commandEl.value = "curl -sS https://example.com/webhook";

    // Reset zuerst
    minuteDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    hourDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    dowDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    // Alle X Minuten aktivieren
    everyXMinToggle.checked = true;
    setMinuteDropdownEnabled();

    // Minuten: 0,5,10,...,55 setzen
    for (let m=0; m<60; m+=5){
      const cb = minuteDropdown.querySelector(`input[value="${m}"]`);
      if (cb) cb.checked = true;
    }

    // Wochentage: Mo-Fr => 1..5
    [1,2,3,4,5].forEach(v=>{
      const cb = dowDropdown.querySelector(`input[value="${v}"]`);
      if (cb) cb.checked = true;
    });

    // Stunden leer => '*' (jede Stunde)
    updateCron();
    statusEl.textContent = "Beispiel geladen: */5 Minuten, Mo–Fr.";
  });

  document.getElementById("clearAll").addEventListener("click", ()=>{
    commandEl.value = "";

    everyXMinToggle.checked = false;
    everyXMinInput.value = 5;
    setMinuteDropdownEnabled();

    [minuteDropdown, hourDropdown, dowDropdown].forEach(container=>{
      container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    });

    statusEl.textContent = "Zurückgesetzt.";
    updateCron();
  });

  // Init
  setMinuteDropdownEnabled();
  updateCron();
