## YYYY-MM-DD (Current Session)

### Hero 图片轮播 (`templates/tailspark/landing/components/hero/`)

- **问题修复 (`HeroSlider.tsx`)**: 解决了 `slide-2.jpg` 图片无效导致加载失败和重复网络请求的问题。
  - 更新了 `scripts/prepare-hero-images.sh` 中的图片下载链接。
  - 通过脚本成功下载了有效的 `slide-2.jpg`。
  - 在确认图片问题解决后，移除了 `Image` 组件中的 `unoptimized={true}` 属性，恢复 Next.js 图片优化。
- **Hydration 错误修复 (`HeroSlider.tsx`, `hero/index.tsx`)**: 解决了 `HeroSlider` 组件因客户端特有逻辑导致的 Next.js hydration 错误。
  - 在父组件 `hero/index.tsx` 中，将 `HeroSlider` 改为使用 `next/dynamic` 动态导入，并设置 `ssr: false`。

### 搜索组件 (`templates/tailspark/landing/components/search/index.tsx`)

- **问题修复**: 修复了搜索框在提交一次搜索后被禁用，无法继续输入新内容的问题。
  - 从 `handleSubmit` 函数中移除了 `setInputDisabled(true);` 的调用。
- **功能增强**: 实现了当搜索框内容为空时，提交搜索（点击按钮或按回车）将导航至显示全部项目的结果页。
  - 修改 `handleSubmit` 函数，在搜索词为空时构建导航 URL 为 `?q=`。
  - 更新了搜索按钮的 `disabled` 属性，允许在输入为空时提交搜索。

# MCP Registry Release Notes

## 2024-04-30

### 项目详情页优化

- 改进了项目详情页的标签导航功能：
  - 将静态链接改为客户端组件，支持动态切换
  - 添加了标签页导航状态管理
  - 实现了 URL 参数与标签页状态的同步
  - 优化了标签页的视觉反馈：
    - 默认黑色文本样式
    - 悬停时显示主题色和下划线
    - 激活状态保持主题色和下划线
  - 使用 Next.js 的路由功能实现无刷新页面切换

### 技术改进

- 将项目详情页组件标记为客户端组件
- 引入 Next.js 的路由和导航 hooks：
  - useRouter 用于编程式导航
  - useSearchParams 用于获取 URL 参数
- 优化了组件的状态管理和生命周期

## 2024-04-29

### 重大变更

- 数据存储迁移：从 Supabase 数据库迁移到本地 JSON 文件存储
  - 新增 `pagejson/projects.json` 用于存储项目数据
  - 新增 `pagejson/categories.json` 用于存储分类数据
  - 移除了对 Supabase 的直接依赖

### 功能优化

- 项目标签显示优化
  - 修改标签数据结构，从逗号分隔字符串改为数组形式
  - 优化了标签在项目详情页的展示方式

### 类型系统改进

- 新增类型定义文件
  - `types/projects-data.d.ts`：项目数据类型定义
  - `types/categories-data.d.ts`：分类数据类型定义
  - 增强了类型安全性和开发体验

### 开发者体验

- 简化了本地开发流程
  - 移除了对外部数据库的依赖
  - 降低了项目启动门槛
  - 提供了示例数据便于开发和测试

### 配置变更

- 环境变量简化
  - 移除了 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 的依赖
  - 仅保留 `NEXT_PUBLIC_WEB_URL` 配置

## 2024-04-18 更新

### 数据源迁移

- 将项目数据源从 Supabase 迁移到本地 JSON 文件
- 创建了 `pagejson/servers.json` 文件存储 MCP 服务器数据
- 参考 [mcp.so](https://mcp.so/server/github/modelcontextprotocol) 的数据结构
- 更新了 `Project` 类型定义，支持新的数据结构：
  - 添加了 `tags` 字段，类型从 `string` 改为 `string[]`
  - 添加了 `features` 字段，类型为 `string[]`
  - 修改了部分字段的可选性

### 导航栏改进

- 将水平导航栏改为垂直侧边栏导航
- 添加了导航栏折叠/展开功能：
  - 展开时宽度为 224px (w-56)
  - 折叠时宽度为 64px (w-16)
  - 添加了平滑的过渡动画效果
- 为导航按钮添加了图标：
  - Featured: 星标图标
  - Latest: 时钟图标
  - Clients: 用户组图标
  - Hosted: 服务器图标
  - Official: 认证图标
- 实现了导航栏的粘性定位，滚动时保持可见
- 优化了导航按钮的视觉反馈：
  - 悬停效果
  - 激活状态样式
  - 统一的圆角和间距

### 布局优化

- 调整了页面整体布局结构：
  - "View All" 链接移至顶部
  - 左侧导航栏与项目列表对齐
  - 优化了响应式布局
- 调整了项目卡片网格：
  - 考虑左侧导航占用空间，将卡片列数从 4 列改为 3 列
  - 保持了移动端的响应式布局

### 组件重构

- 创建了可重用的 `NavButton` 组件
- 优化了组件的 TypeScript 类型定义
- 改进了代码组织结构和可维护性

### 性能优化

- 移除了不必要的数据库查询
- 简化了数据获取逻辑
- 优化了状态管理

## 下一步计划

- [ ] 实现导航按钮的筛选功能
- [ ] 添加更多的交互动画
- [ ] 优化移动端的导航体验
- [ ] 完善错误处理和加载状态
- [ ] 添加更多的主题定制选项

## 技术栈

- Next.js 15.0.4
- React 19.0.0
- TypeScript
- Tailwind CSS
- Moment.js (日期格式化)

## 2024-03-26

### 功能改进

- 优化了项目详情页的推荐服务器展示
  - 新增推荐服务器卡片式布局，包含项目头像、标题和描述
  - 添加卡片悬停效果，提升交互体验
  - 实现卡片点击跳转功能，支持内部路由和外部链接
  - 修复了原有的 recommendProjects 组件使用错误

### 技术细节

- 移除了错误使用的`<recommendProjects>`组件标签
- 使用 Flexbox 布局实现推荐服务器列表的垂直排列
- 统一了卡片样式，包括圆角、阴影和过渡效果
- 集成 Next.js 的 Link 组件实现路由跳转
- 根据 project.target 属性智能判断跳转目标和打开方式

### UI/UX 改进

- 每个推荐服务器卡片包含：
  - 10x10 大小的项目头像（圆角设计）
  - 项目标题（使用中等字重）
  - 项目描述（最多显示两行）
- 添加卡片悬停时的阴影加深效果
- 保持与项目列表页面一致的交互体验
