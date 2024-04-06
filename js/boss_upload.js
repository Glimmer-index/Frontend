document.addEventListener("DOMContentLoaded", function () {

    // 带抖动的导航
    const navItems = document.querySelectorAll('.left ul li');

    const targetElements = [
        document.querySelector('.mid_exp'),
        document.querySelector('.mid_adv1'),
        document.querySelector('.mid_adv2'),
        document.querySelector('.mid_adv3'),
        document.querySelector('.mid_adv4'),

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



    // 基本信息

    document.querySelectorAll('.exp_state_btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.exp_state_btn').forEach(btn => {
                btn.classList.remove('exp_selected_state');
            });
            this.classList.add('exp_selected_state');
        });
    });

    document.querySelector('.exp_change').addEventListener('click', function () {
        document.querySelector('.mid_exp_ex').style.display = 'block';

        const currentJobTitle = document.querySelector('.exp_name') ? document.querySelector('.exp_name').textContent : '';
        const currentSalary = document.querySelector('.exp_time') ? document.querySelector('.exp_time').textContent : '';
        const currentJobStatus = document.querySelector('.exp_state') ? document.querySelector('.exp_state').textContent : '';
        const currentJobLocation = document.querySelector('.exp_work_cont') ? document.querySelector('.exp_work_cont').textContent : '';

        document.querySelector('.exp_ex_name input').value = currentJobTitle;

        const salaryOptions = document.querySelector('.exp_ex_time select').options;
        for (let i = 0; i < salaryOptions.length; i++) {
            if (salaryOptions[i].text === currentSalary) {
                document.querySelector('.exp_ex_time select').selectedIndex = i;
                break;
            }
        }

        if (currentJobStatus) {
            document.querySelectorAll('.exp_state_btn').forEach(btn => {
                btn.classList.remove('exp_selected_state');
                if (btn.textContent === currentJobStatus) {
                    btn.classList.add('exp_selected_state');
                }
            });
        }

        document.querySelector('.exp_ex_work input').value = currentJobLocation;
    });

    document.querySelector('.exp_btn_no').addEventListener('click', function () {
        document.querySelector('.mid_exp_ex').style.display = 'none';
        document.querySelector('.exp_ex_name input').value = '';
        document.querySelector('.exp_ex_time select').selectedIndex = 0;
        document.querySelectorAll('.exp_state_btn').forEach(btn => btn.classList.remove('exp_selected_state'));
        document.querySelector('.exp_ex_work input').value = '';
    });

    document.querySelector('.exp_btn_yes').addEventListener('click', function () {
        const jobTitle = document.querySelector('.exp_ex_name input').value;
        const salary = document.querySelector('.exp_ex_time select').options[document.querySelector('.exp_ex_time select').selectedIndex].text;
        const jobStatus = document.querySelector('.exp_state_btn.exp_selected_state') ? document.querySelector('.exp_state_btn.exp_selected_state').textContent : '';
        const jobLocation = document.querySelector('.exp_ex_work input').value;

        if (jobTitle && salary && jobStatus && jobLocation) {
            const expList = document.querySelector('#expList');
            expList.innerHTML = `
        <li>
            <div class="exp_cont1">
                <div class="exp_name">${jobTitle}</div>
                <div class="exp_state">${jobStatus}</div>
            </div>
            <div class="exp_time"><span> </span>${salary}</div>
            <div class="exp_cont2">
                <div class="exp_work_name">工作地址：</div>
                <div class="exp_work_cont">${jobLocation}</div>
            </div>
        </li>
    `;
            document.querySelector('.mid_exp_ex').style.display = 'none';
        } else {
            alert('请填写所有必填项！');
        }
    });





    // 个人优势
    var selectedTags1 = [];
    var originalSelectedTags1 = [];

    var advChange1 = document.querySelector('.adv_change1');
    var advCont1 = document.querySelector('.adv_cont1');
    var midAdvEx1 = document.querySelector('.mid_adv_ex1');
    var advBtnNo1 = document.querySelector('.adv_btn_no1');
    var advBtnYes1 = document.querySelector('.adv_btn_yes1');
    var selectedTagsList1 = document.querySelector('.selected_tags_list1');
    var customInput1 = document.querySelector('.custom_input1');
    var customBtn1 = document.querySelector('.custom_btn1');

    function updateSelectedTagsDisplay1() {
        selectedTagsList1.innerHTML = '';
        selectedTags1.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            li.classList.add('selected');
            selectedTagsList1.appendChild(li);

            li.addEventListener('click', function () {
                var index = selectedTags1.indexOf(tag);
                if (index !== -1) {
                    selectedTags1.splice(index, 1);
                    this.classList.remove('selected');
                    this.classList.add('unselected');
                } else {
                    selectedTags1.push(tag);
                    this.classList.remove('unselected');
                    this.classList.add('selected');
                }
                updateAdvantageItemsSelection1();
            });
        });
    }

    function updateAdvantageItemsSelection1() {
        var tagItems = document.querySelectorAll('.adv_ex_list1 ul li');
        tagItems.forEach(function (item) {
            var tagText = item.textContent;
            if (selectedTags1.includes(tagText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function updateAdvContDisplay1() {
        var ul = advCont1.querySelector('ul');
        ul.innerHTML = '';
        selectedTags1.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            ul.appendChild(li);
        });
    }

    customBtn1.addEventListener('click', function () {
        var customTag = customInput1.value.trim();
        if (customTag) {
            if (!selectedTags1.includes(customTag)) {
                selectedTags1.push(customTag);
                updateSelectedTagsDisplay1();
                updateAdvContDisplay1();
                updateAdvantageItemsSelection1();
            }
            customInput1.value = '';
        }
        customInput1.placeholder = "输入自定义职业知识";
    });

    customInput1.addEventListener('focus', function () {
        this.placeholder = '';
    });

    customInput1.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.placeholder = "输入自定义职业知识";
        }
    });

    advChange1.addEventListener("click", function () {
        originalSelectedTags1 = [...selectedTags1];
        advCont1.style.display = "none";
        midAdvEx1.style.display = "block";
        updateAdvantageItemsSelection1();
        updateSelectedTagsDisplay1();
    });

    advBtnNo1.addEventListener("click", function () {
        selectedTags1 = [...originalSelectedTags1];
        midAdvEx1.style.display = "none";
        advCont1.style.display = "block";
        updateAdvContDisplay1();
    });

    advBtnYes1.addEventListener("click", function () {
        midAdvEx1.style.display = "none";
        advCont1.style.display = "block";
        updateAdvContDisplay1();
        originalSelectedTags1 = [...selectedTags1];
    });

    var advantageItems1 = document.querySelectorAll('.adv_ex_list1 ul li');
    advantageItems1.forEach(function (item) {
        item.addEventListener('click', function () {
            var tagText = this.textContent;
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                var index = selectedTags1.indexOf(tagText);
                if (index > -1) {
                    selectedTags1.splice(index, 1);
                }
            } else {
                this.classList.add('selected');
                if (!selectedTags1.includes(tagText)) {
                    selectedTags1.push(tagText);
                }
            }
            updateSelectedTagsDisplay1();
        });
    });





    // 个人优势
    var selectedTags2 = [];
    var originalSelectedTags2 = [];

    var advChange2 = document.querySelector('.adv_change2');
    var advCont2 = document.querySelector('.adv_cont2');
    var midAdvEx2 = document.querySelector('.mid_adv_ex2');
    var advBtnNo2 = document.querySelector('.adv_btn_no2');
    var advBtnYes2 = document.querySelector('.adv_btn_yes2');
    var selectedTagsList2 = document.querySelector('.selected_tags_list2');
    var customInput2 = document.querySelector('.custom_input2');
    var customBtn2 = document.querySelector('.custom_btn2');

    function updateSelectedTagsDisplay2() {
        selectedTagsList2.innerHTML = '';
        selectedTags2.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            li.classList.add('selected');
            selectedTagsList2.appendChild(li);

            li.addEventListener('click', function () {
                var index = selectedTags2.indexOf(tag);
                if (index !== -1) {
                    selectedTags2.splice(index, 1);
                    this.classList.remove('selected');
                    this.classList.add('unselected');
                } else {
                    selectedTags2.push(tag);
                    this.classList.remove('unselected');
                    this.classList.add('selected');
                }
                updateAdvantageItemsSelection2();
            });
        });
    }

    function updateAdvantageItemsSelection2() {
        var tagItems = document.querySelectorAll('.adv_ex_list2 ul li');
        tagItems.forEach(function (item) {
            var tagText = item.textContent;
            if (selectedTags2.includes(tagText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function updateAdvContDisplay2() {
        var ul = advCont2.querySelector('ul');
        ul.innerHTML = '';
        selectedTags2.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            ul.appendChild(li);
        });
    }

    customBtn2.addEventListener('click', function () {
        var customTag = customInput2.value.trim();
        if (customTag) {
            if (!selectedTags2.includes(customTag)) {
                selectedTags2.push(customTag);
                updateSelectedTagsDisplay2();
                updateAdvContDisplay2();
                updateAdvantageItemsSelection2();
            }
            customInput2.value = '';
        }
        customInput2.placeholder = "输入自定义职业要求";
    });

    customInput2.addEventListener('focus', function () {
        this.placeholder = '';
    });

    customInput2.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.placeholder = "输入自定义职业要求";
        }
    });

    advChange2.addEventListener("click", function () {
        originalSelectedTags2 = [...selectedTags2];
        advCont2.style.display = "none";
        midAdvEx2.style.display = "block";
        updateAdvantageItemsSelection2();
        updateSelectedTagsDisplay2();
    });

    advBtnNo2.addEventListener("click", function () {
        selectedTags2 = [...originalSelectedTags2];
        midAdvEx2.style.display = "none";
        advCont2.style.display = "block";
        updateAdvContDisplay2();
    });

    advBtnYes2.addEventListener("click", function () {
        midAdvEx2.style.display = "none";
        advCont2.style.display = "block";
        updateAdvContDisplay2();
        originalSelectedTags2 = [...selectedTags2];
    });

    var advantageItems2 = document.querySelectorAll('.adv_ex_list2 ul li');
    advantageItems2.forEach(function (item) {
        item.addEventListener('click', function () {
            var tagText = this.textContent;
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                var index = selectedTags2.indexOf(tagText);
                if (index > -1) {
                    selectedTags2.splice(index, 1);
                }
            } else {
                this.classList.add('selected');
                if (!selectedTags2.includes(tagText)) {
                    selectedTags2.push(tagText);
                }
            }
            updateSelectedTagsDisplay2();
        });
    });






    // 个人优势
    var selectedTags3 = [];
    var originalSelectedTags3 = [];

    var advChange3 = document.querySelector('.adv_change3');
    var advCont3 = document.querySelector('.adv_cont3');
    var midAdvEx3 = document.querySelector('.mid_adv_ex3');
    var advBtnNo3 = document.querySelector('.adv_btn_no3');
    var advBtnYes3 = document.querySelector('.adv_btn_yes3');
    var selectedTagsList3 = document.querySelector('.selected_tags_list3');
    var customInput3 = document.querySelector('.custom_input3');
    var customBtn3 = document.querySelector('.custom_btn3');

    function updateSelectedTagsDisplay3() {
        selectedTagsList3.innerHTML = '';
        selectedTags3.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            li.classList.add('selected');
            selectedTagsList3.appendChild(li);

            li.addEventListener('click', function () {
                var index = selectedTags3.indexOf(tag);
                if (index !== -1) {
                    selectedTags3.splice(index, 1);
                    this.classList.remove('selected');
                    this.classList.add('unselected');
                } else {
                    selectedTags3.push(tag);
                    this.classList.remove('unselected');
                    this.classList.add('selected');
                }
                updateAdvantageItemsSelection3();
            });
        });
    }

    function updateAdvantageItemsSelection3() {
        var tagItems = document.querySelectorAll('.adv_ex_list3 ul li');
        tagItems.forEach(function (item) {
            var tagText = item.textContent;
            if (selectedTags3.includes(tagText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function updateAdvContDisplay3() {
        var ul = advCont3.querySelector('ul');
        ul.innerHTML = '';
        selectedTags3.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            ul.appendChild(li);
        });
    }

    customBtn3.addEventListener('click', function () {
        var customTag = customInput3.value.trim();
        if (customTag) {
            if (!selectedTags3.includes(customTag)) {
                selectedTags3.push(customTag);
                updateSelectedTagsDisplay3();
                updateAdvContDisplay3();
                updateAdvantageItemsSelection3();
            }
            customInput3.value = '';
        }
        customInput3.placeholder = "输入自定义个人素养";
    });

    customInput3.addEventListener('focus', function () {
        this.placeholder = '';
    });

    customInput3.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.placeholder = "输入自定义个人素养";
        }
    });

    advChange3.addEventListener("click", function () {
        originalSelectedTags3 = [...selectedTags3];
        advCont3.style.display = "none";
        midAdvEx3.style.display = "block";
        updateAdvantageItemsSelection3();
        updateSelectedTagsDisplay3();
    });

    advBtnNo3.addEventListener("click", function () {
        selectedTags3 = [...originalSelectedTags3];
        midAdvEx3.style.display = "none";
        advCont3.style.display = "block";
        updateAdvContDisplay3();
    });

    advBtnYes3.addEventListener("click", function () {
        midAdvEx3.style.display = "none";
        advCont3.style.display = "block";
        updateAdvContDisplay3();
        originalSelectedTags3 = [...selectedTags3];
    });

    var advantageItems3 = document.querySelectorAll('.adv_ex_list3 ul li');
    advantageItems3.forEach(function (item) {
        item.addEventListener('click', function () {
            var tagText = this.textContent;
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                var index = selectedTags3.indexOf(tagText);
                if (index > -1) {
                    selectedTags3.splice(index, 1);
                }
            } else {
                this.classList.add('selected');
                if (!selectedTags3.includes(tagText)) {
                    selectedTags3.push(tagText);
                }
            }
            updateSelectedTagsDisplay3();
        });
    });




    // 个人优势
    var selectedTags4 = [];
    var originalSelectedTags4 = [];

    var advChange4 = document.querySelector('.adv_change4');
    var advCont4 = document.querySelector('.adv_cont4');
    var midAdvEx4 = document.querySelector('.mid_adv_ex4');
    var advBtnNo4 = document.querySelector('.adv_btn_no4');
    var advBtnYes4 = document.querySelector('.adv_btn_yes4');
    var selectedTagsList4 = document.querySelector('.selected_tags_list4');
    var customInput4 = document.querySelector('.custom_input4');
    var customBtn4 = document.querySelector('.custom_btn4');

    function updateSelectedTagsDisplay4() {
        selectedTagsList4.innerHTML = '';
        selectedTags4.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            li.classList.add('selected');
            selectedTagsList4.appendChild(li);

            li.addEventListener('click', function () {
                var index = selectedTags4.indexOf(tag);
                if (index !== -1) {
                    selectedTags4.splice(index, 1);
                    this.classList.remove('selected');
                    this.classList.add('unselected');
                } else {
                    selectedTags4.push(tag);
                    this.classList.remove('unselected');
                    this.classList.add('selected');
                }
                updateAdvantageItemsSelection4();
            });
        });
    }

    function updateAdvantageItemsSelection4() {
        var tagItems = document.querySelectorAll('.adv_ex_list4 ul li');
        tagItems.forEach(function (item) {
            var tagText = item.textContent;
            if (selectedTags4.includes(tagText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function updateAdvContDisplay4() {
        var ul = advCont4.querySelector('ul');
        ul.innerHTML = '';
        selectedTags4.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            ul.appendChild(li);
        });
    }

    customBtn4.addEventListener('click', function () {
        var customTag = customInput4.value.trim();
        if (customTag) {
            if (!selectedTags4.includes(customTag)) {
                selectedTags4.push(customTag);
                updateSelectedTagsDisplay4();
                updateAdvContDisplay4();
                updateAdvantageItemsSelection4();
            }
            customInput4.value = '';
        }
        customInput4.placeholder = "输入自定义职业待遇";
    });

    customInput4.addEventListener('focus', function () {
        this.placeholder = '';
    });

    customInput4.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.placeholder = "输入自定义职业待遇";
        }
    });

    advChange4.addEventListener("click", function () {
        originalSelectedTags4 = [...selectedTags4];
        advCont4.style.display = "none";
        midAdvEx4.style.display = "block";
        updateAdvantageItemsSelection4();
        updateSelectedTagsDisplay4();
    });

    advBtnNo4.addEventListener("click", function () {
        selectedTags4 = [...originalSelectedTags4];
        midAdvEx4.style.display = "none";
        advCont4.style.display = "block";
        updateAdvContDisplay4();
    });

    advBtnYes4.addEventListener("click", function () {
        midAdvEx4.style.display = "none";
        advCont4.style.display = "block";
        updateAdvContDisplay4();
        originalSelectedTags4 = [...selectedTags4];
    });

    var advantageItems4 = document.querySelectorAll('.adv_ex_list4 ul li');
    advantageItems4.forEach(function (item) {
        item.addEventListener('click', function () {
            var tagText = this.textContent;
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                var index = selectedTags4.indexOf(tagText);
                if (index > -1) {
                    selectedTags4.splice(index, 1);
                }
            } else {
                this.classList.add('selected');
                if (!selectedTags4.includes(tagText)) {
                    selectedTags4.push(tagText);
                }
            }
            updateSelectedTagsDisplay4();
        });
    });











    document.querySelector('#uploadBtn').addEventListener('click', function () {
        const isExpListFilled = document.querySelector('#expList').innerHTML.trim() !== '';
        const isAdvCont1Filled = document.querySelector('.adv_cont1 ul').innerHTML.trim() !== '';
        const isAdvCont2Filled = document.querySelector('.adv_cont2 ul').innerHTML.trim() !== '';
        const isAdvCont3Filled = document.querySelector('.adv_cont3 ul').innerHTML.trim() !== '';
        const isAdvCont4Filled = document.querySelector('.adv_cont4 ul').innerHTML.trim() !== '';

        if (isExpListFilled && isAdvCont1Filled && isAdvCont2Filled && isAdvCont3Filled && isAdvCont4Filled) {
            alert('已发布');
        } else {
            alert('请填写所有内容');
        }
    });





});
