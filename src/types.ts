export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  alt: string;
  subtext?: string;
  memoryNote?: string;
}

export interface MemoryAlbumPhoto {
  id: string;
  url: string;
  title: string;
  story: string;
  tag?: string;
  category?: string;
  romanticNote?: string;
}

export interface LoveQuoteLetter {
  id: string;
  url: string;
  title: string;
  writtenText: string;
  letterSentence: string;
  tag: string;
  dedication: string;
  date?: string;
}

export interface LoveGiftConfig {
  herName: string;
  yourName: string;
  ourSpecialMemory: string;
  photos: GalleryPhoto[];
  allPhotos: MemoryAlbumPhoto[];
  loveLetters: LoveQuoteLetter[];
  musicUrl: string;
}

export interface InteractiveCard {
  id: string;
  title: string;
  shortHint: string;
  revealedMessage: string;
  iconName: 'smile' | 'heart' | 'sparkles';
}

export interface PromiseItem {
  id: string;
  number: string;
  title: string;
  text: string;
}
