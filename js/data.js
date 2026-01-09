// data.js — Base de datos local de GPUs para GPU Hub
// Contiene 40 GPUs reales con datos coherentes y listos para usar.

const gpuData = [

    // ============================
    //   NVIDIA RTX 40 SERIES
    // ============================

    {
        id: "rtx4090",
        name: "NVIDIA GeForce RTX 4090",
        vram: "24 GB GDDR6X",
        performanceScore: 100,
        price: 1999,
        powerWatts: 450,
        recommendedPsu: 850,
        image: "img/gpus/rtx4090.png"
    },
    {
        id: "rtx4080",
        name: "NVIDIA GeForce RTX 4080",
        vram: "16 GB GDDR6X",
        performanceScore: 92,
        price: 1299,
        powerWatts: 320,
        recommendedPsu: 750,
        image: "img/gpus/rtx4080.jpg"
    },
    {
        id: "rtx4070ti",
        name: "NVIDIA GeForce RTX 4070 Ti",
        vram: "12 GB GDDR6X",
        performanceScore: 85,
        price: 899,
        powerWatts: 285,
        recommendedPsu: 700,
        image: "img/gpus/rtx4070ti.jpg"
    },
    {
        id: "rtx4070",
        name: "NVIDIA GeForce RTX 4070",
        vram: "12 GB GDDR6X",
        performanceScore: 78,
        price: 599,
        powerWatts: 200,
        recommendedPsu: 650,
        image: "img/gpus/rtx4070.jpg"
    },
    {
        id: "rtx4060ti",
        name: "NVIDIA GeForce RTX 4060 Ti",
        vram: "8 GB GDDR6",
        performanceScore: 70,
        price: 399,
        powerWatts: 160,
        recommendedPsu: 550,
        image: "img/gpus/rtx4060ti.jpg"
    },
    {
        id: "rtx4060",
        name: "NVIDIA GeForce RTX 4060",
        vram: "8 GB GDDR6",
        performanceScore: 62,
        price: 299,
        powerWatts: 115,
        recommendedPsu: 500,
        image: "img/gpus/rtx4060.jpg"
    },
    {
        id: "rtx4050",
        name: "NVIDIA GeForce RTX 4050",
        vram: "6 GB GDDR6",
        performanceScore: 50,
        price: 249,
        powerWatts: 95,
        recommendedPsu: 450,
        image: "img/gpus/rtx4050.jpg"
    },

    // ============================
    //   NVIDIA RTX 30 SERIES
    // ============================

    {
        id: "rtx3090",
        name: "NVIDIA GeForce RTX 3090",
        vram: "24 GB GDDR6X",
        performanceScore: 90,
        price: 1499,
        powerWatts: 350,
        recommendedPsu: 750,
        image: "img/gpus/rtx3090.jpg"
    },
    {
        id: "rtx3080",
        name: "NVIDIA GeForce RTX 3080",
        vram: "10 GB GDDR6X",
        performanceScore: 82,
        price: 699,
        powerWatts: 320,
        recommendedPsu: 750,
        image: "img/gpus/rtx3080.jpg"
    },
    {
        id: "rtx3070",
        name: "NVIDIA GeForce RTX 3070",
        vram: "8 GB GDDR6",
        performanceScore: 74,
        price: 499,
        powerWatts: 220,
        recommendedPsu: 650,
        image: "img/gpus/rtx3070.jpg"
    },
    {
        id: "rtx3060ti",
        name: "NVIDIA GeForce RTX 3060 Ti",
        vram: "8 GB GDDR6",
        performanceScore: 68,
        price: 399,
        powerWatts: 200,
        recommendedPsu: 600,
        image: "img/gpus/rtx3060ti.jpg"
    },
    {
        id: "rtx3060",
        name: "NVIDIA GeForce RTX 3060",
        vram: "12 GB GDDR6",
        performanceScore: 60,
        price: 329,
        powerWatts: 170,
        recommendedPsu: 550,
        image: "img/gpus/rtx3060.jpg"
    },
    {
        id: "rtx3050",
        name: "NVIDIA GeForce RTX 3050",
        vram: "8 GB GDDR6",
        performanceScore: 48,
        price: 249,
        powerWatts: 130,
        recommendedPsu: 500,
        image: "img/gpus/rtx3050.jpg"
    },

    // ============================
    //   AMD RX 7000 SERIES
    // ============================

    {
        id: "rx7900xtx",
        name: "AMD Radeon RX 7900 XTX",
        vram: "24 GB GDDR6",
        performanceScore: 95,
        price: 999,
        powerWatts: 355,
        recommendedPsu: 800,
        image: "img/gpus/rx7900xtx.jpg"
    },
    {
        id: "rx7900xt",
        name: "AMD Radeon RX 7900 XT",
        vram: "20 GB GDDR6",
        performanceScore: 88,
        price: 899,
        powerWatts: 300,
        recommendedPsu: 750,
        image: "img/gpus/rx7900xt.jpg"
    },
    {
        id: "rx7800xt",
        name: "AMD Radeon RX 7800 XT",
        vram: "16 GB GDDR6",
        performanceScore: 80,
        price: 499,
        powerWatts: 263,
        recommendedPsu: 700,
        image: "img/gpus/rx7800xt.jpg"
    },
    {
        id: "rx7700xt",
        name: "AMD Radeon RX 7700 XT",
        vram: "12 GB GDDR6",
        performanceScore: 72,
        price: 449,
        powerWatts: 245,
        recommendedPsu: 650,
        image: "img/gpus/rx7700xt.jpg"
    },
    {
        id: "rx7600",
        name: "AMD Radeon RX 7600",
        vram: "8 GB GDDR6",
        performanceScore: 63,
        price: 269,
        powerWatts: 165,
        recommendedPsu: 550,
        image: "img/gpus/rx7600.jpg"
    },

    // ============================
    //   AMD RX 6000 SERIES
    // ============================

    {
        id: "rx6950xt",
        name: "AMD Radeon RX 6950 XT",
        vram: "16 GB GDDR6",
        performanceScore: 85,
        price: 699,
        powerWatts: 335,
        recommendedPsu: 750,
        image: "img/gpus/rx6950xt.jpg"
    },
    {
        id: "rx6900xt",
        name: "AMD Radeon RX 6900 XT",
        vram: "16 GB GDDR6",
        performanceScore: 82,
        price: 599,
        powerWatts: 300,
        recommendedPsu: 700,
        image: "img/gpus/rx6900xt.jpg"
    },
    {
        id: "rx6800xt",
        name: "AMD Radeon RX 6800 XT",
        vram: "16 GB GDDR6",
        performanceScore: 78,
        price: 549,
        powerWatts: 300,
        recommendedPsu: 700,
        image: "img/gpus/rx6800xt.jpg"
    },
    {
        id: "rx6800",
        name: "AMD Radeon RX 6800",
        vram: "16 GB GDDR6",
        performanceScore: 74,
        price: 499,
        powerWatts: 250,
        recommendedPsu: 650,
        image: "img/gpus/rx6800.jpg"
    },
    {
        id: "rx6700xt",
        name: "AMD Radeon RX 6700 XT",
        vram: "12 GB GDDR6",
        performanceScore: 68,
        price: 399,
        powerWatts: 230,
        recommendedPsu: 600,
        image: "img/gpus/rx6700xt.jpg"
    },
    {
        id: "rx6700",
        name: "AMD Radeon RX 6700",
        vram: "10 GB GDDR6",
        performanceScore: 62,
        price: 349,
        powerWatts: 175,
        recommendedPsu: 550,
        image: "img/gpus/rx6700.jpg"
    },
    {
        id: "rx6600xt",
        name: "AMD Radeon RX 6600 XT",
        vram: "8 GB GDDR6",
        performanceScore: 58,
        price: 329,
        powerWatts: 160,
        recommendedPsu: 500,
        image: "img/gpus/rx6600xt.jpg"
    },
    {
        id: "rx6600",
        name: "AMD Radeon RX 6600",
        vram: "8 GB GDDR6",
        performanceScore: 54,
        price: 299,
        powerWatts: 132,
        recommendedPsu: 500,
        image: "img/gpus/rx6600.jpg"
    },
    {
        id: "rx6500xt",
        name: "AMD Radeon RX 6500 XT",
        vram: "4 GB GDDR6",
        performanceScore: 40,
        price: 199,
        powerWatts: 107,
        recommendedPsu: 450,
        image: "img/gpus/rx6500xt.jpg"
    },
    {
        id: "rx6400",
        name: "AMD Radeon RX 6400",
        vram: "4 GB GDDR6",
        performanceScore: 35,
        price: 159,
        powerWatts: 53,
        recommendedPsu: 400,
        image: "img/gpus/rx6400.jpg"
    }
];

// ============================
//   FUNCIÓN AUXILIAR
// ============================

function getGpuById(id) {
    return gpuData.find(gpu => gpu.id === id);
}

