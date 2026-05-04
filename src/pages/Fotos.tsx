import { useState } from "react";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { ArrowLink } from "../comps/ArrowLink";
import { fotosGross, fotosKlein } from "../listen_fotos";

export default function Fotos() {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <h1>Fotos Grümpi 2026</h1>
      <div className="mb-3">
        <a
          href="/data/Fotos_Gruempi_2026.zip"
          download="Fotos Grümpi 2026.zip"
        >
          <ArrowLink>Alle Fotos herunterladen (528 MB)</ArrowLink>
        </a>{" "}
        🤩
      </div>
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
        controller={{ closeOnBackdropClick: true }}
        styles={{
          root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" },
          toolbar: {
            backgroundColor: "rgba(0, 0, 0, .7",
            right: "unset",
          },
        }}
        plugins={[Fullscreen, Slideshow, Zoom, Download, Counter]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      />
    </>
  );
}
