# 🌍 Earth Visualization Project

## 🚀 Live Demo
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://gecgithub01.walmart.com/pages/e0t00nk/GSpoWorld/)

**🌐 [View Live Application](https://gecgithub01.walmart.com/pages/e0t00nk/GSpoWorld/)**

---

## ⚡ Quick Start

> 💡 **Tip**: Press `H` key after launching to see all available keyboard shortcuts and controls!

A powerful 3D Earth visualization platform for procurement order analysis, featuring interactive shipping routes, real-time analytics, and automated demo tours.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Visualization**: [Three.js](https://threejs.org/) + [Globe.gl](https://github.com/vasturiano/globe.gl)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS3 + Styled Components
- **Data Visualization**: [D3.js](https://d3js.org/)
- **Animation**: Custom GLSL Shaders

## Project Structure

- `src/`: Main TypeScript source code
- `public/`: Static assets (Earth textures, shipping route data, etc.)
- `index.html`: Entry HTML file

# WorldMapper - 全球员工外包数据可视化平台

一个基于 React + TypeScript + Globe.gl 的交互式 3D 地球可视化项目，用于展示和分析全球外包员工数据分布。

![Demo](https://img.shields.io/badge/Demo-Live-green) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![React](https://img.shields.io/badge/React-18.2.0-blue)

## 🌟 项目特色

- **🌍 3D 地球可视化**: 基于 Globe.gl 的交互式 3D 地球模型
- **📊 实时数据展示**: 动态显示全球 25+ 城市的外包员工数据
- **🎯 智能筛选**: 港口侧边栏支持多选城市，实时统计员工数量
- **📈 统计分析**: 实时统计总员工数、活跃城市数量、运营成本等关键指标
- **⌨️ 快捷键操作**: 完整的键盘快捷键支持，提升操作效率
- **🎨 现代化 UI**: 基于 styled-components 的响应式设计
- **🔍 AI 智能摘要**: 集成 AI 驱动的数据分析和洞察功能

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🏗️ 技术架构

### 核心技术栈

- **前端框架**: React 18.2.0 + TypeScript 5.8.3
- **3D 可视化**: Globe.gl 2.41.4 + Three.js 0.176.0
- **状态管理**: Redux Toolkit 2.8.2
- **样式方案**: styled-components 6.1.18
- **数据处理**: D3.js 7.9.0
- **构建工具**: Vite 6.3.5

### 项目结构

```
src/
├── components/           # React 组件
│   ├── globe/           # 3D 地球相关组件
│   │   ├── Earth.tsx    # 主地球组件
│   │   └── settings/    # 地球配置
│   ├── bar/             # 顶部/底部导航栏
│   ├── PortsSidebar.tsx # 港口选择侧边栏
│   └── AISummaryChat.tsx # AI 摘要聊天
├── data/                # 数据文件
│   ├── outsourcingEmployeeData.json # 员工数据
│   └── ai.json          # AI 摘要数据
├── hooks/               # React Hooks
│   ├── loader.ts        # 数据加载逻辑
│   └── useKeyboardShortcuts.tsx # 快捷键
├── redux/               # Redux 状态管理
│   ├── store.ts         # 状态定义
│   └── hook.ts          # Redux Hooks
└── config/              # 配置文件
    └── constants.ts     # 常量定义
```

## 📊 数据结构

### 员工数据 (outsourcingEmployeeData.json)

```json
[
  {
    "year": "2024",
    "data": [
      {
        "city": "SHANGHAI",
        "lat": 31.2304,
        "lng": 121.4737,
        "employeeCount": 350
      }
    ]
  }
]
```

### 统计数据 (statistics.json)

```json
{
  "globalEmployees": {
    "description": "全球外包员工总数",
    "value": 2847,
    "unit": "人"
  },
  "activeCities": {
    "description": "活跃外包城市数量",
    "value": 24,
    "unit": "个"
  }
}
```

## 🎮 功能特性

### 3D 地球交互

- **鼠标控制**: 拖拽旋转、滚轮缩放
- **城市标签**: 动态显示员工数量，根据人数调整大小
- **平滑动画**: 视角切换和数据更新的流畅过渡

### 港口侧边栏

- **动态数据**: 自动从员工数据中提取所有城市
- **多选功能**: 支持选择多个城市进行对比分析
- **实时统计**: 显示选中城市的总员工数量
- **按钮操作**: 全选、清空选择等快捷操作

### 时间轴控制

- **年份切换**: 查看不同年份的员工分布数据
- **数据对比**: 对比不同时期的变化趋势

### AI 智能分析

- **数据洞察**: AI 驱动的数据分析和趋势预测
- **智能摘要**: 自动生成数据报告和关键发现

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `H` | 显示/隐藏帮助面板 |
| `A` | 切换 AI 摘要面板 |
| `R` | 重置地球视角 |
| `ESC` | 关闭当前面板 |

## 🛠️ 开发指南

### 添加新城市数据

1. 编辑 `src/data/outsourcingEmployeeData.json`
2. 添加城市信息：`city`, `lat`, `lng`, `employeeCount`
3. 重启开发服务器

### 自定义地球材质

编辑 `src/components/globe/settings/material.ts` 文件：

```typescript
export const setMaterial = (globe: GlobeInstance) => {
  globe
    .globeImageUrl('/img/earth-day.jpg')  // 日间贴图
    .bumpImageUrl('/img/earth-topology.png') // 高度贴图
    .backgroundImageUrl('/img/night-sky.png'); // 背景贴图
};
```

### 调整标签样式

编辑 `src/components/globe/settings/label.ts` 文件：

```typescript
const labelSize = Math.sqrt(d.employeeCount) * 0.08; // 调整大小比例
const labelColor = d.employeeCount > 100 ? '#ff6b6b' : '#4dd0e1'; // 调整颜色规则
```

## 📈 性能优化

- **React.memo**: 组件级别的渲染优化
- **useMemo/useCallback**: 避免不必要的重新计算
- **Redux Toolkit**: 高效的状态管理
- **Vite**: 快速的开发构建工具
- **代码分割**: 按需加载组件

## 🔧 配置选项

### 地球设置

```typescript
// src/components/globe/settings/init.ts
const globe = Globe()
  .width(containerWidth)
  .height(containerHeight)
  .backgroundColor('rgba(0,0,0,0)')
  .showAtmosphere(true)
  .atmosphereColor('#4dd0e1')
  .atmosphereAltitude(0.1);
```

### 样式主题

```typescript
// src/config/constants.ts
export const THEME = {
  primary: '#4dd0e1',
  background: '#0f191f',
  text: '#ffffff',
  accent: '#ff6b6b'
};
```

## 🚀 部署

### GitHub Pages

```bash
npm run build
npm run deploy
```

### Vercel

1. 连接 GitHub 仓库
2. 设置构建命令: `npm run build`
3. 设置输出目录: `dist`

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 创建 Pull Request

## 📝 更新日志

### v1.0.0 (2024-08-07)

- ✨ 初始版本发布
- 🌍 3D 地球可视化功能
- 📊 员工数据展示和分析
- 🎯 港口侧边栏筛选功能
- ⌨️ 快捷键支持
- 🤖 AI 智能摘要集成

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Globe.gl](https://github.com/vasturiano/globe.gl) - 3D 地球可视化库
- [Three.js](https://threejs.org/) - 3D 图形库
- [React](https://reactjs.org/) - 前端框架
- [D3.js](https://d3js.org/) - 数据可视化库
- [Vite](https://vitejs.dev/) - 构建工具

## 📞 联系方式

- 项目链接: [https://github.com/MikeSister/WorldMapper-SH-GlobalWorld](https://github.com/MikeSister/WorldMapper-SH-GlobalWorld)
- 问题反馈: [Issues](https://github.com/MikeSister/WorldMapper-SH-GlobalWorld/issues)

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！


## ✨ Key Features

### 🌍 Core 3D Globe Features
- **Realistic 3D Earth**: WebGL-powered high-performance rendering with 2K resolution textures
- **Day/Night Cycle**: Real-time day/night transitions based on Beijing time zone
- **Auto-Rotation**: Smooth globe rotation with mouse hover pause
- **Camera Controls**: Intuitive drag-to-rotate and scroll-to-zoom interactions

### 🚢 Shipping Route Visualization
- **Dynamic Arcs**: Mathematical great circle paths showing procurement order routes
- **Cost Color Coding**: Visual cost intervals with gradient colors
- **Collision Avoidance**: Smart label positioning to prevent overlaps
- **Interactive Tooltips**: Detailed port information on hover

### 📊 Real-time Analytics Dashboard
- **PO Statistics**: Live procurement order metrics and cost analysis
- **Pie Chart Visualization**: Key business metrics (OTIF: 95.5%, On-time Delivery: 92.3%, In-Stock: 88.7%)
- **Historical Trends**: Multi-metric trend charts with interactive mouse hover
- **Collapsible Panels**: Space-efficient smart interface design

### 📅 Timeline Navigation
- **Linear Timeline**: Visual week progress indicators
- **Week Data Switching**: Switch between different time periods
- **Keyboard Navigation**: Arrow keys and button support for week navigation

### 🎮 Interactive Control System
- **Comprehensive Keyboard Shortcuts**: 
  - `H` - Show help and all shortcuts
  - `1-6` - Quick jump to different regions
  - `Q/W/E` - Launch different demo modes
  - `R` - Toggle auto-rotation
  - `+/-` - Adjust rotation speed
  - `0` - Reset to default view
- **Mouse Interaction**: Full mouse support for all controls
- **Help Interface**: Built-in shortcuts reference (Press `H`)

### 🎬 Demo System
- **Scripted Demonstrations**: 
  1. **Quick Overview** (2 min) - Global shipping network overview
  2. **Detailed Analysis** - In-depth data analysis demo
  3. **Regional Deep Dive** - Geographic region focus
- **Region Showcase**: Automated tour of 7 predefined regions
- **Demo Information**: Real-time step progress and remaining time display


### 🎨 Visual Effects
- **Custom GLSL Shaders**: Advanced day/night rendering effects
- **Atmospheric Rendering**: Realistic atmosphere and city lights
- **Smooth Animations**: Fluid transitions and camera movements
- **Performance Optimization**: Efficient rendering for smooth 60fps experience

## 📁 Project Structure

```
earth/
├── src/                          # Main TypeScript source code
│   ├── components/              # React components
│   │   ├── globe/              # 3D globe related components
│   │   ├── tour/               # Demo and tour system
│   │   └── bar/                # UI bars and controls
│   ├── config/                 # Configuration files
│   ├── data/                   # Static data files
│   ├── hooks/                  # Custom React hooks
│   ├── redux/                  # State management
│   └── store/                  # Redux store setup
├── public/                      # Static assets
│   ├── data/                   # JSON data files
│   └── img/                    # Earth textures and images
├── document/                   # Project documentation
└── dist/                       # Production build output
```

## 🎨 Customization

### Earth Textures
Replace files in `public/img/`:
- `2k_earth_day.jpg` - Daytime Earth texture
- `2k_earth_night.jpg` - Nighttime Earth texture  
- `night-sky.png` - Background star field

### Data Configuration
Modify files in `public/data/`:
- `statistics.json` - Business metrics data

Available static assets in `public/`:
- `lines.json` - Shipping route coordinates (if needed)
- `img/` - Earth textures and backgrounds


## 📚 Documentation

- [Features Documentation](document/FEATURES.md) - Complete feature list
- [Component Reference](document/COMPONENT_REFERENCE.md) - Component API docs
- [Data Format Guide](document/DATA_FORMAT_GUIDE.md) - Data structure reference
- [Developer Guide](document/DEVELOPER_GUIDE.md) - Development guidelines
