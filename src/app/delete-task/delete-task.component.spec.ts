import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTaskComponent } from './delete-task.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';

describe('DeleteTaskComponent', () => {
  let component: DeleteTaskComponent;
  let fixture: ComponentFixture<DeleteTaskComponent>;
  let apiService: ApiService;
  let toastrService: ToastrService;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<DeleteTaskComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        // Mock MatDialogRef with a spy object
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
        ApiService,
        ToastrService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    toastrService = TestBed.inject(ToastrService);
    matDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DeleteTaskComponent>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteTask method on ApiService on confirmation', () => {
    const deleteSpy = spyOn(apiService, 'deleteTask').and.returnValue(of(null));
    component.confirmDelete();
    expect(deleteSpy).toHaveBeenCalledOnceWith(component.data.id);
  });

  it('should close dialog and show success message on successful deletion', () => {
    spyOn(apiService, 'deleteTask').and.returnValue(of(null));
    const toastrSpy = spyOn(toastrService, 'success');

    component.confirmDelete();

    expect(matDialogRef.close).toHaveBeenCalledWith(true);
    expect(toastrSpy).toHaveBeenCalledWith('Task deleted successfully!!');
  });

  it('should handle error on deletion', () => {
    const error = new Error('Test Error');
    spyOn(apiService, 'deleteTask').and.returnValue(throwError(error));
    const consoleSpy = spyOn(console, 'error');

    component.confirmDelete();

    expect(consoleSpy).toHaveBeenCalledWith('Error deleting task:', error);
  });
});
