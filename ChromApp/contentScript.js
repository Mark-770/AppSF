/**
 * Функция добавления кнопки на страницу резюме
 */
const addSFButtonToPage = function() {
    const buttonsGroup = document.querySelector('.bloko-button-group');

    if (!buttonsGroup) {
        return;
    }

    const customButton = document.createElement('button');
    customButton.setAttribute('type', 'button');
    customButton.classList.add('bloko-button', 'bloko-button_icon-only');
    customButton.innerHTML = '<span class="bloko-button__icon">SF</span>';
    buttonsGroup.appendChild(customButton);

    return customButton;
};

/**
 * Функция извлечения данных со страницы
 */
const getCandidateInfoFromPage = function() {
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

    // Собираем в этом объекте данные резюме
    return {
        firstName: 'Bolvan',
        lastName: 'Flintstone',
        primaryEmail: "bolvan@apple.ru",
        cellPhone: '+12399',
        // position,
        // fio, 
        // gender, 
        // age, 
        // dob, 
        // city, 
        // metro, 
        // phone, 
        // email, 
        // skype, 
        // firstName,
        // secondName,
        // phone,
        // email,
    }
};

const app = function (name, value) {
    const customButton = addSFButtonToPage();
    const candidate = getCandidateInfoFromPage();

    const newCandidate =  {
        "firstName": "Fred",
        "lastName": "Flintstone",
        "primaryEmail": "a12_email@email.ru",
        "cellPhone": "+789699",
    };

    customButton.addEventListener('click', (event) => {
        // POST запрос
        chrome.runtime.sendMessage(
            { contentScriptQuery: "sendData", userData: newCandidate },
            (data) => { 
                console.log(data);
            }
        );
        
        // GET запрос
        // chrome.runtime.sendMessage({ contentScriptQuery: "getUserData", userId: 8842 },
        //     (data) => {
        //         console.log(data);
        //     }
        // );
    });
};

window.onload = app;