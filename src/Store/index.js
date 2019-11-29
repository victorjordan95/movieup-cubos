import { createStore } from 'redux';
import constants from '../Constants/constants';
import api from '../Services/api';

const INITIAL_STATE = {
    data: [
        'React Native',
        'ReactJS',
        'NodeJS'
    ],
};

const fetchCategories = () => async dispatch => {
    const response = await api.get(`/genre/movie/list?api_key=${constants.API_KEY}&language=${constants.LANGUAGE}`);
    dispatch({ type: 'FETCH_CATEGORIES', payload: response.data })
}

function categories(state = [], action) {
    switch (action.type) {
        case 'FETCH_CATEGORIES':
            return [...state, action.payload]
        default:
            return state
    }
}

const store = createStore(categories);

export default store;