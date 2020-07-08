
window.onload = function (name, value) {
    // alert('Страница загружена');
    const script = document.createElement('script');
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



    const userData = {
        firstName: 'Bolvan',
        lastName: 'Flintstone',
        primaryEmail: "bolvan@apple.ru",
        cellPhone: '+12399',
    };

    addButton.addEventListener('click', (event) => {
        // POST запрос
        chrome.runtime.sendMessage(
            { contentScriptQuery: "sendData", userData },
            (data) => { 
                console.log(data);
            }
        );

        // GET запрос
        chrome.runtime.sendMessage({ contentScriptQuery: "getUserData", userId: 8842 },
            (data) => {
                console.log(data);
            }
        );
    });

};


