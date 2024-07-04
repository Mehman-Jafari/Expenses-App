/* Основные элементы */
const inputExpenseNode = document.querySelector(".js-form-expenses__input");
const categoryExpenseSelectNode = document.querySelector(".js-form-expenses__select");
const limitExpenseNode = document.querySelector(".js-info-content-expenses__item-column_limit");
const sumExpenseNode = document.querySelector(".js-info-content-expenses__item-column_sum");
const statusExpenseNode = document.querySelector(".js-info-content-expenses__item-column_status");
const historyExpensesOutputNode = document.querySelector(".js-info-content-expenses-history__list");
const addExpenseNode = document.querySelector(".js-form-expenses__add-btn");
const clearExpenseNode = document.querySelector(".js-expenses-content-main__clear-btn");

/* Элементы модального окна */
const modalNode = document.querySelector(".js-modal");
const modalCloseNode = document.querySelector(".js-top-modal__close");
const inputLimitNode = document.querySelector('.js-form-expenses__input-limit');
const btnLimitAddNode = document.querySelector('.js-main-content-modal__btn');
const btnOpenModal = document.querySelector('.js-modal-open');

const expenses = [];

addExpenseNode.addEventListener("click", (e) => {
  const dataFromUserExpense = getFromUserValue();

  addExpense(dataFromUserExpense);

  resetDefaultBrowser(e);

  renderSumExpense();

  renderLimitToSum();

  renderHistoryExpenses(dataFromUserExpense);

  resetFromUserValue(inputExpenseNode);
});

clearExpenseNode.addEventListener("click", () => {
  resetExpenses();

  renderSumExpense();
});

btnLimitAddNode.addEventListener('click', () => {
  limitToFixed();
  modalNode.classList.remove('active');
});

btnOpenModal.addEventListener('click', () => {
  modalNode.classList.add('active');
});

modalCloseNode.addEventListener('click', () => {
  modalNode.classList.remove('active');
});

function addExpense(dataFromUserExpense) {
  expenses.push(dataFromUserExpense);
}

function getFromUserValue() {
  const expense = parseInt(inputExpenseNode.value);
  const selectedOption =
    categoryExpenseSelectNode.options[categoryExpenseSelectNode.selectedIndex];
  const category = selectedOption.text;

  return {
    expense,
    category,
  };
}

function resetDefaultBrowser(e) {
  return e.preventDefault();
}

function limitToFixed() {
  const limitFromUser = inputLimitNode.value;

  return limitExpenseNode.textContent = limitFromUser;
}

function renderHistoryExpenses(dataFromUserExpense) {
  if (dataFromUserExpense.expense) {
    const historyCreateHTML = `
        <li class="info-content-expenses-history__item">${dataFromUserExpense.expense} руб. - ${dataFromUserExpense.category}</li>
    `;

    return (historyExpensesOutputNode.innerHTML += historyCreateHTML);
  }
}

function renderSumExpense() {
  let expenseSum = 0;

  expenses.forEach((element) => {
    expenseSum += element.expense;
  });

  sumExpenseNode.textContent = expenseSum;

  return expenseSum;
}

function renderLimitToSum() {
  const limitValue = parseInt(limitExpenseNode.textContent);
  const sumExpenses = renderSumExpense();

  const exceeded = sumExpenses - limitValue;

  if (sumExpenses <= limitValue) {
    statusExpenseNode.classList.add("good");
    statusExpenseNode.textContent = "Все хорошо";
  } else {
    statusExpenseNode.classList.add("error");
    statusExpenseNode.textContent = `Все плохо (-${exceeded})`;
  }
}

function resetFromUserValue(inputNode) {
  inputNode.value = "";
}

function resetStatus() {
  statusExpenseNode.classList.remove("error");
  statusExpenseNode.classList.remove("good");

  statusExpenseNode.textContent = "Недостаточно информации";
}

function resetHistory() {
  expenses.splice(0, expenses.length);

  historyExpensesOutputNode.innerHTML = "";
}

function resetExpenses() {
  let sumExpenses = renderSumExpense();
  sumExpenses = 0;

  resetFromUserValue(inputExpenseNode);

  resetHistory();

  resetStatus();
}