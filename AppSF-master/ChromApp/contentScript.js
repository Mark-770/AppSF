/**
 * Функция добавления кнопки на страницу резюме
 */
const addSFButtonToPage = function () {
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

const getResumeFile = () => {
    // GET запрос
    chrome.runtime.sendMessage(
        {contentScriptQuery: "getResumeFile", userId: 8842},
        (data) => {
            console.log(data);
        }
    );
};

const getResumeFilesLinks = function () {
    const downloadButton = document.querySelector('.bloko-button-group .bloko-button:first-child');

    const mouseEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });

    downloadButton.dispatchEvent(mouseEvent);

    setTimeout(() => {
        const resumeNodes = document.querySelectorAll('.bloko-drop-menu-item');
        const resumeLinks = [...resumeNodes].map((node) => node.getAttribute('href'));

        // GET запрос
        chrome.runtime.sendMessage(
            {contentScriptQuery: "getResumeFile", resumeLink: resumeLinks[0]},
            sendResumeFile
        );

        window.dispatchEvent(mouseEvent);
    }, 1500);
};

const sendResumeFile = (base64) => {
    chrome.runtime.sendMessage(
        {contentScriptQuery: "sendResumeFile", file: base64},
        (data) => {
        }
    );
};

/**
 * Функция извлечения данных со страницы
 */
const getCandidateInfoFromPage = function () {
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

    const fio = spanInfo[0].textContent;
    const arrFio = fio.split(' ');
    const firstName = arrFio[0];
    const lastName = arrFio[1];
    const patronymic = arrFio[2];
    // const gender = spanInfo[1].textContent;
    // const age = spanInfo[2].textContent;
    // const dob = spanInfo[3].textContent;
    // const city = spanInfo[4].textContent;
    // const metro = spanInfo[5].textContent;
    const cellPhone = spanInfo[5].textContent;
    const primaryEmail = spanInfo[7].textContent;
    // const skype = spanInfo[9].textContent;

    // Resume
    // const position = resumeBlockInnerText[0].innerText;//позиция
    // const experience = resumeBlockInnerText[1].innerText;//опыт
    // const skills = resumeBlockInnerText[2].innerText;//навыки
    // const drive = resumeBlockInnerText[3].innerText;// опыт вождения
    // const about_me = resumeBlockInnerText[4].innerText; //обо мне
    // const education = resumeBlockInnerText[5].innerText;//образование
    // const language = resumeBlockInnerText[6].innerText; // язык
    // const citizenship = resumeBlockInnerText[7].innerText;// гражданство

    // Собираем в этом объекте данные резюме
    return {
        // firstName: 'Bolvan',
        // lastName: 'Flintstone',
        // primaryEmail: "bolvan@apple.ru",
        // cellPhone: '+12399',
        firstName,
        lastName,
        primaryEmail,
        cellPhone,
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
    }
};

const app = function (name, value) {
    const customButton = addSFButtonToPage();
    const candidate = getCandidateInfoFromPage();

    const newCandidate = {
        "firstName": "Mark",
        "lastName": "Benedis",
        "primaryEmail": "123mark@gmail.com",
        "cellPhone": candidate.cellPhone,
        // "firstName": candidate.firstName,
        // "lastName": candidate.lastName,
        // "primaryEmail": candidate.primaryEmail,
        // "cellPhone": candidate.cellPhone,
    };
    const newReuseme = {
        "uri" : "https://api18preview.sapsf.com/odata/v2/Candidate(8860L)?$format=json",
        "type" : "SFOData.Candidate",
        "module":"RECRUITING",
        "fileName":"resume.docx",
        "resume": {
            "fileContent": sendResumeFile()
        }
    };

    getResumeFilesLinks();

    customButton.addEventListener('click', (event) => {
        // POST запрос
        chrome.runtime.sendMessage(
            {contentScriptQuery: "sendData", userData: newCandidate , newReuseme },
            (data) => {
                console.log(data);
            }
        );

        // GET запрос
    //     chrome.runtime.sendMessage({ contentScriptQuery: "getUserData", userId: 8856 },
    //         (data) => {
    //             console.log(data);
    //         }
    //     );
    });
};


window.onload = app;