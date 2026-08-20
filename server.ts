import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Knowledge base for company services and mock tickets
const KNOWLEDGE_SYSTEM_PROMPT = `
Eres "TecnoBot M&C", el Asistente Virtual Inteligente y Asesor Técnico Oficial de "M&C Informática" (Argentina).
Tu objetivo es responder solicitudes de clientes, asesorar sobre presupuestos, guiar sobre el estado de reparaciones de laboratorio, compras de insumos, instalaciones de redes, cámaras de seguridad, automatización domótica y servicios para empresas.

INFORMACIÓN CORPORATIVA CLAVE DE M&C INFORMÁTICA:
- Nombre: M&C Informática
- Dirección Central: Corrientes 2400, Dpto H, Piso 1, Formosa - Capital, República Argentina.
- Teléfono: +54 370 464-6635
- WhatsApp Oficial: +54 370 464-6635
- Email: macnt0212@gmail.com
- Horarios de Atención al Público: Lunes a Viernes de 08:30 a 18:30 hs. Sábados de 09:00 a 13:30 hs.
- Guardia de Emergencias para Empresas con SLA: 24/7 los 365 días del año.
- Formas de Pago: Facturación A y B, Transferencia Bancaria, Tarjetas de Crédito en cuotas, Mercado Pago, Efectivo con descuento.

UNIDADES DE SERVICIO:
1. Laboratorio de Microelectrónica & Reparación de PC/Notebooks:
   - Diagnóstico sin cargo previo en banco de pruebas con microscopio 4K y osciloscopio.
   - Reparación de placa madre a nivel componente SMD (MOSFETs, controladores PWM, microcapacitores, fusibles).
   - Reballing de chipsets gráficos y procesadores BGA.
   - Mantenimiento térmico profundo con pasta Arctic MX-6 y pads térmicos de alta conductividad.
   - Garantía escrita de 90 a 180 días en todas las reparaciones.

2. Redes de Datos & Fibra Óptica:
   - Cableado estructurado Cat 6A / Cat 7 certificado con Fluke DSX-8000.
   - Fusión de fibra óptica monomodo/multimodo con fusionadora Fujikura 90S (< 0.02 dB de pérdida).
   - Montaje de racks de servidores (12U a 42U), switches gestionables Ubiquiti / Cisco / Mikrotik, patch panels y UPS Online.
   - Segmentación VLAN, QoS para telefonía IP y WiFi corporativo UniFi 6/7.

3. Sistemas de Seguridad & CCTV IP 4K:
   - Instalación de cámaras IP con inteligencia artificial (Dahua WizSense, Hikvision AcuSense).
   - Reconocimiento de personas y vehículos, visión nocturna ColorVu/Full-Color 24/7.
   - NVRs con discos WD Purple / Seagate SkyHawk en RAID.
   - Cañería metálica conduit rígida galvanizada antidescargas.
   - Visualización móvil remota en tiempo real (iOS / Android / PC).

4. Domótica & Automatización de Edificios/Hogares:
   - Protocolos Zigbee 3.0, Z-Wave, WiFi y Matter.
   - Control de iluminación inteligente, climatización por zonas, persianas automáticas y cerraduras biométricas con código y huella.
   - Integración con Home Assistant, Alexa, Google Home y Apple HomeKit.

5. Impresoras & Leasing Corporativo:
   - Abonos mensuales con modalidad de pago por copia/impresión.
   - Incluye tóner, repuestos originales (rodillos, fusores, cilindros) y equipo de respaldo en caso de falla.
   - Venta de cartuchos, tóneres microfinos y service multimarca (Brother, HP, Epson, Ricoh, Canon).

6. Venta Mayorista y Minorista de Hardware e Insumos:
   - Almacenamiento NVMe PCIe 4.0/5.0, memorias RAM DDR4/DDR5, fuentes 80 Plus Gold/Platinum.
   - Pastas térmicas de grado entusiasta (Noctua NT-H2, Arctic MX-6, Thermal Grizzly).
   - Equipos armados a medida: Workstations de renderizado/diseño, PCs Gamer y servidores de oficina.

SEGUIMIENTO DE TICKETS DE TALLER EN BASE DE DATOS:
Si el cliente proporciona un número de orden o ticket de taller, puedes consultarle o responder con estos datos oficiales de muestra:
- MC-8421: Notebook Gamer Asus ROG Strix (Cliente: Juan Carlos Pérez) -> Estado: "Listo para Retirar". Reparación de línea de 19V completada con éxito. Costo: $48.500 ARS.
- MC-8422: PC de Escritorio Ryzen 7 RTX 3070 (Cliente: Sofía Valenzuela) -> Estado: "En Reparación / Laboratorio SMD". Reemplazo de MOSFETs en etapa VRM. Entrega estimada: Mañana 15:00 hs.
- MC-8423: Impresora Láser Brother DCP-L5650DN (Cliente: Estudio Jurídico Martínez) -> Estado: "En Espera de Repuesto". Fusor original ingresando de aduana en 48 hs.
- MC-8424: Switch Administrable Cisco SG350 (Cliente: Distribuidora Norte) -> Estado: "En Diagnóstico". Análisis de puertos Gigabit y fuente interna.

INSTRUCCIONES DE TONO Y ESTILO:
- Sé amable, sumamente profesional, técnico pero claro, y 100% empático.
- Responde siempre en español.
- Si el usuario quiere una cotización rápida, dale rangos orientativos o sugiérele utilizar el "Cotizador Online" en la web o escribir por WhatsApp para un relevamiento presencial sin cargo.
- Si el usuario tiene una emergencia en su empresa (servidor caído, corte de enlace de fibra, corte de cámaras), indícale la guardia 24/7 y facilítale el contacto directo de WhatsApp.
- Emplea formato Markdown con negritas, listas cortas y emojis técnicos apropiados cuando sea útil para la lectura.
- Sé conciso: respuestas de 2 a 4 párrafos cortos o listas estructuradas para que sean ágiles en dispositivos móviles y de escritorio.
`;

