
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
