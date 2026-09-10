const textarea = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');
const toast = document.getElementById('toast');

// Atualiza contadores em tempo real
function updateStats() {
  const text = textarea.value;
  charCount.textContent = text.length;

  const words = text.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = text.trim() === '' ? 0 : words.length;

  const lines = text.split(/\r\n|\r|\n/);
  lineCount.textContent = text === '' ? 0 : lines.length;
}

if (textarea) {
  textarea.addEventListener('input', updateStats);
}

// Métodos de transformação do texto
function transformText(type) {
  if (!textarea) return;
  const text = textarea.value;
  if (!text) return;

  switch (type) {
    case 'upper':
      textarea.value = text.toUpperCase();
      break;

    case 'lower':
      textarea.value = text.toLowerCase();
      break;

    case 'title':
      textarea.value = text.toLowerCase().replace(/(?:^|\s)\S/g, match => match.toUpperCase());
      break;

    case 'sentence':
      textarea.value = text.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_, prefix, letter) => prefix + letter.toUpperCase());
      break;

    case 'alternating':
      textarea.value = text.split('').map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      ).join('');
      break;

    case 'inverse':
      textarea.value = text.split('').map(char => {
        if (char === char.toUpperCase()) return char.toLowerCase();
        return char.toUpperCase();
      }).join('');
      break;
  }

  updateStats();
}

// Copiar para a área de transferência
async function copyToClipboard() {
  if (!textarea || !textarea.value) return;
  try {
    await navigator.clipboard.writeText(textarea.value);
    showToast('Texto copiado com sucesso!');
  } catch (err) {
    showToast('Falha ao copiar.');
  }
}

// Limpar área de texto
function clearText() {
  if (!textarea) return;
  textarea.value = '';
  updateStats();
  textarea.focus();
}

// Exibe feedback visual
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
}
