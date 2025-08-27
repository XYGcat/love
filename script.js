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
    
    // 创建爱心雨效果
    createHeartRain();
    
    setTimeout(() => {
        letterContainer.style.animation = 'fadeOut 0.8s ease-in-out forwards';
        
        setTimeout(() => {
            letterContainer.style.display = 'none';
            responseContainer.style.display = 'block';
            
            // 在回应页面添加最终动画
            animateFinalHearts();
        }, 800);
    }, 2000);
}

// 创建爱心雨效果
function createHeartRain() {
    const heartsContainer = document.getElementById('floating-hearts');
    heartsContainer.style.display = 'block';
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animation = 'heartFall 3s ease-in forwards';
            
            heartsContainer.appendChild(heart);
            
            // 移除爱心元素
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
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
    
    if (Math.abs(swipeDistance) > 50) {
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
    
    let isPlaying = true;
    
    musicBtn.onclick = function() {
        const bgMusic = document.getElementById('bgMusic');
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '🔇';
        } else {
            bgMusic.play().catch(() => showMusicHint());
            musicBtn.innerHTML = '🎵';
        }
        isPlaying = !isPlaying;
    };
    
    document.body.appendChild(musicBtn);
}

// 页面加载完成后添加音乐控制
document.addEventListener('DOMContentLoaded', addMusicControls);