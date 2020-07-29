/**
 * Объект содержит функции запросы
 */
const dispatch = {
    // Сохранения кандидата
    sendData: (request, sender, sendResponse) => {
        fetch('https://api18preview.sapsf.com/odata/v2/Candidate?$format=json', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6ODg4OA==',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request.userData),
        })
        .then((response) => response.json())
        .then((data) => sendResponse(data))
        .catch((error) => {
            console.log(error);
        });
    },

    // Получение данных кандидата
    getUserData: (request, sender, sendResponse) => {
        fetch(`https://api18preview.sapsf.com/odata/v2/Candidate('${request.userId}')?$format=json`, {
            headers: {
                'Authorization': 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6ODg4OA==',
            }
        })
        .then((response) => response.json())
        .then((data) => sendResponse(data));
    },

    // Получение файла
    getResumeFile: (request, sender, sendResponse) => {
        fetch(`https://hh.ru${request.resumeLink}`)
            .then((response) => response.blob())
            .then((blob) => {
                let reader = new FileReader();
                reader.onload = function() {
                    let dataUrl = reader.result;
                    let base64 = dataUrl.split(',')[1];
                    sendResponse(base64);
                };
                reader.readAsDataURL(blob);
            });
    },

    // Отправка файла на сервер SF
    sendResumeFile: (request, sender, sendResponse) => {
        // вот тут нужно создать POST запрос для сохранения файла
        // в request.file уже лежит base64 строка
            fetch('https://api18preview.sapsf.com/odata/v2/Candidate(8863L)?$format=json', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6ODg4OA==',
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify(request.userResume),
            })
                .then((response) => response.json())
                .then((data) => sendResponse(data))
                .catch((error) => {
                    console.log(error);
                });
        // sendResponse();
        },

        //
    // },
};

// Тут только диспечеризация
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
    dispatch[request.contentScriptQuery](request, sender, sendResponse);
    return true;
});