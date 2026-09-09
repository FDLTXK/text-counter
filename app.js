const textInput = document.querySelector('#text-input');
const resetButton = document.querySelector('#reset-button');
const inputState = document.querySelector('#input-state');
const characterCount = document.querySelector('#character-count');
const totalCount = document.querySelector('#total-count');
const lineCount = document.querySelector('#line-count');
const paragraphCount = document.querySelector('#paragraph-count');

const graphemeSegmenter = typeof Intl !== 'undefined' && Intl.Segmenter
  ? new Intl.Segmenter('ja', { granularity: 'grapheme' })
  : null;

function countGraphemes(value) {
  if (graphemeSegmenter) {
    return [...graphemeSegmenter.segment(value)].length;
  }

  return [...value].length;
}

function getStatistics(value) {
  const lines = value ? value.split(/\r\n|\r|\n/) : [];
  const paragraphs = value
    .split(/(?:\r\n|\r|\n)\s*(?:\r\n|\r|\n)/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const visibleCharacters = value.replace(/\s/g, '');

  return {
    characters: countGraphemes(visibleCharacters),
    total: countGraphemes(value),
    lines: lines.length,
    paragraphs: paragraphs.length,
  };
}

function updateStatistics() {
  const value = textInput.value;
  const statistics = getStatistics(value);

  characterCount.textContent = statistics.characters.toLocaleString('ja-JP');
  totalCount.textContent = statistics.total.toLocaleString('ja-JP');
  lineCount.textContent = statistics.lines.toLocaleString('ja-JP');
  paragraphCount.textContent = statistics.paragraphs.toLocaleString('ja-JP');
  inputState.textContent = value ? '入力中' : '入力待ち';
}

textInput.addEventListener('input', updateStatistics);
resetButton.addEventListener('click', () => {
  textInput.value = '';
  updateStatistics();
  textInput.focus();
});

updateStatistics();
