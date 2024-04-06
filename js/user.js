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
                updateJobCountInTabs();
            });
        })(i);
    }

    hideAllContents();
    tabs[0].classList.add('active');
    contents[0].style.display = 'block';
    updateJobCountInTabs();

    function updateJobCountInTabs() {
        for (var i = 0; i < tabs.length; i++) {
            var content = contents[i];
            var jobList = content.querySelector('ul');
            var count = jobList.children.length;
            var span = tabs[i].querySelector('span');
            span.textContent = count;
        }
    }

    var cont1 = document.querySelector('.cont1');
    var interestList = cont1.querySelector('ul');

    cont1.addEventListener('click', function (event) {
        if (event.target.classList.contains('cont_dislike')) {
            var li = event.target.closest('li');
            if (li) {
                li.remove();
                updateJobCountInTabs();
            }
        }
    });

    var chat = document.querySelector('.chat');
    chat.addEventListener('click', function () {
        window.location.href = 'chat.html';
    });

    var top4 = document.querySelector('.top4');
    top4.addEventListener('click', function () {
        window.location.href = 'resu.html';
    });

    var mainLefts = document.querySelectorAll('.main_left');
    mainLefts.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'job.html';
        });
    });

    var mainRights = document.querySelectorAll('.main_right');
    mainRights.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'comp.html';
        });
    });

    var contChats = document.querySelectorAll('.cont_chat');
    contChats.forEach(function (e) {
        e.addEventListener('click', function () {
            window.location.href = 'chat.html';
        });
    });


});