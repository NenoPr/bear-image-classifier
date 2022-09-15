


const uploadImageElement = document.getElementById("file-upload")
const imageContainer = document.getElementById("image-container")
const classifyButton = document.getElementById("classify-image-button")
const resultsElement = document.getElementById("classification-results")
let SELECTED_IMAGE;

async function classifyImageFunc(image) {
    resultsElement.innerText = "Classifying..."
    const response = await fetch("https://hf.space/embed/Nenad/bear-classifier/+/api/predict", {
        method: "POST", body: JSON.stringify({data: [image] }),
        headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    const label = json["data"][0]
    // ["confidences"][0]["label"]
    console.log("Fetched", label, typeof label)
    resultsElement.innerText = label
}

function showUploadedImageFunc(reader) {
    imageContainer.src = reader.result
    SELECTED_IMAGE = reader.result
}

function readResults() {
    const reader = new FileReader();
    // console.log(reader)
    // console.log("Selected Image", typeof SELECTED_IMAGE, SELECTED_IMAGE)
    reader.addEventListener("load", () => showUploadedImageFunc(reader))
    // reader.addEventListener("load", () => classifyImageFunc(reader))
    reader.readAsDataURL(uploadImageElement.files[0]);
}


uploadImageElement.addEventListener("input", readResults)
classifyButton.addEventListener("click", () => classifyImageFunc(SELECTED_IMAGE))