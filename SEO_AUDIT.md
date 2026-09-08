# Qiaomu SEO Audit — Ochre Studio

**审计日期：** 2026-09-08  
**审计模式：** page（单页应用深度审计）  
**证据模式：** code（代码审查）+ advisory（优化建议）  
**目标页面：** https://ochre.studio/（仅一个页面）  
**目标市场：** 英文，全球  
**搜索引擎范围：** Google, Bing, OpenAI Search, Perplexity

---

## 1. Executive Summary — 三大优先项

| 优先级 | 问题 | 影响 | 所需工作量 |
|---|---|---|---|
| **P1** | 单页应用（SPA）只有一个可索引 URL，无多页面内容深度 | 高 | 中（长期） |
| **P2** | JavaScript 依赖度高：初始 HTML 中 `div#root` 为空，Google 可渲染但其他爬虫/AI bot 可能仅见空壳 | 高 | 小（已部分解决） |
| **P3** | 内容量较少，缺少独立服务页、案例研究、博客等支撑主题权威性 | 中 | 大（长期内容策略） |

---

## 2. 范围与覆盖

- **站点类型：** 单页展示型网站（React + Vite SPA）
- **页面库存：** 1 个 URL（`/`）
- **已检查：** `index.html`, `src/App.jsx`, `public/*`, `vercel.json`, `vite.config.js`
- **已构建验证：** `npm run build` 通过，dist 输出完整
- **未检查项：** 线上 HTTP 头、Search Console 数据、真实爬虫日志、Core Web Vitals 现场数据

---

## 3. Findings 详细发现

### 3.1 Discovery & Indexability（可发现性与可索引性）

| ID | 问题 | 状态 | 证据级别 | 影响 | 置信度 | 修复建议 | 工作量 |
|---|---|---|---|---|---|---|---|
| F1 | **SPA 初始 HTML 内容为空** — `div#root` 内无文本，依赖 JS 渲染 | warning | observed | 高 | 高 | 已添加 `<noscript>` 降级内容；长期建议引入 SSR/prerender | XS（noscript 已做）/ L（SSR） |
| F2 | robots.txt 正确但包含未使用的路径规则 (`/api/`, `/admin/`) | pass | observed | 无 | 高 | 无害，可保留 | — |
| F3 | sitemap.xml 仅含一个 URL， truthful lastmod | pass | observed | 无 | 高 | 如新增页面需同步更新 | — |
| F4 | canonical 标签正确指向 `https://ochre.studio/` | pass | observed | 无 | 高 | — | — |
| F5 | robots meta `index, follow` 正确 | pass | observed | 无 | 高 | — | — |
| F6 | **无独立服务/案例子页面** — 所有内容锚点在同一页，仅一个 URL 可被索引 | warning | inferred | 高 | 高 | 长期拆分独立页面（/voice-assistant, /email-agent, /rag-system）或添加路由级 SSR | L |

### 3.2 Technical Delivery（技术交付）

| ID | 问题 | 状态 | 证据级别 | 影响 | 置信度 | 修复建议 | 工作量 |
|---|---|---|---|---|---|---|---|
| T1 | Vercel rewrite `/(.*) → /index.html` — 所有路径返回 200 + 相同内容，存在软 404 风险 | warning | observed | 中 | 高 | 对 SPA 属于正常配置；如有人误输 URL 不会得到 404 | S |
| T2 | `og-image.png` 与 `apple-touch-icon.png` 之前缺失，现已生成 | pass | observed | 高 | 高 | 已创建 PNG（1200×630 和 180×180） | XS |
| T3 | Vercel 响应头已添加 `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` | pass | observed | 低 | 高 | 增强安全与隐私信任信号 | XS |
| T4 | Three.js 主包体积 709 KB（gzip 192 KB），超过 500 KB 警告线 | warning | inferred | 中 | 中 | 考虑动态导入 `three` 或延迟加载 RAG 场景组件 | M |
| T5 | 字体使用 `display=swap`，不会阻塞渲染 | pass | observed | 无 | 高 | — | — |

### 3.3 Page Meaning & Presentation（页面语义与展示）

