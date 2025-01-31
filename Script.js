let qrCode = new QRCode(document.getElementById("qrcode"), {
    text: " ",
    width: 200,
    height: 200
});

// Function to copy QR code to clipboard
function copyQRCode() {
    let canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        canvas.toBlob(function(blob) {
            let data = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([data]).then(function() {
                alert('QR Code copied to clipboard!');
            }, function(err) {
                alert('Failed to copy QR code: ' + err);
            });
        });
    }
}

// Function to download QR code as an image
function downloadQRCode() {
    let canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        let link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'QRCode.png';
        link.click();
    }
}

// Function to generate QR code based on text input
function generateQR() {
    let type = document.getElementById("text").getAttribute("data-type") || "url";
    let text = document.getElementById("text").value;

    if (text.trim() !== "") {
        let formattedText = text;

        // Special formatting for some types
        if (type === "contact") {
            formattedText = `BEGIN:VCARD\nVERSION:3.0\nFN:${text}\nEND:VCARD`;
        } else if (type === "sms") {
            let parts = text.split(",");
            if (parts.length == 2) {
                formattedText = `sms:${parts[0]}?body=${encodeURIComponent(parts[1])}`;
            }
        } else if (type === "email") {
            formattedText = `mailto:${text}`;
        } else if (type === "phone") {
            formattedText = `tel:${text}`;
        }

        // Clear previous QR Code before generating new one
        qrCode.clear();
        qrCode.makeCode(formattedText);
    }
}
