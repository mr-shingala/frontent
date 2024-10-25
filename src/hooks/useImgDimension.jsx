

export async function getImageDimensions(file) {

 try {
   let img = new Image();
   img.src = URL.createObjectURL(file);
   await img.decode();
   let width = img.width;
   let height = img.height;
   return [width,height]
 } catch (error) {
   console.log(error)
   return [null,null]
 }
}
