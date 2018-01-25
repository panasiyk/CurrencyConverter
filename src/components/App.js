import React, { Component } from 'react';
import '../App.css';
import {connect} from "react-redux";
import Loading from 'react-loading-animation';
import {
    clickArrow, clickBuy, clickSale, countOfMoney, getExchangeRate, mainSelectorChange,
    secondSelectorChange
} from "../actions/firstAction";

import Myselect from "./mySelect"

class App extends Component {
  constructor(props){
    super(props);
    this.inputChange = this.inputChange.bind(this);
    this.exchangeRate = this.exchangeRate.bind(this);
    this.total = this.total.bind(this);
  }

  inputChange(event){
      this.props.onInputChange(event.target.value)
  }
  componentDidMount(){
    this.props.getExchangeRate();
  }

  selectedCurrency(selectedCurrency){
      let i = this.props.coursesOfMoney.exchangeRate.length;
      while (i--) {
          if (this.props.coursesOfMoney.exchangeRate[i].ccy === selectedCurrency) {
              return i;
          }
      }
  }

  exchangeRate(){
      let _this = this;
      let exchangeRate = _this.props.coursesOfMoney.exchangeRate;
      if(_this.props.mainSelector !== 'UAH') {
          if (_this.props.secondSelector === 'UAH'){
              if(_this.props.isBuy) return exchangeRate[_this.selectedCurrency(_this.props.mainSelector)].sale;
              else if (_this.props.isSale) return exchangeRate[_this.selectedCurrency(_this.props.mainSelector)].buy;
              else return 0
          }
          else {
              if(_this.props.isBuy) {
                  return (exchangeRate[_this.selectedCurrency(_this.props.mainSelector)].sale/
                      exchangeRate[_this.selectedCurrency(_this.props.secondSelector)].buy).toFixed(5);
              }
              else if (_this.props.isSale){
                  return (exchangeRate[_this.selectedCurrency(_this.props.mainSelector)].buy/
                  exchangeRate[_this.selectedCurrency(_this.props.secondSelector)].sale).toFixed(5);
              }
              else return 0
          }
      }
      else {
          if(_this.props.isBuy) return (1/exchangeRate[_this.selectedCurrency(_this.props.secondSelector)].buy).toFixed(5);
          else if (_this.props.isSale) return(1/exchangeRate[_this.selectedCurrency(_this.props.secondSelector)].sale).toFixed(5);
          else return 0;
      }
  }
  total(){
      let answer = this.exchangeRate()*this.props.resultCount;
      if (answer % 2 !== 0){
          return answer.toFixed(3)
      }
      return answer;
  }


  render() {

    const { error, isLoaded } = this.props.coursesOfMoney;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loading/>;
    } else {
        return (
            <div className={'main'}>
                <p className={'currency-converter'}>Конвертер валют</p>
                <p className={'want'}>Я хочу</p>
                <div className={'buy'} onClick={this.props.clickBuy}
                     style={{background: (this.props.isBuy) ? 'red' : 'none'}}>Купить
                </div>
                <div className={'sell'} onClick={this.props.clickSale}
                     style={{background: (this.props.isSale) ? 'red' : 'none'}}>Продать
                </div>
                <input type='number' onKeyUp={this.inputChange}/>
                <Myselect value={this.props.mainSelector} change={this.props.mainSelectorChange}/>

                <div className={'arrow'} onClick={this.props.clickArrow}>{"↔"}</div>
                <Myselect value={this.props.secondSelector} change={this.props.secondSelectorChange}/>
                <div className={'listOfCost'}>
                    <div className={'exchangeRate'}>Курс обмена Приват банка</div>
                    <div className={'sum'}>Сумма,</div>
                    <div className={'count'}>
                        <div className={'firstCount'}>{this.exchangeRate()}</div>
                        <div className={'fullCount'}>{this.total()}</div>
                    </div>
                </div>
            </div>
        );
    }
  }
}

function mapStateToProps(state) {
    return{
        resultCount: state.resultCount,
        isBuy: state.buyOrSell.isBuy,
        isSale: state.buyOrSell.isSale,
        mainSelector:state.workWithSelectors.mainSelector,
        secondSelector:state.workWithSelectors.secondSelector,
        coursesOfMoney: state.coursesOfMoney
    }
}
function mapDispatchToProps(dispatch) {
    return{
        onInputChange: (money) => dispatch(countOfMoney(money)),
        clickBuy: () => dispatch(clickBuy()),
        clickSale: () => dispatch(clickSale()),
        clickArrow: () => dispatch(clickArrow()),
        mainSelectorChange: (event) => dispatch(mainSelectorChange(event.target.value)),
        secondSelectorChange: (event) => dispatch(secondSelectorChange(event.target.value)),
        getExchangeRate: () => dispatch(getExchangeRate())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
