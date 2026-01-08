// Base de datos simple de tarjetas gráficas
// Cada GPU tiene un ID único para poder enlazarla con otras páginas

const gpuData = [
    {
        id: 1,
        name: "NVIDIA GeForce RTX 4090",
        brand: "NVIDIA",
        vram: "24 GB GDDR6X",
        tdp: 450,
        price: 1999,
        year: 2022,
        image: "img/nvidia/rtx4090.jpg",
        performance: 100, // 100 = referencia máxima
        description: "La GPU más potente del mercado, ideal para 4K y creación de contenido.",
        fps: {
            "1080p": 240,
            "1440p": 200,
            "4K": 160
        }
    },

    {
        id: 2,
        name: "AMD Radeon RX 7900 XTX",
        brand: "AMD",
        vram: "24 GB GDDR6",
        tdp: 355,
        price: 999,
        year: 2022,
        image: "img/amd/rx7900xtx.jpg",
        performance: 90,
        description: "Excelente rendimiento en 4K con un precio más competitivo.",
        fps: {
            "1080p": 220,
            "1440p": 180,
            "4K": 140
        }
    },

    {
        id: 3,
        name: "NVIDIA GeForce RTX 3060",
        brand: "NVIDIA",
        vram: "12 GB GDDR6",
        tdp: 170,
        price: 329,
        year: 2021,
        image: "img/nvidia/rtx3060.jpg",
        performance: 55,
        description: "La favorita para jugar en 1080p con buena relación calidad/precio.",
        fps: {
            "1080p": 120,
            "1440p": 80,
            "4K": 45
        }
    },

    {
        id: 4,
        name: "AMD Radeon RX 6600",
        brand: "AMD",
        vram: "8 GB GDDR6",
        tdp: 132,
        price: 249,
        year: 2021,
        image: "img/amd/rx6600.jpg",
        performance: 50,
        description: "Una GPU económica ideal para 1080p.",
        fps: {
            "1080p": 110,
            "1440p": 70,
            "4K": 40
        }
    },

    {
        id: 5,
        name: "Intel Arc A770",
        brand: "Intel",
        vram: "16 GB GDDR6",
        tdp: 225,
        price: 349,
        year: 2022,
        image: "img/intel/a770.jpg",
        performance: 60,
        description: "La mejor GPU de Intel actualmente, buen rendimiento en DX12.",
        fps: {
            "1080p": 115,
            "1440p": 85,
            "4K": 50
        }
    }
];

// Función para obtener una GPU por ID
function getGpuById(id) {
    return gpuData.find(gpu => gpu.id === Number(id));
}
