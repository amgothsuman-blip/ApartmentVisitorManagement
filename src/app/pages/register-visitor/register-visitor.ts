import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-register-visitor',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-visitor.html',
  styleUrl: './register-visitor.css'
})
export class RegisterVisitor {
  visitor = {
    name: '',
    phone: '',
    apartment: '',
    purpose: '',
    date: new Date().toISOString().slice(0, 10)
  };

  message = '';
  error = '';

  constructor(
    private visitorService: VisitorService,
    private router: Router
  ) {}

  submitForm(): void {
    this.message = '';
    this.error = '';

    const name = this.visitor.name.trim();
    const phone = this.visitor.phone.trim();
    const apartment = this.visitor.apartment.trim();
    const purpose = this.visitor.purpose.trim();

    if (!name || !phone || !apartment || !purpose || !this.visitor.date) {
      this.error = 'Please complete all required fields.';
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      this.error = 'Enter a valid 10-digit phone number.';
      return;
    }

    this.visitorService.addVisitor({
      name,
      phone,
      apartment,
      purpose,
      date: this.visitor.date
    });

    this.message = 'Visitor registered successfully!';

    setTimeout(() => {
      this.router.navigate(['/visitor-list']);
    }, 700);
  }
}