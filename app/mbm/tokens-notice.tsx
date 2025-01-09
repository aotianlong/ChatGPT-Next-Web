import { encode } from "gpt-tokenizer";
import { useChatStore, useAppConfig } from "@/app/store";

const completionPrice = {
  "gpt-4": 0.12,
  "gpt-4-32k": 0.24,
  "gpt-3.5-turbo": 0.004,
  "gpt-4o": 0.01,

  "gpt-4o-mini": 0.0004,
  "o1-preview": 0.03,
  "o1-mini": 0.006,
  "claude-3-5-haiku-20241022": 0.002,
  "claude-3-5-sonnet-20241022": 0.006,
  "claude-3-opus-20240229": 0.03,
};

const promptPrice = {
  "gpt-4": 0.06,
  "gpt-4-32k": 0.12,
  "gpt-3.5-turbo": 0.004,
  "gpt-4o": 0.03,
  "gpt-4o-mini": 0.0012,
  "o1-preview": 0.12,
  "o1-mini": 0.024,
  "claude-3-5-haiku-20241022": 0.01,
  "claude-3-5-sonnet-20241022": 0.03,
  "claude-3-opus-20240229": 0.15,
};

export default function TokensNotice(props: {
  completionText?: string;
  promptText?: string;
  showModel?: boolean;
  isCardMember?: boolean;
}) {
  const state = useAppConfig.getState();
  const chatStore = useChatStore.getState();
  const currentSession = chatStore.currentSession();

  const contents = currentSession.messages.map((message) => {
    return message.content;
  });

  //model应该拿当前session的
  const model = currentSession.mask.modelConfig.model;
  if (model === "dall-e-3" || Array.isArray(props.completionText)) {
    return (
      <div
        className="flex gap-2 text-gray-400 text-sm"
        style={{ fontSize: "12px", color: "#777" }}
      >
        <span>该模型暂不支持预测计费</span>
      </div>
    );
  }

  const sendMemory = state.modelConfig.sendMemory;
  const historyMessageCount = state.modelConfig.historyMessageCount;
  const completionTokens = encode(
    Array.isArray(props.completionText) ? "" : props.completionText || "",
  ).length;
  // 获取contents的最后historyMessageCount条消息
  const historyContents = contents.slice(-historyMessageCount);
  const isCardMember = props.isCardMember;

  let promptText = props.promptText || "";
  if (sendMemory) {
    promptText = historyContents.join("") + promptText;
  }

  const promptTokens = encode(promptText).length;
  const totalCost =
    completionPrice[model] * completionTokens +
    promptPrice[model] * promptTokens;
  // 周卡用户，并使用gpt-3.5，则不显示提示
  if (isCardMember && model === "gpt-3.5-turbo") {
    return null;
  }

  return (
    <div
      className="flex gap-2 text-gray-400 text-sm"
      style={{ fontSize: "12px", color: "#777" }}
    >
      {completionTokens ? (
        <span>Completion 完成: {completionTokens} tokens;</span>
      ) : (
        ""
      )}
      {promptTokens ? <span>Prompt 提示: {promptTokens} tokens;</span> : ""}
      {props.showModel && <span>模型: {model};</span>}
      <span>预计消耗 {(totalCost / 1000).toFixed(6)} 美金;</span>
    </div>
  );
}
