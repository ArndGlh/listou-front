import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/_services/board.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
