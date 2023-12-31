import React from "react";
import { Map } from "react-map-gl";
import GeocoderControl from "./geocoder-control";
import { useAppStore } from "airbnb/store/store";

const PlaceLocation = () => {
  const { setMapData, setLocationData } = useAppStore();
  const getResults = ({ result }) => {
    const [longitude, latitude] = result?.geometry?.coordinates;
    const data = {
      landmark: result?.text,
      neighborhood: "",
      postcode: "",
      locality: "",
      place: "",
      district: "",
      region: "",
      country: "",
    };
    result?.context?.forEach((item) => {
      Object.keys(data)?.forEach((key) => {
        if (item?.id?.startsWith(key + ".")) {
          data[key] = item?.text;
        }
      });
    });
    setMapData({ longitude, latitude });
    setLocationData({ ...data });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <h2 className="font-semibold text-4xl">
        Where is your property located?
      </h2>
      <p>
        <b>Note: </b>
        Address is shared with clients after booking
      </p>
      <div className="h-[400px] w-[700px]">
        <Map
          initialViewState={{
            longitude: 36.817223,
            latitude: -1.286389,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        >
          <GeocoderControl
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            position="top-left"
            marker={true}
            onLoading={() => {}}
            onResults={() => {}}
            onResult={getResults}
            onError={() => {}}
          />
        </Map>
      </div>
    </div>
  );
};

export default PlaceLocation;
