export const fullNameValidation = {
  required: 'Обязательное поле для заполнения',
  pattern: {
    value: /^[а-яА-ЯёЁa]+$/,
    message: 'Только кириллический алфавит',
  },
}

export const emailValidation = {
  pattern: {
    value: /^[-\w.]+@([A-z\d][-A-z\d]+\.)+[A-z]{2,4}$/,
    message: 'Введён некорректный email',
  },
}

export const consentValidation = {
  required: 'Необходимо согласиться',
}

export const requiredValidation = {
  required: 'Обязательное поле для заполнения',
}
