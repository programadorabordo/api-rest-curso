const ProductRepository = require('../repositories/products');

const transformer = product => ({
  type: 'products',
  id: product.id,
  attributes: {
    name: product.name,
    price: product.price,
  },
  links: {
    self: `/api/v1/products/${product.id}`
  }
});

const getAll = async () => {
  const products = await ProductRepository.getAll();
  return { data: products.map(transformer) };
};

const find = async (req) => {
  const product = await ProductRepository.find(req.params.id);
  return { data: transformer(product) };
};

const save = async (req, h) => {
  const product = await ProductRepository.save(req.payload);

  return h.response(transformer(product)).code(201);
};

const remove = async (req, h) => {
  await ProductRepository.remove(req.params.id);
  return h.response().code(204);
}

module.exports = {
  getAll,
  save,
  remove,
  find
};