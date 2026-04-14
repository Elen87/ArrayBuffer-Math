module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off', // Отключаем проверку окончаний строк
    'no-plusplus': 'off', // Отключаем запрет на инкремент
    'no-return-assign': 'off', // Отключаем для тестов
    'global-require': 'off', // Отключаем для тестов
    'new-cap': 'off', // Отключаем для тестов
  },
};
