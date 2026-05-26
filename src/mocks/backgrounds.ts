export interface BackgroundMock {
  id: string;
  url: string;
  title: string;
  author: string;
  size: string;
  featured?: boolean;
}

export const MOCK_BACKGROUNDS: BackgroundMock[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    title: 'Neon Tokyo Night',
    author: 'CyberArtist',
    size: '3840x2160',
    featured: true
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
    title: 'Minimalist Abstract',
    author: 'ZenDesigner',
    size: '1920x1080'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1974&auto=format&fit=crop',
    title: 'Anime Sky High',
    author: 'MakotoStyle',
    size: '2560x1440'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop',
    title: 'Synthwave Sunset',
    author: 'RetroVibe',
    size: '1920x1080'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1541450805268-4822a3a774ca?q=80&w=2070&auto=format&fit=crop',
    title: 'Cyberpunk Alley',
    author: 'NightCity',
    size: '3840x2160'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=2070&auto=format&fit=crop',
    title: 'Digital Rain',
    author: 'MatrixDev',
    size: '1920x1080',
    featured: true
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop',
    title: 'Vaporwave Grid',
    author: 'AestheticOne',
    size: '2560x1440'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    title: 'Hardware Soul',
    author: 'TechOtaku',
    size: '1920x1080'
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    title: 'Abstract Flow',
    author: 'FluidDesign',
    size: '3840x2160'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    title: 'Nature Horizon',
    author: 'EarthWalker',
    size: '1920x1080'
  }
];
