// 设置当前日期
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = currentDate.toLocaleDateString('zh-CN', options);
    }
});

// 开始情书展示
function startLoveLetter() {
    const openingScreen = document.querySelector('.opening-screen');
    const letterContainer = document.querySelector('.letter-container');
    const bgMusic = document.getElementById('bgMusic');
    
    // 播放背景音乐
    bgMusic.volume = 0.6; // 设置音量为60%
    bgMusic.play().catch(error => {
        console.log('音乐播放失败，可能是浏览器策略限制:', error);
        // 显示音乐播放提示
        showMusicHint();
    });
    
    // 添加淡出动画
    openingScreen.style.animation = 'fadeOut 0.8s ease-in-out forwards';
    
    setTimeout(() => {
        openingScreen.style.display = 'none';
        letterContainer.style.display = 'block';
        
        // 触发文字淡入动画
        const paragraphs = document.querySelectorAll('.letter-content .fade-in');
        paragraphs.forEach((p, index) => {
            p.style.animationDelay = `${(index + 1) * 0.3}s`;
        });
    }, 800);
}

// 显示爱的回应
function showLoveResponse() {
    const letterContainer = document.querySelector('.letter-container');
    const responseContainer = document.querySelector('.response-container');
    const heartsContainer = document.getElementById('floating-hearts');
    
    // 显示全屏爱心雨
    heartsContainer.style.display = 'block';
    
    // 创建爱心雨效果
    createHeartRain();
    
    setTimeout(() => {
        letterContainer.style.animation = 'fadeOut 0.8s ease-in-out forwards';
        
        setTimeout(() => {
            letterContainer.style.display = 'none';
            responseContainer.style.display = 'block';
            
            // 在回应页面添加最终动画
            animateFinalHearts();
            
            // 创建蝴蝶
            createButterflies();
        }, 800);
    }, 2000);
}

// 创建爱心雨效果
function createHeartRain() {
    const heartsContainer = document.getElementById('floating-hearts');
    
    for (let i = 0; i < 30; i++) {  // 增加爱心数量以获得更好的全屏效果
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';  // 调整动画时长
            heart.style.animationDelay = Math.random() * 1 + 's';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';  // 稍微增大爱心尺寸
            heart.style.animation = 'heartFall 3s ease-in forwards';
            heart.style.zIndex = '1000';
            
            heartsContainer.appendChild(heart);
            
            // 移除爱心元素
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 150);  // 调整爱心出现的时间间隔
    }
}

// 最终页面心形动画
function animateFinalHearts() {
    const hearts = document.querySelectorAll('.final-hearts .heart-float');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = `${index * 0.5}s`;
        heart.style.animation = 'pulse 2s ease-in-out infinite';
    });
}

// 创建蝴蝶
function createButterflies() {
    const butterflyContainer = document.getElementById('butterflyContainer');
    const butterflyCount = 15;
    
    for (let i = 0; i < butterflyCount; i++) {
        setTimeout(() => {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            butterfly.innerHTML = '🦋';
            butterfly.style.left = Math.random() * 100 + '%';
            butterfly.style.top = Math.random() * 100 + '%';
            
            // 添加点击事件，点击蝴蝶进入隐藏页面
            butterfly.addEventListener('click', showHiddenPage);
            
            butterflyContainer.appendChild(butterfly);
            
            // 开始蝴蝶飞行动画
            animateButterfly(butterfly);
        }, i * 300);
    }
}

// 蝴蝶飞行动画
function animateButterfly(butterfly) {
    // 设置随机初始位置
    let posX = parseFloat(butterfly.style.left);
    let posY = parseFloat(butterfly.style.top);
    
    // 设置随机飞行速度和方向（降低速度）
    let speedX = (Math.random() - 0.5) * 0.5; // 降低速度到原来的一半
    let speedY = (Math.random() - 0.5) * 0.5; // 降低速度到原来的一半
    
    function move() {
        // 更新位置
        posX += speedX;
        posY += speedY;
        
        // 边界检测和反弹
        if (posX <= 0 || posX >= 100) {
            speedX *= -1;
        }
        if (posY <= 0 || posY >= 100) {
            speedY *= -1;
        }
        
        // 应用新位置
        butterfly.style.left = posX + '%';
        butterfly.style.top = posY + '%';
        
        // 添加轻微旋转效果
        butterfly.style.transform = `rotate(${Math.sin(Date.now() / 1000) * 10}deg)`; // 降低旋转速度
        
        // 继续动画
        requestAnimationFrame(move);
    }
    
    move();
}

// 显示隐藏页面
function showHiddenPage() {
    const hiddenPage = document.getElementById('hiddenPage');
    const bgMusic = document.getElementById('bgMusic');
    const hiddenPageMusic = document.getElementById('hiddenPageMusic');
    
    // 暂停背景音乐
    bgMusic.pause();
    
    // 播放隐藏页面音乐
    hiddenPageMusic.volume = 0.6;
    hiddenPageMusic.play().catch(error => {
        console.log('隐藏页面音乐播放失败:', error);
    });
    
    hiddenPage.style.display = 'flex';
    
    // 更新音乐按钮状态
    updateMusicButtonIcon();
}

