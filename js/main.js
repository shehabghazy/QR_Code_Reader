
let displayImage = document.getElementById('displayImage')
let filesSelected = document.getElementById("inputFileToLoad");
let displayInfo = document.getElementById('displayInfo')
let buttonsContainer = document.getElementById('buttonsContainer')
let inputSection = document.getElementById('inputSection')
let closeBtn = document.getElementById('closeBtn')
let copyBtn = document.getElementById('copyBtn')
let guideTxt = document.getElementById('guideTxt')
let srcData;
let imageURI

function encodeImageFileAsURL() {

    filesSelected = filesSelected.files;
    imgTest = document.getElementById("imgTest")

    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            srcData = fileLoadedEvent.target.result; // <--- data: base64
            let newImage = document.createElement('img');
            newImage.src = srcData;
            displayImage.src = srcData
            imageURI = srcData;

            decodeImageFromBase64(imageURI, function (decodedInformation) {
                buttonsContainer.className = "mt-2"
                if (qrcode.result != "error decoding QR Code") {
                    displayImage.className = "w-50";
                    inputSection.className = "d-none"
                    displayInfo.className = "text-white border border-1 border-white mt-2 p-2 rounded"
                    displayInfo.innerHTML = `${decodedInformation}`;
                }
                else {
                    guideTxt.innerHTML = "Couldn't scan QR Code .. Please try again"
                    closeBtn.innerHTML = "Try again"
                }

            });
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}
filesSelected.addEventListener('change', function () { encodeImageFileAsURL(); })

let decodeNow = document.getElementById('decodeNow')

function decodeImageFromBase64(data, callback) {
    qrcode.callback = callback;
    qrcode.decode(data)
}

copyBtn.addEventListener('click', function () {
    let copyTxt = displayInfo.innerHTML
    navigator.clipboard.writeText(copyTxt);
});


closeBtn.addEventListener('click', function () {
    window.location.reload();

});

