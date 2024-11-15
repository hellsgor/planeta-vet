class LazyLoader {
  constructor(img) {
    this.$img = img;

    this.init();
    // this.loadImage();
  }
  init() {
    // console.log(this.$img);
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries, observer) => {
          // console.log(entries);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadImage();
              observer.unobserve(this.$img);
            }
          });
        },
        { root: document, rootMargin: '8000px' },
      );
      this.observer.observe(this.$img);
    } else {
      this.loadImage();
    }
  }
  loadImage() {
    if (this.$img.dataset.src) {
      console.log(`Loading image: ${this.$img.dataset.src}`);
      this.$img.src = this.$img.dataset.src;
      const container = this.$img.closest('.image-container');
      if (container) {
        container.classList.add('loaded');
        console.log('Added loaded class to container');
      } else {
        console.log('No container found for', this.$img);
      }
    } else {
      console.log('No data-src found for', this.$img);
    }
  }
}

export const initLazyLoading = function () {
  document.querySelectorAll('img').forEach(($img) => {
    new LazyLoader($img);
  });
};
