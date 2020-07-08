chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery ===  "sendData") {
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
    } else if (request.contentScriptQuery ===  "getUserData") {
        fetch(`https://api18preview.sapsf.com/odata/v2/Candidate('${request.userId}')?$format=json`, {
            headers: {
                'Authorization': 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6ODg4OA==',
            }
        })
        .then((response) => response.json())
        .then((data) => sendResponse(data));
    }

    return true;
});