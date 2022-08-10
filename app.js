const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')

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
    const selectedVoice = voices.find(voice)
    utterance.voice = selectedVoice
}

const createExpressionBox = ({ img, text }) => {
    const div = document.createElement('div')

    div.classList.add('expression-box')
    div.innerHTML = `
        <img src="${img}" alt="${text}">
        <p class="info">${text}</p>
    `
    
    div.addEventListener('click', () => {
        setTextMessage(text)
        speakText()

        div.classList.add('active')
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000)
    })

    main.appendChild(div)
}

humanExpressions.forEach(createExpressionBox)

let voices = []

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()

    voices.forEach(({ name, lang }) => {
        const option = document.createElement('option')

        option.value = name
        option.textContent = `${lang} | ${name}`
        selectElement.appendChild(option)
    })
})

buttonInsertText.addEventListener('click', () => {
    divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click', () => {
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', () => {})