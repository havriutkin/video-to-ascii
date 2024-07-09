const grayscale = " .:-=+*#%tfj@$";

// Canvas set up
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Get the device pixel ratio, falling back to 1.
const dpr = window.devicePixelRatio || 1;

// Get the size of the canvas in CSS pixels.
const canvas_rect = canvas.getBoundingClientRect();

// Give the canvas pixel dimensions of their CSS
// size * the device pixel ratio.
canvas.width = canvas_rect.width * dpr;
canvas.height = canvas_rect.height * dpr;

// Scale all drawing operations by the dpr, so everything is drawn at the correct resolution.
ctx.scale(dpr, dpr);

// Now, set the canvas style width and height back to the CSS dimensions
canvas.style.width = canvas_rect.width + 'px';
canvas.style.height = canvas_rect.height + 'px';

ctx.fillStyle = 'white';
ctx.font = '12px monospace';

const getChar = (r, g, b) => {
    if (r === 255 && g === 255 && b === 255) {
        return ' ';
    }
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return grayscale[Math.ceil((grayscale.length - 1) * gray / 255)];
}

const getImageData = (img) => {
    const scaledCanvas = document.createElement('canvas');
    const scaledCtx = scaledCanvas.getContext('2d');
    
    // Scale down to reduce quality
    scaledCanvas.width = canvas.width / 12;
    scaledCanvas.height = canvas.height / 12; 
    scaledCtx.drawImage(img, 0, 0, scaledCanvas.width, scaledCanvas.height);
    const result = scaledCtx.getImageData(0, 0, scaledCanvas.width, scaledCanvas.height).data;
    return { data: result, width: scaledCanvas.width, height: scaledCanvas.height };
}

const transformImageData = (data, width) => {
    const result = [];
    for (let i = 0; i < data.length; i += 4) {
        result.push(getChar(data[i], data[i + 1], data[i + 2]));
    }
    return result;
}

const drawAscii = (imageData, width) => {
    const ascii = transformImageData(imageData.data, width);
    const cols = width;
    const rows = imageData.data.length / 4 / cols;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillText(ascii[y * cols + x], x * 10, y * 10);
        }
    }
}

const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            video.addEventListener('play', () => {
                const updateFrame = () => {
                    const imgData = getImageData(video);
                    drawAscii(imgData, imgData.width);
                    requestAnimationFrame(updateFrame);
                };

                updateFrame();
            });
        })
        .catch((err) => {
            alert("Error accessing webcam. Please allow");
            console.error("Error accessing webcam: ", err);
        });
};

startVideo();
