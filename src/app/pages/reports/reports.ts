import { Component, OnInit } from '@angular/core';
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {
  visitors: Visitor[] = [];

  constructor(private visitorService: VisitorService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.visitors = this.visitorService.getVisitors();
  }

  get pending(): number {
    return this.visitors.filter(v => v.status === 'Pending').length;
  }

  get approved(): number {
    return this.visitors.filter(v => v.status === 'Approved').length;
  }

  get rejected(): number {
    return this.visitors.filter(v => v.status === 'Rejected').length;
  }

  get inside(): number {
    return this.visitors.filter(
      v => v.entryTime !== '' && v.exitTime === ''
    ).length;
  }

  get exited(): number {
    return this.visitors.filter(v => v.exitTime !== '').length;
  }

  get todayVisitors(): number {
    const today = new Date().toISOString().slice(0, 10);

    return this.visitors.filter(v => v.date === today).length;
  }

  exportCsv(): void {
    const headers = [
      'Name',
      'Phone',
      'Apartment',
      'Purpose',
      'Date',
      'Status',
      'Entry Time',
      'Exit Time'
    ];

    const escapeCsv = (value: string): string =>
      `"${value.replace(/"/g, '""')}"`;

    const rows = this.visitors.map(v => [
      v.name,
      v.phone,
      v.apartment,
      v.purpose,
      v.date,
      v.status,
      v.entryTime,
      v.exitTime
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(escapeCsv).join(','))
      .join('\r\n');

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'apartment-visitor-report.csv';
    link.click();

    URL.revokeObjectURL(url);
  }
}