const strCategory = `car, train, bike, animal, mammal, temperature, astronomy, beach, camping,
clothes, colors, container, driving, family, feelings, fruit, furniture, kings, job,
employment, kitchen, math, military, money, queens, school, science, sports, vehicle,
vacation, country
`
const arrCategory = strCategory.split(',').map(el => el.trim())
const arrConstraint = ['ml', 'topics']

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export { arrCategory, arrConstraint, random };