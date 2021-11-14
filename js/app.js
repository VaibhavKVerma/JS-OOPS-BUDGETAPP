const budgetFeedback = document.querySelector(".budget-feedback");
const expenseFeedback = document.querySelector(".expense-feedback");
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const budgetAmount = document.getElementById("budget-amount");
const budgetSubmit = document.getElementById("budget-submit");
const expenseAmount = document.getElementById("expense-amount");
const balanceAmount = document.getElementById("balance-amount");
const expenseForm = document.getElementById("expense-form");
const expenseInput = document.getElementById("expense-input");
const expenseSubmit = document.getElementById("expense-submit");
const amountInput = document.getElementById("amount-input");
const expenseList = document.getElementById("expense-list");

class UI {
    expenses = [];
    budget = Number(0);
    expense = 0;
    balance = 0;
    constructor() {
        this._addBudget();
        this._addExpense();
        this._expenseList();
    }

    _updateValues() {
        this.balance = this.budget - this.expense;
        console.log(this.budget, this.expense, this.balance);
        document.getElementById("budget-amount").textContent = this.budget;
        document.getElementById("expense-amount").textContent = this.expense;
        document.getElementById("balance-amount").textContent = this.balance;
    }

    _reset(){
        document.getElementById("budget-input").value = '';
        document.getElementById("expense-input").value = '';
        document.getElementById("amount-input").value = '';
    }

    _addBudget() {
        budgetSubmit.addEventListener('click', this._budgetValue.bind(this));
    }

    _budgetValue(e) {
        e.preventDefault();
        if(!this._isValidBudget())return;
        this.budget = Number(budgetInput.value);
        this._updateValues();
        this._reset();
    }

    _isValidBudget(){
        if(budgetInput.value > 0){
            return true;
        }
        budgetFeedback.style.display = "block";
        setTimeout(()=>{
            budgetFeedback.style.display = "none";
        },700);
        return false;
    }

    _addExpense() {
        expenseSubmit.addEventListener('click', this._expenseValue.bind(this));
    }

    _expenseValue(e) {
        e.preventDefault();
        if(!this._isValidExpense())return;
        expenseList.insertAdjacentHTML('beforeend', `<div class="expense">
            <div class="expense-item d-flex justify-content-between align-items-baseline">
                <h6 class="expense-title mb-0 text-uppercase list-item">${expenseInput.value}</h6>
                <h5 class="expense-amount mb-0 list-item">${Number(amountInput.value)}</h5>
                <div class="expense-icons list-item">
                    <a href="#" class="edit-icon mx-2"><i class="fas fa-edit"></i></a>
                    <a href="#" class="delete-icon"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div>`);
        this.expense += Number(amountInput.value);
        this._updateValues();
        this._reset();
    }

    _isValidExpense(){
        if(document.getElementById("expense-input").value && document.getElementById("amount-input").value > 0)return true;
        expenseFeedback.style.display = "block";
        setTimeout(()=>{
            expenseFeedback.style.display = "none";
        },900);
        return false;
    }

    _expenseList(){
        expenseList.addEventListener('click',this._expenseModify.bind(this));
    }

    _expenseModify(e){
        if(e.target.classList.contains('fa-edit')){
            console.log(1);
            this.expense -= e.target.closest('.expense').querySelector('.expense-amount').textContent;
            this.balance += e.target.closest('.expense').querySelector('.expense-amount').textContent;
            amountInput.value = e.target.closest('.expense').querySelector('.expense-amount').textContent;
            expenseInput.value = e.target.closest('.expense').querySelector('.expense-title').textContent;
            this._updateValues();
            expenseList.removeChild(e.target.closest('.expense'));
        }
        else if(e.target.classList.contains('fa-trash')){
            console.log(2);
            this.expense -= e.target.closest('.expense').querySelector('.expense-amount').textContent;
            this.balance += e.target.closest('.expense').querySelector('.expense-amount').textContent;
            this._updateValues();
            expenseList.removeChild(e.target.closest('.expense'));
        }
    }
}

let ui = new UI();