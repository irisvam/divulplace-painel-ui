import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/_helpers/auth.guard';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Início',
    description: 'Bem Vindo!'
  }, children: [{
    path: '',
    loadChildren: () => import('./painel/painel.module').then(m => m.PainelModule), canActivate: [AuthGuard]
  }, {
    path: 'painel',
    loadChildren: () => import('./painel/painel.module').then(m => m.PainelModule),
    data: {
      title: 'Painel de Controle',
      description: 'Encontre o que procure aqui!'
    }
  }, {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule),
    data: {
      title: 'Perfil',
      description: 'Atualize suas informações pessoais!'
    }
  }, {
    path: 'servicos',
    data: {
      title: 'Serviços',
    },
    children: [
      {
        path: 'portfolio',
        loadChildren: () => import('./servicos/portfolio/portfolio.module').then(m => m.PortfolioModule),
        data: {
          title: 'Portfólio',
          description: 'Divulgui-se!'
        }
      }, {
        path: 'flyer',
        loadChildren: () => import('./servicos/flyer/flyer.module').then(m => m.FlyerModule),
        data: {
          title: 'Folder/Flyer',
          description: 'Panfletos para espalhar seu negócio!'
        }
      }, {
        path: 'cartao',
        loadChildren: () => import('./servicos/cartao/cartao.module').then(m => m.CartaoModule),
        data: {
          title: 'Cartão de Visitas',
          description: 'Seja mais profissional com sua apresentação!'
        }
      }, {
        path: 'video',
        loadChildren:  () => import('./servicos/video/video.module').then(m => m.VideoModule),
        data: {
          title: 'Vídeos',
          description: 'Conhecimento disponível!'
        }
      }
    ]
  }, {
    path: 'financeiro',
    data: {
      title: 'Financeiro',
    },
    children: [
      {
        path: 'mensalidade',
        loadChildren: () => import('./financeiro/mensalidade/mensalidade.module').then(m => m.MensalidadeModule),
        data: {
          title: 'Mensalidade',
          description: 'Fique em dia para não ficar de fora!'
        }
      }, {
        path: 'promoter',
        loadChildren: () => import('./financeiro/promoter/promoter.module').then(m => m.PromoterModule),
        data: {
          title: 'Promoter',
          description: 'Monitore os seus rendimentos!'
        }
      }, {
        path: 'conta',
        loadChildren: () => import('./financeiro/conta/conta.module').then(m => m.ContaModule),
        data: {
          title: 'Contas Bancárias',
          description: 'Cadastre suas contas para recebimentos!'
        }
      }
    ]
  }, {
    path: 'correspondencia',
    data: {
      title: 'Correspondência',
    },
    children: [
      {
        path: 'mensagem',
        loadChildren: () => import('./correspondencia/mensagem/mensagem.module').then(m => m.MensagemModule),
        data: {
          title: 'Mensagens',
          description: 'Entre em contato com seus Afiliados!'
        }
      }, {
        path: 'recado',
        loadChildren: () => import('./correspondencia/recado/recado.module').then(m => m.RecadoModule),
        data: {
          title: 'Recados',
          description: 'Recebendo informações dos usuários que viram seu Portfólio!'
        }
      }, {
        path: 'aviso',
        loadChildren: () => import('./correspondencia/aviso/aviso.module').then(m => m.AvisoModule),
        data: {
          title: 'Avisos',
          description: 'Avisos importantes! Fique por dentro das novidades!'
        }
      }
    ]
  }]
}, {
  path: 'login',
  loadChildren: () => import('./login/auth/auth.module').then(m => m.AuthModule),
  data: {
    customLayout: true
  }
}, {
  path: 'register',
  loadChildren: () => import('./login/register/register.module').then(m => m.RegisterModule),
  data: {
    customLayout: true
  }
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
