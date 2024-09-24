const express=require('express');
const router=express.Router();
const wrapAsync=require('../utlis/wrapAsync');
const {isLoggedIn,validateListing,isOwner,ensureAuthenticated}=require('../middleware')
const listingController=require('../controllers/listings');
const multer  = require('multer')
const {storage}=require('../cloudConfig')
const upload = multer({ storage });


//index and create routes

router.route('/')
      .get(wrapAsync(listingController.index))
      .post(ensureAuthenticated,isLoggedIn, validateListing ,upload.single('listing[image]'),wrapAsync(listingController.createListing))
      

// //index route
// router.get('/',wrapAsync(listingController.index));
// //Create Route
// router.post('/',isLoggedIn, validateListing ,wrapAsync(listingController.createListing));

//new route
router.get('/new',ensureAuthenticated, isLoggedIn,listingController.renderNewForm);
router.get('/category/:category',listingController.categoryListings)

//show, update and delete routes
router.route('/:id')
      .get(wrapAsync(listingController.showListing))
      .put(ensureAuthenticated,isOwner ,isLoggedIn,validateListing,upload.single('listing[image]') ,wrapAsync(listingController.updateListing))
      .delete(ensureAuthenticated,isOwner, isLoggedIn,wrapAsync(listingController.destroyListing))

// //Show Route
// router.get('/:id',wrapAsync(listingController.showListing));
// //Update Route
// router.put('/:id', isOwner ,isLoggedIn,validateListing ,wrapAsync(listingController.updateListing));
// //Delete Route
// router.delete('/:id',isOwner, isLoggedIn,wrapAsync(listingController.destroyListing));



//Edit Route
router.get('/:id/edit',isOwner,ensureAuthenticated, isLoggedIn,wrapAsync(listingController.renderEditForm));





module.exports=router;