import request from '@/utils/request'

// 订单结算
export const checkoutOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    query: {
      mode, // 结算模式（buyNow立即购买 cart购物车）
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      shopId: 0, // 自提门店ID
      couponId: 0, // 优惠券ID
      ...obj
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 我的订单
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
