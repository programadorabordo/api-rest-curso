const ProductModel = require('../models/product');

const getAll = async () => await ProductModel.find({});

const find = async id =>  await ProductModel.findById(id);

const save = async (payload) => {
  const { name, price } = payload;

  const product = new ProductModel;
  product.name = name;
  product.price = price;

  await product.save();

  return product;
};

const remove = async id => await ProductModel.findOneAndDelete({ _id: id });

module.exports = {
  getAll,
  save,
  remove,
  find
};