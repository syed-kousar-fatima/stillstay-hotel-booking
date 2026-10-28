import hotelPhotoCatalog from './hotelPhotoCatalog.json';

export function getHotelPhotos(_location, locationIndex, styleIndex) {
  const firstPhotoIndex = (locationIndex * 3 + styleIndex) * 4;
  return hotelPhotoCatalog.slice(firstPhotoIndex, firstPhotoIndex + 4);
}
