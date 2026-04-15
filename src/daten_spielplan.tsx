export interface Kuerzel {
  [Key: string]: string;
}

export interface SpielGruppe {
  name: string;
  teams: string[];
}

export interface Spiel {
  zeit: string;
  platz: string;
  team1: string;
  team2: string;
  schiri: string;
}

export interface Spiele {
  gruppen: Spiel[];
  viertelfinal: Spiel[];
  halbfinal: Spiel[];
  final: Spiel[];
}

export interface SpielplanData {
  kuerzel: Kuerzel;
  gruppen: SpielGruppe[];
  spiele: Spiele;
}

export function loadSpielplanData() {
  return fetch("/data/spielplan.json").then(
    (response) => response.json() as Promise<SpielplanData>,
  );
}
