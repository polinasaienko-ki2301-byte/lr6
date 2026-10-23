// ==============================
// DOM
// ==============================
const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

// Варіант 17: gap + align-items
const gap = document.querySelector('#gap');
const gapValue = document.querySelector('#gap-value');
const alignItems = document.querySelector('#align-items');

const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');

const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');

const scrollTopButton = document.querySelector('#scroll-top');


// Вкладки
function hideTabs() {
 tabs.forEach(function (tab) {
 tab.classList.remove('active');
 });

 tabContents.forEach(function (content) {
 content.classList.remove('active');
 });
}

function showTab(tabName) {
 const tab = document.querySelector(`[data-tab="${tabName}"]`);
 const content = document.querySelector(`[data-content="${tabName}"]`);

 if (!tab || !content) {
 return;
 }

 tab.classList.add('active');
 content.classList.add('active');
}

// Делегування подій: один обробник на контейнері вкладок
tabsContainer.addEventListener('click', function (event) {
 // Аналіз об'єкта event 
 console.log(event.type);
 console.log(event.target);
 console.log(event.currentTarget);

 if (!event.target.classList.contains('tab')) {
 return;
 }

 const tabName = event.target.dataset.tab;

 hideTabs();
 showTab(tabName);
});


// CSS генератор

function updateCssCode() {
 const radius = `${topLeft.value}px ${topRight.value}px ${bottomRight.value}px ${bottomLeft.value}px`;

 cssCode.value =
 `border-radius: ${radius};\n` +
 `gap: ${gap.value}px;\n` +
 `align-items: ${alignItems.value};`;
}


// Радіус межі
function generateBorderRadius() {
 const topLeftRadius = topLeft.value;
 const topRightRadius = topRight.value;
 const bottomRightRadius = bottomRight.value;
 const bottomLeftRadius = bottomLeft.value;

 const radius = `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;

 preview.style.borderRadius = radius;

 topLeftValue.textContent = `${topLeftRadius} px`;
 topRightValue.textContent = `${topRightRadius} px`;
 bottomRightValue.textContent = `${bottomRightRadius} px`;
 bottomLeftValue.textContent = `${bottomLeftRadius} px`;

 updateCssCode();
}

topLeft.addEventListener('input', generateBorderRadius);
topRight.addEventListener('input', generateBorderRadius);
bottomRight.addEventListener('input', generateBorderRadius);
bottomLeft.addEventListener('input', generateBorderRadius);


// Межа
function generateGap() {
 preview.style.gap = `${gap.value}px`;
 gapValue.textContent = `${gap.value} px`;
 updateCssCode();
}

gap.addEventListener('input', generateGap);


// Вирівнювання елеметів 
function generateAlignItems() {
 preview.style.alignItems = alignItems.value;
 updateCssCode();
}

alignItems.addEventListener('change', generateAlignItems);


// Копіювати
function copyCSS() {
 navigator.clipboard.writeText(cssCode.value)
 .then(function () {
 copyMessage.textContent = 'CSS-код скопійовано';
 })
 .catch(function () {
 // запасний варіант, якщо Clipboard API недоступний
 cssCode.select();
 document.execCommand('copy');
 copyMessage.textContent = 'CSS-код скопійовано';
 });
}

copyButton.addEventListener('click', copyCSS);


// Форма
function validatePresetName() {
 if (presetName.value.trim() === '') {
 presetName.classList.add('error');
 presetError.textContent = 'Введіть назву пресета';
 return false;
 }

 presetName.classList.remove('error');
 presetError.textContent = '';
 return true;
}

presetName.addEventListener('focus', function () {
 presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
 presetName.classList.remove('focused');
 validatePresetName();
});

function handlePresetSubmit(event) {
 event.preventDefault();

 if (!validatePresetName()) {
 return;
 }

 console.log(`Пресет: ${presetName.value.trim()}`);
 console.log(cssCode.value);
}

presetForm.addEventListener('submit', handlePresetSubmit);

// Клавіатура
function handleKeyDown(event) {
 if (event.key !== 'Escape') {
 return;
 }

 // усі range -> 0
 topLeft.value = 0;
 topRight.value = 0;
 bottomRight.value = 0;
 bottomLeft.value = 0;
 gap.value = 0;
 alignItems.value = 'center';

 generateBorderRadius();
 generateGap();
 generateAlignItems();
}

document.addEventListener('keydown', handleKeyDown);


// Попередній перегляд: поширення подій
preview.addEventListener('click', function () {
 console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
 event.stopPropagation(); // подія не дійде до preview
 console.log('Button click');
});


// Попередній перегляд: події миші
preview.addEventListener('mouseover', function () {
 preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
 preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
 coordinates.textContent = `X: ${event.clientX}; Y: ${event.clientY}`;
 console.log(`pageX: ${event.pageX}; pageY: ${event.pageY}`);
});


// Скролл
function handleScroll() {
 if (window.scrollY > 300) {
 scrollTopButton.classList.add('visible');
 } else {
 scrollTopButton.classList.remove('visible');
 }
}

window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', function () {
 window.scrollTo({
 top: 0,
 behavior: 'smooth'
 });
});


// Ініт
generateBorderRadius();
generateGap();
generateAlignItems();
