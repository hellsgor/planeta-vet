class ResolutionChecker {
  constructor() {
    this.laptopResolution = 1399;
    this.tabletResolution = 1199;
    this.mobileResolution = 767;
    this.extraMobileResolution = 370;
  }

  isLaptop() {
    return this.check(this.laptopResolution);
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

export const resolutionChecker = new ResolutionChecker();
