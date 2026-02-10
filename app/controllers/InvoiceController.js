import {CreateInvoiceService} from "../service/InvoiceService.js";
import {PaymentSuccessfulService} from "../service/InvoiceService.js";
import {PaymentFailService} from "../service/InvoiceService.js";
import {PaymentCancelService} from "../service/InvoiceService.js";
import {PaymentIPNService} from "../service/InvoiceService.js";
import {InvoiceListService} from "../service/InvoiceService.js";
import {InvoiceProductListService} from "../service/InvoiceService.js";

export const CreateInvoice=async(req,res)=>{
    let result = await CreateInvoiceService(req);
    return res.json(result);
}
export const PaymentSuccess=async(req,res)=>{
    let result = await PaymentSuccessfulService(req);
    return res.redirect('http://localhost:5050/profile');
}
export const PaymentFail=async(req,res)=>{
    let result = await PaymentSuccessfulService(req);
    return res.redirect('http://localhost:5050/profile');
}
export const PaymentCancel=async(req,res)=>{
    let result = await PaymentSuccessfulService(req);
    return res.redirect('http://localhost:5050/profile');
}
export const PaymentIPN=async(req,res)=>{
    let result = await PaymentIPNService(req);
    return res.json(result);
}
export const InvoiceList=async(req,res)=>{
    let result = await InvoiceListService(req);
    return res.json(result);
}
export const InvoiceProductList=async(req,res)=>{
    let result = await InvoiceProductListService(req);
    return res.json(result);
}
