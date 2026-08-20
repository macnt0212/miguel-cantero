import { ServiceItem, ProductItem, JobOpening, RepairTicket, CompanyStat, SampleItem } from '../types';

import companyLogoImg from '../assets/images/mc_logo_vibrant_1787183870736.jpg';
import pcRepairBenchImg from '../assets/images/pc_repair_bench_1787182141497.jpg';
import hardwareInsumosImg from '../assets/images/hardware_insumos_1787182151529.jpg';
import serverRackImg from '../assets/images/server_rack_cabling_1787182161983.jpg';

export const COMPANY_LOGO_URL = companyLogoImg;

export const SAMPLES_GALLERY: SampleItem[] = [
  {
    id: 'sample-rep-1',
    title: 'Reparación de Placa Madre & Microelectrónica SMD en Notebook Gamer',
    category: 'reparaciones',
    categoryLabel: 'Reparación de Laboratorio',
    image: pcRepairBenchImg,
    badge: 'Microscopio 4K & Soldadura JBC',
    description: 'Diagnóstico bajo microscopio óptico 4K y osciloscopio digital. Se detectó cortocircuito en línea principal de 19V con reemplazo de MOSFETs quemados y controlador PWM de alimentación.',
    details: [
      'Identificación de componente en corto mediante inyección de tensión y cámara térmica.',
      'Desoldadura con estación de aire caliente de precisión JBC a 380°C.',
      'Sustitución de MOSFET N-Channel y microcapacitores cerámicos 0402.',
      'Limpieza química por ultrasonido y reemplazo de pasta térmica Arctic MX-6.'
    ],
    toolsUsedOrSpecs: ['Microscopio Digital 4K', 'Estación JBC Nano', 'Osciloscopio Rigol 100MHz', 'Soldadura Lead-Free 99.3/0.7'],
    dateOrCode: 'Orden #MC-8421 • Tasa de Éxito 100%'
  },
  {
    id: 'sample-ins-1',
    title: 'Muestra de Insumos & Componentes de Grado Profesional',
    category: 'insumos',
    categoryLabel: 'Insumos & Repuestos',
    image: hardwareInsumosImg,
    badge: 'Insumos 100% Originales',
    description: 'Stock permanente de insumos críticos de primera línea: pastas térmicas de alto rendimiento (Noctua NT-H2, Arctic MX-6), almohadillas térmicas (Thermal Grizzly), unidades SSD NVMe PCIe 4.0, memorias DDR5, tóneres de alto rendimiento y conectores blindados Cat6A.',
    details: [
      'Pastas térmicas no conductivas con conductividad térmica > 8.5 W/(m·K).',
      'Pads térmicos de silicona con espesores calibrados desde 0.5mm hasta 2.0mm.',
      'Tóneres y cartuchos con polímero microfino para evitar desgaste prematuro de cilindros y fusores.',
      'Conectores RJ45 blindados con baño de oro 50µ para cero pérdida de paquetes en 10 Gbps.'
    ],
    toolsUsedOrSpecs: ['Noctua / Arctic', 'Kingston Fury / Corsair', 'Brother / HP Original', 'CommScope / AMP Cat6A'],
    dateOrCode: 'Garantía Oficial de Fábrica'
  },
  {
    id: 'sample-red-1',
    title: 'Montaje de Rack & Fusión de Fibra Óptica en Datacenter',
    category: 'redes_cctv',
    categoryLabel: 'Redes & Infraestructura',
    image: serverRackImg,
    badge: 'Certificación Fluke Networks',
    description: 'Armado de rack de 42U con peinado y ordenamiento de cableado estructurado Cat 6A, patch panels modulares, organizadores horizontales y fusión de troncal de fibra óptica monomodo 10G con switch Ubiquiti UniFi Pro.',
    details: [
      'Certificación punto a punto con reflectómetro OTDR y Fluke DSX-8000.',
      'Segmentación de redes VLAN para telefonía IP, cámaras de seguridad y puestos de trabajo.',
      'Instalación de bandeja de empalme de fibra óptica con pérdida menor a 0.02 dB por fusión.',
      'Alimentación ininterrumpida con UPS Online de doble conversión 6KVA.'
    ],
    toolsUsedOrSpecs: ['Fusionadora Fujikura 90S', 'Fluke DSX-8000', 'Patch Cords Panduit Cat6A', 'Switches Ubiquiti UniFi 10G'],
    dateOrCode: 'Obra Corporativa • Uptime 99.99%'
  },
  {
    id: 'sample-rep-2',
    title: 'Reballing & Rescate de Chipset Gráfico RTX 3080',
    category: 'reparaciones',
    categoryLabel: 'Reparación de Laboratorio',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    badge: 'Reballing BGA Especializado',
    description: 'Extracción de chip GPU con rampa térmica controlada por infrarrojos, limpieza de pads con malla desoldadora de cobre y colocación de esferas de estaño-plata Sn63/Pb37 con stencil de calor directo.',
    details: [
      'Eliminación de fracturas intermetálicas por choque térmico.',
      'Colocación de esferas BGA de 0.50mm con flux líquido Amtech NC-559-ASM.',
      'Curva de soldadura en máquina automática de 4 zonas térmicas.',
      'Pruebas de renderizado durante 4 horas continuas en FurMark sin artefactos visuales.'
    ],
    toolsUsedOrSpecs: ['Estación BGA ACHI IR-PRO-SC', 'Flux Amtech Original', 'Esferas Sn96.5/Ag3.0/Cu0.5', 'Termocupla de K'],
    dateOrCode: 'Garantía Escrita 180 Días'
  },
  {
    id: 'sample-ins-2',
    title: 'Repuestos & Insumos para Impresoras y Multifuncionales',
    category: 'impresoras',
    categoryLabel: 'Impresoras & Consumibles',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    badge: 'Repuestos Originales Brother / HP / Epson',
    description: 'Rodillos de tracción (pickup rollers), filminas de teflón para fusores, almohadillas de tinta con chip de reseteo, cabezales de inyección MicroPiezo y engranajes de alta resistencia.',
    details: [
      'Kits de mantenimiento preventivo para 50.000 a 200.000 páginas.',
      'Grasa sintética de alta temperatura para ejes de carro y fusores de hasta 280°C.',
      'Líquidos de limpieza específicos para desobstrucción de inyectores de tinta pigmentada y dye.',
      'Microchips de recambio para lectura precisa de niveles de tóner.'
    ],
    toolsUsedOrSpecs: ['Epson Original', 'Brother Genuine Parts', 'Grasa Fuser HP', 'Kit de Rodillos OEM'],
    dateOrCode: 'Disponibilidad para todas las marcas'
  },
  {
    id: 'sample-red-2',
    title: 'Instalación de Sistema CCTV 4K con Cámaras Dahua WizSense',
    category: 'redes_cctv',
    categoryLabel: 'Seguridad & CCTV',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    badge: 'Visión Nocturna Full-Color & IA',
    description: 'Montaje de 16 cámaras IP 4K en predio industrial con canalización metálica rígida hermética (conduit), protección contra descargas atmosféricas y configuración de NVR con reconocimiento perimetral.',
    details: [
      'Discriminación inteligente entre falsas alarmas (animales, lluvia, ramas) y personas/vehículos.',
      'Lente gran angular con apertura F1.0 para visión nocturna nítida a color sin infrarrojo visible.',
      'Cajas de paso estancas IP67 con prensaestopas para total protección contra humedad y polvo.',
      'Transmisión encriptada hacia central de monitoreo y visualización móvil remota.'
    ],
    toolsUsedOrSpecs: ['Dahua WizSense 8MP', 'NVR PoE 16CH RAID', 'Cañería Conduit Galvanizada', 'Protectores de Sobretensión'],
    dateOrCode: 'Proyecto Cerrado • 100% Cobertura'
  }
];

