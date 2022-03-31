// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category,{
  foreignKey:'category_id',
  onDelete:'SET NULL'
});
// Category have many Products
Category.hasMany(Product,{
  foreignKey:'category_id'
})

// Tag belong to many products
Tag.belongsToMany(Product,{
  through:ProductTag,
  foreignKey:'tag_id'
});

// Product belong to a tag
Product.belongsToMany(Tag,{
  through:ProductTag,
  foreignKey:'product_id'
});

//module exports
module.exports = {
  Category,
  Tag,
  ProductTag,
  Product,
};
