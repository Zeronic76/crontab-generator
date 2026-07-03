<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Crontab Generator</title>

  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>
  <div class="app-wrap">
    <div class="hero d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div>
        <div class="pill"><span class="dot"></span><span class="fw-bold">Crontab Generator</span></div>
      </div>

      <div class="small-muted text-end">
        <div>Schritt 1: Zeiten auswählen</div>
        <div>Schritt 2: Command ergänzen</div>
      </div>
    </div>

<div class="row g-3">
  <!-- Minuten: Dropdown Mehrfach -->
  <div class="col-12 col-lg-4">
    <div class="panel h-100">
      <div class="field-title">Minute</div>

      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="everyXMinToggle">
        <label class="form-check-label" for="everyXMinToggle">Alle X Minuten</label>
      </div>

      <div class="d-flex gap-2 align-items-center mb-3">
        <input id="everyXMinInput" type="number" class="form-control mono" min="1" max="59" value="5" style="max-width: 120px;">
        <span class="small-muted">Minuten (=> */X)</span>
      </div>

      <div class="dropdown w-100">
        <button class="btn btn-outline-light w-100 dropdown-toggle text-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Minuten wählen (mehrfach)
        </button>
        <div class="dropdown-menu w-100 p-3" id="minuteDropdown" style="max-height: 260px; overflow:auto;"></div>
      </div>
    </div>
  </div>

  <!-- Stunden: Dropdown Mehrfach -->
  <div class="col-12 col-lg-4">
    <div class="panel h-100">
      <div class="field-title">Stunde</div>

      <div class="dropdown w-100">
        <button class="btn btn-outline-light w-100 dropdown-toggle text-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Stunden wählen (mehrfach)
        </button>
        <div class="dropdown-menu w-100 p-3" id="hourDropdown" style="max-height: 260px; overflow:auto;"></div>
      </div>

      <div class="help mt-2">Wenn nichts ausgewählt ist, wird <span class="mono">*</span> verwendet.</div>
    </div>
  </div>

  <!-- Tag im Monat: Dropdown Mehrfach -->
  <div class="col-12 col-lg-4">
    <div class="panel h-100">
      <div class="field-title">Tag im Monat</div>

      <div class="dropdown w-100">
        <button class="btn btn-outline-light w-100 dropdown-toggle text-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Tage wählen (mehrfach)
        </button>
        <div class="dropdown-menu w-100 p-3" id="domDropdown" style="max-height: 260px; overflow:auto;"></div>
      </div>

      <div class="help mt-2">Wenn nichts gewählt ist, wird <span class="mono">*</span> verwendet.</div>
    </div>
  </div>

  <!-- Monat: Dropdown Mehrfach -->
  <div class="col-12 col-lg-4">
    <div class="panel h-100">
      <div class="field-title">Monat</div>

      <div class="dropdown w-100">
        <button class="btn btn-outline-light w-100 dropdown-toggle text-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Monate wählen (mehrfach)
        </button>
        <div class="dropdown-menu w-100 p-3" id="monthDropdown" style="max-height: 260px; overflow:auto;"></div>
      </div>

      <div class="help mt-2">Wenn nichts gewählt ist, wird <span class="mono">*</span> verwendet.</div>
    </div>
  </div>



  <!-- Wochentag: Dropdown Mehrfach -->
  <div class="col-12 col-lg-4">
    <div class="panel h-100">
      <div class="field-title">Wochentag</div>

      <div class="dropdown w-100">
        <button class="btn btn-outline-light w-100 dropdown-toggle text-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Wochentage wählen (mehrfach)
        </button>
        <div class="dropdown-menu w-100 p-3" id="dowDropdown" style="max-height: 260px; overflow:auto;"></div>
      </div>

      <div class="help mt-2">Sonntag ist <span class="mono">0</span> in cron.</div>
    </div>
  </div>

  <!-- Ergebnis/Command -->
  <div class="col-12">
    <div class="panel">
      <div class="row g-3 align-items-start">
        <div class="col-12 col-lg-6">

          <label class="form-label small-muted" for="command">Command ausführen</label>
          <input type="text" id="command" class="form-control mono" placeholder="/usr/bin/php /path/script.php"><br>
          <button class="btn btn-outline-light" id="clearAll" type="button">Alles zurücksetzen</button>
          <div class="mt-3">
            <label class="form-label small-muted">Crontab-Zeile</label>
            <textarea id="cronLine" class="form-control mono" rows="4" readonly></textarea>

            <div class="mt-3 d-grid gap-2">
              <button class="btn btn-accent" id="copyBtn" type="button">Kopieren</button>
            </div>

          </div>
        </div>

        <div class="col-12 col-lg-6">
          <label class="form-label small-muted" for="command">Regeln: Wenn keine Checkboxen gewählt sind, wird das Feld zu <span class="mono">*</span>.</label>
          <button class="btn btn-outline-light btn-accent" id="fillExample" type="button">Beispiel laden</button>
        </div>
        <div class="mt-3 help" id="status" aria-live="polite"></div>
      </div>
    </div>
  </div>
</div>

<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/script1.js"></script>

</body>
</html>
