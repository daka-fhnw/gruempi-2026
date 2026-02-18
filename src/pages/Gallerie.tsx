import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import type { ImageGalleryRef } from "react-image-gallery";
import fotos2025 from "../fotos2025";

const images = fotos2025.map((filename) => ({
  original: filename,
  thumbnail: filename.replace(".webp", "_th.webp"),
}));

export default function Gallerie() {
  const galleryRef = useRef<ImageGalleryRef>(null);
  return (
    <>
      <h1>Rückblick Grümpi 2025</h1>
      <ImageGallery ref={galleryRef} items={images} />
    </>
  );
}
