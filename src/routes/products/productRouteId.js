const productAll = require('../../products/all-products.json');
const url = require('url');

productRouteId = (request,response) =>{
    let routeId = request.url.split("/")[2];
    let index = null;
    console.log(productAll);
    productAll.forEach((item, i) => {
        if (item.id === routeId) index = i;
    });
    if(request.method === "GET"){
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(productAll[index]));
        response.end();
    }
    if(request.method === "PUT"){
        let arrTest = [
            "name", "description", "price",
            "currency", "creatorId", "categories"
        ];
        let excessiveArr =[];
        request.on('data', (data) => {
            arr = JSON.parse(data);
            for (let key in arr) {
                if (!(arrTest.includes(key) && (arr[key].length > 0 || typeof (arr[key]) == "number"))) {
                    excessiveArr.push(key);
                    delete arr[key];
                }
            }
            productAll[index] = Object.assign(productAll[index], {"modified": Date.now()}, arr);
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(productAll[index]));
            response.end();
        });
    }
};

module.exports = productRouteId;