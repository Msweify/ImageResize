import express from 'express';
import resizeImage from '../../imageResize/index';
import fs from 'fs';
import fse from 'fs-extra';
import { promises as fsPromise } from 'fs';

const imgRoute = express.Router();

// The following global variables are used for the cache check (Check if the picture is already resized)
let prevImageName = '';
let prevwidth = -1;
let prevHeight = -1;

/*
   validateInputs function:
   Inputs: imagePath: string, width: number, height: number
   Description: It is used to validate the user inputs for the the image file name, width and height.
   Output: It is a void function. It throws error with appropiate message if any of these inputs are not valid.
*/
const validateInputs = (
  imagePath: string,
  width: number,
  height: number
): void => {
  let bol = false;
  let msg = '';
  // Check that the image exists in the images directory
  if (!fs.existsSync(imagePath)) {
    bol = true;
    msg = msg.concat('<br>File does not exist!!');
  }
  // Check that width is a positive number
  if (isNaN(width) || width <= 0) {
    bol = true;
    msg = msg.concat('<br>Entered width is not a valid number!!');
  }
  // Check that height is a positive number
  if (isNaN(height) || height <= 0) {
    bol = true;
    msg = msg.concat('<br>Entered height is not a valid number!!');
  }
  if (bol) {
    throw new Error(msg);
  }
};

/*
   alreadyConverted function:
   Inputs: imageName: string, width: number, height: number
   Description: It is used to check if the current imageName, weidth and height are similar to previous values or have changed
   Output: Boolean type: true if the image is resized previously else false is returned.
*/
const alreadyConverted = (
  imageName: string,
  width: number,
  height: number
): boolean => {
  if (
    imageName === prevImageName &&
    width === prevwidth &&
    height === prevHeight
  ) {
    return true;
  }
  return false;
};

imgRoute.get('/', async (req, res) => {
  const imageName: string = req.query.filename as string; // Get imageName from URL
  const imagePath: string = './images/'.concat(imageName).concat('.jpg'); // Assuming all images have jpg extention
  const imageOutputPath: string = './thumb/'
    .concat(imageName)
    .concat('_thumb.jpg'); // imageOutputPath is the path for the resized image
  const widthInp: string = req.query.width as unknown as string; // Get Required width from URL
  const heightInp: string = req.query.height as unknown as string; // Get Required height from URL
  const width: number = parseInt(widthInp);
  const height: number = parseInt(heightInp);

  try {
    validateInputs(imagePath, width, height); // check that user input is valid.

    // check that the image requested image resizing is similar to previous one and that the converted image is stored in thumb folder.
    if (
      !alreadyConverted(imageName, width, height) ||
      !fs.existsSync(imageOutputPath)
    ) {
      // If thumb directory exists, delete all the files in the directory to avoid having large number of images
      if (fs.existsSync('./thumb')) {
        await fse.emptyDir('./thumb');
      }
      // call resize function
      await resizeImage.resizeImage(imagePath, width, height);
      // Update cached values if image is resized without throwing errors
      prevImageName = imageName;
      prevwidth = width;
      prevHeight = height;
    }

    // Read image from file and send to the browser
    const img = await fsPromise.readFile(imageOutputPath, 'binary');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  } catch (err) {
    // In case of error display, send it to browser
    res.send(`<h1>${err}</h1>`);
  }
});

export default imgRoute;
