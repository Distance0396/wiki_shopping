import request from '@/utils/request'
// 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
/**
 * captchaCode
 * 图形验证码
 * captchaKey
 * 图形验证码key
 * mobile
 * 接收验证码手机
 */
export const getSms = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  },
  {
    headers: {
      platform: 'H5'
    }
  })
}
// 登陆
export const login = (smsCode, mobile) => {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  },
  {
    headers: {
      platform: 'H5'
    }
  })
}
