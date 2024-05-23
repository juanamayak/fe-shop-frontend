import {Component, Input, OnInit} from '@angular/core';
import {CarouselLibConfig, Image} from "@ks89/angular-modal-gallery";
import {ProductsService} from "../../services/products.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";

@Component({
    selector: 'app-product-slider',
    templateUrl: './product-slider.component.html',
    styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent implements OnInit {

    @Input() productUuid: string;

    public images: Image[] = [
        new Image(0, {img: 'assets/default-product.jpg'})
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

    constructor(
        private productsService: ProductsService,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private router: Router,
    ) {

    }

    ngOnInit(){
        this.getImages();
    }

    getImages() {
        this.productsService.getProductImages(this.productUuid).subscribe({
            next: res => {
                for (const image of res.images) {
                    this.images.push(new Image(image.file.id, {img: 'assets/default-product.jpg'}))
                }
                /*this.files = res.images.map((image: any) => {
                    /!*return {
                        file: this.base64toFile(image.url, image.file.type, image.file.name),
                        url: `data:${image.file.type};base64,${image.url}`
                    }*!/

                    return new Image(image.file.id, {img: `data:${image.file.type};base64,${image.url}`});
                });
                console.log(this.files);*/

                console.log(this.images);

                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    base64toFile(base64: string, mimeType: string, fileName: string): File {
        const blob = this.base64toBlob(base64, mimeType);
        return new File([blob], fileName, { type: mimeType });
    }

    base64toBlob(base64: string, mimeType: string): Blob {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], {type: mimeType});
    }

    test(event: any) {
        console.log(event);
    }

}
