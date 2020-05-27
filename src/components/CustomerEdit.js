import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
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

const MyField = ({input, meta, type, label, name}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={!type ? "text" : type }/>
        {
            meta.touched && meta.error && <span>{meta.error} </span>
        }
    </div>
);

const toNumber = value => value && Number(value);
//const toUpper = value => value && value.toUpperCase();
const onlyGrow = (value, previousValue, values) =>
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded }) => {
    return (
        <div>
            <h2>Ediciondel cliente</h2>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name" 
                    component={MyField}
                    type="text"
                    validate={isRequired}
                    label="Nombre"
                    //parse={toUpper}
                />
                <Field
                    name="dni" 
                    component={MyField} 
                    validate={[isRequired, isNumber]}
                    label="Dni"
                />
                <Field 
                    name="age" 
                    component={MyField} 
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
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm({ form: 'CustomerEdit', validate })(CustomerEdit)

export default setPropsAsInitial(CustomerEditForm);