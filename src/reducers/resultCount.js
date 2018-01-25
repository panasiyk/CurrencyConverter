export default function resultCount(state = 0,action) {
    switch (action.type){
        case 'COUNT_OF_MONEY':{
            return action.money;
        }
        default:
            return state;
    }
};