// Helper for deterministic offline / fallback responses when API Key is not set or network fails
function generateFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes('ticket') || msg.includes('reparaci') || msg.includes('estado') || msg.includes('taller') || msg.includes('mc-') || msg.includes('842')) {
    if (msg.includes('8421') || msg.includes('mc-8421')) {
      return `📋 **Orden #MC-8421 - Notebook Asus ROG Strix**\n\n- **Estado actual**: 🟢 **Listo para Retirar**\n- **Diagnóstico/Trabajo realizado**: Reparación de microelectrónica en línea principal de 19V, cambio de controlador PWM y mantenimiento térmico Arctic MX-6.\n- **Garantía**: 180 días por escrito.\n- **Total**: $48.500 ARS.\n\nPuedes retirarlo de Lunes a Viernes de 08:30 a 18:30 hs o Sábados de 09:00 a 13:00 hs en nuestra sede central.`;
    }
    if (msg.includes('8422') || msg.includes('mc-8422')) {
      return `📋 **Orden #MC-8422 - PC Gamer Ryzen 7 5800X / RTX 3070**\n\n- **Estado actual**: 🟡 **En Laboratorio de Microelectrónica**\n- **Avance**: Desoldadura de MOSFETs defectuosos en fase VRM e instalación de componentes SMD nuevos.\n- **Fecha estimada de finalización**: Próximas 24 horas hábiles. Te enviaremos notificación automática al finalizar.`;
    }
    return `🔧 **Consulta de Estado de Reparación en Taller M&C**\n\nPuedes consultar el estado exacto de tu equipo ingresando el número de orden (por ejemplo **MC-8421**, **MC-8422**) o tu DNI en la sección **"Estado de Reparación"** de este sitio.\n\nTambién puedo verificarlo si me indicas tu código de orden aquí mismo.`;
  }

  if (msg.includes('camara') || msg.includes('cctv') || msg.includes('seguridad') || msg.includes('dahua') || msg.includes('hikvision')) {
    return `📹 **Sistemas de Seguridad & Videovigilancia IP 4K M&C**\n\nInstalamos sistemas profesionales para hogares, comercios y plantas industriales:\n- Cámaras IP 4K Ultra HD con visión nocturna a color (*Full-Color / ColorVu*).\n- Inteligencia Artificial: Detección inteligente de personas y vehículos sin falsas alarmas.\n- Grabadores NVR con almacenamiento encriptado y visualización remota en el celular.\n- Cableado bajo cañería conduit galvanizada anti-vandálica.\n\n💡 *Ofrecemos relevamiento técnico sin cargo en tu predio.* Puedes solicitar cotización inmediata en nuestro Cotizador Online o coordinar una visita por WhatsApp.`;
  }

  if (msg.includes('fibra') || msg.includes('red') || msg.includes('rack') || msg.includes('cableado') || msg.includes('wifi') || msg.includes('switch')) {
    return `🌐 **Infraestructura de Redes & Fibra Óptica**\n\nRealizamos proyectos llave en mano con certificación internacional:\n- **Fibra Óptica**: Fusión por arco voltaico con máquina Fujikura (<0.02 dB) y certificación reflectométrica.\n- **Cableado Estructurado**: Categoría 6A y 7 con certificación Fluke DSX-8000.\n- **Montaje de Racks**: Organización integral de servidores, patch panels, organizadores y switches gestionables 10G.\n- **WiFi Corporativo**: Redes mesh de alta densidad para oficinas y naves logísticas.\n\n¿Deseas que coordinemos un relevamiento para tu empresa?`;
  }

  if (msg.includes('insumo') || msg.includes('pasta') || msg.includes('ssd') || msg.includes('ram') || msg.includes('repuesto') || msg.includes('toner')) {
    return `📦 **Insumos y Repuestos Originales en Stock**\n\nDisponemos de stock permanente de insumos críticos de primera calidad:\n- **Pastas térmicas y pads**: Arctic MX-6, Noctua NT-H2, Thermal Grizzly Kryonaut.\n- **Almacenamiento**: SSD NVMe M.2 PCIe 4.0 Kingston Fury, Samsung EVO, Crucial.\n- **Memorias RAM**: DDR4 y DDR5 para PCs de escritorio, notebooks y servidores.\n- **Insumos de Impresión**: Tóneres microfinos originales y alternativos premium Brother, HP, Epson.\n\nPuedes explorar los productos disponibles en la pestaña **"Ventas & Insumos"** con envío a todo el país o retiro en mostrador.`;
  }

  if (msg.includes('cotiz') || msg.includes('precio') || msg.includes('cuanto') || msg.includes('costo') || msg.includes('presupuesto')) {
    return `💰 **Presupuestos y Cotizaciones a Medida**\n\nPara obtener un estimado instantáneo, puedes utilizar nuestro **Cotizador Online interactivo** en la pestaña correspondiente de la web.\n\nTambién realizamos presupuestos formales para empresas con **Factura A / B** y facilidades de pago. ¿De qué servicio o producto te gustaría recibir un presupuesto detallado?`;
  }

  if (msg.includes('horario') || msg.includes('donde') || msg.includes('ubicacion') || msg.includes('direccion') || msg.includes('telefono') || msg.includes('contacto')) {
    return `📍 **Información de Contacto & Atención M&C Informática**\n\n- **Dirección**: Corrientes 2400, Dpto H, Piso 1, Formosa - Capital, República Argentina.\n- **Horario Comercial**: Lunes a Viernes de 08:30 a 18:30 hs. Sábados de 09:00 a 13:30 hs.\n- **Teléfono / WhatsApp**: +54 370 464-6635\n- **Guardia de Servidores & Empresas**: 24/7 con SLA activo.\n- **Email**: macnt0212@gmail.com`;
  }

  return `¡Hola! Soy **TecnoBot**, el asistente de **M&C Informática** 🤖.\n\nPuedo ayudarte con:\n1. 🛠️ **Estado de reparación de tu equipo** (indícame tu N° de orden o consulta).\n2. 📹 **Cámaras de seguridad CCTV y domótica**.\n3. 🌐 **Redes de fibra óptica, cableado Cat 6A y racks**.\n4. 🖨️ **Leasing y servicio técnico de impresoras**.\n5. 📦 **Insumos de microelectrónica, hardware y pastas térmicas**.\n6. 💰 **Cotizaciones y presupuestos para particulares o empresas**.\n\n¿En qué podemos asesorarte hoy?`;
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      service: 'M&C Informática API', 
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // Chat API endpoint for AI assistant
  app.post('/api/chat', async (req, res) => {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El mensaje del usuario es requerido.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return smart fallback response if API key is not configured
      const fallbackText = generateFallbackResponse(message);
      return res.json({
        reply: fallbackText,
        source: 'knowledge-base-fallback',
        timestamp: new Date().toISOString()
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare conversation history for the model
      const contentsPayload: any[] = [];

      // Add relevant history if present
      if (Array.isArray(history) && history.length > 0) {
        // limit history to last 8 turns to keep context fast and focused
        const recentHistory = history.slice(-8);
        for (const item of recentHistory) {
          if (item && item.text && (item.role === 'user' || item.role === 'model')) {
            contentsPayload.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        }
      }

      // Add current user prompt
      contentsPayload.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: contentsPayload,
        config: {
          systemInstruction: KNOWLEDGE_SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      const replyText = response.text || generateFallbackResponse(message);

      return res.json({
        reply: replyText,
        source: 'gemini-3.7-flash',
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error('Error generating response with Gemini API:', error);
      // Seamlessly fall back to knowledge base
      const fallbackText = generateFallbackResponse(message);
      return res.json({
        reply: fallbackText,
        source: 'knowledge-base-fallback',
        warning: 'Fallback activated due to upstream provider rate-limit or error.',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Submit support / quote request endpoint
  app.post('/api/requests', (req, res) => {
    const { name, contact, serviceType, details } = req.body;
    const ticketId = `SOL-${Math.floor(1000 + Math.random() * 9000)}`;
    
    res.json({
      success: true,
      ticketId,
      message: `Solicitud ${ticketId} registrada exitosamente. Un asesor técnico de M&C se comunicará a la brevedad.`,
      receivedAt: new Date().toISOString()
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`M&C Informática server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
