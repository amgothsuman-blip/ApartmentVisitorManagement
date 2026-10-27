import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-visitor-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './visitor-list.html',
  styleUrl: './visitor-list.css'
})
export class VisitorList implements OnInit {
  visitors: Visitor[] = [];
  searchTerm = '';
  selectedStatus = 'All';
  message = '';

  constructor(private visitorService: VisitorService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.visitors = this.visitorService.getVisitors();
  }

  get filteredVisitors(): Visitor[] {
    const search = this.searchTerm.toLowerCase().trim();

    return this.visitors.filter(visitor => {
      const matchesSearch =
        visitor.name.toLowerCase().includes(search) ||
        visitor.phone.includes(search) ||
        visitor.apartment.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        visitor.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  updateStatus(visitor: Visitor, status: Visitor['status']): void {
    this.visitorService.updateStatus(visitor.id, status);
    this.refresh();
    this.message = `${visitor.name}: status updated to ${status}.`;
  }
}