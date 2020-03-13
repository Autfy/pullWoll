const cloud = require('wx-server-sdk')
// 根据表名和query对象删除数据
exports.main = async (event, context) => {
  // 判断环境
  if (!event.env) return { errCode: -1, errMsg: '环境id为空' }
  cloud.init({
    env: event.env,
    traceUser: true
  })
  const db = cloud.database();
  let openId = event.userInfo.openId;
  let tbName = event.tbName; // 要查询的表名
  let query = event.query;  // 要查询的query条件
  // 如果openId为ture, 则把openId添加到查询条件
  if (query.openId) {
    query.openId = openId
  }
  try {
    return await db.collection(tbName).where(query).remove()
  } catch (e) {
    console.error(e)
  }
}