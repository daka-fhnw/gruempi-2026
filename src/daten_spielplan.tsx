export interface Kuerzel {
  [Key: string]: string;
}

export interface SpielGruppe {
  name: string;
  teams: string[];
}

export interface Spiel {
  zeit: string;
  feld: string;
  team1: string;
  team2: string;
  schiri: string;
}

export interface SpielplanData {
  kuerzel: Kuerzel;
  gruppen: SpielGruppe[];
  gruppenphase: Spiel[];
  viertelfinal: Spiel[];
  halbfinal: Spiel[];
  final: Spiel[];
}

export interface SpielplanDetail {
  teams: TeamDetail[];
  gruppen: GruppeDetail[];
  gruppenphase: SpielDetail[];
  viertelfinal: SpielDetail[];
  halbfinal: SpielDetail[];
  final: SpielDetail[];
}

export interface SpielDetail {
  id: number;
  zeit: string;
  feld: string;
  team1: TeamDetail;
  team2: TeamDetail;
  schiri: TeamDetail;
}

export interface TeamDetail {
  id: number;
  name: string;
  kuerzel: string;
  platzhalter: boolean;
}

export interface GruppeDetail {
  id: number;
  name: string;
  teams: TeamDetail[];
}

export function loadSpielplanData() {
  return fetch("/data/spielplan.json").then(
    (response) => response.json() as Promise<SpielplanData>,
  );
}
