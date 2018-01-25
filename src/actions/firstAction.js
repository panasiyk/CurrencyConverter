import fetch from 'isomorphic-fetch';
export const countOfMoney = (money) =>{
  return{
      type: 'COUNT_OF_MONEY',
      money
  }
};
export const clickBuy = () =>{
    return{
        type: 'CLICK_BUY'
    }
};
export const clickSale = () =>{
    return{
        type: 'CLICK_SALE'
    }
};
export const mainSelectorChange = (currency) =>{
    return{
        type: 'MAIN_SELECTOR_CHANGE',
        currency
    }
};
export const secondSelectorChange = (currency) =>{
    return{
        type: 'SECOND_SELECTOR_CHANGE',
        currency
    }
};
export const clickArrow = () =>{
    return{
        type: 'CLICK_ARROW'
    }
};

export const getExchangeRate = () => dispatch =>{
    fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
        .then(response => response.json())
        .then(json => dispatch({type: 'GET_FETCH', isLoaded: true,json}))
};