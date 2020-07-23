import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users = [];
  constructor(private userSevice: UserService) {}

  ngOnInit() {
    this.userSevice.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
