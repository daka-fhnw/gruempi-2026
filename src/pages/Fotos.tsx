import { useState } from "react";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { fotosGross, fotosKlein } from "../listen_fotos";

export default function Fotos() {
  const [index, setIndex] = useState(-1);
  console.log(fotosKlein);
  return (
    <>
      <h1>Fotos Grümpi 2026</h1>
      <RowsPhotoAlbum
        photos={fotosKlein}
        targetRowHeight={203}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={fotosGross}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Download]}
      />
    </>
  );
}
