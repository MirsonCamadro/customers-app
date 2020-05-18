import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import CustomersList from '../components/CustomersList';
import CustomerActions from '../components/CustomerActions';

const customers = [
    { "dni": "16479601-9",
      "name": "Mirson Camadro",
      "age": 32 },
    { "dni": "16479601-9",
      "name": "Young Mirson Camadro",
      "age": 12 },
    { "dni": "16479601-9",
      "name": "Old Mirson Camadro",
      "age": 52 },
];

class CustomersContainer extends Component {
    
    handleAddNew = () => {
        this.props.history.push('/customers/new');
    }

    renderBody = customers => (
        <div>
            <CustomersList
                customers={customers}
                urlPath={'customer/'}
            />
            <CustomerActions>
                <button onClick={this.handleAddNew}>Nuevo Cliente</button>
            </CustomerActions>
        </div>
    );

    render() {
        return (
            <div>
                <AppFrame
                    header={'Listado de clientes'}
                    body={this.renderBody(customers)}
                />
            </div>
        );
    }
}

CustomersContainer.propTypes = {

};

export default withRouter(CustomersContainer);