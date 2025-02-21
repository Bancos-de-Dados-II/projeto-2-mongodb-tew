let map;

// Inicializa o mapa quando a página é carregada
function inicializarMapa() {
    map = L.map('map').setView([-15.7942, -47.8822], 4); // Coordenadas iniciais (Brasil)

    // Adiciona o tile layer ao mapa (camada visual)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);
}

// Adiciona os marcadores dos eventos no mapa
async function adicionarMarcadores() {
    try {
        const response = await fetch(API_URL);
        const eventos = await response.json();

        eventos.forEach(evento => {
            const [lat, lng] = evento.localizacao.coordinates;

            // Adiciona um marcador ao mapa
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`
                    <strong>${evento.titulo}</strong><br>
                    ${evento.descricao}<br>
                    Data: ${new Date(evento.data).toLocaleDateString()}<br>
                    Hora: ${evento.hora}
                `);
        });
    } catch (err) {
        console.error('Erro ao adicionar marcadores:', err);
    }
}

// Função para centralizar o mapa na localização do usuário
function localizacaoAtual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                map.setView([latitude, longitude], 13);

                L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup('Você está aqui!')
                    .openPopup();
            },
            (error) => {
                console.error('Erro ao acessar geolocalização:', error.message);
                alert('Não foi possível acessar sua localização. Certifique-se de que a permissão foi concedida.');
            }
        );
    } else {
        alert('Seu navegador não suporta geolocalização.');
    }
}

// Chama as funções ao carregar a página
window.onload = function () {
    localizacaoAtual();
    inicializarMapa();
    adicionarMarcadores();
};