import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VisitorService, Visitor } from '../../services/visitor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  visitors: Visitor[] = [];

  constructor(private visitorService: VisitorService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.visitors = this.visitorService.getVisitors();
  }

  get stats() {
    return [
      {
        icon: '♙',
        label: 'Total Visitors',
        value: this.visitors.length,
        description: 'Registered visitor records',
        color: 'blue'
      },
      {
        icon: '✓',
        label: 'Approved Visitors',
        value: this.visitors.filter(v => v.status === 'Approved').length,
        description: 'Approved for entry',
        color: 'green'
      },
      {
        icon: '◷',
        label: 'Pending Approval',
        value: this.visitors.filter(v => v.status === 'Pending').length,
        description: 'Awaiting confirmation',
        color: 'orange'
      },
      {
        icon: '↗',
        label: 'Currently Inside',
        value: this.visitors.filter(
          v => v.entryTime !== '' && v.exitTime === ''
        ).length,
        description: 'Not checked out yet',
        color: 'purple'
      }
    ];
  }

  features = [
    {
      icon: '＋',
      title: 'Register Visitor',
      description: 'Register a new guest or visitor.',
      link: '/register-visitor',
      color: 'blue'
    },
    {
      icon: '♙',
      title: 'Visitors List',
      description: 'View registered visitors.',
      link: '/visitor-list',
      color: 'green'
    },
    {
      icon: '⇄',
      title: 'Entry & Exit',
      description: 'Manage visitor check-in and check-out.',
      link: '/entry-exit',
      color: 'orange'
    },
    {
      icon: '▤',
      title: 'Visitor Reports',
      description: 'Explore visitor records and reports.',
      link: '/reports',
      color: 'purple'
    }
  ];
}