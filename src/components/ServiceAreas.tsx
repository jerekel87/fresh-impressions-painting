import ScrollingGallery from './ScrollingGallery';
import photoJun16 from '../assets/Photo_Jun_16_2022,_4_46_05_PM.jpg';
import interiorPainting1 from '../assets/interior-painting1.jpg';
import photoDec05 from '../assets/Photo_Dec_05_2022,_4_16_16_PM.jpg';
import photoFeb27 from '../assets/Photo_Feb_27_2026,_3_40_59_PM.jpg';
import photoMar13 from '../assets/Photo_Mar_13_2025,_7_14_48_PM.jpg';
import photoNov30 from '../assets/Photo_Nov_30_2018,_3_20_20_PM.jpg';
import screenshotMetal1 from '../assets/Screenshot_2026-05-22_at_8.56.25_PM.png';
import photoOct26_16 from '../assets/Photo_Oct_26_2021,_1_37_16_PM.jpg';
import screenshotStain from '../assets/Screenshot_2026-05-22_at_9.33.33_PM.png';

const images = [
  photoJun16,
  interiorPainting1,
  photoDec05,
  photoFeb27,
  photoMar13,
  photoNov30,
  screenshotMetal1,
  photoOct26_16,
  screenshotStain,
];

export default function ServiceAreas() {
  return <ScrollingGallery images={images} />;
}
