/* Optional enhancements; all content and navigation work without JavaScript. */
(() => {
  const storageKey = 'crt-effects';
  const effects = document.querySelector('[data-effects]');
  function setEffects(enabled) {
    document.body.classList.toggle('effects-off', !enabled);
    if (effects) {
      effects.setAttribute('aria-pressed', String(enabled));
      effects.textContent = `CRT effects: ${enabled ? 'on' : 'off'}`;
    }
  }
  let enabled = true;
  try { enabled = localStorage.getItem(storageKey) !== 'off'; } catch (_) { /* Storage may be unavailable. */ }
  setEffects(enabled);
  if (effects) {
    effects.hidden = false;
    effects.addEventListener('click', () => {
      enabled = document.body.classList.contains('effects-off');
      setEffects(enabled);
      try { localStorage.setItem(storageKey, enabled ? 'on' : 'off'); } catch (_) {}
    });
  }
  const terminal = document.querySelector('[data-terminal]');
  if (!terminal) return;
  terminal.hidden = false;
  const form = terminal.querySelector('form');
  const input = terminal.querySelector('input');
  const output = terminal.querySelector('[data-output]');
  const history = [];
  let position = 0;
  const links = [...document.querySelectorAll('nav a[data-command]')];
  const commands = ['help', 'ls', 'whoami', 'date', 'clear', ...links.map(a => a.dataset.command)];
  function print(message) {
    const line = document.createElement('p');
    line.textContent = message;
    output.append(line);
    while (output.children.length > 80) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const command = input.value.trim();
    input.value = '';
    if (!command) return;
    history.push(command);
    position = history.length;
    print(`guest@cyberpenguin:~$ ${command}`);
    const normalized = command.toLowerCase();
    if (normalized === 'clear') output.replaceChildren();
    else if (normalized === 'help') print(`Commands: ${commands.join(', ')}. Use ↑/↓ for history and Tab to complete. This is a site navigator, not a real shell.`);
    else if (normalized === 'ls') print(links.map(a => a.dataset.command + '/').join('  '));
    else if (normalized === 'whoami') print('guest — welcome to CyberPenguin’s personal terminal.');
    else if (normalized === 'date') print(new Date().toLocaleString());
    else {
      const target = links.find(a => a.dataset.command === normalized);
      if (target) target.click();
      else print(`Command not found: ${command}. Type help for available commands.`);
    }
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      position = Math.max(0, Math.min(history.length, position + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = history[position] || '';
    } else if (event.key === 'Tab' && input.value.trim()) {
      const matches = commands.filter(c => c.startsWith(input.value.trim().toLowerCase()));
      if (matches.length === 1) { event.preventDefault(); input.value = matches[0]; }
    }
  });
})();
