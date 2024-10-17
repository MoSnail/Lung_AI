// 显示按钮
function showButtons() {
    document.getElementById('cover-screen').classList.add('hidden');
    document.getElementById('button-container').classList.add('show');
}

// 显示指定内容
function showContent(sectionId) {
    document.getElementById('button-container').classList.remove('show');
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('show');
    });
    document.getElementById(setionId).classList.add('show');
}

// 返回主页
function goHome() {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('show');
    });
    document.getElementById('button-container').classList.add('show');
}

// 打开聊天窗口
function showChatbox() {
    document.getElementById('chatbox').classList.remove('hidden');
}

// 关闭聊天窗口
function closeChatbox() {
    document.getElementById('chatbox').classList.add('hidden');
}


// 发送消息
function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    if (userInput.trim() === "") {
        alert("请输入您的问题");
        return;
    }

    // 显示用户消息在聊天框中
    const chatboxBody = document.getElementById('chatbox-body');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('user-message');
    userMessageDiv.textContent = userInput;
    chatboxBody.appendChild(userMessageDiv);

    // 清空输入框
    document.getElementById('user-input').value = "";

    // 发送请求到 Flask API
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // 获取 AI 响应并显示在聊天框中
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('bot-message');
        botMessageDiv.textContent = data.content;
        chatboxBody.appendChild(botMessageDiv);

        // 滚动到底部
        chatboxBody.scrollTop = chatboxBody.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
