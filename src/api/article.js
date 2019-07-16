/**
 * 文章相关接口模块
 */

import request from '@/utils/request'

export const getArticles = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
