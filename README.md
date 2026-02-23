# ☕ 晨间咖啡 - 个人介绍网站

一个以晨间咖啡为主题的互动式个人介绍网站，使用 React + TypeScript + GSAP 构建。

![项目状态](https://img.shields.io/badge/状态-完成-success)
![完成度](https://img.shields.io/badge/完成度-95%25-brightgreen)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)

## ✨ 特性

- 🎨 **双主题系统** - 晨间模式和深夜模式，平滑切换
- 🎭 **GSAP 动画** - 专业级动画效果，60fps 流畅体验
- 📱 **响应式设计** - 适配桌面、平板和移动设备
- ♿ **无障碍支持** - ARIA 标签和键盘导航
- 🧪 **测试驱动** - 单元测试和属性测试覆盖
- 🎯 **TypeScript** - 完整的类型安全

## 🎬 章节导览

### 第0章：加载动画
咖啡萃取的5阶段动画，点击任意位置跳过。

### 第1章：晨间仪式
三步骤交互（研磨、注入、等待），选择你的路径（理性面/感性面）。

### 第2章：认知地图
5个知识节点的星空图谱，悬停查看，点击展开详情。

### 第3章：感官漫游
五线谱音符随滚动流动，咖啡完成瞬间的涟漪动画。

### 第4章：声音档案
黑胶唱片四分区，悬停唱针落下，点击查看歌词。

### 第5章：构建日志
手账风格时间轴，记录学习和成长的点滴。

### 第6章：联结邀请
彩蛋文案和联系方式，欢迎一起喝咖啡聊天。

## 🚀 快速开始

### 前置要求
- Node.js 14+
- npm 或 yarn

### 安装和运行

```bash
# 克隆项目
git clone <repository-url>
cd personal-website

# 安装依赖
npm install

# 启动开发服务器
npm start

# 在浏览器中访问
# http://localhost:3000
```

### 其他命令

```bash
# 运行测试
npm test

# 构建生产版本
npm run build

# 代码检查
npm run lint
```

## 📁 项目结构

```
personal-website/
├── src/
│   ├── components/          # React 组件
│   │   ├── LoadingAnimation.tsx
│   │   ├── MorningRitual.tsx
│   │   ├── CognitiveMap.tsx
│   │   ├── SensoryJourney.tsx
│   │   ├── SoundArchive.tsx
│   │   ├── BuildLog.tsx
│   │   ├── Connection.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ProgressBar.tsx
│   ├── contexts/            # React Context
│   │   ├── ThemeContext.tsx
│   │   └── NavigationContext.tsx
│   ├── types/               # TypeScript 类型定义
│   ├── utils/               # 工具函数
│   ├── styles/              # 全局样式
│   └── App.tsx              # 主应用
├── public/                  # 静态资源
└── package.json
```

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19.2.4 | UI 框架 |
| TypeScript | 4.9.5 | 类型系统 |
| GSAP | 3.14.2 | 动画库 |
| fast-check | 4.5.3 | 属性测试 |
| Jest | 27.x | 测试框架 |
| React Testing Library | 16.3.2 | 组件测试 |

## 🎨 自定义

### 修改个人信息
编辑 `src/components/MorningRitual.tsx` 中的个人信息卡片。

### 修改音乐分区
编辑 `src/components/SoundArchive.tsx` 中的 `musicSections` 数组。

### 修改日志条目
编辑 `src/components/BuildLog.tsx` 中的 `logEntries` 数组。

### 修改联系方式
编辑 `src/components/Connection.tsx` 中的微信号和彩蛋文案。

### 修改主题颜色
编辑 `src/styles/variables.css` 中的 CSS 变量。

## 📊 测试

项目包含完整的测试套件：

```bash
# 运行所有测试
npm test

# 运行测试并查看覆盖率
npm test -- --coverage

# 运行特定测试文件
npm test -- ThemeContext.test.tsx
```

### 测试覆盖
- 单元测试：35+ 个测试用例
- 属性测试：18 个正确性属性
- 目标覆盖率：> 80%

## 🎯 核心特性详解

### 主题系统
- 使用 CSS Variables 实现动态主题切换
- 1.5秒平滑过渡动画
- 支持晨间模式（浅色）和深夜模式（深色）

### 动画系统
- GSAP Timeline 管理复杂动画序列
- CSS 动画处理简单效果
- SVG 路径动画
- Intersection Observer 触发滚动动画

### 状态管理
- React Context 管理全局状态
- 章节追踪和路径选择
- 滚动进度监听

## 📝 文档

- [快速启动指南](./QUICK_START_GUIDE.md)
- [项目状态](./PROJECT_STATUS.md)
- [实施总结](./IMPLEMENTATION_SUMMARY.md)
- [完成总结](./COMPLETION_SUMMARY.md)

## 🚧 待实现功能

- [ ] 留言墙功能（需后端支持）
- [ ] 响应式布局优化
- [ ] 性能优化（代码分割、懒加载）
- [ ] SVG 插画组件
- [ ] 错误边界
- [ ] 补充测试覆盖

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

微信：17850232317

---

**创建时间**: 2026-02-15  
**最后更新**: 2026-02-16  
**版本**: 1.0.0  
**状态**: ✅ 核心功能完成

用 ❤️ 和 ☕ 制作
