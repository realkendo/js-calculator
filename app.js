(()=>{
    let screen = document.querySelector(".screen");
    let but = document.querySelectorAll(".btn");
    let equal = document.querySelector(".btn-equal");
    let clear = document.querySelector(".btn-clear");

    but.forEach((button)=>{
        button.addEventListener("click", (e)=>{
            let value = e.target.dataset.num;
           screen.value += value;
        });
    });

    equal.addEventListener("click",(e)=>{
        if(screen.value === ""){
            screen.value = '';

        }else{
            let answer = eval(screen.value);
            screen.value = answer;
        }
    })

    clear.addEventListener("click",(e)=>{
        screen.value = "";
    })

})();

 calculateExpression = (expression) =>{
    // Remove any whitespaces from the expression
    expression = expression.replace(/\s+/g, '');

    // Define operator precedence
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '(': 3,
      ')': 3
    }

    // Helper functions
    function applyOperation(operators, values){
      const operator = operators.pop();
      const b = values.pop();
      const a = values.pop();

      switch (operator) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return a / b;
      }
    }

    function evaluateExpression(tokens) {
      const operators = [];
      const values = [];

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (!isNaN(token)) {
          values.push(parseFloat(token));
        } else if (token === '(') {
          operators.push(token);
        } else if (token === ')') {
          while (operators.length > 0 && operators[operators.length - 1] !== '(') {
            const result = applyOperation(operators, values);
            values.push(result);
          }

          operators.pop(); // Discard the '('
        } else if (Math.hasOwnProperty(token)) {
          operators.push(token);
        } else {
          while (
            operators.length > 0 &&
            precedence[token] <= precedence[operators[operators.length - 1]]
          ) {
            const result = applyOperation(operators, values);
            values.push(result);
          }

          operators.push(token);
        }
      }

      while (operators.length > 0) {
        const result = applyOperation(operators, values);
        values.push(result);
      }

      return values.pop();
    }

    // Tokenize the expression
    const tokens = expression.split(/([\+\-\*\/\(\)])/).filter(token => token !== '');

    // Evaluate the expression
    const result = evaluateExpression(tokens);

    return result;
  };

 

console.log("done")