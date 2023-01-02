// Helper button
const btnInsertionAfter = document.querySelector(".fixed-action-btn.horizontal.click-to-toggle")

const csrfToken = document.querySelector("#review_save_content")?.dataset._token

const btn = document.createElement("button")
btn.textContent = "HELPER"
btn.style.position = "fixed"
btn.style.display = "inline"
btn.style.top = "50%"
btn.style.left = "60px"
btn.style.transform = "translateX(-50%)"
btn.style.padding = "14px 20px"
btn.style.fontWeight = "600"
btn.style.color = "white"
btn.style.border = "none"
btn.style.background = "rgb(0 128 0)"
btn.style.borderRadius = "20px"
btn.style.zIndex = "3"
btn.style.boxShadow = "1px 2px 6px 1px rgb(0 128 0 / 76%)"
btnInsertionAfter.after(btn)

const modalInsertionAfter = document.querySelector(".drag-target")
const modalContainer = document.createElement("div")
const overlay = document.createElement("div")
const modal = document.createElement("div")

// contenu 
const closebtnModal = document.createElement("button")
closebtnModal.classList.add("modal-trigger")
closebtnModal.textContent = "X"

const isClient = document.querySelector(".collapsible-header.active").innerText.includes("Client") || document.querySelector(".collapsible-header.active").innerText.includes("Klant")

// Supplier
const supplierContainer = HeadStructure("supplier-container", "Supplier (🇧🇪 & 🇪🇺)", "N° VAT (Type prefix if not Belgium. Ex: NL)/Address/Name/N° Chassis")

// Investment
const investmentContainer = HeadStructure("investment-container", "Investment", "Asset Name/Asset Type (List)/Description/Price/Date (if secondhand)/Date revolving (if Master)")

// Financial
const financialContainer = HeadStructure("financial-container", "Financial", "Duration/Purchase Option (% or €)/Interest/Down Payment")

// Warranty
const warrantyContainer = HeadStructure("warranty-container", "Warranty", "Personal caution (covering less-value) : Name, client number or VAT with BE prefix /Pursue engagement : VAT")



function CreateField(fieldType, title) {
  const newField = document.createElement(fieldType)
  newField.placeholder = title

  return newField
}


function HeadStructure(divClass, title, inputs) {
  const divContainer = document.createElement("div")
  divContainer.classList.add(divClass)
  const categoryTitle = document.createElement("h3")
  categoryTitle.textContent = title


  divContainer.appendChild(categoryTitle)
  const hr = document.createElement("hr")
  divContainer.appendChild(hr)

  categoryTitle.style.marginBottom = "2px"
  categoryTitle.style.fontSize = "17px"
  categoryTitle.style.fontWeight = "500"
  categoryTitle.style.color = "#039be5"
  categoryTitle.style.textTransform = "uppercase"
  hr.style.marginTop = 0
  hr.style.marginBottom = "20px"
  hr.style.border = "1px dashed lightgrey"

  const inputsTitle = inputs.split("/")
  inputsTitle.forEach(inputTitle => {

    let newField
    if (inputTitle.includes("Asset Type")) {
      newField = CreateField("select", inputTitle)
      newField.classList.add("asset-list")
      newField.style.display = "block"
      newField.style.width = "50%"
    } else {
      newField = CreateField("input", inputTitle)
    }

    const label = document.createElement("label")
    label.textContent = inputTitle
    label.style.display = "block"
    divContainer.appendChild(label)
    divContainer.appendChild(newField)
    divContainer.appendChild(document.createElement("br"))
  })
  
  if (divClass === "supplier-container") {
    const searchContainer = document.createElement("div")
    searchContainer.classList.add("search-container")
    searchContainer.style.display = "flex"
    searchContainer.style.justifyContent = "flex-start"
    searchContainer.style.alignItems = "center"

    const searchBtn = CreateButton("SEARCH", "grey")
    searchBtn.style.marginRight = "80px"
    searchBtn.classList.add("search")

    searchContainer.appendChild(searchBtn)
    divContainer.appendChild(searchContainer)
  } else {
    const confirmBtn = CreateButton("CONFIRM", "green")
    confirmBtn.classList.add(divClass.split("-")[0] + "-btn")
    divContainer.appendChild(confirmBtn)
  }

  return divContainer
}




function AddIconToMessage() {
  const spanMessage = document.createElement("span")
  spanMessage.textContent = "✔"
  spanMessage.style.color = "green"
  spanMessage.style.fontWeight = "bold"

  return spanMessage
}


function DisplayMessage(message, color = "black") {
  pMessage.style.opacity = "1"
  pMessage.style.margin = "16px 0"
  pMessage.style.height = "auto"
  pMessage.style.color = color
  pMessage.textContent = message
}

function HideMessage() {
  pMessage.style.opacity = "0"
  pMessage.style.height = "0"
  pMessage.style.margin = "0"
}


function CreateButton(title, color) {
  const btn = document.createElement("button")
  btn.textContent = title
  btn.style.padding = "10px"
  btn.style.fontSize = "14px"
  btn.style.fontWeight = "500"
  btn.style.cursor = "pointer"
  btn.style.background = color
  btn.style.color = "white"
  btn.style.border = "none"
  btn.style.boxShadow = "1px 2px 5px 0px rgb(174 156 156 / 76%)"
  return btn
}


setTimeout(() => {
  document.querySelectorAll(".modal-custom-content input").forEach(input => {
    input.style.marginBottom = "15px"
    input.style.border = "none"
    input.style.outline = "none"
    input.style.width = "50%"
    input.style.borderBottom = "1px solid lightgrey"
    input.style.paddingBottom = "5px"
  })
}, 0)

modal.classList.add("modal-custom-content")
modal.appendChild(closebtnModal)
modal.appendChild(supplierContainer)
modal.appendChild(investmentContainer)
modal.appendChild(financialContainer)
modal.appendChild(warrantyContainer)


modalContainer.appendChild(overlay)
modalContainer.appendChild(modal)


modalContainer.style.position = "fixed"
modalContainer.style.top = "0"
modalContainer.style.left = "0"
modalContainer.style.width = "100vw"
modalContainer.style.height = "100vh"
modalContainer.style.zIndex = "4"
// modalContainer.style.visibility = "hidden"
modalContainer.style.transition = "visibility 0.4s"


overlay.classList.add("overlay", "modal-trigger")
overlay.style.position = "absolute"
overlay.style.width = "100%"
overlay.style.height = "100%"
overlay.style.background = "#000"
overlay.style.opacity = "0.5"
overlay.style.transition = "opacity 0.4s 0.2s ease-out"

modal.style.maxWidth = "800px"
modal.style.maxHeight = "500px"
// modal.style.maxHeight = "600px"
modal.style.minWidth = "70vw"
modal.style.overflowY = "scroll"

modal.style.padding = "40px"
modal.style.background = "#fff"
modal.style.borderRadius = "5px"
modal.style.position = "relative"
modal.style.top = "50%"
modal.style.left = "50%"
modal.style.transform = "translate(-50%, calc(-50% - 50px))"
modal.style.transition = "transform 0.4s ease-out"
modal.style.opacity = "1"
modal.style.transition = "opacity 0.4s ease-out"

closebtnModal.style.position = "absolute"
closebtnModal.style.top = "10px"
closebtnModal.style.right = "6px"
closebtnModal.style.padding = "10px 16px"
closebtnModal.style.background = "green"
closebtnModal.style.color = "white"
closebtnModal.style.fontWeight = "700"
closebtnModal.style.border = "none"
closebtnModal.style.borderRadius = "29px"

modalInsertionAfter.after(modalContainer)


CreateButtonPClient()
RegenerateContract()


document.querySelectorAll(".modal-trigger")
  .forEach(trigger => {
    trigger.addEventListener("click", ToggleModal)
})


function ToggleModal() {
  //switch off (back to normal page)
  overlay.style.opacity = "1"
  overlay.style.transition = "opacity 0.4s ease-out"
  overlay.style.background = "none"
  
  modal.style.opacity = "0"
  modal.style.transition = "opacity 0.4s 0.2s ease-out"
  modal.style.transform = "translate(-50%, calc(-50% - 50px))"
  modal.style.transition = "transform 0.4s ease-out"

  btn.style.zIndex = "5"
  modalContainer.style.width = "0"
  modalContainer.style.height = "0"
}


