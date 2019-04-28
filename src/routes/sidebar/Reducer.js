const ACTION_HANDLERS = {

};

const initialState = {

};

export function SidebarReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : initialState;
}