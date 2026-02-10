import dotenv  from 'dotenv'
dotenv.config()

export const PORT=process.env.PORT
export const DATABASE=process.env.DATABASE_URL

export const JWT_KEY=process.env.JWT_SECRET
export const JWT_EXPIRE_TIME=parseInt(process.env.JWT_EXPIRE_TIME)

export const EMAIL_HOST=process.env.EMAIL_HOST
export const EMAIL_PASS=process.env.EMAIL_PASS
export const EMAIL_PORT=process.env.EMAIL_PORT
export const EMAIL_USER=process.env.EMAIL_USER
export const EMAIL_SECURITY=process.env.EMAIL_SECURITY === 'false';
export const EMAIL_UN_AUTH=process.env.EMAIL_UN_AUTH === 'false';


export const WEB_CACHE=process.env.WEB_CACHE === 'false';
export const MAX_JSON_SIZE=process.env.MAX_JSON_SIZE
export const URL_ENCODE=process.env.URL_ENCODE === 'false';

export const REQUEST_TIME=parseInt(process.env.REQUEST_TIME)
export const REQUEST_NUMBER=parseInt(process.env.REQUEST_NUMBER)


export const STORE_ID=process.env.STORE_ID;
export const STORE_PASSWORD=process.env.STORE_PASSWORD;
export const CURRENCY=process.env.CURRENCY
export const SUCCESS_URL=process.env.SUCCESS_URL;
export const FAIL_URL=process.env.FAIL_URL;
export const CANCEL_URL=process.env.CANCEL_URL;
export const INIT_URL=process.env.INIT_URL;
