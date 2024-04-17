import { changeCount, clearCart, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 更新购物车数据
    setCartList (state, newList) {
      state.cartList = newList
    },

    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },

    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async clearCart (context) {
      // 获取选中的购物车商品
      const selCartList = context.getters.selCartList
      // 将选中商品id找出放入 cartIds
      const cartIds = selCartList.map(item => item.id)
      await clearCart(cartIds)
      Toast('删除成功')
      context.dispatch('getCartAction')
    }
  },
  getters: {
    /**
     * 商品总数
     * reduce 计算数组元素累加总和
     * sum 起始值
     * item 遍历对象
     * index 下标
     */
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    /**
     * 被选中的商品
     * filter 过滤 第一个值需为回调函数，判断结果需为布尔值，true保留
     */
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    /**
     * 被选中的商品总数
     */
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    /**
     * 被选中的商品总价
     */
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
