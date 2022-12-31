import Jimp from "jimp";

export async function imageOverlay(imageUrl: string) {
  // Function name is same as of file
  // Reading watermark Image
  let watermark = await Jimp.read("./logo-tp.png");
  watermark = watermark.resize(400, 400); // Resizing watermark image
  // Reading original image
  let image = await Jimp.read(imageUrl);
  image = image.resize(1280 / 3, 720 / 3); // Resizing original image

  watermark = await watermark;
  image.composite(watermark, 110, -60, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 1,
  });

//   const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
//   image.print(font, 0, 0, overlayText, 1280 / 3);
  await image.writeAsync("newImage.png");
  return image.getBase64Async(Jimp.MIME_PNG);
}
