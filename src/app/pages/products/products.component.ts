import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialogRef} from "@angular/material/dialog";
import {LocationsService} from "../../services/locations.service";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {CategoriesService} from "../../services/categories.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

    public filterForm: any;

    public products: any;
    public category: any;

    public loading: boolean = false;
    public countries: any;
    public states: any;
    public cities: any;

    public filteredProducts: any;

    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private locationsService: LocationsService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getCategory();
        this.getCountries();
        this.initForm();
    }

    initForm() {
        this.filterForm = this.formBuilder.group({
            country_id: [142],
            state_id: [''],
            city_id: [''],
            min_price: [''],
            max_price: [''],
            subcategories: [[]],
        });
    }

    applyFilter() {
        const data = this.filterForm.value;

        this.filteredProducts = this.products.filter((product: any) => {
            if (data.city_id) {
                const providers = product.providers.map((provider: any) => provider.city_id);
                if (!providers.includes(data.city_id)) {
                    return false;
                }
            }

            if ((data.min_price && Number(product.price) < data.min_price) ||
                (data.max_price && Number(product.price) > data.max_price)) {
                return false;
            }

            if (data.subcategories.length > 0) {
                const subcategories = product.subcategories.map((subcategory: any) => subcategory.id);

                const included = data.subcategories.some((subcategory: any) => subcategories.includes(subcategory));

                return included;
            }

            return true;
        });
    }

    searchProducts(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filteredProducts = this.products.filter((product: any) =>
            product.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }

    getCategory() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const categoryUuid = params['categoryUuid'];
                this.categoriesService.getCategory(categoryUuid).subscribe({
                    next: res => {
                        this.category = res.category;
                        this.getProducts(categoryUuid);
                    },
                    error: err => {
                        this.spinner.hide()
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        });
    }

    getProducts(categoryUuid: any) {
        this.productsService.getProductsByCategory(categoryUuid).subscribe({
            next: res => {
                this.spinner.hide();
                this.products = res.products;
                this.filteredProducts = this.products.slice();
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getCountries() {
        this.loading = true;
        this.locationsService.getCountries().subscribe({
            next: res => {
                // TODO: Ordenar Mexico, Estados Unidos y Canada de primero
                this.countries = res.countries;
                this.getStates({value: 142});
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    getStates(event: any) {
        this.loading = true;
        const countryId = event.value;
        this.locationsService.getStates(countryId).subscribe({
            next: res => {
                this.states = res.states;
                this.loading = false;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getCities(event: any) {
        this.loading = true;
        const stateId = event.value;
        this.locationsService.getCities(stateId).subscribe({
            next: res => {
                this.spinner.hide();
                this.cities = res.cities;
                this.loading = false;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    subcategoryCheck(event: any, subcategory: any) {
        const subcategories = this.subcategories.value;
        const index = subcategories.indexOf(subcategory.id);
        if (event.checked) {
            subcategories.push(subcategory.id);
        } else if (!event.checked && index !== -1) {
            subcategories.splice(index, 1);
        }

        this.subcategories.setValue(subcategories);
    }

    get subcategories() {
        return this.filterForm.get('subcategories');
    }
}
