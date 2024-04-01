import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../services/diary.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Day } from '../../interfaces/day';
import { Diary } from '../../interfaces/diary';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import Highcharts from 'highcharts';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [RouterLink,CommonModule,ChartModule],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent implements OnInit {
  

  present:boolean = false;
  doneDay:boolean = false;
  days:Day[] = [];
  // @ts-ignore
  diary:Diary;
  // @ts-ignore
  chart:Chart;
  chartOptions:any;

  constructor(private diaryService:DiaryService,private userService:UserService,
    private snackBar:MatSnackBar){
     
      
  }
  ngOnInit(): void {
  
    this.diaryService.checkIfCreated(this.userService.thename).subscribe((res)=>{
      this.present = res;
      if(res){
        this.diaryService.getDiary(this.userService.thename).subscribe((res)=>{
          this.diary = res;
          console.log(this.diary);
          this.diaryService.checkDay(this.diary.id).subscribe((r)=>{
            this.doneDay = r;
          });
          this.diaryService.getDays(this.diary.id).subscribe((d)=>{
            this.days = d;
          });
        });
      }
    })
  }

  startDiary(){
    console.log(this.userService.thename);
    this.diaryService.createDiary(this.userService.thename).toPromise()
  .then(() => {
    this.diaryService.getDiary(this.userService.thename).subscribe((res) => {
      this.diary = res;
    });
  });
    this.snackBar.open('Diary started successfully.','Close',
    {duration:2000});
    this.present = true;
  }
  toggleShown(day:Day){
    day.shown = !day.shown;
  }
  lineChart(parameter:string){
    var dates = this.days.map(d=>d.date);
    this.chartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Your result'
      },
      subtitle: {
        text: 'Your result'
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        valueSuffix: ' kg'
      },
      series: [{
        name: 'Date',
        data: []
      }]
    };
    if(parameter=='weight'){
      console.log("works");
      this.chartOptions.yAxis.title.text = 'Weight';
      this.chartOptions.tooltip.valueSuffix = 'kg';
      this.chartOptions.series[0].data = this.days.map(d=>d.weight);
    }else if(parameter=='result'){
      this.chartOptions.yAxis.title.text = 'Calories';
      this.chartOptions.tooltip.valueSuffix = 'kCal';
      this.chartOptions.series[0].data = this.days.map(d=>d.result);
    }else if(parameter=='duration'){
      this.chartOptions.yAxis.title.text = 'Duration';
      this.chartOptions.tooltip.valueSuffix = 'min';
      this.chartOptions.series[0].data = this.days.map(d=>d.duration);
    }else if(parameter=='intensity'){
      this.chartOptions.yAxis.title.text = 'Intensity';
      this.chartOptions.tooltip.valueSuffix = '';
      this.chartOptions.series[0].data = this.days.map(d=>d.intensity);
    }
    this.chart = new Chart(this.chartOptions);
   }
  
   exportPDF(){
    this.diaryService.getPDF(this.diary.id).subscribe((response: Blob)=>{
      saveAs(response, 'diary.pdf');
    });
   }

}
