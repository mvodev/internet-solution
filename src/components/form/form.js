/* eslint-disable class-methods-use-this */
class ITSForm {
  constructor(formTag) {
    this.form = formTag;
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.controlWord = this.form.querySelector('.its-form__input input[name="control-word"]');
    this.password1 = this.form.querySelector('.its-form__input input[name="newpass-1"]');
    this.password2 = this.form.querySelector('.its-form__input input[name="newpass-2"]');
    this.login = this.form.querySelector('.its-form__input input[name="login"]');
    this.warningNotMatch = this.form.querySelector('.its-form__error_not_match');
    this.warningPasswordLength = this.form.querySelector('.its-form__error_password_length');
    this.warningControlWord = this.form.querySelector('.its-form__error_wrong_word');
    this.warningMandatoryField = this.form.querySelector('.its-form__error_mandatory_field');
    this.eye = this.form.querySelector('.its-form__eye');
    this.form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', this.handleInputChange.bind(this));
    });
    this.eye.addEventListener('pointerdown', this.handleEyeClick.bind(this));
  }

  handleEyeClick() {
    if (this.eye.classList.contains('its-form__eye_closed')) {
      this.password1.type = 'text';
    }
    this.eye.classList.remove('its-form__eye_closed');
  }

  handleInputChange() {
    this.hideAllWarnings();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.login.value.toString().length === 0) {
      this.showLoginWarning();
    } else if (this.controlWord.value.toString().length === 0) {
      this.showControlWordWarning();
    } else if (this.password1.value.toString().length < 6) {
      this.showNotPasswordLength();
    } else if (this.password1.value !== this.password2.value) {
      this.showNotMatchPasswordWarning();
    } else {
      this.form.submit();
    }
  }

  showNotMatchPasswordWarning() {
    this.warningNotMatch.classList.add('its-form__error_active');
  }

  showNotPasswordLength() {
    this.warningPasswordLength.classList.add('its-form__error_active');
  }

  showLoginWarning() {
    this.warningMandatoryField.classList.add('its-form__error_active');
  }

  showControlWordWarning() {
    this.warningControlWord.classList.add('its-form__error_active');
    this.warningControlWord.innerText = 'Обязательное поле';
  }

  hideAllWarnings() {
    this.warningControlWord.classList.remove('its-form__error_active');
    this.warningMandatoryField.classList.remove('its-form__error_active');
    this.warningPasswordLength.classList.remove('its-form__error_active');
    this.warningNotMatch.classList.remove('its-form__error_active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-its-form').forEach((form) => {
    // eslint-disable-next-line no-new
    new ITSForm(form);
  });
});
