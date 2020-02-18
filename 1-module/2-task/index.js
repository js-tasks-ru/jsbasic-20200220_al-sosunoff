/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  if (!name) {
    return false;
  }

  let withoutSpace = '[^\\s]';
  let minFourSign = '{4,}';

  return test(name, `^${withoutSpace}${minFourSign}$`);
}

function test(name, reg) {
  let regex = new RegExp(reg);
  return regex.test(name);
}

function sayHello() {
  const userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}

console.log(isValid('Ilia Burlak'));
