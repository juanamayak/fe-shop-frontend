import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    private mapbox = (mapboxgl as typeof mapboxgl);
    private map: mapboxgl.Map | any;
    private style = `mapbox://styles/mapbox/streets-v12`;
    private zoom = 9;

    constructor() {
        // (mapboxgl as any).accessToken = environment.mapboxToken;
    }

    buildMap(lng: any, lat: any) {
        if (this.map){
            this.map.remove();
        }

        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [lng, lat]
        });

        this.map.addControl(new mapboxgl.NavigationControl());
        this.buildMarker(lng, lat)
    }

    buildMarker(lng: any, lat: any) {
        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([lng, lat]).addTo(this.map);

        marker.on('dragend', () => {
            return marker.getLngLat();
        });
    }
}