// 关闭隐藏页面
function closeHiddenPage() {
    const hiddenPage = document.getElementById('hiddenPage');
    const bgMusic = document.getElementById('bgMusic');
    const hiddenPageMusic = document.getElementById('hiddenPageMusic');
    
    // 暂停隐藏页面音乐
    hiddenPageMusic.pause();
    
    // 恢复播放背景音乐
    bgMusic.play().catch(error => {
        console.log('背景音乐恢复播放失败:', error);
    });
    
    hiddenPage.style.display = 'none';
    
    // 更新音乐按钮状态
    updateMusicButtonIcon();
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes heartFall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    /* 鼠标悬停效果 */
    .letter-content p:hover {
        transform: translateX(5px);
        transition: transform 0.3s ease;
    }
    
    /* 背景星星效果 */
    .stars {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    }
    
    .star {
        position: absolute;
        background: white;
        border-radius: 50%;
        animation: twinkle 2s ease-in-out infinite;
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
`;

document.head.appendChild(style);

// 创建背景星星效果
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

// 页面加载完成后创建星星
document.addEventListener('DOMContentLoaded', createStars);

// 添加键盘事件监听
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const startBtn = document.querySelector('.start-btn');
        const loveBtn = document.querySelector('.love-btn');
        
        if (startBtn && startBtn.offsetParent !== null) {
            startBtn.click();
        } else if (loveBtn && loveBtn.offsetParent !== null) {
            loveBtn.click();
        }
    }
});

// 添加触摸支持
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;
    
    // 只有在特定元素上滑动才触发
    const target = e.target;
    const isButtonArea = target.closest('.start-btn') || target.closest('.love-btn');
    
    if (Math.abs(swipeDistance) > 50 && isButtonArea) {
        const startBtn = document.querySelector('.start-btn');
        const loveBtn = document.querySelector('.love-btn');
        
        if (startBtn && startBtn.offsetParent !== null) {
            startBtn.click();
        } else if (loveBtn && loveBtn.offsetParent !== null) {
            loveBtn.click();
        }
    }
});

// 添加页面可见性检测
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面重新可见，重新触发一些动画
        const hearts = document.querySelectorAll('.heart-float');
        hearts.forEach(heart => {
            heart.style.animation = 'none';
            setTimeout(() => {
                heart.style.animation = '';
            }, 10);
        });
    }
});

// 添加窗口大小改变时的响应
window.addEventListener('resize', function() {
    // 可以在这里添加响应式调整逻辑
    const container = document.querySelector('.container');
    if (window.innerWidth < 768) {
        container.style.padding = '10px';
    } else {
        container.style.padding = '20px';
    }
});

// 显示音乐播放提示
function showMusicHint() {
    const hint = document.createElement('div');
    hint.innerHTML = '🎵 点击任意位置启用音乐播放';
    hint.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 107, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 1000;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.remove();
    }, 3000);
}

// 添加音乐控制按钮
function addMusicControls() {
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '🎵';
    musicBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    const bgMusic = document.getElementById('bgMusic');
    const hiddenPageMusic = document.getElementById('hiddenPageMusic');
    
    musicBtn.onclick = function() {
        // 判断当前哪个音频在播放，控制对应的音频
        if (hiddenPageMusic && hiddenPageMusic.style.display !== 'none' && !hiddenPageMusic.paused) {
            // 隐藏页面音乐正在播放
            if (!hiddenPageMusic.paused) {
                hiddenPageMusic.pause();
                musicBtn.innerHTML = '🔇';
            } else {
                hiddenPageMusic.play().catch(() => showMusicHint());
                musicBtn.innerHTML = '🎵';
            }
        } else {
            // 默认控制背景音乐
            if (!bgMusic.paused) {
                bgMusic.pause();
                musicBtn.innerHTML = '🔇';
            } else {
                bgMusic.play().catch(() => showMusicHint());
                musicBtn.innerHTML = '🎵';
            }
        }
    };
    
    document.body.appendChild(musicBtn);
    
    // 监听音频播放状态变化，更新按钮图标
    bgMusic.addEventListener('play', updateMusicButtonIcon);
    bgMusic.addEventListener('pause', updateMusicButtonIcon);
    hiddenPageMusic.addEventListener('play', updateMusicButtonIcon);
    hiddenPageMusic.addEventListener('pause', updateMusicButtonIcon);
}

// 更新音乐按钮图标
function updateMusicButtonIcon() {
    const musicBtn = document.querySelector('button[style*="position: fixed"]');
    const bgMusic = document.getElementById('bgMusic');
    const hiddenPageMusic = document.getElementById('hiddenPageMusic');
    
    // 判断当前是否有音频在播放
    if (!bgMusic.paused || (hiddenPageMusic && !hiddenPageMusic.paused)) {
        musicBtn.innerHTML = '🎵';
    } else {
        musicBtn.innerHTML = '🔇';
    }
}

// 页面加载完成后添加音乐控制
document.addEventListener('DOMContentLoaded', addMusicControls);