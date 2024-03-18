document.addEventListener('DOMContentLoaded', function () {


    // tab切换
    var tabs = document.querySelector('.tab ul').children;
    var contents = document.querySelectorAll('.main .w > div');

    function hideAllContents() {
        for (var i = 0; i < contents.length; i++) {
            contents[i].style.display = 'none';
        }
    }

    function deactivateAllTabs() {
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }
    }

    for (var i = 0; i < tabs.length; i++) {
        (function (index) {
            tabs[index].addEventListener('click', function () {
                hideAllContents();
                deactivateAllTabs();
                contents[index].style.display = 'block';
                tabs[index].classList.add('active');
                updateJobCountInTabs(); // 更新标签页中的职位数量
            });
        })(i);
    }

    hideAllContents();
    tabs[0].classList.add('active');
    contents[0].style.display = 'block';
    updateJobCountInTabs(); // 初始化时更新标签页中的职位数量

    // 更新标签页中的职位数量
    function updateJobCountInTabs() {
        for (var i = 0; i < tabs.length; i++) {
            var content = contents[i];
            var jobList = content.querySelector('ul');
            var count = jobList.children.length;
            var span = tabs[i].querySelector('span');
            span.textContent = count;
        }
    }

    // 取消感兴趣
    var cont1 = document.querySelector('.cont1');
    var interestList = cont1.querySelector('ul');

    cont1.addEventListener('click', function (event) {
        if (event.target.classList.contains('cont_dislike')) {
            var li = event.target.closest('li');
            if (li) {
                li.remove();
                updateJobCountInTabs(); // 更新标签页中的职位数量
            }
        }
    });

});