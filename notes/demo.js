// function doSomethingTakesTime() {
//     return "I did it!!";
// }

// function sendRequest(callback,anotherCallback) {
// setTimeout(()=>{
//     let response = doSomethingTakesTime();
//     callback(response)
// },1500)    

// }
// console.log("Before Execute");
// sendRequest((response)=> {
//     console.log(response);
// },(response) => {

// })
// console.log("After Execute");

function sendPromise() {

    return new Promise((resolve, reject) => {
        let condition = false;
        if (condition) {
            setTimeout(() => {
                resolve("Ok, I resolved and delievred by promise")
            }, 2000);
        } else {
            reject("Sorry I coludn't");
        }
    })

}


async function main() {
    // sendPromise().then(response => {
    //     console.log(response);
    //     // when resolved
    // }).catch(error => {
    //     console.log(`Error: ${error}`)
    //     // when rejected
    // })
    try {
        let response = await sendPromise();
        console.log(response);
    } catch (error) {
        console.log(`This is the error: ${error}`);
    }

    function successHandler(response) {

    }
    function failedHandler( ) {

    }

    sendPromise.then(successHandler).catch(failedHandler)

}

main()
