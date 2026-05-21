import ScrollingGallery from './ScrollingGallery';

const images = [
  'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/2098913/pexels-photo-2098913.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
];

export default function ServiceAreas() {
  return <ScrollingGallery images={images} />;
}
