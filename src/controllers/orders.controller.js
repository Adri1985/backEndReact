import Order from "../DAO/mongo/orders.mongo.js";
import User from "../DAO/mongo/users.mongo.js";
import Store from "../DAO/mongo/stores.mongo.js";
import Cart from "../DAO/mongo/carts.mongo.js";
import mongoose from "mongoose";

const userService = new User();
const orderService = new Order();
const storeService = new Store();
const cartService = new Cart();



export const getOrders = async (req, res) => {
  const result = await orderService.get();
  if (!result)
    return res
      .status(500)
      .send({ status: "error", error: "error getting orders" });
  res.json({ status: succes, result: { result } });
};

export const getOrderByID = async (req, res) => {
  const { oid } = req.params;

  const result = await orderService.getOneByID(oid);
  if (!result)
    return res
      .status(500)
      .send({ status: "error", error: "error getting order" });

  res.json({ status: succes, result: { result } });
};

export const createOrder = async (req, res) => {
  // asi va a venir la orden del body
  // {"user":"641e3059fc08bcffaf3f7eea",
  // "store":"641fcb0711da07bac4708d41",
  // "products": [{"_id":"641dec1d396d5837a95ba21b","quantity":3,
  // "precio":100}]}
  
  console.log("BODY", req.body.orden)
  const { user: uid, store: sid, products } = req.body.orden;
  const user = await userService.getOneByID(uid);
  const store = await storeService.getOneByID(sid);
  let suma = 0;
  const finalOrder = [];
  let storeProducts = [];
  let productAux ={}
  let returnCartProducts =[]
  //const return
  console.log("products de body", products)

  for (let i = 0; i < products.length; i++) {
    let productStore = store.products.find(
      (prod) => prod.product.toString() == products[i]._id
    );
    console.log("productStore", productStore)
    if (productStore) {
      // encontro el producto en stock
      if (productStore.quantity >= products[i].quantity) {
        console.log("hay stock")
        productStore.quantity -= products[i].quantity;
        suma += products[i].precio * products[i].quantity;
        console.log("product en i", products[i]);
        finalOrder.push(products[i]);
        console.log("final order dentro del loop", finalOrder)
      } else {
        console.log("no hay stock", productStore)
        //no alcanza pero genera la orden con lo que hay
        returnCartProducts.push({product: products[i]._id,
            quantity: products[i].quantity-productStore.quantity})
        suma += products[i].precio * productStore.quantity;
        products[i].quantity -= productStore.quantity;
        productStore.quantity = 0; //queda sin stock
        finalOrder.push(products[i]);
      }
    }

    const index = store.products.findIndex(
      (el) => el.product == productStore.product
    );

    store.products[index] = productStore;
  }

  //lista de los productos del Store
  const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);
  const order = {
    number: orderNumber,
    store: sid,
    status: "PENDING",
    products: finalOrder,
    totalPrice: suma,
  };

  console.log("order", order)
  const result = await orderService.create(order);
  console.log("result", result._id)
  console.log("user", user)
  user.orders.push(result._id);
  console.log("user", user)
  await userService.updateUser(user._id, user.orders);

  await storeService.updateStore(store._id, store);

  
  
  cartService.updateOne(user.cart, {products:returnCartProducts})

  console.log("store after", store)

  console.log("cart user", user.cart)
  

  res.json({ status: "succes", cart: { returnCartProducts }, orderID:result._id}); // devuelve un objeto con la estructura del carrito con lo que no tuvo stock
};

export const resolveOrder = async (req, res) => {
  const { resolve } = req.query;
  const { oid } = req.params;
  const order = await orderService.getOneByID(oid);
  order.status = resolve;
  const result = await orderService.updateOne(order._id, order);

  res.send({ status: succes, result: {} });
  res.json({ status: succes, result: { result } });
};
