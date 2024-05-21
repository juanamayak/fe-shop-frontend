import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialogRef} from "@angular/material/dialog";
import {LocationsService} from "../../services/locations.service";
import {FormArray, FormBuilder} from "@angular/forms";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

    public filterForm: any;

    public products: any;
    public category: any;

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

    ngOnInit(){
        this.getCategory();
        this.getCountries();
        this.initForm();
    }

    initForm() {
        this.filterForm = this.formBuilder.group({
            city_id: [''],
            min_price: [''],
            max_price: [''],
            subcategories: [[]],
        });
    }

    applyFilter(){
        const data = this.filterForm.value;
        console.log(data);
    }

    searchProducts(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filteredProducts = this.products.filter((product: any) =>
            product.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }

    getCategory(){
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

    getProducts(categoryUuid: any){
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
        this.locationsService.getCountries().subscribe({
            next: res => {
                // TODO: Ordenar Mexico, Estados Unidos y Canada de primero
                this.countries = res.countries;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    getStates(event: any) {
        const countryId = event.value;
        this.locationsService.getStates(countryId).subscribe({
            next: res => {
                this.states = res.states;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getCities(event: any) {
        const stateId = event.value;
        this.locationsService.getCities(stateId).subscribe({
            next: res => {
                this.spinner.hide();
                this.cities = res.cities;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    subcategoryCheck(event: any){
        let subcategoriesArray = [];
        if (event.checked){
            subcategoriesArray.push(event.source.value);
        }
        console.log(subcategoriesArray);
    }

    get subcategories() {
        return this.filterForm.get('subcategories');
    }
}
