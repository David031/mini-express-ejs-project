export default function factoryToData(doc) {
  const { name, type, quantity, photo, photo_mimetype, address, manager } = doc;
  return {
    name,
    type,
    quantity,
    photo,
    photo_mimetype,
    street: address.street,
    building: address.building,
    country: address.country,
    zipcode: address.zipcode,
    latitude: parseFloat(address.coord.split(",")[0]),
    longitude: parseFloat(address.coord.split(",")[1]),
    manager,
  };
}
