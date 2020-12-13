export var adminLteConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    {label: 'MENU', separator: true},
    {label: 'Painel de Controle', route: '/', iconClasses: 'fa fa-dashboard'},
    {label: 'Perfil', route: 'perfil', iconClasses: 'fa fa-user-circle'},
    {label: 'SERVIÇOS', separator: true},
    {label: 'Portfólio', route: 'servicos/portfolio', iconClasses: 'fa fa-address-book-o'},
    {label: 'Promoter', route: 'servicos/promoter', iconClasses: 'fa fa-money'},
    //{label: 'Folder/Flyer', route: 'servicos/flyer', iconClasses: 'fa fa-files-o'},
    //{label: 'Cartão Visitas', route: 'servicos/cartao', iconClasses: 'fa fa-id-card-o'},
    {label: 'Vídeos', route: 'servicos/video', iconClasses: 'fa fa-caret-square-o-right'},
    {label: 'FINANCEIRO', separator: true},
    {label: 'Mensalidade', route: 'financeiro/mensalidade', iconClasses: 'fa fa-shopping-cart'},
    {label: 'Conta', route: 'financeiro/conta', iconClasses: 'fa fa-bank'},
    {label: 'CORRESPONDÊNCIA', separator: true},
    {label: 'Mensagens', route: 'correspondencia/mensagem', iconClasses: 'fa fa-envelope-o', pullRights: [{text: '4', classes: 'label pull-right bg-green'}]},
    {label: 'Recados', route: 'correspondencia/recado', iconClasses: 'fa fa-paper-plane-o', pullRights: [{text: '9', classes: 'label pull-right bg-yellow'}]},
    {label: 'Avisos', route: 'correspondencia/aviso', iconClasses: 'fa fa-bell-o', pullRights: [{text: '10', classes: 'label pull-right bg-red'}]}
  ]
};