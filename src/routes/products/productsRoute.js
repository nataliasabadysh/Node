const productAll = require('../../products/all-products.json');
const url = require('url');
// const bodyParser = require('body-parser');
// const fs = require('fs');


const productsRoute = (request, response) => {

    if (request.method === 'GET' && productAll) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(productAll));
        response.end();
    }

    else if (request.method === 'POST' && productAll) {
        request.on('data', (data) => {
            let arrLength = (productAll.length) - 1;
            lastArr = productAll[arrLength];
            let today = Date.now();
            let currDate = today.toString();


            // helper
            let arrTest = [
                "name", "description", "price",
                "currency", "creatorId", "categories"
            ];
            let reqData = JSON.parse(data);

            let excessiveArr = [];
            for (let key in reqData) {
                if (!(arrTest.includes(key) &&
                    (reqData[key].length > 0 || typeof (reqData[key]) == "number"))) {
                    excessiveArr.push(key);
                    delete reqData[key];
                }
            }
            let noFound = arrTest.filter(elem => !(Object.keys(reqData).includes(elem)));
            //end helper

            console.log(noFound.length);
            if (noFound.length) {
                let warning = noFound.join(',').concat(", missing");
                let warnnigMes = {
                    "error": warning
                };
                response.writeHead(200, {
                    "Content-Type": "application/json"
                });
                response.write(JSON.stringify(warnnigMes));
                response.end();
            } else {
                let newProduct = Object.assign({},
                    { id: ++lastArr.id}, {sku: ++lastArr.sku},
                    { created: Date.now() },
                    { modified: Date.now() },
                    JSON.parse(data));

                productAll.push(newProduct);
                response.writeHead(200, {
                    "Content-Type": "application/json"
                });
                response.write(JSON.stringify(newProduct));
                response.end();
            }
        });
    }


    else {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(productAll));
        response.end();
    }
};

module.exports = productsRoute;