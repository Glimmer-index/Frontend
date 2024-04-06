
document.addEventListener('DOMContentLoaded', function () {
    const maleButton = document.getElementById('male');
    const femaleButton = document.getElementById('female');

    maleButton.addEventListener('click', function () {
        maleButton.classList.add('active');
        femaleButton.classList.remove('active');
    });

    femaleButton.addEventListener('click', function () {
        femaleButton.classList.add('active');
        maleButton.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const imgDiv = document.querySelector('.boss_img');
    const fileUpload = document.getElementById('fileUpload');

    imgDiv.addEventListener('click', function () {
        fileUpload.click();
    });

    fileUpload.addEventListener('change', function (event) {
        uploadImage(event);
    });
});

function uploadImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const avatarImage = document.getElementById('avatarImage');
        avatarImage.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}



document.getElementById('drop_zone').addEventListener('click', function () {
    document.getElementById('file_input').click();
});

document.getElementById('file_input').addEventListener('change', function (event) {
    handleFiles(event.target.files);
});

let dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', function (event) {
    event.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', function (event) {
    event.preventDefault();
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', function (event) {
    event.preventDefault();
    dropZone.classList.remove('dragover');
    let files = event.dataTransfer.files;
    handleFiles(files);
});

function handleFiles(files) {
    let file = files[0];
    if (file) {
        let fileName = file.name;
        let fileExtension = fileName.split('.').pop().toLowerCase();
        if (['doc', 'docx', 'pdf', 'jpg'].includes(fileExtension)) {
            alert('上传成功！');
        } else {
            alert('文件格式不支持，上传失败！');
        }
    }
}
