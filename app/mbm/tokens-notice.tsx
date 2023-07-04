import { encode } from 'gpt-tokenizer'
import { useChatStore, useAppConfig } from "@/app/store";

const completionPrice = {
	'gpt-4': 0.12,
	'gpt-4-32k': 0.24,
	'gpt-3.5-turbo': 0.004,
}

const promptPrice = {
	'gpt-4': 0.06,
	'gpt-4-32k': 0.12,
	'gpt-3.5-turbo': 0.004,
}

export default function TokensNotice(props: {
  completionText?: string;
  promptText?: string;
  showModel?: boolean
}) {
  const state = useAppConfig.getState()
  const chatStore = useChatStore.getState();
  const currentSession = chatStore.currentSession()

  const contents = currentSession.messages.map((message) => {
    return message.content
  })

  const model = state.modelConfig.model;
  const sendMemory = state.modelConfig.sendMemory;
  const historyMessageCount = state.modelConfig.historyMessageCount;
  const completionTokens = encode(props.completionText || '').length;
  // 获取contents的最后historyMessageCount条消息
  const historyContents = contents.slice(-historyMessageCount)

  let promptText = props.promptText || ''
  if (sendMemory) {
    promptText = historyContents.join('') + promptText
  }
  const promptTokens = encode(promptText).length;
  const totalCost = completionPrice[model] * completionTokens + promptPrice[model] * promptTokens;


  return (
    <div className="flex gap-2 text-gray-400 text-sm" style={{fontSize: '12px', color: '#777'}}>
      {
        completionTokens ? (<span>
          Completion 完成: { completionTokens } tokens;
        </span>) : ''
      }
      {
        promptTokens ? (<span>
          Prompt 提示: { promptTokens } tokens;
        </span>
        ) : ''
      }
      {
        props.showModel && (<span>模型: { model };</span>)
      }
      <span>预计消耗 { (totalCost / 1000).toFixed(6) } 美金;</span>
    </div>
  )
}