export const COMPANY_INFO = {
  name: 'M&C Informática',
  tagline: 'Soluciones Integrales de Tecnología, Infraestructura y Seguridad',
  shortAbout: 'Líderes en ingeniería de redes, videovigilancia IP, automatización inteligente, soporte de microelectrónica y provisión de equipamiento de alta gama para empresas y particulares.',
  phone: '+54 370 464-6635',
  whatsapp: '543704646635',
  email: 'macnt0212@gmail.com',
  supportEmail: 'macnt0212@gmail.com',
  address: 'Corrientes 2400, Dpto H, Piso 1',
  city: 'Formosa - Capital, República Argentina',
  hours: 'Lunes a Viernes: 08:30 - 18:30 | Sábados: 09:00 - 13:30',
  emergencyAvailable: 'Servicio de Guardia y Emergencias Críticas 24/7 para Empresas',
};

export const COMPANY_STATS: CompanyStat[] = [
  {
    label: 'Años de Trayectoria',
    value: '+14',
    subtext: 'Experiencia y solidez en el mercado tecnológico',
    icon: 'Award',
    change: '+3 patentes y certificaciones',
  },
  {
    label: 'Clientes Corporativos',
    value: '+3,850',
    subtext: 'Pymes, industrias, comercios y usuarios finales',
    icon: 'Users',
    change: '99.4% satisfacción',
  },
  {
    label: 'Equipos Reparados',
    value: '+18,400',
    subtext: 'Diagnósticos certificados en laboratorio propio',
    icon: 'Cpu',
    change: '98.2% tasa de éxito',
  },
  {
    label: 'Uptime en Redes & SLA',
    value: '99.98%',
    subtext: 'Continuidad operativa asegurada en infraestructuras',
    icon: 'Activity',
    change: '<15 min tiempo de respuesta',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'redes',
    category: 'redes',
    title: 'Redes y Conectividad Empresarial',
    shortDesc: 'Diseño, tendido de fibra óptica, cableado estructurado certificado, routers empresariales y enlaces de alta velocidad.',
    fullDesc: 'Implementamos infraestructuras de red escalables y seguras de alto rendimiento. Desde cableado categoría 6A/7 hasta enlaces inalámbricos punto a punto, configuración de racks de servidores, firewalls de próxima generación, redes Wi-Fi 6 de cobertura total y segmentación VLAN corporativa.',
    iconName: 'Network',
    features: [
      'Cableado Estructurado Certificado Cat 6A / Cat 7',
      'Fusión y Tendido de Fibra Óptica Monomodo y Multimodo',
      'Configuración de Routers & Firewalls (MikroTik, Cisco, Fortinet)',
      'Sistemas Wi-Fi 6 Mesh Empresarial (Ubiquiti UniFi, Ruijie)',
      'Armado y Mantenimiento de Racks de Servidores y Patch Panels',
      'Monitoreo de Tráfico, QoS y Balanceo de Múltiples Proveedores'
    ],
    specs: [
      { label: 'Velocidades Soportadas', value: 'Hasta 10 Gbps / 40 Gbps Troncal' },
      { label: 'Normativas Cumplidas', value: 'ANSI/TIA/EIA-568-C e ISO/IEC 11801' },
      { label: 'Garantía de Obra', value: '5 a 15 Años en Certificación de Puntos' },
      { label: 'Monitoreo Proactivo', value: 'Dashboard 24/7 con Alertas SNMP' }
    ],
    idealFor: 'Empresas, oficinas, depósitos industriales, hoteles, clínicas y edificios corporativos.',
    startingPrice: 'Cotización a medida',
    badge: 'Infraestructura Crítica'
  },
  {
    id: 'camaras',
    category: 'camaras',
    title: 'Cámaras de Seguridad & CCTV con IA',
    shortDesc: 'Instalación de videovigilancia IP 4K, análisis de video inteligente, reconocimiento facial y control de accesos biométrico.',
    fullDesc: 'Proteja sus instalaciones con tecnología de vigilancia de última generación. Instalamos cámaras IP con visión nocturna a todo color (ColorVu/FullColor), detección perimetral inteligente por inteligencia artificial (discriminación de personas y vehículos), NVRs con almacenamiento redundante y acceso remoto encriptado desde su smartphone o central de monitoreo.',
    iconName: 'ShieldAlert',
    features: [
      'Cámaras IP 4K Ultra HD y Domos PTZ con seguimiento automático',
      'Tecnología Visión Nocturna en Color 24/7 (ColorVu / Full-Color)',
      'Inteligencia Artificial: Reconocimiento Facial y Lectura de Patentes (LPR)',
      'Control de Acceso Biométrico, Tarjetas RFID y Molinetes',
      'Grabadores NVR/DVR con almacenamiento redundante RAID',
      'App Móvil Segura y Visualización en Tiempo Real sin límite de usuarios'
    ],
    specs: [
      { label: 'Resoluciones', value: '4MP, 8MP (4K) y 12MP Ultra HD' },
      { label: 'Compresión de Video', value: 'H.265+ (Ahorro del 80% de disco)' },
      { label: 'Protección Externa', value: 'IP67 / Antivandálica IK10' },
      { label: 'Marcas Partners', value: 'Dahua Technology, Hikvision, Uniview' }
    ],
    idealFor: 'Barrios cerrados, fábricas, comercios, centros logísticos y hogares.',
    startingPrice: 'Desde $145.000',
    badge: 'Seguridad Inteligente'
  },
  {
    id: 'automatizacion',
    category: 'automatizacion',
    title: 'Automatización & Domótica Inteligente',
    shortDesc: 'Sistemas inteligentes para el control de iluminación, climatización, accesos remotos y respaldo energético automatizado.',
    fullDesc: 'Transforme su espacio de trabajo o residencia en un entorno inteligente y energéticamente eficiente. Integramos sistemas domóticos e IoT para el control automático de luces, climatización, persianas, sensores de inundación/humo, y conmutación automática de generadores/UPS ante cortes eléctricos.',
    iconName: 'Cpu',
    features: [
      'Control centralizado de iluminación y escenas horarias programables',
      'Gestión inteligente de climatización y ahorro energético hasta 35%',
      'Cerraduras inteligentes, portones automáticos y apertura remota',
      'Sensores IoT de presencia, fugas de agua, humo y calidad de aire',
      'Automatización de bancos de baterías y conmutación automática de UPS',
      'Integración con asistentes por voz (Alexa, Google Assistant, Home Assistant)'
    ],
    specs: [
      { label: 'Protocolos', value: 'Zigbee 3.0, Z-Wave, Wi-Fi 6, MQTT, Modbus' },
      { label: 'Compatibilidad', value: 'Android, iOS, PC, Paneles Táctiles de Pared' },
      { label: 'Tiempo de Respuesta', value: '< 20ms en ejecución local' },
      { label: 'Ahorro Eléctrico Estimado', value: '25% - 40% mensual' }
    ],
    idealFor: 'Hogares modernos, oficinas corporativas, salas de conferencias y naves industriales.',
    startingPrice: 'Desde $180.000',
    badge: 'Eficiencia Energética'
  },
  {
    id: 'impresoras',
    category: 'impresoras',
    title: 'Impresoras, Leasing & Gestión de Impresión',
    shortDesc: 'Venta, alquiler corporativo (leasing), mantenimiento preventivo/correctivo y provisión de insumos para parques de impresión.',
    fullDesc: 'Optimice los costos de impresión de su empresa con nuestros planes de gestión integral. Ofrecemos mantenimiento especializado para impresoras láser monocromo, color, multifuncionales de alto volumen y sistemas de tinta continua, junto con planes de costo por copia que eliminan costos imprevistos.',
    iconName: 'Printer',
    features: [
      'Alquiler de Impresoras Multifunción con Insumos y Servicio Incluido',
      'Mantenimiento de Fusores, Rodillos de Arrastre y Cabezales de Impresión',
      'Instalación y Configuración de Servidores de Impresión y Cuotas de Usuario',
      'Provisión de Tóner Original y Alternativo de Alta Durabilidad',
      'Servicio Técnico Express con Equipo de Reemplazo Temporal',
      'Auditoría y Reducción de Costo Operativo por Página'
    ],
    specs: [
      { label: 'Capacidad de Carga', value: 'Desde 2.000 hasta 80.000 pág/mes' },
      { label: 'Tecnologías', value: 'Láser Monocromo, Láser Color, Tinta Continua' },
      { label: 'Marcas Atendidas', value: 'HP, Epson, Brother, Ricoh, Xerox, Canon' },
      { label: 'Tiempo de Reemplazo', value: 'Menor a 4 horas ante fallas' }
    ],
    idealFor: 'Estudios contables, notarías, escuelas, pymes, centros médicos y empresas.',
    startingPrice: 'Planes desde $35.000/mes',
    badge: 'Costo por Copia'
  },
  {
    id: 'reparacion',
    category: 'reparacion',
    title: 'Reparación de PC, Laptops & Microelectrónica',
    shortDesc: 'Laboratorio técnico avanzado con microscopio, reballing, cambio de componentes SMD, optimización térmica y recuperación de datos.',
    fullDesc: 'Solucionamos fallas complejas de hardware y software que otros servicios técnicos descartan. Realizamos reparación a nivel de componente en placas madre, reemplazo de integrados de alimentación, reballing de chips gráficos, limpieza por ultrasonido, cambio de pantallas, teclados, y mantenimiento con pasta térmica de alto rendimiento o metal líquido.',
    iconName: 'Wrench',
    features: [
      'Reparación a Nivel de Componente SMD / Placas Madre de Notebooks y PC',
      'Reballing y Reemplazo de Chips de Video y Procesadores',
      'Optimización Térmica: Pasta Térmica Premium (Arctic/Noctua) y Pads Térmicos',
      'Upgrades de Velocidad: Clonación e Instalación de SSD NVMe PCIe 4.0 y RAM',
      'Recuperación Profesional de Datos en Discos Dañados (HDD/SSD/Memorias)',
      'Desinfección de Malware Avanzado, Instalación de SO y Optimización de Rendimiento'
    ],
    specs: [
      { label: 'Diagnóstico Estándar', value: '24 a 48 Horas con Informe Digital' },
      { label: 'Garantía Escrita', value: '90 a 180 Días sobre reparaciones' },
      { label: 'Equipamiento Laboratorio', value: 'Estaciones de Soldadura JBC, Osciloscopios, Microscopios 4K' },
      { label: 'Tasa de Recuperación', value: '98.2% de equipos recuperados con éxito' }
    ],
    idealFor: 'Equipos gamer, notebooks ejecutivas, PCs de oficina, workstations de renderizado y servidores.',
    startingPrice: 'Diagnóstico bonificado con reparación',
    badge: 'Laboratorio Propio'
  },
  {
    id: 'ventas',
    category: 'ventas',
    title: 'Ventas de Hardware & Soluciones Corporativas',
    shortDesc: 'Distribución oficial de PCs armadas a medida, notebooks empresariales, servidores, periféricos, repuestos y licencias oficiales.',
    fullDesc: 'Proveemos equipamiento informático de primera línea con respaldo de fábrica y asesoramiento técnico personalizado. Armamos equipos diseñados específicamente para su flujo de trabajo (ofimática, diseño 3D, gaming competitivo, servidores de base de datos) garantizando la máxima compatibilidad y durabilidad.',
    iconName: 'ShoppingBag',
    features: [
      'PCs de Escritorio a Medida (Oficina, Diseño, Gaming de Alto Rendimiento)',
      'Notebooks Corporativas y Laptops Ultralivianas con Garantía Oficial',
      'Switches Administrables, Routers, Patch Panels y Gabinetes Rack',
      'Kits de Cámaras de Seguridad y Sistemas de Control de Acceso',
      'Componentes: Procesadores Intel/AMD, Placas de Video RTX/Radeon, SSDs, RAM',
      'Licencias Originales de Microsoft Windows, Office 365 y Antivirus Empresarial'
    ],
    specs: [
      { label: 'Garantía Oficial', value: '12 a 36 Meses según fabricante' },
      { label: 'Financiación', value: 'Cuotas sin interés y Facturación A / B' },
      { label: 'Entrega y Envío', value: 'Despachos a todo el país y entrega express 24h' },
      { label: 'Marcas Oficiales', value: 'Intel, AMD, ASUS, Kingston, Dell, Lenovo, Dahua, Ubiquiti' }
    ],
    idealFor: 'Usuarios particulares, gamers, diseñadores, empresas y organismos públicos.',
    startingPrice: 'Catálogo con precios actualizados',
    badge: 'Distribuidores Oficiales'
  }
];

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Workstation M&C Pro Core i7 14th Gen',
    category: 'pc_laptops',
    categoryLabel: 'PCs y Laptops',
    price: 1350000,
    originalPrice: 1480000,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    brand: 'M&C Custom Pro',
    description: 'PC de alto rendimiento diseñada para edición 4K, arquitectura, CAD y multitarea exigente con refrigeración líquida.',
    specs: ['Intel Core i7-14700K', '32GB DDR5 6000MHz RGB', '1TB NVMe Gen4 (7000MB/s)', 'GeForce RTX 4070 12GB GDDR6X', 'Fuente 750W 80+ Gold'],
    tags: ['Intel 14va', 'RTX 4070', 'DDR5', 'Workstation'],
    featured: true
  },
  {
    id: 'prod-2',
    name: 'Kit de Seguridad 8 Cámaras IP 4K Dahua WizSense',
    category: 'seguridad',
    categoryLabel: 'Seguridad & CCTV',
    price: 685000,
    originalPrice: 750000,
    rating: 5.0,
    reviewsCount: 52,
    inStock: true,
    stockCount: 12,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    brand: 'Dahua Technology',
    description: 'Sistema completo de videovigilancia inteligente con detección de personas y vehículos, visión nocturna a color y NVR PoE de 8 canales.',
    specs: ['8x Cámaras IP 4K 8MP ColorVu', 'NVR PoE 8CH 4K H.265+', 'Disco Rígido 4TB SkyHawk Surveillance', 'Monitoreo App DMSS en Celular', 'Audio bidireccional'],
    tags: ['4K Ultra HD', 'IA WizSense', 'PoE', 'Visión Nocturna Color'],
    featured: true
  },
  {
    id: 'prod-3',
    name: 'Switch Administrable Ubiquiti UniFi Pro 24 PoE+',
    category: 'redes',
    categoryLabel: 'Redes & Conectividad',
    price: 840000,
    rating: 4.8,
    reviewsCount: 24,
    inStock: true,
    stockCount: 5,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    brand: 'Ubiquiti Networks',
    description: 'Switch Layer 3 administrable de nivel empresarial con 24 puertos Gigabit Ethernet PoE+ y 2 puertos 10G SFP+ de fibra óptica.',
    specs: ['24x Puertos Gigabit PoE+ (400W total)', '2x Puertos 10G SFP+ para fibra', 'Pantalla táctil LCM 1.3"', 'Gestión centralizada UniFi Cloud OS', 'Capacidad Switching 88 Gbps'],
    tags: ['Ubiquiti', 'PoE+', '10G SFP+', 'VLAN', 'Layer 3'],
    featured: true
  },
  {
    id: 'prod-4',
    name: 'Impresora Multifunción Láser Color Brother MFC-L8905CDW',
    category: 'impresoras',
    categoryLabel: 'Impresoras & Consumibles',
    price: 1120000,
    originalPrice: 1240000,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    stockCount: 4,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    brand: 'Brother',
    description: 'Equipo multifuncional para grupos de trabajo con alta demanda. Impresión y escaneo dúplex ultrarrápido y bajo costo por página.',
    specs: ['Velocidad: 33 ppm color y b/n', 'Doble faz automático en impresión y escaneo', 'Pantalla táctil a color 5"', 'Conexión Wi-Fi, Gigabit Ethernet y NFC', 'Tóner de súper alto rendimiento'],
    tags: ['Láser Color', 'Doble Faz', 'Ethernet/Wi-Fi', 'Alto Rendimiento'],
    featured: false
  },
  {
    id: 'prod-5',
    name: 'Sistema Domótico Central Hub Zigbee 3.0 Pro + Sensores',
    category: 'automatizacion',
    categoryLabel: 'Automatización & IoT',
    price: 245000,
    rating: 4.7,
    reviewsCount: 44,
    inStock: true,
    stockCount: 18,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    brand: 'SmartTech M&C',
    description: 'Central inteligente para el control integral de luces, enchufes, cerraduras y sensores con respuesta ultra rápida y control offline.',
    specs: ['Hub Gateway Ethernet & Wi-Fi', 'Soporta hasta 128 dispositivos Zigbee', 'Incluye 4 sensores de apertura y 2 de presencia', 'Compatible con Home Assistant, Alexa, Google', 'Batería de respaldo integrada'],
    tags: ['Zigbee 3.0', 'Domótica', 'Home Assistant', 'Sensores IoT'],
    featured: false
  },
  {
    id: 'prod-6',
    name: 'Notebook Lenovo ThinkPad E16 Gen 2 Core Ultra 7',
    category: 'pc_laptops',
    categoryLabel: 'PCs y Laptops',
    price: 1590000,
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    stockCount: 7,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    brand: 'Lenovo',
    description: 'Laptop ejecutiva ultra resistente con procesador Intel con NPU dedicada para inteligencia artificial y teclado ergonómico legendario.',
    specs: ['Intel Core Ultra 7 155H con IA', '32GB RAM DDR5', '1TB SSD NVMe M.2 Gen4', 'Pantalla 16" IPS WUXGA Antirreflejo', 'Certificación militar MIL-STD-810H'],
    tags: ['Lenovo ThinkPad', 'Core Ultra', 'IA NPU', 'Garantía 3 Años'],
    featured: true
  },
  {
    id: 'prod-7',
    name: 'Access Point Exterior Wi-Fi 6 Mesh Ruijie Reyee RG-RAP6260',
    category: 'redes',
    categoryLabel: 'Redes & Conectividad',
    price: 360000,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    brand: 'Ruijie Networks',
    description: 'Punto de acceso para intemperie IP68 de alta potencia, ideal para patios, predios industriales, clubes y estacionamientos.',
    specs: ['Wi-Fi 6 AX1800 (Hasta 1775 Mbps)', 'Cobertura omnidireccional hasta 250 metros', 'Protección climática IP68 y rayos 4kV', 'Alimentación PoE 802.3at', 'Gestión gratuita en la nube Ruijie Cloud'],
    tags: ['Wi-Fi 6', 'Exterior IP68', 'Ruijie Cloud', 'Largo Alcance'],
    featured: false
  },
  {
    id: 'prod-8',
    name: 'Kit de Memoria RAM Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz',
    category: 'componentes',
    categoryLabel: 'Componentes & Hardware',
    price: 195000,
    rating: 4.9,
    reviewsCount: 65,
    inStock: true,
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80',
    brand: 'Corsair',
    description: 'Módulos de memoria de baja latencia con perfiles Intel XMP 3.0 y AMD EXPO para máximo rendimiento en gaming y aplicaciones pesadas.',
    specs: ['Capacidad: 32GB (2x16GB)', 'Frecuencia: 6000MHz CL30', 'Disipador térmico de aluminio anodizado', 'Compatibilidad Intel y AMD Ryzen 7000/8000/9000', 'Garantía de por vida'],
    tags: ['DDR5', '6000MHz', 'Corsair', 'XMP 3.0'],
    featured: false
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Técnico Especialista en Redes & Cableado Estructurado',
    department: 'Redes e Infraestructura',
    type: 'Tiempo Completo',
    location: 'Sede Central / En terreno',
    experience: 'Mínimo 2 años en instalaciones corporativas',
    salaryRange: '$950.000 - $1.350.000 + Viáticos y Bonos',
    urgency: 'Urgente',
    description: 'Buscamos un profesional apasionado por las telecomunicaciones e infraestructura física y lógica para liderar instalaciones de redes corporativas, tendidos de fibra óptica y configuración de equipamiento.',
    responsibilities: [
      'Tendido, conectorización y certificación de cableado estructurado Cat 6A / 7.',
      'Fusión, sangría y armado de cajas empalme y ODF de Fibra Óptica.',
      'Montaje de racks, organizadores de cables y patch panels en datacenters de clientes.',
      'Configuración inicial de switches gestionables (VLAN, LACP) y routers MikroTik/UniFi.',
      'Elaboración de planos de tendido y reportes de certificación para entrega a cliente.'
    ],
    requirements: [
      'Experiencia comprobable en cableado estructurado y uso de instrumental de certificación (Fluke).',
      'Conocimientos sólidos en TCP/IP, direccionamiento IPv4/IPv6 y subredes.',
      'Licencia de conducir vigente (Categoría B1 o superior).',
      'Disponibilidad para traslados y trabajos en altura (con elementos de seguridad certificados).',
      'Valorable: Certificaciones CCNA, MTCNA o cursos afines.'
    ],
    benefits: [
      'Remuneración competitiva por encima del convenio con revisiones periódicas.',
      'Vehículo de la empresa provisto para traslados con combustible y peajes cubiertos.',
      'Capacitación continua y pago de exámenes de certificación oficial.',
      'Cobertura médica prepaga de primer nivel (Swiss Medical / OSDE).',
      'Excelente ambiente laboral e incentivos por proyectos finalizados.'
    ]
  },
  {
    id: 'job-2',
    title: 'Instalador & Configurador de CCTV y Seguridad Electrónica',
    department: 'Seguridad Electrónica',
    type: 'Tiempo Completo',
    location: 'Sede Central / En terreno',
    experience: 'Mínimo 1 año en sistemas de videovigilancia IP',
    salaryRange: '$850.000 - $1.200.000 + Viáticos',
    urgency: 'Abierta',
    description: 'Se requiere instalador técnico con experiencia en colocación, cableado y puesta en marcha de cámaras de seguridad IP, domos PTZ, sistemas de control de acceso y enlaces inalámbricos.',
    responsibilities: [
      'Instalación física y canalización para cámaras IP y análogas en interior y exterior.',
      'Configuración de NVR/XVR, apertura de puertos/P2P, analíticas de video e IA.',
      'Puesta en marcha de control de acceso biométrico, cerraduras magnéticas y porteros IP.',
      'Capacitación al usuario final en el uso de la aplicación móvil y software cliente.',
      'Mantenimiento preventivo de fuentes de poder, cámaras y conectores.'
    ],
    requirements: [
      'Manejo de herramientas de mano y eléctricas (taladro, percutor, amoladora).',
      'Conocimiento en marcas líderes: Dahua, Hikvision, ZKTeco, Uniview.',
      'Buena presencia y trato cordial con clientes residenciales y comerciales.',
      'Predisposición para trabajo en equipo y resolución rápida de contingencias.'
    ],
    benefits: [
      'Indumentaria de trabajo y kit completo de herramientas profesionales individuales.',
      'Premios mensuales por cumplimiento de objetivos de instalación y calidad.',
      'Prepaga médica para el titular y grupo familiar directo.',
      'Oportunidad real de crecimiento hacia coordinación de instalaciones.'
    ]
  },
  {
    id: 'job-3',
    title: 'Técnico de Laboratorio Microelectrónica & Reparación PC',
    department: 'Laboratorio Técnico',
    type: 'Tiempo Completo',
    location: 'Laboratorio Técnico',
    experience: 'Mínimo 2 años en microelectrónica y reparación de placas',
    salaryRange: '$1.000.000 - $1.450.000 según pericia técnica',
    urgency: 'Urgente',
    description: 'Incorporamos al equipo a un especialista de laboratorio para diagnóstico y reparación de notebooks, motherboards, placas de video y equipamiento informático a nivel de componente.',
    responsibilities: [
      'Diagnóstico de fallas en líneas de alimentación (3.3V, 5V, VCORE, 19V) con osciloscopio y multímetro.',
      'Soldadura y desoldadura de componentes SMD, reemplazo de integrados PWM, MOSFETs y conectores.',
      'Reballing y reemplazo de procesadores y GPUs en estaciones de soldadura dedicadas.',
      'Mantenimiento profundo de workstations, consolas y notebooks de alta gama.',
      'Carga y actualización de estados en el sistema interno de tickets de reparación.'
    ],
    requirements: [
      'Experiencia sólida en lectura de esquemáticos (Boardview / Circuit Schematics).',
      'Habilidad manual y precisión con microscopio trinocular y estación de aire caliente.',
      'Conocimientos en reprogramación de memorias BIOS / KBC / EC.',
      'Orden, prolijidad y rigurosidad en el cuidado de los equipos de los clientes.'
    ],
    benefits: [
      'Laboratorio climatizado con instrumental de última generación (JBC, Rigol, etc.).',
      'Comisiones directas por equipos recuperados con éxito.',
      'Horario de lunes a viernes (fines de semana libres).',
      'Prepaga de primer nivel y café de especialidad libre en el taller.'
    ]
  },
  {
    id: 'job-4',
    title: 'Ingeniero / Técnico en Automatización, Domótica e IoT',
    department: 'Automatización & IoT',
    type: 'Tiempo Completo',
    location: 'Sede Central / En terreno',
    experience: '1 a 3 años en domótica, PLC o integración IoT',
    salaryRange: '$1.100.000 - $1.600.000 + Bonos por Proyecto',
    urgency: 'Nuevo',
    description: 'Buscamos un perfil creativo y técnico para diseñar e implementar proyectos de casas y oficinas inteligentes, gestión energética y automatización de procesos mediante protocolos modernos.',
    responsibilities: [
      'Programación e integración de hubs domóticos (Home Assistant, Tuya Pro, Control4).',
      'Diseño e instalación de tableros eléctricos automatizados y relés inteligentes.',
      'Integración de sensores de climatización, presencia, seguridad y control de consumo.',
      'Desarrollo de automatizaciones lógicas y paneles de visualización para clientes.'
    ],
    requirements: [
      'Formación técnica en Electrónica, Electricidad o Sistemas.',
      'Manejo de protocolos Zigbee, Z-Wave, MQTT, Wi-Fi y cableados Modbus.',
      'Conocimientos de electricidad domiciliaria y tableros trifásicos/monofásicos.',
      'Pasión por la tecnología y la innovación continua.'
    ],
    benefits: [
      'Participación en proyectos innovadores de arquitectura y domótica de vanguardia.',
      'Presupuesto para investigación y testeo de nuevos gadgets tecnológicos.',
      'Bono por hito alcanzado en cada proyecto cerrado.',
      'Flexibilidad horaria y modalidad híbrida para tareas de programación.'
    ]
  },
  {
    id: 'job-5',
    title: 'Ejecutivo Comercial B2B - Soluciones Tecnológicas',
    department: 'Ventas y Comercial',
    type: 'Híbrido',
    location: 'Oficina Comercial',
    experience: 'Mínimo 2 años en venta consultiva de tecnología',
    salaryRange: '$750.000 Básico + Altas Comisiones sin tope (Promedio $1.800.000+)',
    urgency: 'Abierta',
    description: 'Sumamos al área comercial a una persona orientada a resultados para la prospección, cotización y cierre de cuentas corporativas en servicios de redes, seguridad, leasing de impresión y hardware.',
    responsibilities: [
      'Generación de nuevos clientes corporativos y fidelización de cartera activa.',
      'Elaboración de propuestas técnicas y cotizaciones conjuntas con los ingenieros de preventa.',
      'Presentación de soluciones llave en mano a directores de compras y gerentes de IT.',
      'Seguimiento continuo en CRM y cierre de acuerdos comerciales.'
    ],
    requirements: [
      'Experiencia previa en ventas de servicios tecnológicos, hardware o telecomunicaciones.',
      'Habilidades sobresalientes de comunicación, negociación y persuasión.',
      'Manejo fluido de herramientas CRM y Paquete Office.',
      'Perfil proactivo, dinámico y con excelente presencia.'
    ],
    benefits: [
      'Sueldo fijo en blanco más comisiones escalonadas sin techo de cobro.',
      'Notebook corporativa y línea móvil provista.',
      'Modalidad híbrida (3 días presencial / 2 días home office).',
      'Plan de carrera con proyección a Jefatura de Ventas.'
    ]
  }
];

