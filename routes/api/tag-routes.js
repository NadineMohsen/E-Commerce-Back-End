const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[
      {//include prroduct 
        model:Product,
        attributes:['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbTag => res.json(dbTag))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id:req.params.id
    },
    include:[
      {
        model:Product,
        attributes:['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbTag => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with the requested id'}); 
      return; 
    }
    res.json(dbTag)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTag => res.json(dbTag))
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{
      id:req.params.id
    },
  })
  .then(dbTagData => {
    if (!dbTagData[0]) {
        res.status(404).json({ message: 'No tag found with the requested id'});
        return;
    }
    //send data
    res.json(dbTagData);
    })
    //catch err
  .catch(err => {
    console.log(err); 
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    },
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
