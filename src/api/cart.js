import request from '@/utils/request'

// 添加商品到购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 购物车商品更新
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const clearCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