export const MOCK_REPAIR_TICKETS: Record<string, RepairTicket> = {
  'MC-8421': {
    ticketCode: 'MC-8421',
    clientName: 'Alejandro Rossi',
    deviceType: 'Notebook Gamer',
    model: 'ASUS ROG Strix G15 (G513Q)',
    serialOrImei: 'M9N0CV02847291',
    entryDate: '15/08/2026',
    estimatedDeliveryDate: '20/08/2026',
    currentStatus: 'Control de Calidad',
    progressPercentage: 85,
    technicianAssigned: 'Ing. Lucas Benítez (Laboratorio Central)',
    reportedIssue: 'Equipo no enciende tras descarga eléctrica. Led de carga titila en rojo pero no responde al botón de power.',
    diagnosticNotes: 'Cortocircuito detectado en la línea principal de 19V. MOSFET de entrada Q12 dañado y capacitor cerámico en corto cerca del integrado de carga BQ24780S.',
    partsReplaced: [
      'Reemplazo de 2x MOSFET N-Channel 30V SMD',
      'Reemplazo de Integrado Controlador de Carga BQ24780S',
      'Limpieza ultrasónica de zona afectada y re-pasteado con Arctic MX-6'
    ],
    costEstimate: 145000,
    timeline: [
      {
        title: 'Recepción del Equipo en Sucursal',
        date: '15/08/2026',
        time: '10:30 AM',
        description: 'Ingresó equipo ASUS ROG Strix con cargador original. Se realizó inspección visual y fotos de recepción.',
        status: 'completed'
      },
      {
        title: 'Diagnóstico en Banco de Trabajo',
        date: '16/08/2026',
        time: '14:15 PM',
        description: 'Se detectó corto en línea de 19V. No hay daño en procesador ni GPU RTX 3070.',
        status: 'completed'
      },
      {
        title: 'Presupuesto Aprobado por el Cliente',
        date: '16/08/2026',
        time: '17:00 PM',
        description: 'El cliente confirmó la aprobación del presupuesto por WhatsApp.',
        status: 'completed'
      },
      {
        title: 'Reparación de Microelectrónica & Soldadura',
        date: '18/08/2026',
        time: '11:45 AM',
        description: 'Reemplazo exitoso de componentes SMD y pruebas de tensión normales.',
        status: 'completed'
      },
      {
        title: 'Pruebas de Estrés y Control de Calidad',
        date: '19/08/2026',
        time: '09:30 AM',
        description: 'Equipo en test de estabilidad 3DMark y Cinebench. Temperaturas óptimas (CPU 72°C, GPU 68°C).',
        status: 'in_progress'
      },
      {
        title: 'Listo para Retiro en Sucursal',
        date: '20/08/2026',
        time: 'Pendiente',
        description: 'Se notificará al cliente para coordinar entrega y entrega de certificado de garantía de 90 días.',
        status: 'pending'
      }
    ]
  },
  'MC-9052': {
    ticketCode: 'MC-9052',
    clientName: 'Estudio Contable & Asoc. Méndez',
    deviceType: 'Impresora Multifunción',
    model: 'Epson EcoTank L5290 Wi-Fi',
    serialOrImei: 'X7912440192',
    entryDate: '17/08/2026',
    estimatedDeliveryDate: '19/08/2026',
    currentStatus: 'Listo para Retiro',
    progressPercentage: 100,
    technicianAssigned: 'Téc. Matías Gómez (Área Impresión)',
    reportedIssue: 'Líneas blancas en impresiones en color negro y atasco constante de hojas en bandeja de alimentación.',
    diagnosticNotes: 'Cabezal de inyección con inyectores negros obstruidos por tinta seca. Rodillos de goma de tracción gastados y almohadillas de desecho al 95%.',
    partsReplaced: [
      'Destape por ultrasonido y purga de cabezal MicroPiezo',
      'Cambio de rodillos de toma de papel (Pickup Roller nuevo)',
      'Reemplazo de caja de mantenimiento de almohadillas y reseteo de contador'
    ],
    costEstimate: 62000,
    timeline: [
      {
        title: 'Ingreso al Servicio Técnico',
        date: '17/08/2026',
        time: '09:10 AM',
        description: 'Recepción de equipo en mostrador con informe de fallas del cliente.',
        status: 'completed'
      },
      {
        title: 'Mantenimiento y Destape Químico',
        date: '17/08/2026',
        time: '15:20 PM',
        description: 'Limpieza profunda de cabezal y calibración de tracción.',
        status: 'completed'
      },
      {
        title: 'Test de Impresión y Alineación',
        date: '18/08/2026',
        time: '11:00 AM',
        description: 'Se imprimieron 150 páginas de prueba sin atascos y con 100% de inyectores activos.',
        status: 'completed'
      },
      {
        title: 'Embalado y Listo para Retiro',
        date: '19/08/2026',
        time: '08:45 AM',
        description: 'Equipo listo en mostrador principal. Notificación enviada por SMS/WhatsApp.',
        status: 'completed'
      }
    ]
  },
  'MC-7114': {
    ticketCode: 'MC-7114',
    clientName: 'Distribuidora San Martín S.A.',
    deviceType: 'Servidor Torre',
    model: 'Dell PowerEdge T340',
    serialOrImei: 'SERV-8921-PL',
    entryDate: '18/08/2026',
    estimatedDeliveryDate: '22/08/2026',
    currentStatus: 'En Diagnóstico',
    progressPercentage: 35,
    technicianAssigned: 'Ing. Esteban Cabrera (Servidores & Redes)',
    reportedIssue: 'Arreglo RAID 5 degradado con alerta en Disco 2 y reinicios esporádicos durante backups nocturnos.',
    diagnosticNotes: 'Disco SAS 2TB Seagate Enterprise reportando sectores reasignados críticos. Fuente redundante 2 con error de voltaje.',
    partsReplaced: [
      'En proceso de escaneo de integridad de volúmenes y reemplazo de disco SAS'
    ],
    costEstimate: 290000,
    timeline: [
      {
        title: 'Recepción de Emergencia Corporativa',
        date: '18/08/2026',
        time: '18:30 PM',
        description: 'Servidor ingresado con protocolo de prioridad para empresa con contrato de soporte.',
        status: 'completed'
      },
      {
        title: 'Diagnóstico de Hardware y Controladora PERC',
        date: '19/08/2026',
        time: '10:00 AM',
        description: 'Se confirmó falla en unidad SAS 2. Los datos principales se encuentran resguardados.',
        status: 'in_progress'
      },
      {
        title: 'Rebuild de RAID y Cambio de Fuente',
        date: 'Pendiente',
        time: 'Pendiente',
        description: 'Instalación de disco nuevo SAS Hot-Plug y sincronización de datos.',
        status: 'pending'
      }
    ]
  }
};

