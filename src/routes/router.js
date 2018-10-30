module.exports = router;

const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');
const productsRoute = require('./products/productsRoute');
const productRouteId = require('./products/productRouteId');


const router = {
    '/products': productsRoute,
    '/products/id': productRouteId,
    '/me': mainRoute,
    '/motocycle': motocycleRoute,
    default: mainRoute
};

module.exports = router;