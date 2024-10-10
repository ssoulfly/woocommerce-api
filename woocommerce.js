const request = require("./request");
const Product = require("./models/Product");

const getProducts = async () => {
  const products = await request.get(`/products`).then((res) => res.data);
  // data renew
  return products;
};

const getOrders = async () => {
  const orders = await request.get(`/orders`).then((res) => res.data);
  // data renew
  return orders;
};

const deleteOrder = async (orderId) => {
  const orders = await request
    .delete(`/orders/${orderId}`)
    .then((res) => res.data);
  // data renew
  return orders;
};

module.exports.start = async () => {
  console.log("Timer started");
  const products = await Product.find({});
  const productMap = products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});

  setInterval(async () => {
    const wcProducts = await getProducts();
    const instertMany = [];
    for (const product of wcProducts) {
      productMap[product.id] = product;
      if (!productMap[product.id]) {
        instertMany.push(product);
        console.log("new product registed");
      } else {
        Product.updateOne({ id: product.id }, product);
        console.log(" product updated");
      }
    }
    Product.insertMany(instertMany);
  }, 1000 * 60 * 30);
};

module.exports.getProducts = getProducts;
module.exports.getOrders = getOrders;
module.exports.deleteOrder = deleteOrder;
