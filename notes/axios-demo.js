// import axios from "axios";
const axios = require("axios");

async function main() {
    // const response = await axios.get("https://dummyjson.com/products")
    // const responseOne = await axios.post("https://dummyjson.com/products/add", {
        // title: 'BMW Pencil',
    // },z);

    // Path Parameter
    // Body
    // Query
    const responseTwo = await axios.get("https://dummyjson.com/products/search",{
        params: {
            q: "iPhone"
        },
        headers: {
            Authentication: ""
        }
    });
    console.log(responseTwo.data);
}

main();