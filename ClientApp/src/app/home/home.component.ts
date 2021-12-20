import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any[];
  filteredUsers: any[];
  searchText: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users || [];
      this.filteredUsers = users || [];
    });
  }

  searchUsers() {
    const users = this.users.filter(user => user.login.includes(this.searchText));
    this.filteredUsers = users;
  }

  textChange(event) {
    if (event.target.value === '') {
      this.filteredUsers = this.users;
    }
  }
}