export const COMPANY_GROWTH_DATA = [
  { year: '2021', projects: 420, repairs: 2100, clients: 950 },
  { year: '2022', projects: 680, repairs: 3400, clients: 1600 },
  { year: '2023', projects: 990, repairs: 4900, clients: 2350 },
  { year: '2024', projects: 1420, repairs: 6800, clients: 3100 },
  { year: '2025', projects: 1890, repairs: 8900, clients: 3850 },
];

export const SERVICE_DISTRIBUTION = [
  { name: 'Redes y Fibra Óptica', percentage: 28, color: '#06B6D4', count: '1,420 obras', icon: 'Network' },
  { name: 'CCTV & Seguridad con IA', percentage: 24, color: '#3B82F6', count: '1,190 instalaciones', icon: 'ShieldAlert' },
  { name: 'Reparación PC & Microelectrónica', percentage: 22, color: '#8B5CF6', count: '18,400 equipos', icon: 'Wrench' },
  { name: 'Ventas de Hardware & Equipos', percentage: 12, color: '#10B981', count: '+8,500 pedidos', icon: 'ShoppingBag' },
  { name: 'Automatización & Domótica IoT', percentage: 8, color: '#F59E0B', count: '410 proyectos', icon: 'Cpu' },
  { name: 'Impresoras & Leasing Corporativo', percentage: 6, color: '#EC4899', count: '320 contratos', icon: 'Printer' },
];

