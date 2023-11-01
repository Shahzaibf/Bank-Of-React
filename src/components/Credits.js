/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
//import AccountBalance from './AccountBalance';

const Credits = (props) => {
  //create credit list
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.data.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }
  return (
    <div>
      <h1>Credits</h1>
      {creditsView()}
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;