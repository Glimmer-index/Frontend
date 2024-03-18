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

    // 导航
    // const navItems = document.querySelectorAll('.left ul li');

    // const targetElements = document.querySelectorAll('.mid_info, .mid_adv, .mid_wish, .mid_exp, .mid_proj, .mid_edu, .mid_my');

    // navItems.forEach((item, index) => {
    //     item.addEventListener('click', () => {
    //         const targetElementTop = targetElements[index].offsetTop - 100;

    //         window.scrollTo({
    //             top: targetElementTop,
    //             behavior: 'smooth' 
    //         });
    //     });
    // });



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



    // // 个人信息
    // var infoChange = document.querySelector('.info_change');
    // var infoCont = document.querySelector('.info_cont');
    // var midInfoEx = document.querySelector('.mid_info_ex');
    // var infoBtnNo = document.querySelector('.info_btn_no');
    // var infoBtnYes = document.querySelector('.info_btn_yes');

    // infoChange.addEventListener("click", function () {
    //     infoCont.style.display = "none";
    //     midInfoEx.style.display = "block";
    // });

    // infoBtnNo.addEventListener("click", function () {
    //     midInfoEx.style.display = "none";
    //     infoCont.style.display = "block";
    // });

    // infoBtnYes.addEventListener("click", function () {
    //     midInfoEx.style.display = "none";
    //     infoCont.style.display = "block";
    // });


    // 动态个人信息
    var infoName = document.querySelector('.info_name');
    var infoSex = document.getElementById('infoSex');
    var infoState = document.getElementById('infoState');
    var infoTel = document.getElementById('infoTel');

    var nameInput = document.querySelector('input[name="name"]');
    var sexInputs = document.querySelectorAll('input[name="sex"]');
    var stateSelect = document.querySelector('select[name="state"]');
    var telInput = document.querySelector('input[name="tel"]');

    var infoChange = document.querySelector('.info_change');
    var midInfoEx = document.querySelector('.mid_info_ex');
    var infoBtnNo = document.querySelector('.info_btn_no');
    var infoBtnYes = document.querySelector('.info_btn_yes');

    var sexMap = {
        "man": "男",
        "woman": "女"
    };

    infoChange.addEventListener("click", function () {
        midInfoEx.style.display = "block";

        nameInput.value = infoName.textContent.trim();
        sexInputs.forEach(function (input) {
            if (input.value === infoSex.textContent.trim()) {
                input.checked = true;
            }
        });
        stateSelect.value = infoState.textContent.trim();
        telInput.value = infoTel.textContent.trim();
    });

    infoBtnNo.addEventListener("click", function (event) {
        event.preventDefault(); // 阻止表单默认提交行为
        midInfoEx.style.display = "none";
    });

    infoBtnYes.addEventListener("click", function (event) {
        event.preventDefault(); // 阻止表单默认提交行为
        midInfoEx.style.display = "none";

        infoName.textContent = nameInput.value;
        infoSex.textContent = sexMap[document.querySelector('input[name="sex"]:checked').value];
        infoState.textContent = stateSelect.value;
        infoTel.textContent = telInput.value;
    });



    // // 个人优势
    // var advChange = document.querySelector('.adv_change');
    // var advCont = document.querySelector('.adv_cont');
    // var midAdvEx = document.querySelector('.mid_adv_ex');
    // var advBtnNo = document.querySelector('.adv_btn_no');
    // var advBtnYes = document.querySelector('.adv_btn_yes');

    // advChange.addEventListener("click", function () {
    //     advCont.style.display = "none";
    //     midAdvEx.style.display = "block";
    // });

    // advBtnNo.addEventListener("click", function () {
    //     midAdvEx.style.display = "none";
    //     advCont.style.display = "block";
    // });

    // advBtnYes.addEventListener("click", function () {
    //     midAdvEx.style.display = "none";
    //     advCont.style.display = "block";
    // });

    // // 个人优势标签
    // var advantageItems = document.querySelectorAll('.adv_ex_list ul li');

    // advantageItems.forEach(function (item) {
    //     item.addEventListener('click', function () {
    //         this.classList.toggle('selected');
    //     });
    // });



    // 实现动态选择后的个人优势
    var selectedTags = [];

    var advChange = document.querySelector('.adv_change');
    var advCont = document.querySelector('.adv_cont');
    var midAdvEx = document.querySelector('.mid_adv_ex');
    var advBtnNo = document.querySelector('.adv_btn_no');
    var advBtnYes = document.querySelector('.adv_btn_yes');

    advChange.addEventListener("click", function () {
        advCont.style.display = "none";
        midAdvEx.style.display = "block";

        var tagItems = document.querySelectorAll('.adv_ex_list ul li');
        tagItems.forEach(function (item) {
            var tagText = item.textContent;
            if (selectedTags.includes(tagText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });

    advBtnNo.addEventListener("click", function () {
        midAdvEx.style.display = "none";
        advCont.style.display = "block";
    });

    advBtnYes.addEventListener("click", function () {
        midAdvEx.style.display = "none";
        advCont.style.display = "block";

        selectedTags = [];
        var selectedTagItems = document.querySelectorAll('.adv_ex_list ul li.selected');
        selectedTagItems.forEach(function (tagItem) {
            selectedTags.push(tagItem.textContent);
        });

        var ul = document.querySelector('.adv_cont ul');
        ul.innerHTML = '';
        selectedTags.forEach(function (tag) {
            var li = document.createElement('li');
            li.textContent = tag;
            ul.appendChild(li);
        });
    });

    var advantageItems = document.querySelectorAll('.adv_ex_list ul li');
    advantageItems.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });




    // // 期望职位
    // var wishChange = document.querySelector('.wish_change');
    // var wishCont = document.querySelector('.wish_cont');
    // var midWishEx = document.querySelector('.mid_wish_ex');
    // var wishItems = midWishEx.querySelectorAll('.wish_ex_list ul li');
    // var wishBtnNo = document.querySelector('.wish_btn_no');
    // var wishBtnYes = document.querySelector('.wish_btn_yes');

    // wishChange.addEventListener("click", function () {
    //     wishCont.style.display = "none";
    //     midWishEx.style.display = "block";
    // });

    // wishBtnNo.addEventListener("click", function () {
    //     midWishEx.style.display = "none";
    //     wishCont.style.display = "block";
    // });

    // wishBtnYes.addEventListener("click", function () {
    //     midWishEx.style.display = "none";
    //     wishCont.style.display = "block";
    // });

    // wishItems.forEach(function (item) {
    //     item.addEventListener('click', function () {
    //         this.classList.toggle('selected');
    //     });
    // });

    // 动态期望职位
    var selectedPositions = [];

    var wishChange = document.querySelector('.wish_change');
    var wishCont = document.querySelector('.wish_cont');
    var midWishEx = document.querySelector('.mid_wish_ex');
    var wishBtnNo = document.querySelector('.wish_btn_no');
    var wishBtnYes = document.querySelector('.wish_btn_yes');

    wishChange.addEventListener("click", function () {
        wishCont.style.display = "none";
        midWishEx.style.display = "block";

        var positionItems = document.querySelectorAll('.wish_ex_list ul li');
        positionItems.forEach(function (item) {
            var positionText = item.textContent;
            if (selectedPositions.includes(positionText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });

    wishBtnNo.addEventListener("click", function () {
        midWishEx.style.display = "none";
        wishCont.style.display = "block";
    });

    wishBtnYes.addEventListener("click", function () {
        midWishEx.style.display = "none";
        wishCont.style.display = "block";

        selectedPositions = [];
        var selectedPositionItems = document.querySelectorAll('.wish_ex_list ul li.selected');
        selectedPositionItems.forEach(function (positionItem) {
            selectedPositions.push(positionItem.textContent);
        });

        var ul = document.querySelector('.wish_cont ul');
        ul.innerHTML = '';
        selectedPositions.forEach(function (position) {
            var li = document.createElement('li');
            li.textContent = position;
            ul.appendChild(li);
        });
    });

    var positionItems = document.querySelectorAll('.wish_ex_list ul li');
    positionItems.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });

    // // 工作经历
    // const expChange = document.querySelector('.exp_change');
    // const expCont = document.querySelector('.exp_cont');
    // const expEx = document.querySelector('.mid_exp_ex');
    // const expItems = expEx.querySelectorAll('.exp_ex_list ul li');
    // const expBtnNo = document.querySelector('.exp_btn_no');
    // const expBtnYes = document.querySelector('.exp_btn_yes');

    // expChange.addEventListener('click', function () {
    //     expCont.style.display = 'none';
    //     expEx.style.display = 'block';
    // });

    // expBtnNo.addEventListener('click', function () {
    //     expCont.style.display = 'block';
    //     expEx.style.display = 'none';
    // });

    // expBtnYes.addEventListener('click', function () {
    //     expCont.style.display = 'block';
    //     expEx.style.display = 'none';
    // });

    // expItems.forEach(function (item) {
    //     item.addEventListener('click', function () {
    //         this.classList.toggle('selected');
    //     });
    // });


    // 动态工作经历
    var selectedInterns = [];

    var internChange = document.querySelector('.exp_change');
    var internCont = document.querySelector('.exp_cont');
    var midInternEx = document.querySelector('.mid_exp_ex');
    var internBtnNo = document.querySelector('.exp_btn_no');
    var internBtnYes = document.querySelector('.exp_btn_yes');

    internChange.addEventListener("click", function () {
        internCont.style.display = "none";
        midInternEx.style.display = "block";

        var internItems = document.querySelectorAll('.exp_ex_list ul li');
        internItems.forEach(function (item) {
            var internName = item.querySelector('.exp_ex_name').textContent;
            var internJob = item.querySelector('.exp_ex_job').textContent;
            var internText = internName + ' - ' + internJob;
            if (selectedInterns.includes(internText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });

    internBtnNo.addEventListener("click", function () {
        midInternEx.style.display = "none";
        internCont.style.display = "block";
    });

    internBtnYes.addEventListener("click", function () {
        midInternEx.style.display = "none";
        internCont.style.display = "block";

        selectedInterns = [];
        var selectedInternItems = document.querySelectorAll('.exp_ex_list ul li.selected');
        selectedInternItems.forEach(function (internItem) {
            var internName = internItem.querySelector('.exp_ex_name').textContent;
            var internJob = internItem.querySelector('.exp_ex_job').textContent;
            var internText = internName + ' - ' + internJob;
            selectedInterns.push(internText);
        });

        var ul = document.querySelector('.exp_cont ul');
        ul.innerHTML = '';
        selectedInterns.forEach(function (intern) {
            var internLi = document.createElement('li');
            var internNameDiv = document.createElement('div');
            internNameDiv.classList.add('exp_name');
            internNameDiv.textContent = intern.split(' - ')[0];
            var internJobDiv = document.createElement('div');
            internJobDiv.classList.add('exp_job');
            internJobDiv.textContent = intern.split(' - ')[1];
            internLi.appendChild(internNameDiv);
            internLi.appendChild(internJobDiv);
            ul.appendChild(internLi);
        });
    });

    var internItems = document.querySelectorAll('.exp_ex_list ul li');
    internItems.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });



    // 项目经历
    // const projChange = document.querySelector('.proj_change');
    // const projCont = document.querySelector('.proj_cont');
    // const projEx = document.querySelector('.mid_proj_ex');
    // const projItems = projEx.querySelectorAll('.proj_ex_list ul li');
    // const projBtnNo = document.querySelector('.proj_btn_no');
    // const projBtnYes = document.querySelector('.proj_btn_yes');

    // projChange.addEventListener('click', function () {
    //     projCont.style.display = 'none';
    //     projEx.style.display = 'block';
    // });

    // projBtnNo.addEventListener('click', function () {
    //     projCont.style.display = 'block';
    //     projEx.style.display = 'none';
    // });

    // projBtnYes.addEventListener('click', function () {
    //     projCont.style.display = 'block';
    //     projEx.style.display = 'none';
    // });

    // projItems.forEach(function (item) {
    //     item.addEventListener('click', function () {
    //         this.classList.toggle('selected');
    //     });
    // });


    // 动态项目经历
    var selectedProjects = [];

    var projChange = document.querySelector('.proj_change');
    var projCont = document.querySelector('.proj_cont');
    var midProjEx = document.querySelector('.mid_proj_ex');
    var projBtnNo = document.querySelector('.proj_btn_no');
    var projBtnYes = document.querySelector('.proj_btn_yes');

    projChange.addEventListener("click", function () {
        projCont.style.display = "none";
        midProjEx.style.display = "block";

        var projItems = document.querySelectorAll('.proj_ex_list ul li');
        projItems.forEach(function (item) {
            var projName = item.querySelector('.proj_ex_name').textContent;
            var projJob = item.querySelector('.proj_ex_job').textContent;
            var projText = projName + ' - ' + projJob;
            if (selectedProjects.includes(projText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });

    projBtnNo.addEventListener("click", function () {
        midProjEx.style.display = "none";
        projCont.style.display = "block";
    });

    projBtnYes.addEventListener("click", function () {
        midProjEx.style.display = "none";
        projCont.style.display = "block";

        selectedProjects = [];
        var selectedProjItems = document.querySelectorAll('.proj_ex_list ul li.selected');
        selectedProjItems.forEach(function (projItem) {
            var projName = projItem.querySelector('.proj_ex_name').textContent;
            var projJob = projItem.querySelector('.proj_ex_job').textContent;
            var projText = projName + ' - ' + projJob;
            selectedProjects.push(projText);
        });

        var ul = document.querySelector('.proj_cont ul');
        ul.innerHTML = '';
        selectedProjects.forEach(function (proj) {
            var projLi = document.createElement('li');
            var projNameDiv = document.createElement('div');
            projNameDiv.classList.add('proj_name');
            projNameDiv.textContent = proj.split(' - ')[0];
            var projJobDiv = document.createElement('div');
            projJobDiv.classList.add('proj_job');
            projJobDiv.textContent = proj.split(' - ')[1];
            projLi.appendChild(projNameDiv);
            projLi.appendChild(projJobDiv);
            ul.appendChild(projLi);
        });
    });

    var projItems = document.querySelectorAll('.proj_ex_list ul li');
    projItems.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });


    // 教育经历
    // const eduChange = document.querySelector('.edu_change');
    // const eduCont = document.querySelector('.edu_cont');
    // const eduEx = document.querySelector('.mid_edu_ex');
    // const eduItems = eduEx.querySelectorAll('.edu_ex_list ul li');
    // const eduBtnNo = document.querySelector('.edu_btn_no');
    // const eduBtnYes = document.querySelector('.edu_btn_yes');

    // eduChange.addEventListener('click', function () {
    //     eduCont.style.display = 'none';
    //     eduEx.style.display = 'block';
    // });

    // eduBtnNo.addEventListener('click', function () {
    //     eduCont.style.display = 'block';
    //     eduEx.style.display = 'none';
    // });

    // eduBtnYes.addEventListener('click', function () {
    //     eduCont.style.display = 'block';
    //     eduEx.style.display = 'none';
    // });

    // eduItems.forEach(function (item) {
    //     item.addEventListener('click', function () {
    //         this.classList.toggle('selected');
    //     });
    // });



    // 动态教育经历
    var selectedEducations = [];

    var eduChange = document.querySelector('.edu_change');
    var eduCont = document.querySelector('.edu_cont');
    var midEduEx = document.querySelector('.mid_edu_ex');
    var eduBtnNo = document.querySelector('.edu_btn_no');
    var eduBtnYes = document.querySelector('.edu_btn_yes');

    eduChange.addEventListener("click", function () {
        eduCont.style.display = "none";
        midEduEx.style.display = "block";

        var eduItems = document.querySelectorAll('.edu_ex_list ul li');
        eduItems.forEach(function (item) {
            var eduName = item.querySelector('.edu_ex_name').textContent;
            var eduJob = item.querySelector('.edu_ex_job').textContent;
            var eduTime = item.querySelector('.edu_ex_time').textContent;
            var eduText = eduName + " - " + eduJob + " - " + eduTime;
            if (selectedEducations.includes(eduText)) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });

    eduBtnNo.addEventListener("click", function () {
        midEduEx.style.display = "none";
        eduCont.style.display = "block";
    });

    eduBtnYes.addEventListener("click", function () {
        midEduEx.style.display = "none";
        eduCont.style.display = "block";

        selectedEducations = [];
        var selectedEduItems = document.querySelectorAll('.edu_ex_list ul li.selected');
        selectedEduItems.forEach(function (eduItem) {
            var eduName = eduItem.querySelector('.edu_ex_name').textContent;
            var eduJob = eduItem.querySelector('.edu_ex_job').textContent;
            var eduTime = eduItem.querySelector('.edu_ex_time').textContent;
            var eduText = eduName + " - " + eduJob + " - " + eduTime;
            selectedEducations.push(eduText);
        });

        var ul = document.querySelector('.edu_cont ul');
        ul.innerHTML = '';
        selectedEducations.forEach(function (edu) {
            var li = document.createElement('li');
            var eduInfo = edu.split(" - ");
            li.innerHTML = `<div class="edu_name">${eduInfo[0]}</div>
                        <div class="edu_job">${eduInfo[1]}</div>
                        <div class="edu_time">${eduInfo[2]}</div>`;
            ul.appendChild(li);
        });
    });

    var eduItems = document.querySelectorAll('.edu_ex_list ul li');
    eduItems.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });


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




});
