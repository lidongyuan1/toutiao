/* eslint-disable space-before-function-paren */
// 文章相关的api接口，都封装在这个模块中
import resquest from '@/utils/resquest'
// 向外按需导出一个API函数
export const getArticleList = function (_page, _limit) {
  return resquest.get('/articles', {
    // 请求参数
    params: {
      _page,
      _limit
    }
  })
}
