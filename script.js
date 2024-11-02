const marketData = [
    {
        type: "Limpeza",
        categories: [
            {
                name: "Sabão em pó",
                items: [
                    { name: "Omo", bought: false },
                    { name: "Ariel", bought: false }
                ]
            },
            {
                name: "Desinfetante",
                items: [
                    { name: "Pinho Sol", bought: false },
                    { name: "Lysoform", bought: false }
                ]
            }
        ]
    },
    {
        type: "Alimentos",
        categories: [
            {
                name: "Laticínios",
                items: [
                    { name: "Leite", bought: false },
                    { name: "Queijo", bought: false }
                ]
            },
            {
                name: "Carnes",
                items: [
                    { name: "Carne Moída", bought: false },
                    { name: "Peito de Frango", bought: false }
                ]
            }
        ]
    }
];

function renderList() {
    const listContainer = document.getElementById('market-list');
    listContainer.innerHTML = '';

    marketData.forEach((type) => {
        type.categories.forEach((category) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');

            const header = document.createElement('div');
            header.classList.add('category-header');
            header.innerHTML = `<h2>${category.name}</h2>
                                <button class="delete" onclick="deleteCategory('${type.type}', '${category.name}')">🗑️</button>`;
            categoryDiv.appendChild(header);

            const itemsList = document.createElement('div');
            itemsList.classList.add('items-list');

            category.items.forEach((item) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                itemDiv.innerHTML = `
                    <span class="item-name">${item.name}</span>
                    <div class="item-actions">
                        <input type="checkbox" ${item.bought ? 'checked' : ''} onclick="toggleBought('${type.type}', '${category.name}', '${item.name}')">
                        <button class="delete" onclick="deleteItem('${type.type}', '${category.name}', '${item.name}')">🗑️</button>
                    </div>
                `;

                itemsList.appendChild(itemDiv);
            });

            categoryDiv.appendChild(itemsList);
            listContainer.appendChild(categoryDiv);
        });
    });
}

function toggleBought(type, category, itemName) {
    marketData.forEach((t) => {
        if (t.type === type) {
            t.categories.forEach((cat) => {
                if (cat.name === category) {
                    cat.items.forEach((item) => {
                        if (item.name === itemName) item.bought = !item.bought;
                    });
                }
            });
        }
    });
    renderList();
}

function deleteCategory(type, category) {
    if (confirm(`Deseja realmente excluir a categoria "${category}" e todos os seus itens?`)) {
        marketData.forEach((t) => {
            if (t.type === type) {
                t.categories = t.categories.filter((cat) => cat.name !== category);
            }
        });
        renderList();
    }
}

function deleteItem(type, category, itemName) {
    if (confirm(`Deseja realmente excluir o item "${itemName}"?`)) {
        marketData.forEach((t) => {
            if (t.type === type) {
                t.categories.forEach((cat) => {
                    if (cat.name === category) {
                        cat.items = cat.items.filter((item) => item.name !== itemName);
                    }
                });
            }
        });
        renderList();
    }
}

function addItem() {
    alert("Função para adicionar novos itens ainda não implementada.");
}

document.addEventListener('DOMContentLoaded', renderList);
