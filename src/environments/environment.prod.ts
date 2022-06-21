export const environment = {
  production: true,

  base_java: 'http://192.168.0.127:8080',
  base_python: 'http://192.168.0.127:5000',

  api_usuario_autenticar: '/api/usuario/autenticar',

  api_empresa_listar: '/api/empresa/listar',
  api_empresa_listar_todos: '/api/empresa/listar-todos',
  api_empresa_salvar: '/api/empresa/salvar',
  api_empresa_alterar: '/api/empresa/alterar',
  api_empresa_remover: '/api/empresa/remover',
  api_empresa_buscar_por_id: '/api/empresa/buscar-por-id',

  api_cliente_listar: '/api/cliente/listar',
  api_cliente_listar_todos: '/api/cliente/listar-todos',
  api_cliente_salvar: '/api/cliente/salvar',
  api_cliente_alterar: '/api/cliente/alterar',
  api_cliente_remover: '/api/cliente/remover',
  api_cliente_buscar_por_id: '/api/cliente/buscar-por-id',

  api_configuracao_listar: '/api/configuracao_empresa/listar',
  api_configuracao_salvar: '/api/configuracao_empresa/salvar',
  api_configuracao_alterar: '/api/configuracao_empresa/alterar',
  api_configuracao_remover: '/api/configuracao_empresa/remover',

  api_sistema_listar: '/api/sistema/listar',
  api_sistema_salvar: '/api/sistema/salvar',
  api_sistema_alterar: '/api/sistema/alterar',
  api_sistema_remover: '/api/sistema/remover',

  api_download_comp_cliente: '/api/download-comp-cliente/',
  api_download_comp_empresa: '/api/download-comp-empresa/',

  // PYTHON FLASK
  api_historico_listar: '/api/historico/',
  api_agendar_bot: '/api/agendar/',
  api_status: '/api/status/',

  auth_api: '/security/auth/',

};
