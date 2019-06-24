//----------------------------
//const handlers
//-----------------------------
const ACTION_HANDLERS = {

};

const initialState = {

};

export function ProfileReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : initialState;
}