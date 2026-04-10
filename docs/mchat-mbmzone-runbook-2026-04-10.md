# mchat.mbmzone.com 运维与排障记录（2026-04-10）

> 部署环境：n1 `/data/apps/mchat.mbmzone.com`，域名 **mchat.mbmzone.com**。合并上游并启用 MCP 后的排障备忘。

## 1. 版本与合并

- 合并后应用版本约 **v2.16.1**（`tauri.conf` / 页面 `<meta name="config">`）。
- 上游合并带来 MCP 市场、`app/mcp/*`、模型与多语言等；本地保留自定义模型与白名单等。

## 2. 构建与依赖（Yarn）

- 以 **`yarn.lock` + `packageManager: yarn@1.22.19`** 为准。
- 已处理：`utf-8-validate`、`bufferutil`、`js-yaml@^4.1.0`、Browserslist 更新、`chat.module.scss` 中 `align-items: flex-end`、按需 `eslint.ignoreDuringBuilds`。

## 3. 插件 openapi / ghp.ci

- 错误 URL `https://ghp.ci/https://raw.githubusercontent.com/...` 会导致 schema 无法下载。
- 将 OpenAPI 放到 **`public/` 根目录**，`plugins.json` 使用同源路径；避免 **`public/plugins/`** 目录名；新增静态文件后必要时 **`pm2 restart`**。

## 4. CDN 与缓存

- 强刷不能清 CDN 边缘旧 HTML；需 CDN 控制台刷新 `/` 等。
- 源站：`force-dynamic`、`/` 的 `Cache-Control: no-store` 等。

## 5. POST 首页 + `Next-Action`

- 为 **Next.js Server Actions**（MCP `app/mcp/actions.ts`），**不是**聊天 API 走错。
- 大模型仍为 **`/api/...`** 的 `llm.chat` fetch。

## 6. `checkMcpJson`

- 修复：`isMcpEnabled()` 必须 **`await`**，不可把 Promise 当 boolean。

## 7. 发送无反应：Nginx 与 Server Actions（关键）

**日志：**

```
`x-forwarded-host` header with value `127.0.0.1:4000` does not match `origin` header with value `mchat.mbmzone.com` from a forwarded Server Actions request. Aborting the action.
Error: Invalid Server Actions request.
```

**原因：** 反代 `127.0.0.1:4000` 时未传 **`Host` / `X-Forwarded-Host`**，Next 拒绝 Server Action；`getMessagesWithMemory()` 中 `await isMcpEnabled()` 失败则不会继续请求模型。

**Nginx（`mchat.mbmzone.com.conf`）示例：**

```nginx
proxy_http_version 1.1;
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

CDN 仅 HTTP 回源时可能还需按 **`X-Forwarded-Proto`** 调整。

## 8. 其他

- 网关 **12002 模型错误**：检查 openai-service / 网关模型名。
- **安全**：勿泄露 URL 中的 JWT；泄露后轮换密钥。

---

*同步于 Obsidian：`mchat.mbmzone.com-运维与排障记录-2026-04-10.md`（pigrocks）。*
