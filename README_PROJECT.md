# 个人介绍网站 - 项目结构

## 项目概述

一个以晨间咖啡为主题的互动式个人介绍网站，支持晨间/深夜双模式切换。

## 技术栈

- **React 18** with TypeScript
- **GSAP 3** - 动画库
- **fast-check** - 属性测试库
- **CSS Modules** - 样式隔离
- **CSS Variables** - 主题系统

## 目录结构

```
src/
├── components/       # React组件
├── contexts/         # React Context (主题、导航)
├── hooks/           # 自定义Hooks
├── utils/           # 工具函数和常量
│   ├── constants.ts # 主题配置、动画配置、彩蛋文案
│   └── helpers.ts   # 辅助函数
├── types/           # TypeScript类型定义
│   └── index.ts     # 核心类型
├── styles/          # 全局样式
│   ├── variables.css # CSS变量
│   └── global.css    # 全局样式
└── App.tsx          # 主应用组件
```

## 开发命令

```bash
# 启动开发服务器
npm start

# 运行测试
npm test

# 构建生产版本
npm run build

# 代码格式化
npm run format

# 代码检查
npm run lint
```

## 主题系统

使用CSS Variables实现双主题切换：
- **晨间模式**：浅色主题，水彩纸纹理
- **深夜模式**：深色主题，磨砂玻璃质感

## 响应式断点

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: >= 1024px
- Wide: >= 1440px

## 测试策略

- **单元测试**：Jest + React Testing Library
- **属性测试**：fast-check (每个属性100次迭代)
- **覆盖率目标**：> 80%
