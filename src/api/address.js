import request from '@/utils/request'

// 收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 添加收货地址

export const addAddressList = (name, phone, region, detail) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
