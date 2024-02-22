# Entropic Haiku

Entropic Haiku is a generative, self-dissipating synthetic poem that uses GPT-4 to create Haikus in English and two other languages or codes, such as Morse code or emojis. This unique project leverages the capabilities of OpenAI's GPT-4 model, integrated into a creative p5.js environment to produce an interactive poetic experience. As users interact with the interface, the poem's entropy increases, leading to a dynamic and ephemeral artistic expression. This project is designed exclusively for desktop use, offering a duet in latent space between the user and the AI.

## Features

- **Dynamic Letter Animation:** Letters dynamically fall and settle on the bottom of the screen, with physics-based animations including gravity, bounce, and friction effects.
- **Interactive Control:** Users can interact with the visualization by moving their mouse to generate new letters and drag settled letters around the screen.
- **Text Generation:** Integrates with OpenAI's GPT-4 to generate text based on a wide array of prompts, showcasing the model's ability to understand and create content based on complex themes.
- **Sound Interaction:** Plays a sample sound when a specific key is pressed, adding an auditory dimension to the interaction.
- **Growing Lines:** A visual effect where lines grow towards the falling letters, starting from a random position at the top of the screen.
- **Generative Poetry with GPT-4:** Press the Spacebar to generate a new Haiku in English and in two other languages or codes. The selection of languages or codes includes, but is not limited to, Morse code, emojis, etc.
- **Interactive Entropy:** Move your mouse across the canvas to increase the entropy, creating a dynamic and ever-changing poetic landscape.

## Setup

- **Prerequisites:** Ensure you have Node.js installed on your machine to run this project.
- **Installation:** Clone the repository, then install dependencies using `npm install`.
- **Configuration:** Set your OpenAI API key in your project's environment variables as `VITE_OPENAI_KEY`.
- **Running the Project:** Start the project by running `npm run start` and open it in your web browser.

## Technologies Used

- **p5.js:** A client-side library for creative coding, used for drawing and animating the letters and lines.
- **OpenAI JavaScript SDK:** Used for integrating the OpenAI GPT-4 model to dynamically generate text based on user-defined prompts.
- **CSS:** For basic styling of the webpage.

## How to Use

- **Generating Letters:** Move your mouse across the screen to generate falling letters.
- **Interacting with Letters:** Click and drag settled letters to move them around.
- **Playing Sound:** Press the 'P' key to play or stop the sample sound.
- **Generating Text with OpenAI:** Press the spacebar to trigger a prompt to OpenAI's GPT-4 (configured in the code), and watch as the generated text animates on the screen.

## Customization

You can customize the text generation prompts, animation parameters, and sound samples by modifying the `sketch.js` file. Experiment with different settings to create a personalized experience.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests with your enhancements or bug fixes. Whether you're improving the interactivity, adding new features, or fixing issues, your contributions help make Entropic Haiku a richer experience.

This README.md provides a comprehensive overview of the Entropic Haiku project, emphasizing its generative, interactive nature and the unique collaboration between human and AI in creating ephemeral poetry.


# OpenAI + P5.js template by SpatialPixel

This is just a simple template to incorporate OpenAI's Node.js SDK into a P5.js sketch.

## Requirements

This template requires a recent version of Node.js, recommended version 16 or later.

Clone the repository with git...

    git clone https://github.com/spatialpixel/openai-p5js-template.git

...or [download the code from the repository](https://github.com/spatialpixel/openai-p5js-template) as a zip file.

Then install the libraries:

    cd openai-p5js-template
    npm install

## Start the dev environment

This template uses [Vite](https://vitejs.dev/) as a local development server. Start it with the following:

    npm run dev

By default, this starts a local server at http://localhost:5173/. Just copy/paste this URL into
a browser window to view the app. This will automatically update when you save changes to your code (that is,
no manual refresh required!).

## OpenAI API Key

Remember to provide your OpenAI API key into `sketch.js`. Note that this is configured
for local development only, and this code should not be used on a production server.
