const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 源图像路径
const sourceImage = path.join(__dirname, '../upload/1000011012.jpg');

// 目标尺寸和文件名
const sizes = [
  { width: 192, height: 192, name: 'myicon-192x192.png' },
  { width: 512, height: 512, name: 'myicon-512x512.png' },
  { width: 144, height: 144, name: 'myicon-144x144.png' },
  { width: 72, height: 72, name: 'launch.png' }
];

// 确保目标目录存在
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 处理每个尺寸
async function processImages() {
  try {
    for (const size of sizes) {
      const outputPath = path.join(publicDir, size.name);
      await sharp(sourceImage)
        .resize(size.width, size.height)
        .toFile(outputPath);
      console.log(`生成图标: ${size.name}`);
    }
    console.log('所有图标生成完成');
  } catch (error) {
    console.error('图标生成错误:', error);
  }
}

processImages();
