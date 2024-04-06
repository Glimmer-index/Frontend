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

    // 展开
    var expanded = false;
    var companyText = document.getElementById("company_text");
    var expandBtn = document.getElementById("expand_btn");

    expandBtn.addEventListener("click", function () {
        expanded = !expanded;
        if (expanded) {
            companyText.style.maxHeight = "none";
            expandBtn.innerHTML = '收起<span></span>';
        } else {
            companyText.style.maxHeight = "113px";
            expandBtn.innerHTML = '展开<span></span>';
        }
    });

    // 展开2
    var expanded2 = false;
    var companyText2 = document.getElementById("company_text2");
    var expandBtn2 = document.getElementById("expand_btn2");

    expandBtn2.addEventListener("click", function () {
        expanded2 = !expanded2;
        if (expanded2) {
            companyText2.style.maxHeight = "none";
            expandBtn2.innerHTML = '收起<span></span>';
        } else {
            companyText2.style.maxHeight = "200px";
            expandBtn2.innerHTML = '查看更多信息<span></span>';
        }
    });


    // 地图显示
    var locTitles = document.querySelectorAll('.loca_x_title');
    var maps = document.querySelectorAll('.loca_x_img');

    locTitles.forEach(function (title, index) {
        title.addEventListener('click', function () {
            maps.forEach(function (map) {
                map.style.display = 'none';
            });
            locTitles.forEach(function (title) {
                title.classList.remove('selected');
                title.querySelector('span').classList.remove('selected');
            });
            maps[index].style.display = 'block';
            title.classList.add('selected');
            title.querySelector('span').classList.add('selected');
        });
    });


    var chat = document.querySelector('.chat');
    chat.addEventListener('click', function () {
        window.location.href = 'chat.html';
    });

    var hotLis = document.querySelectorAll('.hot_li');
    hotLis.forEach(function (e) {
        e.addEventListener('click', function (event) {
            event.stopPropagation();
            window.location.href = 'job.html';
        });
    });

    var tabJob = document.querySelector('.tab_job');
    tabJob.addEventListener('click', function () {
        window.location.href = 'comp-job.html';
    });

    var hotMores = document.querySelector('.hot_more');
    hotMores.addEventListener('click', function () {
        window.location.href = 'comp-job.html';
    });

    var hrMores = document.querySelector('.hr_more');
    hrMores.addEventListener('click', function () {
        window.location.href = 'comp-job.html';
    });


});

