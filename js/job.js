

document.addEventListener('DOMContentLoaded', function () {
    // 头部固定

    const topElement = document.querySelector('.top');
    let topHeight = topElement.offsetHeight;
    let topVisible = true;

    window.addEventListener('scroll', function () {
        if (window.scrollY > topHeight && topVisible) {
            topElement.classList.add('sticky');
            topVisible = false;
        } else if (window.scrollY <= topHeight && !topVisible) {
            topElement.classList.remove('sticky');
            topVisible = true;
        }
    });



    // 收藏
    var likeBtn = document.querySelector('.top_like');
    var likeIcon = likeBtn.querySelector('span');
    var isLiked = false;

    likeBtn.addEventListener('mouseenter', function () {
        likeIcon.textContent = isLiked ? '' : '';
    });

    likeBtn.addEventListener('mouseleave', function () {
        likeIcon.textContent = isLiked ? '' : '';
    });

    likeBtn.addEventListener('click', function () {
        isLiked = !isLiked;
        if (isLiked) {
            likeIcon.textContent = ''; // 已收藏的图标
            likeBtn.textContent = '已收藏';
            likeBtn.insertBefore(likeIcon, likeBtn.firstChild);
        } else {
            likeIcon.textContent = ''; // 原始图标
            likeBtn.textContent = '感兴趣';
            likeBtn.insertBefore(likeIcon, likeBtn.firstChild);
        }



    });

    // const advBtn = document.querySelector('.adv_btn');
    // const adv = document.querySelector('.adv');
    // const advContent = adv.querySelectorAll('.adv_cont, .adv_title');
    // let isLoading = false;

    // advBtn.addEventListener('click', function () {
    //     if (isLoading) {
    //         return;
    //     }

    //     isLoading = true;
    //     advBtn.classList.add('loading');

    //     if (adv.style.display === 'none') {
    //         setTimeout(function () {
    //             adv.style.display = 'block';
    //             advBtn.innerHTML = '点击收起职业发展建议<span></span>';

    //             let index = 0;
    //             const showNextLine = setInterval(function () {
    //                 if (index < advContent.length) {
    //                     advContent[index].style.display = 'block';
    //                     index++;
    //                 } else {
    //                     clearInterval(showNextLine);
    //                     advBtn.classList.remove('loading');
    //                     isLoading = false;
    //                 }
    //             }, 100); 
    //         }, 1000);
    //     } else {
    //         advContent.forEach((item) => {
    //             item.style.display = 'none';
    //         });
    //         adv.style.display = 'none';
    //         advBtn.innerHTML = '点击获取职业发展建议<span></span>';
    //         advBtn.classList.remove('loading');
    //         isLoading = false;
    //     }
    // });


    const advBtn = document.querySelector('.adv_btn');
    const adv = document.querySelector('.adv');
    const advContent = adv.querySelectorAll('.adv_cont, .adv_title');
    const advListItems = adv.querySelectorAll('.adv_cont li');
    let isLoading = false;

    advBtn.addEventListener('click', function () {
        if (isLoading) {
            return;
        }

        isLoading = true;
        advBtn.classList.add('loading');

        if (adv.style.display === 'none') {
            setTimeout(function () {
                adv.style.display = 'block';
                advBtn.innerHTML = '点击收起职业发展建议<span></span>';

                let index = 0;
                const showNextLine = setInterval(function () {
                    if (index < advContent.length) {
                        advContent[index].style.display = 'block';
                        index++;
                    } else {
                        let listIndex = 0;
                        const showNextListItem = setInterval(function () {
                            if (listIndex < advListItems.length) {
                                advListItems[listIndex].style.display = 'block';
                                listIndex++;
                            } else {
                                clearInterval(showNextListItem);
                                clearInterval(showNextLine);
                                advBtn.classList.remove('loading');
                                isLoading = false;
                            }
                        }, 100); // li延时
                    }
                }, 100); // 标题延时
            }, 1000); // 加载延时
        } else {
            advContent.forEach((item) => {
                item.style.display = 'none';
            });
            advListItems.forEach((item) => {
                item.style.display = 'none';
            });
            adv.style.display = 'none';
            advBtn.innerHTML = '点击获取职业发展建议<span></span>';
            advBtn.classList.remove('loading');
            isLoading = false;
        }
    });


    var chat = document.querySelector('.chat');
    chat.addEventListener('click', function () {
        window.location.href = 'chat.html';
    });

    var topChat = document.querySelector('.top_chat');
    topChat.addEventListener('click', function () {
        window.location.href = 'chat.html';
    });

    var compMore = document.querySelector('.comp_more');
    compMore.addEventListener('click', function () {
        window.location.href = 'comp-job.html';
    });

    var compTop = document.querySelector('.comp_top');
    compTop.addEventListener('click', function () {
        window.location.href = 'comp.html';
    });

    var sameLooks = document.querySelectorAll('.same_look');
    sameLooks.forEach(function (e) {
        e.addEventListener('click', function (event) {
            event.stopPropagation();
            window.location.href = 'job.html';
        });
    });

    var sameMore = document.querySelector('.same_more');
    sameMore.addEventListener('click', function () {
        window.location.href = 'search.html';
    });

});