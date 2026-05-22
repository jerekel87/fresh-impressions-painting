import ScrollingGallery from './ScrollingGallery';
import photoJun16 from '../assets/Photo_Jun_16_2022,_4_46_05_PM.jpg';
import interiorPainting1 from '../assets/interior-painting1.jpg';
import photoDec28 from '../assets/Photo_Dec_28_2023,_11_08_29_AM.jpg';
import photoAug29 from '../assets/Photo_Aug_29_2025,_5_26_28_PM.jpg';
import photoJul18 from '../assets/Photo_Jul_18_2025,_7_31_54_PM.jpg';
import photoAug19 from '../assets/Photo_Aug_19_2024,_10_17_59_AM.jpg';
import screenshotMetal1 from '../assets/Screenshot_2026-05-22_at_8.56.25_PM.png';
import photoOct26_16 from '../assets/Photo_Oct_26_2021,_1_37_16_PM.jpg';
import screenshotStain from '../assets/Screenshot_2026-05-22_at_9.33.33_PM.png';

const images = [
  photoJun16,
  interiorPainting1,
  photoDec28,
  photoAug29,
  photoJul18,
  photoAug19,
  screenshotMetal1,
  photoOct26_16,
  screenshotStain,
];

export default function ServiceAreas() {
  return <ScrollingGallery images={images} />;
}
