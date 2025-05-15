#!/bin/bash

# 创建必要的目录
mkdir -p public/images/hero

# Image URLs
IMAGE_URL_1="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"
IMAGE_URL_2="https://pic.90sheji.com/back_origin_pic/05/74/43/7e01ac97ea7853db23114d3b3fc078af.jpg!/fh/465/quality/90/unsharp/true/compress/true/canvas/1000x465a0a0/cvscolor/FFFFFFFF"
FALLBACK_IMAGE_URL="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920"

# 下载图片
curl -L -o public/images/hero/slide-1.jpg $IMAGE_URL_1
curl -L -o public/images/hero/slide-2.jpg $IMAGE_URL_2
curl -L -o public/images/hero/fallback.jpg $FALLBACK_IMAGE_URL

echo "图片下载完成！" 