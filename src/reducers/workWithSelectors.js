export default function workWithSelectors(state = {mainSelector:'USD', secondSelector: 'UAH'},action) {
    switch (action.type){
        case 'MAIN_SELECTOR_CHANGE':{
            if(action.currency === state.secondSelector){
                return {...state,secondSelector:state.mainSelector,mainSelector:action.currency};
            }
            return {...state,mainSelector:action.currency};
        }
        case 'SECOND_SELECTOR_CHANGE':{
            if(action.currency === state.mainSelector){
                return {...state,mainSelector:state.secondSelector,secondSelector:action.currency};
            }
            return {...state,secondSelector:action.currency};
        }
        case 'CLICK_ARROW':{
            let caches = state.mainSelector;
            return {...state,mainSelector:state.secondSelector,secondSelector:caches};
        }

        default:
            return state;
    }
}