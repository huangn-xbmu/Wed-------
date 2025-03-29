<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>遇香坊 | 新鲜烘焙</title>
    <style>
        :root {
            --primary-color: #FFD700;    /* 主色调 - 温暖的金黄色 */
            --secondary-color: #8B4513;  /* 辅助色 - 深棕色 */
            --accent-color: #FF4500;     /* 强调色 - 橙红色 */
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }

        /* 导航样式 */
        nav {
            background: var(--primary-color);
            padding: 1rem;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 100;
        }

        nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
        }

        nav li {
            margin: 0 2rem;
        }

        nav a {
            color: var(--secondary-color);
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
        }

        nav a:hover {
            color: var(--accent-color);
        }

        /* 主视觉区域 */
        .hero {
            height: 100vh;
            background: linear-gradient(rgba(255,215,0,0.1), rgba(139,69,19,0.3)),
                        url('https://images.unsplash.com/photo-1509440159596-0249088772ff') center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin-top: 60px;
        }

        .hero-content h1 {
            font-size: 3rem;
            color: var(--secondary-color);
            margin-bottom: 1rem;
        }

        .cta-button {
            background: var(--accent-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            text-decoration: none;
            transition: transform 0.3s;
        }

        .cta-button:hover {
            transform: scale(1.05);
        }

        /* 产品展示区 */
        .products {
            padding: 4rem 2rem;
            background: #FFF8DC;
        }

        .product-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .product-card {
            width: 300px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .product-image {
            height: 200px;
            background-size: cover;
            background-position: center;
        }

        .product-info {
            padding: 1.5rem;
            text-align: center;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            nav ul {
                flex-direction: column;
                text-align: center;
            }
            
            nav li {
                margin: 0.5rem 0;
            }
            
            .hero-content h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <nav>
        <ul>
            <li><a href="#home">首页</a></li>
            <li><a href="#products">产品</a></li>
            <li><a href="#about">关于我们</a></li>
            <li><a href="#contact">联系</a></li>
        </ul>
    </nav>

    <section class="hero" id="home">
        <div class="hero-content">
            <h1>新鲜烘焙 每日现做</h1>
            <a href="#products" class="cta-button">查看今日特供</a>
        </div>
    </section>

    <section class="products" id="products">
        <div class="product-grid">
            <div class="product-card">
                <div class="product-image" style="background-image: url('https://images.unsplash.com/photo-1586444248902-2f64eddc13df')"></div>
                <div class="product-info">
                    <h3>法式可颂</h3>
                    <p>16层酥皮工艺 每日现烤</p>
                    <p class="price">¥18</p>
                </div>
            </div>
            <!-- 更多产品卡片... -->
        </div>
    </section>

    <footer style="background: var(--secondary-color); color: white; padding: 2rem; text-align: center;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <p>营业时间：每日 9:00 - 20:00</p>
            <p>地址：甘肃省兰州市烘焙路123号</p>
            <div style="margin-top: 1rem;">
                <a href="#" style="color: var(--primary-color); margin: 0 1rem;">微信公众号</a>
                <a href="#" style="color: var(--primary-color); margin: 0 1rem;">抖音</a>
                <a href="#" style="color: var(--primary-color); margin: 0 1rem;">小红书</a>
            </div>
        </div>
    </footer>
</body>
</html>
