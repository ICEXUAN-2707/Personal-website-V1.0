# 快速启动指南

## 🚀 立即开始

### 1. 安装依赖
```bash
cd personal-website
npm install
```

### 2. 启动开发服务器
```bash
npm start
```

浏览器会自动打开 `http://localhost:3000`

### 3. 查看效果

你会看到：
1. **咖啡萃取加载动画**（5秒，可点击跳过）
2. **晨间仪式**：点击三个步骤完成互动
3. **路径选择**：选择"理性面"或"感性面"
4. **认知地图**：点击节点查看详细信息

### 4. 测试主题切换
- 点击右上角的太阳/月亮图标
- 观察1.5秒的平滑过渡动画
- 体验晨间模式和深夜模式的视觉差异

### 5. 观察进度条
- 左侧的进度条显示当前时间（6:00 AM - 10:00 AM）
- 滚动页面时，液面会上升
- 时间会随着进度变化

## 🧪 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- --testPathPattern="ThemeContext"

# 查看测试覆盖率
npm test -- --coverage
```

## 🎨 自定义配置

### 修改主题颜色
编辑 `src/styles/variables.css`：

```css
:root {
  --bg-primary: #F7F5F0;    /* 背景主色 */
  --accent-1: #8B6F47;      /* 强调色1 */
  /* ... */
}
```

### 修改彩蛋文案
编辑 `src/utils/constants.ts`：

```typescript
export const easterEggs = {
  rational: [
    "你的文案...",
  ],
  emotional: [
    "你的文案...",
  ],
};
```

### 修改知识图谱节点
编辑 `src/components/CognitiveMap.tsx`：

```typescript
const nodes: Node[] = [
  {
    id: 'your-node',
    label: '你的标签',
    icon: '🎯',
    description: '描述',
    content: '详细内容',
    position: { x: 50, y: 50 },
  },
  // ...
];
```

## 📦 构建生产版本

```bash
npm run build
```

构建产物在 `build/` 目录。

## 🐛 常见问题

### Q: 测试失败怎么办？
A: 确保已安装所有依赖：
```bash
npm install
```

### Q: 动画不流畅？
A: 检查浏览器是否支持硬件加速，或者禁用浏览器扩展。

### Q: 如何添加新章节？
A: 
1. 在 `src/components/` 创建新组件
2. 在 `src/App.tsx` 中导入并添加到路由
3. 更新 `NavigationContext` 的章节状态

## 📚 更多文档

- [实施总结](./IMPLEMENTATION_SUMMARY.md) - 详细的功能说明
- [项目状态](./PROJECT_STATUS.md) - 当前进度
- [设计文档](../.kiro/specs/personal-website/design.md) - 技术设计
- [需求文档](../.kiro/specs/personal-website/requirements.md) - 功能需求

## 💬 获取帮助

如果遇到问题：
1. 查看控制台错误信息
2. 检查 `package.json` 中的依赖版本
3. 确保Node.js版本 >= 14

## 🎉 开始探索

现在你可以：
- 体验已实现的功能
- 修改样式和内容
- 继续开发剩余章节
- 添加你自己的创意

祝你开发愉快！✨
