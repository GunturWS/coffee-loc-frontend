import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Download, Maximize2 } from "lucide-react";

const GalleryModal = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const downloadImage = async () => {
    try {
      const response = await fetch(images[currentIndex]);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `coffee-shop-${currentIndex + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white z-10 p-2"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image Counter */}
      <div className="absolute top-6 left-6 text-white/80 text-lg font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={downloadImage}
          className="text-white/80 hover:text-white p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          title="Download image"
        >
          <Download className="w-6 h-6" />
        </button>

        <button
          onClick={openFullscreen}
          className="text-white/80 hover:text-white p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          title="Fullscreen"
        >
          <Maximize2 className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="max-w-6xl max-h-[80vh] flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Gallery ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-4xl py-2 px-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? "border-white scale-110"
                : "border-transparent hover:border-white/50"
            }`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Keyboard Navigation */}
      <div className="hidden">
        {document.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") goPrev();
          if (e.key === "ArrowRight") goNext();
          if (e.key === "Escape") onClose();
        })}
      </div>
    </div>
  );
};

export default GalleryModal;
