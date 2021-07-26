
module.exports = {
  expressionCalculator
}


function expressionCalculator(expr) {
  if (isBracketsPaired(expr,[['(',')']])==false) {throw "ExpressionError: Brackets must be paired"};
  while (expr.search(/\d-/) != -1) {expr = expr.replace('-', ' - ')};  // fixing sticking operator to operand. to easy distinguish from negative operand

  while (expr.includes('(') || expr.includes(')') )  {  // open brackets and replace all the insides to calculated result
      let bracketsExpr = /\([^\(]+?\)/;
      let exprInBracket =  expr.match(bracketsExpr);
      expr = expr.replace(exprInBracket[0], calculateExpr(exprInBracket[0]));
  }
  out = calculateExpr(expr);  // calculated last part (or the only part) without brackets
  return out;

}   
/** 
 * Calculated expression, according to math order
 * @param {string} expr  
 * @returns {number} result 
 * */

function calculateExpr(expr) {
      const regExp = /-?\d*\.{0,1}\d+|[-+\*\/]/g;                          
      let arrExpr = expr.match(regExp) ; 
      apply('*','/', arrExpr);
      apply('+','-', arrExpr);
      let result = arrExpr.reduce((sum,item)=> item+sum );
      return result;
}

 /** 
 * Finding indexes of operator with heist priory and give it to findExpr function 
 * @param {string} oper1,  math operator which we want to apply 
 * @param {string} oper2,   math operator which we want to apply
 * 
 * */ 

function apply (oper1,oper2, arrExpr) {

  while (arrExpr.includes(oper1) || arrExpr.includes(oper2) ) {
      let index = undefined;
      if ((arrExpr.indexOf(oper1) != -1 && arrExpr.indexOf(oper1) < arrExpr.indexOf(oper2)) || arrExpr.indexOf(oper2) == -1) {index = arrExpr.indexOf(oper1)}
      if ((arrExpr.indexOf(oper2) != -1 &&  arrExpr.indexOf(oper2) < arrExpr.indexOf(oper1)) ||  arrExpr.indexOf(oper1) == -1) {index = arrExpr.indexOf(oper2)}
      findExpr(index,arrExpr);
  }
  
}

/** 
 * Finding the operands which is a refer to the operator and calculate the result
 * @param {number} i , index of operator
 * @param {array} arr, array with operators and operands and null values when we already use them.
 * 
 * */ 

function findExpr(i, arr) {
      let out = undefined;
      let index1=i-1;
      let operand1 = (arr[index1]);
      
      while (operand1==null) {
          index1--;
          operand1 = (arr[index1]);
      }

      let index2=i+1;
      let operand2 = (arr[index2]);
     
      while (operand2==null) {
          index2++;
          operand2 = (arr[index2]);
      }  
      operand1 = Number(operand1);
      operand2 = Number(operand2);

      switch (arr[i]) {
          case '*': out = operand1 * operand2; break;
          case '/': {if (operand2 === 0 ) {throw "TypeError: Division by zero."}; out = operand1 / operand2;  break;}
          case '+': out = operand1 + operand2; break;
          case '-': out = operand1 - operand2; break;
      }
  
      arr[index1] = out;
      arr[i]=null;
      arr[index2]=null;
}

/** 
 * Check if all brackets paired as showed in bracketsConfig
 * @param {string} str expression with brackets or without
 * @param {array} bracketsConfig, array when show what is open bracket and what close/.
 * @returns {boolean} true if brackets correct paired
 * */ 
function isBracketsPaired(str, bracketsConfig) {

  let openBracket = bracketsConfig.map((item)=> item[0]);
  let closeBracket = bracketsConfig.map((item)=> item[1]);
  let stackBrackets = [];
  let isCorrect = true;

  for (let index=0; index<=str.length; index++ ) {
    if (openBracket.includes(str[index])) { 
      if (closeBracket.includes(str[index])) {  
        if (closeBracket.indexOf(str[index]) === stackBrackets[stackBrackets.length-1]) {
          stackBrackets.pop() 
        } else {stackBrackets.push(openBracket.indexOf(str[index]))};
      } else {stackBrackets.push(openBracket.indexOf(str[index]))};
      continue;
      }
    if (closeBracket.includes(str[index])) {
      if (closeBracket.indexOf(str[index]) != stackBrackets.pop()) {isCorrect=false ; break;}
    }
                    
                                             
  }
  return (isCorrect && stackBrackets.length == 0); 
}




//console.log('start');

                         
         
             
