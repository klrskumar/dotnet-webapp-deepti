import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: any[];
  users: any[];
  favouriteUsers: any[];
  notes: string;
  style: any;
  selectedFavourite: any;
  private backdrop: HTMLElement;

  constructor(private favouriteService: FavouriteService,
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.favouriteService.getFavourites().subscribe(favourites => {
        this.favourites = favourites || [];
        this.favouriteUsers = [];
        if (this.favourites && this.favourites.length > 0) {
          this.favourites.forEach(fu => {
            const user = this.users.find(x => x.login === fu.userId);
            user.notes = fu.notes;
            this.favouriteUsers.push(user);
          });
        }
      });
    });
  }
  editFavourite(favourite) {
    this.notes = favourite.notes;
    this.selectedFavourite = favourite;
    this.show();

    return false;
  }

  updateFavourite() {
    this.favouriteService
      .updateFavourite({ userId: this.selectedFavourite.login, notes: this.notes }, this.selectedFavourite.login)
      .subscribe(result => {
        if (result) {
          this.getUsers();
          this.hide();
        }
      });
  }
  deleteFavourite(favourite) {
    this.favouriteService.deleteFavourite(favourite.login).subscribe(result => {
      if (result) {
        alert('Deleted successfully...');
      }
    }, error => {
      console.log(error);
    });
    return false;
  }

  show() {
    this.document.body.classList.add('modal-open');
    this.style = { 'display': 'block' };
    this.showBackdrop();
  }

  hide() {
    this.document.body.classList.remove('modal-open');
    this.style = { 'display': 'none' };
    this.hideBackdrop();
  }

  showBackdrop() {
    this.backdrop = this.document.createElement('div');
    this.backdrop.classList.add('modal-backdrop');
    this.backdrop.classList.add('show');
    this.document.body.appendChild(this.backdrop);
  }

  hideBackdrop() {
    this.backdrop.remove();
  }

}
