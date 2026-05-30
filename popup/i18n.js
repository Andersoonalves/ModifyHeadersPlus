const I18n = {
  currentLang: 'en',
  messages: {},

  async init() {
    const saved = await this.getSavedLang();
    const browserLang = navigator.language.split('-')[0];
    const lang = saved || (['en', 'pt'].includes(browserLang) ? browserLang : 'en');
    await this.setLang(lang);
  },

  getSavedLang() {
    return new Promise(resolve => {
      chrome.storage.local.get('language', data => resolve(data.language || null));
    });
  },

  async setLang(lang) {
    this.currentLang = lang;
    try {
      const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);
      const resp = await fetch(url);
      this.messages = await resp.json();
    } catch (e) {
      console.warn('Failed to load locale:', lang, e);
      if (lang !== 'en') return this.setLang('en');
      return;
    }
    chrome.storage.local.set({ language: lang });
    this.applyToDOM();
    this.updateLangButtons();
  },

  t(key, substitutions) {
    const entry = this.messages[key];
    if (!entry) return key;
    let msg = entry.message;
    if (substitutions) {
      const subs = Array.isArray(substitutions) ? substitutions : [substitutions];
      subs.forEach((val, i) => {
        msg = msg.replace(new RegExp('\\$' + (i + 1), 'g'), val);
      });
    }
    return msg;
  },

  applyToDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = this.t(key);
      if (translated !== key) el.textContent = translated;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translated = this.t(key);
      if (translated !== key) el.placeholder = translated;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translated = this.t(key);
      if (translated !== key) el.title = translated;
    });
  },

  updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  }
};
