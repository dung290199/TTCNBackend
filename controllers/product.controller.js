const { getPagination } = require('../middlewares/pagination.middleware');
const Product = require('../models/product.model');

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
        await product.remove();
        return res.status(200).send({ msg: "Deleted successfully!" });
    }
    return res.status(404).send({ msg: "Product not found!" });
}

exports.createReview = async (req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
        const review = {
            "name": req.body.name,
            "rating": req.body.rating,
            "comment": req.body.comment,
        }

        product.reviews.push(review);
        product.rating = product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length;

        const updatedProduct = await product.save();

        return res.status(200).send({
            msg: "Review saved successfully!", 
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1] 
        });
    }
    return res.status(404).send({ msg: "Product not found!" });
}

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.price = req.body.price;
        product.category = req.body.category;
        product.description = req.body.description;
        product.rating = req.body.rating;
        product.numReviews = req.body.numReviews;
        product.reviews = req.body.reviews;

        const newProduct = await product.save();
        return res
                .status(200)
                .send({ msg: "Update product successfully!", data: newProduct });
    }

    return res.status(500).send({ msg: "Error in updating product" });
}

exports.createProduct = async (req, res) => {

    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        reviews: req.body.reviews,
    });
    
    const newProduct = await product.save();

    if (newProduct){
        return res
                .send({
                    name: newProduct.name,
                    image: newProduct.image,
                    brand: newProduct.brand,
                    price: newProduct.price,
                    category: newProduct.category,
                    description: newProduct.description,
                    rating: newProduct.rating,
                    numReviews: newProduct.numReviews,
                    reviews: newProduct.reviews,
                });
    }

    return res.status(401).send({msg: 'Invalid product data!'});
}

exports.getProductById = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });

    if (product){
        return res.send(product);
    }

    return res.status(404).send({msg: 'Product not found!'});
}

exports.getAllProducts = async (req, res) => {

    const category = req.query.category ? {category : req.query.category} : {};
    const searchKeyword = req.query.searchKeyword 
                            ? {
                                name: {
                                    $regex: searchKeyword,
                                    $options: 'i',
                                }
                            }
                            : {};
    
    const sortOrder = req.query.sortOrder
                            ? req.query.sortOrder === 'lowest'
                                ? { price: 1 }
                                : { price: -1 }
                            : { _id: -1 };

    const page = req.query.page ? {page: req.query.page} : 0;
    let { limit, offset } = getPagination(page, 12);

    const products = await Product.find({...category, ...searchKeyword}).sort(sortOrder);
    res.send(products);
    // Product.find({ ...category, ...searchKeyword })
    //         .sort( sortOrder )
    //         .skip(offset)
    //         .limit(limit)
    //         .exec((err, doc) => {
    //             if (err) {
    //                 return res.send(err);
    //             }
    //             return res.send({msg: "get it!!!", data: {
    //                 page: page,
    //                 limitCount: limit,
    //                 pageSize: doc.length,
    //                 products: doc}
    //             });
    //         });
}