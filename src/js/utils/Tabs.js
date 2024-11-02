class Tabs {
  $parentBlock = null;

  tabs = [];
  tabContentBlocks = [];

  activeIndex = null;

  attrs = {
    tab: 'data-tab',
    tabContent: 'data-tab-content',
  };

  constructor($parentBlock) {
    this.$parentBlock = $parentBlock;

    this.tabs = this.getItems(this.attrs.tab);
    this.tabContentBlocks = this.getItems(this.attrs.tabContent);
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
            ($tab) => $tab.getAttribute(`${this.attrs.tab}`) === window.location.hash.slice(1),
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
    window.location.hash = target.getAttribute(`${this.attrs.tab}`);
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
          $block.getAttribute(`${this.attrs.tabContent}`) !==
          this.tabs[this.activeIndex].getAttribute(`${this.attrs.tab}`)
            ? 'add'
            : 'remove'
        }`
      ]('hidden'),
    );
  }
}

const dataTabsParentName = 'data-tab-parent';

export function initTabs() {
  document.querySelectorAll(`[${dataTabsParentName}]`).forEach(($tabsParent) => {
    new Tabs($tabsParent);
  });
}
