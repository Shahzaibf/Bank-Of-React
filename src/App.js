/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0.0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
    this.componentDidMount();
  }

  balcalc = () => {
    const {creditList, debitList} = this.state;
    const totalCreds = creditList.reduce(
      (total, credit) => total + credit.amount,
      0
    );
    const totalDebits = debitList.reduce(
      (total, debit) => total + debit.amount,
      0
    );
    const accountBalance = (totalCreds - totalDebits).toFixed(2);
  
    this.setState({ accountBalance });
  }

  async componentDidMount() {
    try {
      let response = await axios.get('https://johnnylaicode.github.io/api/credits.json');
      let response2 = await axios.get('https://johnnylaicode.github.io/api/debits.json');
      this.setState({creditList: response.data});
      this.setState({debitList: response2.data});
    }
    catch(error) {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
      if(error.response2) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    }
    this.balcalc();
  }
  addDebit = (description, amount) => {
    const Debitn = {
      id: this.state.debitList.length + 1,
      description,
      amount,
      date: new Date().toISOString()
    };
    //spread operator old list + new list
    const changeddebits = [...this.state.debitList, Debitn];
    this.setState({ debitList: changeddebits}, () => {
      this.balcalc();
    });
  }
  
  addCredit = (description, amount) => {
    const Creditn = {
      id: this.state.creditList.length + 1,
      description,
      amount,
      date: new Date().toISOString()
    };
    //spread operator old list + new list
    const changedcredits = [...this.state.creditList, Creditn];
    this.setState({creditList: changedcredits}, () => {
      this.balcalc();
    })
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits creditlist={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>) 
    const DebitsComponent = () => (<Debits debitlist={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/Bank-Of-React">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;