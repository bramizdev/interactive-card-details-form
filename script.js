'use stict';

const $ = (selector) => document.querySelector(selector);

// DOM Elements
const $cardNumberEl = $('.front__number');
const $cardNameEl = $('.front__cardholder');
const $cardExpMonthEl = $('.front__expiration-month');
const $cardExpYearEl = $('.front__expiration-year');
const $cardCVCEl = $('.back__cvc');

// Form Elements
const $form = $('.form__form');
const $formSubmitted = $('.form-submitted');
const $cardNumber = $('#number');
const $cardholderName = $('#cardholder');
const $cardExpMonth = $('#exp-month');
const $cardExpYear = $('#exp-year');
const $cardCVC = $('#cvc');
const $reset = $('#reset');

const init = () => {
  $cardNumberEl.textContent = $cardNumber.value
    ? $cardNumber.value
    : '0000 0000 0000 0000';
  $cardNameEl.textContent = $cardholderName.value
    ? $cardholderName.value
    : 'Jane Appleseed';
  $cardExpMonthEl.textContent = $cardExpMonth.value
    ? $cardExpMonth.value
    : '00';
  $cardExpYearEl.textContent = $cardExpYear.value ? $cardExpYear.value : '00';
  $cardCVCEl.textContent = $cardCVC.value ? $cardCVC.value : '000';
};

const displayInfo = (e, element) => {
  element.textContent = e.target.value;
};

const displayError = (el, message) => {
  const formControl = el.closest('.form__control');
  const input = formControl.querySelector('.form__input');
  const alert = formControl.querySelector('.form__message-error');

  input.classList.add('form__input-error');
  alert.textContent = message;
};

const displayYearError = (el, message) => {
  const formControl = el.closest('.form__control');
  const input = formControl.querySelector('#exp-year');
  const alert = formControl.querySelector('.form__message-error');

  input.classList.add('form__input-error');
  alert.textContent = message;
};

const resetError = (el) => {
  const inputs = el.querySelectorAll('.form__input');
  const alert = el.querySelector('.form__message-error');

  inputs.forEach((element) => element.classList.remove('form__input-error'));
  alert.textContent = '';
};

const isYearValid = (year) => {
  const currYear = new Date().getFullYear() - 2000;
  if (Number(year) < currYear || Number(year) > currYear + 10) return;
  return true;
};

const validateForm = () => {
  let isFormValid = false;
  if (!$cardholderName.value) {
    displayError($cardholderName, "Can't be blank");
  } else if (!$cardNumber.value) {
    displayError($cardNumber, "Can't be blank");
  } else if ($cardNumber.value.length < 18) {
    displayError($cardNumber, 'Card number is too short');
  } else if (!$cardExpMonth.value) {
    displayError($cardExpMonth, "Can't be blank");
  } else if (!isFinite($cardExpMonth.value)) {
    displayError($cardExpMonth, 'Wrong format, numbers only');
  } else if ($cardExpMonth.value < 0 && $cardExpYear.value > 12) {
    displayError($cardExpMonth, 'Wrong format, insert a valid month');
  } else if (!$cardExpYear.value) {
    displayYearError($cardExpYear, "Can't be blank");
  } else if (!isFinite($cardExpYear.value)) {
    displayYearError($cardExpYear, 'Wrong format, insert a valid month');
  } else if (!isYearValid($cardExpYear.value)) {
    displayYearError($cardExpYear, 'Invalid year, insert a valid year');
  } else if (!$cardCVC.value) {
    displayError($cardCVC, "Can't be blank");
  } else if (!isFinite($cardCVC.value)) {
    displayError($cardCVC, 'Wrong format, numbers only');
  } else if ($cardCVC.value.length < 3) {
    displayError($cardCVC, 'Wrong format, CVC is too short');
  } else {
    isFormValid = true;
  }
  return isFormValid;
};

init();

$cardNumber.addEventListener('keyup', (e) => {
  let value = e.target.value
    .replace(/[^0-9]/gi, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();

  e.target.value = value;
  $cardNumberEl.textContent = value;
});

$cardholderName.addEventListener('keyup', (e) => displayInfo(e, $cardNameEl));

$cardExpMonth.addEventListener('keyup', (e) => displayInfo(e, $cardExpMonthEl));

$cardExpYear.addEventListener('keyup', (e) => displayInfo(e, $cardExpYearEl));

$cardCVC.addEventListener('keyup', (e) => displayInfo(e, $cardCVCEl));

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelectorAll('.form__control').forEach((el) => resetError(el));
  if (!validateForm()) return;
  $form.classList.add('hidden');
  $formSubmitted.classList.remove('hidden');
});

$reset.addEventListener('click', () => {
  $cardNumber.value = '';
  $cardholderName.value = '';
  $cardExpMonth.value = '';
  $cardExpYear.value = '';
  $cardCVC.value = '';

  $form.classList.remove('hidden');
  $formSubmitted.classList.add('hidden');

  init();
});
