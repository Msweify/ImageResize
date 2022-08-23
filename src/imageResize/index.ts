import sharp from 'sharp';

/*
   resizeImage function:
   Inputs: imagePath: string, width: number, height: number
   Description: Resize the image in imagePath with the input weight and height values and save resized image in thumb directory
   Output: It is a void function. It throws error if the conversion was not successful.
*/
const resizeImage = async (
  imgPath: string,
  width: number,
  height: number
): Promise<void> => {
  const strArr: string[] = imgPath.split('/');
  const imageNameWithExt: string[] = strArr[strArr.length - 1].split('.');
  const imageName: string = imageNameWithExt[0];
  const imageExtention: string = imageNameWithExt[1];
  const outimgpath: string = './thumb/'.concat(
    imageName.concat('_thumb.'.concat(imageExtention))
  );
  try {
    await sharp(imgPath).resize(width, height).toFile(outimgpath);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default { resizeImage };
