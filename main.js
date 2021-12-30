import './style.css'
const URL_TO_SEND = import.meta.env.VITE_URL_TO

const $APP = document.getElementById('app')

const input = ({ type, value, id, placeholder }) => `
  <div class="input-group">
    <input type="${type || 'text'}" id="${id}" value="${
  value || ''
}" placeholder="${placeholder || ''}">
  </div>
`
const button = ({ id, label }) => `
  <button id="${id}">${label}</button>
`

const iframe = (link) => `
  <iframe style="display:none;" src="${link}" id="frame"></iframe>
`
$APP.innerHTML = `
  ${input({ id: 'key', label: 'Key', placeholder: 'key', value:'test' })}
  ${input({ id: 'value', label: 'Value', placeholder: 'value', value:'test' })}
  ${button({ id: 'btn', label: 'Send' })}
  ${iframe(URL_TO_SEND)}
`

// aqui viene la Magia

const postCrossDomain = (data) =>
  document.getElementById('frame').contentWindow.postMessage(data, URL_TO_SEND)

  const $key = document.getElementById('key')
  const $value = document.getElementById('value')
document.getElementById('btn').addEventListener('click', function () {
  var msg = {
    key: $key.value,
    value: $value.value,
  }
  console.log('sending', {msg})
  postCrossDomain(msg)
})