export const SLA_METRICS = [
  { label: 'Tiempo de Respuesta en Emergencias Críticas', value: '14.2 min', target: '< 20 min', status: 'Excelente' },
  { label: 'Tasa de Éxito en Microelectrónica y Placas', value: '98.2%', target: '> 95%', status: 'Sobresaliente' },
  { label: 'Cumplimiento de Plazos de Entrega', value: '99.1%', target: '> 98%', status: 'Óptimo' },
  { label: 'Índice de Satisfacción Neta (NPS)', value: '+88', target: '> 75', status: 'Líder en Sector' },
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Ing. Martín Valenzuela',
    role: 'Gerente de IT, Logística Austral',
    comment: 'M&C Informática realizó el tendido completo de fibra óptica y cableado estructurado en nuestro centro de distribución de 12.000 m2. Cero fallas, certificación impecable y soporte inmediato ante cualquier consulta.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    service: 'Redes y Fibra Óptica'
  },
  {
    id: 'test-2',
    name: 'Dra. Carolina Solares',
    role: 'Directora Médica, Centro Diagnóstico Norte',
    comment: 'Instalaron 36 cámaras IP 4K con reconocimiento y control de acceso facial. El sistema es intuitivo, nítido y la atención de los técnicos durante la instalación fue sumamente profesional y respetuosa.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    service: 'CCTV & Control de Acceso'
  },
  {
    id: 'test-3',
    name: 'Sebastián Quiroga',
    role: 'Gamer & Creador de Contenido',
    comment: 'Llevé mi notebook con la GPU en corto que en 3 lugares me dijeron que no tenía arreglo. El equipo de laboratorio de M&C le hizo reballing y cambio de MOSFETs en 48hs. Quedó funcionando como nueva.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    service: 'Laboratorio de Microelectrónica'
  }
];

export const PARTNER_BRANDS = [
  'Cisco', 'MikroTik', 'Ubiquiti', 'Dahua Technology', 'Hikvision', 'Intel', 'AMD', 'ASUS', 'Brother', 'Epson', 'Kingston', 'Western Digital', 'Microsoft Partner'
];
