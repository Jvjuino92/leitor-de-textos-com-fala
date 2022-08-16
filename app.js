const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const buttonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')

const humanExpressions = [
    { img: './img/drink.jpg', text: 'I am thirsty' },
    { img: './img/angry.jpg', text: 'I am angry' },
    { img: './img/food.jpg', text: 'I am hungry' },
    { img: './img/grandma.jpg', text: 'I want to see grandma' },
    { img: './img/happy.jpg', text: 'I am happy' },
    { img: './img/home.jpg', text: 'I want to go home' },
    { img: './img/hurt.jpg', text: 'I am hurt' },
    { img: './img/outside.jpg', text: 'I want to go outside' },
    { img: './img/sad.jpg', text: 'I am sad' },
    { img: './img/scared.jpg', text: 'I am scared' },
    { img: './img/tired.jpg', text: 'I am tired' },
    { img: './img/school.jpg', text: 'I wanna go to school' }
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage = text => {
    utterance.text = text
}

const speakText = () => {
    speechSynthesis.speak(utterance)
}

const setVoice = event => {
    const selectedVoice = voices.find(voice => voice.name === event.target.value)
    utterance.voice = selectedVoice
}

const addExpressionBoxesIntoDOM = () => {
    main.innerHTML = humanExpressions.map(({ img, text }) => `
        <div class="expression-box" data-js="${text}">
            <img src="${img}" alt="${text}" data-js="${text}">
            <p class="info" data-js="${text}">${text}</p>
        </div>
    `).join('')
}

addExpressionBoxesIntoDOM()

const setStyleOfClickedDiv = dataValue => {
    const div = document.querySelector(`[data-js="${dataValue}"]`)
    div.classList.add('active')
    setTimeout(() => {
        div.classList.remove('active')
    }, 1000)
}

main.addEventListener('click', event => {
    const clickedElement = event.target
    const clickedElementText = clickedElement.dataset.js
    const clickedElementMustBeSpoken = ['img', 'p'].some(elementName => 
        clickedElement.tagName.toLowerCase() === elementName.toLowerCase())

    if (clickedElementMustBeSpoken) {
        setTextMessage(clickedElementText)
        speakText()
        setStyleOfClickedDiv(clickedElementText)
    }
})

const insertOptionsElementIntoDOM = voices => {
    selectElement.innerHTML = voices.reduce((accumulator, { name, lang }) => {
        accumulator += `<option value="${name}">${lang} | ${name}</option>`
        return accumulator
    }, '')
}

let voices = []

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()

    insertOptionsElementIntoDOM(voices)

    const googleVoice = voices.find(voice => 
        voice.name === 'Google Português do Brasil')
    const microsoftVoice = voices.find(voice => 
        voice.name === 'Microsoft David - English (United States)')

    if (googleVoice) {
        utterance.voice = googleVoice
        const googleOptionElement = selectElement
            .querySelector(`[value="${googleVoice.name}"]`)
        googleOptionElement.selectElement = true
    } else if (microsoftVoice) {
        utterance.voice = microsoftVoice
        const microsoftOptionElement = selectElement
            .querySelector(`[value="${microsoftVoice.name}"]`)
        microsoftOptionElement.selectElement = true
    }
})

buttonInsertText.addEventListener('click', () => {
    divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click', () => {
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', setVoice)

buttonReadText.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})

// 45:50