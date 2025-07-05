
## 功能介紹

- 經典俄羅斯方塊玩法
- 支援鍵盤操作（左右移動、下落、旋轉、交換方塊）
- 顯示下一個方塊預覽
- 計分與消除行數顯示
- 畫面自適應，使用 Canvas 呈現遊戲區域

## 主要技術
- JavaScript (ES6)
- HTML5 Canvas
- 模組化設計（import/export）
- DOM 操作
- 鍵盤事件處理

## 操作說明

- <kbd>←</kbd>、<kbd>→</kbd>：左右移動方塊
- <kbd>↓</kbd>：方塊快速下落一格
- <kbd>Z</kbd>：逆時針旋轉方塊
- <kbd>X</kbd>：順時針旋轉方塊
- <kbd>Shift</kbd>：與預覽方塊交換

## 檔案說明

- [`index.html`](index.html)：主頁面，載入 Canvas 與腳本
- [`css/style.css`](css/style.css)：頁面與 Canvas 佈局樣式
- [`js/index.js`](js/index.js)：主程式，初始化遊戲、事件綁定與主迴圈
- [`js/grid.js`](js/grid.js)：遊戲主網格邏輯（繪製、碰撞、消行等）
- [`js/piece.js`](js/piece.js)：方塊邏輯（移動、旋轉、交換等）
- [`js/preview.js`](js/preview.js)：下一個方塊預覽區繪製
- [`js/score.js`](js/score.js)：分數與行數顯示

## 如何開始

1. 下載或 clone 此專案
2. 直接用瀏覽器開啟 [`index.html`](index.html) 即可遊玩

## 預覽畫面
![image](https://github.com/user-attachments/assets/2cf2f579-4999-4007-bce8-bf9168ae3ce5)


---

本專案僅用於學習與練習 Canvas 遊戲開發，歡迎自由修改與擴充！
