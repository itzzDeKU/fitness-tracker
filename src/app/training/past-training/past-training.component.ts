import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as fromTraining from '../training.reducer';
import * as fromAuth from '../../auth/auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  userEmail: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
    private authStore: Store<fromAuth.State>
  ) {}

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises: Exercise[]) => {
      console.log('Finished exercises:', exercises);
      this.dataSource.data = exercises;
    });

    this.authStore.select(fromAuth.getUserEmail).subscribe((userEmail: string) => {
      console.log('User email:', userEmail);
      this.userEmail = userEmail;
      this.trainingService.fetchCompletedorCancelledExercises(this.userEmail).subscribe((exercises) => {
        console.log('Fetched exercises for user:', exercises);
        this.dataSource.data = exercises;
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
