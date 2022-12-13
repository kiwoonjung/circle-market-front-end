// import "./Test.scss";
// import { useState } from "react";

// const slideStyles = {
//   width: "100%",
//   height: "100%",
//   borderRadius: "10px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// };

// const rightArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   right: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const leftArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   left: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const sliderStyles = {
//   position: "relative",
//   height: "100%",
// };

// const dotsContainerStyles = {
//   display: "flex",
//   justifyContent: "center",
// };

// const dotStyle = {
//   margin: "0 3px",
//   cursor: "pointer",
//   fontSize: "20px",
// };

// const slides = [
//   { url: "http://localhost:3000/image-1.jpg", title: "beach" },
//   { url: "http://localhost:3000/image-2.jpg", title: "boat" },
//   { url: "http://localhost:3000/image-3.jpg", title: "forest" },
//   { url: "http://localhost:3000/image-4.jpg", title: "city" },
//   { url: "http://localhost:3000/image-5.jpg", title: "italy" },
// ];
// const containerStyles = {
//   width: "500px",
//   height: "280px",
//   margin: "0 auto",
// };

// export default function Test() {
//   function ImageSlider({ slides }) {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     function goToPrevious() {
//       const isFirstSlide = currentIndex === 0;
//       const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
//       setCurrentIndex(newIndex);
//     }
//     function goToNext() {
//       const isLastSlide = currentIndex === slides.length - 1;
//       const newIndex = isLastSlide ? 0 : currentIndex + 1;
//       setCurrentIndex(newIndex);
//     }
//     function goToSlide(slideIndex) {
//       setCurrentIndex(slideIndex);
//     }
//     const slideStylesWidthBackground = {
//       ...slideStyles,
//       backgroundImage: `url(${slides[currentIndex].url})`,
//     };
//   }

//   return (
//     <div style={sliderStyles}>
//       <div>
//         <div onClick={goToPrevious} style={leftArrowStyles}>
//           ❰
//         </div>
//         <div onClick={goToNext} style={rightArrowStyles}>
//           ❱
//         </div>
//       </div>
//       <div style={slideStylesWidthBackground}></div>
//       <div style={dotsContainerStyles}>
//         {slides.map((slide, slideIndex) => (
//           <div
//             style={dotStyle}
//             key={slideIndex}
//             onClick={() => goToSlide(slideIndex)}
//           >
//             ●
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
