document.addEventListener('DOMContentLoaded', function () {


    // 搜索框点击隐藏文字
    var searchInputs = document.querySelectorAll('.searchInput');
    searchInputs.forEach(function (input) {
        input.onfocus = function () {
            if (this.value === '搜索职位、公司') {
                this.value = '';
            }
            this.style.color = '#333';
        };
        input.onblur = function () {
            if (this.value === '') {
                this.value = '搜索职位、公司';
            }
            this.style.color = 'gray';
        };
    });

    var searchTypeLinks = document.querySelectorAll('.searchType');

    searchTypeLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认跳转行为

            var contSpan = this.querySelector('.searchType_cont');
            var linkText = contSpan.textContent.trim();
            var newText = '';
            if (linkText === '职位搜索') {
                newText = '公司搜索';
            } else {
                newText = '职位搜索';
            }
            contSpan.textContent = newText;
        });
    });
    document.querySelector('#searchInput222').addEventListener('input', function () {
        const inputVal = this.value.trim();
        const searchEx = document.querySelector('.search_ex2');
        const listItems = searchEx.querySelectorAll('li');
        let hasMatch = false;

        if (inputVal) {
            listItems.forEach(li => {
                const match = li.textContent.includes(inputVal);
                if (match) {
                    hasMatch = true;

                    const regExp = new RegExp(inputVal, 'gi');
                    li.innerHTML = li.textContent.replace(regExp, `<span style="color: red;">$&</span>`);
                    li.style.display = 'block';
                } else {
                    li.style.display = 'none';
                }
            });

            searchEx.style.display = hasMatch ? 'block' : 'none';
        } else {
            searchEx.style.display = 'none';
            listItems.forEach(li => {
                li.style.display = 'none';
                li.innerHTML = li.textContent;
            });
        }
    });


    // 筛选
    // tag0
    const tag0 = document.querySelector('.tag0');
    const citySelector = document.querySelector('.city-selector');
    const provinceSelector = document.querySelector('.province-selector');
    const citySelectors = document.querySelectorAll('.city-selector ul');

    tag0.addEventListener('click', function (event) {
        event.stopPropagation();
        let isProvinceSelectorVisible = provinceSelector.style.display === 'block';
        provinceSelector.style.display = isProvinceSelectorVisible ? 'none' : 'block';
        if (isProvinceSelectorVisible) {
            citySelector.style.display = 'none';
            citySelectors.forEach(function (selector) {
                selector.style.display = 'none';
            });
        }
    });

    const provinceItems = document.querySelectorAll('.province-selector li');
    provinceItems.forEach(function (provinceItem, index) {
        provinceItem.addEventListener('click', function (event) {
            event.stopPropagation();
            let alreadySelected = provinceItem.classList.contains('selected');
            provinceItems.forEach(function (item) {
                item.classList.remove('selected');
            });
            citySelectors.forEach(function (selector) {
                const selectedCity = selector.querySelector('.selected');
                if (selectedCity) {
                    selectedCity.classList.remove('selected');
                }
                selector.style.display = 'none';
            });

            if (alreadySelected) {
                citySelector.style.display = 'none';
                tag0.innerHTML = '<span></span> 选择城市';
            } else {
                provinceItem.classList.add('selected');
                citySelector.style.display = 'block';
                citySelectors[index].style.display = 'block';
                tag0.innerHTML = '<span></span> 选择城市';
            }
        });
    });

    citySelectors.forEach(function (selector) {
        const cityItems = selector.querySelectorAll('li');
        cityItems.forEach(function (cityItem) {
            cityItem.addEventListener('click', function (event) {
                event.stopPropagation();
                const selectedCity = selector.querySelector('.selected');
                if (selectedCity) {
                    selectedCity.classList.remove('selected');
                }
                cityItem.classList.add('selected');
                const cityName = cityItem.textContent.trim();
                tag0.innerHTML = '<span></span> ' + cityName;
            });
        });
    });

    document.addEventListener('click', function () {
        citySelector.style.display = 'none';
        provinceSelector.style.display = 'none';
        citySelectors.forEach(function (selector) {
            selector.style.display = 'none';
        });
    });





    // tag1
    const tag1 = document.querySelector('.tag1');
    const tagEx1 = document.querySelector('.tag_ex1');

    tag1.addEventListener('click', function (event) {
        event.stopPropagation();
        tagEx1.classList.toggle('show');
    });

    const tagEx1Options = tagEx1.querySelectorAll('li');

    tagEx1Options.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            if (option.classList.contains('selected')) {
                option.classList.remove('selected');
            } else {
                tagEx1Options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            }
            updateTag1Count();
        });
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('.screen_tag')) {
            tagEx1.classList.remove('show');
        }
    });

    function updateTag1Count() {
        const selectedCount = tagEx1.querySelectorAll('.selected').length;
        const countElement = tag1.querySelector('.count');

        countElement.textContent = selectedCount > 0 ? `(${selectedCount})` : '';
        if (selectedCount > 0) {
            tag1.classList.add('has-selection');
        } else {
            tag1.classList.remove('has-selection');
        }
    }




    // tag2
    const tag2 = document.querySelector('.tag2');
    const tagEx2 = document.querySelector('.tag_ex2');

    tag2.addEventListener('click', function (event) {
        event.stopPropagation();
        tagEx2.classList.toggle('show');
    });

    const tagEx2Options = tagEx2.querySelectorAll('li');

    tagEx2Options.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            if (option.classList.contains('selected')) {
                option.classList.remove('selected');
            } else {
                tagEx2Options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            }
            updateTag2Count();
        });
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('.screen_tag')) {
            tagEx2.classList.remove('show');
        }
    });

    function updateTag2Count() {
        const selectedCount = tagEx2.querySelectorAll('.selected').length;
        const countElement = tag2.querySelector('.count');

        countElement.textContent = selectedCount > 0 ? `(${selectedCount})` : '';
        if (selectedCount > 0) {
            tag2.classList.add('has-selection');
        } else {
            tag2.classList.remove('has-selection');
        }
    }



    // tag3
    const tag3 = document.querySelector('.tag3');
    const tagEx3 = document.querySelector('.tag_ex3');

    tag3.addEventListener('click', function (event) {
        event.stopPropagation();
        tagEx3.classList.toggle('show');
    });

    const tagEx3Options = tagEx3.querySelectorAll('li');

    tagEx3Options.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            option.classList.toggle('selected');
            updateTag3Count();
        });
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('.screen_tag')) {
            tagEx3.classList.remove('show');
        }
    });

    function updateTag3Count() {
        const selectedCount = tagEx3.querySelectorAll('.selected').length;
        const countElement = tag3.querySelector('.count');

        countElement.textContent = selectedCount > 0 ? `(${selectedCount})` : '';
        if (selectedCount > 0) {
            tag3.classList.add('has-selection');
        } else {
            tag3.classList.remove('has-selection');
        }
    }

    // tag4
    const tag4 = document.querySelector('.tag4');
    const tagEx4 = document.querySelector('.tag_ex4');

    tag4.addEventListener('click', function (event) {
        event.stopPropagation();
        tagEx4.classList.toggle('show');
    });

    const tagEx4Options = tagEx4.querySelectorAll('li');

    tagEx4Options.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            option.classList.toggle('selected');
            updateTag4Count();
        });
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('.screen_tag')) {
            tagEx4.classList.remove('show');
        }
    });

    function updateTag4Count() {
        const selectedCount = tagEx4.querySelectorAll('.selected').length;
        const countElement = tag4.querySelector('.count');

        countElement.textContent = selectedCount > 0 ? `(${selectedCount})` : '';
        if (selectedCount > 0) {
            tag4.classList.add('has-selection');
        } else {
            tag4.classList.remove('has-selection');
        }
    }



    // tag5
    const tag5 = document.querySelector('.tag5');
    const tagEx5 = document.querySelector('.tag_ex5');

    tag5.addEventListener('click', function (event) {
        event.stopPropagation();
        tagEx5.classList.toggle('show');
    });

    const tagEx5Options = tagEx5.querySelectorAll('li');

    tagEx5Options.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            option.classList.toggle('selected');
            updateTag5Count();
        });
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('.tag_ex5')) {
            tagEx5.classList.remove('show');
        }
    });

    function updateTag5Count() {
        const selectedCount = tagEx5.querySelectorAll('.selected').length;
        const countElement = tag5.querySelector('.count');

        countElement.textContent = selectedCount > 0 ? `(${selectedCount})` : '';
        if (selectedCount > 0) {
            tag5.classList.add('has-selection');
        } else {
            tag5.classList.remove('has-selection');
        }
    }

    // tag6
    const tag6 = document.querySelector('.tag6');
    const tagEx6 = document.querySelector('.tag_ex6');

    tag6.addEventListener('click', function (event) {
        event.stopPropagation();
        tagEx6.classList.toggle('show');
    });

    const tagEx6Options = tagEx6.querySelectorAll('li');

    tagEx6Options.forEach(option => {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            option.classList.toggle('selected');
            updateTag6Count();
        });
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('.screen_tag')) {
            tagEx6.classList.remove('show');
        }
    });

    function updateTag6Count() {
        const selectedCount = tagEx6.querySelectorAll('.selected').length;
        const countElement = tag6.querySelector('.count');

        countElement.textContent = selectedCount > 0 ? `(${selectedCount})` : '';
        if (selectedCount > 0) {
            tag6.classList.add('has-selection');
        } else {
            tag6.classList.remove('has-selection');
        }
    }


    // 清空筛选条件
    const clearFiltersLink = document.querySelector('.screen_del');

    clearFiltersLink.addEventListener('click', function (event) {
        event.preventDefault();

        const selectedProvince = document.querySelector('.province-selector .selected');
        if (selectedProvince) {
            selectedProvince.classList.remove('selected');
        }

        const selectedCity = document.querySelector('.city-selector .selected');
        if (selectedCity) {
            selectedCity.classList.remove('selected');
        }

        tag0.innerHTML = '<span></span> 选择城市';

        provinceSelector.style.display = 'none';
        citySelector.style.display = 'none';
        citySelectors.forEach(selector => {
            selector.style.display = 'none';
        });

        [tagEx1Options, tagEx2Options, tagEx3Options, tagEx4Options, tagEx5Options, tagEx6Options].forEach(options => {
            options.forEach(option => {
                option.classList.remove('selected');
            });
        });

        updateTag1Count();
        updateTag2Count();
        updateTag3Count();
        updateTag4Count();
        updateTag5Count();
        updateTag6Count();

        [tagEx1, tagEx2, tagEx3, tagEx4, tagEx5, tagEx6].forEach(tagEx => {
            tagEx.classList.remove('show');
        });
    });


    // 头部固定
    window.addEventListener('scroll', function () {
        var header = document.querySelector('.header');
        var topElement = document.querySelector('.top');
        var headerBottom = header.offsetTop + header.offsetHeight;

        if (window.scrollY > headerBottom) {
            header.classList.add('fixed-header', 'header-fixed-animate');
            topElement.classList.add('top-fixed');
        } else {
            header.classList.remove('fixed-header', 'header-fixed-animate');
            topElement.classList.remove('top-fixed');
        }
    });


});