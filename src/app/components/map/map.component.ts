import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

    @Output() lngLat = new EventEmitter();

    public map: mapboxgl.Map;
    public style = `mapbox://styles/mapbox/streets-v12`;
    public zoom = 9;

    constructor() {
    }

    ngOnInit() {
        // this.initMap(-99.133683, 19.438900)
    }

    initMap(lng: any, lat: any) {
        console.log(this.map);
        if (this.map){
            this.map.remove();
        }

        this.map = new mapboxgl.Map({
            accessToken: environment.mapboxToken,
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
            this.lngLat.emit(marker.getLngLat());
        });
    }
}
