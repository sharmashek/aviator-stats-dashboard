* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #111827;
  color: #f3f4f6;
}

.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 420px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

h1, h2, p {
  margin-top: 0;
}

.subtitle {
  color: #9ca3af;
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input, select, button {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #374151;
  padding: 12px 14px;
  margin-bottom: 18px;
  font-size: 1rem;
}

input, select {
  background: #0f172a;
  color: #f8fafc;
}

button {
  background: #10b981;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 700;
}

button:hover {
  filter: brightness(1.05);
}

.switch-link {
  margin-top: 12px;
  text-align: center;
  color: #d1d5db;
}

.switch-link a {
  color: #60a5fa;
}

.message {
  min-height: 20px;
  color: #fbbf24;
}

.dashboard-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #0f172a;
  padding: 24px 16px;
  border-right: 1px solid #1f2937;
}

.sidebar h2 {
  margin-bottom: 24px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar a {
  color: #dbeafe;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 8px;
}

.sidebar a:hover {
  background: #1e293b;
}

.main-panel {
  flex: 1;
  padding: 28px;
}

.topbar {
  margin-bottom: 28px;
}

.eyebrow {
  color: #93c5fd;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card, .panel {
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 14px;
  padding: 18px;
}

.stat-card span {
  display: block;
  color: #9ca3af;
  margin-bottom: 10px;
}

.stat-card strong {
  font-size: 1.7rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.chart-panel {
  min-height: 260px;
}

.chart-panel canvas {
  width: 100%;
  height: 220px;
  display: block;
  background: rgba(15, 23, 42, 0.45);
  border-radius: 10px;
}

.round-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  align-items: end;
}

.add-round-panel {
  margin-bottom: 24px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid #374151;
}

th {
  color: #cbd5e1;
}

@media (max-width: 760px) {
  .dashboard-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #1f2937;
  }
}
