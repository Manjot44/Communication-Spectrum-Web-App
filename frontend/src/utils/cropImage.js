export default async function getCroppedImg(imageSrc, crop) {
  const image = new Image();
  image.src = imageSrc;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    const base64Image = canvas.toDataURL("image/jpeg");
    resolve(base64Image); // Return the image as a base64 string
  });
}
