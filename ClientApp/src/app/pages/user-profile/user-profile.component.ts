import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DOCUMENT } from '@angular/common';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string;
  user: any;
  repos: any[];
  displayModal = false;
  style: any;
  notes: string;

  private backdrop: HTMLElement;
  constructor(private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private userService: UserService,
    private favouriteService: FavouriteService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user || {};
    });
    this.userService.getRepos(this.userId).subscribe(repos => {
      this.repos = repos;
    });
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

  saveFavourite() {
    this.favouriteService.saveFavourite({ userId: this.userId, notes: this.notes }).subscribe(response => {
      this.hide();
    });
  }
}

