export default function factoryToDoc(data, manager) {
  const {
    name,
    type,
    quantity,
    photo,
    photo_mimetype,
    street,
    building,
    country,
    latitude,
    longitude,
    zipcode,
  } = data;
  if (photo && photo_mimetype) {
    
  return {
    name: name,
    type: type,
    quantity: quantity,
    photo: photo,
    photo_mimetype: photo_mimetype,
    address: {
      street,
      building,
      country,
      zipcode,
      coord: `${latitude},${longitude}`,
    },
    manager,
  };
  
  }else{
    return {
      name: name,
      type: type,
      quantity: quantity,
      address: {
        street,
        building,
        country,
        zipcode,
        coord: `${latitude},${longitude}`,
      },
      manager,
    };
  }
}
