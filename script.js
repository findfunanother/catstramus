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
    document.getElementById('chat-container').style.display = 'flex';

    //displayMessage('운세에 대해 무엇이든지 물어보세요', 'assistant');
}





document.getElementById('send-text').addEventListener('click', function() {

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
    
});

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
    } else {
        sendBtn.style.display = 'none';
    }
});