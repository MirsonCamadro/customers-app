import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomerActions from './CustomerActions';
import { Prompt } from 'react-router';

const isRequired = value => (
    !value && "Este campo es requerido"
);

const isNumber = value =>(
    isNaN(Number(value)) && "El campo debe ser un numero"
);

const validate = values => { // validacion global, ejemplo
    const error = {};

    if (!values.name) { // si es que value.name no existe ...
        error.name = "El campo es requerido"
    }

    return error
};



const toNumber = value => value && Number(value);
//const toUpper = value => value && value.toUpperCase();
const onlyGrow = (value, previousValue, values) =>
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));

class CustomerEdit extends Component {

    componentDidMount() {
        if (this.txt) {
            this.txt.focus();
        }
    };

    renderField = ({input, meta, type, label, name, withFocus}) => (
        <div>
            <label htmlFor={name}>{label}</label>
            <input {...input}
                type={!type ? "text" : type }
                ref={withFocus && (txt => this.txt = txt)}
            />
            {
                meta.touched && meta.error && <span>{meta.error} </span>
            }
        </div>
    );

    render() {
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
        return (
            <div>
                <h2>Ediciondel cliente</h2>
                <form onSubmit={handleSubmit}>
                    <Field
                        withFocus 
                        name="name" 
                        component={this.renderField}
                        type="text"
                        validate={isRequired}
                        label="Nombre"
                        //parse={toUpper}
                    />
                    <Field
                        name="dni" 
                        component={this.renderField} 
                        validate={[isRequired, isNumber]}
                        label="Dni"
                    />
                    <Field 
                        name="age" 
                        component={this.renderField} 
                        type="number"
                        validate={isNumber}
                        label="Edad"
                        parse={toNumber}
                        normalize={onlyGrow}
                    />
                    <CustomerActions>
                        <button type="submit" disabled={pristine || submitting}>Aceptar</button>
                        <button type="button" disabled={submitting} onClick={onBack}>Cancelar</button>
                    </CustomerActions>
                    <Prompt
                        when={!pristine && !submitSucceeded }
                        message="Se perderan los datos si continua"
                    />
                </form>
            </div>
        );
    }
}




CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm({ form: 'CustomerEdit', validate })(CustomerEdit)

export default setPropsAsInitial(CustomerEditForm);