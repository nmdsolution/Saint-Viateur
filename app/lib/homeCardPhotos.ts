// Temporary free-licensed stock photos (Unsplash/Pexels license, no attribution
// required) standing in for the clinic's own photography, which todo.txt still
// lists as not yet collected — replace with real clinic photos when available.
export const HOME_SERVICE_CARD_PHOTOS = {
  medecineGenerale: "https://images.unsplash.com/photo-1758691462954-e6fa5005474b",
  pediatrie: "https://images.unsplash.com/photo-1758691462268-fbe66c4f3e28",
  cardiologie: "https://images.unsplash.com/photo-1690785884403-2bff26562857",
  gynecologieObstetrique: "https://images.pexels.com/photos/7088833/pexels-photo-7088833.jpeg",
} as const;

export const HOME_WHY_CARD_PHOTOS = {
  equipementsModernes: "https://images.unsplash.com/photo-1648224395277-052c8108efa3",
  equipeMultilingue: "https://images.unsplash.com/photo-1516841273335-e39b37888115",
  assurancesAcceptees: "https://images.pexels.com/photos/7088834/pexels-photo-7088834.jpeg",
} as const;

export function photoCardBackground(photoUrl: string): string {
  return `linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.15) 55%), url(${photoUrl})`;
}
