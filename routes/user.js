const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// router.get("/verified", (req, res, next) => {
//   console.log(req.user.id);
//   res.send("User Verified");
// });

// router.get('/cart', userController.getCart);

// router.get('/wishlist', userController.getWishlist);
// //send albumId through req body
// router.post('/cart', userController.postCartItem);

// router.delete('/cart-delete-item', userController.deleteCartItem);
// // send albumId
// router.post('/wishlist', userController.postWishlistItem);

// router.delete('/wishlist-delete-item', userController.deleteWishlistItem);

//modify cart by qty?
//No wishlist remove option?
module.exports = router;
