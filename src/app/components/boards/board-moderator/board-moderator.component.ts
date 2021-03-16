import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/_services/board.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content?: string;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    // this.boardService.getModeratorBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }
}
