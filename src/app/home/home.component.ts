import { Component, OnInit } from '@angular/core';

import { Novidade } from '../dashboard/service/model/novidade';

import { NewsService } from '../dashboard/service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  novidades: Novidade[];

  constructor(private newService: NewsService) { }

  ngOnInit() {

    this.newService.listar().subscribe(retorno => { 
      this.novidades = retorno;
    });
  }
}
