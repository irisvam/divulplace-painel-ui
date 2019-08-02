export var adminLteConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    {label: 'MENU', separator: true},
    {label: 'Início', route: '/', iconClasses: 'fa fa-home'},
    {label: 'Painel de Controle', route: 'painel', iconClasses: 'fa fa-dashboard'},
    {label: 'Perfil', route: 'perfil', iconClasses: 'fa fa-user-circle'},
    {label: 'SERVIÇOS', separator: true},
    {label: 'Portfólio', route: 'servicos/portfolio', iconClasses: 'fa fa-address-book-o'},
    {label: 'Folder/Flyer', route: 'servicos/flyer', iconClasses: 'fa fa-files-o'},
    {label: 'Cartão Visitas', route: 'servicos/cartao', iconClasses: 'fa fa-id-card-o'},
    {label: 'Vídeos', route: 'servicos/video', iconClasses: 'fa fa-caret-square-o-right'},
    {label: 'FINANCEIRO', separator: true},
    {label: 'Mensalidade', route: '/', iconClasses: 'fa fa-shopping-cart'},
    {label: 'Promoter', route: '/', iconClasses: 'fa fa-money'},
    {label: 'Conta', route: '/', iconClasses: 'fa fa-bank'},
    {label: 'CORRESPONDÊNCIA', separator: true},
    {label: 'Mensagens', route: '/', iconClasses: 'fa fa-envelope-o', pullRights: [{text: '4', classes: 'label pull-right bg-green'}]},
    {label: 'Recados', route: '/', iconClasses: 'fa fa-paper-plane-o', pullRights: [{text: '9', classes: 'label pull-right bg-yellow'}]},
    {label: 'Avisos', route: '/', iconClasses: 'fa fa-bell-o', pullRights: [{text: '10', classes: 'label pull-right bg-red'}]}
  ]
};