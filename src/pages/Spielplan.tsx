import { useCallback, useEffect, useState } from "react";
import { Loading } from "../comps/Loading";
import { loadSpielplanData, type SpielplanData } from "../daten_spielplan";
import { SpielGruppen } from "../comps/SpielGruppen";
import { SpielTabelle } from "../comps/SpielTabelle";

export default function Sponsoren() {
  const [spielplan, setSpielplan] = useState<SpielplanData | null>(null);
  const [kuerzelMap, setKuerzelMap] = useState(new Map<string, string>());
  const resolveName = useCallback(
    (kuerzel: string) => kuerzelMap.get(kuerzel) ?? `<?${kuerzel}?>`,
    [kuerzelMap],
  );
  useEffect(() => {
    loadSpielplanData().then((data) => {
      setSpielplan(data);
      setKuerzelMap(new Map(Object.entries(data.kuerzel)));
    });
  }, []);

  if (spielplan !== null) {
    return (
      <>
        <h1>Spielplan</h1>
        <h3>Gruppen</h3>
        <SpielGruppen gruppen={spielplan.gruppen} resolveName={resolveName} />
        <h3 className="mt-3">Gruppenphase</h3>
        <SpielTabelle
          spiele={spielplan.spiele.gruppen}
          resolveName={resolveName}
        />
        <h3 className="mt-3">Viertelfinal</h3>
        <SpielTabelle
          spiele={spielplan.spiele.viertelfinal}
          resolveName={resolveName}
        />
        <h3 className="mt-3">Halbfinal</h3>
        <SpielTabelle
          spiele={spielplan.spiele.halbfinal}
          resolveName={resolveName}
        />
        <h3 className="mt-3">Final</h3>
        <SpielTabelle
          spiele={spielplan.spiele.final}
          resolveName={resolveName}
        />
      </>
    );
  } else {
    return <Loading />;
  }
}
