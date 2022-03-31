const router = require('express').Router();
const { Category, Product } = require('../../models');

// categories 
router.get('/', (req, res) => {
  // find all the categories
  Category.findAll({
    //include products
    include:[
      {
        model:Product,
        attributes:['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  //find one category by its id
    Category.findOne({
      //find by id
    where:{
      id:req.params.id
    },
    //include products
    include:[
      {
        model:Product,
        attributes:['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'No category found with the requested id'}); 
      return; 
    }
    res.json(dbCategory)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  //give it a name
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  .then(dbCategory => {
    if (!dbCategory[0]) {
        res.status(404).json({ message: 'No category found with the requested id'});
        return;
    }
    res.json(dbCategory);
    })
  .catch(err => {
    console.log(err); 
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(deleteSuccessful => {
    if (!deleteSuccessful) {
        res.status(404).json({ message: 'No category found with the requested id'});
        return;
    }
    res.status(204).send();
  })
  .catch(err => {
    console.log(err); 
    res.status(500).json(err);
  });
});

module.exports = router;
