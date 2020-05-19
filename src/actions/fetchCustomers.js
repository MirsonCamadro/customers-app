import { FETCH_CUSTOMERS } from './../constants';
import { createAction } from 'redux-actions';

const customers = [
    { "dni": "16479601-9",
      "name": "Mirson Camadro",
      "age": 32 },
    { "dni": "26479601-9",
      "name": "Young Mirson Camadro",
      "age": 12 },
    { "dni": "6479601-9",
      "name": "Old Mirson Camadro",
      "age": 52 }
];

export const fetchCustomers = createAction(FETCH_CUSTOMERS, () => customers);
