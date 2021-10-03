const strCategory = `car, train, bike, animal, mammal, temperature, astronomy, beach, camping,
clothes, colors, container, driving, family, feelings, fruit, furniture, kings, job,
employment, kitchen, math, military, money, queens, school, science, sports, vehicle,
vacation, country
`
const arrCategory = strCategory.split(',').map(el => el.trim())
const arrConstraint = ['ml', 'topics']

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate Guessed Word
const genGuessedWord = (answer, guessedLetters) => (
    answer.split('').map(letter => guessedLetters.has(letter) ? letter : '_')
)

// Generate linear-gradient Background
const genBackground = (arrLength, topSatur, lowSatur) => {
    const randPercArr = Array(arrLength).fill().map((_, idx) => (
        idx * (100 / arrLength) + Math.ceil(Math.random() * (100 / arrLength))
    ))

    const linearBackground = Array(arrLength).fill().map((_, idx) => {
        const nextPercent = idx % 2 ? randPercArr[idx - 1] : randPercArr[idx]
        // Random saturation from 0 to 100
        const randSaturation = Math.ceil(Math.random() * (topSatur - lowSatur)) + lowSatur
        return `, hsl(210, 8%, ${randSaturation}%) ${nextPercent}%`
    })

    return `linear-gradient(25deg ${linearBackground.join('')})`
}

export { arrCategory, arrConstraint, random, genBackground, genGuessedWord };