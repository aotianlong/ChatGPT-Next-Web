import { getHeaders } from "../client/api";
import { useAccessStore } from "../store";
/*
 * 写一个从querystring获取名为model的参数，设置默认模型
 */

const modelNameKey = "MBM_CARD_MEMBER";

let isCardMemberCache = undefined;

export async function getMemberCards() {
  const accessStore = useAccessStore.getState();
  const token = accessStore.token;

  if (!token) {
    return false;
  }

  console.log("call get member cards");
  const response = await fetch(
    "https://openai.yingjin.pro/api/visitor/queryInfo",
    {
      headers: getHeaders(),
      body: JSON.stringify({ accessKey: token }),
      method: "post",
    },
  );

  console.log("response", response);
  const json = await response.json();
  console.log("json", json);
  let accountInfo = null;
  if (json.code === 11000) {
    accountInfo = json.data;
  }

  if (accountInfo) {
    // 查询周卡接口
    const cardInfoResponse = await fetch(
      `https://openai.yingjin.pro/api/visitor/getValidatyTime?accountId=${accountInfo.id}`,
      {
        headers: getHeaders(),
      },
    );
    let json2 = await cardInfoResponse.json();
    console.log("json2", json2);
    if (json2.code === 11000) {
      return json2.data;
    } else {
      return [];
    }
  }
  return [];
}

export async function isCardMember() {
  if (isCardMemberCache !== undefined) {
    return isCardMemberCache;
  }

  const cards = await getMemberCards();
  if (cards) {
    // 对比时间
    console.log("cards", cards);
    const validCard = cards.find((card: any) => {
      let r = new Date(card.validityTime).getTime() > new Date().getTime();
      isCardMemberCache = r;
      return r;
    });
    if (validCard) {
      isCardMemberCache = true;
      return true;
    } else {
      isCardMemberCache = false;
      return false;
    }
  } else {
    isCardMemberCache = false;
    return false;
  }
}

export function useCardMember(callback: any = null) {
  const params = new URLSearchParams(window.location.search);
  const version = params.get("version");
  if (version) {
    // 从openai 主页过来的
    const isCardMember = params.get("active") === "true";
    localStorage.setItem(modelNameKey, JSON.stringify(isCardMember));
    return isCardMember;
  }
  return JSON.parse(localStorage.getItem(modelNameKey) || "false");
}
