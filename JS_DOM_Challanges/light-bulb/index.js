

const btn = document.querySelector('#bulb-toggle')
const svg = document.querySelector('#light-bulb')
const html = document.querySelector('html')

const toggleBtn = () => {
    const value = svg.classList[0]

    if (value === 'off') {
        svg.classList = 'on'
        html.style.backgroundColor = '#fcecec'
    } else {
        svg.classList = 'off'
        html.style.backgroundColor = '#1e1c1c'
    }
}

btn.addEventListener('click', toggleBtn)
