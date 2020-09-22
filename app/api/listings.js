import client from "./client";

const endpoint = "/parcels";

const getListings = () => client.get(endpoint);

function parcelUrl(uri,id) {
  return `${endpoint}/${uri}/${id}`;
}

export const addListing = (listing, onUploadProgress) => {
  const data = {...listing};

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const updateParcelStatus = (listing, onUploadProgress) => {
  const data = {...listing};

  const customEndpoint = parcelUrl("parcel",data.id)
  console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
  console.log(data)
  console.log(data.id);
  return client.put(customEndpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
}




//
// export const updateParcelStatus=(listing, onUploadProgress) => {
//   const data = {};
//
//   data.destination= listing.destination;
//   data.address= listing.address;
//   data.weight= listing.weight;
//   data.description= listing.description;
//   data.owner= listing.owner;
//   data.status= listing.state;
//   data.deliveryAgent= listing.deliveryAgent;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//   if (order.id) {
//     const body = { ...order };
//     delete body.id;
//
//     const optURI="/parcel"
//     return http.put(parcelUrl(optURI,order.id), body);
//   }
//
//   return http.post(apiEndpoint, order);
// }











export default {
  addListing,
  getListings,
  updateParcelStatus,

};
