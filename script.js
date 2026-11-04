// ==========================================================================
// ARQUIVO JAVASCRIPT PRINCIPAL
// Funções simples, comentadas em português brasileiro e com responsabilidade única.
// Material didático para estudo e apresentação do portfólio.
// ==========================================================================

// O evento 'DOMContentLoaded' aguarda a árvore do documento HTML ser completamente
// carregada pelo navegador antes de executar o código. Isso garante que todos os
// elementos selecionados via document.querySelector já existam na página.
document.addEventListener('DOMContentLoaded', () => {
  // console.log() registra mensagens no console de desenvolvedor (F12 no navegador),
  // útil para confirmar que o script começou a rodar sem erros.
  console.log('Portfólio carregado!');

  // const declara uma constante: uma variável cuja referência não pode ser reatribuída.
  // document.querySelector() busca o primeiro elemento HTML que corresponde ao seletor CSS informado.
  const botaoTema = document.querySelector('#botao-tema');

  // Operador ternário (condição ? se_verdadeiro : se_falso):
  // Verifica se botaoTema foi encontrado; se sim, busca o elemento <i> (ícone) dentro dele;
  // senão, guarda null para evitar erros caso o botão não exista na página.
  const iconeTema = botaoTema ? botaoTema.querySelector('i') : null;

  // function define uma função reutilizável com um objetivo específico.
  // estaModoClaro é um parâmetro booleano (true ou false) recebido pela função.
  function atualizarIconeTema(estaModoClaro) {
    // Guarda de segurança (early return): se o ícone não existir, sai da função imediatamente
    // com return para não executar as linhas seguintes e evitar erros no console.
    if (!iconeTema) return;

    // Estrutura condicional if / else:
    // Se estaModoClaro for verdadeiro (true), remove a classe da lua e adiciona a do sol.
    // Senão (false), remove o sol e volta para o ícone de lua (modo escuro padrão).
    if (estaModoClaro) {
      // classList permite manipular as classes CSS do elemento (remove e add)
      iconeTema.classList.remove('fa-moon');
      iconeTema.classList.add('fa-sun');
    } else {
      iconeTema.classList.remove('fa-sun');
      iconeTema.classList.add('fa-moon');
    }
  }

  // Função responsável por alternar entre o modo escuro (padrão) e o modo claro
  function alternarTema() {
    // classList.toggle() adiciona a classe se ela não existir e a remove se já existir.
    // A classe 'modo-claro' no <body> ativa as variáveis de cores claras definidas no style.css.
    document.body.classList.toggle('modo-claro');

    // classList.contains() verifica se a classe 'modo-claro' está presente no <body>
    // e retorna true (se estiver ativa) ou false (se foi removida).
    const estaModoClaro = document.body.classList.contains('modo-claro');

    // Chama a função passando o booleano para trocar o ícone do botão
    atualizarIconeTema(estaModoClaro);

    // console.log() registra no console qual tema o visitante ativou
    if (estaModoClaro) {
      console.log('Tema alterado para claro!');
    } else {
      console.log('Tema alterado para escuro!');
    }
  }

  // addEventListener() associa um evento a um elemento.
  // Aqui, ao clicar ('click') no botaoTema, a função alternarTema é executada.
  if (botaoTema) {
    botaoTema.addEventListener('click', alternarTema);
  }

  // Seleção dos elementos do cabeçalho para navegação responsiva e acessível:
  // botaoMenu é o botão hambúrguer (três barras) visível em telas móveis;
  // navegacao é o elemento <nav> que contém a lista de links do menu;
  // iconeMenu é o elemento <i> de ícone dentro do botão hambúrguer;
  // linksMenu usa document.querySelectorAll() para obter uma NodeList com todos os links do menu.
  const botaoMenu = document.querySelector('#botao-menu');
  const navegacao = document.querySelector('#navegacao-principal');
  const iconeMenu = botaoMenu ? botaoMenu.querySelector('i') : null;
  const linksMenu = document.querySelectorAll('.link-menu');

  // Atualiza os atributos de acessibilidade (ARIA) e o ícone visual do botão hambúrguer.
  // Parâmetro: aberto (booleano true se o menu estiver visível, false se estiver fechado).
  function atualizarBotaoMenu(aberto) {
    // setAttribute() altera o valor de um atributo HTML.
    // aria-expanded avisa leitores de tela se o conteúdo controlado pelo botão está aberto ou fechado.
    botaoMenu.setAttribute('aria-expanded', String(aberto));

    // aria-label fornece um texto descritivo claro em português para leitores de tela
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');

    // O segundo argumento de classList.toggle(classe, forçar) adiciona a classe se o booleano
    // for true e a remove se for false. Isso troca entre o ícone fa-bars e fa-xmark (X).
    iconeMenu.classList.toggle('fa-bars', !aberto);
    iconeMenu.classList.toggle('fa-xmark', aberto);
  }

  // Função de responsabilidade única: recolhe o menu móvel
  function fecharMenu() {
    // Remove a classe 'menu-aberto' que torna o menu visível no CSS
    navegacao.classList.remove('menu-aberto');
    // Sincroniza o ícone e atributos do botão para o estado fechado
    atualizarBotaoMenu(false);
  }

  // Alterna o estado do menu entre aberto e fechado ao clicar no botão hambúrguer
  function alternarMenu() {
    // toggle() retorna true se a classe foi adicionada (menu abriu) ou false se foi removida (menu fechou)
    const aberto = navegacao.classList.toggle('menu-aberto');
    atualizarBotaoMenu(aberto);

    // Registra no console o estado do menu para acompanhamento da navegação
    if (aberto) {
      console.log('Menu aberto!');
    } else {
      console.log('Menu fechado!');
    }
  }

  // Destaca visualmente o link correspondente à seção atual na página
  function atualizarSecaoAtiva() {
    // window.location.hash obtém o identificador da âncora na URL (ex: '#projetos').
    // O operador lógico OU (||) define '#inicio' como valor padrão caso não haja hash na URL.
    const secaoAtual = window.location.hash || '#inicio';

    // forEach percorre cada link da lista linksMenu.
    // toggle('ativo', condição) adiciona a classe .ativo apenas se o href coincidir com a seção atual.
    linksMenu.forEach(link => {
      link.classList.toggle('ativo', link.getAttribute('href') === secaoAtual);
    });
  }

  // Checagem defensiva: registra os ouvintes de eventos somente se todos os elementos existirem
  if (botaoMenu && navegacao && iconeMenu) {
    // Clique no botão hambúrguer abre ou fecha o menu móvel
    botaoMenu.addEventListener('click', alternarMenu);

    // forEach adiciona ouvinte de clique em cada um dos links do menu.
    // Ao clicar em uma opção, exibe no console a seção acessada e fecha o menu no celular.
    linksMenu.forEach(link => {
      link.addEventListener('click', () => {
        // textContent obtém o texto do link e .trim() remove espaços extras
        console.log('Seção acessada:', link.textContent.trim());
        fecharMenu();
      });
    });

    // Fecha o menu móvel se o visitante clicar em qualquer área fora do menu e do botão
    document.addEventListener('click', evento => {
      // .contains() verifica se o alvo do clique (evento.target) está dentro do elemento
      if (!navegacao.contains(evento.target) && !botaoMenu.contains(evento.target)) {
        fecharMenu();
      }
    });

    // Fecha o menu móvel ao pressionar a tecla Escape (Esc) do teclado, melhorando a acessibilidade
    document.addEventListener('keydown', evento => {
      if (evento.key === 'Escape') fecharMenu();
    });

    // Se o usuário redimensionar a janela do navegador para largura de computador (> 768px),
    // fecha automaticamente o menu móvel para manter o layout limpo
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) fecharMenu();
    });

    // O evento 'hashchange' dispara sempre que a âncora da URL muda (navegação por âncoras)
    window.addEventListener('hashchange', atualizarSecaoAtiva);

    // Executa a função imediatamente ao carregar a página para marcar o link inicial ativo
    atualizarSecaoAtiva();
  }

  // ==========================================================================
  // OUTROS LINKS — REGISTRO DE CLIQUES NO CONSOLE
  // Esses links já funcionam pelo HTML. Os eventos abaixo apenas registram os cliques.
  // ==========================================================================
  const linkMonograma = document.querySelector('.link-monograma');
  const linkVerProjetos = document.querySelector('.botao-primario');
  const linkEmail = document.querySelector('.link-contato');
  const linkVoltarTopo = document.querySelector('.link-topo');

  // Ao clicar no monograma DM, registra o acesso à seção Início.
  if (linkMonograma) {
    linkMonograma.addEventListener('click', () => {
      console.log('Monograma DM clicado: ir para Início.');
    });
  }

  // Ao clicar em Ver projetos, registra o acesso à seção Projetos.
  if (linkVerProjetos) {
    linkVerProjetos.addEventListener('click', () => {
      console.log('Botão Ver projetos clicado: ir para Projetos.');
    });
  }

  // O link mailto: tenta abrir o aplicativo de e-mail; o evento registra apenas o clique.
  if (linkEmail) {
    linkEmail.addEventListener('click', () => {
      console.log('Link de e-mail clicado.');
    });
  }

  // Ao clicar em Voltar ao topo, registra o retorno à seção Início.
  if (linkVoltarTopo) {
    linkVoltarTopo.addEventListener('click', () => {
      console.log('Botão Voltar ao topo clicado: ir para Início.');
    });
  }

  // ==========================================================================
  // PROJETOS — ARRAY, OBJETOS, FOR...OF E INNERHTML
  // Conteúdos praticados na aula: organização de dados e renderização dinâmica
  // ==========================================================================

  // Um ARRAY é uma lista ordenada de valores, delimitada por colchetes [].
  // Cada item deste array é um OBJETO JavaScript, delimitado por chaves {}.
  // O objeto agrupa informações relacionadas em pares chave: valor (propriedades).
  // A propriedade 'tecnologias' é outro array interno contendo uma lista de strings.
  const projetos = [
    {
      nome: 'Café Rubro',
      descricao: 'Proposta de site para uma cafeteria, com apresentação da marca, cardápio resumido, horários e contato.',
      imagem: 'img/01_Cafe_Rubro.png',
      tecnologias: ['HTML', 'CSS', 'JavaScript']
    },
    {
      nome: 'Nox Studio',
      descricao: 'Proposta de portfólio para um estúdio criativo, com apresentação de serviços e galeria de trabalhos.',
      imagem: 'img/02_Nox_Studio.png',
      tecnologias: ['HTML', 'CSS', 'JavaScript']
    },
    {
      nome: 'TaskFlow',
      descricao: 'Ideia de organizador de tarefas com funções planejadas de adicionar, concluir e filtrar atividades.',
      imagem: 'img/03_TaskFlow.png',
      tecnologias: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  // Função que percorre a lista de projetos e gera dinamicamente os cards na página.
  // Parâmetro: lista (espera receber um array de objetos de projetos).
  //
  // POR QUE OS CARDS ORIGINAIS PERMANECEM NO HTML?
  // Os cards escritos no index.html funcionam como reserva estática (fallback).
  // Se o visitante desativar o JavaScript ou se houver falha de rede ao baixar o script,
  // os projetos continuam visíveis na página. Quando o JavaScript roda com sucesso,
  // a atribuição final a innerHTML substitui esses cards de reserva pelos gerados aqui.
  function montarProjetos(lista) {
    // Seleciona a div container onde os cards serão inseridos
    const gradeProjetos = document.querySelector('#lista-projetos');
    // Se o elemento não existir na página, o return encerra a função com segurança
    if (!gradeProjetos) return;

    // let declara uma variável que pode ter seu valor reatribuído.
    // html começa como uma string vazia e vai acumulando a marcação de cada projeto.
    let html = '';

    // O laço for...of percorre diretamente cada elemento de um array.
    // A cada volta da repetição, a constante "projeto" recebe um dos objetos do array.
    for (const projeto of lista) {
      let etiquetas = '';

      // Segundo for...of: percorre o array interno de tecnologias do projeto atual
      // e monta uma tag <span> para cada tecnologia prevista.
      for (const tecnologia of projeto.tecnologias) {
        etiquetas = etiquetas + `<span class="tag-tecnologia">${tecnologia}</span>`;
      }

      // Concatenação com template literals (crases ``):
      // Permite interpolar variáveis diretamente no texto HTML usando a sintaxe ${variável}.
      // Mantém exatamente a mesma estrutura semântica e classes dos cards de reserva do HTML.
      html = html + `
        <article class="cartao-projeto">
          <div class="moldura-imagem-projeto">
            <img src="${projeto.imagem}" alt="Capa conceitual do projeto ${projeto.nome}" class="imagem-projeto">
          </div>
          <div class="info-projeto">
            <h3 class="nome-projeto">${projeto.nome}</h3>
            <p class="descricao-projeto">${projeto.descricao}</p>
            <div class="tecnologias-projeto">${etiquetas}</div>
          </div>
        </article>`;

      // console.log() exibe no console o nome de cada projeto processado no laço
      console.log('Projeto preparado:', projeto.nome);
    }

    // innerHTML substitui o conteúdo interno do elemento #lista-projetos pela string acumulada,
    // transformando o texto em elementos HTML reais na página do navegador.
    gradeProjetos.innerHTML = html;

    // console.log() informa a quantidade total de projetos exibidos usando a propriedade .length do array
    console.log('Projetos exibidos:', lista.length);
  }

  // Executa a função passando o array "projetos" como argumento para construir os cartões na tela
  montarProjetos(projetos);

  // ==========================================================================
  // FORMULÁRIO DE CONTATO: VALIDAÇÃO, EVENTO SUBMIT E CONSOLE
  // Exercício da Aula 4: validação em JavaScript puro sem envio real de backend
  // ==========================================================================

  // Seleção dos elementos do formulário e do elemento de aviso na página:
  // const cria referências fixas para cada campo de entrada e para o formulário.
  const formulario = document.querySelector('#form-contato');
  const campoNome = document.querySelector('#nome');
  const campoEmail = document.querySelector('#email');
  const campoAssunto = document.querySelector('#assunto');
  const campoMensagem = document.querySelector('#mensagem');
  const aviso = document.querySelector('#aviso');

  // FUNÇÕES DE VALIDAÇÃO: cada função tem responsabilidade única de validar um único campo.
  // Padrão adotado:
  // - Se houver erro, a função executa return com uma string contendo a mensagem de erro;
  // - Se o campo estiver correto, executa return com string vazia (''), indicando ausência de erros.

  // Valida o campo Nome.
  // Parâmetro: nome (string contendo o texto digitado pelo usuário).
  function validarNome(nome) {
    if (nome === '') {
      return 'Digite seu nome.';
    } else if (nome.length < 3) {
      // .length retorna a quantidade de caracteres da string
      return 'O nome precisa ter pelo menos 3 letras.';
    } else {
      return '';
    }
  }

  // Valida o campo E-mail.
  // Parâmetro: email (string contendo o e-mail digitado).
  function validarEmail(email) {
    if (email === '') {
      return 'Digite o seu E-mail.';
    } else if (email.includes('@') === false || email.includes('.') === false) {
      // .includes() verifica se uma substring existe dentro da string.
      // O operador || verifica se falta o @ ou o ponto.
      // Essa validação básica não verifica a posição desses caracteres.
      return 'Insira um e-mail válido.';
    } else {
      return '';
    }
  }

  // Valida o campo Assunto (<select>).
  // Parâmetro: assunto (string com o valor da <option> selecionada).
  function validarAssunto(assunto) {
    if (assunto === '') {
      // Se a opção selecionada tiver value="", o usuário ainda não escolheu um assunto válido
      return 'Escolha um assunto.';
    } else {
      return '';
    }
  }

  // Valida o campo Mensagem (<textarea>).
  // Parâmetro: mensagem (string com o texto da mensagem).
  function validarMensagem(mensagem) {
    if (mensagem === '') {
      return 'Escreva a sua mensagem.';
    } else if (mensagem.length < 10) {
      // Exige pelo menos 10 caracteres para evitar mensagens muito curtas ou sem conteúdo
      return 'A mensagem precisa ter pelo menos 10 letras.';
    } else {
      return '';
    }
  }

  // Exibe a mensagem de feedback visual abaixo do formulário.
  // Parâmetros:
  // - texto: a frase que será exibida para o usuário;
  // - tipo: a classe CSS que define a cor ('erro' para vermelho ou 'certo' para verde).
  function mostrarAviso(texto, tipo) {
    // textContent atualiza o texto de forma segura, sem interpretar código HTML
    aviso.textContent = texto;

    // Limpa classes anteriores para não misturar estilo de erro com estilo de sucesso
    aviso.classList.remove('erro');
    aviso.classList.remove('certo');

    // Adiciona a classe correspondente ao resultado da validação
    aviso.classList.add(tipo);

    // Registra no console apenas se for erro, facilitando a depuração durante o teste
    if (tipo === 'erro') {
      console.log('Erro no formulário:', texto);
    }
  }

  // Função disparada no momento da submissão do formulário.
  // Parâmetro: evento (o objeto de evento gerado pelo navegador no disparo do submit).
  function enviarMensagem(evento) {
    // evento.preventDefault() impede o comportamento padrão do navegador,
    // que seria recarregar a página e tentar enviar os dados para um servidor.
    evento.preventDefault();

    // .value captura o valor atual de cada campo.
    // .trim() remove espaços em branco extras do início e do fim da string digitada.
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const assunto = campoAssunto.value.trim();
    const mensagem = campoMensagem.value.trim();

    // Executa as quatro funções de validação e armazena os eventuais erros em constantes
    const erroNome = validarNome(nome);
    const erroEmail = validarEmail(email);
    const erroAssunto = validarAssunto(assunto);
    const erroMensagem = validarMensagem(mensagem);

    // Estrutura condicional em cascata (if / else if / else):
    // Analisa os resultados das validações na ordem dos campos.
    // Se houver erros, exibe somente a mensagem do primeiro campo inválido.
    if (erroNome !== '') {
      mostrarAviso(erroNome, 'erro');
    } else if (erroEmail !== '') {
      mostrarAviso(erroEmail, 'erro');
    } else if (erroAssunto !== '') {
      mostrarAviso(erroAssunto, 'erro');
    } else if (erroMensagem !== '') {
      mostrarAviso(erroMensagem, 'erro');
    } else {
      // Bloco else: executado SOMENTE quando todas as validações passam (nenhum erro retornado).
      // Simulação da atividade de aula: cria um objeto com os quatro dados e exibe no console (F12)
      console.log('Dados do formulário:', { nome, email, assunto, mensagem });

      // Exibe mensagem de confirmação amigável e personalizada com estilo verde de sucesso
      mostrarAviso(`Mensagem Enviada! Obrigado ${nome}.`, 'certo');
    }
  }

  // addEventListener('submit', ...) conecta o evento de envio do formulário à função enviarMensagem.
  // O evento dispara tanto ao clicar no botão 'Enviar mensagem' quanto ao pressionar Enter em um campo.
  if (formulario) {
    formulario.addEventListener('submit', enviarMensagem);
  }
});