btn.addEventListener("click", () => {
  modal.style.opacity = "1"
  overlay.style.opacity = "0.5"
  overlay.style.background = "#000"

  modal.style.transform = "translate(-50%, -50%)"
  modal.style.transition = "opacity 0.4s 0.2s ease-out"
  modal.style.transition = "transform 0.4s 0.2s ease-out"
  
  btn.style.zIndex = "0"
  modalContainer.style.width = "100vw"
  modalContainer.style.height = "100vh"
})


let responseAPI = ""
let VATClient = document.querySelectorAll(".collapsible-body")[1].querySelector(".row:nth-child(4) div:nth-child(2)").innerText
VATClient = VATClient.replace(/^[^0-9]+/, '')

document.querySelector(".supplier-container .search").addEventListener("click", () => {
  document.querySelector(".result-container")?.remove()
  
  CreateLoader("search-container")
  CompleteSupplier()
})


function HideLoader(target) {
  document.querySelector(`.${target} .loader-container`).style.display = "none"
}

function CreateLoader(target) {
  if (document.querySelector(`.${target} .loader-container`)) {
    document.querySelector(`.${target} .loader-container`).style.display = "block"
    return
  }

  const loaderContainer = CreateDivWithClass("loader-container")
  StyleLoaderContainer(loaderContainer)

  const loader = CreateDivWithClass("loader")
  StyleLoader(loader)

  loaderContainer.appendChild(loader)
  document.querySelector(`.${target}`).appendChild(loaderContainer)
}

function CreateDivWithClass(className) {
  const div = document.createElement("div")
  div.classList.add(className)
  return div
}


function StyleLoaderContainer(loaderContainer) {
  const keyframes = [
    { transform: 'rotate(0)' },
    { transform: 'rotate(360deg)' }
  ]
  
  const options = {
    duration: 1000,
    easing: "linear",
    iterations: Infinity
  }
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
  loader.style.width = "35px"
  loader.style.height = "35px"
  loader.style.border = "3px solid"
  loader.style.borderRadius = "50%"
  loader.style.borderColor = "#c30045 transparent"
}

function createEventLoadingButton() {
  responseAPI = ""
  const loading = document.querySelector(".loading-button")
  
	loading.addEventListener("click", () => {
    loading.textContent = "Loading ..."

    document.querySelector(".search-container .loader-container").style.display = "block"

		if (!error) CheckIfOthersAvailable()
	})
}


async function CheckIfOthersAvailable() {
  const VAT = document.querySelector('.result-container [name="ntva"]').value
  let response
  if (!responseAPI) {
    response = await FetchCBE(VAT)
  }

  SeveralUnits(response)
  HideLoader("search-container")
}

// 0419725928

function ResultStructure() {
  if (document.querySelector(".result-container")) {
    return document.querySelector(".result-container")
  }


  const element = document.createElement("div")
  element.classList.add("result-container")
  element.style.display = "flex"
	element.style.flexWrap = "wrap"
  element.style.gap = "8px"
  element.style.marginTop = "15px"
  supplierContainer.appendChild(element)
  return element
}


function formatVATNumber() {
	let VAT = document.querySelector('[placeholder="N° VAT (Type prefix if not Belgium. Ex: NL)"]').value
  VAT = VAT.replace(/\.|\s/g, '')
  document.querySelector('[placeholder="N° VAT (Type prefix if not Belgium. Ex: NL)"]').value = VAT
	return VAT
}


const companyNumber = window.location.href.split("/")[5]
const dossierId =  window.location.href.split("/")[7]
const avenant = window.location.href.split("/")[9]
const simulationId = window.location.href.split("/")[11].replace("#!", "")


function CreateButtonPClient() {
  if (!isClient) {
    const button = StyleButton("prospect-client", "Transform Prospect to Client")
    addEventPtoClient(button)
  }
}

function StyleButton(classToAdd, text) {
  const button = document.createElement("button")
  button.classList.add(classToAdd)
  button.textContent = text
  button.style.border = "2px solid orange"
  button.style.color = "orange"
  button.style.background = "none"
  button.style.fontWeight = "500"
  button.style.borderRadius = "20px"
  button.style.padding = "7px 14px"
  button.style.marginBottom = "20px"
  
  const supplierContainer = document.querySelector(".supplier-container")
  document.querySelector(".modal-custom-content").insertBefore(button, supplierContainer)
  return button
}

function RegenerateContract() {
  const icons = Array.from(document.querySelectorAll(".secondary-content a.black-text i"))
  if (icons.every(icon => icon.textContent !== "redo")) return

  const button = StyleButton("regen-contract", "Regenerate contract with Cancel-Replace clause")
  addEventRegenerateContract(button)
}


function addEventRegenerateContract(button) {
  button.addEventListener("click", () => {
    RegenWithARClause()
  })
}
function addEventPtoClient(button) {
  button.addEventListener("click", () => {
    TransformProspectToClient()
  })
}

const actualLocation = window.location.href


async function RegenWithARClause() {
  const targetURL = "http://twins.belwired.net/dossiers/additionalservice"

  const fetchedPageProspect = document.querySelector(".collapsible-header.active .secondary-content a").href
  await RetrieveDataFromURL(fetchedPageProspect, "regeneration-language", `<input disabled="disabled" name="d02lang" type="text" value="`)
  const language = document.querySelector("[name='d02lang']").value

  GetDateGenerationContract()
  let text
  if (language === "FR") {
    text = "Ce contrat annule et remplace celui établi le "
  } else {
    text = "Dit contract annuleert en vervangt het contract opgemaakt op "
  }
  text += GetDateGenerationContract() + "."

  // 0401401044

  let formData = new FormData()
  formData.append('_token', csrfToken)
  formData.append('company_number', companyNumber)
  formData.append('dossier_id', dossierId)
  formData.append('avenant', avenant)
  formData.append('simulation_id', simulationId)
  formData.append('category', "9")
  formData.append('included', "O") 
  formData.append('additional_text', text) 

  fetch(targetURL,
  {
    body: formData,
    method: "POST"
  })
  .then(async () => {
    await PostDataRegeneration()
  })
  .then(async () => {
    const btnRegen = document.querySelector(".regen-contract")
    await ChangeButtonMessage(btnRegen, "Clause added ", "green")
  })
}


function FindParametersRegeneration() {
  const chkdocs = []
  let items = document.querySelectorAll(`.regeneration-page-1 .form-group input[type="checkbox"]`)
  
  items.forEach(item => {
    chkdocs.push(item.value)
  })

  return chkdocs
}

async function PostDataRegeneration() {
  const regenPage = `http://twins.belwired.net/dossiers/documents/company_number/${companyNumber}/dossier_id/${dossierId}/avenant/${avenant}/simulation_id/${simulationId}/edit`
  await RetrieveDataFromURL(regenPage, "regeneration-page-1", `<input name="documents" type="hidden" value="/<input name="parameters" type="hidden" value="/<tbody>`)


  // debugger
  const documents = document.querySelector("[name='documents']").value
  const parameters = document.querySelector("[name='parameters']").value
  const chkdocs = FindParametersRegeneration()

  const targetURL = `http://twins.belwired.net/dossiers/documents/company_number/${companyNumber}/dossier_id/${dossierId}/avenant/${avenant}/simulation_id?simulation_id=${simulationId}`

  let formData = new FormData()
	formData.append('_token', csrfToken)
	formData.append('company_number', companyNumber)
	formData.append('dossier_id', dossierId)
	formData.append('avenant', avenant)
	formData.append('simulation_id', simulationId)
	formData.append('documents', documents)
	formData.append('parameters', parameters)

  chkdocs.forEach(chkdoc => {
    formData.append('chkdocs[]', chkdoc)
    formData.append('cmbfmt' + chkdoc, "pdf")
  })

  FakeIt(regenPage)

	fetch(targetURL,
	{
		body: formData,
		method: "POST"
	})
}

function GetDateGenerationContract() {
  const cards = document.querySelectorAll(".card.comment-block .card-title")

  for (const card of cards) {
    if (card.innerText.includes("contrat") || card.innerText.includes("contract")) {
      const date = card.closest(".row").querySelectorAll(".chip")[1].innerText.trim().split(" ")[0]
      return date
      break
    }
  }
}

