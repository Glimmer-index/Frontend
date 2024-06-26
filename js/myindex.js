

document.addEventListener('DOMContentLoaded', function () {
    // 搜索框点击隐藏文字
    var searchInputs = document.querySelectorAll('.searchInput');
    searchInputs.forEach(function (input) {
        input.onfocus = function () {
            if (this.value === '搜索职位、公司') {
                this.value = '';
            }
            this.style.color = '#333';
        };
        input.onblur = function () {
            if (this.value === '') {
                this.value = '搜索职位、公司';
            }
            this.style.color = 'gray';
        };
    });

    var searchTypeLinks = document.querySelectorAll('.searchType');

    searchTypeLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认跳转行为

            var contSpan = this.querySelector('.searchType_cont');
            var linkText = contSpan.textContent.trim();
            var newText = '';
            if (linkText === '职位搜索') {
                newText = '公司搜索';
            } else {
                newText = '职位搜索';
            }
            contSpan.textContent = newText;
        });
    });


    // mid左右按钮切换页
    var job = document.querySelector('.job');
    var pages = job.querySelectorAll('ul');
    var leftBtn = document.querySelector('.left_btn');
    var rightBtn = document.querySelector('.right_btn');
    var pageIndex = 0;
    var pageIndicator = document.querySelector('.page');

    function updatePageIndicator() {
        pageIndicator.textContent = (pageIndex + 1) + ' / ' + pages.length;
    }

    for (var i = 0; i < pages.length; i++) {
        pages[i].setAttribute('pageIndex', i);
    }

    leftBtn.onclick = function () {
        if (pageIndex > 0) {
            pages[pageIndex].style.display = 'none';
            pageIndex -= 1;
            pages[pageIndex].style.display = 'block';
            updatePageIndicator();
        }
    };

    rightBtn.onclick = function () {
        if (pageIndex < pages.length - 1) {
            pages[pageIndex].style.display = 'none';
            pageIndex += 1;
            pages[pageIndex].style.display = 'block';
            updatePageIndicator();
        }
    };

    updatePageIndicator();


    // 轮播图控制与mid右侧悬停显示  切换按钮的展示与隐藏
    var slides = document.querySelectorAll('.mid_right .slide');
    var currentSlide = 0;
    var slideInterval = setInterval(nextSlide, 3000);

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        updateDots();
    }

    function prevSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        updateDots();
    }

    document.querySelector('.mid_right .prev').addEventListener('click', function () {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 3000);
    });

    document.querySelector('.mid_right .next').addEventListener('click', function () {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 3000);
    });

    var dots = document.querySelectorAll('.mid_right .dot');
    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            clearInterval(slideInterval);
            goToSlide(index);
            slideInterval = setInterval(nextSlide, 3000);
        });
    });

    function updateDots() {
        dots.forEach(function (dot, index) {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        updateDots();
    }

    updateDots();

    const controls = document.querySelector('.mid_right .controls');
    const dotsContainer = document.querySelector('.mid_right .dots');

    function toggleControlsAndDots(display) {
        controls.style.display = display;
        dotsContainer.style.display = display;
    }

    function setupJobDetails(pages) {
        pages.forEach((page, pageIndex) => {
            const jobs = document.querySelectorAll(`.page${pageIndex + 1} li`);
            const exPage = document.querySelectorAll(`.page${pageIndex + 1}_ex > div`);

            function hideAllEx() {
                exPage.forEach(ex => ex.style.display = 'none');
            }

            jobs.forEach((job, index) => {
                job.addEventListener('mouseenter', () => {
                    hideAllEx();
                    exPage[index].style.display = 'block';
                    toggleControlsAndDots('none');
                });
            });

            const mid = document.querySelector('.mid');
            const jobBottom = document.querySelector('.job_bottom');

            mid.addEventListener('mouseleave', () => {
                hideAllEx();
                toggleControlsAndDots('block');
            });

            jobBottom.addEventListener('mouseenter', hideAllEx);
        });
    }

    setupJobDetails([1, 2, 3, 4]);

    // 头部固定
    var shortcut = document.querySelector('.shortcut');
    var searchFixed = document.querySelector('.search_fixed');
    var triggerPoint = document.querySelector('.mid').offsetTop;

    function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    window.addEventListener('scroll', function () {
        if (getScrollTop() >= triggerPoint) {
            shortcut.classList.add('fixed');
            searchFixed.style.display = 'block';
        } else {
            shortcut.classList.remove('fixed');
            searchFixed.style.display = 'none';
        }
    });

    // main切换
    var tabs = document.querySelector('.tab_list1').querySelectorAll('li');
    var contents = document.querySelectorAll('.tab_contX');

    tabs[0].classList.add('active');
    contents[0].style.display = 'block';

    tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (otherTab) {
                otherTab.classList.remove('active');
            });
            tab.classList.add('active');

            contents.forEach(function (content) {
                content.style.display = 'none';
            });
            contents[index].style.display = 'block';
        });
    });







    // 搜索框联想
    document.querySelector('#searchInput111').addEventListener('input', function () {
        const inputVal = this.value.trim();
        const searchEx = document.querySelector('.search_ex');
        const listItems = searchEx.querySelectorAll('li');
        let hasMatch = false;

        if (inputVal) {
            listItems.forEach(li => {
                const match = li.textContent.includes(inputVal);
                if (match) {
                    hasMatch = true;

                    const regExp = new RegExp(inputVal, 'gi');
                    li.innerHTML = li.textContent.replace(regExp, `<span style="color: #47a7f5;">$&</span>`);
                    li.style.display = 'block';
                } else {
                    li.style.display = 'none';
                }
            });

            searchEx.style.display = hasMatch ? 'block' : 'none';
        } else {
            searchEx.style.display = 'none';
            listItems.forEach(li => {
                li.style.display = 'none';
                li.innerHTML = li.textContent;
            });
        }
    });


    document.querySelector('#searchInput222').addEventListener('input', function () {
        const inputVal = this.value.trim();
        const searchEx = document.querySelector('.search_ex2');
        const listItems = searchEx.querySelectorAll('li');
        let hasMatch = false;

        if (inputVal) {
            listItems.forEach(li => {
                const match = li.textContent.includes(inputVal);
                if (match) {
                    hasMatch = true;

                    const regExp = new RegExp(inputVal, 'gi');
                    li.innerHTML = li.textContent.replace(regExp, `<span style="color: #47a7f5;">$&</span>`);
                    li.style.display = 'block';
                } else {
                    li.style.display = 'none';
                }
            });

            searchEx.style.display = hasMatch ? 'block' : 'none';
        } else {
            searchEx.style.display = 'none';
            listItems.forEach(li => {
                li.style.display = 'none';
                li.innerHTML = li.textContent;
            });
        }
    });



    var contTops = document.querySelectorAll('.cont_top');

    contTops.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'job.html';
        });
    });

    var contBottoms = document.querySelectorAll('.cont_bottom');

    contBottoms.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'comp.html';
        });
    });

    var more1 = document.querySelector('.more1');
    more1.addEventListener('click', function () {
        window.location.href = 'search.html';
    });

    var compHeaders = document.querySelectorAll('.comp_header');
    compHeaders.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'comp.html';
        });
    });

    var compJobs = document.querySelectorAll('.comp_job');
    compJobs.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'job.html';
        });
    });

    var more2 = document.querySelector('.more2');
    more2.addEventListener('click', function () {
        window.location.href = 'search_comp.html';
    });

    var compMores = document.querySelectorAll('.comp_more');
    compMores.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'comp-job.html';
        });
    });


    var topChats = document.querySelectorAll('.top_chat');
    topChats.forEach(function (e) {
        // 子元素阻止冒泡
        e.addEventListener('click', function (event) {
            event.stopPropagation();
            window.location.href = 'chat.html';
        });
    });

    var compJobChats = document.querySelectorAll('.comp_job_chat');
    compJobChats.forEach(function (e) {
        e.addEventListener('click', function (event) {
            event.stopPropagation();
            window.location.href = 'chat.html';
        });
    });

});