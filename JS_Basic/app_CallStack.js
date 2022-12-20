
function f1() {
    console.log('This is f1')
  
    f2()
  
    function f2() {
      console.log('This is f2')
  
      f3()
  
      function f3() {
        console.log('This is f3')
  
        console.log('f3 done')
      }
  
      console.log('f2 done')
    }
  
    console.log('f1 done')
  }
  
  f1();