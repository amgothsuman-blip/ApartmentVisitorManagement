import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  visitors: Visitor[] = [];

  constructor(private visitorService: VisitorService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.visitors = this.visitorService.getVisitors();
  }

  get total(): number {
    return this.visitors.length;
  }

  get pending(): number {
    return this.visitors.filter(v => v.status === 'Pending').length;
  }

  get approved(): number {
    return this.visitors.filter(v => v.status === 'Approved').length;
  }

  get inside(): number {
    return this.visitors.filter(
      v => v.entryTime !== '' && v.exitTime === ''
    ).length;
  }

  get recentVisitors(): Visitor[] {
    return this.visitors.slice(0, 5);
  }
}
