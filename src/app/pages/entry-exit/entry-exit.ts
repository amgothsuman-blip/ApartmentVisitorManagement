import { Component, OnInit } from '@angular/core';
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-entry-exit',
  standalone: true,
  imports: [],
  templateUrl: './entry-exit.html',
  styleUrl: './entry-exit.css'
})
export class EntryExit implements OnInit {
  visitors: Visitor[] = [];
  message = '';

  constructor(private visitorService: VisitorService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.visitors = this.visitorService.getVisitors();
  }

  get approvedVisitors(): Visitor[] {
    return this.visitors.filter(v => v.status === 'Approved');
  }

  get insideVisitors(): Visitor[] {
    return this.approvedVisitors.filter(
      v => v.entryTime !== '' && v.exitTime === ''
    );
  }

  checkIn(visitor: Visitor): void {
    if (visitor.status !== 'Approved') {
      this.message = 'Only approved visitors can check in.';
      return;
    }

    if (visitor.entryTime && !visitor.exitTime) {
      this.message = 'This visitor is already checked in.';
      return;
    }

    this.visitorService.recordEntry(visitor.id);
    this.refresh();
    this.message = `${visitor.name} checked in successfully.`;
  }

  checkOut(visitor: Visitor): void {
    if (!visitor.entryTime || visitor.exitTime) {
      this.message = 'This visitor does not have an active entry.';
      return;
    }

    this.visitorService.recordExit(visitor.id);
    this.refresh();
    this.message = `${visitor.name} checked out successfully.`;
  }
}