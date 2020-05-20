import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';

class App extends Component {

  	renderHome = () => <HomeContainer/>;

  	renderCustomerContainer = () => <h1>Customer Container</h1>;

  	renderCustomerListContainer = () => <CustomersContainer/>;
	
  	render() {
  	  	return (
  	  		<Router>
  	  		    <div>
  	  		        <Route exact path="/" component={this.renderHome} />
  	  		        <Route exact path="/customers" component={this.renderCustomerListContainer} />
  	  		        <Switch>
  	  		            <Route path="/customers/new" component={this.renderCustomerNewContainer} />
  	  		            <Route path="/customers/:dni" render={props => <CustomerContainer dni={props.match.params.dni} />} />
  	  		        </Switch>
  	  		    </div>
  	  		</Router>
		);
  	};
}

export default App;
