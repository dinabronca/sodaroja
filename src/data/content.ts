// 🎨 ARCHIVO DE CONTENIDO EDITABLE
// Modifica este archivo para cambiar todo el contenido de la web

export const contentData = {
  // ============================================
  // ¿QUÉ ES ESTO?
  // ============================================
  queEsEsto: {
    title: '¿Qué es sodaroja?',
    description: 'Podcast de investigación narrativa que explora ciudades del mundo a través de historias reales. Cada episodio de 60-80 minutos combina investigación profunda con narrativa cinematográfica y producción sonora envolvente. No es un noticiero ni un documental tradicional: es una experiencia auditiva que te transporta a las calles, los rincones ocultos y los eventos que definieron la identidad de cada lugar.',
    estructura: [
      {
        numero: '0',
        emoji: '🎙️',
        titulo: 'Apertura Ritual',
        descripcion: 'No es locución radial ni algo impostado. Es una entrada suave, íntima, como si la charla ya hubiera empezado.',
        detalles: 'Generamos clima, hacemos sentir al oyente que entra a un espacio seguro y marcamos que comienza el viaje.',
        destacado: false
      },
      {
        numero: '1',
        emoji: '🪟',
        titulo: 'Ventana Roja',
        subtitulo: '(Bloque de actualidad)',
        descripcion: 'Este bloque aparece cuando hay algo que el mundo está atravesando y no se puede ignorar.',
        detalles: 'Eventos culturales grandes, fenómenos globales, muertes relevantes, hechos históricos. No es noticiero. Es charla con mirada humana.',
        destacado: true
      },
      {
        numero: '2',
        emoji: '🌍',
        titulo: 'Introducción a la Ciudad',
        descripcion: 'Transición hacia la ciudad elegida. Atmósfera, contexto cultural, sensaciones del lugar.',
        detalles: 'Es abrir la puerta del viaje. Cómo se siente esa ciudad.',
        destacado: false
      },
      {
        numero: '3-5',
        emoji: '🔺',
        titulo: 'Prismas',
        subtitulo: '(Historias de la ciudad)',
        descripcion: 'Dos o tres historias reales de esa ciudad. Crímenes, personajes ocultos, hechos históricos, mitos urbanos.',
        detalles: 'Narración con clima, sin morbo. Deben contrastar o complementarse: otra época, otra energía, otra mirada del lugar. El tercer prisma puede ser un invitado (charla, no entrevista).',
        destacado: false
      },
      {
        numero: '6',
        emoji: '🕯️',
        titulo: 'Susurros del Culto',
        descripcion: 'Recomendaciones: película, serie, libro, disco, lugar, artista.',
        detalles: 'Siempre algo que encaje con la energía del episodio. Tono íntimo, como pasar un secreto.',
        destacado: false
      },
      {
        numero: '7',
        emoji: '📍',
        titulo: 'Rastros del Culto',
        descripcion: 'Fotos que mandó la gente, dónde apareció un sticker, cómo llegó ahí.',
        detalles: 'Construye el mapa físico del culto.',
        destacado: false
      },
      {
        numero: '8',
        emoji: '📜',
        titulo: 'Bitácora de Frecuencia Interna',
        descripcion: 'Lectura de mails y mensajes. La parte más humana.',
        detalles: 'Qué sintieron, dónde escucharon, qué les pasó, si viajaron. Acá se fortalece la comunidad.',
        destacado: true
      },
      {
        numero: '9',
        emoji: '🌙',
        titulo: 'Cierre Suave',
        descripcion: 'No es despedida radial. Es sensación de: seguimos acá, esto no termina, el viaje continúa.',
        detalles: 'Deja al oyente acompañado, no "cerrado".',
        destacado: false
      }
    ]
  },

  // ============================================
  // EL EQUIPO
  // ============================================
  equipo: {
    title: 'El Equipo',
    subtitle: 'Las personas detrás de cada historia',
    imageRecommendations: {
      ratio: '3:4 (vertical)',
      resolution: '600x800px o 900x1200px',
      formats: 'JPG, PNG, WebP',
      maxSize: '5MB'
    }
  },

  // ============================================
  // SHOP
  // ============================================
  shop: {
    title: 'Archivo Interno',
    subtitle: 'Objetos seleccionados del archivo sodaroja'
  },

  // ============================================
  // CONTACTO
  // ============================================
  contacto: {
    email: 'hola@sodaroja.com',
    instagram: '@sodaroja'
  },

  // ============================================
  // FRECUENCIA INTERNA (SUSCRIPCIONES)
  // ============================================
  frecuenciaInterna: {
    title: 'Frecuencia Interna',
    subtitle: 'Unite a la comunidad',
    descripcion: 'Frecuencia Interna es nuestra forma de conectar más profundo con quienes realmente valoran lo que hacemos. Tu apoyo nos permite dedicar más tiempo a investigar, producir mejor, cubrir gastos de edición y equipamiento, y seguir creciendo sin depender de sponsors. A cambio, accedés a contenido exclusivo, sorteos y la tranquilidad de saber que estás siendo parte de algo independiente y honesto.',
    beneficios: [
      '2 episodios extras por mes exclusivos',
      'Acceso a sorteos de merch y productos',
      'Detrás de escena del proceso creativo',
      'Comunidad privada en Discord',
      'Tu nombre en los créditos del podcast'
    ],
    planes: [
      {
        id: 'basico',
        nombre: 'Oyente Comprometido',
        precio: 500,
        precioUSD: 5,
        descripcion: 'Apoyo básico mensual',
        beneficios: ['Acceso a episodios extras', 'Comunidad privada']
      },
      {
        id: 'medio',
        nombre: 'Investigador Nocturno',
        precio: 1000,
        precioUSD: 10,
        descripcion: 'Apoyo intermedio mensual',
        beneficios: ['Todo lo anterior', 'Sorteos exclusivos', 'Detrás de escena'],
        destacado: true
      },
      {
        id: 'premium',
        nombre: 'Culto Interno',
        precio: 2000,
        precioUSD: 20,
        descripcion: 'Apoyo premium mensual',
        beneficios: ['Todo lo anterior', 'Tu nombre en créditos', 'Merch exclusivo']
      }
    ],
    paymentLinks: {
      argentina: 'https://mpago.la/sodaroja', // Mercado Pago - reemplazar con tu link
      internacional: 'https://patreon.com/sodaroja' // Patreon o la que uses - reemplazar
    }
  }
};
