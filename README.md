const messageEl = document.getElementById('message');
const roundMessageEl = document.getElementById('roundMessage');

function showMessage(el, text, isError = false) {
  if (!el) return;
  el.textContent = text;
  el.style.color = isError ? '#f87171' : '#fbbf24';
}

function drawTrendChart(rounds) {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  const maxValue = Math.max(1, ...rounds.map((r) => Number(r.multiplier || 0)), 10);
  const padding = 30;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  const values = [...rounds].reverse();
  if (!values.length) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Arial';
    ctx.fillText('No rounds yet', width / 2 - 45, height / 2);
    return;
  }

  ctx.beginPath();
  values.forEach((round, index) => {
    const x = padding + (index / Math.max(values.length - 1, 1)) * chartWidth;
    const y = height - padding - (Number(round.multiplier) / maxValue) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 2;
  ctx.stroke();

  values.forEach((round, index) => {
    const x = padding + (index / Math.max(values.length - 1, 1)) * chartWidth;
    const y = height - padding - (Number(round.multiplier) / maxValue) * chartHeight;

    ctx.beginPath();
    ctx.fillStyle = round.result === 'win' ? '#34d399' : '#f87171';
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawResultChart(rounds) {
  const canvas = document.getElementById('resultChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  const wins = rounds.filter((round) => round.result === 'win').length;
  const losses = rounds.filter((round) => round.result === 'loss').length;
  const total = wins + losses || 1;

  const barWidth = 120;
  const maxBarHeight = 120;
  const baseY = height - 30;

  const winHeight = (wins / total) * maxBarHeight;
  const lossHeight = (losses / total) * maxBarHeight;

  ctx.fillStyle = '#34d399';
  ctx.fillRect(90, baseY - winHeight, barWidth, winHeight);
  ctx.fillStyle = '#f87171';
  ctx.fillRect(240, baseY - lossHeight, barWidth, lossHeight);

  ctx.fillStyle = '#e5e7eb';
  ctx.font = '14px Arial';
  ctx.fillText('Wins', 120, baseY + 18);
  ctx.fillText('Losses', 270, baseY + 18);
  ctx.fillText(`${wins}`, 118, baseY - winHeight - 8);
  ctx.fillText(`${losses}`, 268, baseY - lossHeight - 8);
}

if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(messageEl, data.error || 'Login failed', true);
        return;
      }

      window.location.href = '/dashboard';
    } catch (error) {
      showMessage(messageEl, 'Network error. Please try again.', true);
    }
  });
}

if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(messageEl, data.error || 'Registration failed', true);
        return;
      }

      showMessage(messageEl, 'Account created! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      showMessage(messageEl, 'Network error. Please try again.', true);
    }
  });
}

if (document.getElementById('roundForm')) {
  document.getElementById('roundForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/rounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(roundMessageEl, data.error || 'Failed to save round', true);
        return;
      }

      showMessage(roundMessageEl, 'Round saved successfully');
      event.target.reset();
      loadStats();
    } catch (error) {
      showMessage(roundMessageEl, 'Network error. Please try again.', true);
    }
  });
}

async function loadStats() {
  const statsEl = document.getElementById('statsGrid');
  if (!statsEl) return;

  try {
    const res = await fetch('/api/stats');
    if (!res.ok) {
      window.location.href = '/login';
      return;
    }

    const data = await res.json();
    document.getElementById('totalRounds').textContent = data.totalRounds;
    document.getElementById('winRate').textContent = `${data.winRate}%`;
    document.getElementById('avgMultiplier').textContent = `${Number(data.averageMultiplier).toFixed(2)}x`;
    document.getElementById('bestMultiplier').textContent = `${Number(data.bestMultiplier).toFixed(2)}x`;
    document.getElementById('currentStreak').textContent = data.currentStreak;
    document.getElementById('longestStreak').textContent = data.longestStreak;

    const tbody = document.getElementById('roundTableBody');
    tbody.innerHTML = '';

    const roundList = [...(data.recentRounds || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    roundList.forEach((round) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${new Date(round.created_at).toLocaleString()}</td>
        <td>${Number(round.multiplier).toFixed(2)}x</td>
        <td>${round.result}</td>
        <td>${Number(round.stake || 0).toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });

    drawTrendChart(roundList);
    drawResultChart(roundList);
  } catch (error) {
    console.error(error);
  }
}

if (document.getElementById('statsGrid')) {
  loadStats();
}
