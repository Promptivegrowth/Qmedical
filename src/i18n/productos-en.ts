/**
 * Versión en inglés del contenido de cada producto.
 *
 * El castellano de src/data/catalogo.ts sigue siendo el original: proviene de
 * las fichas técnicas oficiales del fabricante y es el que rige. Aquí solo se
 * traduce lo que el visitante lee.
 *
 * Qué NO se traduce, deliberadamente:
 *   · los códigos de fabricante (MA1112, GYTR-III, B-SG002B…), que identifican
 *     el artículo en la orden de compra y deben coincidir con el catálogo del
 *     proveedor;
 *   · los nombres comerciales y las marcas registradas (NEX CLOREX, VIDE®);
 *   · las unidades y las cifras, que se dejan tal cual.
 *
 * Las fichas técnicas descargables están redactadas en castellano, tal como
 * las emite cada fabricante: la página en inglés lo advierte junto al enlace
 * en vez de dar a entender que existe una versión traducida.
 */

export interface ProductoEn {
  nombre: string;
  resumen: string;
  descripcion: string[];
  caracteristicas: string[];
  presentacion?: string;
  usos?: string[];
  /** Detalle de cada variante, indexado por su código. */
  variantes?: Record<string, string>;
  /**
   * Rótulo de la variante, cuando no es un código de fabricante sino un
   * nombre traducible (una fragancia, una talla descrita en palabras).
   */
  codigos?: Record<string, string>;
}

