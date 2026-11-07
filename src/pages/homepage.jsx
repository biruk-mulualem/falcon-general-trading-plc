import { useState, useEffect } from 'react'
import {
  Menu, X, Cog, HardHat, ShoppingCart,
  Phone, Mail, MapPin, MessageCircle,
  Truck, Beaker, Factory, Paintbrush, Building2, Zap, ArrowLeft, ArrowRight,
  ShieldCheck, Globe, Anchor, CheckCircle2, Target, Package
} from 'lucide-react'

/* ---------------- CUSTOM BRAND LOGO (SVG) ---------------- */
const FalconLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L60 25 L80 20 L75 40 L95 45 L75 60 L85 80 L60 75 L50 95 L40 75 L15 80 L25 60 L5 45 L25 40 L20 20 L40 25 Z" fill="#C9A227" />
    <path d="M50 25 L55 45 L45 45 Z" fill="#0B2545" />
    <circle cx="50" cy="50" r="15" fill="#C9A227" />
    <path d="M40 50 L50 60 L60 50" stroke="#0B2545" strokeWidth="4" fill="none" />
  </svg>
)

/* ---------------- REAL DATA ---------------- */
const company = {
  name: 'FALCON GENERAL TRADING PLC.',
  tagline: 'Sourcing. Clearing. Delivering.',
  contactName: 'BIRUK MULUALEM',
  phone: '+251 943 087 791',
  whatsapp: '+251 943 087 791',
  email: 'biruk0571@gmail.com',
  address: 'Addis Abeba, Ethiopia',
}

const stats = [
  { value: '15+', label: 'Sourcing Countries' },
  { value: '6+', label: 'Import Sectors' },
  { value: '500+', label: 'Shipments Cleared' },
  { value: 'Nationwide', label: 'Distribution' },
]

