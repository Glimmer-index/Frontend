document.addEventListener('DOMContentLoaded', () => {
    const leftList = document.querySelector('.left_list');
    const rightItems = document.querySelectorAll('.right_list .right_li');
    const right0 = document.querySelector('.right0');

    leftList.addEventListener('click', function (event) {
        let targetLi = event.target.closest('.left_li');
        if (targetLi) {
            document.querySelectorAll('.left_list .left_li').forEach(li => {
                li.classList.remove('left_selected');
            });

            targetLi.classList.add('left_selected');

            const index = Array.from(this.querySelectorAll('.left_li')).indexOf(targetLi);

            rightItems.forEach((item, idx) => {
                item.style.display = idx === index ? 'block' : 'none';
            });

            right0.style.display = 'none';
        }
    });




    document.querySelectorAll('.right_li').forEach(container => {
        const chatInput = container.querySelector('.right_bottom_main');
        const sendButton = container.querySelector('.send-button');
        const messageList = container.querySelector('.right_main ul');

        const updateSendButtonStyles = () => {
            if (chatInput.textContent.trim()) {
                sendButton.style.color = "#fff";
                sendButton.style.borderColor = "#47a7f5";
                sendButton.style.backgroundColor = "#47a7f5";
            } else {
                sendButton.style.color = "#ededed";
                sendButton.style.borderColor = "#ededed";
                sendButton.style.backgroundColor = "#fff";
            }
        };

        const sendMessage = () => {
            const messageHTML = chatInput.innerHTML.trim();
            if (messageHTML) {
                const newMessage = document.createElement('li');
                newMessage.classList.add('chat_right');
                newMessage.innerHTML = messageHTML;
                messageList.appendChild(newMessage);
                chatInput.innerHTML = '';
                updateSendButtonStyles();
                messageList.scrollTop = messageList.scrollHeight;
            }
        };

        chatInput.addEventListener('input', updateSendButtonStyles);

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (!e.ctrlKey) {
                    e.preventDefault();
                    sendMessage();
                } else {
                    e.preventDefault();
                    const selection = window.getSelection();
                    if (!selection.rangeCount) return;
                    const range = selection.getRangeAt(0);
                    const br = document.createElement('br');
                    range.deleteContents();
                    range.insertNode(br);
                    range.setStartAfter(br);
                    const textNode = document.createTextNode('\n');
                    range.insertNode(textNode);
                    range.setStartAfter(textNode);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        });

        sendButton.addEventListener('click', sendMessage);

        updateSendButtonStyles();
    });


    var chat = document.querySelector('.chat');
    chat.addEventListener('click', function () {
        window.location.href = 'chat.html';
    });



});