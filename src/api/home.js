import request from '@/utils/request'

export const getHomeDate = () => {
  return request.get('/page/detail', {
    pageId: '0'
  })
}