export const productosEn: Record<string, ProductoEn> = {
  /* ------------------------------------------------------------- Biosafety */
  'contenedores-punzocortantes': {
    nombre: 'Sharps containers',
    resumen:
      'Nine capacities, from 0.95 L to 30.3 L, with a permanent-lock lid and a ' +
      'built-in needle remover.',
    descripcion: [
      'Containers for sharps waste, designed to streamline the handling and ' +
        'disposal of hazardous waste single-handed across every kind of ' +
        'healthcare facility.',
      'Each unit consists of two parts —body and lid— and the range covers ' +
        'everything from the phlebotomy cart to high-volume collection points, ' +
        'so that every department uses the format that suits it.',
    ],
    caracteristicas: [
      'Puncture-resistant to international standard',
      'Polyhedral container with a rectangular base and side handles for safe transport',
      'Transparent swing lid on a pivot that prevents the hand from reaching inside',
      'Two irreversible final-closure catches',
      'Built-in needle-removal system',
      'Translucent red body, so the fill level stays visible',
      'Free of burrs and sharp edges',
      'Biohazard labelling and maximum fill line',
    ],
    presentacion:
      'Corrugated cardboard box. The number of units per box varies with the ' +
      'capacity of the container.',
    variantes: {
      MA1112: '0.95 L — phlebotomy',
      MA1122: '1.89 L — phlebotomy',
      '1024': '3.0 L',
      MA1212: '4.7 L',
      '1033': '7.0 L',
      ME1282: '7.6 L',
      MA1331: '11.4 L (3 gal)',
      MA1341: '22.7 L',
      MA1352: '30.3 L',
    },
  },

  'contenedores-citotoxicos': {
    nombre: 'Containers for cytotoxic waste, special waste and glass',
    resumen:
      'Yellow line for chemotherapy, special waste and glass disposal, from ' +
      '3.8 L to 30.3 L.',
    descripcion: [
      'Rigid containers for the disposal of material contaminated with ' +
        'cytostatic drugs, of special waste and of glass, set apart from the ' +
        'rest of the biosafety line by colour and labelling.',
      'The yellow identification and the matching pictogram let staff segregate ' +
        'correctly at the point of generation, a requirement of the solid waste ' +
        'management plan of every healthcare facility.',
    ],
    caracteristicas: [
      'Specific labelling for cytotoxic waste, special waste or glass',
      'Regulatory yellow identification colour',
      'Resistant to puncture and perforation',
      'Permanent-lock lid with catches',
      'Side handles for safe transport',
      'Consistent dimensions that make stacking easier',
    ],
    presentacion: 'Corrugated cardboard box according to capacity.',
    variantes: {
      MC1311: '3.8 L — cytotoxic',
      MC1321: '7.6 L — cytotoxic',
      'MC1321-R': '7.6 L — special waste',
      MC1351: '30.3 L — cytotoxic',
      MV1311: '3.8 L — glass',
    },
  },

  'alfombra-descontaminante': {
    nombre: 'Adhesive decontamination mat (Clean Mat)',
    resumen:
      'Multi-layer 30-sheet mat with antibacterial adhesive for entry into ' +
      'controlled areas.',
    descripcion: [
      'Adhesive cleanroom mat made up of 30 polyethylene sheets. Each sheet is ' +
        'coated with a high-technology adhesive containing antibacterial agents.',
      'It captures dirt, germs and dust from foot traffic and equipment wheels ' +
        'before they reach the controlled environment. Once a sheet is ' +
        'saturated it is peeled away and the next one is ready.',
    ],
    caracteristicas: [
      'Water-based adhesive with a broad-spectrum biocide',
      '30 numbered sheets per unit',
      'Heat-resistant and resistant to oily substances, UV light and ageing',
      '36" × 45" format (SM3645B4)',
    ],
    presentacion: 'Cardboard box containing four mats of 30 sheets each.',
    usos: [
      'Entry to operating theatres and cleanrooms',
      'Laboratories and pharmaceutical production',
      'Food production and data centres',
    ],
  },

  /* ------------------------------------------------------------- Antisepsis */
  'aplicador-clorhexidina-2': {
    nombre: 'NEX CLOREX 2% PREP sterile applicator',
    resumen:
      'Single-use applicator with 2 % chlorhexidine gluconate in 70 % ' +
      'isopropyl alcohol, in three volumes.',
    descripcion: [
      'NEX CLOREX 2% PREP is a single-use applicator holding an advanced ' +
        'antiseptic solution of 2 % chlorhexidine gluconate in 70 % isopropyl ' +
        'alcohol, with broad-spectrum biocidal action against bacteria, ' +
        'mycobacteria, fungi and viruses.',
      'Its design allows several areas of the patient to be disinfected without ' +
        'touching them directly, which lowers the risk of contamination while ' +
        'preparing the surgical field and inserting vascular access.',
    ],
    caracteristicas: [
      '2 % chlorhexidine gluconate in 70 % isopropyl alcohol',
      'Broad biocidal spectrum: bacteria, mycobacteria, fungi and viruses',
      'Applied without the operator touching the skin',
      'Individual blister of medical-grade polyethylene and Tyvek paper',
      'Peel-open pack',
      'Latex free',
    ],
    presentacion:
      'Medical-grade cardboard dispenser box with 10 or 11 blisters depending ' +
      'on the code; each blister holds one applicator.',
    variantes: {
      '3 mL': 'Vascular access and minor procedures',
      '10.5 mL': 'Medium surgical fields',
      '26 mL': 'Large surgical fields',
    },
  },

  'cepillo-esponja-clorhexidina-4': {
    nombre: 'NEX CLOREX C2 CHG 4 % surgical scrub brush-sponge',
    resumen:
      'Single-use brush-sponge with nail cleaner, impregnated with about ' +
      '20 mL of chlorhexidine digluconate.',
    descripcion: [
      'Single-use surgical scrub brush-sponge, nail cleaner included, ' +
        'impregnated with approximately 20 mL of 4 % chlorhexidine digluconate ' +
        'antiseptic solution.',
      'It is intended for the surgical hand scrub of the clinical team before ' +
        'entering the operating theatre.',
    ],
    caracteristicas: [
      '4 % chlorhexidine digluconate, about 20 mL per unit',
      'Ergonomic shape that allows a firm grip',
      'Highly flexible brush for precise hand cleaning',
      'Nail cleaner included in the blister',
      'Single use',
    ],
    presentacion:
      'Dispenser box with 40 high-density polyethylene blisters; outer ' +
      'corrugated box of 6 dispensers.',
  },

  'esponja-clorhexidina-2': {
    nombre: 'NEX CLOREX C2 CHG 2 % antiseptic sponge',
    resumen:
      'Single-use polyurethane sponge with about 20 mL of 2 % chlorhexidine ' +
      'gluconate for the antiseptic washing of intact skin.',
    descripcion: [
      'Single-use polyurethane sponge for the antiseptic washing of the skin, ' +
        'impregnated with approximately 20 mL of broad-spectrum antiseptic ' +
        'solution. A biocide for human hygiene on intact skin.',
    ],
    caracteristicas: [
      '2 % chlorhexidine gluconate, about 20 mL per unit',
      'Polyurethane sponge with high solution retention',
      'High-density polyethylene peel-open blister',
      'Model code SPNEXC2SP022',
      'Single use',
    ],
    presentacion:
      'Corrugated cardboard dispenser box with 80 individual blisters.',
  },

  'toallitas-limpieza-piel': {
    nombre: 'Longood skin cleansing wipes',
    resumen:
      'Individual sachets with 1.5 mL of 2 % chlorhexidine in 70 % isopropyl ' +
      'alcohol, box of 200 units.',
    descripcion: [
      'Single-use wipe impregnated with an antiseptic solution of 2 % ' +
        'chlorhexidine gluconate in 70 % isopropyl alcohol, for cleaning intact ' +
        'skin before punctures, wound care or dressing placement.',
    ],
    caracteristicas: [
      '1.5 mL of antiseptic solution per sachet',
      'Airtight foil sachet that opens easily',
      'Reference K-YX/5*5',
      'External use, single use',
    ],
    presentacion: 'Box of 200 individual sachets.',
  },

  /* ------------------------------------------------------------ Laparoscopy */
  'trocares-desechables': {
    nombre: 'GEYI disposable trocars',
    resumen:
      'Type III trocar with safety tip and shielded blade, for 5 to 15 mm ' +
      'instruments. Available as kits A, B and C.',
    descripcion: [
      'Medical device designed to create a working channel into the internal ' +
        'cavity, allowing surgical instruments from 5 mm to 15 mm in diameter ' +
        'to be introduced during laparoscopic procedures.',
      'The GYTR-III model has a safety tip with a shielded blade that retracts ' +
        'on passing through the abdominal wall, reducing the risk of injury to ' +
        'internal structures.',
    ],
    caracteristicas: [
      'Type III model (GYTR-III) with safety tip and shielded blade',
      'Working channel for instruments from 5 mm to 15 mm',
      'Double airtight seal',
      'Threaded cannula that minimises trauma to the skin',
      'Retractable tip with a fine blade that reduces the size of the wound',
      'Sterile, hypoallergenic, non-toxic and biocompatible',
      'Hermetically sealed preformed blister of PET and Tyvek paper',
      'Trocar packed in two parts inside the blister',
      'Peel-open pack',
      'Sterile, single use',
    ],
    presentacion:
      'Medical-grade cardboard box with one blister. Corrugated cardboard ' +
      'shipper holding 20 boxes.',
    variantes: {
      'GYTR-III': 'Individual trocar with safety tip',
      'Kit A':
        '2 cannulas of 5 mm and 2 of 10 mm with stopcock · obturators with ' +
        'dilating tip of 5 and 10 mm · Veress needle · 250 mL bag',
      'Kit B':
        '2 cannulas of 5 mm and 1 of 10 mm with stopcock · obturators with ' +
        'dilating tip of 5 and 10 mm · Veress needle · 250 mL bag',
      'Kit C':
        '3 cannulas of 5 mm and 1 of 10 mm with stopcock · obturators with ' +
        'dilating tip of 5 and 10 mm · Veress needle · 250 mL bag',
    },
  },

  /* ---------------------------------------------------------------- Suction */
  'bolsas-aspiracion': {
    nombre: 'VIDE® suction bags',
    resumen:
      'Disposable bags from 1000 to 3000 mL, identified by elbow colour, for ' +
      'use with the reusable rigid canister.',
    descripcion: [
      'VIDE® suction containers and bags are intended for use as a temporary ' +
        'storage container for secretions or fluids removed from the human body.',
      'The bags are disposable and work inside a reusable rigid canister, ' +
        'installed in the different hospital areas according to what each ' +
        'department needs. Each bag is designed for a single patient.',
      'The device is not intended to channel or store blood, body fluids, ' +
        'tissue, liquids or gases for the purpose of infusion, administration ' +
        'or introduction into the body.',
    ],
    caracteristicas: [
      'Low-density polyethylene (LDPE) bag that guarantees an airtight seal',
      'Colour-coded elbow according to capacity',
      'Free of burrs and sharp edges',
      'Free of foreign particles',
      'Airtight lid sealed at the factory',
      'Single patient use',
      'Compatible with the full VIDE® range of stands and accessories',
      'Recommended by the Peruvian College of Nurses',
    ],
    presentacion:
      'Suction bag in individual packaging. Cardboard box holding 50 ' +
      'individually packed bags.',
    variantes: {
      'MI285-0008': '1000 mL — yellow elbow',
      'MI286-0008': '1500 mL — purple elbow',
      'MI287-0008': '2000 mL — light blue elbow',
      'MI288-0008': '3000 mL — green elbow',
    },
  },

  'canister-reusable': {
    nombre: 'VIDE® reusable rigid canister',
    resumen:
      'Transparent graduated cylindrical holder with stopcock and a 28 cm ' +
      'connecting hose.',
    descripcion: [
      'VIDE® canisters are intended for use solely as a holder and container ' +
        'for the disposable suction bags of the same brand.',
      'They come with a stopcock and a connecting hose that fits the suction ' +
        'bag. They are fully transparent and cylindrical, graduated in mL and cc.',
    ],
    caracteristicas: [
      'Fully transparent cylindrical shape',
      'Graduation in white lettering every 100 mL',
      'Built-in stopcock',
      'Flexible 28 cm connecting hose',
      'Impact-resistant material',
      'Reusable',
    ],
    presentacion:
      'Multi-pack cardboard box with the canisters individually wrapped in ' +
      'bubble bags.',
    variantes: {
      'MI129-0013': 'For the 1000 mL bag — yellow marking',
      'MI358-0013': 'For the 1500 mL bag — purple marking',
      'MI301-0013': 'For the 2000 mL bag — light blue marking',
      'MI302-0013': 'For the 3000 mL bag — green marking',
    },
  },

  'accesorios-aspiracion': {
    nombre: 'VIDE® suction stands and accessories',
    resumen:
      'Rolling stands, wall plate and 2- or 4-way manifold to complete the ' +
      'installation in each area.',
    descripcion: [
      'A range of accessories for mounting the suction system at the point of ' +
        'use: rolling stands of different heights, a wall-mounting plate and a ' +
        'manifold for connecting several canisters to a single vacuum outlet.',
    ],
    caracteristicas: [
      'Rolling stands of 37 cm, 56 cm and 106 cm',
      'Wall-mounting plate',
      '2-way and 4-way manifold',
      'Compatible with the entire VIDE® canister and bag range',
    ],
  },

  'tubuladura-succion-esteril': {
    nombre: 'Sterile suction tubing without Yankauer handle',
    resumen:
      '3 m connecting tube with two connectors and an adapter, sterile and ' +
      'disposable, in 1.8 mm and 3 mm.',
    descripcion: [
      'Disposable medical device made up of a connecting tube, two connectors ' +
        'and an adapter. Intended for conducting aspirated body fluids —blood ' +
        'and secretions— during surgical procedures.',
      'It may also be used to conduct other medical liquids and gases.',
    ],
    caracteristicas: [
      '3 m long with a 9/32" (7 mm) adapter',
      'Double protection: mixed-sleeve pouch plus an inner bag',
      '45–47 µ high-density polyethylene film and 70 g/m² Tyvek paper',
      'Peel-open pack',
      'Sterile, single use',
    ],
    presentacion: 'Box holding 50 units in individual pouches.',
    variantes: {
      F30A18: '1.8 mm inner diameter',
      F30A30: '3 mm inner diameter',
    },
  },

  'tubuladura-silicona': {
    nombre: 'SILPAK silicone hoses and tubing',
    resumen:
      '25 m rolls of 100 % silicone, stable from −50 °C to +250 °C, in a range ' +
      'of diameters.',
    descripcion: [
      'Hoses supplied in rolls of 100 % silicone, a supply item that can be ' +
        'prepared for a variety of hospital uses. Each roll is 25 m long and is ' +
        'offered in a range of diameters.',
    ],
    caracteristicas: [
      'Soft, natural feel',
      'Transparent white, so fluids and bubbles stay visible',
      'Non-collapsible: avoids kinking',
      'Does not allow clots or adhesions to lodge',
      'Fully water-repellent and non-toxic',
      'Prevents bacterial colonies from developing',
      'Keeps its properties from −50 °C to +250 °C',
      'Can be sterilised by any method',
      'Manufactured in an aseptic environment',
      'Reference SILNIONE MM 71160U',
    ],
    presentacion:
      'Cardboard box holding 20 or 16 rolls depending on diameter; each roll ' +
      'in its own bag.',
    usos: [
      'Suction tubing',
      'Anaesthesia machine drainage',
      'Haemodialysis machine circuits',
    ],
  },

  /* -------------------------------------------------------- Enteral feeding */
  'bomba-nutricion-enteral': {
    nombre: 'MEDCAPTAIN EP-60 enteral feeding pump',
    resumen:
      '4" touchscreen, 1 to 1200 mL/h range, optional warmer and a link to ' +
      'central monitoring.',
    descripcion: [
      'The EP-60 Enteral Feeding Pump is easy to operate, designed with ' +
        'several safety programmes and an automatic anti-occlusion function. It ' +
        'has a four-inch touchscreen, a robust housing and an optional warmer.',
      'It delivers nutritional solutions into the patient’s intestine or ' +
        'stomach. It may be used with adults and children —not neonates— in ' +
        'hospitals, clinics and geriatric centres.',
    ],
    caracteristicas: [
      'Feeding rate from 1 to 1200 mL/h',
      'Solution warming with temperature adjustment',
      '4" touchscreen with night mode',
      'Automatic anti-occlusion function',
      'Wireless and wired network for connection to central infusion monitoring',
      'Nurse call function',
      'Triple power supply: mains, internal battery and backup',
    ],
    variantes: {
      'EP-60': 'Compatible with enteral bags from a range of brands',
      'EP-60C': 'Compatible only with bags of the same brand',
    },
  },

  'bolsa-nutricion-enteral': {
    nombre: 'Enteral feeding bag',
    resumen:
      'Sterile 500 mL and 1000 mL bags for use with enteral formulas and ' +
      'access devices. Not for intravenous use.',
    descripcion: [
      'Medical device intended for use with enteral formulas and enteral ' +
        'access devices. It is not for intravenous use.',
      'The design of the connector and of the labelling clearly distinguishes ' +
        'the enteral route from the intravenous route, a safety measure ' +
        'established to prevent misconnection errors.',
    ],
    caracteristicas: [
      'Individual pouch of polyethylene film (45–47 µ) and Tyvek paper (70 g/m²)',
      'Peel-open pack with a 1 to 2 cm edge',
      'Labelling entirely in Spanish, as required by the national authority',
      'DEHP-free PVC',
      'Accurate measuring scale and a self-adhesive label for recording the volume',
      'Y-port for adding supplementary substances',
      'Compatible with enteral feeding pumps',
      'Free of particles, burrs and sharp edges',
      'Sterile',
    ],
    presentacion: 'Cardboard box holding 30 individual pouches.',
    variantes: {
      'B-500': '500 mL',
      'B-1000-SE2': '1000 mL',
    },
  },

  'set-alimentacion-enteral': {
    nombre: 'Enteral feeding set with bottle thread',
    resumen:
      'Sterile set connecting the formula bottle to the patient’s gastric ' +
      'tube. Code B-SG002B.',
    descripcion: [
      'The Enteral Feeding Bottle Set is used together with an enteral feeding ' +
        'bag and a gastric tube. In use it stays connected to the tube inserted ' +
        'into the patient’s stomach, delivering the nutritional solution ' +
        'directly.',
      'It should be used under the supervision of a physician or of staff ' +
        'trained in aseptic technique, medication management, infusion therapy ' +
        'and infection control.',
    ],
    caracteristicas: [
      'Thread compatible with enteral formula bottles',
      'Polyethylene and medical-grade paper pouch',
      'Peel-open pack',
      'Reference code B-SG002B',
      'Sterile, single use',
    ],
    presentacion:
      'Corrugated cardboard box of 30 individual pouches; one device per pouch.',
  },

  /* ------------------------------------------------------------- Airway */
  videolaringoscopio: {
    nombre: 'MEDCAPTAIN VS-10 video laryngoscope',
    resumen:
      '3.5" colour LCD touchscreen, photo and video recording, at least four ' +
      'hours of battery and HDMI output.',
    descripcion: [
      'The MEDCAPTAIN video laryngoscope uses camera technology to visualise ' +
        'the larynx and make endotracheal intubation straightforward for the ' +
        'clinician.',
      'It is designed so that medical staff can lift the patient’s epiglottis ' +
        'and expose the glottis for precise tracheal intubation while ' +
        'administering anaesthesia or first aid. It is also used for intraoral ' +
        'examination and treatment.',
    ],
    caracteristicas: [
      'Compatible with blades in every size: neonate, infant, child, adult and older adult',
      '3.5-inch colour LCD touchscreen with adjustable brightness',
      'LED light source with adjustable brightness',
      'Automatic white balance and high resolution',
      'Anti-fog coating, with no need to pre-warm the blade',
      'Rechargeable lithium battery lasting no less than 4 hours',
      'Photo capture and video recording',
      'Wired and wireless file transfer; HDMI port',
      'Ergonomic handle',
    ],
    variantes: {
      'VS-10S': 'Standard configuration',
      'VS-10M': 'Mid configuration',
      'VS-10H': 'High configuration',
    },
  },

  'hojas-videolaringoscopio': {
    nombre: 'Disposable video laryngoscope blades',
    resumen:
      'Polycarbonate blades in every size, including difficult airway and ' +
      'obese patient.',
    descripcion: [
      'The disposable laryngoscope blade is designed for use with the video ' +
        'laryngoscope. It is available in several presentations to suit the ' +
        'patient: infant, child, adult, patients with breathing difficulties ' +
        'and obese patients. Made of polycarbonate.',
    ],
    caracteristicas: [
      'Medical-grade polycarbonate',
      'Sizes for infant, child, adult, difficult airway and obese patient',
      'Medical-grade paper and polyethylene pouch per unit',
      'Single use: no reprocessing and no cross-contamination',
    ],
    presentacion:
      'Medical-grade cardboard box holding 12 pouches; one unit per pouch.',
  },

  /* --------------------------------------------------------- Patient hygiene */
  'pano-bano-facil': {
    nombre: 'Baño Fácil soap-impregnated washcloths',
    resumen:
      'Rinse-free bed bath in three formulations: aloe vera, chlorhexidine and ' +
      'chamomile.',
    descripcion: [
      'Non-woven cloth soaked in a soap solution for the personal hygiene of ' +
        'the bedridden patient. It needs no rinsing, which cuts both procedure ' +
        'time and water use on the ward.',
      'Each cloth measures 20 × 20 cm and holds 1.5 g of cleansing agent, with ' +
        'a pH of 5.8 to 6.5, compatible with the skin.',
    ],
    caracteristicas: [
      'Disposable and rinse-free',
      'Surface of 400 cm² (20 × 20 cm) with 1.5 g of cleansing agent',
      'Weight of 100 g/m² (± 10 g/m²)',
      'pH of 5.8 to 6.5 and density of 1.010 to 1.070 g/mL',
      'Foam control of 8 to 12 mL',
      'Free of latex and heavy metals',
      'Non-sterile, hypoallergenic and non-toxic',
    ],
    presentacion:
      'Box holding 100 biaxially oriented polypropylene (BOPP) bags; each bag ' +
      'with 10 cloths.',
    codigos: {
      'Aloe vera': 'Aloe vera',
      Clorhexidina: 'Chlorhexidine',
      Manzanilla: 'Chamomile',
    },
    variantes: {
      'Aloe vera': 'Light blue',
      Clorhexidina: 'Green',
      Manzanilla: 'Pink',
    },
  },

  'toalla-secado-corporal': {
    nombre: 'Q-MEDICAL body drying towel',
    resumen:
      'Single-use towel of 130 × 65 cm, absorbency ≥ 5 mL/g and 80 % ' +
      'biodegradable.',
    descripcion: [
      'White body drying towel, individually packed in a plastic bag with a ' +
        'top handle and a tear line for easy opening. Soft to the touch, highly ' +
        'absorbent and strong.',
    ],
    caracteristicas: [
      'Size of 130 cm × 65 cm (± 5 %)',
      'Absorbency ≥ 5 mL/g and absorption rate ≥ 55 mm/60 s',
      'Base weight of 80 g',
      '80 % biodegradable',
      'Free of heavy metals (As, Cd, Cr, Pb, Sb, Hg) and odourless',
      'Near-neutral pH',
      'Non-sterile (aseptic), single use',
    ],
    presentacion: 'Cardboard box holding 130 bags; one towel per bag.',
    usos: [
      'Body drying in hospitals and geriatric centres',
      'Patient care at home',
      'Spas, gyms, hotels and wet areas',
    ],
  },

  'pano-clinico-qmedical': {
    nombre: 'Q-MEDICAL super-absorbent clinical wipe',
    resumen:
      'White single-use wipe with an embossed surface, in a dispenser bag of ' +
      '50 units.',
    descripcion: [
      'Clinical wipe well suited to reducing the risk of cross-contamination ' +
        'in healthcare institutions and laboratories. The dispenser bag lets ' +
        'wipes be drawn one at a time while the rest of the contents stay clean.',
    ],
    caracteristicas: [
      'White, soft to the touch',
      'Embossed surface for greater pick-up',
      'Free of burrs, sharp edges, foreign particles and staining',
      'Composition: 80 % cellulose and 20 % emulsion',
      'Tear-resistant and does not shed particles',
      'Does not irritate the skin',
      'Code PCA-8020SA',
      'Single use',
    ],
    presentacion:
      'Cardboard box of 12 LDPE dispenser bags; each bag with 50 wipes.',
  },

  'pano-clinico-telijie': {
    nombre: 'TELIJIE absorbent clinical wipe',
    resumen:
      'Four-ply wipe reinforced with a cotton-thread mesh, in a resealable ' +
      'dispenser bag.',
    descripcion: [
      'Clinical wipes well suited to reducing the risk of cross-contamination ' +
        'in healthcare institutions and laboratories. The practical pack lets ' +
        'wipes be drawn from the end and closed again, so they stay clean ' +
        'throughout.',
    ],
    caracteristicas: [
      'Four plies reinforced with an inner cotton-thread mesh',
      'Resealable LDPE dispenser bag',
      'Code PCA-001SP',
      'Single use',
    ],
    presentacion: 'Cardboard box holding 30 bags; each bag with 50 wipes.',
    usos: [
      'Surgical hand drying',
      'Patient bathing',
      'Cleaning of surgical instruments and medical equipment',
    ],
  },

  'bolsa-vomito': {
    nombre: 'Emesis bag',
    resumen:
      'Translucent blue bag with a rigid ring and graduation, 100 % ' +
      'recyclable. Box of 500 units.',
    descripcion: [
      'Device intended to collect and contain vomit, both in hospital and in ' +
        'passenger transport. Its rigid ring and closure make it easy to handle ' +
        'and dispose of without exposure.',
    ],
    caracteristicas: [
      'Translucent blue bag, so the contents level stays visible',
      'Removes the exposure of patient and clinical staff to the emesis',
      '100 % recyclable',
      'Free of latex, heavy metals and phthalates',
      'Reference PMID01',
      'Non-sterile',
    ],
    presentacion:
      'Cardboard box holding 500 units in 20 bags of 25 pieces.',
  },

  /* ------------------------------------------------------------- Absorbents */
  'manta-absorbente-jiehong': {
    nombre: 'JIEHONG fluid-absorbent mat',
    resumen:
      'Waterproof, non-slip floor mat, absorbency > 3.0 L/m². Also available ' +
      'pre-cut.',
    descripcion: [
      'Medical device designed to keep the operating theatre floor clean and ' +
        'dry, preventing slips during surgical procedures that produce heavy ' +
        'fluid loss.',
      'The reversible pre-cut version lets the size of the mat be matched to ' +
        'the surface being protected without tools.',
    ],
    caracteristicas: [
      'Waterproof, non-slip bottom layer',
      'High liquid absorbency: > 3.0 L/m²',
      'Immediate absorption of saline solutions, blood and body fluids',
      'Adapts to different surfaces without bunching',
      'Three laminated layers',
      'Dimensions of 36 × 44 inches (91.4 × 111.8 cm), about 455 g',
      'Disposable',
    ],
    presentacion: 'Individually packed in a low-density polyethylene bag.',
    variantes: {
      Q202: 'Continuous floor mat',
      Reversible: 'Double-sided, pre-cut',
    },
  },

  'manta-absorbente-xodus': {
    nombre: 'The Camel non-slip absorbent mat — XODUS',
    resumen:
      'Ultra-absorbent with a non-slip waterproof backing: 4.44 L per mat, ' +
      '5.53 L/m².',
    descripcion: [
      'Medical device designed to help keep the operating theatre clean, dry ' +
        'and safe from slips, falls and contaminants.',
    ],
    caracteristicas: [
      'Absorbency of 4.44 L per mat (5.53 L/m²)',
      'Smooth, compact surface with pores for immediate absorption',
      'Absorbs blood, body fluids and caustic agents',
      'Waterproof: holds the fluid and stops sludge forming',
      'Non-slip base',
      'Easy to lay down and remove',
      'Reference 80522',
    ],
    presentacion: 'Box of 12 individual units.',
  },

  'protector-impermeable': {
    nombre: 'MEDISPO waterproof plastic-backed protector',
    resumen:
      'Mattress protector with a semi-permeable top layer and a waterproof ' +
      'bottom barrier.',
    descripcion: [
      'Waterproof protective sheet, well suited to covering and protecting ' +
        'surfaces that are hard to clean and dry after spills of fluids such as ' +
        'water or urine.',
    ],
    caracteristicas: [
      'White semi-permeable top layer',
      'Waterproof bottom barrier',
      'Individual PE bag that guarantees an airtight seal',
      'Code HQ201512',
      'Disposable',
    ],
    presentacion:
      'Cardboard box holding 60 protectors, each in its own bag.',
  },

  /* ----------------------------------------------------------- Instruments */
  'marcador-piel-esteril': {
    nombre: 'Q-MEDICAL sterile disposable skin marker',
    resumen:
      'Sterile marker with a surgical ruler included, in an individual ' +
      'blister. Reference 663 022.',
    descripcion: [
      'Sterile markers designed to make it easier to identify and outline the ' +
        'surgical field on the skin where the procedure will be carried out, so ' +
        'that the exact site of the incision can be located safely and ' +
        'reliably. A ruler is included.',
    ],
    caracteristicas: [
      'Surgical ruler included in every blister',
      'Primary pack of medical-grade paper and polyethylene film',
      'Peel-open pack',
      'Reference 663 022',
      'Hypoallergenic and latex free',
      'Helps prevent surgical site infections',
      'Sterile, single use',
    ],
    presentacion:
      'Card box with 25 blisters; corrugated shipper of 10 boxes.',
  },

  'marcador-piel-no-esteril': {
    nombre: 'XODUS non-sterile surgical marker',
    resumen:
      'Marker for drawing directly on the skin, small format. Reference ' +
      'NS10402.',
    descripcion: [
      'Non-sterile surgical marker for drawing directly on the skin, in a ' +
        'small format, intended for preoperative marking outside the sterile ' +
        'field.',
    ],
    caracteristicas: [
      'Draws directly on the skin',
      'Small format (Correct Site Marker)',
      'Reference NS10402',
      'Non-sterile',
    ],
  },

  'bolsa-conteo-gasas': {
    nombre: 'Gauze and sponge counting bag',
    resumen:
      'Five-pocket plastic strip for a verifiable gauze count during the ' +
      'procedure. Reference RIP-003.',
    descripcion: [
      'Device used mainly in operating theatres to make it easier to organise ' +
        'and verify the count of gauzes, swabs or surgical sponges used during ' +
        'a procedure.',
      'It is designed to safeguard the patient and prevent gauzes from being ' +
        'accidentally left inside the body, a situation known as a textiloma or ' +
        'gossypiboma.',
    ],
    caracteristicas: [
      'Plastic strip with five transparent pockets',
      'Lets the surgical team verify the count visually',
      'Medical-grade card dispenser box',
      'Reference RIP-003',
    ],
    presentacion:
      'Dispenser box with 50 bags; cardboard box of 8 dispensers (400 units).',
  },

  'limpiador-puntas-electrocauterio': {
    nombre: 'Electrosurgical tip cleaner',
    resumen:
      'Disposable abrasive pad for removing eschar from the electrosurgical ' +
      'pencil without damaging the tip.',
    descripcion: [
      'Medical device designed to clean the tips of electrosurgical pencils ' +
        'safely and effectively, keeping cutting and coagulation efficient ' +
        'throughout the procedure.',
    ],
    caracteristicas: [
      'Individual pouch in a mixed sleeve of LDPE and medical-grade paper',
      'Peel-open pack',
      'Reference Type A',
      'Single use',
    ],
    presentacion:
      'Box of 200 individual pouches; shipper of 4 boxes (800 pouches).',
  },

  'cepillos-limpieza-instrumental': {
    nombre: 'Brushes for cleaning medical instruments',
    resumen:
      'A family of brushes with nylon and brass bristles for manual cleaning ' +
      'in the sterile processing department.',
    descripcion: [
      'A range of brushes for the manual cleaning of surgical instruments in ' +
        'the sterile processing department. It includes fine-bristle formats ' +
        'for lumens and joints, and brass bristles for stubborn deposits.',
      'The ergonomic handles with a hanging hole keep the brush tidy and let ' +
        'it dry between uses.',
    ],
    caracteristicas: [
      'Nylon and steel bristles depending on the format',
      'Ergonomic handle with a hanging hole',
      'Double-headed formats for cleaning grooves',
      'Latex free',
      'Non-sterile',
    ],
    variantes: {
      'N-2100': 'White nylon brush · 17.78 cm · 3.6 cm bristle',
      'S-2100': 'Steel-bristle brush · 17.78 cm',
      'D-2100': 'White nylon brush · 17.78 cm · 3.6 cm bristle',
      'N-2121': 'Double head: white nylon and steel · 17.78 cm',
      'N-3000': 'Antimicrobial bristles · block handle · 17.78 cm',
      'N-4000': '16 rows of antimicrobial bristles · anatomical handle · 18 cm',
    },
  },

  /* --------------------------------------------------- Personal protection */
  'guantes-nitrilo': {
    nombre: 'COMFORT 6.5 g nitrile gloves',
    resumen:
      'High-risk glove, latex and powder free, resistant to chemical and ' +
      'cytostatic agents.',
    descripcion: [
      'Medical gloves made to protect against chemical, microbiological and ' +
        'cytostatic hazards. They protect against contamination in procedures ' +
        'with high-risk patients, the handling of oncology drugs, chemical ' +
        'treatments and the treatment of metals with solvents.',
    ],
    caracteristicas: [
      'High-risk nitrile, non-sterile and ambidextrous',
      'Textured fingertip for better grip; smooth inner surface',
      'Powder free (residue ≤ 2 mg per glove) and latex free',
      'Chlorinated to ensure residual contamination is removed',
      'Resistant to penetration by aldehydes, alkalis, benzenes and other agents',
      'Resistant to permeation by cytotoxic substances',
      'Tensile strength ≥ 14 MPa before and after ageing',
      'Elongation ≥ 500 % before ageing',
      'Hypoallergenic, blue',
    ],
    presentacion: 'Multi-pack cardboard box.',
    variantes: {
      '6.5 g · S': 'Length 300 mm · width 85 ± 5 mm · palm 0.10 mm · fingers 0.15 mm',
      '6.5 g · M': 'Length 300 mm · width 95 ± 5 mm · palm 0.10 mm · fingers 0.15 mm',
      '6.5 g · L': 'Length 300 mm · width 105 ± 5 mm · palm 0.10 mm · fingers 0.15 mm',
      '6.5 g · XL': 'Length 300 mm · width 115 ± 5 mm · palm 0.10 mm · fingers 0.15 mm',
      '3.5 g · S/M/L': 'Length 240 mm · palm 0.07 mm · fingers 0.10 mm — examination line',
    },
  },
};
