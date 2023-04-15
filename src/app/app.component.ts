import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CategoryService } from './services/category.service';
import { Category } from './interfaces/category';
import { EmployeeService } from './services/employee.service';
import { Employee } from './interfaces/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //Identificador de las columnas de Angular Material
  displayedColumns: string[] = ['id', 'fullName', 'categoryId'];

  //Autocomplete
  myControl = new FormControl<string | Category>('');
  options: Category[] = [];
  filteredOptions!: Observable<Category[]>;

  employeeForm!: FormGroup;
  employees: Employee[] = [];
  idCategory?: any;

  public categories: any = '';
  constructor(
    private _categoryService: CategoryService,
    private _employeeService: EmployeeService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.employeeForm = this._formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      categoryId: [''],
    });
    /*Mostrar todas las categorias */
    this._categoryService.getAllCategory().subscribe((data) => {
      this.options = data;
    });
    /* Mostrar todos los empleados */
    this._employeeService.getAllEmployee().subscribe((data) => {
      this.employees = data;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.idCategory = value;
        const name = typeof value === 'string' ? value : value?.description;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(employee: Category): string {
    return employee && employee.description ? employee.description : '';
  }

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.description.toLowerCase().includes(filterValue)
    );
  }

  addEmployee() {
    const emp: Employee = {
      id: this.employees.length + 1,
      lastName: this.employeeForm.value.lastName,
      firstName: this.employeeForm.value.firstName,
      categoryId: this.idCategory.id,
    };
    this._employeeService.add(emp).subscribe(() => window.location.reload());
  }
}
