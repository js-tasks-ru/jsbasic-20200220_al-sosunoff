/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let salarySum = Object.entries(salaries)
    .reduce((result, currentElement) => {
      let salary = currentElement[1];

      if (!Number.isFinite(salary)) {
        return result;
      }
      
      return result += salary;
    }, 0);

  return salarySum;
}