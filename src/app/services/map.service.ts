import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import * as mapboxgl from 'mapbox-gl';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    mapbox = (mapboxgl as typeof mapboxgl);
    map: mapboxgl.Map | undefined;
    style = `mapbox://styles/mapbox/streets-v11`;
    // Coordenadas de la localización donde queremos centrar el mapa
    lat = 43.1746;
    lng = -2.4125;
    zoom = 15;

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
}
