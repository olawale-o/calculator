let input  = document.querySelector('#input-field');
input.value = 0
let btn  = document.querySelectorAll('.btn');
let digitsArray = [];
let action;
let equal = 0;
let p;
let q;
let done = false;
let  first  = 0
let isMinusOn = false
let inc = 0

function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y
}
function divide(x, y) {
  return x / y
}
function multiply(x, y) {
  return x * y
}
function clear() {
  input.value = 0
  digitsArray = []
  done = false
  first = 0
  equal = 0
}

function backSpace() {
  if(!done) {
    if(digitsArray.length > 1) {
      console.log("oya up")
      digitsArray.pop()

    } else if(digitsArray.length === 1) {
      digitsArray.pop()
      digitsArray.push(0)
    }

    input.value = digitsArray.join("")
    first = parseInt(input.value)
  }
  console.log(digitsArray)
}

function addDecimal() {
  if(!digitsArray.includes(".")) {
      if(digitsArray.length === 0) {
        digitsArray.push('0')
        digitsArray.push('.')
      }
      else if (digitsArray.length !== 10){
        digitsArray.push('.')
      }
      input.value = digitsArray.join("")
      first = parseFloat(input.value)

  }
  console.log(digitsArray)
}
function populateScreen(value) {
    let x =  value

    if(digitsArray.length !== 10) {

      digitsArray.push(x)
    }
    if(parseFloat(digitsArray[0]) === 0 && digitsArray.length > 1) {
        console.log("pop")
        if(!digitsArray.includes('.')){
          digitsArray.splice(0,1)
        }
    }
    input.value = digitsArray.join("")
    first  = parseFloat(input.value)

    console.log(digitsArray)
}

btn.forEach((b) => {
  b.addEventListener('click', function(e) {
    let digitOperator =  e.target.innerHTML
    if(isNaN(digitOperator)){
      const command  = digitOperator

      if(command == '+') {
        p = first
        digitsArray = []
        action = 'add'
        console.log(p)
      } else if (command == '-') {
          p = first
          digitsArray = []
          action = 'sub'
          console.log(p)
      } else if (command == '*') {
        p = first
        digitsArray = []
        action = 'multiply'
      } else if (command == '/') {
        p = first
        digitsArray = []
        action = 'divide'
        console.log(p)
      }
      else if(digitOperator == '=') {
        let second  = digitsArray.join("")
          q = second
          if (action === 'add') {

              equal =  add(parseFloat(p),parseFloat(q) );
           }
          if (action === 'sub') {

            equal = subtract(parseFloat(p),parseFloat(q));

          }
          if (action == 'divide') {

             equal = divide(parseFloat(p),parseFloat(q));

          }
          if (action === 'multiply') {
            equal = multiply(parseFloat(p),parseFloat(q))
          }

        digitsArray = []
        if(!isFinite(equal)) {
          input.value =  'Error'
        } else{
          input.value = parseFloat(parseFloat(equal).toString().substring( 0, 10))
        }
        done = true

        first = parseFloat(parseFloat(equal).toString().substring( 0, 10))
        equal = 0

        console.log(digitsArray)
      } else if(digitOperator == '%') {
        input.value =  parseFloat(input.value) / 100
        first = parseFloat(input.value)
        console.log(first)
      }else if(digitOperator == '1/x') {
        input.value =  parseFloat(parseFloat(1 / parseFloat(input.value)).toString().substring( 0, 10))
        first = parseFloat(input.value)
        console.log(first)
      }
      else if(digitOperator == 'C') {
        clear()
      } else if(digitOperator == 'CE') {
        if(done && input.value.length < 1) {
          done = false
        }
        backSpace()
      }else if(digitOperator == '.') {

        addDecimal()
      } else if(digitOperator == '+/-') {

          if(isMinusOn){
            isMinusOn = false
            digitsArray.splice(0,1)
          } else{
              isMinusOn = true
              digitsArray.unshift('-')
          }

          input.value = digitsArray.join("")
          console.log(digitsArray)

      }

    } else{
        populateScreen(digitOperator)
    }

  })
})
