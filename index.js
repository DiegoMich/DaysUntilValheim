document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_DAYS = 90;

    // ── Argentina time (UTC-3, no DST) ───────────────────────
    function getArgentinaDateParts() {
        const now = new Date();
        // Shift UTC by -3 hours, then read UTC components = Argentina local date
        const arg = new Date(now.getTime() - 3 * 3600 * 1000);
        return {
            year:  arg.getUTCFullYear(),
            month: arg.getUTCMonth(), // 0-indexed
            day:   arg.getUTCDate()
        };
    }

    // ── Next June 21 from today (Argentina) ──────────────────
    function getTargetSolsticeMs() {
        const { year, month, day } = getArgentinaDateParts();
        // If today is June 21 or later, aim for next year
        const isPastOrOnSolstice = month > 5 || (month === 5 && day >= 21);
        const targetYear = isPastOrOnSolstice ? year + 1 : year;
        return Date.UTC(targetYear, 5, 21); // June 21 as UTC midnight
    }

    // ── Compute countdown values ──────────────────────────────
    function computeCountdown() {
        const { year, month, day } = getArgentinaDateParts();
        const todayMs    = Date.UTC(year, month, day);
        const targetMs   = getTargetSolsticeMs();
        const daysRemaining = Math.max(0, Math.round((targetMs - todayMs) / 86_400_000));
        const elapsed       = Math.max(0, Math.min(TOTAL_DAYS, TOTAL_DAYS - daysRemaining));
        const targetYear    = new Date(targetMs).getUTCFullYear();
        return { daysRemaining, elapsed, targetYear };
    }

    const { daysRemaining, elapsed, targetYear } = computeCountdown();

    // ── Update DOM ────────────────────────────────────────────
    document.getElementById('days-number').textContent = daysRemaining;
    document.getElementById('target-date').textContent =
        `June 21 · ${targetYear} · Buenos Aires`;

    const e = elapsed;
    const r = daysRemaining;
    document.getElementById('stat-elapsed').textContent =
        `${e} day${e !== 1 ? 's' : ''} elapsed`;
    document.getElementById('stat-remaining').textContent =
        `${r} day${r !== 1 ? 's' : ''} to solstice`;

    // ── Progress bar ──────────────────────────────────────────
    const stepsBar = document.getElementById('steps-bar');
    stepsBar.innerHTML = '';

    for (let i = 0; i < TOTAL_DAYS; i++) {
        const cell = document.createElement('div');
        cell.className = 'step-cell ' + (i < elapsed ? 'elapsed' : 'remaining');
        if ((i + 1) % 10 === 0) cell.classList.add('milestone');
        cell.style.animationDelay = `${i * 10}ms`; // staggered left-to-right reveal
        stepsBar.appendChild(cell);
    }

    // ── Marker ────────────────────────────────────────────────
    const markerWrap     = document.getElementById('marker-wrap');
    const barWrapper     = document.getElementById('bar-wrapper');

    function updateMarker() {
        const w        = barWrapper.offsetWidth;
        const fraction = elapsed / TOTAL_DAYS;
        markerWrap.style.left = `${fraction * w}px`;
    }

    updateMarker();
    window.addEventListener('resize', updateMarker);

    // ── Snow particles ────────────────────────────────────────
    const snowContainer = document.getElementById('snow');
    const FLAKE_COUNT   = 55;

    for (let i = 0; i < FLAKE_COUNT; i++) {
        const f    = document.createElement('div');
        f.className = 'snowflake';
        const size = Math.random() * 4 + 2; // 2–6 px
        f.style.width            = `${size}px`;
        f.style.height           = `${size}px`;
        f.style.left             = `${Math.random() * 100}vw`;
        f.style.animationDuration  = `${Math.random() * 12 + 9}s`;
        f.style.animationDelay     = `-${Math.random() * 22}s`; // pre-seed into animation
        f.style.opacity            = (Math.random() * 0.45 + 0.18).toFixed(2);
        snowContainer.appendChild(f);
    }
});