const sectors = [
  {
    id: 'machinery', icon: Cog, title: 'Industrial Machinery', desc: 'Heavy machinery, manufacturing equipment, and spare parts for factories.',
    detailTitle: 'Industrial Machinery & Equipment',
    detailText: 'We import heavy-duty machinery and precise factory equipment from global leaders (China, Germany, Turkey) to power Ethiopian manufacturing. Our logistics team handles the complex loading, securing, and shipping of oversized industrial equipment directly to your factory floor.',
    images: [
      { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Heavy machinery loading' },
      { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Factory equipment transport' }
    ]
  },
  {
    id: 'vehicles', icon: Truck, title: 'Vehicles & Transport', desc: 'Commercial trucks, heavy-duty vehicles, and fleet logistics equipment.',
    detailTitle: 'Vehicles & Fleet Transport',
    detailText: 'Falcon supplies commercial trucks, heavy construction vehicles, and fleet equipment. We specialize in RoRo (Roll-on/Roll-off) and containerized vehicle shipping, ensuring your fleet arrives at the Djibouti port and clears customs quickly so your operations never stop.',
    images: [
      { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Commercial trucks at port' },
      { url: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c813a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Heavy vehicles loaded in containers' }
    ]
  },
  {
    id: 'chemicals', icon: Beaker, title: 'Chemicals & Raw Materials', desc: 'Industrial chemicals, raw materials, and additives for manufacturing.',
    detailTitle: 'Industrial Chemicals & Raw Materials',
    detailText: 'We safely source and transport industrial chemicals, raw materials, and additives for the paint, plastics, and manufacturing sectors. We strictly adhere to international safety regulations (MSDS compliance) for handling and container loading of hazardous and non-hazardous materials.',
    images: [
      { url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Chemical containers preparation' },
      { url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Raw material drums' }
    ]
  },
  {
    id: 'construction', icon: HardHat, title: 'Construction Materials', desc: 'Steel, cement, fittings, and finishing materials for large-scale projects.',
    detailTitle: 'Construction & Building Materials',
    detailText: 'We supply major Ethiopian contractors and real estate developers with bulk steel, cement, fittings, and finishing materials. We handle bulk break-bulk shipping and heavy container loading at origin, ensuring materials arrive intact for your megaprojects.',
    images: [
      { url: 'https://images.unsplash.com/photo-1541888086925-ebc74d9d873b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Steel and cement loading' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Construction site delivery' }
    ]
  },
  {
    id: 'fmcg', icon: ShoppingCart, title: 'FMCG', desc: 'High-volume consumer goods distributed to wholesalers and retailers.',
    detailTitle: 'Fast-Moving Consumer Goods (FMCG)',
    detailText: 'We feed the Ethiopian supply chain with high-volume consumer goods, food items, and daily essentials. Our optimized container loading and local warehousing ensure fast turnarounds for distributors and retailers nationwide.',
    images: [
      { url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'FMCG container stuffing' },
      { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Retail goods distribution' }
    ]
  },
  {
    id: 'electricals', icon: Zap, title: 'Electricals & Spares', desc: 'Power equipment, cables, and industrial electrical components.',
    detailTitle: 'Electricals, Cables & Spares',
    detailText: 'From high-voltage power equipment to delicate industrial electrical components, we import reliable electrical supplies. Every shipment is packaged securely to prevent transit damage and clear customs seamlessly.',
    images: [
      { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Electrical equipment packing' },
      { url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Power components loading' }
    ]
  },
]

// RODAS PAINTS ADDED
const clients = [
  { id: 'paint', icon: Paintbrush, title: 'Paint & Coatings', desc: 'Supplying raw chemicals, pigments, and mixing machinery to top Ethiopian paint manufacturers.', list: ['Rodas Paints (Main Customer)', 'Kadisco Paint & Adhesive Industry S.C.', 'Nefas Paint & Chemicals', 'Nyala Paint Factory', 'Ethio Paint PLC'] },
  { id: 'construction', icon: Building2, title: 'Construction & Contracting', desc: 'Partnering with major real estate developers and road contractors for heavy materials.', list: ['Sunshine Construction PLC', 'MIDROC Ethiopia Construction', 'Defense Construction Enterprise', 'Flintstone Engineering'] },
  { id: 'manufacturing', icon: Factory, title: 'Manufacturing & Factories', desc: 'Equipping local production lines with industrial machinery and vital spare parts.', list: ['Amibara Industrial PLC', 'Ethiopian Plastic Industry S.C.', 'East Africa Bottling S.C. (Coca-Cola)', 'Habesha Breweries S.C.'] },
  { id: 'wholesale', icon: ShoppingCart, title: 'Wholesale & Retail', desc: 'Feeding the local supply chain with high-demand consumer goods and electronics.', list: ['Shopper\'s Supermarket', 'Alem Supermarket', 'Beles Wholesale Distributors', 'Anbessa Retail Group'] },
]

// NEW: SOURCE SUPPLIERS BASED ON UPLOADED IMAGE
const sourceSuppliers = [
  {
    region: 'China',
    flag: '🇨🇳',
    items: [
      'Long Oil (190KG/Drum)',
      'Urthane / PU (190KG/Drum)',
      'Styranated (190KG/Drum)',
      'Lacquer Thinner (165KG/Drum)'
    ]
  },
  {
    region: 'India',
    flag: '🇮🇳',
    items: [
      'Soya Solvent',
      'Panox',
      'SHMP',
      'Organic Dispersing Agent',
      'ES-4045',
      'Patad 831',
      'Caustic Soda',
      'Preservative'
    ]
  },
  {
    region: 'UAE / Global',
    flag: '🇦🇪',
    items: [
      'Industrial Additives',
      'Paint Pigments',
      'Specialty Chemicals',
      'Packaging Materials'
    ]
  }
]

const steps = [
  { n: '01', title: 'Inquiry', desc: "Tell us what you need and where you're sourcing from." },
  { n: '02', title: 'Sourcing', desc: 'We connect you with verified suppliers and negotiate terms.' },
  { n: '03', title: 'Shipping', desc: 'Consolidated freight via Djibouti or Berbera corridors.' },
  { n: '04', title: 'Delivery', desc: 'Customs cleared, warehoused, and distributed across Ethiopia.' },
]

const partnerLogos = ['Sinotruk', 'Bosch', 'Caterpillar', 'Samsung', 'Unilever', 'Philips', 'Siemens', 'Toyota', 'Cummins', 'LG Electronics', 'Nestlé', '3M']

const testimonials = [
  { quote: 'Falcon cleared our machinery shipment through Djibouti in record time. Their customs team knows the process inside out.', name: 'Abebe Tadesse', role: 'Operations Manager, Blue Nile Manufacturing' },
  { quote: "Reliable sourcing partner. We've imported three container loads of construction steel through Falcon this year alone.", name: 'Sara Mekonnen', role: 'Procurement Lead, Addis Build Co.' },
]

/* ---------------- STYLES (NAVY BLUE & GOLD) ---------------- */
const styles = `
  .fgt * { box-sizing: border-box; margin: 0; padding: 0; }
  .fgt {
    --brand: #0B2545; --brand-light: #13315C; --gold: #C9A227;
    --gold-light: #E0B93C; --text: #333333; --gray: #6b7280;
    --light: #f9fafb; --border: #e5e7eb;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: var(--text); line-height: 1.6; background: #fff;
    min-height: 100vh;
  }
  .fgt a { text-decoration: none; color: inherit; }
  .fgt .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
  .fgt .btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; border: none; font-size: 1rem; transition: all 0.2s; }
  .fgt .btn-primary { background: var(--gold); color: var(--brand); }
  .fgt .btn-primary:hover { background: var(--gold-light); }
  .fgt .btn-outline { border: 1px solid #fff; color: #fff; background: transparent; }
  .fgt .btn-outline:hover { background: #fff; color: var(--brand); }
  .fgt .section { padding: 4rem 0; }
  .fgt .section-title { font-size: 2rem; color: var(--brand); text-align: center; margin-bottom: 0.5rem; }
  .fgt .section-sub { text-align: center; color: var(--gray); max-width: 560px; margin: 0 auto 2.5rem; }

  /* Floating WhatsApp */
  .fgt .whatsapp-float { position: fixed; bottom: 30px; right: 30px; background-color: #25D366; color: white; border-radius: 50px; text-align: center; font-size: 30px; box-shadow: 2px 2px 10px rgba(0,0,0,0.3); z-index: 100; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; transition: transform 0.3s; }
  .fgt .whatsapp-float:hover { transform: scale(1.1); color: white; }
  @media (max-width: 768px) { .fgt .whatsapp-float { bottom: 20px; right: 20px; width: 50px; height: 50px; } }

  /* Navbar */
  .fgt .navbar { background: var(--brand); color: #fff; position: sticky; top: 0; z-index: 50; border-bottom: 2px solid var(--gold); }
  .fgt .navbar-inner { display: flex; justify-content: space-between; align-items: center; padding: 1rem; max-width: 1200px; margin: 0 auto; }
  .fgt .navbar-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .fgt .brand-text { font-weight: 700; font-size: 1rem; line-height: 1.2; color: #fff; letter-spacing: 1px; }
  .fgt .brand-text span { display: block; font-size: 0.65rem; color: var(--gold); font-weight: 400; letter-spacing: 2px; text-transform: uppercase;}
  .fgt .navbar-links { display: flex; gap: 1.5rem; }
  .fgt .navbar-links a { color: #fff; transition: color 0.2s; cursor: pointer; font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
  .fgt .navbar-links a:hover, .fgt .navbar-links a.active { color: var(--gold); }
  .fgt .navbar-toggle { display: none; background: none; border: none; color: #fff; cursor: pointer; }
  .fgt .navbar-mobile { display: flex; flex-direction: column; gap: 0.75rem; background: var(--brand-light); padding: 1rem; }
  @media (min-width: 769px) { .fgt .navbar-mobile { display: none !important; } }
  @media (max-width: 768px) { .fgt .navbar-links { display: none; } .fgt .navbar-toggle { display: block; } }

  /* Hero */
  .fgt .hero { background: linear-gradient(135deg, var(--brand), var(--brand-light)); color: #fff; text-align: center; padding: 7rem 1rem; border-bottom: 4px solid var(--gold); }
  .fgt .hero h1 { font-size: 2.8rem; margin-bottom: 1rem; line-height: 1.2; }
  .fgt .hero p { font-size: 1.15rem; max-width: 640px; margin: 0 auto 2rem; color: #d1d5db; }
  .fgt .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  @media (max-width: 768px) { .fgt .hero h1 { font-size: 2rem; } .fgt .hero { padding: 5rem 1rem; } }

  /* Stats */
  .fgt .stats { background: var(--brand); color: #fff; }
  .fgt .stats-inner { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1.5rem; padding: 2.5rem 1rem; max-width: 1200px; margin: 0 auto; text-align: center; }
  .fgt .stat-value { font-size: 2rem; font-weight: 700; color: var(--gold); }
  .fgt .stat-label { font-size: 0.85rem; color: #d1d5db; text-transform: uppercase; letter-spacing: 0.05em; }

  /* Why Choose Us */
  .fgt .features-section { background: #fff; }
  .fgt .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
  .fgt .feature-card { text-align: center; padding: 2rem; border: 1px solid var(--border); border-radius: 12px; background: var(--light); transition: transform 0.3s; }
  .fgt .feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
  .fgt .feature-icon { color: var(--gold); margin-bottom: 1rem; display: inline-block; padding: 1rem; background: #fff; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
  .fgt .feature-card h3 { color: var(--brand); font-size: 1.1rem; margin-bottom: 0.5rem; }
  .fgt .feature-card p { color: var(--gray); font-size: 0.9rem; }

  /* Sectors */
  .fgt .sectors-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
  .fgt .sector-card { border: 1px solid var(--border); border-radius: 8px; padding: 1.75rem; transition: all 0.25s; background: #fff; display: flex; flex-direction: column; cursor: pointer; position: relative; }
  .fgt .sector-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-3px); border-color: var(--gold); }
  .fgt .sector-card:hover .sector-arrow { opacity: 1; transform: translateX(5px); }
  .fgt .sector-icon { color: var(--gold); margin-bottom: 0.75rem; }
  .fgt .sector-card h3 { color: var(--brand); font-size: 1.1rem; margin-bottom: 0.5rem; padding-right: 2rem; }
  .fgt .sector-card p { font-size: 0.9rem; color: var(--gray); }
  .fgt .sector-arrow { position: absolute; bottom: 1.75rem; right: 1.75rem; color: var(--gold); opacity: 0; transition: all 0.3s; }

  /* NEW: Source Suppliers Section */
  .fgt .suppliers-section { background: var(--light); }
  .fgt .suppliers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
  .fgt .supplier-card { background: #fff; border-radius: 8px; border-top: 4px solid var(--gold); padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  .fgt .supplier-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
  .fgt .supplier-flag { font-size: 1.8rem; }
  .fgt .supplier-header h3 { color: var(--brand); font-size: 1.2rem; margin: 0; }
  .fgt .supplier-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .fgt .supplier-list li { font-size: 0.85rem; color: var(--gray); display: flex; align-items: flex-start; gap: 0.4rem; }
  .fgt .supplier-list li svg { color: var(--gold); flex-shrink: 0; margin-top: 2px; }

  /* Full Page Detail View */
  .fgt .page-view { animation: fadeIn 0.3s ease-in-out; padding: 3rem 0; background: var(--light); min-height: 80vh; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fgt .back-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: none; border: none; color: var(--brand); font-weight: 600; font-size: 1rem; cursor: pointer; margin-bottom: 2rem; transition: color 0.2s; }
  .fgt .back-btn:hover { color: var(--gold); }
  .fgt .page-header { background: #fff; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 2rem; border-left: 6px solid var(--gold); }
  .fgt .page-header h1 { color: var(--brand); font-size: 2.2rem; margin-bottom: 1rem; }
  .fgt .page-header p { font-size: 1.1rem; color: var(--text); line-height: 1.8; }
  .fgt .page-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
  .fgt .page-img-card { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid var(--border); }
  .fgt .page-img { width: 100%; height: 300px; object-fit: cover; display: block; }
  .fgt .page-img-caption { padding: 1.25rem; font-weight: 600; color: var(--brand); text-align: center; font-size: 1rem; background: #fff; }

  /* About Us Page */
  .fgt .about-hero { background: var(--brand); color: #fff; padding: 4rem 1rem; text-align: center; border-bottom: 4px solid var(--gold); }
  .fgt .about-hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
  .fgt .about-content { max-width: 800px; margin: 0 auto; background: #fff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-top: 6px solid var(--gold); }
  .fgt .about-content p { font-size: 1.1rem; color: var(--text); line-height: 1.8; margin-bottom: 1.5rem; }
  .fgt .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
  .fgt .about-stat-item { display: flex; align-items: center; gap: 1rem; font-weight: 600; color: var(--brand); }
  .fgt .about-stat-item svg { color: var(--gold); }

  /* Client List View */
  .fgt .client-list-card { background: #fff; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 6px solid var(--gold); max-width: 800px; margin: 0 auto; }
  .fgt .client-list-card h2 { color: var(--brand); margin-bottom: 1rem; }
  .fgt .client-list-card p { color: var(--gray); margin-bottom: 2rem; }
  .fgt .company-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
  .fgt .company-list li { background: var(--light); padding: 1rem 1.5rem; border-radius: 8px; border-left: 4px solid var(--gold); font-weight: 600; color: var(--brand); font-size: 1.1rem; display: flex; align-items: center; gap: 1rem; }
  .fgt .company-list li svg { color: var(--gold); }

  /* Clients (Home grid) */
  .fgt .clients-section { background: var(--brand); color: #fff; }
  .fgt .clients-section .section-title { color: #fff; }
  .fgt .clients-section .section-sub { color: #d1d5db; }
  .fgt .clients-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
  .fgt .client-card { background: var(--brand-light); border-radius: 8px; padding: 1.75rem; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.2s; }
  .fgt .client-card:hover { border-color: var(--gold); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
  .fgt .client-icon { color: var(--gold); margin-bottom: 0.75rem; }
  .fgt .client-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #fff; }
  .fgt .client-card p { font-size: 0.9rem; color: #d1d5db; }
  .fgt .client-card .view-link { display: block; margin-top: 1rem; color: var(--gold); font-weight: 600; font-size: 0.85rem; }

  /* Steps */
  .fgt .steps { background: var(--light); }
  .fgt .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
  .fgt .step { text-align: center; padding: 1rem; }
  .fgt .step-num { font-size: 2rem; font-weight: 700; color: var(--gold); }
  .fgt .step h3 { color: var(--brand); font-size: 1.05rem; margin: 0.5rem 0; }
  .fgt .step p { font-size: 0.9rem; color: var(--gray); }

  /* Partner Logos */
  .fgt .partners-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; text-align: center; }
  .fgt .partner-logo { padding: 1.5rem 1rem; border: 1px solid var(--border); border-radius: 6px; font-weight: 700; color: var(--gray); font-size: 1rem; display: flex; align-items: center; justify-content: center; background: var(--light); transition: all 0.3s; }
  .fgt .partner-logo:hover { background: #fff; border-color: var(--gold); color: var(--brand); box-shadow: 0 4px 10px rgba(0,0,0,0.05); }

  /* Testimonials */
  .fgt .testimonials { background: var(--light); }
  .fgt .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
  .fgt .testimonial { background: #fff; border-left: 4px solid var(--gold); padding: 1.5rem; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  .fgt .testimonial p { font-style: italic; color: var(--text); margin-bottom: 1rem; }
  .fgt .testimonial cite { display: block; font-style: normal; font-weight: 600; color: var(--brand); }
  .fgt .testimonial span { font-size: 0.85rem; color: var(--gray); }

  /* Contact */
  .fgt .contact-full { background: #fff; }
  .fgt .contact-wrapper { display: grid; grid-template-columns: 1fr; gap: 2rem; max-width: 900px; margin: 0 auto; }
  @media (min-width: 769px) { .fgt .contact-wrapper { grid-template-columns: 1fr 1.2fr; } }
  .fgt .contact-info { background: var(--brand); color: #fff; padding: 2.5rem; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; border-top: 4px solid var(--gold); }
  .fgt .contact-info h3 { font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; }
  .fgt .contact-info .contact-person { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.5rem; border-bottom: 2px solid var(--gold); padding-bottom: 0.5rem; display: inline-block; }
  .fgt .contact-info p { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.95rem; }
  .fgt .contact-info p svg { color: var(--gold); flex-shrink: 0; }
  .fgt .contact-form-box { background: var(--light); padding: 2.5rem; border-radius: 8px; border: 1px solid var(--border); }
  .fgt .contact-form-box h3 { margin-bottom: 1.5rem; color: var(--brand); }
  .fgt .contact-form-box form { display: flex; flex-direction: column; gap: 1rem; }
  .fgt .contact-form-box input, .fgt .contact-form-box select, .fgt .contact-form-box textarea { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; font-family: inherit; font-size: 0.95rem; background: #fff; }
  .fgt .contact-form-box input:focus, .fgt .contact-form-box select:focus, .fgt .contact-form-box textarea:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 2px rgba(11,37,69, 0.1); }
  .fgt .contact-form-box button { margin-top: 0.5rem; width: 100%; }

  /* Footer */
  .fgt .footer { background: var(--brand); color: #d1d5db; border-top: 4px solid var(--gold); }
  .fgt .footer-inner { max-width: 1200px; margin: 0 auto; padding: 3rem 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; }
  .fgt .footer h4 { color: var(--gold); margin-bottom: 0.75rem; font-size: 1rem; letter-spacing: 1px; text-transform: uppercase;}
  .fgt .footer p { font-size: 0.85rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
  .fgt .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); text-align: center; padding: 1.5rem; font-size: 0.8rem; color: #a3a3a3; }
`

/* ---------------- COMPONENT ---------------- */
export default function HomePage() {
  const [open, setOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [activeView, setActiveView] = useState('home') 
  const [selectedData, setSelectedData] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeView])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Sending Request...')
    setTimeout(() => {
      setFormStatus('Request sent successfully! We will reply within 2 business days.')
      e.target.reset()
    }, 1500)
  }

  const goHome = () => {
    setActiveView('home')
    setSelectedData(null)
  }

  const navigateTo = (view) => {
    setActiveView(view)
    setSelectedData(null)
  }

  const openSectorDetail = (sector) => {
    setSelectedData(sector)
    setActiveView('sector')
  }

  const openClientDetail = (client) => {
    setSelectedData(client)
    setActiveView('client')
  }

  /* --- DETAIL PAGES --- */

  if (activeView === 'about') {
    return (
      <div className="fgt">
        <style>{styles}</style>
        <nav className="navbar">
          <div className="navbar-inner">
            <div className="navbar-brand" onClick={goHome}>
              <FalconLogo size={35} />
              <div className="brand-text">FALCON GENERAL<span>TRADING PLC.</span></div>
            </div>
            <div className="navbar-links"><a onClick={goHome}>Back to Home</a></div>
          </div>
        </nav>

        <div className="page-view">
          <div className="container">
            <button className="back-btn" onClick={goHome}>
              <ArrowLeft size={20} /> Back to Home
            </button>
          </div>
          
          <div className="about-hero">
            <h1>About Falcon General Trading PLC</h1>
            <p>Your Trusted Partner for Import, Logistics, and Distribution in Ethiopia.</p>
          </div>

          <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
            <div className="about-content">
              <p>
                <strong>Falcon General Trading PLC</strong> is a premier Ethiopian import and distribution company. We bridge the gap between global manufacturers and the rapidly growing Ethiopian market. Our core focus is on providing seamless end-to-end supply chain solutions—from sourcing raw materials and industrial machinery in Asia and Europe, to clearing customs at the Djibouti corridor, and delivering directly to your factory floor or construction site.
              </p>
              <p>
                We understand the complexities of the Ethiopian import landscape. That is why we have built a team of experts dedicated to navigating customs regulations, optimizing freight costs, and ensuring your cargo arrives safely and on time. Whether you are a paint manufacturer needing raw chemicals, a construction firm needing bulk steel, or a logistics company expanding your fleet, we have the capacity and expertise to deliver.
              </p>
              
              <div className="about-stats">
                <div className="about-stat-item"><ShieldCheck size={24} /> 100% Customs Compliant</div>
                <div className="about-stat-item"><Globe size={24} /> Global Sourcing Network</div>
                <div className="about-stat-item"><Anchor size={24} /> Djibouti Corridor Experts</div>
                <div className="about-stat-item"><CheckCircle2 size={24} /> Nationwide Distribution</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeView === 'sector' && selectedData) {
    return (
      <div className="fgt">
        <style>{styles}</style>
        <nav className="navbar">
          <div className="navbar-inner">
            <div className="navbar-brand" onClick={goHome}>
              <FalconLogo size={35} />
              <div className="brand-text">FALCON GENERAL<span>TRADING PLC.</span></div>
            </div>
            <div className="navbar-links"><a onClick={goHome}>Back to Home</a></div>
          </div>
        </nav>

        <div className="page-view">
          <div className="container">
            <button className="back-btn" onClick={goHome}>
              <ArrowLeft size={20} /> Back to Home
            </button>
            
            <div className="page-header">
              <h1>{selectedData.detailTitle}</h1>
              <p>{selectedData.detailText}</p>
            </div>

            <div className="page-gallery">
              {selectedData.images.map((img, idx) => (
                <div key={idx} className="page-img-card">
                  <img src={img.url} alt={img.caption} className="page-img" />
                  <div className="page-img-caption">{img.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeView === 'client' && selectedData) {
    return (
      <div className="fgt">
        <style>{styles}</style>
        <nav className="navbar">
          <div className="navbar-inner">
            <div className="navbar-brand" onClick={goHome}>
              <FalconLogo size={35} />
              <div className="brand-text">FALCON GENERAL<span>TRADING PLC.</span></div>
            </div>
            <div className="navbar-links"><a onClick={goHome}>Back to Home</a></div>
          </div>
        </nav>

        <div className="page-view">
          <div className="container">
            <button className="back-btn" onClick={goHome}>
              <ArrowLeft size={20} /> Back to Home
            </button>
            
            <div className="client-list-card">
              <h2>Our Clients: {selectedData.title}</h2>
              <p>{selectedData.desc}</p>
              
              <ul className="company-list">
                {selectedData.list.map((companyName, idx) => (
                  <li key={idx}>
                    <Building2 size={20} /> {companyName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* --- MAIN HOME PAGE --- */

  return (
    <div className="fgt">
      <style>{styles}</style>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>

      <nav className="navbar">
        <div className="navbar-inner">
          <a onClick={goHome} className="navbar-brand">
            <FalconLogo size={45} />
            <div className="brand-text">FALCON GENERAL<span>TRADING PLC.</span></div>
          </a>
          <div className="navbar-links">
            <a onClick={goHome} className="active">Home</a>
            <a onClick={() => navigateTo('about')}>About</a>
            <a href="#sectors">Sectors</a>
            <a href="#suppliers">For Suppliers</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="navbar-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && (
          <div className="navbar-mobile">
            <a onClick={() => { goHome(); setOpen(false); }}>Home</a>
            <a onClick={() => { navigateTo('about'); setOpen(false); }}>About</a>
            <a href="#sectors" onClick={() => setOpen(false)}>Sectors</a>
            <a href="#suppliers" onClick={() => setOpen(false)}>For Suppliers</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      <section className="hero" id="home">
        <h1>Your Gateway to Ethiopia's Growing Market</h1>
        <p>
          Falcon General Trading PLC imports industrial machinery, vehicles, chemicals, 
          and construction materials at scale — with end-to-end customs clearance and nationwide distribution.
        </p>
        <div className="hero-buttons">
          <a href="#sectors" className="btn btn-primary">Explore Sectors</a>
          <a onClick={() => navigateTo('about')} className="btn btn-outline" style={{cursor: 'pointer'}}>Learn About Us</a>
        </div>
      </section>

      <section className="stats">
        <div className="stats-inner">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Why Partner With Falcon?</h2>
          <p className="section-sub">We take the risk and complexity out of international importing.</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={28} /></div>
              <h3>Customs Expertise</h3>
              <p>We handle all Ethiopian customs documentation, taxes, and clearing at the Djibouti and Berbera corridors seamlessly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Globe size={28} /></div>
              <h3>Global Sourcing</h3>
              <p>Direct access to verified manufacturers and suppliers across China, India, Europe, Turkey, and the UAE.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Anchor size={28} /></div>
              <h3>Secure Logistics</h3>
              <p>Professional container loading, securing, and freight forwarding for heavy machinery and sensitive chemicals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Target size={28} /></div>
              <h3>Local Distribution</h3>
              <p>Warehousing and reliable delivery to your factory or site anywhere in Ethiopia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="sectors">
        <div className="container">
          <h2 className="section-title">What We Import</h2>
          <p className="section-sub">Click any category to view our operations and container loading capabilities.</p>
          <div className="sectors-grid">
            {sectors.map((sector) => {
              const Icon = sector.icon
              return (
                <div key={sector.id} className="sector-card" onClick={() => openSectorDetail(sector)}>
                  <Icon className="sector-icon" size={32} />
                  <h3>{sector.title}</h3>
                  <p>{sector.desc}</p>
                  <ArrowRight className="sector-arrow" size={20} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEW: SOURCE SUPPLIERS */}
      <section className="section suppliers-section" id="suppliers">
        <div className="container">
          <h2 className="section-title">Global Supply Network</h2>
          <p className="section-sub">We source directly from verified factories and manufacturers across Asia and the Middle East.</p>
          
          <div className="suppliers-grid">
            {sourceSuppliers.map((sup, idx) => (
              <div key={idx} className="supplier-card">
                <div className="supplier-header">
                  <span className="supplier-flag">{sup.flag}</span>
                  <h3>Imports From {sup.region}</h3>
                </div>
                <ul className="supplier-list">
                  {sup.items.map((item, i) => (
                    <li key={i}><Package size={14} /> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section clients-section" id="clients">
        <div className="container">
          <h2 className="section-title">Who We Serve</h2>
          <p className="section-sub">We are a trusted supply partner for major industries across Ethiopia. Click to see our clients.</p>
          <div className="clients-grid">
            {clients.map((client) => {
              const Icon = client.icon
              return (
                <div key={client.id} className="client-card" onClick={() => openClientDetail(client)}>
                  <Icon className="client-icon" size={28} />
                  <h3>{client.title}</h3>
                  <p>{client.desc}</p>
                  <span className="view-link">View Client List &rarr;</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section steps">
        <div className="container">
          <h2 className="section-title">How We Work</h2>
          <p className="section-sub">From inquiry to delivery in four steps.</p>
          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="partners">
        <div className="container">
          <h2 className="section-title">Trusted Global Brands</h2>
          <p className="section-sub">We source directly from established manufacturers across Asia, Europe, and the Gulf.</p>
          <div className="partners-grid">
            {partnerLogos.map((p) => (
              <div key={p} className="partner-logo">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="testimonial">
                <p>"{t.quote}"</p>
                <cite>{t.name}</cite>
                <span>{t.role}</span>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-full" id="contact">
        <div className="container">
          <h2 className="section-title">Request a Quote</h2>
          <p className="section-sub">Ready to import? Send us your requirements and our team will get back to you shortly.</p>
          
          <div className="contact-wrapper">
            <div className="contact-info">
              <h3>Contact Person</h3>
              <div className="contact-person">{company.contactName}</div>
              <p><Phone size={18} /> {company.phone}</p>
              <p><Mail size={18} /> {company.email}</p>
              <p><MapPin size={18} /> {company.address}</p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p><MessageCircle size={18} /> <strong>WhatsApp / WeChat:</strong> {company.whatsapp}</p>
              </div>
            </div>

            <div className="contact-form-box">
              <h3>Send an Inquiry</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <input type="text" placeholder="Company Name" required />
                <select required defaultValue="">
                  <option value="" disabled>What do you need to import?</option>
                  {sectors.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                  <option value="other">Other / Not Sure</option>
                </select>
                <textarea placeholder="Please provide details (quantity, size, target timeline)..." rows="4" required></textarea>
                <button type="submit" className="btn btn-primary">Send Request</button>
                {formStatus && <p style={{ fontSize: '0.85rem', color: 'green', textAlign: 'center', marginTop: '0.5rem' }}>{formStatus}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" id="about">
        <div className="footer-inner">
          <div>
            <div className="navbar-brand" style={{ marginBottom: '1rem' }}>
              <FalconLogo size={40} />
              <div className="brand-text">FALCON GENERAL<span>TRADING PLC.</span></div>
            </div>
            <p>{company.tagline}</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p><Phone size={14} /> {company.phone}</p>
            <p><Mail size={14} /> {company.email}</p>
            <p><MapPin size={14} /> {company.address}</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p style={{ cursor: 'pointer' }} onClick={goHome}>Home</p>
            <p style={{ cursor: 'pointer' }} onClick={() => navigateTo('about')}>About Us</p>
            <p style={{ cursor: 'pointer' }} onClick={() => document.getElementById('sectors').scrollIntoView()}>Import Sectors</p>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}