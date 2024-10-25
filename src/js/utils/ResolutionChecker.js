export class ResolutionChecker {
  constructor() {
    this.tabletResolution = 1200;
    this.mobileResolution = 767;
    this.extraMobileResolution = 370;
  }

  isTablet() {
    return this.check(this.tabletResolution);
  }

  isMobile() {
    return this.check(this.mobileResolution);
  }

  isExtra() {
    return this.check(this.extraMobileResolution);
  }

  isCustom(resolution) {
    return this.check(resolution);
  }

  check(resolution) {
    try {
      return window?.matchMedia(`(max-width: ${resolution}px)`)?.matches || false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
