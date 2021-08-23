# Desafio UP MEDAL para a Gama Academy - Priscila Palma Portes Del Vacchio

Solução criada a partir do minimum boiler template padrão da Vtex IO

Foram utilizados os seguintes recursos:

* Markdown + css para formatação
=> Foi verificado que o site upmedal.com usa a fonte Montserrat e esta foi a fonte escolhida para os estilos. As cores foram adequadas conforme estilo utilizado no site real.

* Flex Layout para formatação dos conteúdos

* Slider layout para mostrar os produtos em destaque -
https://vtex.io/docs/app/vtex.slider-layout

* Algumas imagens foram armazenada em um bucket S3 da AWS.

* A aplicação com os componentes em react também está salva em um repositório do GitHub: https://github.com/agathapristhie/gama-Desafio3-app :

*Foi criado um componente customizado (react + typescript) para falar com suporte no whatsapp, no
rodapé (imagem + link) - vide arquivo whatsappComp.tsx 

*Foi criado um componente para cadastrar leads customizado. Esse item não foi formatado, mas já faz a a chamada para a api gateway e cadastra os dados no banco DynamoDB da AWS

* Chamada para api gateway: https://53ni63zrnj.execute-api.sa-east-1.amazonaws.com/dev 

*Foi utilizado o banco DynamoDB e a função lambda para tornar o cadastro possível.

Vide arquivos: leadForm.tsx e callApi

Nota: Embora na mentoria tenha sido indicado que o texto do add-to-cart button poderia ser modificado, eu criei o componente que consta no arquivo "detailsButton", apenas para ficar mais parecido com o da loja. É um botão sem referência porque ele está dentro do product-summary (ou seja, envolto por um link - ao clicar, ele redirecionará para a PDP)


Função lambda - importa o aws-sdk, cria uma variável dynamodb a partir desta e inclui os dados de nome, e-mail e telefone no banco. A tabela criada foi "tbupmedalform" no DynamoDB

const AWS = require ('aws-sdk')

let dynamodb = new AWS.DynamoDB.DocumentClient();
let date = new Date();
let now = date.toISOString();

exports.handler = async (event) => {
    let id = JSON.stringify(event.id);
    let name = JSON.stringify(event.name);
    let email = JSON.stringify(event.email);
    let phone = JSON.stringify(event.phone);
    let params = {
        TableName: 'tbupmedalform',
        Item: {
            'ID': id,
            'name': name,
            'email': email,
            'phone': phone,
            'time': now
        }
    };
    await dynamodb.put(params).promise();
    const response = {
        statusCode: 200,
        body: name
    };
    return response;
};
