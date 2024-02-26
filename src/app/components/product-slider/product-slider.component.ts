import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent {

    customOptions: OwlOptions = {
        margin:10,
        loop: true,
        mouseDrag: true,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        autoWidth:true,
        items: 1,
        URLhashListener:true,
        startPosition: 'URLHash',
        /*responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },*/
        nav: false
    }

    images = [
        { id: 1, path: 'assets/default-product.jpg' },
        { id: 2, path: 'assets/default-product.jpg' },
        { id: 3, path: 'assets/default-product.jpg' },
        { id: 4, path: 'assets/default-product.jpg' },
        { id: 5, path: 'assets/default-product.jpg' },
        { id: 6, path: 'assets/default-product.jpg' }
    ];

    public _albums: any[] = [];
    constructor(private _lightbox: Lightbox) {
        for (let i = 1; i <= 4; i++) {
            const src = 'demo/img/image' + i + '.jpg';
            const caption = 'Image ' + i + ' caption here';
            const thumb = 'demo/img/image' + i + '-thumb.jpg';
            const album = {
                src: src,
                caption: caption,
                thumb: thumb
            };

            this._albums.push(album);
        }
    }

    open(index: number): void {
        // open lightbox
        this._lightbox.open(this._albums, index);
    }

    close(): void {
        // close lightbox programmatically
        this._lightbox.close();
    }


}
