// in this code save is not working proper but all other function is up to date:  ---|>


import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Rnd as ReactRND } from "react-rnd";
import "./index.css";

const App = () => {
  const mainImageUrl =
    "https://dimboo-development.s3.eu-south-2.amazonaws.com/17127328993440.jpeg";

  const [backgroundImage, setBackgroundImage] = useState<File>();
  const [logoImageUrl, setLogoImageUrl] = useState<string>();
  const [showButtons, setShowButtons] = useState(false);
  const [watermarkSize, setWatermarkSize] = useState({
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleBackgroundUpload = async () => {
    const backgroundImageBlob = await fetch(mainImageUrl).then((res) => res.blob());
    const backgroundImageFile = new File([backgroundImageBlob], "mainImage.jpeg", {
      type: "image/jpeg",
    });
    setBackgroundImage(backgroundImageFile);
    setShowButtons(true);
  };

  const handleLogoImageUpload = (imageUrl: string) => {
    setLogoImageUrl(imageUrl);
  };

  const handleSaveImage = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current);
      const link = document.createElement("a");
      link.download = "watermarked-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="container">
      {!backgroundImage && (
        <button onClick={handleBackgroundUpload}>Upload background image</button>
      )}

      {showButtons && (
        <>
          <button onClick={() => handleLogoImageUpload("https://dimboo-development.s3.eu-south-2.amazonaws.com/17127328993440.jpeg")}>
            Add watermark image 1
          </button>
          <button onClick={() => handleLogoImageUpload("https://dimboo-development.s3.eu-south-2.amazonaws.com/17145686992010.jpeg")}>
            Add watermark image 2
          </button>
        </>
      )}

      {backgroundImage && (
        <div className="watermark-container" ref={canvasRef}>
          <img src={URL.createObjectURL(backgroundImage)} alt="Background" />

          {logoImageUrl && (
            <ReactRND
              size={{
                width: watermarkSize.width,
                height: watermarkSize.height,
              }}
              bounds="parent"
              dragAxis="both"
              lockAspectRatio
              enableResizing={{
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
              }}
              position={{
                x: watermarkSize.x,
                y: watermarkSize.y,
              }}
              onDragStop={(_, d) => {
                setWatermarkSize((prev) => ({
                  ...prev,
                  x: d.x,
                  y: d.y,
                }));
              }}
              onResizeStop={(_, __, ref, ___, position) => {
                setWatermarkSize({
                  width: parseInt(ref.style.width, 10),
                  height: parseInt(ref.style.height, 10),
                  ...position,
                });
              }}
              className="rnd"
            >
              <img
                src={logoImageUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                alt="Watermark"
                draggable={false}
              />
            </ReactRND>
          )}
        </div>
      )}

      {backgroundImage && logoImageUrl && (
        <button onClick={handleSaveImage}>Save Watermarked Image</button>
      )}
    </div>
  );
};

export default App;














// in this code save function is working : ---|>


// import { useRef, useState } from "react";
// import html2canvas from "html2canvas";
// import { Rnd as ReactRND } from "react-rnd";
// import "./index.css";

// const App = () => {
//   const mainImageUrl =
//     "https://dimboo-development.s3.eu-south-2.amazonaws.com/17127328993440.jpeg";
//   const logoImageUrls = [
//     "https://dimboo-development.s3.eu-south-2.amazonaws.com/17145686992010.jpeg",
//     "https://dimboo-development.s3.eu-south-2.amazonaws.com/17127328993440.jpeg",
//   ];

//   const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
//   const [logoImage, setLogoImage] = useState<File | null>(null);
//   const [watermarkSize, setWatermarkSize] = useState({
//     width: 100,
//     height: 100,
//     x: 0,
//     y: 0,
//   });

//   const canvasRef = useRef<HTMLDivElement>(null);

//   const handleBackgroundUpload = async () => {
//     const backgroundImageBlob = await fetch(mainImageUrl).then((res) => res.blob());
//     const backgroundImageFile = new File([backgroundImageBlob], "mainImage.jpeg", {
//       type: "image/jpeg",
//     });
//     setBackgroundImage(backgroundImageFile);
//   };

//   const handleLogoImageUpload = (imageUrl: string) => {
//     fetch(imageUrl)
//       .then((res) => res.blob())
//       .then((blob) => {
//         const logoImageFile = new File([blob], "logoImage.jpeg", {
//           type: "image/jpeg",
//         });
//         setLogoImage(logoImageFile);
//       });
//   };

//   const handleSaveImage = async () => {
//     if (canvasRef.current && backgroundImage && logoImage) {
//       const canvas = await html2canvas(canvasRef.current);
//       const link = document.createElement("a");
//       link.download = "watermarked-image.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     }
//   };

//   return (
//     <div className="container">
//       <button onClick={handleBackgroundUpload}>Upload background image</button>

//       {backgroundImage && (
//         <div className="watermark-container" ref={canvasRef}>
//           <img src={URL.createObjectURL(backgroundImage)} alt="Background" />

//           {logoImage && (
//             <ReactRND
//               size={{
//                 width: watermarkSize.width,
//                 height: watermarkSize.height,
//               }}
//               bounds=".watermark-container"
//               dragAxis="both"
//               lockAspectRatio
//               enableResizing={{
//                 topRight: true,
//                 bottomRight: true,
//                 bottomLeft: true,
//                 topLeft: true,
//               }}
//               position={{
//                 x: watermarkSize.x,
//                 y: watermarkSize.y,
//               }}
//               onDragStop={(_, d) => {
//                 setWatermarkSize((prev) => ({
//                   ...prev,
//                   x: d.x,
//                   y: d.y,
//                 }));
//               }}
//               onResizeStop={(_, __, ref, ___, position) => {
//                 setWatermarkSize({
//                   width: ref.offsetWidth,
//                   height: ref.offsetHeight,
//                   ...position,
//                 });
//               }}
//               className="rnd"
//             >

//               <img
//                 src={URL.createObjectURL(logoImage)}
//                 alt="Watermark"
//                 className="watermark-image"
//                 draggable={false}
//               />
//             </ReactRND>
//           )}

//           <div className="watermark-buttons">
//             {logoImageUrls.map((url, index) => (
//               <button key={index} onClick={() => handleLogoImageUpload(url)}>
//                 Add watermark image {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {backgroundImage && logoImage && (
//         <button onClick={handleSaveImage}>Save Watermarked Image</button>
//       )}
//     </div>
//   );
// };

// export default App;














