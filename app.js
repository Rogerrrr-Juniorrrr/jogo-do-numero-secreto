let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial (){
    exibirTextoNaTela ('h1', 'Jogo do número secreto');
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e 10');
    

}
exibirMensagemInicial()


function verificarChute() {
    chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {

        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}.`;

        exibirTextoNaTela ('h1', 'Você Acertou!');
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else 
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p', 'O número é menor');
        } else {
            exibirTextoNaTela ('p', 'O número é maior');
    }
    tentativas++;
    limparCampo ();
}

function limparCampo (){
    chute = document.querySelector ('input');
    chute.value = '';
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt (Math.random () * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length //length: sempre retorna a quantidade de 
    // elementos que temos na lista.


    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){  //includes: verifica se o elemento está na lista
        return gerarNumeroAleatorio();
        } else {
            listaDeNumerosSorteados.push(numeroEscolhido); //push: adiciona item ao final da lista
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
        }
    
}

function reiniciarJogo (){
    numeroSecreto = gerarNumeroAleatorio ();
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}