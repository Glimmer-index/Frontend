document.addEventListener("DOMContentLoaded", function () {

    // 头像
    var infoImg = document.getElementById("info_img");
    var overlay = document.getElementById("overlay");

    infoImg.addEventListener("click", function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                var imgSrc = event.target.result;
                var img = infoImg.querySelector('img');
                img.src = imgSrc;
                img.onload = function () {
                    var aspectRatio = this.width / this.height;
                    var maxWidth = infoImg.offsetWidth;
                    var maxHeight = infoImg.offsetHeight;
                    var width = maxWidth;
                    var height = maxHeight;
                    if (aspectRatio > 1) {
                        height = maxWidth / aspectRatio;
                    } else {
                        width = maxHeight * aspectRatio;
                    }
                    this.style.width = width + 'px';
                    this.style.height = height + 'px';
                };
            };
            reader.readAsDataURL(file);
        };
        input.click();
    });




    // 带抖动的导航
    const navItems = document.querySelectorAll('.left ul li');

    const targetElements = [
        document.querySelector('.mid_info'),
        document.querySelector('.mid_adv'),
        document.querySelector('.mid_wish'),
        document.querySelector('.mid_exp'),
        document.querySelector('.mid_proj'),
        document.querySelector('.mid_edu'),
        document.querySelector('.mid_my')
    ];

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const targetElement = targetElements[index];

            targetElement.classList.add('shake');

            setTimeout(() => {
                targetElement.classList.remove('shake');
            }, 1000);

            const targetPosition = targetElement.offsetTop - 100;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });





    // 动态个人信息的获取和设置
    var infoName = document.querySelector('.info_name');
    var infoSex = document.getElementById('infoSex');
    var infoState = document.getElementById('infoState');
    var infoTel = document.getElementById('infoTel');
    var infoBirth = document.getElementById('infoBirth');
    var infoWechat = document.querySelector('.info_wechat span:last-child');
    var infoMail = document.querySelector('.info_mail span:last-child');

    var nameInput = document.querySelector('input[name="name"]');
    var sexInputs = document.querySelectorAll('input[name="sex"]');
    var stateSelect = document.querySelector('select[name="state"]');
    var telInput = document.querySelector('input[name="tel"]');
    var birthInput = document.querySelector('input[name="birth"]');
    var emailInput = document.querySelector('input[name="email"]');
    var wechatInput = document.querySelector('input[name="wechat"]');

    var infoChange = document.querySelector('.info_change');
    var midInfoEx = document.querySelector('.mid_info_ex');
    var infoBtnNo = document.querySelector('.info_btn_no');
    var infoBtnYes = document.querySelector('.info_btn_yes');



    var paySelect = document.querySelector('select[name="pay"]');
    var infoPay = document.getElementById('infoPay');


    var sexMap = {
        "man": "男",
        "woman": "女"
    };

    function calculateAge(birthDateString) {
        var today = new Date();
        var birthDate = new Date(birthDateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function validateTel(tel) {
        var telRegex = /^1[3-9]\d{9}$/;
        return telRegex.test(tel);
    }

    function validateEmail(email) {
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }

    infoChange.addEventListener("click", function () {
        midInfoEx.style.display = "block";

        nameInput.value = infoName.textContent.trim();
        sexInputs.forEach(function (input) {
            if (input.value === sexMap[infoSex.textContent.trim().toLowerCase()]) {
                input.checked = true;
            }
        });
        stateSelect.value = infoState.textContent.trim();
        telInput.value = infoTel.textContent.trim();
        emailInput.value = infoMail && infoMail.parentNode.style.display !== 'none' ? infoMail.textContent : '';
        wechatInput.value = infoWechat && infoWechat.parentNode.style.display !== 'none' ? infoWechat.textContent : '';
        paySelect.value = infoPay.textContent.trim();
    });



    infoBtnNo.addEventListener("click", function (event) {
        event.preventDefault();
        midInfoEx.style.display = "none";
        emailInput.value = '';
        wechatInput.value = '';
        birthInput.value = '';
    });

    infoBtnYes.addEventListener("click", function (event) {
        event.preventDefault();

        if (!birthInput.value) {
            alert("出生日期是必选项！");
            return;
        }

        if (!paySelect.value) {
            alert("期望薪资是必选项！");
            return;
        }

        var age = calculateAge(birthInput.value);
        if (isNaN(age)) {
            alert("请提供有效的出生日期！");
            return;
        } else {
            infoBirth.textContent = age + "岁";
        }

        if (!nameInput.value.trim()) {
            alert("姓名不能为空！");
            return;
        }

        if (!validateTel(telInput.value)) {
            alert("请输入有效的电话号码！");
            return;
        }

        if (emailInput.value && !validateEmail(emailInput.value)) {
            alert("请输入有效的邮箱地址！");
            return;
        }

        infoName.textContent = nameInput.value.trim();
        infoSex.textContent = sexMap[document.querySelector('input[name="sex"]:checked').value];
        infoState.textContent = stateSelect.value;
        infoTel.textContent = telInput.value;
        infoPay.textContent = paySelect.value;
        if (emailInput.value.trim()) {
            infoMail.parentNode.style.display = 'inline';
            infoMail.textContent = emailInput.value.trim();
        } else {
            infoMail.parentNode.style.display = 'none';
        }

        if (wechatInput.value.trim()) {
            infoWechat.parentNode.style.display = 'inline';
            infoWechat.textContent = wechatInput.value.trim();
        } else {
            infoWechat.parentNode.style.display = 'none';
        }

        midInfoEx.style.display = 'none';
        birthInput.value = '';
        emailInput.value = '';
        wechatInput.value = '';
    });



    // 个人优势
    var selectedTags = [];
    var originalSelectedTags = [];

    var advChange = document.querySelector('.adv_change');
    var advCont = document.querySelector('.adv_cont');
    var midAdvEx = document.querySelector('.mid_adv_ex');
    var advBtnNo = document.querySelector('.adv_btn_no');
    var advBtnYes = document.querySelector('.adv_btn_yes');
    var selectedTagsList = document.querySelector('.selected_tags_list');
    var customInput = document.querySelector('.custom_input');
    var customBtn = document.querySelector('.custom_btn');

    function updateSelectedTagsDisplay() {
        selectedTagsList.innerHTML = '';
        selectedTags.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            li.classList.add('selected');
            selectedTagsList.appendChild(li);

            li.addEventListener('click', function () {
                var index = selectedTags.indexOf(tag);
                if (index !== -1) {
                    selectedTags.splice(index, 1);
                    this.classList.remove('selected');
                    this.classList.add('unselected');
                } else {
                    selectedTags.push(tag);
                    this.classList.remove('unselected');
                    this.classList.add('selected');
                }
                updateAdvantageItemsSelection();
            });
        });
    }

    function updateAdvantageItemsSelection() {
        var tagItems = document.querySelectorAll('.adv_ex_list ul li');
        tagItems.forEach(function (item) {
            var tagText = item.textContent;
            if (selectedTags.includes(tagText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function updateAdvContDisplay() {
        var ul = advCont.querySelector('ul');
        ul.innerHTML = '';
        selectedTags.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            ul.appendChild(li);
        });
    }

    customBtn.addEventListener('click', function () {
        var customTag = customInput.value.trim();
        if (customTag) {
            if (!selectedTags.includes(customTag)) {
                selectedTags.push(customTag);
                updateSelectedTagsDisplay();
                updateAdvContDisplay();
                updateAdvantageItemsSelection();
            }
            customInput.value = '';
        }
        customInput.placeholder = "输入自定义优势";
    });

    customInput.addEventListener('focus', function () {
        this.placeholder = '';
    });

    customInput.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.placeholder = "输入自定义优势";
        }
    });

    advChange.addEventListener("click", function () {
        originalSelectedTags = [...selectedTags];
        advCont.style.display = "none";
        midAdvEx.style.display = "block";
        updateAdvantageItemsSelection();
        updateSelectedTagsDisplay();
    });

    advBtnNo.addEventListener("click", function () {
        selectedTags = [...originalSelectedTags];
        midAdvEx.style.display = "none";
        advCont.style.display = "block";
        updateAdvContDisplay();
    });

    advBtnYes.addEventListener("click", function () {
        midAdvEx.style.display = "none";
        advCont.style.display = "block";
        updateAdvContDisplay();
        originalSelectedTags = [...selectedTags];
    });

    var advantageItems = document.querySelectorAll('.adv_ex_list ul li');
    advantageItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var tagText = this.textContent;
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                var index = selectedTags.indexOf(tagText);
                if (index > -1) {
                    selectedTags.splice(index, 1);
                }
            } else {
                this.classList.add('selected');
                if (!selectedTags.includes(tagText)) {
                    selectedTags.push(tagText);
                }
            }
            updateSelectedTagsDisplay();
        });
    });







    // 期望职位
    var selectedWishes = [];
    var originalSelectedWishes = [];

    var wishChange = document.querySelector('.wish_change');
    var wishCont = document.querySelector('.wish_cont');
    var midWishEx = document.querySelector('.mid_wish_ex');
    var wishBtnNo = document.querySelector('.wish_btn_no');
    var wishBtnYes = document.querySelector('.wish_btn_yes');
    var selectedWishList = document.querySelector('.selected_wish_list');
    var wishCustomInput = document.querySelector('.wish_custom_input');
    var wishCustomBtn = document.querySelector('.wish_custom_btn');

    function updateSelectedWishesDisplay() {
        selectedWishList.innerHTML = '';
        selectedWishes.forEach(function (wish) {
            var li = document.createElement('li');
            li.textContent = wish;
            li.classList.add('selected');
            selectedWishList.appendChild(li);

            li.addEventListener('click', function () {
                var index = selectedWishes.indexOf(wish);
                if (index !== -1) {
                    selectedWishes.splice(index, 1);
                    this.classList.remove('selected');
                    this.classList.add('unselected');
                } else {
                    selectedWishes.push(wish);
                    this.classList.remove('unselected');
                    this.classList.add('selected');
                }
                updateWishItemsSelection();
            });
        });
    }

    function updateWishItemsSelection() {
        var wishItems = document.querySelectorAll('.mid_wish_ex .wish_ex_list ul li');
        wishItems.forEach(function (item) {
            var wishText = item.textContent;
            if (selectedWishes.includes(wishText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function updateWishContDisplay() {
        var ul = wishCont.querySelector('ul');
        ul.innerHTML = '';
        selectedWishes.forEach(function (wish) {
            var li = document.createElement('li');
            li.textContent = wish;
            ul.appendChild(li);
        });
    }

    wishCustomBtn.addEventListener('click', function () {
        var customWish = wishCustomInput.value.trim();
        if (customWish) {
            if (!selectedWishes.includes(customWish)) {
                selectedWishes.push(customWish);
                updateSelectedWishesDisplay();
                updateWishContDisplay();
                updateWishItemsSelection();
            }
            wishCustomInput.value = '';
        }
        wishCustomInput.placeholder = "输入自定义期望职位";
    });

    wishCustomInput.addEventListener('focus', function () {
        this.placeholder = '';
    });

    wishCustomInput.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.placeholder = "输入自定义期望职位";
        }
    });

    wishChange.addEventListener("click", function () {
        originalSelectedWishes = [...selectedWishes];
        wishCont.style.display = "none";
        midWishEx.style.display = "block";
        updateWishItemsSelection();
        updateSelectedWishesDisplay();
    });

    wishBtnNo.addEventListener("click", function () {
        selectedWishes = [...originalSelectedWishes];
        midWishEx.style.display = "none";
        wishCont.style.display = "block";
        updateWishContDisplay();
    });

    wishBtnYes.addEventListener("click", function () {
        midWishEx.style.display = "none";
        wishCont.style.display = "block";
        updateWishContDisplay();
        originalSelectedWishes = [...selectedWishes];
    });

    document.querySelectorAll('.mid_wish_ex .wish_ex_list ul li').forEach(function (item) {
        item.addEventListener('click', function () {
            var wishText = this.textContent;
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                var index = selectedWishes.indexOf(wishText);
                if (index > -1) {
                    selectedWishes.splice(index, 1);
                }
            } else {
                this.classList.add('selected');
                if (!selectedWishes.includes(wishText)) {
                    selectedWishes.push(wishText);
                }
            }
            updateSelectedWishesDisplay();
        });
    });






    // 工作实习经历
    var expChange = document.querySelector('.exp_change');
    var midExpEx = document.querySelector('.mid_exp_ex');
    var expBtnNo = document.querySelector('.exp_btn_no');
    var expBtnYes = document.querySelector('.exp_btn_yes');

    expChange.addEventListener('click', function () {
        midExpEx.style.display = 'block';
    });

    expBtnNo.addEventListener('click', function () {
        midExpEx.style.display = 'none';
        clearEditPage();

    });

    document.querySelectorAll('.exp_cont ul li').forEach(function (li) {
        var deleteBtn = li.querySelector('.exp_cont4');
        deleteBtn.addEventListener('click', function () {
            li.remove();
        });
    });

    document.querySelectorAll('.exp_state_btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.exp_state_btn').forEach(b => b.classList.remove('exp_selected_state'));
            btn.classList.add('exp_selected_state');
        });
    });

    var workContentTextarea = document.querySelector('.exp_ex_work_main textarea');
    var unorderedListBtn = document.querySelector('.work_top_no');
    var orderedListBtn = document.querySelector('.work_top_yes');
    var listType = null;
    var orderedIndex = 1;
    var selectedClass = 'list_selected';

    function toggleListSelection(selectedButton, otherButton) {
        if (selectedButton.classList.contains(selectedClass)) {
            selectedButton.classList.remove(selectedClass);
            listType = null;
            workContentTextarea.value = '';
        } else {
            selectedButton.classList.add(selectedClass);
            otherButton.classList.remove(selectedClass);
            listType = selectedButton === unorderedListBtn ? 'unordered' : 'ordered';
            workContentTextarea.value = listType === 'unordered' ? '- ' : '1. ';
            orderedIndex = 1;
            workContentTextarea.focus();
        }
    }

    unorderedListBtn.addEventListener('click', function () {
        toggleListSelection(unorderedListBtn, orderedListBtn);
    });

    orderedListBtn.addEventListener('click', function () {
        toggleListSelection(orderedListBtn, unorderedListBtn);
    });

    workContentTextarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (listType === 'unordered') {
                workContentTextarea.value += '\n- ';
            } else if (listType === 'ordered') {
                workContentTextarea.value += '\n' + (++orderedIndex) + '. ';
            }
        }
    });
    var gradeContentTextarea = document.querySelector('.exp_ex_grade_main textarea');
    var unorderedGradeBtn = document.querySelector('.grade_top_no');
    var orderedGradeBtn = document.querySelector('.grade_top_yes');
    var gradeListType = null;
    var gradeOrderedIndex = 1;
    var selectedClass = 'list_selected';

    function toggleGradeListSelection(selectedButton, otherButton) {
        if (selectedButton.classList.contains(selectedClass)) {
            selectedButton.classList.remove(selectedClass);
            gradeListType = null;
            gradeContentTextarea.value = '';
        } else {
            selectedButton.classList.add(selectedClass);
            otherButton.classList.remove(selectedClass);
            gradeListType = selectedButton === unorderedGradeBtn ? 'unordered' : 'ordered';
            gradeContentTextarea.value = gradeListType === 'unordered' ? '- ' : '1. ';
            gradeOrderedIndex = 1;
            gradeContentTextarea.focus();
        }
    }

    unorderedGradeBtn.addEventListener('click', function () {
        toggleGradeListSelection(unorderedGradeBtn, orderedGradeBtn);
    });

    orderedGradeBtn.addEventListener('click', function () {
        toggleGradeListSelection(orderedGradeBtn, unorderedGradeBtn);
    });

    gradeContentTextarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (gradeListType === 'unordered') {
                gradeContentTextarea.value += '\n- ';
            } else if (gradeListType === 'ordered') {
                gradeContentTextarea.value += '\n' + (++gradeOrderedIndex) + '. ';
            }
        }
    });

    expBtnYes.addEventListener('click', function () {
        const name = document.querySelector('.exp_ex_name input').value.trim();
        const job = document.querySelector('.exp_ex_job input').value.trim();
        const startDate = document.querySelector('.exp_ex_time input[type="month"]:first-of-type').value.trim();
        const endDate = document.querySelector('.exp_ex_time input[type="month"]:last-of-type').value.trim();
        const state = document.querySelector('.exp_state_btn.exp_selected_state') ? document.querySelector('.exp_state_btn.exp_selected_state').textContent.trim() : '';
        const workContent = workContentTextarea.value.trim();
        const gradeContent = gradeContentTextarea.value.trim();

        if (!name || !job || !startDate || !endDate || !state || !workContent) {
            alert("请填写所有必填项！");
            return;
        }

        function formatListContent(content) {
            return content;
        }

        const newExpLi = document.createElement('li');
        newExpLi.innerHTML = `
    <div class="exp_cont1">
        <div class="exp_name">${name}</div>
        <div class="exp_job">${job}</div>
        <div class="exp_state">${state}</div>
    </div>
    <div class="exp_time">${startDate} - ${endDate}</div>
    <div class="exp_cont2">
        <div class="exp_work_name">工作内容：</div>
        <div class="exp_work_cont">${formatListContent(workContent)}</div>
    </div>
    ${gradeContent ? `<div class="exp_cont3">
        <div class="exp_grade_name">工作业绩：</div>
        <div class="exp_grade_cont">${formatListContent(gradeContent)}</div>
    </div>` : ''}
    <div class="exp_cont4"></div>
    `;

        document.getElementById('expList').appendChild(newExpLi);

        newExpLi.querySelector('.exp_cont4').addEventListener('click', function () {
            newExpLi.remove();
        });

        midExpEx.style.display = 'none';
        clearEditPage();
    });

    function clearEditPage() {
        document.querySelector('.exp_ex_name input').value = '';
        document.querySelector('.exp_ex_job input').value = '';
        document.querySelectorAll('.exp_ex_time input[type="month"]').forEach(input => input.value = '');
        workContentTextarea.value = '';
        gradeContentTextarea.value = '';

        document.querySelectorAll('.work_top_no, .work_top_yes, .grade_top_no, .grade_top_yes').forEach(btn => btn.classList.remove('list_selected'));

        document.querySelectorAll('.exp_state_btn').forEach(btn => btn.classList.remove('exp_selected_state'));

        listType = null;
        gradeListType = null;
        orderedIndex = 1;
        gradeOrderedIndex = 1;
    }






    // 项目经历
    var projChange = document.querySelector('.proj_change');
    var midProjEx = document.querySelector('.mid_proj_ex');
    var projBtnNo = document.querySelector('.proj_btn_no');
    var projBtnYes = document.querySelector('.proj_btn_yes');

    projChange.addEventListener('click', function () {
        midProjEx.style.display = 'block';
    });

    projBtnNo.addEventListener('click', function () {
        midProjEx.style.display = 'none';
        clearEditPageProj();

    });

    document.querySelectorAll('.proj_cont ul li').forEach(function (li) {
        var deleteBtn = li.querySelector('.proj_cont4');
        deleteBtn.addEventListener('click', function () {
            li.remove();
        });
    });


    var workContentTextareaProj = document.querySelector('.proj_ex_work_main textarea');
    var unorderedListBtnProj = document.querySelector('.proj_work_top_no');
    var orderedListBtnProj = document.querySelector('.proj_work_top_yes');
    var listTypeProj = null;
    var orderedIndexProj = 1;
    var selectedClassProj = 'list_selected_proj';

    function toggleListSelectionProj(selectedButton, otherButton) {
        if (selectedButton.classList.contains(selectedClassProj)) {
            selectedButton.classList.remove(selectedClassProj);
            listTypeProj = null;
            workContentTextareaProj.value = '';
        } else {
            selectedButton.classList.add(selectedClassProj);
            otherButton.classList.remove(selectedClassProj);
            listTypeProj = selectedButton === unorderedListBtnProj ? 'unordered' : 'ordered';
            workContentTextareaProj.value = listTypeProj === 'unordered' ? '- ' : '1. ';
            orderedIndexProj = 1;
            workContentTextareaProj.focus();
        }
    }

    unorderedListBtnProj.addEventListener('click', function () {
        toggleListSelectionProj(unorderedListBtnProj, orderedListBtnProj);
    });

    orderedListBtnProj.addEventListener('click', function () {
        toggleListSelectionProj(orderedListBtnProj, unorderedListBtnProj);
    });

    workContentTextareaProj.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (listTypeProj === 'unordered') {
                workContentTextareaProj.value += '\n- ';
            } else if (listTypeProj === 'ordered') {
                workContentTextareaProj.value += '\n' + (++orderedIndexProj) + '. ';
            }
        }
    });
    var gradeContentTextareaProj = document.querySelector('.proj_ex_grade_main textarea');
    var unorderedGradeBtnProj = document.querySelector('.proj_grade_top_no');
    var orderedGradeBtnProj = document.querySelector('.proj_grade_top_yes');
    var gradeListTypeProj = null;
    var gradeOrderedIndexProj = 1;
    var selectedClassProj = 'list_selected_proj';

    function toggleGradeListSelectionProj(selectedButton, otherButton) {
        if (selectedButton.classList.contains(selectedClassProj)) {
            selectedButton.classList.remove(selectedClassProj);
            gradeListTypeProj = null;
            gradeContentTextareaProj.value = '';
        } else {
            selectedButton.classList.add(selectedClassProj);
            otherButton.classList.remove(selectedClassProj);
            gradeListTypeProj = selectedButton === unorderedGradeBtnProj ? 'unordered' : 'ordered';
            gradeContentTextareaProj.value = gradeListTypeProj === 'unordered' ? '- ' : '1. ';
            gradeOrderedIndexProj = 1;
            gradeContentTextareaProj.focus();
        }
    }

    unorderedGradeBtnProj.addEventListener('click', function () {
        toggleGradeListSelectionProj(unorderedGradeBtnProj, orderedGradeBtnProj);
    });

    orderedGradeBtnProj.addEventListener('click', function () {
        toggleGradeListSelectionProj(orderedGradeBtnProj, unorderedGradeBtnProj);
    });

    gradeContentTextareaProj.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (gradeListTypeProj === 'unordered') {
                gradeContentTextareaProj.value += '\n- ';
            } else if (gradeListTypeProj === 'ordered') {
                gradeContentTextareaProj.value += '\n' + (++gradeOrderedIndexProj) + '. '; // 修正此处
            }
        }
    });

    projBtnYes.addEventListener('click', function () {
        const nameProj = document.querySelector('.proj_ex_name input').value.trim();
        const jobProj = document.querySelector('.proj_ex_job input').value.trim();
        const startDateProj = document.querySelector('.proj_ex_time .proj_start_time').value.trim();
        const endDateProj = document.querySelector('.proj_ex_time .proj_end_time').value.trim();
        const linkProj = document.querySelector('.proj_ex_link input').value.trim();
        const workContentProj = workContentTextareaProj.value.trim();
        const gradeContentProj = gradeContentTextareaProj.value.trim();

        if (!nameProj || !jobProj || !startDateProj || !endDateProj || !workContentProj) {
            alert("请填写所有必填项！");
            return;
        }

        function formatListContentProj(content) {
            return content;
        }

        const newProjLi = document.createElement('li');
        newProjLi.innerHTML = `
        <div class="proj_cont1">
            <div class="proj_name">${nameProj}</div>
            <div class="proj_job">${jobProj}</div>
        </div>
        <div class="proj_time">${startDateProj} - ${endDateProj}</div>
        <div class="proj_link">${linkProj}</div>
        <div class="proj_cont2">
            <div class="proj_work_name">项目内容：</div>
            <div class="proj_work_cont">${formatListContentProj(workContentProj)}</div>
        </div>
        ${gradeContentProj ? `<div class="proj_cont3">
            <div class="proj_grade_name">项目成绩：</div>
            <div class="proj_grade_cont">${formatListContentProj(gradeContentProj)}</div>
        </div>` : ''}
        <div class="proj_cont4"></div>
    `;

        document.getElementById('projList').appendChild(newProjLi);

        newProjLi.querySelector('.proj_cont4').addEventListener('click', function () {
            newProjLi.remove();
        });

        midProjEx.style.display = 'none';
        clearEditPageProj();
    });

    function clearEditPageProj() {
        document.querySelector('.proj_ex_name input').value = '';
        document.querySelector('.proj_ex_job input').value = '';
        document.querySelectorAll('.proj_ex_time input[type="month"]').forEach(input => input.value = '');
        workContentTextareaProj.value = '';
        gradeContentTextareaProj.value = '';

        document.querySelectorAll('.proj_work_top_no, .proj_work_top_yes, .proj_grade_top_no, .proj_grade_top_yes').forEach(btn => btn.classList.remove('list_selected_proj'));

        listTypeProj = null;
        gradeListTypeProj = null;
        orderedIndexProj = 1;
        gradeOrderedIndexProj = 1;
    }







    // 教育经历
    var eduChange = document.querySelector('.edu_change');
    var midEduEx = document.querySelector('.mid_edu_ex');
    var eduBtnNo = document.querySelector('.edu_btn_no');
    var eduBtnYes = document.querySelector('.edu_btn_yes');

    eduChange.addEventListener('click', function () {
        midEduEx.style.display = 'block';
    });

    eduBtnNo.addEventListener('click', function () {
        midEduEx.style.display = 'none';
        clearEditPageEdu();

    });

    document.querySelectorAll('.edu_cont ul li').forEach(function (li) {
        var deleteBtn = li.querySelector('.edu_cont4');
        deleteBtn.addEventListener('click', function () {
            li.remove();
        });
    });


    var workContentTextareaEdu = document.querySelector('.edu_ex_work_main textarea');
    var unorderedListBtnEdu = document.querySelector('.edu_work_top_no');
    var orderedListBtnEdu = document.querySelector('.edu_work_top_yes');
    var listTypeEdu = null;
    var orderedIndexEdu = 1;
    var selectedClassEdu = 'list_selected_edu';

    function toggleListSelectionEdu(selectedButton, otherButton) {
        if (selectedButton.classList.contains(selectedClassEdu)) {
            selectedButton.classList.remove(selectedClassEdu);
            listTypeEdu = null;
            workContentTextareaEdu.value = '';
        } else {
            selectedButton.classList.add(selectedClassEdu);
            otherButton.classList.remove(selectedClassEdu);
            listTypeEdu = selectedButton === unorderedListBtnEdu ? 'unordered' : 'ordered';
            workContentTextareaEdu.value = listTypeEdu === 'unordered' ? '- ' : '1. ';
            orderedIndexEdu = 1;
            workContentTextareaEdu.focus();
        }
    }

    unorderedListBtnEdu.addEventListener('click', function () {
        toggleListSelectionEdu(unorderedListBtnEdu, orderedListBtnEdu);
    });

    orderedListBtnEdu.addEventListener('click', function () {
        toggleListSelectionEdu(orderedListBtnEdu, unorderedListBtnEdu);
    });

    workContentTextareaEdu.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (listTypeEdu === 'unordered') {
                workContentTextareaEdu.value += '\n- ';
            } else if (listTypeEdu === 'ordered') {
                workContentTextareaEdu.value += '\n' + (++orderedIndexEdu) + '. ';
            }
        }
    });

    eduBtnYes.addEventListener('click', function () {
        const nameEdu = document.querySelector('.edu_ex_name input').value.trim();
        const stateEdu = document.querySelector('.edu_ex_state input').value.trim();
        const jobEdu = document.querySelector('.edu_ex_job input').value.trim();
        const startDateEdu = document.querySelector('.edu_ex_time .edu_start_time').value.trim();
        const endDateEdu = document.querySelector('.edu_ex_time .edu_end_time').value.trim();
        const workContentEdu = workContentTextareaEdu.value.trim();

        if (!nameEdu || !stateEdu || !jobEdu || !startDateEdu || !endDateEdu) {
            alert("请填写所有必填项！");
            return;
        }

        function formatListContentEdu(content) {
            return content;
        }

        const newEduLi = document.createElement('li');
        newEduLi.innerHTML = `
        <div class="edu_cont1">
            <div class="edu_name">${nameEdu}</div>
            <div class="edu_state">${stateEdu}</div>
        </div>
        <div class="edu_job">${jobEdu}</div>
        <div class="edu_time">${startDateEdu} - ${endDateEdu}</div>
        ${workContentEdu ? `<div class="edu_cont2">
            <div class="edu_work_name">在校经历：</div>
            <div class="edu_work_cont">${formatListContentEdu(workContentEdu)}</div>
        </div>` : ''}
        <div class="edu_cont4"></div>
    `;

        document.getElementById('eduList').appendChild(newEduLi);

        newEduLi.querySelector('.edu_cont4').addEventListener('click', function () {
            newEduLi.remove();
        });

        midEduEx.style.display = 'none';
        clearEditPageEdu();
    });

    function clearEditPageEdu() {
        document.querySelector('.edu_ex_name input').value = '';
        document.querySelector('.edu_ex_job input').value = '';
        document.querySelectorAll('.edu_ex_time input[type="month"]').forEach(input => input.value = '');
        workContentTextareaEdu.value = '';

        document.querySelectorAll('.edu_work_top_no, .edu_work_top_yes, .edu_grade_top_no, .edu_grade_top_yes').forEach(btn => btn.classList.remove('list_selected_edu'));

        listTypeEdu = null;
        orderedIndexEdu = 1;
    }

















    // 预览简历
    var lookBtn = document.getElementById("lookBtn");
    var look = document.querySelector(".look");
    var overlayLook = document.getElementById("overlayLook");
    var lookClose = document.querySelector(".look_close");

    lookBtn.addEventListener("click", function () {
        look.style.display = "block";
        overlayLook.style.display = "block";
    });

    lookClose.addEventListener("click", function () {
        look.style.display = "none";
        overlayLook.style.display = "none";
    });


    // 上传简历
    var uploadBtn = document.getElementById("uploadBtn");
    var uploadClose = document.querySelector(".upload_close");
    var uploadWindow = document.querySelector(".upload");
    var overlayUpload = document.getElementById("overlayUpload");

    uploadBtn.addEventListener("click", function () {
        uploadWindow.style.display = "block";
        overlayUpload.style.display = "block";
    });

    uploadClose.addEventListener("click", function () {
        uploadWindow.style.display = "none";
        overlayUpload.style.display = "none";
    });


    var uploadMain = document.getElementById("uploadMain");
    var overlayUpload = document.getElementById("overlayUpload");
    var upload = document.querySelector(".upload");

    // 拖动上传
    uploadMain.addEventListener("dragover", function (event) {
        event.preventDefault();
        event.stopPropagation();
        uploadMain.classList.add("dragover");
    });

    uploadMain.addEventListener("dragleave", function (event) {
        event.preventDefault();
        event.stopPropagation();
        uploadMain.classList.remove("dragover");
    });

    uploadMain.addEventListener("drop", function (event) {
        event.preventDefault();
        event.stopPropagation();
        uploadMain.classList.remove("dragover");
        handleUpload(event.dataTransfer.files);
    });

    uploadMain.addEventListener("click", function () {
        var input = document.createElement("input");
        input.type = "file";
        // 接受 PDF、JPG、DOC、DOCX、TXT 格式的文件
        input.accept = ".pdf, .jpg, .jpeg, .doc, .docx, .txt";
        input.onchange = function (event) {
            handleUpload(event.target.files);
        };
        input.click();
    });

    function handleUpload(files) {
        // 模拟上传成功或失败
        var isSuccess = Math.random() < 0.5;
        if (isSuccess) {
            alert("上传成功！");
        } else {
            alert("上传失败！");
        }
    }

    var chat = document.querySelector('.chat');
    chat.addEventListener('click', function () {
        window.location.href = 'chat.html';
    });



});