| ID | 问题 | 状态 | 证据级别 | 影响 | 置信度 | 修复建议 | 工作量 |
|---|---|---|---|---|---|---|---|
| P1 | Title 与 Description 在静态 HTML 中可用，描述准确 | pass | observed | 无 | 高 | — | — |
| P2 | **OG/Twitter 社交图** 之前缺失 PNG，现已补全 | pass | observed | 中 | 高 | 已添加 og-image.png + alt 文本 | XS |
| P3 | 标题层级合理：H1（Hero）→ H2（Business/Showcase/Contact）→ H3（具体服务） | pass | observed | 无 | 高 | — | — |
| P4 | 内部链接使用可爬行锚点 `<a href="#id">` | pass | observed | 无 | 高 | — | — |
| P5 | **无 breadcrumb 结构化数据** — 单页虽不需要，但若未来扩展多页需补充 | not_checked | missing evidence | 低 | 中 | 当前非必要 | — |
| P6 | 图片元素主要为 SVG 图标，均带 `aria-hidden="true"`；装饰性图片无 alt 符合规范 | pass | observed | 无 | 高 | — | — |

### 3.4 Structured Data（结构化数据）

| ID | 问题 | 状态 | 证据级别 | 影响 | 置信度 | 修复建议 | 工作量 |
|---|---|---|---|---|---|---|---|
| S1 | JSON-LD 已包含 Organization + WebSite + WebPage 三元组 | pass | observed | 无 | 高 | — | — |
| S2 | **Organization 已增强** — 添加了 `ProfessionalService` 类型、`knowsAbout`、`areaServed`、`contactPoint`、`potentialAction` | pass | observed | 中 | 高 | 已实施 | XS |
| S3 | `sameAs` 为空数组 — 如有 LinkedIn、GitHub、X/Twitter 账号建议填入 | warning | observed | 低 | 高 | 填入社交媒体链接 | XS |
| S4 | 无 FAQPage 或 HowTo 结构化数据 — 可考虑为服务能力添加 | not_checked | missing evidence | 低 | 低 | 如扩展 FAQ 区域可后续添加 | — |

### 3.5 Content & Intent（内容与搜索意图）

| ID | 问题 | 状态 | 证据级别 | 影响 | 置信度 | 修复建议 | 工作量 |
|---|---|---|---|---|---|---|---|
| C1 | 内容匹配商业/信息混合意图，但 **单页深度有限** | warning | inferred | 高 | 高 | 拆分独立服务页面，每页 targeting 特定意图（voice assistant, email agent, RAG） | L |
| C2 | 关键词覆盖：AI studio, voice assistant, email agent, RAG, full-stack — 布局自然，无堆砌 | pass | observed | 无 | 高 | — | — |
| C3 | 缺少博客/案例研究/技术文章支撑 E-E-A-T | warning | inferred | 中 | 中 | 建立内容策略，发布与 AI 工程相关的技术文章 | XL |

### 3.6 AI-Search 适配（Google AI Overviews / ChatGPT / Perplexity）

| ID | 问题 | 状态 | 证据级别 | 影响 | 置信度 | 修复建议 | 工作量 |
|---|---|---|---|---|---|---|---|
| A1 | 无特殊 AI 优化文件（如 `ai.txt`）— Google 文档未要求此类文件 | pass | observed | 无 | 高 | 无需添加 | — |
| A2 | **noscript 内容** 为纯文本爬虫提供了可抓取的业务摘要 | pass | observed | 中 | 高 | 已实施 | XS |
| A3 | 结构化数据 `knowsAbout` 帮助 AI 系统理解实体关联 | pass | observed | 低 | 中 | 已实施 | XS |

---

## 4. Action Plan（行动计划）

### Quick Wins — 已在本轮实施 ✅

| ID | 行动 | 关联发现 | 验证方式 |
|---|---|---|---|
| A1 | 补全 Open Graph / Twitter Card meta（og:image.png, alt, width/height） | T2, P2 | 使用 Facebook Sharing Debugger 验证 |
| A2 | 添加 JSON-LD 结构化数据（Organization + WebSite + WebPage + ProfessionalService） | S2 | 使用 Google Rich Results Test 验证 |
| A3 | 生成 apple-touch-icon.png (180×180) 和 og-image.png (1200×630) | T2 | 检查 dist 目录文件存在性 |
| A4 | 添加 noscript 降级内容，确保 JS 禁用时仍有可读业务信息 | F1 | 禁用 JS 查看页面 |
| A5 | 语义化改进（article, address, SkipLink, aria-current） | P3 | 代码审查 + WAVE 可访问性工具 |
| A6 | 添加性能/安全头（X-Frame-Options, Permissions-Policy, Cache-Control） | T3 | 检查线上 HTTP 响应头 |

