# MCP Registry Release Notes

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
