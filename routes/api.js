import express from "express";
const router = express.Router();
import * as UserController from "../app/controllers/UserController.js";
import * as BrandController from "../app/controllers/BrandController.js";
import * as ProductController from "../app/controllers/ProductController.js";
import * as CategoryController from "../app/controllers/CategoryController.js";
import * as CartListController from "../app/controllers/CartListController.js";
import * as InvoiceController from "../app/controllers/InvoiceController.js";
import * as WishListController from "../app/controllers/WishlistController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import {isAdmin, isCustomer} from "../app/middlewares/RoleMiddleware.js";


// ==================== PUBLIC ROUTES ====================
// Users - Authentication (No Auth Required)
router.post("/Login", UserController.Login)
router.post("/VerifyLogin", UserController.VerifyLogin)

// Brands - Public
router.get("/BrandList", BrandController.BrandList)

// Categories - Public
router.get("/CategoryList", CategoryController.CategoryList)

// Product - Public (Browsing)
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory)
router.get("/ProductListBySlider", ProductController.ProductListBySlider)
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark)
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand)
router.get("/ProductDetailsID/:ProductID", ProductController.ProductDetailsID)
router.get("/ProductListByKeyword/:keyword", ProductController.ProductListByKeyword)
router.get("/ProductReviewListByID/:ProductID", ProductController.ProductReviewListByID)


// ==================== ADMIN ONLY ROUTES ====================
// Product Management (Admin Only)
router.post("/CreateProduct", AuthMiddleware, isAdmin, ProductController.CreateProduct)
router.post("/UpdateProduct/:id", AuthMiddleware, isAdmin, ProductController.UpdateProduct)
router.delete("/DeleteProduct/:id", AuthMiddleware, isAdmin, ProductController.DeleteProduct)
router.post("/UpdateStock/:id", AuthMiddleware, isAdmin, ProductController.UpdateStock)


// ==================== CUSTOMER ONLY ROUTES ====================
// User Profile (Customer)
router.post("/CreateUserProfile", AuthMiddleware, isCustomer, UserController.CreateUserProfile)
router.post("/UpdateUserProfile", AuthMiddleware, isCustomer, UserController.UpdateUserProfile)
router.get("/ReadUserProfile", AuthMiddleware, isCustomer, UserController.ReadUserProfile)

// Cart (Customer Only)
router.post("/CreateCart", AuthMiddleware, isCustomer, CartListController.CreateCart)
router.post("/UpdateCart", AuthMiddleware, isCustomer, CartListController.UpdateCart)
router.get("/ReadCartList", AuthMiddleware, isCustomer, CartListController.ReadCartList)
router.post("/RemoveCart", AuthMiddleware, isCustomer, CartListController.RemoveCart)

// Review (Customer Only)
router.post("/CreateProductReview", AuthMiddleware, isCustomer, UserController.CreateUserReview)
router.post("/UpdateProductReview", AuthMiddleware, isCustomer, UserController.UpdateUserReview)

// Wishlist (Customer Only)
router.post("/CreateWish", AuthMiddleware, isCustomer, WishListController.CreateWish)
router.get("/ReadWishList", AuthMiddleware, isCustomer, WishListController.ReadWishList)
router.post("/RemoveWish", AuthMiddleware, isCustomer, WishListController.RemoveWish)

// Invoice & Orders (Customer Only)
router.post("/CreateInvoice", AuthMiddleware, isCustomer, InvoiceController.CreateInvoice)
router.get("/InvoiceList", AuthMiddleware, isCustomer, InvoiceController.InvoiceList)
router.get("/InvoiceProductList/:InvoiceID", AuthMiddleware, isCustomer, InvoiceController.InvoiceProductList)

// Payment Callbacks
router.post("/PaymentSuccessful/:trxID", InvoiceController.PaymentSuccess)
router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail)
router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel)
router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN)



export default router;