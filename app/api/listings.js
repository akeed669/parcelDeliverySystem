import client from "./client";

const endpoint = "/parcels";

const getListings = () => client.get(endpoint);

export const addListing = (listing, onUploadProgress) => {
  console.log(listing)
  // const data = new FormData();
  const data = {};
  
  data.destination= listing.destination;
  data.address= listing.address;
  data.weight= listing.weight;
  data.description= listing.description;
  data.owner= listing.owner;
  data.status= listing.state;
  data.deliveryAgent= listing.deliveryAgent;

  // listing.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );

  // if (listing.location)
  //   data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
};
