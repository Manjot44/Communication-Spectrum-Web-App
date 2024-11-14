export default async function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
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

      // Convert canvas to Blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob); // Successfully return Blob
        } else {
          reject(new Error("Canvas is empty or failed to create Blob"));
        }
      }, "image/jpeg"); 
    };

    image.onerror = (error) => reject(error);
  });
}
