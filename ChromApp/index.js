
window.onload = function (name, value) {
    // alert('Страница загружена');
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    alert('script loaded');


    const fragment = document.createDocumentFragment();
    const fioContainer = document.querySelector('.resume-header-main');
    const spanInfo = Array.from(fioContainer.getElementsByTagName('span'));
    const positionBlock = document.querySelector('.resume-block');
    // const positionSpan = Array.from(positionBlock.getElementsByTagName('span'));
    // const resumeBlockContainer = document.querySelector('.resume-block-container');
    // const resumeBlockContainerP = Array.from(resumeBlockContainer.getElementsByTagName('p'));
    // const resumeBlock = document.querySelectorAll('.resume-block');
    // const resumeBlockInnerText = Array.from(resumeBlock);
    const resumeBlockInnerText = Array.from(document.querySelectorAll('.resume-block'));

    // console.log(spanInfo);
    console.log(resumeBlockInnerText);
    // console.log(resumeBlockExperienceAll[1].innerText);

    const fio = spanInfo[0].textContent;
    const arrFio = fio.split(' ');
    const firstName = arrFio[0];
    const secondName = arrFio[1];
    const patronymic = arrFio[2];
    // const gender = spanInfo[1].textContent;
    // const age = spanInfo[2].textContent;
    // const dob = spanInfo[3].textContent;
    // const city = spanInfo[4].textContent;
    // const metro = spanInfo[5].textContent;
    const phone = spanInfo[5].textContent;
    const email = spanInfo[7].textContent;
    // const skype = spanInfo[9].textContent;

    // Resume

    const position = resumeBlockInnerText[0].innerText;//позиция
    const experience = resumeBlockInnerText[1].innerText;//опыт
    const skills = resumeBlockInnerText[2].innerText;//навыки
    const drive = resumeBlockInnerText[3].innerText;// опыт вождения
    const about_me = resumeBlockInnerText[4].innerText; //обо мне
    const education = resumeBlockInnerText[5].innerText;//образование
    const language = resumeBlockInnerText[6].innerText; // язык
    const citizenship = resumeBlockInnerText[7].innerText;// гражданство


    console.log(position);
    // console.log(fio, gender, age, dob, city, metro, phone, email, skype);
    // console.log(firstName,secondName, phone, email);


    const btn_candidate = document.querySelector('.bloko-button-group');
    // console.log(btn_candidate);
    const addButton = document.createElement('button');
    const spanButton = document.createElement('span');
    spanButton.textContent = 'SF';
    addButton.appendChild(spanButton);
    addButton.classList.add('bloko-button', 'bloko-button_icon-only');
    btn_candidate.appendChild(addButton);


    function http() {
        return {
            get(url, cb) {
                try {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.addEventListener('load', () => {
                        if (Math.floor(xhr.status / 100) !== 2) {
                            cb(`Error. Status code: ${xhr.status}`, xhr);
                            return;
                        }
                        const response = JSON.parse(xhr.responseText);
                        cb(null, response);
                    });

                    xhr.addEventListener('error', () => {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                    });

                    xhr.send();
                } catch (error) {
                    cb(error);
                }
            },
            post(url, body, headers, cb) {
                try {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', url);
                    xhr.addEventListener('load', () => {
                        if (Math.floor(xhr.status / 100) !== 2) {
                            cb(`Error. Status code: ${xhr.status}`, xhr);
                            return;
                        }

                        // xhr.responseType = 'document';
                        // const response = xhr.overrideMimeType('text/xml');
                        // const parser = new DOMParser();
                        // const response = parser.parseFromString(xhr.responseText,"text/xml");
                        // const response = xhr.responseXML;
                        //
                        // console.log(response);

                        const response = JSON.parse(xhr.responseText);
                        console.log(response);
                        cb(null, response);
                    });

                    xhr.addEventListener('error', () => {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                    });

                    if (headers) {
                        Object.entries(headers).forEach(([key, value]) => {
                            xhr.setRequestHeader(key, value);
                        });
                    }

                    xhr.send(JSON.stringify(body));
                } catch (error) {
                    cb(error);
                }
            },
        };
    }

    const myHttp = http();


    // addButton.addEventListener('click', e => {
    //     myHttp.post(
    //         // 'https://api18preview.sapsf.com/odata/v2/Candidate',
    //         'https://api18preview.sapsf.com/odata/v2/Candidate?$format=json',
    //         {
    //             "cellPhone": phone,
    //
    //             // "contactEmail": email,
    //
    //
    //             "firstName": firstName,
    //
    //             // "primaryEmail": email,
    //             "primaryEmail": "012345email@email.ru",
    //
    //
    //             "lastName": secondName,
    //
    //             // "country": "Russian Federation"
    //         },
    //
    //
    //
    //
    //         {
    //
    //
    //             'Access-Control-Allow-Methods': 'POST',
    //             'Access-Control-Allow-Credentials': 'true',
    //             // 'Authorization': 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6MTExMQ==',
    //             'Authorization': 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6ODg4OA==',
    //             // 'Version': "1",
    //             'Content-Type': 'application/json',
    //             // 'Content-Type': 'application/xml;charset=utf-8'
    //         },
    //         (err, res) => {
    //             // const parser = new DOMParser();
    //             // const xmlDoc = parser.parseFromString(res,"text/xml");
    //             // console.log(err, xmlDoc);
    //             console.log(err, res);
    //             // if (res.statusCode === 201) {
    //             //     alert("Кандидат успешно создан");
    //             // }
    //             // else {
    //             //     alert("Что то пошло не так");
    //             // }
    //         },
    //     );
    // });

    // 'Access-Control-Allow-Origin': 'https://hh.ru',
    // 'Access-Control-Allow-Origin': 'https://api18preview.sapsf.com/odata/v2/Candidate',
    // 'Access-Control-Allow-Origin':'https://127.0.0.1',
    // 'Accept': 'application/json',
    // 'Content-Type': 'text/plain',
    // 'Access-Control-Allow-Origin': '*',


    // addButton.addEventListener('click', e => {
    //     fetch('https://api18preview.sapsf.com/odata/v2/Candidate'{ 'Authorization': 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6ODg4OA=='})
    //         .then(response => response.text())
    //         .then(xml => {
    //         });
    // });

    addButton.addEventListener('click', e => {

        axios.defaults.headers.common['Authorization'] = 'Basic aWR1ZG5pa0BNb2xnYXRlc3Q6ODg4OA==';
        axios.post('https://api18preview.sapsf.com/odata/v2/Candidate?$format=json', {
            firstName: 'Fred',
            lastName: 'Flintstone',
            primaryEmail: "0123456email@email.ru",
            cellPhone: phone

        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

};


