export default function buyOrSell(state = {isBuy:false, isSale: false}, action) {
    switch (action.type){
        case 'CLICK_BUY':{
            return {...state,isBuy:true,isSale:false};
        }
        case 'CLICK_SALE':{
            return {...state,isBuy:false,isSale:true};
        }
        default:
            return state;
    }
}