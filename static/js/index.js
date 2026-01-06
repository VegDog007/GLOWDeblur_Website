window.HELP_IMPROVE_VIDEOJS = false;

// --------------------------------------------------------
// Helper Functions
// --------------------------------------------------------

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            button.classList.remove('active');
        }
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            button.classList.remove('active');
        }
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        const textToCopy = bibtexElement.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Copied!';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                button.classList.add('copied');
                copyText.textContent = 'Copied!';
                setTimeout(function() {
                    button.classList.remove('copied');
                    copyText.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

// --------------------------------------------------------
// Initialization
// --------------------------------------------------------

$(document).ready(function() {
    
    // 1. Initialize Visual Results Carousel (Images)
    // 开启自动播放，适合展示图片
    var carousels = bulmaCarousel.attach('#results-carousel', {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pagination: true,
    });

    // 2. Initialize Quantitative & Motivation Carousels (Tables/Text)
    // 关闭自动播放 (autoplay: false)，防止用户阅读表格时自动跳转
    // 同时开启分页点 (pagination: true) 方便切换
    var tableCarousels = bulmaCarousel.attach('#quantitative-carousel, #motivation-carousel', {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: false, // 重要：表格不自动轮播
        pagination: true,
    });

    // Initialize Sliders (Comparison sliders if any)
    bulmaSlider.attach();
    
    // Setup video autoplay
    setupVideoCarouselAutoplay();
});
