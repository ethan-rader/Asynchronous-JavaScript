/*
*   @Description:   This piece of code is used to explain asynchronus JavaScript
*                   and how to handle promises. To run the code, navigate to
*                   it in your directory and run it via the terminal with 
*                   'node testingAsync.js'. Note that the await decorator is only
*                   available within functions decorated with async. Also, note
*                   that using Promise.then() is functionally different than
*                   await due to the nature of callbacks. A nested Promise.then()
*                   within a Promise.then() is functionally similar to an await
*                   call followed by an await call. 
*   @Developed:     08/05/2022 - ER
*/

// Auto-runs the code on file load.
run();

/*
*   This method is the running block. It uses synchronus methods to assign a random 
*   multiplier number to the returned values from various asynchronus methods.
*/
async function run() {
    console.log('running...');
    let random = Math.floor(Math.random() * 11);
    console.log('total will be multipled ' + random + ' times!');
    let total = await getTotal();
    console.log('sub total is: ' + total);
    console.log('validate this result by adding the return vals together and comparing with the sub total')
    console.log('multiplied final total is: ' + (total * random));
}

/*
*   This method handles the various asynchronus calls and adds the returns to one
*   total. Note that in order to process these asynchronus methods, they must
*   return a Promise.
*/
async function getTotal() {
    try {
        /*
            This async request runs concurrently with the other async methods.
            The code will not wait to assign val1 before moving onto the next line.
            If there's no return by the time the others finish, there will likely
            be an undefined error (NaN) when combining the total. 
            To prove, set the return time longer than the other two timeouts combined.
        */
        let val1;
        getVal1().then(res => {
            val1 = res;
            console.log('val1 response value: ' + val1);
        })
        .catch(err => {
            console.log(err);
        })
        // This will be undefined at runtime since the value is set asynchronusly in
        // the Promise.then(). The .then() functions as the callback and will set
        // val1 whenever it gets a return.
        console.log('val1 response value: ' + val1);

        // await forces the code to receive a value for val2 before moving onto
        // the next line
        let val2 = await getVal2();
        console.log('val2 response value: ' + val2);

        let val3 = await getVal3();
        console.log('val3 response value: ' + val3);

        // this will wait until we have the return from getVal3, but not getVal1
        let tot = val1 + val2 + val3;
        return new Promise(function(resolve) {
            resolve(tot);
        });
    }
    catch(error) {
        console.log(error)
    }
}

/*
*   Experiment with the timeout of this method to prove that it runs cuncurrently  
*   with the other methods
*/
async function getVal1() {
    return new Promise(function(resolve) {
        setTimeout(function(){resolve(Math.floor(Math.random() * 11))}, 3000)
    })
}

async function getVal2() {
    return new Promise(function(resolve) {
        setTimeout(function(){resolve(Math.floor(Math.random() * 11))}, 2000)
    })
}

async function getVal3() {
    return new Promise(function(resolve) {
        setTimeout(function(){resolve(Math.floor(Math.random() * 11))}, 3000)
    })
}