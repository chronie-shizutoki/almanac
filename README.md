# 今日黃曆

一個基於HTML/JavaScript的黃曆查詢工具，提供農曆日期、干支紀年、節氣、生肖、宜忌等傳統黃曆資訊查詢功能。

## 功能特性
- 農曆與公曆日期轉換
- 干支紀年/月/日/時顯示
- 節氣資訊查詢（含上一個/下一個節氣）
- 生肖（年/月/日/時辰）顯示
- 傳統節日提醒
- 月相資訊展示
- 暗黑模式（自動跟隨系統主題）
- 簡體自動轉換為繁體

## 依賴庫
- [lunar-javascript@1.7.2](https://github.com/6tail/lunar-javascript)：農曆計算核心庫
- [opencc-js@1.0.5](https://github.com/BYVoid/OpenCC)：簡繁體轉換庫
- Font Awesome 6.4.0：圖標庫

## 使用方法
1. 直接在瀏覽器中打開 `index.html` 檔案（需聯網加載CDN資源）
2. 首次加載會顯示加載動畫，完成後自動展示當前日期的黃曆資訊
3. 暗黑模式自動跟隨系統主題設定（無需手動切換）

## 項目結構
```
d:\huangli\
├── index.html       # 主頁面
├── main.js          # 業務邏輯
├── package.json     # 依賴管理
├── LXGWWenKai-Regular.ttf  # 字體檔案
└── README.md        # 項目說明（當前檔案）
```

## 注意事項
- 數據來源為算法計算結果，僅供參考
- 部分功能依賴網路CDN資源，離線環境可能無法正常加載
- 行動端建議使用Chrome/Safari等現代瀏覽器訪問
