import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city.model';
import { WeatherRecord } from '../../models/weather-record.model';
import { WeatherDetail } from '../../models/weather.model';
import { WeatherRecordService } from '../../services/weather-record.service';
import { WeatherService } from '../../services/weather.service';

/*
 * Implementar:
 * HU-03 — Detalle de Ciudad con Clima (Ver TALLER.md Parte B)
 * HU-04 — Historial de Registros de Clima (Ver TALLER.md Parte D)
 */

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html'
})
export class CityDetailComponent implements OnChanges {
  private weatherRecordService = inject(WeatherRecordService);
  private weatherService = inject(WeatherService);

  @Input() city!: City;

  weatherRecords: WeatherRecord[] = [];
  weatherDetail: WeatherDetail | null = null;
  loading: boolean = false;
  savingWeather: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.weatherRecordService.getRecords(this.city.id)
        .subscribe(records => this.weatherRecords = records);

      this.loading = true;
      this.weatherService.getWeather(this.city.name)
        .subscribe({
          next: (weather) => {
            this.weatherDetail = weather;
            this.loading = false;
          },
          error: () => {
            this.weatherDetail = null;
            this.loading = false;
          }
        });
    }
  }

  saveWeather(): void {
    if (!this.weatherDetail) {
      return;
    }

    this.savingWeather = true;
    this.weatherRecordService.saveRecord(this.city.id, {
      tempC: this.weatherDetail.temp_c,
      condition: this.weatherDetail.condition,
      humidity: this.weatherDetail.humidity
    }).subscribe({
      next: () => {
        this.savingWeather = false;
        // Recarga el historial para mostrar el nuevo registro
        this.weatherRecordService.getRecords(this.city.id)
          .subscribe(records => this.weatherRecords = records);
      },
      error: () => {
        this.savingWeather = false;
      }
    });
  }
}
