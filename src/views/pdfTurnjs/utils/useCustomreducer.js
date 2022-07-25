import React from 'react';

const reducerData = (state, action) => {
    switch (action.varian) {
        case 'conventional':
            
            return {...state,
                [action.type] : action.payload
            };
    
        default:
            return {...state,
                [action.type] : {
                    ...state[action.type],
                    ...action.payload
                }
            };
    }
}

const useCustomReducer = props => {
    const [state, dispatch] = React.useReducer(reducerData, props);
    const reducerFunc = (type, payload, varian = "") => {
        dispatch({type,payload,varian})
    }
    return [state, reducerFunc]
}

export default useCustomReducer;