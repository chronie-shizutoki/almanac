# 本地构建说明

## 项目概述
本项目是对原始 almanac 黄历查询工具的优化版本，使用 Vue.js 框架重构，解决了以下问题：
1. 将单一HTML大文件拆分为多个组件，提高可维护性
2. 修复自定义字体 LXGWWenKai-Regular.ttf 的加载问题
3. 集成新的日历图标
4. 支持构建 Windows 和 Android 应用包

## 本地构建步骤

### 前置条件
- Node.js 16+ 和 npm
- 用于 Android 构建: Android Studio 和 JDK
- 用于 Windows 构建: Windows 操作系统

### 克隆仓库
```bash
git clone https://github.com/quiettimejsg/almanac.git
cd almanac
git checkout optimized-version  # 切换到优化后的分支
```

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```

### 构建 Web 版本
```bash
npm run build
```

### 构建 Windows 应用包
```bash
npm run build:windows
```
构建完成后，可在 `dist_electron` 目录找到可执行文件。

### 构建 Android 应用包
确保已安装 Android Studio 和配置好 Android SDK。

```bash
npm run build:android
```

然后在 Android Studio 中打开 `android` 目录，构建 APK 或 AAB 文件。

## GitHub CI/CD 自动构建

本项目配置了 GitHub Actions 自动构建流程，位于 `.github/workflows/ci.yml`。每次提交到任何分支时，将自动执行以下任务：

- **构建 Windows 应用包**：在 Windows 环境中构建可执行文件，并上传为工作流 artifacts
- **构建 Web 版本**：在 Ubuntu 环境中构建静态网页资源，并上传为工作流 artifacts

### 查看构建结果
1. 访问项目的 GitHub 仓库页面
2. 点击顶部的 "Actions" 选项卡
3. 选择对应的工作流运行
4. 在 "Artifacts" 部分下载构建产物

## 项目结构说明
```
almanac/
├── public/                 # 静态资源
│   ├── manifest.json       # PWA 配置
│   ├── myicon-*.png        # 各尺寸图标
│   └── launch.png          # 启动图标
├── src/                    # 源代码
│   ├── assets/             # 资源文件
│   │   ├── styles/         # 样式文件
│   │   │   ├── main.css    # 主样式
│   │   │   └── font.css    # 字体配置
│   │   └── LXGWWenKai-Regular.ttf  # 自定义字体
│   ├── components/         # Vue 组件
│   │   ├── HeaderComponent.vue
│   │   ├── LoadingComponent.vue
│   │   ├── LunarInfoCard.vue
│   │   └── ...            # 其他功能组件
│   ├── views/              # 页面视图
│   │   └── HomeView.vue    # 主页面
│   ├── router/             # 路由配置
│   │   └── index.js
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── electron.js             # Electron 配置
├── capacitor.config.json   # Capacitor 配置
├── vite.config.js          # Vite 配置
└── package.json            # 项目依赖和脚本
```

## 主要改进
1. **模块化结构**: 使用 Vue.js 组件化开发，提高代码可维护性
2. **字体修复**: 正确引用自定义字体文件，确保在所有平台显示一致
3. **多平台支持**: 支持 Web、Windows 和 Android 平台
4. **繁体中文**: 所有界面文本使用繁体中文，保持原有风格

## 注意事项
- 构建 Android 应用需要完整的 Android 开发环境
- Windows 构建需要在 Windows 系统上执行
- 首次运行可能需要联网加载外部资源
