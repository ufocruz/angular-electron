CREATE TABLE IF NOT EXISTS cliente(
  id_instituicao integer,
  id_cliente integer,
  cod_alfa text,
  nome text);

 CREATE TABLE IF NOT EXISTS setor(
   id_instituicao integer,
   id_setor integer,
   id_cliente integer,
   cod_alfa_setor text,
   flag_purificacao text,
   flag_default_eto text,
   tipo_material text,
   id_tipo_material integer);

CREATE TABLE IF NOT EXISTS produto(
  id_instituicao integer,
  id_produto integer,
  id_produto_marcacao integer,
  keydot text,
  nome text,
  keydot_conjunto text,
  nome_conjunto text,
  id_conjunto integer,
  id_conjunto_item integer,
  produto_marcacao_generico integer);

CREATE TABLE IF NOT EXISTS pro_operacao_entrada(
  id_instituicao integer,
  id_entrada integer primary key,
  id_conjunto integer,
  medico text,
  medico_empresa text,
  motivo_itens_faltantes text,
  id_funcionario integer,
  id_setor integer,
  id_coletor integer,
  situacao text,
  dt_inclusao text,
  dt_atualizacao text);

CREATE TABLE IF NOT EXISTS pro_operacao_entrada_item(
  id_instituicao integer,
  id_entrada integer,
  id_item_entrada integer,
  id_produto_marcacao integer,
  qtd_recebido integer,
  qtd_smp integer,
  metodo_esterilizacao integer,
  empresa text,
  medico text,
  paciente text,
  dt_cirurgia text,
  dt_nasc_paciente text,
  status text,
  dt_inclusao text,
  dt_atualizacao text);