async function RetrieveDataFromURL(url, classToAdd, searchedString, stored = true) {
  if (document.querySelector("." + classToAdd) && stored) return

  FakeIt(url)

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




async function GetPicandProspectNumber() {
  const fetchedPageProspect = document.querySelector(".collapsible-header.active .secondary-content a").href
  let prospectNumber = fetchedPageProspect.split("/")
  prospectNumber = prospectNumber[prospectNumber.length - 1]
  const url = fetchedPageProspect + '/edit'

  await RetrieveDataFromURL(url, "get-PIC-Prospect-number", `<input id="pic_number" name="pic_number" type="text" value="`)
  const PIC = document.querySelector('#pic_number').value

  return [PIC, prospectNumber]
}

 

async function TransformProspectToClient() {
  const prospectClient = document.querySelector(".prospect-client")
  prospectClient.textContent = "Step 0/2"

  const [PIC, ProspectNumber] = await GetPicandProspectNumber()
  const response = await FetchCBE(VATClient)

  if (response.errorCode) {
    ChangeButtonMessage(prospectClient, response.message, "red")
    return
  }
  if (response.typeOfEnterpriseDescription['FR'] !== "Personne morale") {
    //add a function to complete the most data 
    ChangeButtonMessage(prospectClient, "Failed : Natural Person", "red")
    return
  }
  if (!PIC) {
    ChangeButtonMessage(prospectClient, "Failed : PIC unavailable. Fill PIC & restart", "red")
    setTimeout(() => {
      ChangeButtonMessage(prospectClient, "Transform prospect to client", "orange")
    }, 5000);
    return
  }

  const juridicForm = listOfEnterprisesType[response.juridicalFormDescription.FR]
  const name = LimitFieldLength(response.denominations[0].denomination.toUpperCase())
  const address = LimitFieldLength(response.addresses[0].streetFR.toUpperCase())
  const completeAdress = address + " " + response.addresses[0].houseNumber
  const language = response.denominations[0].language === 1 ? "FR" : "NL"
  const zipcode = response.addresses[0].zipcode
  const city = LimitFieldLength(response.addresses[0].municipalityFR.toUpperCase())
  const constitutionDate = response.startDate.split("T")[0].split("-")
  const constitutionDay = Number.parseInt(constitutionDate[2])
  const constitutionMonth = Number.parseInt(constitutionDate[1])
  const constitutionYear = constitutionDate[0]
  const formattedDate = constitutionDate.reverse().join("/")
  const naceCodesArray = response.activities

  const targetURL = "http://twins.belwired.net/prospects"

  let formData = new FormData()
  formData.append('_token', csrfToken)
  formData.append('prospect_number', ProspectNumber)
  formData.append('name', name)
  formData.append('name_continued', "")
  formData.append('company_form', juridicForm)
  formData.append('client_type', "02")
  formData.append('code_immo', "M") 
  formData.append('pic_number', PIC) 
  formData.append('language', language) 
  formData.append('judicial_capacity', "100") 
  formData.append('address', completeAdress) 
  formData.append('zip_code', zipcode) 
  formData.append('city', city)
  formData.append('country_code', 'BE')
  formData.append('country_code_vat', 'BE')
  formData.append('vat_number', VATClient)
  formData.append('unity_enterprise', '')
  formData.append('constitution_date', formattedDate) 
  formData.append('constitution_day', constitutionDay)
  formData.append('constitution_month', constitutionMonth)
  formData.append('constitution_year', constitutionYear)
  formData.append('vat_enabled', "1")
  formData.append('liable_date', formattedDate)
  formData.append('liable_day', constitutionDay)
  formData.append('liable_month', constitutionMonth)
  formData.append('liable_year', constitutionYear)
  formData.append('know_your_customer', '0')
  formData.append('final_benificiary', '0')

  FakeIt(`prospects/${ProspectNumber}/edit`)

  fetch(targetURL,
  {
    body: formData,
    method: "POST"
  })
  .then(async () => {
    prospectClient.textContent = "Step 1/2"
    await FinalStepClient(PIC, ProspectNumber, naceCodesArray)
  })
  .then(async () => {
    if (!naceCodesArray.length) return
    ChangeButtonMessage(prospectClient, "Client", "green")
  })
}

function ChangeButtonMessage(element, message, color) {
  element.textContent = message
  element.style.color = color
  element.style.borderColor = color
}

async function FinalStepClient(PIC, ProspectNumber, naceCodesArray) {
  const naceCode = FindFirstNC(naceCodesArray)


  if (!naceCode) {
    ChangeButtonMessage(document.querySelector(".prospect-client"), "Failed : Nace code unavailable. It still achieved the first step.", "red")
    return
  }
  const targetURL = "http://twins.belwired.net/prospecttocustomer"
  // debugger

  let formData = new FormData()
  formData.append('_token', csrfToken)
  formData.append('d02ste', companyNumber)
  formData.append('prospect_number', ProspectNumber)
  formData.append('d02cimmo', 'M')
  formData.append('pic_number', PIC)
  formData.append('d02cact', naceCode)
  formData.append('d02appo', "02")
  formData.append('unity_enterprise', '')

  FakeIt(`prospecttocustomer/${ProspectNumber}?d02ste=`)

  fetch(targetURL,
  {
    body: formData,
    method: "POST"
  })
}

function FindFirstNC(naceCodesArray) {
  for (const nace of naceCodesArray) {
    if (nace.naceCode) return nace.naceCode
    break
  }
}



function FakeIt(refererURL) {
  window.history.replaceState(null, '', `/${refererURL}`)
  setTimeout(() => {
    window.history.replaceState(null, '', actualLocation)
  }, 1000);
}



async function TwinsApi() {
  // http://twins.belwired.net/dossiers/debtors?name=COLENIS
  // http://twins.belwired.net/dossiers/warranty?vat_number=0404265811
  const url = `http://twins.belwired.net:10052/api/bls/dossier/financial/${dossierId}/${companyNumber}/${avenant}/${simulationId}`
  const data = await fetch(url, {
    headers: {
      'power-user': 'nabila'
    }
  })
  const response = await data.json()
  return response
}




document.querySelector("[placeholder='N° VAT (Type prefix if not Belgium. Ex: NL)']").value = document.querySelectorAll(".collapsible-body")[3].querySelector(".row:nth-child(4)")?.querySelector("div:nth-child(2)").innerText.replace("BE", "") ?? ""
document.querySelector("[placeholder='Address']").value = document.querySelectorAll(".collapsible-body")[3].querySelector(".row:nth-child(3)")?.querySelector("div:nth-child(2)").innerText.split(",")[0] ?? ""
// populate with actual supplier ?

let hasBeenCreated = false

async function CompleteSupplier(display = true) {
  //Reset
  responseAPI = ""
  error = false
  let isEUVAT = false
  let prefix = ""
  document.querySelector(".pMessage-supplier").style.opacity = "0"
  document.querySelector(".pMessage-supplier").style.height = "0"
  document.querySelector(".pMessage-supplier").style.margin = "0"
  document.querySelector(".result-container")?.remove()
  document.querySelector(".loading-button")?.remove()

	let VATnumber = formatVATNumber()
  
  document.querySelector('[placeholder="N° VAT (Type prefix if not Belgium. Ex: NL)"]').value = VATnumber

  const address = document.querySelector('[placeholder="Address"]').value
	const supplierNumber = ""
  const supplierName = document.querySelector('[placeholder="Name"]').value
  const ChassisNumber = document.querySelector('[placeholder="N° Chassis"]').value

  // If EU supplier
  if (isNaN(VATnumber.substring(0,2))) {
    prefix = VATnumber.substring(0,2)
    VATnumber = VATnumber.substring(2)
    isEUVAT = true
  }


  const refererURL = `dossiers/supplier/${companyNumber}/${dossierId}/${avenant}/${simulationId}/edit`
  FakeIt(refererURL)

  
  await fetch(`http://twins.belwired.net/suppliers/search?modal_d03ntva=${VATnumber}&modal_d03nom=${supplierName}&modal_d03frs=${supplierNumber}&modal_address=${address}`)
    .then(response => response.json())
    .then(async data => {
      
      if (data.total > 0) {
        const resultContainer = ResultStructure()
        
        data.items.forEach(item => {
          const itemContainer = CreateItemContainer()
          itemContainer.insertAdjacentHTML("beforeend", item)
          if (!display) {
            itemContainer.style.display = "none"
            itemContainer.classList.add("selected-supplier")
          }

          resultContainer.appendChild(itemContainer)
        })
        HideLoader("search-container")
        
        if (isEUVAT) {
          if (prefix.toUpperCase() !== document.querySelector("[name='ctva']").value) {
            document.querySelector(".result-container")?.remove()
            CreateSupplier()
            return
          }

          // NL862399373B01
          AddBgEUFlag()
        }

        if ((VATnumber || resultContainer) && !isEUVAT && !hasBeenCreated) {
          supplierContainer.appendChild(CreateButtonLoading())
          createEventLoadingButton()
        }
				
        if (data.total > 1 && !isEUVAT) {
          CollectEstablishmentUnits()
          DisplayMessage("Several units are associated with this VAT number. Pick up one 🎯 :")
        }

      } else {
        if (CheckIfVATisPresent(VATnumber) === false) return
        DisplayMessage("Supplier unknown in the database. Loading... ⏳")
        await CreateSupplier()
      }
      TintItBlack()
      SelectableSupplier()
    }) 

  hasBeenCreated = false
}


function AddBgEUFlag() {
  const parentDiv = document.querySelectorAll(".result-container div")
  parentDiv.forEach(parent => {
    if (parent.classList.contains("right")) return

    parent.style.position = "relative"
    const img = document.createElement("img")
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/255px-Flag_of_Europe.svg.png"
    img.style.opacity = "0.3"
    img.style.width = "100%"
    img.style.height = "100%"
    img.style.left = "0"
    img.style.top = "0"
    img.style.objectFit = "cover"
    img.style.position = "absolute"

    
    let collectionItem = parent.querySelector(".collection-item")
    if (!collectionItem) {
      // not yet in Database
      collectionItem = document.querySelector(".supplier-DOM-values")
    } else {
      collectionItem.style.position = "absolute"
      collectionItem.style.top = "5px"
      collectionItem.style.left = "3px"
      parent.insertBefore(img, collectionItem)
    }

  })
}


function CheckIfVATisPresent(VATnumber) {
  if (!VATnumber) {
    DisplayMessage("No result. Please fill in the VAT number 🚀")
    HideLoader("search-container")
    return false
  }

  return true
}

let establishmentUnits = []
function CollectEstablishmentUnits() {
	const results = document.querySelectorAll(".result-container div")
	results.forEach(unit => {
		establishmentUnits.push(unit.querySelector("input[name='unet']")?.value)
	})
	establishmentUnits = establishmentUnits.filter(item => item !== undefined)
}

function CreateButtonLoading() {
	const button = document.createElement("button")
	button.classList.add("loading-button")
	button.textContent = "Load more"
	button.style.padding = "5px 10px"
	button.style.marginTop = "10px"
	button.style.opacity = "1"
	button.style.transition = "all 0.3s"
	button.style.borderRadius = "20px"
	button.style.fontWeight = "500"
	button.style.color = "orange"
	button.style.border = "2px solid orange"
	button.style.background = "white"
	return button
}

function TintItBlack() {
  document.querySelectorAll(".result-container a.collection-item").forEach(item => {
    item.style.color = "#333"
    item.style.fontWeight = "500"
  })
}


function SelectableSupplier() {
  document.querySelectorAll(".result-container div")
    .forEach(container => {

      container.addEventListener("click", () => {
        RemoveAllSelected()
        container.classList.add("selected-supplier")
        container.style.borderRadius = "5px"
        container.style.boxShadow = "0px 0px 17px 0px rgb(166 161 161 / 61%)"

        
				ClickToConfirm()
      })
  })
}

function ClickToConfirm() {

	if (SeveralUnitsBoolean && (CheckIfAlreadyInDB() === false)) {
		CreateSupplier()
		HideMessage()
		return
	}

  if (document.querySelector('[name="ctva"]').value !== "BE" && !document.querySelector('[name="frs"]')) {
    // EU && not in DataBase
    CreateAndAddEUSupplier()
    return
  }
	
  document.querySelector(".loading-button")?.remove()
	UpdateSupplier()	
}



function CreateAndAddEUSupplier() {
  const targetURL = "http://twins.belwired.net/suppliers"
  const containerSupplierValues = document.querySelector(".supplier-DOM-values")

  let language = containerSupplierValues.querySelector("[name='ctva']").value
  if (language !== "NL" || language !== "FR" ) {
    language = "EN"
  }

  let formData = new FormData()
	formData.append('_token', csrfToken)
	formData.append('d03nom', containerSupplierValues.querySelector("[name='nom']").value)
	formData.append('d03cfj', "00")
	formData.append('d03ctva', containerSupplierValues.querySelector("[name='ctva']").value)
	formData.append('d03ntva', containerSupplierValues.querySelector("[name='ntva']").value)
	formData.append('d03lang', language)
	formData.append('d03ad1', containerSupplierValues.querySelector("[name='ad1']").value + " " + containerSupplierValues.querySelector("[name='ad2']").value)
	formData.append('d03pay', containerSupplierValues.querySelector("[name='ctva']").value)
	formData.append('d03cpo', containerSupplierValues.querySelector("[name='cpo']").value) 
	formData.append('d03vil', containerSupplierValues.querySelector("[name='vil']").value)

  const refererURL = 'suppliers/create'
  FakeIt(refererURL)

	fetch(targetURL,
	{
		body: formData,
		method: "POST"
	})
    .then(async response => {
      if (response.ok) {
        // for easy DOM manipulation
        await CompleteSupplier(false)
      }
    })
    .then(async () => {
      await UpdateSupplier()
    })
}


function RemoveAllSelected() {
  document.querySelectorAll(".result-container div")
    .forEach(item => {
      item.classList.remove("selected-supplier")
      item.style.boxShadow = "none"
    })
}

async function FetchEUAPI(VAT) {
  const fetchEU = await fetch(`https://controleerbtwnummer.eu/api/validate/${VAT}.json`)
  return fetchEU.json()
}

async function FetchCBE(VAT) {
  // const VAT = "0401401044"
  const fetchCBE = await fetch(`https://demoapi.cbe2json.be/?cbe=${VAT}`)
  responseAPI = await fetchCBE.json()
  // console.log(responseAPI);
  return responseAPI
}




function SeveralUnits(response) {
  const result = document.querySelector(".result-container") || ResultStructure()
  const units = response.establishments
	let counter = 0
  
  if (response.errorCode) {
    DisplayMessage(response.message + " ❌")
    return
  } else if (units.length <= 1) {
		NoOtherUnit()
    return
  } else {
    SeveralUnitsBoolean = true
  }

  for (let i = 0; i < response.establishments.length; i++) {
    const itemContainer = CreateItemContainer()
    const address = units[i].addresses[0]
		
		if (!establishmentUnits.includes(units[i].establishmentNumber.replaceAll(".", ""))) {
			itemContainer.insertAdjacentHTML("beforeend", `<div style="display: flex; justify-content: space-between; align-items: flex-start"><p style="color: green; font-size: 16px; font-weight: bold; margin: 0">NEW</p><span style="font-size: 18px; margin: 0">🏛️</span></div><p>${address.streetFR.toUpperCase()} ${address.houseNumber}</p>
			<p>${address.zipcode} ${address.municipalityFR.toUpperCase()}</p>
			<p>Unit : ${units[i].establishmentNumber}</p>`)
			result.appendChild(itemContainer)
			counter += 1
      ItemContainerStyling(itemContainer)
		}
  }
	
	if (counter > 0) {
		DisplayMessage("Several units are associated with this VAT number. Pick up one 🎯 :")
		SelectableSupplier()	
		document.querySelector(".loading-button")?.remove()
	} else {
		NoOtherUnit()
	}
}

function ItemContainerStyling(itemContainer) {
  const allParagraphfromSecond = itemContainer.querySelectorAll("p:not(:first-child)")
  allParagraphfromSecond.forEach(p => {
    p.style.margin = "5px 0"
    p.style.fontWeight = "500"
  })
}

function CreateItemContainer() {
  const itemContainer = document.createElement("div")
  itemContainer.style.cursor = "pointer"
  itemContainer.style.transition = "box-shadow 0.5s"
  itemContainer.style.boxShadow = "none"
  itemContainer.style.width = "350px"
  itemContainer.style.minHeight = "130px"
  itemContainer.style.padding = "10px"

  return itemContainer
}


function NoOtherUnit() {
  DisplayMessage("No other units available", "orange")
	document.querySelector(".loading-button")?.remove()
}

let SeveralUnitsBoolean = false
let error = false


function CheckIfAlreadyInDB() {
  if (document.querySelector(".result-container .selected-supplier .right")) {
    return true
  } 

  return false
}


function FindIndexSelection(response) {
  let unitNumber = document.querySelector(".result-container .selected-supplier p:last-child").textContent
  unitNumber = (unitNumber.replaceAll(" ", "")).replace("Unit:", "")
  let index = 0

  
  for (const unit of responseAPI.establishments) {
    if (unit.establishmentNumber === unitNumber) {
      return index
      break
    }
    index++
  }
}


async function CreateSupplier() {
  const VAT = document.querySelector('[placeholder="N° VAT (Type prefix if not Belgium. Ex: NL)"]').value || document.querySelector('.result-container [name="ntva"]').value

  let response
  if (!isNaN(VAT.substring(0,2)) && !responseAPI) {
    response = await FetchCBE(VAT)
  } else if (!responseAPI) {
    SeveralUnitsBoolean = false
    response = await FetchEUAPI(VAT)
    await EUSupplier(response)
    return
  }

  response = responseAPI || response

  if (response.errorCode) {
    DisplayMessage(response.message + " ❌")
    HideLoader("search-container")
    error = true
    return
  }

  if (response.statusDescription.FR && response.statusDescription.FR !== "Actif") {
    DisplayMessage("⚠️ This entity has been stopped", "red")
		document.querySelector(".loading-button")?.remove()
    HideLoader("search-container")
    return
  }

  if (!SeveralUnitsBoolean && response.establishments.length > 1 && !document.querySelector(".result-container .selected-supplier")) {
    SeveralUnitsBoolean = true
    SeveralUnits(response)
    return
  }

  let estUnit
  let address
  let name
  let completeAdress
  let language
  let zipcode
  let city

  if (SeveralUnitsBoolean) {
    const indexCorrection = FindIndexSelection(response)
    address = response.establishments[indexCorrection].addresses[0]


    const getterUnit = response.establishments[indexCorrection].denominations[0]
    name = getterUnit?.denomination.toUpperCase() || response.denominations[0].denomination.toUpperCase()
    completeAdress = LimitFieldLength(address.streetFR.toUpperCase()) + " " + address.houseNumber
    language = (getterUnit?.language === 1 ? "FR" : "NL") || (response.denominations[0].language === 1 ? "FR" : "NL")
    zipcode = address.zipcode
    city = address.municipalityFR.toUpperCase()
    estUnit = response.establishments[indexCorrection].establishmentNumber
    estUnit = estUnit.replaceAll(".", "")
  } else {
    name = response.denominations[0].denomination.toUpperCase()
    completeAdress = LimitFieldLength(response.addresses[0].streetFR.toUpperCase()) + " " + 
    response.addresses[0].houseNumber
    language = response.denominations[0].language === 1 ? "FR" : "NL"
    zipcode = response.addresses[0].zipcode
    city = response.addresses[0].municipalityFR.toUpperCase()
  }
  
  name = LimitFieldLength(name)

  const juridicForm = listOfEnterprisesType[response.juridicalFormDescription.FR]
  
  const refererURL = 'suppliers/create'
  FakeIt(refererURL)
  const targetURL = "http://twins.belwired.net/suppliers"

  let formData = new FormData()
	formData.append('_token', csrfToken)
	formData.append('d03nom', name)
	formData.append('d03cfj', juridicForm)
	formData.append('d03ctva', "BE")

  if (estUnit) formData.append('d03unet', estUnit)
	
	formData.append('d03ntva', VAT)
	formData.append('d03lang', language)
	formData.append('d03ad1', completeAdress)
	formData.append('d03pay', "BE")
	formData.append('d03cpo', zipcode) 
	formData.append('d03vil', city)

	fetch(targetURL,
	{
		body: formData,
		method: "POST"
	})
    .then(async response => {
      if (response.ok) {
        if (SeveralUnitsBoolean) {
          // only for new units
          await ProcedureUpdateSeveralU(estUnit)
        } else {
          // for easy DOM manipulation
          hasBeenCreated = true
          await CompleteSupplier(false)
        }
      }
    })
    .then(async () => {
      await UpdateSupplier()
      HideLoader("search-container")
    })
}


async function ProcedureUpdateSeveralU(estUnit) {
  document.querySelector(".result-container")?.remove()
  document.querySelector(".loading-button")?.remove()


  const VATnumber = document.querySelector('[placeholder="N° VAT (Type prefix if not Belgium. Ex: NL)"]').value
  const address = document.querySelector('[placeholder="Address"]').value
	const supplierNumber = ""
  const supplierName = document.querySelector('[placeholder="Name"]').value
  const ChassisNumber = document.querySelector('[placeholder="N° Chassis"]').value
  
  const refererURL = `dossiers/supplier/${companyNumber}/${dossierId}/${avenant}/${simulationId}/edit`
  FakeIt(refererURL)
  
  // Non-ordered suppliers, loop is needed
  await fetch(`http://twins.belwired.net/suppliers/search?modal_d03ntva=${VATnumber}&modal_d03nom=${supplierName}&modal_d03frs=${supplierNumber}&modal_address=${address}`)
    .then(response => response.json())
    .then(data => {
      
      for (const item of data.items) {
        if (item.includes(estUnit)) {
          const resultContainer = ResultStructure()
          const itemContainer = document.createElement("div")

          itemContainer.insertAdjacentHTML("beforeend", item)
          itemContainer.style.display = "none"
          itemContainer.classList.add("selected-supplier", "last-record")
    
          resultContainer.appendChild(itemContainer)
          supplierContainer.appendChild(resultContainer)
          break
        }
      }
  })
}


async function EUSupplier(response) {
  if (!response.valid) {
    DisplayMessage("⚠️ Invalid EU supplier number", "red")
    return
  }

  SupplierDOMInsertion(response)
}

function LimitFieldLength(field, limit = 25) {
  if (field.indexOf("(") !== -1) {
    field = field.substring(0, field.indexOf("("))
  }

  if (field.length > limit) {
    let splittedField = field.split(" ")
    field = splittedField[0] + " "
    let i = 1
    while(field.length + splittedField[i]?.length < limit && splittedField[i]) {
      field += splittedField[i] + " "
      i++
    }

    if (field.length + 2 >= 25 || !splittedField[i]) return field


    field += splittedField[i].trim()[0] + "."
  }

  return field
}


// NL862399373B01
function SupplierDOMInsertion(response) {
  // debugger
  const result = document.querySelector(".result-container") || ResultStructure()
  const itemContainer = CreateItemContainer()
  const containerForEasyHandledData = document.createElement("div")
  containerForEasyHandledData.classList.add("supplier-DOM-values")

  let name = LimitFieldLength(response.name.toUpperCase())
  const street = LimitFieldLength(response.address.street.toUpperCase())
  const number = response.address.number
  const zipcode = response.address.zip_code
  const city = response.address.city.toUpperCase()
  const countryCode = response.countryCode
  const vatNumber = response.vatNumber

  
  itemContainer.insertAdjacentHTML("beforeend", `<p style="color: green; font-weight: 500; margin: 0;">NEW</p><p>${name}</p><p>${street} ${number}</p>
  <p>${zipcode} ${city}</p>
  <p>Country : ${countryCode} ${vatNumber}</p>`)

  containerForEasyHandledData.insertAdjacentHTML("beforeend", `<input name="nom" type="hidden" value="${name}">
  <input name="ctva" type="hidden" value="${countryCode}"><input name="ntva" type="hidden" value="${vatNumber}">
  <input name="cpo" type="hidden" value="${zipcode}"><input name="vil" type="hidden" value="${city}">
  <input name="ad1" type="hidden" value="${street}"><input name="ad2" type="hidden" value="${number}">
  <input name="pay" type="hidden" value="${countryCode}">`)
  
  itemContainer.appendChild(containerForEasyHandledData)
  result.appendChild(itemContainer)
  supplierContainer.appendChild(result)

  AddBgEUFlag()
  SelectableSupplier()
}


const listOfEnterprisesType = {
  "M. / DHR": "01",
  "MME / MEVR": "02",
  "Association sans but lucratif": "06",
  "Société anonyme": "07",
  "Société en nom collectif": "08",
  "Société en commandite simple": "09",
  "Société à responsabilité limitée": "10",
  "Société privée à responsabilité limitée": "10",
  "Société coopérative": "11",
  // "SAS / SAS": 15,
  // "SARL / NVBA": 31,
  // "AF / FV": 33,
  "Association internationale sans but lucratif": "41",
  "Association de droit public": "44",
  "Entité étrangère": "59",
  // "UP / BV": 58,
  // "SE / EV": 59
}

async function UpdateSupplier() {
  if (!document.querySelector(".result-container .selected-supplier")) return

  // debugger
  const targetURL = "http://twins.belwired.net/dossiers/supplier/update"
  const investment = document.querySelector("[placeholder='Asset Name']").value
  const selectedSupplier = document.querySelector(".result-container .selected-supplier .collection-item") || document.querySelector(".result-container .collection-item")

  const url = `http://twins.belwired.net/dossiers/investment/${companyNumber}/${dossierId}/0/0`
  await RetrieveDataFromURL(url, "get-investmentId", `<input id="investment_id" name="investment_id" type="hidden" value="`)
  
  
  let formData = new FormData()
	formData.append('_method', 'PUT')
	formData.append('_token', csrfToken)
	formData.append('investment_id', document.querySelector("#investment_id").value)
	formData.append('dossier_id', dossierId)
	formData.append('company_number', companyNumber)
	formData.append('avenant', avenant)
	formData.append('simulation_id', simulationId)
	formData.append('description', investment) // invest
	formData.append('supplier_modal_search_input_0', selectedSupplier.querySelector("input[name='nom']").value)
	formData.append('supplier_number', selectedSupplier.querySelector("input[name='frs']").value) // n fournisseur
	formData.append('d03frs', selectedSupplier.querySelector("input[name='frs']").value) // n fournisseur
	formData.append('d03ctva', selectedSupplier.querySelector("input[name='ctva']").value)
	formData.append('d03ntva', selectedSupplier.querySelector("input[name='ntva']").value)
	formData.append('d03unet', selectedSupplier.querySelector("input[name='unet']").value)
	formData.append('d03ad1', selectedSupplier.querySelector("input[name='ad1']").value) // adresse
	formData.append('d03cpo', selectedSupplier.querySelector("input[name='cpo']").value)
	formData.append('d03vil', selectedSupplier.querySelector("input[name='vil']").value)
	formData.append('d03pay', selectedSupplier.querySelector("input[name='pay']").value)
	formData.append('chassis_number', document.querySelector('[placeholder="N° Chassis"]').value)

  const refererURL = `dossiers/supplier/${companyNumber}/${dossierId}/${avenant}/${simulationId}/edit`
  FakeIt(refererURL)

	fetch(targetURL,
	{
		body: formData,
		method: "POST"
	})
    .then(response => {
      if (response.ok) {
        document.querySelector(".result-container")?.remove()
        DisplayMessage("Supplier has been successfully added ")

        document.querySelector(".pMessage-supplier").appendChild(AddIconToMessage())
        document.querySelector(".pMessage-supplier").style.opacity = "1"
    		document.querySelector(".loading-button")?.remove()
      }
    })
}

// Investment
// --- DOM CAPTURE ---
let data_i = 0
const data_assetName = document.querySelectorAll(".collapsible-body")[4].querySelector(".row:nth-child(2) > div:nth-child(2)").innerText
if (data_assetName.includes("Master")) {
  data_i += 3
  let revolvingDateField = document.querySelectorAll(".collapsible-body")[4].querySelector(`.row:nth-child(1) > div:nth-child(2)`).innerText.split(" ")
  revolvingDateField = revolvingDateField[revolvingDateField.length - 1]
  document.querySelector('[placeholder="Date revolving (if Master)"]').value = revolvingDateField
}

document.querySelector('[placeholder="Asset Name"]').value = document.querySelectorAll(".collapsible-body")[4].querySelector(`.row:nth-child(${data_i + 1}) > div:nth-child(2)`).innerText


let assetPrice = document.querySelector('[placeholder="Price"]').value 
assetPrice = document.querySelectorAll(".collapsible-body")[4].querySelector(`.row:nth-child(${data_i + 3}) > div:nth-child(2)`).innerText
assetPrice = assetPrice.replace("EUR", "").replace(" ", "").replace(",", ".").trim()
document.querySelector('[placeholder="Price"]').value = assetPrice

let secondhandAsset = document.querySelectorAll(".collapsible-body")[4].querySelector(`.row:nth-child(${data_i + 4}) > div:nth-child(2)`).innerText.split("-") 
let secondhandField = document.querySelector('[placeholder="Date (if secondhand)"]')
if (secondhandAsset.length > 1) {
  secondhandField.value = secondhandAsset[secondhandAsset.length - 1].trim()
}
secondhandField = secondhandField.value


const assets = {
  "Motos - Scooter": "1018",
  "Voitures de tourisme - Essence": "1020",
  "Voitures de tourisme - Diesel": "1021",
  "Voitures de tourisme - Electrique": "1022",
  "Voitures de tourisme - Hybride": "1023",
  "Voitures de tourisme - Gaz naturel": "1024",
  "Vélos": "1025",
  "Camionettes & Pick-up": "2005",
  "Bus et Car": "2006",
  "Camions": "2007",
  "Montage (Stokota)": "2008",
  "Remorque": "2026",
  "Machine agricole": "2030",
  "hélicoptères": "2042",
  "Containers (transport)": "2043",
  "BALAYEUSE et Camion poubelle": "2044",
  "MOBILHOME": "2045",
  "CONTAINERS (TRANSPORT)": "3071",
  "Avions": "2040",
  "Navires": "2041",
  "GRUE MOBILE": "3001",
  "GRUE pour camion": "3002",
  "EXCAVATRICE A CHENILLE": "3003",
  "MINI-EXCAVATRICE": "3006",
  "ELEVATEUR ELECTRIQUE": "3020",
  "CHARIOT ELEVATEUR": "3021",
  "ELEVATEUR ou chariot AVEC IMMAT": "3022",
  "ECHAFAUDAGES": "3030",
  "GROUPE ELECTROGENE+COMPRESeur": "3040",
  "batteries": "3050",
  "cabling": "3051",
  "CONTAINERS DE BUREAU ou aménagés": "3070",
  "GRUE FIXE et pont roulant": "3080",
  "ROULEAU COMPRESSEUR": "3100",
  "Matériel de nettoyage": "3200",
  "outillage à main et de jardin": "3300",
  "AUTRES MAT. DE GENIE CIVIL": "3999",
  "PRESSe OFFSET": "4001",
  "MATERIEL PRE-PRESSe et de finition": "4002",
  "Presse - Rotative": "4004",
  "Matériel médical et dentaire courant": "5002",
  "MAT.SPORTIF, de beauté et BANC SOLAIRE": "5004",
  "AUTRES APP. MEDICAL": "5999",
  "Boulangerie, boucherie, Cuisine": "6001",
  "AUTOMATES": "6010",
  "Matériel Horeca: chaises, tables,...": "6020",
  "Divertissements": "6030",
  "Matériel Horeca: chaises, tables,": "6040",
  "MAT. POUR SALON LAVOIR": "6060",
  "BALANCE+CAISSE ENREG.": "6080",
  "EMBALL.-ETIQUETAGE": "7001",
  "Ligne de production spéciale": "7002",
  "MACH.TEXTILE": "7004",
  "USINAGE BOIS+METAL": "7006",
  "LOGICIEL": "8001",
  "COPIERS+FAX+IMPRIM.": "8002",
  "MATERIEL+LOGICIEL": "8003",
  "SURVEILLANCE&ALARME": "8004",
  "MAT. DE TELECOM.": "8005",
  "Audio-video": "8006",
  "matériel de secours": "8007",
  "MOBILIER DE BUREAU": "10001",
  "DECORATION BUREAU": "10002",
  "INSTRUMENTS DE MUSIQUE": "10003",
  "oeuvres d'art": "10004",
  "Matériel public": "10005",
  "vêtements de travail": "10006",
  "MATERIEL DIVERS SANS VALEUR": "10998"
}


const completeFieldAssetType = document.querySelectorAll(".collapsible-body")[4].querySelector(`.row:nth-child(${data_i + 2}) > div:nth-child(2)`).innerText.split("-")
let currentAsset = (completeFieldAssetType[1] + "-" + completeFieldAssetType[2]).trim()
currentAsset = currentAsset.replace("-undefined", "")


let invalidAsset = false
function AutoCompleteAsset() {
  const assetTypeInput = document.querySelector('.asset-list')
  document.querySelector(".investment-container .invalid-active")?.remove()

  for (let key of Object.keys(assets)) {
    const option = document.createElement("option")
    option.textContent = key
    option.value = key
    assetTypeInput.appendChild(option)
    
    if (key.indexOf("  ") !== -1) {
      key = key.replaceAll("  ", " ")
    }


    if (key === currentAsset) {
      option.setAttribute("selected", "")
    }
  }
}
AutoCompleteAsset()


supplierContainer.appendChild(CreateBasicStructureMessage("pMessage-supplier"))
financialContainer.appendChild(CreateBasicStructureMessage("pMessage-finance"))
investmentContainer.appendChild(CreateBasicStructureMessage("pMessage-investment"))
warrantyContainer.appendChild(CreateBasicStructureMessage("pMessage-warranty"))

function CreateBasicStructureMessage(classToAdd) {
  const assetTypeMessage = document.createElement("p")
  assetTypeMessage.textContent = " "
  assetTypeMessage.classList.add(classToAdd)
  assetTypeMessage.style.opacity = "0"
  assetTypeMessage.style.height = "0"
  assetTypeMessage.style.fontSize = "16px"
  assetTypeMessage.style.transition = "opacity 0.5s"

  return assetTypeMessage
}

function CreateMessage(message, classMessage, container) {
  const assetTypeMessage = document.querySelector("." + container)
  assetTypeMessage.textContent = message

  assetTypeMessage.offsetHeight
  assetTypeMessage.style.opacity = "1"
  assetTypeMessage.style.height = "auto"
  if (!message.includes("Invalid") && !classMessage.includes("invalid")) {
    assetTypeMessage.appendChild(AddIconToMessage())
  } 

  return assetTypeMessage
}


const investmentBtn = document.querySelector(".investment-btn")
investmentBtn.addEventListener("click", () => {
  HideMessageSuccess()
  UpdateInvestment()
})

// Success message
CreateMessage(" ", "", "pMessage-supplier")
const pMessage = document.querySelector(".pMessage-supplier")
HideMessage()



async function UpdateInvestment() {
  const assetTypeInput = document.querySelector(".asset-list")

  if (assets[assetTypeInput.value] === undefined) {
    investmentContainer.appendChild(CreateMessage("⚠️ Invalid Asset Type", "invalid", "pMessage-investment"))
    return
  }

  const targetURL = "http://twins.belwired.net/dossiers/investment/update"
  const assetName = LimitFieldLength(document.querySelector("[placeholder='Asset Name']").value)
  const assetCode = assets[assetTypeInput.value]
  const assetGroup = Math.floor(assetCode / 1000) * 1000
  assetPrice = document.querySelector('[placeholder="Price"]').value 
  const optionalDescription = LimitFieldLength(document.querySelector("[placeholder='Description']").value)
  secondhandField = document.querySelector('[placeholder="Date (if secondhand)"]').value
  revolvingDateField = document.querySelector('[placeholder="Date revolving (if Master)"]').value

  await RetrieveDataFromURL(`http://twins.belwired.net/dossiers/investment/${companyNumber}/${dossierId}/0/0`, "get-investmentId", `<input id="investment_id" name="investment_id" type="hidden" value="`)

  const today = new Date()
  const completeDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
  let formData = new FormData()
	formData.append('_method', 'PUT')
	formData.append('_token', csrfToken)
	formData.append('investment_id', document.querySelector("#investment_id").value)
	formData.append('dossier_id', dossierId)
	formData.append('company_number', companyNumber)
	formData.append('avenant', avenant)
	formData.append('simulation_id', simulationId)
	formData.append('cimmoval', "M") 
	formData.append('investment_type_group', assetGroup) 
	formData.append('investment_type_code', assetCode) 
	formData.append('description', assetName) 
	formData.append('description_2', optionalDescription) 
	formData.append('amount', assetPrice) 

  if (revolvingDateField) {
    // Master
    let revolvingDate = revolvingDateField
    formData.append('date_validity_revolving', revolvingDate)
    revolvingDate = revolvingDate.split("/")

    formData.append('is_non_revolving', 1)
    formData.append('revolving_validity_day', parseInt(revolvingDate[0]))
    formData.append('revolving_validity_month', parseInt(revolvingDate[1]))
    formData.append('revolving_validity_year', revolvingDate[2])
  } else {
    formData.append('is_non_revolving', 0)
  }

  if (secondhandField) {
    formData.append('code_new', 0)
    formData.append('date_in_circulation', secondhandField)
    formData.append('date_incirculation_day', secondhandField.split("/")[0])
    formData.append('date_incirculation_month', secondhandField.split("/")[1]) 
    formData.append('date_incirculation_year', secondhandField.split("/")[2])
  } else {
    formData.append('code_new', 1)
    formData.append('date_in_circulation', completeDate)
    formData.append('date_incirculation_day', today.getDate())
    formData.append('date_incirculation_month', today.getMonth() + 1) 
    formData.append('date_incirculation_year', today.getFullYear())
  }

  const refererURL = `dossiers/investment/${companyNumber}/${dossierId}/${avenant}/${simulationId}/edit`
  FakeIt(refererURL)

	fetch(targetURL,
	{
		body: formData,
		method: "POST"
	})
  .then(response => {
    if (response.ok) {
      investmentContainer.appendChild(CreateMessage("Investment has been successfully changed ", "", "pMessage-investment"))
    }
  })
}


document.querySelector(".financial-btn").addEventListener("click", () => {
  HideMessageSuccess()
  UpdateFinancialData()
})


function HideMessageSuccess() {
  document.querySelector(".pMessage-investment").style.opacity = "0"
  document.querySelector(".pMessage-finance").style.opacity = "0"
}


// Financial Data
async function UpdateFinancialData() {
  const targetURL = `http://twins.belwired.net/v2/dossier/financial/${companyNumber}/${dossierId}/${avenant}/${simulationId}/edit`
  

  const duration = document.querySelector("[placeholder='Duration']").value
  const IRS = document.querySelector("[placeholder='Interest']").value
  const firstRental = document.querySelector("[placeholder='Down Payment']").value
  
  const typeInterestPeriod = responseAPIFinancialData.type_interest_period
  const dateIRS = responseAPIFinancialData.date_irs
  const margin = responseAPIFinancialData.margin
  const commissionsCodeAgent = responseAPIFinancialData.commissions[0].code_agent

  const purchaseOption = document.querySelector("[placeholder='Purchase Option (% or €)']").value
  const interestRate = responseAPIFinancialData.interest_rate
  const clientName = document.querySelectorAll(".collapsible-body")[1].querySelector(".row:nth-child(1)").querySelector("div:nth-child(2)").innerText.toLowerCase()

  let formData = new FormData()
	formData.append('_method', 'PUT')
	formData.append('_token', csrfToken)
	formData.append('periodicity', 'M')
	formData.append('duration', duration)
	formData.append('pre_post', 'PR')
	formData.append('type_interest', 'R')
	formData.append('type_interest_period', typeInterestPeriod)
	formData.append('interest_type', '2')
	formData.append('interest_rate', interestRate)
	formData.append('date_irs', dateIRS) 
	formData.append('margin', margin) 
	formData.append('irs', IRS) 
  formData.append('residual_value_included', '1') 
  
  if (!clientName.includes("agent de banque") && !clientName.includes("verzekeringsagent")) {
    formData.append('administration_cost', '1') 
  }

  if (purchaseOption < 70) {
    formData.append('is_percentage', '1') 
    formData.append('residual_value_percentage', purchaseOption)
  } else {
    formData.append('residual_value', purchaseOption)
  }
  
  const price = document.querySelector("[placeholder='Price']").value
  const purchaseOptionComputed = (purchaseOption / price) * 100

  if (purchaseOption <= 15) {
    formData.append('code_deal', '1')
  } else if (purchaseOption < 70) {
    formData.append('code_deal', '4')
  } else if (purchaseOptionComputed <= 15) {
    formData.append('code_deal', '1')
  } else {
    formData.append('code_deal', '4')
  }

	formData.append('code_calcul', '2')

	formData.append('client_facturation_display', '')
	formData.append('client_facturation', '')
	formData.append('client_cession_display', '')
	formData.append('client_cession', '')
	formData.append('date_prise_effet', '')
	formData.append('commissions[0][code_agent]', commissionsCodeAgent)
	formData.append('commissions[0][commission_code]', 'A0') 
	formData.append('commissions[0][percentage]', '0')
	formData.append('commissions[0][is_percentage]', '1')
	formData.append('commissions[0][amount]', '0')

  if (firstRental !== "" && firstRental < 70) {
    formData.append('first_rentals[0][is_percentage]', '1')
    formData.append('first_rentals[0][percentage]', firstRental)
  } else if (firstRental !== "") {
    formData.append('first_rentals[0][amount]', firstRental)
  }
	formData.append('action', 'calculate')

  const refererURL = `v2/dossier/financial/${companyNumber}/${dossierId}/${avenant}/${simulationId}/edit`
  FakeIt(refererURL)

	fetch(targetURL,
	{
		body: formData,
		method: "POST"
	})
  .then(response => {
    if (response.ok) {
      financialContainer.appendChild(CreateMessage("Financial Data have been successfully changed ", "", "pMessage-finance"))
    }
  })
}


CompleteFinancialData()
let responseAPIFinancialData = ''

async function getFinancialData() {
  const url = `http://twins.belwired.net:10052/api/bls/dossier/financial/${companyNumber}/${dossierId}/${avenant}/${simulationId}`
  const fetchData = await fetch(url, {
    headers: { 'power-user': 'nabila' }
  })
  const response = await fetchData.json()
  responseAPIFinancialData = response.financial
  return responseAPIFinancialData
}


async function CompleteFinancialData() {
  const financialData = await getFinancialData()
  let { duration, residual_value_percentage: purchaseOption, irs: interest, first_rentals: firstRental } = financialData

  if(firstRental) {
    firstRental = firstRental[0].percentage
  } else {
    firstRental = ""
  }

  document.querySelector("[placeholder='Duration']").value = duration
  document.querySelector("[placeholder='Purchase Option (% or €)']").value = purchaseOption
  document.querySelector("[placeholder='Interest']").value = interest 
  document.querySelector("[placeholder='Down Payment']").value = firstRental
}



async function FindClient(targetURL, warranty) {
  warranty = warranty.toUpperCase().trim()
  const f = await fetch(targetURL)
  const data = await f.json()

  if (data.total === 1 && (warranty === data.data[0].name || warranty === data.data[0].key || warranty === data.data[0].vat_number)) {
    return data.data[0]
  } else if (data.total > 1) {
    // only for entered name, a number is unique
    return FindCorrectCompany(data.data)
  }

  return null
}



function FindCorrectCompany(enterprises) {
  let searchedCompany = document.querySelector("[placeholder='Personal caution (covering less-value) : Name, client number or VAT with BE prefix ']").value
  searchedCompany = searchedCompany.toUpperCase().trim()


  for (let i = 0; i < enterprises.length; i++) {
    if (enterprises[i].name === searchedCompany) {
      return enterprises[i]
    }
  }
  
  return null
}


document.querySelector(".warranty-btn").addEventListener("click", () => {
  document.querySelector(".pMessage-investment").style.opacity = "0"

  const personalCaution = document.querySelector("[placeholder='Personal caution (covering less-value) : Name, client number or VAT with BE prefix ']").value
  const pursueEngaging = document.querySelector("[placeholder='Pursue engagement : VAT']").value

  if (personalCaution) {
    UpdateWarranty("1")
  }

  if (pursueEngaging) {
    UpdateWarranty("2")
  }
})


async function SearchClient(code) {
  let warranty
  if (code === "1") {
    warranty = document.querySelector("[placeholder='Personal caution (covering less-value) : Name, client number or VAT with BE prefix ']").value
  } else {
    warranty = document.querySelector("[placeholder='Pursue engagement : VAT']").value
		warranty = warranty.trim().replaceAll(".", "")
  }


  let targetURL
  if (isNaN(warranty) && warranty || warranty.includes("BE")) {
    warranty = warranty.replace(/^[^0-9]+/, '')
    targetURL = `http://twins.belwired.net/dossiers/warranty?name=${warranty}&vat_number=${warranty}&${companyNumber === "5" ? "soc5" : "soc2"}=${warranty}&operator=or&page=1`
  } else if (warranty) {
    targetURL = `http://twins.belwired.net/dossiers/warranty?key=${warranty}&operator=or&page=1`
  }

  return await FindClient(targetURL, warranty)
}


async function UpdateWarranty(code) {
  let clientData = await SearchClient(code)

  if (clientData === null) {
    warrantyContainer.appendChild(CreateMessage(`${code === "1" ? "Personal caution" : "Pursue Engagement"} : ⚠️ Unknown client or invalid number. Please fill in & restart `, "Invalid", "pMessage-warranty"))
    return
  }

  const completeDateBirthday = [clientData.birthday_day, clientData.birthday_month, clientData.birthday_year].join("/")
  let purchaseOption = document.querySelector("[placeholder='Purchase Option (% or €)']").value

  if (purchaseOption < 70) {
    // to be corrected
    purchaseOption =  document.querySelector("[placeholder='Price']").value * document.querySelector("[placeholder='Purchase Option (% or €)']").value
    purchaseOption = Math.ceil(purchaseOption) / 100
  }

  targetURL = "http://twins.belwired.net/dossiers/warranty"

  let formData = new FormData()
	formData.append('_token', csrfToken)
	formData.append('b408tid', "BFL400")
	formData.append('company_number', clientData.company)
	formData.append('id', dossierId)
	formData.append('avenant', avenant)
	formData.append('simulation_id', simulationId)
	formData.append('code', code)   // caution personnelle, 2 eng poursuite ???
	formData.append('b408_cfj', clientData.juridical)   //   code forme juridique
	formData.append('b408_per', clientData.code_ste)    //   personne physique ?
	formData.append('pic_nbr', clientData.picnr)
	formData.append('language', clientData.lang)
	formData.append('client_name', clientData.name)
	formData.append('b408_gar', clientData.key)    
	formData.append('vat_number', clientData.vat_number)
	formData.append('address_1', clientData.address1)
	formData.append('address_2', clientData.address2)
	formData.append('country', clientData.country)
	formData.append('zip_code', clientData.postal_code)
	formData.append('city', clientData.village)
	formData.append('country_vatnumber', clientData.country_vat)

  if (code === "1") {
      formData.append('birthday_daybirthday_monthbirthday_year', completeDateBirthday)
      formData.append('birthday_day', clientData.birthday_day)
      formData.append('birthday_month', clientData.birthday_month)
      formData.append('birthday_year', clientData.birthday_year)
      formData.append('b408_mtc', purchaseOption)   // montant OA
      formData.append('currency', "EU")
      formData.append('duration', document.querySelector("[placeholder='Duration']").value)
      formData.append('clausule_lesser_val', "1")
  }

  const refererURL = `dossiers/warranty/${companyNumber}/${dossierId}/${avenant}/${simulationId}/edit`
  FakeIt(refererURL)

  fetch(targetURL,
	{
		body: formData,
		method: "POST"
	})
  .then(response => {
    if (response.ok) {
      warrantyContainer.appendChild(CreateMessage("Warranty has been successfully added ", "", "pMessage-warranty"))
    }
  })
}


function addMessage(message, text) {
  message.innerHTML = `${text}&nbsp;&nbsp;&nbsp;`
  message.appendChild(AddIconToMessage())
}


