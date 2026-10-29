const messageEl = document.getElementById('message');
const roundMessageEl = document.getElementById('roundMessage');

function showMessage(el, text, isError = false) {
  if (!el) return;
  el.textContent = text;
  el.style.color = isError ? '#f87171' : '#fbbf24';
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

    const tbody = document.getElementById('roundTableBody');
    tbody.innerHTML = '';

    data.recentRounds.forEach((round) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${new Date(round.created_at).toLocaleString()}</td>
        <td>${Number(round.multiplier).toFixed(2)}x</td>
        <td>${round.result}</td>
        <td>${Number(round.stake || 0).toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

if (document.getElementById('statsGrid')) {
  loadStats();
}
