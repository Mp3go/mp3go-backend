const Music = require('../models/music');
const Filter = require('../models/filter');
const User = require('../models/user');

exports.postCartItem = async function (req, res, next) {
  const userid = req.user.id;
  const productId = req.body.albumId;
  try {
    const ProductData = await Music.findById(productId);
    if (!ProductData) {
      let error = new Error('No Product Founded');
      error.statusCode = 409;
      next(error);
    } else {
      await User.findByIdAndUpdate(userid).then(async (data) => {
        if (!data) {
          let error = new Error('No User Founded');
          error.statusCode = 409;
          next(error);
          return;
        } else if (data.cart.cart_total > 0) {
          for (let i of data.cart.items) {
            if (i.product == productId) {
              let error = new Error('Item Already Added to Cart');
              error.statusCode = 401;
              next(error);
              return;
            }
          }
        }
        data.cart.items.unshift({ product: productId, qty: 1 });
        data.cart.cart_total += ProductData.price;
        data.cart.discount += ProductData.discount;
        data.cart.total += ProductData.price - ProductData.discount;
        await data.save();
        data = User.findById(userid).populate('cart.items.product').exec();
        // console.log(data.cart);
        res.status(200).json(data.cart);
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.cartqtyController = async function (req, res, next) {
  const userid = req.user.id;
  const productId = req.body.productId;
  try {
    const ProductData = await Music.findById(productId);
    if (!ProductData) {
      let error = new Error('No Product Founded');
      error.statusCode = 409;
      next(error);
    } else {
      await User.findByIdAndUpdate(userid).then(async (data) => {
        if (!data) {
          let error = new Error('No User Founded');
          error.statusCode = 401;
          next(error);
          return;
        } else if (data.cart.cart_total > 0) {
          for (let i of data.cart.items) {
            if (i.product == productId) {
              if (req.body.process == 'increment') {
                i.qty += 1;
                data.cart.cart_total += ProductData.price;
                data.cart.discount += ProductData.discount;
                data.cart.total += ProductData.price - ProductData.discount;
              } else if (req.body.process == 'decrement') {
                if (i.qty == 1) {
                  let error = new Error("Quantity Can't Be Decreased");
                  error.statusCode = 409;
                  next(error);
                  return;
                }
                i.qty -= 1;
                data.cart.cart_total -= ProductData.price;
                data.cart.discount -= ProductData.discount;
                data.cart.total -= ProductData.price - ProductData.discount;
              } else {
                let error = new Error('Invalid Parameter');
                error.statusCode = 404;
                next(error);
                return;
              }
              await data.save();
              return res.status(200).send('Quantity Changed');
            }
          }
        }
        let error = new Error('Item Was not founded in the Cart');
        error.statusCode = 401;
        next(error);
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getCart = async function (req, res, next) {
  const id = req.user.id;
  const data = await User.findById(id).populate('cart.items.product').exec();
  console.log(data.cart);
  res.status(200).json(data.cart);
};

exports.getWishlist = async function (req, res, next) {
  const id = req.user.id;
  const data = await User.findById(id) //If user is deleted?
    .populate('wishlist.items.product')
    .exec();
  if (data.wishlist.items.length == 0) {
    let error = new Error('No Product in the wishlist');
    error.statusCode = 409;
    next(error);
    return;
  }
  console.log(data.wishlist.items);
  res.status(200).json(data.wishlist.items);
};

exports.deleteCartItem = async function (req, res, next) {
  const userid = req.user.id;
  console.log(req.body.albumId);
  const productId = req.body.albumId;
  // console.log(productId );
  try {
    const ProductData = await Music.findById(productId);
    if (!ProductData) {
      let error = new Error('No Product Founded');
      error.statusCode = 409;
      next(error);
    } else {
      await User.findByIdAndUpdate(userid).then(async (data) => {
        if (!data) {
          let error = new Error('No User Founded');
          error.statusCode = 401;
          next(error);
          return;
        } else if (data.cart.cart_total != 0) {
          console.log(data.cart.items);
          for (let i of data.cart.items) {
            if (i.product == productId) {
              data.cart.cart_total -= ProductData.price * i.qty;
              data.cart.discount -= ProductData.discount * i.qty;
              data.cart.total -=
                ProductData.price * i.qty - ProductData.discount * i.qty;
              const index = data.cart.items.indexOf(i);
              data.cart.items.splice(index, 1);
              console.log(data.cart.items);
              await data.save();
              res.status(200).json(data.cart.items); //send updated cart to frontend
              return;
            }
          }
        }
        let error = new Error('Item Was not founded in the Cart');
        error.statusCode = 401;
        next(error);
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postWishlistItem = async function (req, res, next) {
  console.log(req.body);
  const userid = req.user.id;
  const productId = req.body.albumId;
  // console.log(productId);
  try {
    const ProductData = await Music.findById(productId);
    if (!ProductData) {
      let error = new Error('No Product Founded');
      error.statusCode = 401;
      next(error);
    } else {
      await User.findByIdAndUpdate(userid).then(async (data) => {
        if (!data) {
          let error = new Error('No User Founded');
          error.statusCode = 401;
          next(error);
          return;
        } else if (data.wishlist.items.length > 0) {
          for (let i of data.wishlist.items) {
            if (i.product == productId) {
              let error = new Error('Item Already Added to Wishlist');
              error.statusCode = 409;
              next(error);
              return;
            }
          }
        }
        console.log('Data added to Wishlist');
        data.wishlist.items.unshift({ product: productId });
        await data.save();
        var data = await User.findById(userid).populate(
          'wishlist.items.product'
        );
        res.status(200).json(data.wishlist.items);
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteWishlistItem = async function (req, res, next) {
  const userid = req.user.id;
  const productId = req.body.albumId;
  try {
    const ProductData = await Music.findById(productId);
    if (!ProductData) {
      let error = new Error('No Product Founded');
      error.statusCode = 409;
      next(error);
    } else {
      await User.findByIdAndUpdate(userid).then(async (data) => {
        if (!data) {
          let error = new Error('No User Founded');
          error.statusCode = 401;
          next(error);
          return;
        } else if (data.wishlist.items.length > 0) {
          for (let i of data.wishlist.items) {
            if (i.product == productId) {
              const index = data.wishlist.items.indexOf(i);
              data.wishlist.items.splice(index, 1);
              await data.save();
              res.status(200).json(data.wishlist.items);
              return;
            }
          }
        }
        let error = new Error('Item Was not founded in the Wishlist');
        error.statusCode = 401;
        next(error);
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
