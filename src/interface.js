
const host = 'http://www.bensonChen.cn/app/api/';

// 获取轮播图
export const findAll = function () {
  const URL = 'carouselFigure/findAll';
  const API = host + URL;
  return API;
};
// 获取轮播图
export const fimgadd = function () {
  const URL = 'carouselFigure/add';
  const API = host + URL;
  return API;
};
// 删除轮播图
export const fimgdelete = function () {
  const URL = 'carouselFigure/delete?id=';
  const API = host + URL;
  return API;
};
// 首页商品列表
export const indePr = function () {
  const URL = 'buyer/product/list/type';
  const API = host + URL;
  return API;
};
// 获取商品列表
export const list = function () {
  const URL = 'buyer/product/list';
  const API = host + URL;
  return API;
};
// 获取商品分类列表
export const categoryType = function () {
  const URL = 'buyer/product/list/categoryType';
  const API = host + URL;
  return API;
};
// 获取商品分类列表2
export const productlistType = function () {
  const URL = 'seller/product/listType';
  const API = host + URL;
  return API;
};
// 获取商品列表
export const productlist = function () {
  const URL = 'seller/product/list';
  const API = host + URL;
  return API;
};
// 获取商品详情
export const detail = function () {
  const URL = 'seller/product/detail?productId=';
  const API = host + URL;
  return API;
};
// save商品
export const productsave = function () {
  const URL = 'seller/product/save';
  const API = host + URL;
  return API;
};
// 查询类型
export const listType = function () {
  const URL = 'navigationMenu/findAll?status=0';
  const API = host + URL;
  return API;
};
// 查询分类菜单
export const navigationMenuList = function () {
  const URL = 'navigationMenu/findAll?status=';
  const API = host + URL;
  return API;
};
// 上传图片
export const uploadImg = function () {
  const URL = 'base/uploadImg';
  const API = host + URL;
  return API;
};
// 下架
export const off_sale = function () {
  const URL = 'seller/product/off_sale';
  const API = host + URL;
  return API;
};
// 上架
export const on_sale = function () {
  const URL = 'seller/product/on_sale';
  const API = host + URL;
  return API;
};
// 订单列表
export const orderList = function () {
  const URL = 'buyer/order/list';
  const API = host + URL;
  return API;
};
// 商品评论列表
export const findProductFrom = function () {
  const URL = 'comment/findProductFrom?processId=';
  const API = host + URL;
  return API;
};
// 查询用户所有收货地址
export const addressfindAll = function () {
  const URL = 'receivingAddress/findAll';
  const API = host + URL;
  return API;
};
// 设置默认收货地址 (1默认)
export const on_default = function () {
  const URL = 'receivingAddress/on_default?addressId=';
  const API = host + URL;
  return API;
};
// 添加收货地址
export const receivingAddressAdd = function () {
  const URL = 'receivingAddress/add';
  const API = host + URL;
  return API;
};
// 添加收货地址
export const receivingAddressdelete = function () {
  const URL = 'receivingAddress/delete';
  const API = host + URL;
  return API;
};
// 购物车列表
export const cartList = function () {
  const URL = 'buyer/cart/list';
  const API = host + URL;
  return API;
};
// 添加购物车
export const shopping = function () {
  const URL = 'buyer/cart/shopping';
  const API = host + URL;
  return API;
};
// 购物车列表删除商品
export const cardelById = function () {
  const URL = 'buyer/cart/delById';
  const API = host + URL;
  return API;
};
// 支付
export const createorder = function () {
  const URL = 'buyer/order/create';
  const API = host + URL;
  return API;
};
// 用户订单
export const customerlist = function () {
  const URL = 'buyer/order/customerlist';
  const API = host + URL;
  return API;
};
// 发货
export const expressController = function () {
  const URL = 'expressController/create';
  const API = host + URL;
  return API;
};


