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


export default {
  addListing,
  getListings,
  updateParcelStatus,

};
