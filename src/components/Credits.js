/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

function Credits({ creditlist, addCredit, accountBalance}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const {description, amount} = e.target;
    const rounded = Number(amount.value).toFixed(2);
    addCredit(description.value, Number(rounded));
    e.target.reset();
  };

  let creditsView = () => {
    return creditlist.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>;
    });
  }

  return (
    <div>
      <h1>Credits</h1>
      {creditsView()}
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" />
        <input type="number" step="any" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <AccountBalance accountBalance = {accountBalance} />
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;