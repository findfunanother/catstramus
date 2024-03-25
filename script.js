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
    document.getElementById('intro').style.display = 'none';
    document.getElementById('id-kakao-banner').style.display = 'none';
    document.getElementById('chat-container').style.display = 'flex';
    document.getElementById('input-container').style.display = 'flex';
    document.getElementById('input-text').focus();

    displayMessage('운세에 대해 무엇이든지 물어보세요', 'assistant');
}





document.getElementById('send-text').addEventListener('click', function() {

    sendMessage();

    this.style.display = 'none';

    document.getElementById('input-text').focus();    

    /*
    var input = document.getElementById('input-text');
    var message = input.value.trim();

    if(message !== "") {
        var chatBox = document.getElementById('chat-box');

        var newMessage = document.createElement('div');
        newMessage.textContent = message;
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight; // 스크롤을 가장 아래로
        input.value = ""; // 입력 필드 초기화

        this.style.display = 'none';
    }
    */
    
});


async function sendMessage() {

    const userQuestion = document.getElementById('input-text').value;
    if (!userQuestion.trim()) return;

    displayMessage(userQuestion, 'user');

    document.getElementById('input-text').value = '';

    //const loadingMessageId = displayLoadingIcon('assistant');    

    try {
        const response = await fetch("https://bss7szoqr6cxg5jmuehq6ouz6u0hewym.lambda-url.ap-northeast-2.on.aws/fortunetell", {
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

        //removeMessage(loadingMessageId);
        displayMessage(result.assistant, 'assistant');

    } catch (error) {
        console.error("에러 발생:", error);
        //removeMessage(loadingMessageId);
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
            }
            else
            {
                messageContent.innerHTML += `<br>추가로 링크를 눌러 작은 정성을 보내주시면 더 좋은 일이 생길 것입니다 <a href="https://toss.me/josfamilly"> => 복채 보내기 </a>`;
            }
        }

        typeWriter(); // 타이핑 시작



    } else {
        // 사용자 메시지는 바로 표시
        messageContent.textContent = message;
    }

    chatBox.scrollTop = chatBox.scrollHeight;

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

