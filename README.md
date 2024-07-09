# Video to ASCII Converter

This project converts live video feed from your webcam into ASCII art in real-time using JavaScript. The resulting ASCII art is displayed on an HTML canvas.

## Features

- Real-time conversion of webcam video to ASCII art
- Adjustable ASCII character set for different grayscale levels
- Dynamic canvas resizing for high DPI displays

## How It Works

The application captures video frames from your webcam, processes each frame to calculate the grayscale value of each pixel, and maps these values to a predefined set of ASCII characters. The resulting ASCII art is then drawn on an HTML canvas.

### Key Components

- **Grayscale Character Set**: A string of characters ordered by their visual density, used to represent different shades of gray.
- **Canvas Setup**: The canvas is scaled for high DPI displays and used to draw the ASCII art.
- **Video Processing**: Captures video frames, scales them down for faster processing, converts the image data to ASCII characters, and draws the ASCII art on the canvas.

## Usage

1. **Start the Video**: The application will prompt for webcam access. Once granted, the video feed will be converted to ASCII art and displayed on the canvas in real-time.
