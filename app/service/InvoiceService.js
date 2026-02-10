import CartModel from "../model/cartsModel.js"
import ProfileModel from "../model/profilesModel.js"
import InvoiceModel from "../model/invoicesModel.js"
import InvoiceProductModel from "../model/invoiceProductsModel.js"
import ProductModel from "../model/productsModel.js"
import mongoose from "mongoose";
const ObjectId=mongoose.Types.ObjectId;
import formData from "form-data";
import axios from "axios";


//============Step:01  Calculate total amount and vat=================


export const CreateInvoiceService = async (req) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let user_id = new ObjectId(req.headers.user_id);
        let cus_email = req.headers.email;

        //============Step:01 Get Cart Products=================
        let matchStage = { $match: { userID: user_id } };
        let JoinStageProduct = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "product"
            }
        };
        let unwindStage = { $unwind: "$product" };
        let CartProducts = await CartModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindStage
        ]).session(session);

        if (CartProducts.length === 0) {
            await session.abortTransaction();
            return { status: "error", data: "Cart is empty" };
        }

        //============Step:02 Stock Validation & Calculate Total=================
        let totalAmount = 0;

        for (const element of CartProducts) {
            const product = element.product;


            if (product.stock < element.qty) {
                await session.abortTransaction();
                return {
                    status: "error",
                    data: `Insufficient stock for "${product.title}". Available: ${product.stock}, Requested: ${element.qty}`
                };
            }


            if (product.stock - element.qty < 0) {
                await session.abortTransaction();
                return { status: "error", data: "Cannot process order. Would result in negative inventory." };
            }


            let price = product.discount ? product.discountPrice : product.price;
            totalAmount += (price * parseFloat(element.qty));
        }

        let vat = (totalAmount * 0.05);
        let payable = totalAmount + vat;

        //============Step:03 Prepare Customer Details=================
        let Profile = await ProfileModel.aggregate([matchStage]).session(session);

        if (Profile.length === 0) {
            await session.abortTransaction();
            return { status: "error", data: "User profile not found" };
        }

        let cus_details = `Name:${Profile[0]['cus_name']} , Address: ${Profile[0]['cus_add']}, Phone: ${Profile[0]['cus_phone']}`;
        let ship_details = `Name: ${Profile[0]['ship_name']}, City: ${Profile[0]["ship_city"]}, Address: ${Profile[0]['ship_add']}, Phone: ${Profile[0]['ship_phone']}`;

        //============Step:04 Transaction IDs=================
        let tran_id = Math.floor(1000000000 + Math.random() * 9000000000);
        let val_id = 0;
        let delivery_status = "pending";
        let payment_status = "pending";

        //============Step:05 Create Invoice=================
        let createInvoice = await InvoiceModel.create([{
            userID: user_id,
            payable: payable,
            cus_details: cus_details,
            ship_details: ship_details,
            tran_id: tran_id,
            val_id: val_id,
            payment_status: payment_status,
            delivery_status: delivery_status,
            total: totalAmount,
            vat: vat
        }], { session });

        let invoice_id = createInvoice[0]._id;

        //============Step:06 Create Invoice Products & Deduct Stock=================
        for (const element of CartProducts) {
            // Create invoice product
            await InvoiceProductModel.create([{
                userID: user_id,
                invoiceID: invoice_id,
                productID: element.productID,
                qty: element.qty,
                price: element.product.discount ? element.product.discountPrice : element.product.price,
                size: element.size,
                color: element.color,
            }], { session });

            await ProductModel.findByIdAndUpdate(
                element.productID,
                { $inc: { stock: -element.qty } },
                { session }
            );
        }

        //============Step:07 Remove Cart=================
        await CartModel.deleteMany({ userID: user_id }).session(session);

        //============Step:08 Commit Transaction=================
        await session.commitTransaction();

        return { status: "success", data: invoice_id };

    } catch (e) {
        await session.abortTransaction();
        return { status: "error", data: e.toString() };
    } finally {
        session.endSession();
    }
}


export const PaymentFailService = async (req) => {
    try {

    }
    catch (e) {
        return { status: "error", data: e.toString() };
    }
}

export const PaymentCancelService = async (req) => {
    try {

    }
    catch (e) {
        return { status: "error", data: e.toString() };
    }
}

export const PaymentIPNService = async (req) => {
    try {

    }
    catch (e) {
        return { status: "error", data: e.toString() };
    }
}

export const PaymentSuccessfulService = async (req) => {
    try {

    }
    catch (e) {
        return { status: "error", data: e.toString() };
    }
}

export const InvoiceListService = async (req) => {
    try {

    }
    catch (e) {
        return { status: "error", data: e.toString() };
    }
}

export const InvoiceProductListService = async (req) => {
    try {

    }
    catch (e) {
        return { status: "error", data: e.toString() };
    }
}