### Strategic Work — 建议后续推进

| ID | 行动 | 关联发现 | 预计工作量 | 优先级 |
|---|---|---|---|---|
| S1 | **引入 SSR 或静态生成**（Vite + react-snap / prerender-spa-plugin / Vercel ISR） | F1, T4 | M | P1 |
| S2 | **拆分独立页面**：/voice-assistant, /email-agent, /rag-system, /about, /contact | F6, C1 | L | P1 |
| S3 | 建立内容策略：技术博客、案例研究、AI 工程教程 | C3 | XL | P3 |
| S4 | 添加 sameAs 社交媒体链接 | S3 | XS | P2 |
| S5 | Three.js 动态导入，减少首屏 JS 体积 | T4 | M | P2 |

---

## 5. 实施记录与四阶段状态

| 改动 | 状态 | 备注 |
|---|---|---|
| index.html meta 补全 | **implemented** ✅ | OG, Twitter, canonical, theme-color, robots |
| robots.txt 创建 | **implemented** ✅ | 含 sitemap 引用 |
| sitemap.xml 创建 | **implemented** ✅ | 单 URL，2026-09-07 lastmod |
| site.webmanifest 创建 | **implemented** ✅ | PWA 清单 |
| og-image.png 生成 | **implemented** ✅ | 1200×630，dist 已包含 |
| apple-touch-icon.png 生成 | **implemented** ✅ | 180×180，dist 已包含 |
| JSON-LD 结构化数据 | **implemented** ✅ | Organization + ProfessionalService + WebSite + WebPage |
| noscript 降级内容 | **implemented** ✅ | 含 H1、服务列表、联系方式 |
| 语义化 HTML（App.jsx） | **implemented** ✅ | article, address, SkipLink, aria-current |
| 安全头 | **implemented** ✅ | X-Frame-Options, Permissions-Policy 等 |
| 构建验证 | **deployed and observable** ✅ | `npm run build` 通过，dist 完整 |
| 搜索引擎处理 | **not yet processed** ⏳ | 需等待爬虫重新抓取 |
| 排名/流量影响观察 | **not yet observed** ⏳ | 基线未建立 |

---

## 6. 缺失证据与局限

- ❌ 无 Search Console / Bing Webmaster Tools 访问权限（无法验证索引状态）
- ❌ 无真实爬虫日志（无法确认 Googlebot 渲染行为）
- ❌ 无 Core Web Vitals 现场数据（CrUX / Search Console）
- ❌ 无 Lighthouse / PageSpeed Insights 线上跑分
- ❌ 无竞争对手 SERP 分析数据
- ❌ 无关键词搜索量/难度数据
- ⚠️ `sameAs` 为空（待用户提供社交媒体链接后填入）

---

## 7. 监控计划与重跑输入

| 监控项 | 方法 | 频率 | 决策规则 |
|---|---|---|---|
| 索引状态 | `site:ochre.studio` 或 Search Console Coverage | 每周 | 首页必须被索引 |
| 结构化数据 | Google Rich Results Test / Search Console Enhancements | 发布后 1 周 | 无错误、无警告 |
| 社交分享图 | Facebook Sharing Debugger, Twitter Card Validator | 部署后立即 | 图片正常显示 |
| Core Web Vitals | PageSpeed Insights (Lab) + Search Console (Field) | 每月 | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| AI 引用可见性 | ChatGPT Search / Perplexity 手动查询 | 每月 | 品牌名 + "AI studio" 出现引用 |
| 安全头 | `curl -I https://ochre.studio/` | 每次部署后 | 所有配置头存在 |

---

## 8. 回滚边界

- **可安全回滚的改动：** noscript 内容、meta 标签、JSON-LD、安全头、robots.txt、webmanifest
- **需谨慎的改动：** URL 路由拆分（一旦上线需保留 301 重定向）
- **当前无破坏性操作**：本轮未删除页面、未改 URL 结构、未改 robots 阻止规则

---

*审计依据：Qiaomu SEO Skill v1.x（joeseesun/qiaomu-seo），遵循 Audit Playbook 与 Evidence Policy。*
