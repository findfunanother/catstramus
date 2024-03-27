let myDateTime = ''


function start() {

    const birthYear = document.getElementById('birthyear').value;
    const hour = document.getElementById('birthhour').value;

    if(birthYear === ''){
        alert('생년월일을 입력해주세요');
        return;
    }

    myDateTime = birthYear + " " + hour;

    console.log(myDateTime);


    document.getElementById('id-input-intro-container').style.display = 'none';

    document.getElementById('intro').style.height = '100%';
    
    document.getElementById('id-chattingpage').style.display = 'flex';
    
    document.getElementById('id-kakao-banner2').style.display = 'flex';


    
    //document.getElementById('id-kakao-banner').style.display = 'none';

    //document.getElementById('chat-container').style.display = 'flex';
    //document.getElementById('input-container').style.display = 'flex';

    //document.getElementById('input-text').focus();

    //displayMessage('운세에 대해 무엇이든지 물어보세요', 'assistant');

    sendMessage("오늘 나의 운세를 알려줘");
}





document.getElementById('send-text').addEventListener('click', function() {

    sendMessage();

    this.style.display = 'none';

    //document.getElementById('input-text').focus();    
   
});


async function sendMessage(inputText) {

    const userQuestion = inputText || document.getElementById('input-text').value;
    if (!userQuestion.trim()) return; // 공백이 있는치 체크 
    
    if(!inputText){

        document.getElementById('input-text').value = '';
    }

    displayMessage(userQuestion, 'user');

    const loadingMessageId = displayLoadingIcon('assistant');    
    
    //http://localhost:3000/fortunetell

    //https://kim34adhzldpuxnhgxbqaiwfte0njupt.lambda-url.ap-northeast-2.on.aws/

    try {
        const response = await fetch("https://kim34adhzldpuxnhgxbqaiwfte0njupt.lambda-url.ap-northeast-2.on.aws/fortunetell", {
        //const response = await fetch("http://localhost:3000/fortunetell", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({

                myDateTime : myDateTime, 
                userQuestion: userQuestion
            }),
        });

 
        const result = await response.json();

        removeMessage(loadingMessageId);
        displayMessage(result.assistant, 'assistant');

    } catch (error) {
        console.error("에러 발생:", error);
        removeMessage(loadingMessageId);
        displayMessage('응답을 불러오는 중 문제가 발생했습니다.', 'assistant');

    } 
}


function displayMessage(message, sender) {

    const chatBox = document.getElementById('chat-box');

    const messageWrapper = document.createElement('div');

    messageWrapper.classList.add('message', sender);

    const senderName = document.createElement('div');
    senderName.classList.add('sender-name');
    senderName.textContent = sender === 'user' ? '당신' : '캣스트라무스';

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');

    messageWrapper.appendChild(senderName);
    messageWrapper.appendChild(messageContent);
    
    chatBox.appendChild(messageWrapper);

    if (sender === 'assistant') {

        // 타이핑 효과 적용
        let i = 0;
        function typeWriter() {
            if (i < message.length) {
                messageContent.textContent += message.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // 타이핑 속도 조절

                chatBox.scrollTop = chatBox.scrollHeight;
            }
            else
            {
                messageContent.innerHTML += `<br><br> 애정운, 재물운 등 궁금한 것이 있으면 언제든지 물어봐 주세요. <a href="https://toss.me/josfamilly"> => 복채주기 </a>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }

        typeWriter(); // 타이핑 시작



    } else {
        // 사용자 메시지는 바로 표시
        messageContent.textContent = message;
        chatBox.scrollTop = chatBox.scrollHeight;
    }

}


// 엔터키로 메시지 전송
document.getElementById('input-text').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {

        //e.preventDefault();
        document.getElementById('send-text').click();
        
    }
});


document.getElementById('input-text').addEventListener('input', function() {

    var input = this.value.trim();
    var sendBtn = document.getElementById('send-text');
    
    // 입력 값이 있으면 버튼을 보이게, 없으면 숨깁니다.
    if(input !== "") {
        sendBtn.style.display = 'block';
        sendBtn.style.border = 'none';

    } else {
        sendBtn.style.display = 'none';
    }
});


function displayLoadingIcon(sender) {
    const chatBox = document.getElementById('chat-box');
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message', sender);
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    messageWrapper.appendChild(messageContent);
    
    chatBox.appendChild(messageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageWrapper; // 로딩 메시지의 참조 반환
}

function removeMessage(messageElement) {
    messageElement.remove(); // 특정 메시지 요소 제거
}
