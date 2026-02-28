import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import type { ImageGalleryRef } from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { fotos2025 } from "../listen_gallerie";

const images = fotos2025.map((filename) => ({
  original: filename,
  thumbnail: filename.replace(".webp", "_th.webp"),
}));

export default function Galerie() {
  const galleryRef = useRef<ImageGalleryRef>(null);
  return (
    <>
      <h1>Rückblick Grümpi 2025</h1>
      <ImageGallery ref={galleryRef} items={images} />
    </>
  );
}
