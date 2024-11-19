class Tabs {
  $parentBlock = null;

  tabs = [];
  tabContentBlocks = [];

  activeIndex = null;

  static attrs = {
    tab: 'data-tab',
    tabContent: 'data-tab-content',
    tabParent: 'data-tab-parent',
  };

  constructor($parentBlock) {
    this.$parentBlock = $parentBlock;

    this.tabs = this.getItems(Tabs.attrs.tab);
    this.tabContentBlocks = this.getItems(Tabs.attrs.tabContent);
    if (!this.tabs.length || !this.tabContentBlocks.length) return;

    this.prepare();
    this.addEvents();
  }

  getItems(dataAttr) {
    return this.$parentBlock.querySelectorAll(`[${dataAttr}]`);
  }

  prepare() {
    if (window.location.hash?.slice(1)) {
      this.activeIndex = window.location.hash
        ? Array.from(this.tabs).findIndex(
            ($tab) => $tab.getAttribute(`${Tabs.attrs.tab}`) === window.location.hash.slice(1),
          )
        : 0;
    } else {
      this.activeIndex = 0;
    }

    if (this.activeIndex < 0) this.activeIndex = 0;

    this.tabs[this.activeIndex].classList.add('active');
    this.showTabContentBlock();
  }

  addEvents() {
    this.tabs.forEach(($tab) => {
      $tab.addEventListener('click', this.switch.bind(this));
    });
  }

  switch(event) {
    const { currentTarget } = event;

    this.setHash(currentTarget);
    this.activateTab(currentTarget);
    this.showTabContentBlock();
  }

  setHash(target) {
    window.location.hash = target.getAttribute(`${Tabs.attrs.tab}`);
  }

  activateTab(target) {
    this.tabs.forEach(($tab, idx) => {
      if ($tab === target) {
        $tab.classList.add('active');
        this.activeIndex = idx;
      } else {
        $tab.classList.remove('active');
      }
    });
  }

  showTabContentBlock() {
    this.tabContentBlocks.forEach(($block) =>
      $block.classList[
        `${
          $block.getAttribute(`${Tabs.attrs.tabContent}`) !==
          this.tabs[this.activeIndex].getAttribute(`${Tabs.attrs.tab}`)
            ? 'add'
            : 'remove'
        }`
      ]('hidden'),
    );
  }
}

export function initTabs() {
  document.querySelectorAll(`[${Tabs.attrs.tabParent}]`).forEach(($tabsParent) => {
    new Tabs($tabsParent);
  });
}
