const IDGeneralContainer = document.querySelectorAll('.card')[1]

async function CheckForPossibleID() {

  let companyName = document.querySelectorAll(".collapsible-body")[1].querySelector(".row div:nth-child(2)").innerText.split(" ")
  let folderID = ""

  const IDContainer = CreateDivWithClass('ID-container')
  IDContainer.style.display = 'flex'
  IDContainer.style.alignItems = 'center'
  IDContainer.style.gap = '20px'
  const message = document.createElement("p")
  message.classList.add("ID-message")
  message.style.margin = "0"
  message.style.fontSize = "17px"
  message.style.fontWeight = "500"
  message.textContent = "Validating Individual Decision ..."


  IDContainer.appendChild(message)
  CreateLoader("ID-container", IDContainer)

  
  if (abbreviationJF.includes(companyName.at(0))) {
    companyName.shift()
  } else if (abbreviationJF.includes(companyName.at(-1))) {
    companyName.pop()
  }
  
  companyName = companyName.join(" ") || companyName[0]

  
  const targetURL = `http://twins.belwired.net/v2/dossiers?client=${companyName}&limit=50`
  await RetrieveDataFromURL(targetURL, "list-folder", `<table`)
  
  let list = document.querySelectorAll(".list-folder tbody tr")
  for (const tr of list) {
    if (tr.querySelector("td:nth-child(11)").innerText !== "") {
      folderID = tr.querySelector("td:nth-child(2)").innerText
      break
    }
  }

  CheckOnPage(folderID, message)
}

async function CheckOnPage(folderID, message) {
  const IDField = '<input checked="checked" name="ib_flow" type="checkbox" value="1">'
  
  const data = await fetch(`http://twins.belwired.net/v2/dossier/analysis/${folderID}`)
  const response = await data.text()
  

  if (response.indexOf(IDField) !== -1) {
    message.innerHTML = "Based on last folder, Individual Decision is <span style= 'color: red; font-weight: bold'>not</span> possible&nbsp;&nbsp;&nbsp;❌"
  } else {
    addMessage(message, "Based on last folder, Individual Decision is possible")
  }

  message.animate([{ opacity: '0' }, { opacity: '1'}], { duration: 800, easing: 'ease-out' })

  HideLoader("ID-container")
}

function HideLoader(target) {
  document.querySelector(`.${target} .loader-container`).style.display = "none"
}



function CreateLoader(target, IDContainer) {
  const loaderContainer = CreateDivWithClass("loader-container")
  StyleLoaderContainer(loaderContainer)

  const loader = CreateDivWithClass("loader")
  StyleLoader(loader)

  loaderContainer.appendChild(loader)
  IDContainer.appendChild(loaderContainer)
  IDGeneralContainer.appendChild(IDContainer)
}
  


function CreateDivWithClass(className) {
  const div = document.createElement("div")
  div.classList.add(className)
  return div
}

const keyframes = [
  { transform: 'rotate(0)' },
  { transform: 'rotate(360deg)' }
]

const options = {
  duration: 1000,
  easing: "linear",
  iterations: Infinity
}

function StyleLoaderContainer(loaderContainer) {
  loaderContainer.style.position = "relative"
  loaderContainer.style.display = "inline-block"
  loaderContainer.style.transform = "translateY(10px)"
  loaderContainer.style.width = "40px"
  loaderContainer.style.height = "40px"

  loaderContainer.animate(keyframes, options)
}

function StyleLoader(loader) {
  loader.style.position = "absolute"
  loader.style.left = "50%"
  loader.style.top = "50%"
  loader.style.transform = "translate(-50%, -50%)"
  loader.style.width = "25px"
  loader.style.height = "25px"
  loader.style.border = "3px solid"
  loader.style.borderRadius = "50%"
  loader.style.borderColor = "#c30045 transparent"
}
const abbreviationJF = ["BV", "SRL", "NV", "SPRL", "SA", "M.", "DHR", "SCOMM", "COMMV", "SNC", "VOF", "MME", "MEVR", "ASBL", "VZW", "SAS", "SARL", "NVBA", "AF", "FV", "AISBL", "IVZW", "UP", "SE", "EV"]

async function RetrieveDataFromURL(url, classToAdd, searchedString, stored = true) {
  if (document.querySelector("." + classToAdd) && stored) return

  FakeIt(url.replace('http://twins.belwired.net/', ''))

  const f = await fetch(url)
  const data = await f.text()

  const spanProspect = document.createElement("span")
  const multipleSearchedString = searchedString.split("/")
  spanProspect.style.display = "none"
  spanProspect.classList.add(classToAdd)


  multipleSearchedString.forEach(item => {
    const searchedStringIndexStart = data.indexOf(item.replace("\n  ", ""))

    let searchedStringIndexEnd
    if (item === "<tbody>") {
      searchedStringIndexEnd = data.indexOf("</tbody>", searchedStringIndexStart) + item.length
    } else if (item === "<table") {
      searchedStringIndexEnd = data.indexOf("</table>", searchedStringIndexStart) + item.length
    } else {
      searchedStringIndexEnd = data.indexOf(">", searchedStringIndexStart) + 1
    }
    
    spanProspect.insertAdjacentHTML("beforeend", data.substring(searchedStringIndexStart, searchedStringIndexEnd))
  })

  document.body.appendChild(spanProspect)
}

const actualLocation = window.location.href
function FakeIt(refererURL) {
  window.history.replaceState(null, '', `/${refererURL}`)
  setTimeout(() => {
    window.history.replaceState(null, '', actualLocation)
  }, 1000);
}

function addMessage(message, text) {
  message.innerHTML = `${text}&nbsp;&nbsp;&nbsp;`
  message.appendChild(AddIconToMessage())
}
function AddIconToMessage() {
  const spanMessage = document.createElement("span")
  spanMessage.textContent = "✔"
  spanMessage.style.color = "green"
  spanMessage.style.fontWeight = "bold"

  return spanMessage
}

CheckForPossibleID()
