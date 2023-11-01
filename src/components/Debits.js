/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
function Debits({ debitlist, addDebit, accountBalance}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const {description, amount} = e.target;
    const rounded = Number(amount.value).toFixed(2);
    addDebit(description.value, Number(rounded));
    e.target.reset();
    /*
    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    console.log(formJSON); 
    */

  }
  let debitsView = () => {
    return debitlist.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>;
    });
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      <ul>{debitsView()}</ul>
      <form onSubmit={handleSubmit}>

        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <AccountBalance accountBalance = {accountBalance} />
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
