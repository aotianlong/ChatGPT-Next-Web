/*
 * 写一个从querystring获取名为model的参数，设置默认模型
 */

const modelNameKey = 'MBM_CARD_MEMBER'

export function computeIsCardMember(callback: any = null) {
  const params = new URLSearchParams(window.location.search)
  const version = params.get('version')
  if (version) {
    // 从openai 主页过来的
    const isCardMember = params.get('active') === 'true'
    localStorage.setItem(modelNameKey, JSON.stringify(isCardMember))
    return isCardMember
  }
  return JSON.parse(localStorage.getItem(modelNameKey) || 'false')
}
