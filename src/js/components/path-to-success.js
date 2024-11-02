class PathToSuccess {
  $section = null;
  $messageDesktop = null;
  $messageMobile = null;

  classNames = {
    section: 'path-to-success',
    messageDesktop: 'message',
    messageMobile: 'message-mobile',
  };

  constructor($section) {
    this.$section = $section;

    this.getElements();
    this.transferMessageContent();
  }

  getElements() {
    this.$messageDesktop = this.$section.querySelector(
      `.${this.classNames.section}__${this.classNames.messageDesktop}`,
    );
    this.$messageMobile = this.$section.querySelector(`.${this.classNames.section}__${this.classNames.messageMobile}`);
  }

  transferMessageContent() {
    this.$messageMobile.textContent = this.$messageDesktop.querySelector('p').textContent;
  }
}

export function initPathToSuccess() {
  const $pathToSuccessSection = document.querySelector('.path-to-success');

  if (!$pathToSuccessSection) return;

  new PathToSuccess($pathToSuccessSection);
}
