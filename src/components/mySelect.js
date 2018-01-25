import React from 'react';

const Myselect = ({value,change}) =>(
     <select className={'mainSelect'} value={value} onChange={change}>
         <option value={'UAH'}>UAH</option>
         <option value={'USD'}>USD</option>
         <option value={'EUR'}>EUR</option>
         <option value={'RUR'}>RUR</option>
     </select>
 );

 export default Myselect;