import update from 'react-addons-update';
const ACTION_HANDLERS = {

};

const initialState = {

};

export function HelpReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : initialState;
}