const csrfToken = document.querySelector("#review_save_content").dataset._token
const [ language, recipientEmail ] = FindLanguageAgent()
let agentName = recipientEmail.split('.')[0]
agentName = agentName.substring(0, 1).toUpperCase() + agentName.slice(1)

const targetURL = 'http://twins.belwired.net/dossiers/mailing'
const clientName = document.querySelectorAll(".collapsible-body")[1].querySelector(".row:nth-child(1)").querySelector("div:nth-child(2)").innerText.toLowerCase()
const investment = document.querySelectorAll(".collapsible-body")[4].querySelector('.row div:nth-child(2)').innerText

const companyNumber = window.location.href.split("/")[5]
const dossierId =  window.location.href.split("/")[7]
const avenant = window.location.href.split("/")[9]
const simulationId = window.location.href.split("/")[11].replace("#!", "")

const titleEmail = `${clientName.toUpperCase()} - ${investment.toUpperCase()}`
const emailBodyNL = `<p>Dag ${agentName},</p><br><br>
<p>Kunt u mij het bestelbon voor de klant in titel bezorgen?</p><br><br>
<p>Bij voorbaat bedankt</p>`

const emailBodyFR = `<p>Bonjour ${agentName},</p><br><br>
<p>Pourriez vous me fournir le bon de commande concernant le client en titre ?</p><br><br>
<p>D'avance merci</p>`

function SendMail() {
  let formData = new FormData()
  formData.append('_token', csrfToken)
  formData.append('email', recipientEmail)
  formData.append('subject', titleEmail)
  formData.append('comment_text', language === 'FR' ? emailBodyFR : emailBodyNL)
  formData.append('document_id', '')
  formData.append('document_title', '')

  FakeIt(`dossiers/mailing/${companyNumber}/${dossierId}/${avenant}/${simulationId}`)
  fetch(targetURL, {
      body: formData,
      method: "POST"
    })
    .then(() => {
      console.log('message envoyé')
    })
}
SendMail()


function FakeIt(refererURL) {
  const actualLocation = window.location.href
  window.history.replaceState(null, '', `/${refererURL}`)
  setTimeout(() => {
    window.history.replaceState(null, '', actualLocation)
  }, 1000);
}

function FindLanguageAgent() {
  const keyWordsFRNL = ['information', 'informatie']
  const language_nameAgent = []
  const cards = document.querySelectorAll(".card.comment-block .card-content")
  for (const card of cards) {
    const language = card.childNodes[2].textContent.trim().toLowerCase().split(' ')[0]

    if (keyWordsFRNL.includes(language)) {
      language === keyWordsFRNL[0] ? language_nameAgent.push('FR') : language_nameAgent.push('NL')

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
          
          nameAgent = nameAgent.join('.').concat('@mandat.belfius.be')
          break
        }
      }

      language_nameAgent.push(nameAgent)
      console.log(language_nameAgent);
      return language_nameAgent
    }
  }
}
