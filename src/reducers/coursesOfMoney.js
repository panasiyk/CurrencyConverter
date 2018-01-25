export default function coursesOfMoney(state = {exchangeRate:{},isLoaded: false,error:false}, action) {
    switch (action.type){
        case 'GET_FETCH':{
            console.log(action.json);
            return {...state,exchangeRate:action.json,isLoaded:action.isLoaded};
        }
        default:
            return state;
    }
}