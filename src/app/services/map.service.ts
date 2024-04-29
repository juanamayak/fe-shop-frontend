import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    mapbox = (mapboxgl as typeof mapboxgl);
    map: mapboxgl.Map | any;
    style = `mapbox://styles/mapbox/streets-v12`;
    // Coordenadas de la localización donde queremos centrar el mapa
    lat = 19.4361242;
    lng = -99.1464531;
    zoom = 10;

    constructor() {
        this.mapbox.accessToken = environment.mapboxToken;
    }

    buildMap() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [this.lng, this.lat]
        });

        this.map.addControl(new mapboxgl.NavigationControl());
    }

    buildMarker(lat: any, lng: any){
        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([lng, lat]).addTo(this.map);

        /*marker.on('dragstart', () => {
            this.map?.dragPan.disable();
        });

        marker.on('drag', () => {
            // Actualizar las coordenadas en tiempo real si es necesario
        });

        marker.on('dragend', () => {
            const lngLat = marker.getLngLat();
            console.log('Marcador movido a:', lngLat.lng, lngLat.lat);
            this.map?.dragPan.enable();
        });*/
    }
}
