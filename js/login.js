document.addEventListener("DOMContentLoaded", function () {
    var choices = document.querySelectorAll('.choice_ul li');
    var joberContent = document.querySelector('.jober');
    var bossContent = document.querySelector('.boss');

    choices.forEach(function (choice) {
        choice.addEventListener('click', function () {
            choices.forEach(function (c) {
                c.classList.remove('active');
            });
            this.classList.add('active');

            joberContent.classList.remove('active');
            bossContent.classList.remove('active');

            if (this.textContent.trim() === '我要找工作') {
                joberContent.classList.add('active');
            } else if (this.textContent.trim() === '我要招聘') {
                bossContent.classList.add('active');
            }
        });
    });

    const button = document.querySelector(".input_btn button");

    button.addEventListener("click", function () {
        const activeIndex = Array.from(choices).findIndex(li => li.classList.contains("active"));

        if (activeIndex === 0) {
            window.location.href = "reco.html";
        } else if (activeIndex === 1) {
            window.location.href = "boss_user.html";
        }
    });
});
