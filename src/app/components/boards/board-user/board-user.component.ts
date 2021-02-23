import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/_services/board.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
