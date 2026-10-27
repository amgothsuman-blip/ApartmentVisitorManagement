import { Injectable } from '@angular/core';

export interface Visitor {
  id: number;
  name: string;
  phone: string;
  apartment: string;
  purpose: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  entryTime: string;
  exitTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private readonly storageKey = 'apartment_visitors';

  private visitors: Visitor[] = this.loadVisitors();

  private loadVisitors(): Visitor[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) as Visitor[] : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.visitors)
    );
  }

  getVisitors(): Visitor[] {
    return [...this.visitors];
  }

  addVisitor(
    visitor: Omit<Visitor, 'id' | 'status' | 'entryTime' | 'exitTime'>
  ): void {
    const newVisitor: Visitor = {
      ...visitor,
      id: Date.now(),
      status: 'Pending',
      entryTime: '',
      exitTime: ''
    };

    this.visitors = [newVisitor, ...this.visitors];
    this.save();
  }

  updateStatus(id: number, status: Visitor['status']): void {
    this.visitors = this.visitors.map(visitor =>
      visitor.id === id ? { ...visitor, status } : visitor
    );

    this.save();
  }

  recordEntry(id: number): void {
    const time = new Date().toLocaleString();

    this.visitors = this.visitors.map(visitor =>
      visitor.id === id
        ? { ...visitor, entryTime: time, exitTime: '' }
        : visitor
    );

    this.save();
  }

  recordExit(id: number): void {
    const time = new Date().toLocaleString();

    this.visitors = this.visitors.map(visitor =>
      visitor.id === id && visitor.entryTime
        ? { ...visitor, exitTime: time }
        : visitor
    );

    this.save();
  }
}