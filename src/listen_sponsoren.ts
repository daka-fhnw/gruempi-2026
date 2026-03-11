export interface SponsorLight {
  label: string;
  url?: string;
}

export interface Sponsor extends SponsorLight {
  imgPath: string;
}

export interface SponsorLists {
  triangulationspunkte: Sponsor[];
  fixpunkte: Sponsor[];
  hoehenfixpunkte: Sponsor[];
  passpunkte: Sponsor[];
  grenzpunkte: SponsorLight[];
}

export function loadSponsors() {
  return fetch("/data/sponsoren.json").then(
    (response) => response.json() as Promise<SponsorLists>,
  );
}
