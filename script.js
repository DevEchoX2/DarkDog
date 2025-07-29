let tabs = document.querySelector('.tabs');
let tabContent = document.querySelector('.tab-content');
let tabId = 0;

function createTab(title = 'New Tab') {
  const id = `tab-${++tabId}`;
  const tab = document.createElement('div');
  tab.className = 'tab active';
  tab.dataset.id = id;
  tab.innerHTML = `${title} <span class="close">×</span>`;
  tabs.appendChild(tab);

  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  const content = document.createElement('div');
  content.className = 'content';
  content.dataset.id = id;
  content.innerHTML = `<h1>${title}</h1><p>Welcome to DarkDog 🐾</p>`;
  tabContent.innerHTML = '';
  tabContent.appendChild(content);

  tab.querySelector('.close').onclick = () => {
    closeTab(id);
  };

  tab.onclick = () => {
    switchTab(id);
  };
}

function closeTab(id) {
  document.querySelector(`[data-id="${id}"]`)?.remove();
  document.querySelector(`.content[data-id="${id}"]`)?.remove();

  let remainingTabs = document.querySelectorAll('.tab');
  if (remainingTabs.length > 0) {
    let lastTab = remainingTabs[remainingTabs.length - 1];
    switchTab(lastTab.dataset.id);
  } else {
    tabContent.innerHTML = '';
  }
}

function switchTab(id) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.id === id);
  });

  let content = document.querySelector(`.content[data-id="${id}"]`);
  if (content) {
    tabContent.innerHTML = '';
    tabContent.appendChild(content.cloneNode(true));
  }
}

document.querySelector('.new-tab').onclick = () => createTab();
window.onload = () => createTab('Home');
