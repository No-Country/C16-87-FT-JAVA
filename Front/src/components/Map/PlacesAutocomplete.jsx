import { Autocomplete } from '@react-google-maps/api';
import { latLng } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react'
import usePlaceAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Map } from './Map'


const MAPS_API_KEY = 'AIzaSyClTa9AaDudMfrZUEbzlGNpNu-AdPMFGto'

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement('script')
    script.type = 'text/javascript';

    if(script.readyState) {
        script.onreadystatechange = function () {
            if(script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback()
            }
        }
    } else {
        script.onload = () => callback()
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script)
}

export const PlacesAutocomplete = () => {

    const [query, setQuery] = useState("")
    const [selectedLatLng, setSelectedLatLng] = useState(null)
    const autoCompleteRef = useRef(null);

    const handleScriptLoad = (updateQuery, autoCompleteRef) => {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current, {
                componentRestrictions: { country: 'AR' }
            }
        )

        autoComplete.addListener('place_changed', () => {
            handlePlaceSelect(updateQuery)
        })
    }

    const handlePlaceSelect = async updateQuery => {
        const addressObject = await autoComplete.getPlace();

        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log({query});
        
        const latLng = {
            lat: addressObject?.geometry?.location.lat(),
            lng: addressObject?.geometry?.location.lng(),
        }

        console.log({latLng});
        setSelectedLatLng(latLng);
    }

    useEffect(() => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef)
        )
    }, [])

    // useEffect(() => {
    //     console.log("selectedLatLng:", selectedLatLng);
    // }, [selectedLatLng]);



    // const {
    //     ready,
    //     value,
    //     setValue,
    //     suggestions: {status, data},
    //     clearSuggestions
    // } = usePlaceAutocomplete();

  return (
    <div>
        <input ref={autoCompleteRef} onChange={(event) => setQuery(event.target.value)} value={query || ''} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2" placeholder="Direccion del evento"/>
        {
            selectedLatLng ?
            <Map selectedLatLng={selectedLatLng}/>
            : null
        }
    </div>
  )
}