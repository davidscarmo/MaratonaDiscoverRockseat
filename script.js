const Modal = {
    open(){
      //Abrir Mobal
      //Adicionar a class active ao modal
      document
      .querySelector('.modal-overlay')
      .classList.add('active');
    }, 
    close()
    {
      //Fechar Modal, 
      //Remover a class active do modal
      document
      .querySelector('.modal-overlay')
      .classList.remove('active');
    }
  }; 

  const transactions = [
      {
       id: 1, 
       description: 'Luz', 
       amount: -50000,
       date: '23/01/2021',   
      },
      {
       id: 2, 
       description: 'Website', 
       amount: 500000,
       date: '23/01/2021',   
      },
      {
       id: 3, 
       description: 'Internet', 
       amount: -20000,
       date: '23/01/2021',   
      }
  ]; 

  const Transaction = 
  {
      all: transactions, 
      add(transaction)
      {
        Transaction.all.push(transaction);
        App.reload();
      },
      incomes()
      {
        let income = 0; 
        
        Transaction.all.filter((transaction) => transaction.amount > 0).forEach((transaction) => 
        {
            return income = income + transaction.amount;
        });
        
        return income; 
      },
      expenses()
      {
        let expense = 0; 
        
        Transaction.all.filter((transaction) => transaction.amount < 0).forEach((transaction) => 
        {
            return expense +=  transaction.amount;
        });
        
        return expense; 
      }, 
      total()
      {
        return Transaction.expenses() + Transaction.incomes(); ; 
      }
  }

  const DOM = 
  {
      transactionContainer: document.querySelector('#data-table tbody'),
      addTransaction(transaction, index) 
      {
            const tr = document.createElement('tr');
            tr.innerHTML = DOM.innerHTMLTransaction(transaction);
            DOM.transactionContainer.appendChild(tr);
      },
      innerHTMLTransaction(transaction)
      {
          const CSSClass = transaction.amount > 0 ? "income" : "expense"; 
          const amount = Utils.formatCurrency(transaction.amount); 
          const html = `
              <td class="description">${transaction.description}</td>
              <td class="${CSSClass}">${amount}</td>
              <td class="date">${transaction.date}</td>
              <td><img src="./assets/minus.svg" alt="Remover transação"></td>
          `
          return html;
      },
      updateBalance()
      {
        
        document.getElementById('incomeDisplay').innerHTML= Utils.formatCurrency(Transaction.incomes());
        document.getElementById('expenseDisplay').innerHTML= Utils.formatCurrency(Transaction.expenses());
        document.getElementById('totalDisplay').innerHTML= Utils.formatCurrency(Transaction.total());

      },
      clearTransaction()
      {
       DOM.transactionContainer.innerHTML = "";   
      }
  }

  const Utils = 
  {
      formatCurrency(value)
      {
          const signal = Number(value) <0 ? "-" : ""; 
          value = String(value).replace(/\D/g, ""); 
          value = Number(value)/100; 
          value = value.toLocaleString('pt-BR', 
          {
              style: "currency", 
              currency: "BRL"
          })

          return signal + value; 
      }
  }

  const App = 
  {
      init()
      {
        Transaction.all.forEach((transactions) => (DOM.addTransaction(transactions))); 

        DOM.updateBalance();
       
        }, 
      reload()
      {
        DOM.clearTransaction();
        App.init();
      }
  }
 
  App.init();
  Transaction.add(
            {
                id: 39, 
                description: 'Alo', 
                amount: 200, 
                date: '23/01/2021'
            }
        ); 
       
console.log(transactions);