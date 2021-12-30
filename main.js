import './style.css'
const URL_TO_SEND = import.meta.env.VITE_URL_TO

const $APP = document.getElementById('app')

const input = ({ type, value, id, placeholder }) => `
  <div class="input-group">
    <input 
      type="${type || 'text'}"
      id="${id}"
      value="${value || ''}"
      placeholder="${placeholder || ''}">
  </div>
`

const button = ({ id, label }) => `
  <button class='btn' id="${id}">${label}</button>
`

const iframe = (link) => `
  <iframe style="display:none;" src="${link}" id="frame"></iframe>
`
$APP.innerHTML = `
  ${input({ id: 'key', label: 'Key', placeholder: 'key', value: '' })}
  ${input({ id: 'value', label: 'Value', placeholder: 'value', value: '' })}
  ${button({ id: 'btn', label: 'Send' })}
  ${iframe(URL_TO_SEND)}
  <a class='goto' href="${URL_TO_SEND}" target="_blank">Go to receiver</a>
`

const animateScale = (el, initScale=1.2, time=300) => {
  el.style.transform = `scale(${initScale})`
  setTimeout(() => {
    el.style.transform = `scale(1)`
    if (initScale > 1) {
      setTimeout(() => animateScale(el, initScale - 0.05, time-50), time)
    }
  }, time)
}

// aqui viene la Magia

const postCrossDomain = (data) =>
  document.getElementById('frame').contentWindow.postMessage(data, URL_TO_SEND)
const $goto = document.querySelector('.goto')
const $key = document.getElementById('key')
const $value = document.getElementById('value')
document.getElementById('btn').addEventListener('click', function () {
  var msg = {
    key: $key.value,
    value: $value.value,
  }
  console.log('sending', { msg })
  postCrossDomain(msg)
  $key.value = ''
  $value.value = ''
  animateScale($goto)
})
