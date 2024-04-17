import request from '@/utils/request'

export const getCategory = () => {
  return request.get('/category/list')
}
