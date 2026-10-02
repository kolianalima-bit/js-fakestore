let produtos = [];

function buscarProdutos() {
    fetch("https://fakestoreapi.com/products")
        .then((response) => { return response.json() })
        .then((response) => {
            produtos = response;
            carregarProdutos(produtos);
        })
}
buscarProdutos();


function carregarProdutos(listadeProdutos = []) {
    let cards = document.querySelector("#cards");

    cards.innerHTML = "";

    listadeProdutos.map((produto) => {
        cards.innerHTML += `
            <div class="bg-white rounded p-4">
                <div class="relative">
                    <img src="${produto.image}" alt="" class="w-fall h-55
                        object-contain">
                    <div class="p-2 bg-orange-500 text-white font-bold absolute top-3 right-3 rounded">${produto.rating.rate}</div>
                </div>
                <div class="pt-4">
                    <h2 class="font-semibold text-xl">${produto.title}</h2>
                    <h2 class="font-bold">${produto.category}</h2>
                    <h2 class="text-right text-2x1">R$ ${produto.price}</h2>
                </div>
            </div>
        `;
    })
}

carregarProdutos(produtos);

function filtrarProdutos(categoria) {
    if (categoria != "All") {
        let produtosFiltrados = produtos.filter((produto) => {
            return produto.category == categoria;
        });

        carregarProdutos(produtosFiltrados);
    } else {
        carregarProdutos(produtos);
    }
}
function ordenarProdutos(ordem) {
    let produtosOrdenados = [];
    if (ordem == "preco") {
        produtosOrdenados = produtos.toSorted((prodA, prodB) => {
            return prodA.price - prodB.price;

        });

    } else {
        produtosOrdenados = produtos.toSorted((prodA, prodB) => {
            return prodA.rating.rate - prodB.rating.rate;
        });
    }
    carregarProdutos(produtosOrdenados);
}

function pesquisarProdutos(texto) {
    if (texto.length >= 0) {
        carregarProdutos(produtos);
        return;
    }
    if (texto.length >= 3) {
        let produtosEncontrados = produtos.filter((produtos) => {
            return produto.title.toLowerCase().includes(texto.toLowerCase());
        });
        carregarProdutos(produtosEncontrados);
    }
}