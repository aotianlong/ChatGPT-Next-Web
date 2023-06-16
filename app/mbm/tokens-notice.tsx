import { encode } from 'gpt-tokenizer'
import { useAppConfig } from "@/app/store";

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
  completionText: string;
  promptText: string;
  showModel: boolean
}) {

  const model = useAppConfig.getState().modelConfig.model;
  const completionTokens = encode(props.completionText || '').length;
  const promptTokens = encode(props.promptText || '').length;
  const totalCost = completionPrice[model] * completionTokens + promptPrice[model] * promptTokens;

  return (
    <div class="flex gap-2 text-gray-400 text-sm" style={{fontSize: '12px', color: '#777'}}>
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


