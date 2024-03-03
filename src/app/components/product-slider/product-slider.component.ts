import {Component} from '@angular/core';
import {CarouselLibConfig, Image} from "@ks89/angular-modal-gallery";

@Component({
    selector: 'app-product-slider',
    templateUrl: './product-slider.component.html',
    styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent {

    public images: Image[] = [
        new Image(1, {img: 'assets/default-product.jpg'}),
        new Image(2, {img: 'assets/default-product.jpg'}),
        new Image(3, {img: 'assets/default-product.jpg'})
    ];

    carouselConfig: CarouselLibConfig = {
        carouselSlideInfinite: false,
        carouselDotsConfig: {
            visible: false
        },
        carouselConfig: {
            maxWidth: '100%',
            maxHeight: '100%',
            showArrows: true,
            objectFit: 'cover',
            keyboardEnable: true,
            modalGalleryEnable: true
        },
        carouselPlayConfig: {
            autoPlay: false,
            interval: 5000,
            pauseOnHover: true
        },
        carouselPreviewsConfig: {
            visible: true,
            number: 3,
            width: 'auto',
            maxHeight: '100%'
        }
    };

    constructor() {

    }

    test(event: any) {
        console.log(event);
    }

}
