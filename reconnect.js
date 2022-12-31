const csrfToken = document.querySelector("[name='_token']").value

function Reconnect() {
  const targetURL = 'http://twins.belwired.net/login/submit'

  let formData = new FormData()
  formData.append('_token', csrfToken)
  formData.append('username', 'laeysm')
  formData.append('password', 'changego')
  formData.append('action', '')

  fetch(targetURL,
  {
    body: formData,
    method: "POST"
  })
  .then(() => {
    window.location.href = document.referrer === 'http://twins.belwired.net/login' ? 'http://twins.belwired.net' : document.referrer
  })
}
Reconnect()