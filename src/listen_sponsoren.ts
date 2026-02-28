export interface Sponsor {
  imgPath: string;
  label: string;
  url?: string;
}

export interface SponsorLists {
  fixpunkte: Sponsor[];
  hoehenfixpunkte: Sponsor[];
  passpunkte: Sponsor[];
  grenzpunkte: Sponsor[];
  ruebli: string[];
}

export function loadSponsors() {
  return fetch("/data/sponsoren.json").then(
    (response) => response.json() as Promise<SponsorLists>,
  );
}
