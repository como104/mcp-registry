# Hero 组件图片轮播技术方案

## 1. 项目结构

```
项目根目录/
├── public/
│   └── images/
│       └── hero/    // hero 组件的图片资源
└── templates/
    └── tailspark/
        └── landing/
            ├── components/
            │   └── hero/
            │       ├── index.tsx
            │       └── HeroSlider.tsx
            ├── types/
            │   └── index.ts
            └── config/
                └── hero.ts
```

## 2. 技术选型

- **核心库**: Swiper.js
- **图片处理**: Next.js Image 组件
- **样式方案**: Tailwind CSS
- **类型系统**: TypeScript

## 3. 组件结构

### 3.1 类型定义 (types/index.ts)

```typescript
export interface HeroSlide {
  imageUrl: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  title: string;
  description: string;
  sponsorLink?: string;
}
```

### 3.2 配置文件 (config/hero.ts)

```typescript
export const HERO_CONFIG = {
  autoplayDelay: 5000,
  transitionSpeed: 1000,
  imageQuality: 85,
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
  },
};
```

## 4. 核心功能实现

### 4.1 图片优化策略

- 使用 Next.js Image 组件
- 实现响应式图片加载
- 添加图片预加载
- 实现加载失败后备方案

### 4.2 性能优化

- 首图优先加载 (priority)
- 图片懒加载
- 自适应图片质量
- 预加载下一张图片

### 4.3 可访问性

- ARIA 属性支持
- 键盘导航
- 屏幕阅读器支持

### 4.4 错误处理

- 图片加载失败处理
- 后备图片方案
- 错误边界处理

## 5. 代码示例

### 5.1 HeroSlider 组件

```typescript
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { HERO_CONFIG } from "../config/hero";
import type { HeroSlide } from "../types";

export const HeroSlider: React.FC<{ slides: HeroSlide[] }> = ({ slides }) => {
  // 预加载逻辑
  useEffect(() => {
    const preloadNextImage = (currentIndex: number) => {
      const nextIndex = (currentIndex + 1) % slides.length;
      const img = new Image();
      img.src = slides[nextIndex].imageUrl.desktop;
    };
  }, []);

  return (
    <div role="region" aria-label="Hero image carousel">
      <Swiper
        autoplay={{ delay: HERO_CONFIG.autoplayDelay }}
        speed={HERO_CONFIG.transitionSpeed}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide.imageUrl.desktop}
              alt={slide.title}
              priority={index === 0}
              quality={HERO_CONFIG.imageQuality}
              fill
              sizes="100vw"
              onError={handleImageError}
            />
            {/* 轮播内容 */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
```

## 6. SEO 优化

```typescript
const HeroSection: React.FC = () => {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "MCP Servers Showcase",
          // 其他 SEO 相关数据
        })}
      </script>
      <HeroSlider slides={heroSlides} />
    </>
  );
};
```

## 7. 测试策略

```typescript
// __tests__/components/hero/HeroSlider.test.tsx
describe("HeroSlider", () => {
  it("should render all slides", () => {
    // 测试轮播渲染
  });

  it("should handle image loading errors", () => {
    // 测试错误处理
  });

  it("should preload next image", () => {
    // 测试预加载功能
  });
});
```

## 8. 实施步骤

1. 环境准备

   - 安装依赖
   - 创建目录结构
   - 准备图片资源

2. 基础实现

   - 创建类型定义
   - 实现基础组件
   - 添加配置文件

3. 优化阶段

   - 实现图片优化
   - 添加错误处理
   - 实现预加载

4. 测试与部署
   - 单元测试
   - 性能测试
   - 部署优化

## 9. 注意事项

1. 图片资源要求

   - 建议尺寸：1920x1080（桌面端）
   - 格式：WEBP/JPG
   - 移动端尺寸：750x1334
   - 平板尺寸：1024x1366

2. 性能考虑

   - 图片压缩优化
   - 预加载策略
   - 缓存策略

3. 可访问性
   - 键盘导航支持
   - 屏幕阅读器支持
   - 高对比度支持
