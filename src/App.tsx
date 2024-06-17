// import html2canvas from "html2canvas";
// import { useRef, useState } from "react";
// import { Rnd as ReactRND } from "react-rnd";
// import "./index.css";

// const App = () => {
//   const mainImageUrl =
//     "https://dimboo-development.s3.eu-south-2.amazonaws.com/17127328993440.jpeg";
//   const logoImageUrl =
//     "https://dimboo-development.s3.eu-south-2.amazonaws.com/17145686992010.jpeg"

//   const [backgroundImage, setBackgroundImage] = useState<File>();
//   const [logoImage, setLogoImage] = useState<File>();

//   const [watermarkSize, setWatermarkSize] = useState({
//     width: "100",
//     height: "100",
//     x: 0,
//     y: 0,
//   });

//   const canvasRef = useRef<HTMLDivElement>(null);

//   const handleImagesUpload = async () => {
//     const backgroundImageBlob = await fetch(mainImageUrl).then((res) =>
//       res.blob()
//     );
//     const backgroundImageFile = new File(
//       [backgroundImageBlob],
//       "mainImage.jpeg",
//       {
//         type: "image/jpeg",
//       }
//     );
//     setBackgroundImage(backgroundImageFile);

//     const logoImageBlob = await fetch(logoImageUrl).then((res) => res.blob());
//     const logoImageFile = new File([logoImageBlob], "logoImage.jpeg", {
//       type: "image/jpeg",
//     });
//     setLogoImage(logoImageFile);
//   };

//   const handleSaveImage = async () => {
//     if (canvasRef.current) {
//       const canvas = await html2canvas(canvasRef.current);
//       const link = document.createElement("a");
//       link.download = "watermarked-image.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleImagesUpload}>Upload image</button>

//       {backgroundImage ? (
//         <div ref={canvasRef}>
//           <img src={URL.createObjectURL(backgroundImage)} alt="" />

//           {logoImage ? (
//             <ReactRND
//               size={{
//                 width: watermarkSize.width,
//                 height: watermarkSize.height,
//               }}
//               bounds={"parent"}
//               dragAxis="both"
//               lockAspectRatio={true}
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
//                 setWatermarkSize((prev) => {
//                   return {
//                     ...prev,
//                     x: d.x,
//                     y: d.y,
//                   };
//                 });
//               }}
//               onResizeStop={(_, __, ref, ___, position) => {
//                 setWatermarkSize({
//                   width: ref.style.width,
//                   height: ref.style.height,
//                   ...position,
//                 });
//               }}
//               children={
//                 <img
//                   src={URL.createObjectURL(logoImage)}
//                   style={{
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "contain",
//                     width: "100%",
//                     height: "100%",
//                   }}
//                   alt=""
//                   draggable={false}
//                 />
//               }
//             />
//           ) : null}
//         </div>
//       ) : null}

//       <button onClick={handleSaveImage}>Save Watermarked Image</button>
//     </div>
//   );
// };

// export default App;
























import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Rnd as ReactRND } from "react-rnd";
import "./index.css";

const App = () => {
  const mainImageUrl =
    "https://dimboo-development.s3.eu-south-2.amazonaws.com/17127328993440.jpeg";
  const logoImageUrl =
    "https://dimboo-development.s3.eu-south-2.amazonaws.com/17145686992010.jpeg";

  const [backgroundImage, setBackgroundImage] = useState<File>();
  const [logoImage, setLogoImage] = useState<File>();

  const [watermarkSize, setWatermarkSize] = useState({
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleImagesUpload = async () => {
    const backgroundImageBlob = await fetch(mainImageUrl).then((res) => res.blob());
    const backgroundImageFile = new File([backgroundImageBlob], "mainImage.jpeg", {
      type: "image/jpeg",
    });
    setBackgroundImage(backgroundImageFile);

    const logoImageBlob = await fetch(logoImageUrl).then((res) => res.blob());
    const logoImageFile = new File([logoImageBlob], "logoImage.jpeg", {
      type: "image/jpeg",
    });
    setLogoImage(logoImageFile);
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
      <button onClick={handleImagesUpload}>Upload image</button>

      {backgroundImage && (
        <div className="watermark-container" ref={canvasRef}>
          <img src={URL.createObjectURL(backgroundImage)} alt="Background" />

          {logoImage && (
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
                src={URL.createObjectURL(logoImage)}
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

      <button onClick={handleSaveImage}>Save Watermarked Image</button>
    </div>
  );
};

export default App;
