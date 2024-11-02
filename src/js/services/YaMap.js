/* global ymaps */

class YaMap {
  $block = null;
  blockId = null;

  attrs = {
    cords: 'data-cords',
  };

  constructor($block) {
    this.$block = $block;
    this.blockId = this.$block.getAttribute('id');

    ymaps.ready(() => this.initMap());
  }

  initMap() {
    const cords = this.getCords();
    if (!cords?.length) return;

    var myMap = new ymaps.Map(this.blockId, {
      center: cords,
      zoom: 14,
      controls: [],
    });

    // Добавление контролов с настройками
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        // position: { left: 5, top: 200 },
      },
    });
    var typeSelector = new ymaps.control.TypeSelector();
    var fullscreenControl = new ymaps.control.FullscreenControl();

    myMap.controls.add(zoomControl);
    myMap.controls.add(typeSelector);
    myMap.controls.add(fullscreenControl);

    // Добавление маркера
    const marker = new ymaps.Placemark(cords, null, {
      // iconLayout: 'default#image',
      // iconImageHref: '/local/templates/main/build/image/icon_map.svg',
      // iconImageSize: [40, 40],
      // iconImageOffset: [-15, -44],
    });

    myMap.geoObjects.add(marker);
  }

  getCords() {
    return this.$block.hasAttribute(this.attrs.cords) ? this.$block.getAttribute(this.attrs.cords).split(',') : null;
  }
}

export function initYaMap() {
  document.querySelectorAll('[data-ymap]').forEach(($map) => {
    new YaMap($map);
  });
}
