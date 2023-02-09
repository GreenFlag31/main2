const csrfToken = document.querySelector("#review_save_content").dataset._token
const completedStep = document.querySelector("input[name='completed_step']").value
const companyNumber = window.location.href.split("/")[5]
const dossierId =  window.location.href.split("/")[7]
const avenant = window.location.href.split("/")[9]
let simulationId = window.location.href.split("/")[11].replace("#!", "")
let contractList = []

function ConfirmCt() {
  const targetURL = 'http://twins.belwired.net/install'


  let formData = new FormData()
  formData.append('_token', csrfToken)
  formData.append('company_number', companyNumber)
  formData.append('dossier_id', dossierId)
  formData.append('avenant', avenant)
  formData.append('simulation_id', simulationId)
  formData.append('completed_step', completedStep)
  formData.append('action', 'CRTPROP')
  formData.append('install_address', 'BE')

  fetch(targetURL, {
    body: formData,
    method: "POST"
  })
  .then(() => {
    CreateIframe()
  })
} 
ConfirmCt()


function CreateIframe() {
  const iframe = document.createElement("iframe")
  // iframe.style.width = "800px"
  // iframe.style.height = "500px"
  iframe.style.display = "none"
  iframe.src = `http://twins.belwired.net/dossiers/documents/company_number/${companyNumber}/dossier_id/${dossierId}/avenant/${avenant}/simulation_id/${simulationId}/edit`
  document.body.appendChild(iframe)
  const searchedString = 'Cnt:'


  iframe.addEventListener('load', () => {
    const iframeBody = iframe.contentWindow.document.body
    let contractNumber = iframeBody.querySelectorAll('a.breadcrumb')[2].innerText
    contractNumber = contractNumber.slice(contractNumber.indexOf(searchedString) + searchedString.length).trim()
    const buttonToClick = iframeBody.querySelector("input.btn.right[value='Sauver']")
    buttonToClick.click()

    SendMail(contractNumber)
  }, { once: true })
}




async function SendMail(contractNumber) {
  const targetURL = 'http://twins.belwired.net/dossiers/mailing'


  const otherContrats = await CheckForOthersCt(contractNumber)
  if (otherContrats) return


  let url = window.location.href.split('/')
  let fetchedData = ''
  if (url.at(-1) !== '0') {
    url.pop()
    url = url.join('/').concat('/0')
    fetchedData = 'get-agent-email'
    await RetrieveDataFromURL(url, fetchedData)
    fetchedData = `.${fetchedData}`
  }

  const recipientEmail = localStorage.getItem('addr')
  const clientName = document.querySelectorAll(".collapsible-body")[1].querySelector(".row:nth-child(1)").querySelector("div:nth-child(2)").innerText
  const titleEmail = `${clientName}  -  ${contractNumber}`

  let emailAgent = FindLanguageAgent(fetchedData)
  if (!emailAgent) {
    emailAgent = await addManuallyAdressMail()
  }
  const emailBodyFR = `<br>Agent : ${emailAgent}<br><br><br><br>Bonne journée,`


  let formData = new FormData()
  formData.append('_token', csrfToken)
  formData.append('email', recipientEmail)
  formData.append('subject', titleEmail)
  formData.append('comment_text', emailBodyFR)
  formData.append('document_id', '')
  formData.append('document_title', '')

  FakeIt(`dossiers/mailing/${companyNumber}/${dossierId}/${avenant}/${simulationId}`)
  fetch(targetURL, {
      body: formData,
      method: "POST"
    })
    .then((response) => {
      window.history.replaceState(null, '', actualLocation)
      if (response.ok) {
        localStorage.removeItem('contracts')
      }
    })
}



async function TwinsApi() {
  simulationId = +window.location.href.split("/")[11].replace("#!", "") + 1
  const url = `http://twins.belwired.net:10052/api/bls/dossier/financial/${companyNumber}/${dossierId}/${avenant}/${simulationId}`
  
  
  const f = await fetch(url, {
    headers: {
      'power-user': 'Bond. James Bond.'
    }
  })
  const res = await f.json()

  simulationId--
  return res
}



async function CheckForOthersCt(contractNumber) {
  const twinsAPI = await TwinsApi()
  const error = twinsAPI.top_errors?.error_codes[0].code
  
  if (error) {
    // no other contract
    contractList.push(contractNumber)
    return Promise.resolve(false)
  }

  let existingContracts = localStorage.getItem('contracts')
  if (existingContracts) {
    contractList = JSON.parse(existingContracts)
  } 
  
  contractList.push(contractNumber)
  localStorage.setItem('contracts', JSON.stringify(contractList))
  return Promise.resolve(true)
}


async function addManuallyAdressMail() {
  const firstCardOnPage = document.querySelectorAll('.card')[1]
  const mailContainer = document.createElement('div')
  const input = document.createElement('input')
  input.style.margin = '0'
  input.placeholder = 'adresse email agent'
  const button = document.createElement('button')
  button.textContent = 'Validate'
  button.style.background = 'green'
  button.style.color = 'white'
  button.style.border = 'none'
  button.style.borderRadius = '5px'
  mailContainer.style.display = 'flex'
  mailContainer.style.gap = '10px'
  mailContainer.style.width = '20%'

  mailContainer.appendChild(input)
  mailContainer.appendChild(button)
  firstCardOnPage.appendChild(mailContainer)

  return new Promise(resolve => {
    button.onclick = () => {
      return resolve(input.value)
    }
  })
}


function FindLanguageAgent(fetchedData = '') {
  const keyWordsFRNL = ['information', 'informatie']
  const cards = document.querySelectorAll(`${fetchedData} .card.comment-block .card-content`)

  for (const card of cards) {
    const language = card.childNodes[2].textContent.trim().toLowerCase().split(' ')[0]
    if (keyWordsFRNL.includes(language)) {
      let nameAgent = card.childNodes[6].textContent.trim().toLowerCase().replace('\n')

      const initials = nameAgent.split(':')[0].trim()
      const firstLetter = initials.at(-1)
      nameAgent = (nameAgent.substring(nameAgent.indexOf(':') + 1)).trim().split(' ')

      for (let i = 1; i < nameAgent.length; i++) {
        if (nameAgent[i][0].toLowerCase() === firstLetter.toLowerCase()) {

          if (i > 1) {
            const lastName = nameAgent.slice(0, i).join('')
            nameAgent = nameAgent.splice(i)
            nameAgent.push(lastName)
          } else {
            nameAgent.push(nameAgent.shift())
          }
          
          // modif ?
          break
        }
      }

      return nameAgent.join('.').concat('@mandat.belfius.be')
    }
  }
}

async function RetrieveDataFromURL(url, classToAdd) {
  FakeIt(url)

  const f = await fetch(url)
  const data = await f.text()
  let span = document.createElement('span')
  span.classList.add(classToAdd)
  span.style.display = 'none'
  span.innerHTML = data

  document.body.appendChild(span)
}

const actualLocation = window.location.href
function FakeIt(refererURL) {
  window.history.replaceState(null, '', `/${refererURL}`)
}