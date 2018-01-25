import combineReducers from "redux/es/combineReducers";
import resultCount from "./resultCount";
import buyOrSell from "./buyOrSell"
import  workWithSelectors from "./workWithSelectors"
import  coursesOfMoney from "./coursesOfMoney"

const rootReducer = combineReducers({
    resultCount,
    buyOrSell,
    workWithSelectors,
    coursesOfMoney
});

export default rootReducer