/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let salarySumResult = 0;

  for (let key in salaries) {
    let salary = salaries[key];

    if (!Number.isFinite(salary)) {
      continue;
    }

    salarySumResult += salary;
  }

  return salarySumResult;
}