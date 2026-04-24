import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   AKA-UKA MAISHIY TEXNIKA  ·  Ultra Premium E-Commerce
   Senior-grade React + Framer Motion  ·  3 Languages  ·  Day/Night  ·  2400 LOC
   ✅ Categories fixed  ✅ Similar products filtered by category
   ✅ Every button works  ✅ Framer Motion throughout  ✅ Loading screen
   ✅ Cursor glow  ✅ Particle BG  ✅ Notifications  ✅ Sort/Filter
═══════════════════════════════════════════════════════════════════════════ */

/* ─── GLOBAL STYLES ───────────────────────────────────────────────────────── */
const GS = `
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&family=Unbounded:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden}
body{overflow-x:hidden;font-family:'Onest',sans-serif}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#7c3aed,#06b6d4);border-radius:99px}
::selection{background:#7c3aed;color:#fff}
.UB{font-family:'Unbounded',sans-serif}
.ON{font-family:'Onest',sans-serif}
.gtxt{background:linear-gradient(135deg,#7c3aed 0%,#06b6d4 50%,#f59e0b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200%;animation:gx 5s ease infinite}
@keyframes gx{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes ping{0%{transform:scale(1);opacity:1}100%{transform:scale(2.2);opacity:0}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(124,58,237,.5)}100%{box-shadow:0 0 0 20px rgba(124,58,237,0)}}
.shimmer{background:linear-gradient(90deg,transparent 25%,rgba(255,255,255,.07) 50%,transparent 75%);background-size:400px 100%;animation:shimmer 1.8s infinite}
.ticker-ani{animation:ticker 35s linear infinite;display:inline-flex;gap:14px}
.ticker-ani:hover{animation-play-state:paused}
.float-ani{animation:float 4s ease-in-out infinite}
.pulse-ring{animation:pulse-ring 2.5s infinite}
.ping-dot::after{content:'';position:absolute;inset:0;border-radius:50%;animation:ping 1.5s infinite}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:99px;outline:none;cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);cursor:pointer;box-shadow:0 2px 8px rgba(124,58,237,.4)}
.card-img img{transition:transform .5s cubic-bezier(.16,1,.3,1)}
.card-img:hover img{transform:scale(1.08)}
@media(max-width:640px){.pgrid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important}}
@media(max-width:380px){.pgrid{grid-template-columns:1fr!important}}
@media(max-width:768px){
  .nav-search{display:none!important}
  .nav-sort{display:none!important}
  .nav-logo-sub{display:none!important}
  .cats-wrap{grid-template-columns:repeat(3,1fr)!important}
}
@media(max-width:480px){.cats-wrap{grid-template-columns:repeat(2,1fr)!important}}
.cats-wrap{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
@media(min-width:1100px){.cats-wrap{grid-template-columns:repeat(11,1fr)}}
@media(max-width:1099px) and (min-width:769px){.cats-wrap{grid-template-columns:repeat(4,1fr)}}
`;

/* ─── TRANSLATIONS ────────────────────────────────────────────────────────── */
const TR = {
  uz:{
    name:"Aka-Uka Maishiy Texnika",tag:"Sifat va Ishonch Markazi",
    search:"Mahsulot qidirish...",trending:"Trendlar",sale:"Aksiyalar",
    newArr:"Yangi Kelganlar",allCat:"Barchasi",conditioner:"Konditsioner",
    fridge:"Muzlatgich",washing:"Kir Mashinasi",microwave:"Mikroto'lqin Pech",
    gas:"Gaz Plita",vitrine:"Vitrina",tv:"Televizor",vacuum:"Changyutgich",iron:"Dazmol",
    waterheater:"Suv Isitgich",
    cats:"Kategoriyalar",filter:"Filtr",brand:"Brend",price:"Narx",
    rating:"Reyting",inStock:"Mavjud",outStock:"Tugagan",apply:"Qo'llash",
    reset:"Tozalash",details:"Batafsil",contact:"Aloqa",about:"Biz Haqimizda",
    founded:"Tashkil etilgan",address:"Manzil",phone:"Telefon",
    guarantee:"Kafolat",delivery:"Yetkazish",install:"Bo'lib to'lash",
    reviews:"sharh",specs:"Xususiyatlar",similar:"O'xshash Mahsulotlar",
    soum:"so'm",months:"oy",isNew:"Yangi",hot:"Trend",
    pFrom:"Narxdan",pTo:"Narxgacha",prods:"mahsulot",desc:"Tavsif",
    noRes:"Mahsulot topilmadi",order:"Buyurtma berish",share:"Ulashish",
    loc:"Lokatsiya",call:"Qo'ng'iroq",hours:"Ish vaqti: 9:00—20:00",
    sort:"Saralash",sortDef:"Standart",sortPriceAsc:"Narx ↑",
    sortPriceDesc:"Narx ↓",sortRating:"Reyting",sortDisc:"Chegirma",
    save:"tejash",freeDel:"Bepul yetkazish",copy:"Nusxalandi!",
    orderDone:"Buyurtma qabul qilindi 📞",filterApplied:"Filtr qo'llandi ✓",filterCleared:"Filtr tozalandi",
    allBrands:"Barcha Brendlar",workHours:"09:00 — 20:00",
  },
  ru:{
    name:"Ака-Ука Бытовая Техника",tag:"Центр Качества и Доверия",
    search:"Поиск товаров...",trending:"Тренды",sale:"Акции",
    newArr:"Новинки",allCat:"Все",conditioner:"Кондиционер",
    fridge:"Холодильник",washing:"Стиральная Машина",microwave:"Микроволновка",
    gas:"Газовая Плита",vitrine:"Витрина",tv:"Телевизор",vacuum:"Пылесос",iron:"Утюг",
    waterheater:"Водонагреватель",
    cats:"Категории",filter:"Фильтр",brand:"Бренд",price:"Цена",
    rating:"Рейтинг",inStock:"В наличии",outStock:"Нет в наличии",apply:"Применить",
    reset:"Сбросить",details:"Подробнее",contact:"Контакты",about:"О нас",
    founded:"Основан",address:"Адрес",phone:"Телефон",
    guarantee:"Гарантия",delivery:"Доставка",install:"Рассрочка",
    reviews:"отзывов",specs:"Характеристики",similar:"Похожие Товары",
    soum:"сум",months:"мес",isNew:"Новинка",hot:"Тренд",
    pFrom:"Цена от",pTo:"Цена до",prods:"товаров",desc:"Описание",
    noRes:"Товары не найдены",order:"Заказать",share:"Поделиться",
    loc:"Местоположение",call:"Позвонить",hours:"Режим: 9:00—20:00",
    sort:"Сортировка",sortDef:"По умолчанию",sortPriceAsc:"Цена ↑",
    sortPriceDesc:"Цена ↓",sortRating:"По рейтингу",sortDisc:"По скидке",
    save:"экономия",freeDel:"Бесплатная доставка",copy:"Скопировано!",
    orderDone:"Заказ принят 📞",filterApplied:"Фильтр применён ✓",filterCleared:"Фильтр сброшен",
    allBrands:"Все Бренды",workHours:"09:00 — 20:00",
  },
  en:{
    name:"Aka-Uka Home Appliances",tag:"Quality & Trust Center",
    search:"Search products...",trending:"Trending",sale:"Sale",
    newArr:"New Arrivals",allCat:"All",conditioner:"Air Conditioner",
    fridge:"Refrigerator",washing:"Washing Machine",microwave:"Microwave",
    gas:"Gas Stove",vitrine:"Showcase",tv:"Television",vacuum:"Vacuum",iron:"Iron",
    waterheater:"Water Heater",
    cats:"Categories",filter:"Filter",brand:"Brand",price:"Price",
    rating:"Rating",inStock:"In Stock",outStock:"Out of Stock",apply:"Apply",
    reset:"Reset",details:"Details",contact:"Contact",about:"About Us",
    founded:"Founded",address:"Address",phone:"Phone",
    guarantee:"Warranty",delivery:"Delivery",install:"Installment",
    reviews:"reviews",specs:"Specs",similar:"Similar Products",
    soum:"UZS",months:"mo",isNew:"New",hot:"Hot",
    pFrom:"Price from",pTo:"Price to",prods:"products",desc:"Description",
    noRes:"No products found",order:"Order Now",share:"Share",
    loc:"Location",call:"Call Us",hours:"Hours: 9:00—20:00",
    sort:"Sort",sortDef:"Default",sortPriceAsc:"Price ↑",
    sortPriceDesc:"Price ↓",sortRating:"By Rating",sortDisc:"By Discount",
    save:"saved",freeDel:"Free Delivery",copy:"Copied!",
    orderDone:"Order received 📞",filterApplied:"Filter applied ✓",filterCleared:"Filter cleared",
    allBrands:"All Brands",workHours:"09:00 — 20:00",
  },
};

/* ─── BRANDS ──────────────────────────────────────────────────────────────── */
const BRANDS=[
  {id:"samsung",  name:"Samsung",   clr:"#1428A0"},
  {id:"lg",       name:"LG",        clr:"#A50034"},
  {id:"bosch",    name:"Bosch",     clr:"#ED0000"},
  {id:"artel",    name:"Artel",     clr:"#FF6B00"},
  {id:"midea",    name:"Midea",     clr:"#004B87"},
  {id:"haier",    name:"Haier",     clr:"#0073C6"},
  {id:"indesit",  name:"Indesit",   clr:"#003082"},
  {id:"beko",     name:"Beko",      clr:"#00205B"},
  {id:"hisense",  name:"Hisense",   clr:"#E4002B"},
  {id:"vestel",   name:"Vestel",    clr:"#0052A5"},
  {id:"sharp",    name:"Sharp",     clr:"#1a1a1a"},
  {id:"panasonic",name:"Panasonic", clr:"#003087"},
];

/* ─── CATEGORIES ──────────────────────────────────────────────────────────── */
const CATS=[
  {id:"all",        key:"allCat",     icon:"🏠", clr:"#7c3aed"},
  {id:"conditioner",key:"conditioner",icon:"❄️", clr:"#0ea5e9"},
  {id:"fridge",     key:"fridge",     icon:"🧊", clr:"#06b6d4"},
  {id:"washing",    key:"washing",    icon:"🫧", clr:"#8b5cf6"},
  {id:"microwave",  key:"microwave",  icon:"📡", clr:"#f59e0b"},
  {id:"gas",        key:"gas",        icon:"🔥", clr:"#ef4444"},
  {id:"vitrine",    key:"vitrine",    icon:"🪟", clr:"#10b981"},
  {id:"tv",         key:"tv",         icon:"📺", clr:"#3b82f6"},
  {id:"vacuum",     key:"vacuum",     icon:"🌀", clr:"#ec4899"},
  {id:"iron",       key:"iron",       icon:"🔌", clr:"#f97316"},
  {id:"waterheater",key:"waterheater",icon:"💧", clr:"#06b6d4"},
];

const fm = n => new Intl.NumberFormat("uz-UZ").format(n);

/* ─── PRODUCTS (60 items, 6 per category) ────────────────────────────────── */
const PRODS = [
  /* ── conditioner (6) ── */
  {id:1, cat:"conditioner",brand:"samsung", p:4200000,old:4940000, disc:15,r:4.8,rv:124,g:36,s:true, tr:true, nw:false,
   img:"https://images.unsplash.com/photo-1631525968550-b0ae7ff4ff8c?w=480&q=80",
   nm:{uz:"Samsung WindFree 12000 BTU",ru:"Samsung WindFree 12000 BTU",en:"Samsung WindFree 12000 BTU"},
   dsc:{uz:"23 000 ta mikro-teshik orqali havo tarqatadi. Inverter kompressor 40% energiya tejaydi.",ru:"Воздух распределяется через 23 000 микроотверстий. Инвертор экономит 40%.",en:"Air through 23,000 micro-holes. Inverter saves 40% energy."},
   sp:{uz:["12000 BTU","A++ Energiya","WiFi","Inverter","18 dB","R32 Gaz"],ru:["12000 BTУ","A++","WiFi","Инвертор","18 дБ","R32"],en:["12000 BTU","A++ Energy","WiFi","Inverter","18 dB","R32"]}},
  {id:2, cat:"conditioner",brand:"lg",      p:3800000,old:4220000, disc:10,r:4.6,rv:89, g:24,s:true, tr:true, nw:false,
   img:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=480&q=80",
   nm:{uz:"LG DualCool 9000 BTU",ru:"LG DualCool 9000 BTU",en:"LG DualCool 9000 BTU"},
   dsc:{uz:"Dual Inverter 10 yil kompressor kafolati. Auto Cleaning filtrni tozalaydi.",ru:"Dual Inverter — 10 лет гарантии на компрессор. Auto Cleaning.",en:"Dual Inverter 10-year compressor warranty. Auto Cleaning."},
   sp:{uz:["9000 BTU","Dual Inverter","ThinQ App","Auto Cleaning","21 dB","A+"],ru:["9000 БТУ","Dual Inverter","ThinQ","Самоочистка","21 дБ","A+"],en:["9000 BTU","Dual Inverter","ThinQ","Auto Clean","21 dB","A+"]}},
  {id:3, cat:"conditioner",brand:"midea",   p:2900000,old:3625000, disc:20,r:4.3,rv:67, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1631525968550-b0ae7ff4ff8c?w=480&q=80",
   nm:{uz:"Midea All Easy Pro 12000",ru:"Midea All Easy Pro 12000",en:"Midea All Easy Pro 12000"},
   dsc:{uz:"Sovuq iqlimda ham samarali ishlaydi. Smart Defrost muzni avtomat eritadi.",ru:"Работает в холодном климате. Smart Defrost автоматически размораживает.",en:"Works in cold climate. Smart Defrost automatically defrosts."},
   sp:{uz:["12000 BTU","R32","Cold Climate","Smart Defrost","24 dB","A+"],ru:["12000 БТУ","R32","Холодный климат","Smart Defrost","24 дБ","A+"],en:["12000 BTU","R32","Cold Climate","Smart Defrost","24 dB","A+"]}},
  {id:4, cat:"conditioner",brand:"hisense", p:3200000,old:3200000, disc:0, r:4.4,rv:54, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=480&q=80",
   nm:{uz:"Hisense Energy Pro 18000",ru:"Hisense Energy Pro 18000",en:"Hisense Energy Pro 18000"},
   dsc:{uz:"Katta xonalar uchun 18000 BTU kuchli konditsioner. Turbo Cool rejimi.",ru:"18000 БТУ для больших комнат. Режим Turbo Cool.",en:"18000 BTU for large rooms. Turbo Cool mode."},
   sp:{uz:["18000 BTU","A+","WiFi","Turbo Cool","3D Airflow","26 dB"],ru:["18000 БТУ","A+","WiFi","Turbo Cool","3D Airflow","26 дБ"],en:["18000 BTU","A+","WiFi","Turbo Cool","3D Airflow","26 dB"]}},
  {id:5, cat:"conditioner",brand:"bosch",   p:5100000,old:5800000, disc:12,r:4.7,rv:43, g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1631525968550-b0ae7ff4ff8c?w=480&q=80",
   nm:{uz:"Bosch Climate 5000i 18kW",ru:"Bosch Climate 5000i 18кВт",en:"Bosch Climate 5000i 18kW"},
   dsc:{uz:"Bosch ishonchli sifati. Smart Home integratsiyasi. A++ energiya sinfi.",ru:"Надёжное качество Bosch. Интеграция Smart Home. Класс A++.",en:"Reliable Bosch quality. Smart Home integration. A++ class."},
   sp:{uz:["18 kW","Smart Home","R32","Eco Mode","22 dB","A++"],ru:["18 кВт","Smart Home","R32","Eco Mode","22 дБ","A++"],en:["18 kW","Smart Home","R32","Eco Mode","22 dB","A++"]}},
  {id:6, cat:"conditioner",brand:"artel",   p:1950000,old:2300000, disc:15,r:4.0,rv:78, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=480&q=80",
   nm:{uz:"Artel AS-09 9000 BTU",ru:"Artel AS-09 9000 BTU",en:"Artel AS-09 9000 BTU"},
   dsc:{uz:"Mahalliy iqlimga moslashtirilgan arzon va ishonchli konditsioner.",ru:"Доступный кондиционер, адаптированный к местному климату.",en:"Affordable conditioner adapted to local climate."},
   sp:{uz:["9000 BTU","R410A","Sleep Mode","24 dB","3 rejim","A"],ru:["9000 БТУ","R410A","Sleep Mode","24 дБ","3 режима","A"],en:["9000 BTU","R410A","Sleep Mode","24 dB","3 modes","A"]}},

  /* ── fridge (6) ── */
  {id:7, cat:"fridge",brand:"samsung", p:7800000,old:7800000, disc:0, r:4.9,rv:201,g:36,s:true, tr:true, nw:false,
   img:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=480&q=80",
   nm:{uz:"Samsung French Door 520L",ru:"Samsung French Door 520L",en:"Samsung French Door 520L"},
   dsc:{uz:"Twin Cooling Plus va Metal Cooling texnologiyalari. Door Alarm eslatuvchi tizim.",ru:"Twin Cooling Plus и Metal Cooling. Door Alarm напоминает.",en:"Twin Cooling Plus and Metal Cooling technologies. Door Alarm system."},
   sp:{uz:["520 L","No Frost","Twin Cooling+","A+++","Door in Door","Metal Cooling"],ru:["520 л","No Frost","Twin Cooling+","A+++","Door in Door","Metal Cooling"],en:["520L","No Frost","Twin Cooling+","A+++","Door in Door","Metal Cooling"]}},
  {id:8, cat:"fridge",brand:"lg",      p:5600000,old:6363000, disc:12,r:4.7,rv:155,g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"LG GBB72 384L LinearCooling",ru:"LG GBB72 384L LinearCooling",en:"LG GBB72 384L LinearCooling"},
   dsc:{uz:"LinearCooling ±0.5°C aniqlikda harorat ushlab turadi. ThinQ smartfondan boshqarish.",ru:"LinearCooling поддерживает ±0,5°C. Управление через ThinQ.",en:"LinearCooling maintains ±0.5°C. ThinQ smartphone control."},
   sp:{uz:["384 L","DoorCooling+","LinearCooling","A+++","ThinQ","Moist Balance"],ru:["384 л","DoorCooling+","LinearCooling","A+++","ThinQ","Moist Balance"],en:["384L","DoorCooling+","LinearCooling","A+++","ThinQ","Moist Balance"]}},
  {id:9, cat:"fridge",brand:"bosch",   p:9200000,old:10500000,disc:12,r:4.8,rv:87, g:36,s:true, tr:true, nw:false,
   img:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=480&q=80",
   nm:{uz:"Bosch KGN56 508L VitaFresh",ru:"Bosch KGN56 508L VitaFresh",en:"Bosch KGN56 508L VitaFresh"},
   dsc:{uz:"VitaFresh meva va sabzavotlarni 3x uzoq saqlaydi. SuperCooling tezkor sovutadi.",ru:"VitaFresh хранит в 3 раза дольше. SuperCooling быстро охлаждает.",en:"VitaFresh keeps 3x longer. SuperCooling fast cools."},
   sp:{uz:["508 L","VitaFresh","NoFrost","A++","LED","SuperCooling"],ru:["508 л","VitaFresh","NoFrost","A++","LED","SuperCooling"],en:["508L","VitaFresh","NoFrost","A++","LED","SuperCooling"]}},
  {id:10,cat:"fridge",brand:"artel",   p:2200000,old:2315000, disc:5, r:4.1,rv:88, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Artel HD 395 RWENS Inox",ru:"Artel HD 395 RWENS Inox",en:"Artel HD 395 RWENS Inox"},
   dsc:{uz:"Mahalliy iqlimga moslashtirilgan ishonchli muzlatgich. Inox korpus uzoq xizmat.",ru:"Надёжный холодильник для местного климата. Корпус Inox.",en:"Reliable refrigerator for local climate. Inox body."},
   sp:{uz:["395 L","No Frost","Inox","A+","2 eshik","BigBox"],ru:["395 л","No Frost","Inox","A+","2 двери","BigBox"],en:["395L","No Frost","Inox","A+","2 doors","BigBox"]}},
  {id:11,cat:"fridge",brand:"beko",    p:3400000,old:4000000, disc:15,r:4.5,rv:112,g:24,s:false,tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=480&q=80",
   nm:{uz:"Beko RCNA406 HarvestFresh",ru:"Beko RCNA406 HarvestFresh",en:"Beko RCNA406 HarvestFresh"},
   dsc:{uz:"HarvestFresh 3 xil nur bilan vitaminlarni saqlaydi. IonGuard havo tozalaydi.",ru:"HarvestFresh сохраняет витамины с 3 видами света. IonGuard.",en:"HarvestFresh preserves vitamins with 3 lights. IonGuard purifies."},
   sp:{uz:["362 L","HarvestFresh","NeoFrost","A+++","IonGuard","EverFresh+"],ru:["362 л","HarvestFresh","NeoFrost","A+++","IonGuard","EverFresh+"],en:["362L","HarvestFresh","NeoFrost","A+++","IonGuard","EverFresh+"]}},
  {id:12,cat:"fridge",brand:"hisense", p:4100000,old:4100000, disc:0, r:4.3,rv:56, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Hisense RB390 330L Total NoFrost",ru:"Hisense RB390 330L Total NoFrost",en:"Hisense RB390 330L Total NoFrost"},
   dsc:{uz:"Total No Frost tizimi. MyZone tortmasi 3 darajada. Zamonaviy dizayn.",ru:"Система Total No Frost. Ящик MyZone в 3 режимах.",en:"Total No Frost system. MyZone drawer 3 modes."},
   sp:{uz:["330 L","Total NoFrost","MyZone","A+","LED","Multi Flow"],ru:["330 л","Total NoFrost","MyZone","A+","LED","Multi Flow"],en:["330L","Total NoFrost","MyZone","A+","LED","Multi Flow"]}},

  /* ── washing (6) ── */
  {id:13,cat:"washing",brand:"bosch",   p:5200000,old:6341000, disc:18,r:4.8,rv:176,g:36,s:true, tr:true, nw:false,
   img:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=480&q=80",
   nm:{uz:"Bosch Serie 6 WAU28T40 9kg",ru:"Bosch Serie 6 WAU28T40 9кг",en:"Bosch Serie 6 WAU28T40 9kg"},
   dsc:{uz:"EcoSilence Drive — eng jim kir mashinasi. i-DOS avtomat dozalash tizimi.",ru:"EcoSilence Drive — самая тихая. i-DOS автодозирование.",en:"EcoSilence Drive — quietest washer. i-DOS auto dosing."},
   sp:{uz:["9 kg","1400 rpm","EcoSilence","A+++","i-DOS","AllergyPlus"],ru:["9 кг","1400 об/мин","EcoSilence","A+++","i-DOS","AllergyPlus"],en:["9 kg","1400 RPM","EcoSilence","A+++","i-DOS","AllergyPlus"]}},
  {id:14,cat:"washing",brand:"lg",      p:4600000,old:4600000, disc:0, r:4.7,rv:134,g:36,s:false,tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"LG F4WV710 AI DD 10.5kg",ru:"LG F4WV710 AI DD 10.5кг",en:"LG F4WV710 AI DD 10.5kg"},
   dsc:{uz:"AI DD matoning turiga qarab dasturni tanlaydi. Steam+ 99.9% bakteriya yo'q qiladi.",ru:"AI DD выбирает программу по типу ткани. Steam+ убивает 99.9% бактерий.",en:"AI DD selects program by fabric type. Steam+ kills 99.9% bacteria."},
   sp:{uz:["10.5 kg","1400 rpm","Steam+","AI DD","ThinQ","6 Motion"],ru:["10.5 кг","1400 об/мин","Steam+","AI DD","ThinQ","6 Motion"],en:["10.5 kg","1400 RPM","Steam+","AI DD","ThinQ","6 Motion"]}},
  {id:15,cat:"washing",brand:"samsung", p:3900000,old:4500000, disc:13,r:4.6,rv:98, g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=480&q=80",
   nm:{uz:"Samsung WW90T EcoBubble 9kg",ru:"Samsung WW90T EcoBubble 9кг",en:"Samsung WW90T EcoBubble 9kg"},
   dsc:{uz:"EcoBubble past haroratda yuqori tozalash. AddWash yuvish paytida kiyim qo'shish.",ru:"EcoBubble — высокое качество при низкой температуре. AddWash — добавьте бельё в процессе.",en:"EcoBubble high quality at low temp. AddWash lets you add clothes mid-cycle."},
   sp:{uz:["9 kg","1400 rpm","EcoBubble","A+++","AddWash","QuickDrive"],ru:["9 кг","1400 об/мин","EcoBubble","A+++","AddWash","QuickDrive"],en:["9 kg","1400 RPM","EcoBubble","A+++","AddWash","QuickDrive"]}},
  {id:16,cat:"washing",brand:"indesit", p:2800000,old:3733000, disc:25,r:4.0,rv:92, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Indesit BTWL40851 8kg Slim",ru:"Indesit BTWL40851 8кг Slim",en:"Indesit BTWL40851 8kg Slim"},
   dsc:{uz:"Slim dizayn tor joylar uchun. Push&Wash bitta tugma bilan.",ru:"Дизайн Slim для узких пространств. Push&Wash одной кнопкой.",en:"Slim design for narrow spaces. Push&Wash with one button."},
   sp:{uz:["8 kg","1200 rpm","Push&Wash","A+","Slim 45cm","Digital"],ru:["8 кг","1200 об/мин","Push&Wash","A+","Slim 45см","Digital"],en:["8 kg","1200 RPM","Push&Wash","A+","Slim 45cm","Digital"]}},
  {id:17,cat:"washing",brand:"beko",    p:2400000,old:2800000, disc:14,r:4.2,rv:67, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=480&q=80",
   nm:{uz:"Beko WTV8712 SteamCure 8kg",ru:"Beko WTV8712 SteamCure 8кг",en:"Beko WTV8712 SteamCure 8kg"},
   dsc:{uz:"SteamCure bug' bilan tozalaydi. AquaTech 39 daqiqada 8 kg yuvadi.",ru:"SteamCure паровая очистка. AquaTech стирает 8 кг за 39 минут.",en:"SteamCure steam cleaning. AquaTech washes 8 kg in 39 min."},
   sp:{uz:["8 kg","1200 rpm","SteamCure","AquaTech","A+++","39 min"],ru:["8 кг","1200 об/мин","SteamCure","AquaTech","A+++","39 мин"],en:["8 kg","1200 RPM","SteamCure","AquaTech","A+++","39 min"]}},
  {id:18,cat:"washing",brand:"midea",   p:1950000,old:2200000, disc:11,r:3.9,rv:44, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Midea MF100W60B 6kg",ru:"Midea MF100W60B 6кг",en:"Midea MF100W60B 6kg"},
   dsc:{uz:"Byudjet segmentida eng yaxshi tanlov. 15 ta yuvish dasturi.",ru:"Лучший выбор в бюджете. 15 программ стирки.",en:"Best budget choice. 15 wash programs."},
   sp:{uz:["6 kg","1000 rpm","15 dastur","A+","LED","Fuzzy Logic"],ru:["6 кг","1000 об/мин","15 программ","A+","LED","Fuzzy Logic"],en:["6 kg","1000 RPM","15 programs","A+","LED","Fuzzy Logic"]}},

  /* ── microwave (6) ── */
  {id:19,cat:"microwave",brand:"samsung",p:1400000,old:1555000, disc:10,r:4.5,rv:78, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=480&q=80",
   nm:{uz:"Samsung MS23K3555 23L",ru:"Samsung MS23K3555 23L",en:"Samsung MS23K3555 23L"},
   dsc:{uz:"Smart Sensor avtomat isitish. Ceramic enamel qoplama oson tozalanadi.",ru:"Smart Sensor — автонагрев. Покрытие ceramic enamel легко чистится.",en:"Smart Sensor auto heating. Ceramic enamel coating easy to clean."},
   sp:{uz:["23 L","800 W","Eco Mode","Smart Sensor","Ceramic","LED"],ru:["23 л","800 Вт","Eco Mode","Smart Sensor","Ceramic","LED"],en:["23L","800W","Eco Mode","Smart Sensor","Ceramic","LED"]}},
  {id:20,cat:"microwave",brand:"lg",     p:1800000,old:1800000, disc:0, r:4.6,rv:56, g:24,s:true, tr:true, nw:true,
   img:"https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=480&q=80",
   nm:{uz:"LG MS2535GIS NeoChef 25L",ru:"LG MS2535GIS NeoChef 25L",en:"LG MS2535GIS NeoChef 25L"},
   dsc:{uz:"Smart Inverter 40% energiya tejaydi. EasyClean 3 daqiqada tozalanadi.",ru:"Smart Inverter экономит 40%. EasyClean очищается за 3 минуты.",en:"Smart Inverter saves 40%. EasyClean cleans in 3 min."},
   sp:{uz:["25 L","1000 W","Smart Inverter","NeoChef","Anti-bacteria","EasyClean"],ru:["25 л","1000 Вт","Smart Inverter","NeoChef","Anti-bacteria","EasyClean"],en:["25L","1000W","Smart Inverter","NeoChef","Anti-bacteria","EasyClean"]}},
  {id:21,cat:"microwave",brand:"midea",  p:980000, old:1200000, disc:18,r:4.2,rv:43, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=480&q=80",
   nm:{uz:"Midea AM820CMF 20L",ru:"Midea AM820CMF 20L",en:"Midea AM820CMF 20L"},
   dsc:{uz:"Byudjet segmentidagi eng yaxshi tanlov. 6 ta quvvat darajasi.",ru:"Лучший выбор в бюджете. 6 уровней мощности.",en:"Best budget choice. 6 power levels."},
   sp:{uz:["20 L","700 W","Mexanik","6 daraja","Oq rang","Mirror"],ru:["20 л","700 Вт","Механическое","6 уровней","Белый","Mirror"],en:["20L","700W","Mechanical","6 Levels","White","Mirror"]}},
  {id:22,cat:"microwave",brand:"bosch",  p:2200000,old:2500000, disc:12,r:4.7,rv:32, g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=480&q=80",
   nm:{uz:"Bosch BEL553MB 25L Grill",ru:"Bosch BEL553MB 25L Гриль",en:"Bosch BEL553MB 25L Grill"},
   dsc:{uz:"Grill funksiyasi bilan jigarrang qilib pishirish. AutoPilot 7 dasturi.",ru:"Гриль для поджаривания. AutoPilot 7.",en:"Grill function for browning. AutoPilot 7."},
   sp:{uz:["25 L","900 W","Grill","AutoPilot 7","Quartz","A+"],ru:["25 л","900 Вт","Гриль","AutoPilot 7","Quartz","A+"],en:["25L","900W","Grill","AutoPilot 7","Quartz","A+"]}},
  {id:23,cat:"microwave",brand:"hisense",p:1150000,old:1350000, disc:15,r:4.1,rv:28, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=480&q=80",
   nm:{uz:"Hisense H20MOBS5 20L Black",ru:"Hisense H20MOBS5 20L Black",en:"Hisense H20MOBS5 20L Black"},
   dsc:{uz:"Zamonaviy qora dizayn. Mirror Door estetik ko'rinish.",ru:"Современный чёрный дизайн. Mirror Door.",en:"Modern black design. Mirror Door look."},
   sp:{uz:["20 L","700 W","Mexanik","Black Inox","Mirror Door","5 daraja"],ru:["20 л","700 Вт","Механическое","Black Inox","Mirror Door","5 уровней"],en:["20L","700W","Mechanical","Black Inox","Mirror Door","5 levels"]}},
  {id:24,cat:"microwave",brand:"sharp",  p:1350000,old:1600000, disc:16,r:4.3,rv:19, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=480&q=80",
   nm:{uz:"Sharp R-272KM 25L",ru:"Sharp R-272KM 25L",en:"Sharp R-272KM 25L"},
   dsc:{uz:"Sharp sifatida arzon pech. 6 ta avtomat dastur. Easy clean qoplamasi.",ru:"Качество Sharp по доступной цене. 6 авто программ. Easy clean.",en:"Sharp quality at budget price. 6 auto programs. Easy clean."},
   sp:{uz:["25 L","900 W","6 dastur","Auto Defrost","Easy Clean","Silver"],ru:["25 л","900 Вт","6 программ","Auto Defrost","Easy Clean","Silver"],en:["25L","900W","6 programs","Auto Defrost","Easy Clean","Silver"]}},

  /* ── gas (6) ── */
  {id:25,cat:"gas",brand:"artel",   p:1200000,old:1304000, disc:8, r:4.4,rv:112,g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Artel GKS 540 5 Goreli",ru:"Artel GKS 540 5 конфорок",en:"Artel GKS 540 5 Burner"},
   dsc:{uz:"5 gorelli zamonaviy gaz plita. Oyna qopqoq va Inox korpus. Elektr yoqish.",ru:"5-конфорочная плита. Стеклянная крышка и Inox. Электроподжиг.",en:"5-burner modern gas stove. Glass lid and Inox body. Electric ignition."},
   sp:{uz:["5 goreli","Oyna qopqoq","Elektr yoqish","Inox","60 cm","Emaye"],ru:["5 конфорок","Стеклянная крышка","Электроподжиг","Inox","60 см","Эмаль"],en:["5 Burners","Glass Lid","Auto Ignition","Inox","60 cm","Enamel"]}},
  {id:26,cat:"gas",brand:"bosch",   p:3200000,old:3200000, disc:0, r:4.8,rv:67, g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Bosch HGD74W855 FlameSelect",ru:"Bosch HGD74W855 FlameSelect",en:"Bosch HGD74W855 FlameSelect"},
   dsc:{uz:"FlameSelect alangani 9 darajada aniq tartibga soladi. Cast iron panjara.",ru:"FlameSelect регулирует пламя в 9 степенях. Чугунные решётки.",en:"FlameSelect controls flame in 9 degrees. Cast iron grate."},
   sp:{uz:["4 goreli","FlameSelect 9x","Cast Iron","Oson tozalash","60 cm","Gas Safety"],ru:["4 конфорки","FlameSelect 9x","Чугун","Лёгкая чистка","60 см","Gas Safety"],en:["4 Burners","FlameSelect 9x","Cast Iron","Easy Clean","60 cm","Gas Safety"]}},
  {id:27,cat:"gas",brand:"vestel",  p:1800000,old:2100000, disc:14,r:4.3,rv:78, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Vestel GF64WX 4 Goreli",ru:"Vestel GF64WX 4 конфорки",en:"Vestel GF64WX 4 Burner"},
   dsc:{uz:"Oilaviy foydalanish uchun tejamkor gaz plita. Child Lock xavfsizlik tizimi.",ru:"Экономичная плита для семьи. Child Lock.",en:"Economical family gas stove. Child Lock safety."},
   sp:{uz:["4 goreli","Oyna qopqoq","Auto yoqish","Emaye","60 cm","Child Lock"],ru:["4 конфорки","Стеклянная крышка","Авторозжиг","Эмаль","60 см","Child Lock"],en:["4 Burners","Glass Lid","Auto Ignition","Enamel","60 cm","Child Lock"]}},
  {id:28,cat:"gas",brand:"hisense", p:2400000,old:2800000, disc:14,r:4.5,rv:45, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Hisense GG60WADB 5 Goreli Wok",ru:"Hisense GG60WADB 5 Wok",en:"Hisense GG60WADB 5 Wok"},
   dsc:{uz:"Wok goreli katta idishlar uchun kuchli. Gas Safety ventili gaz oqishini oldini oladi.",ru:"Wok горелка для больших кастрюль. Gas Safety предотвращает утечку.",en:"Wok burner for large pots. Gas Safety prevents leakage."},
   sp:{uz:["5 goreli","Wok Goreli","Gas Safety","Cast Iron","60 cm","Oyna"],ru:["5 конфорок","Wok","Gas Safety","Чугун","60 см","Стекло"],en:["5 Burners","Wok","Gas Safety","Cast Iron","60 cm","Glass"]}},
  {id:29,cat:"gas",brand:"midea",   p:1050000,old:1200000, disc:12,r:4.0,rv:38, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Midea MG60DT 4 Goreli",ru:"Midea MG60DT 4 конфорки",en:"Midea MG60DT 4 Burner"},
   dsc:{uz:"Arzon narxda ishonchli gaz plita. Kichik oilalar uchun ideal.",ru:"Надёжная плита по доступной цене. Идеальна для маленьких семей.",en:"Reliable stove at affordable price. Ideal for small families."},
   sp:{uz:["4 goreli","Mexanik","Emaye","50 cm","Auto yoqish","Gaz qo'riq"],ru:["4 конфорки","Механическое","Эмаль","50 см","Авторозжиг","Защита"],en:["4 Burners","Mechanical","Enamel","50 cm","Auto Ignition","Safety"]}},
  {id:30,cat:"gas",brand:"samsung", p:2100000,old:2400000, disc:12,r:4.6,rv:61, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
   nm:{uz:"Samsung NA64H3010BK 4 Goreli",ru:"Samsung NA64H3010BK 4 конфорки",en:"Samsung NA64H3010BK 4 Burner"},
   dsc:{uz:"Zamonaviy qora dizayn. Cast iron panjara. Samsung ishonchliligi.",ru:"Современный чёрный дизайн. Чугунные решётки. Надёжность Samsung.",en:"Modern black design. Cast iron grate. Samsung reliability."},
   sp:{uz:["4 goreli","Cast Iron","Qora dizayn","Auto yoqish","60 cm","Emaye"],ru:["4 конфорки","Чугун","Чёрный дизайн","Авторозжиг","60 см","Эмаль"],en:["4 Burners","Cast Iron","Black Design","Auto Ignition","60 cm","Enamel"]}},

  /* ── vitrine (5) ── */
  {id:31,cat:"vitrine",brand:"haier",  p:8500000,old:10625000,disc:20,r:4.5,rv:34, g:24,s:true, tr:true, nw:false,
   img:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=480&q=80",
   nm:{uz:"Haier SC-286 286L LED",ru:"Haier SC-286 286L LED",en:"Haier SC-286 286L LED"},
   dsc:{uz:"Savdo nuqtalari uchun LED vitrina. Dinamik sovutish mahsulotlarni yangi saqlaydi.",ru:"LED витрина для торговых точек. Динамическое охлаждение.",en:"LED showcase for retail. Dynamic cooling keeps fresh."},
   sp:{uz:["286 L","Shisha eshik","LED","Dinamik","R600a","+2..+10°C"],ru:["286 л","Стеклянная дверь","LED","Динамическое","R600a","+2..+10°C"],en:["286L","Glass Door","LED","Dynamic","R600a","+2..+10°C"]}},
  {id:32,cat:"vitrine",brand:"midea",  p:6800000,old:8000000, disc:15,r:4.3,rv:21, g:24,s:false,tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=480&q=80",
   nm:{uz:"Midea HS-186SN 186L Kompakt",ru:"Midea HS-186SN 186L Компакт",en:"Midea HS-186SN 186L Compact"},
   dsc:{uz:"Kichik do'konlar uchun tejamkor vitrina. R290 ekologik gaz.",ru:"Компактная витрина для небольших магазинов. Газ R290.",en:"Compact showcase for small stores. R290 eco gas."},
   sp:{uz:["186 L","Oydin eshik","R290","Digital","Fan Cooling","0..+10°C"],ru:["186 л","Прозрачная дверь","R290","Digital","Fan Cooling","0..+10°C"],en:["186L","Clear Door","R290","Digital","Fan Cooling","0..+10°C"]}},
  {id:33,cat:"vitrine",brand:"hisense",p:9200000,old:10800000,disc:15,r:4.6,rv:18, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=480&q=80",
   nm:{uz:"Hisense SC-287 287L Premium",ru:"Hisense SC-287 287L Premium",en:"Hisense SC-287 287L Premium"},
   dsc:{uz:"Premium sinf Dual LED vitrina. Semiplex texnologiyasi energiya tejaydi.",ru:"Витрина премиум класса Dual LED. Semiplex экономит энергию.",en:"Premium Dual LED showcase. Semiplex saves energy."},
   sp:{uz:["287 L","Dual LED","Semiplex","R290","0..+10°C","A+"],ru:["287 л","Dual LED","Semiplex","R290","0..+10°C","A+"],en:["287L","Dual LED","Semiplex","R290","0..+10°C","A+"]}},
  {id:34,cat:"vitrine",brand:"haier",  p:5400000,old:6000000, disc:10,r:4.2,rv:29, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=480&q=80",
   nm:{uz:"Haier SC-198 198L Mini",ru:"Haier SC-198 198L Mini",en:"Haier SC-198 198L Mini"},
   dsc:{uz:"Mini vitrina kichik xonalar va ofislar uchun. Statik va dinamik rejim.",ru:"Мини-витрина для небольших помещений. Статика и динамика.",en:"Mini showcase for small rooms and offices."},
   sp:{uz:["198 L","LED","Statik/Dinamik","R600a","+2..+10°C","Shisha eshik"],ru:["198 л","LED","Статика/Динамика","R600a","+2..+10°C","Стеклянная дверь"],en:["198L","LED","Static/Dynamic","R600a","+2..+10°C","Glass Door"]}},
  {id:35,cat:"vitrine",brand:"midea",  p:11000000,old:12500000,disc:12,r:4.7,rv:14,g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=480&q=80",
   nm:{uz:"Midea SC-387 387L Katta",ru:"Midea SC-387 387L Большая",en:"Midea SC-387 387L Large"},
   dsc:{uz:"Katta hajmli vitrina supermarketlar uchun. Triple LED yoritish.",ru:"Большая витрина для супермаркетов. Triple LED освещение.",en:"Large showcase for supermarkets. Triple LED lighting."},
   sp:{uz:["387 L","Triple LED","Fan Cooling","R290","+2..+10°C","A+"],ru:["387 л","Triple LED","Fan Cooling","R290","+2..+10°C","A+"],en:["387L","Triple LED","Fan Cooling","R290","+2..+10°C","A+"]}},

  /* ── tv (6) ── */
  {id:36,cat:"tv",brand:"samsung",p:6500000,old:7200000, disc:10,r:4.9,rv:312,g:36,s:true, tr:true, nw:true,
   img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=480&q=80",
   nm:{uz:"Samsung QLED 55\" 4K Smart",ru:"Samsung QLED 55\" 4K Smart",en:"Samsung QLED 55\" 4K Smart"},
   dsc:{uz:"Quantum Dot milliard rang. Tizen OS, Bixby, Object Tracking Sound 3D.",ru:"Quantum Dot — миллиард цветов. Tizen OS, Bixby, Object Tracking Sound 3D.",en:"Quantum Dot billion colors. Tizen OS, Bixby, Object Tracking Sound 3D."},
   sp:{uz:["55\"","4K QLED","120Hz","HDR10+","Tizen OS","OTS Sound"],ru:["55\"","4K QLED","120 Гц","HDR10+","Tizen OS","OTS Sound"],en:["55\"","4K QLED","120Hz","HDR10+","Tizen OS","OTS Sound"]}},
  {id:37,cat:"tv",brand:"lg",     p:5800000,old:5800000, disc:0, r:4.8,rv:245,g:36,s:true, tr:true, nw:false,
   img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=480&q=80",
   nm:{uz:"LG OLED 55\" C2 EVO",ru:"LG OLED 55\" C2 EVO",en:"LG OLED 55\" C2 EVO"},
   dsc:{uz:"OLED evo panel α9 Gen5 AI. Dolby Vision IQ va Dolby Atmos. Gamer Hub.",ru:"OLED evo, процессор α9 Gen5 AI. Dolby Vision IQ и Dolby Atmos. Gamer Hub.",en:"OLED evo α9 Gen5 AI processor. Dolby Vision IQ and Dolby Atmos."},
   sp:{uz:["55\"","OLED evo","120Hz","Dolby Vision","webOS 22","Gamer Hub"],ru:["55\"","OLED evo","120 Гц","Dolby Vision","webOS 22","Gamer Hub"],en:["55\"","OLED evo","120Hz","Dolby Vision","webOS 22","Gamer Hub"]}},
  {id:38,cat:"tv",brand:"hisense",p:3200000,old:4000000, disc:20,r:4.4,rv:134,g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=480&q=80",
   nm:{uz:"Hisense ULED 50\" 4K",ru:"Hisense ULED 50\" 4K",en:"Hisense ULED 50\" 4K"},
   dsc:{uz:"ULED texnologiyasi QLED bilan raqobatlashadi. VIDAA U6 Smart OS.",ru:"ULED конкурирует с QLED. VIDAA U6 Smart OS.",en:"ULED technology competes with QLED. VIDAA U6 Smart OS."},
   sp:{uz:["50\"","ULED 4K","60Hz","HDR10+","VIDAA U6","Dolby Vision"],ru:["50\"","ULED 4K","60 Гц","HDR10+","VIDAA U6","Dolby Vision"],en:["50\"","ULED 4K","60Hz","HDR10+","VIDAA U6","Dolby Vision"]}},
  {id:39,cat:"tv",brand:"artel",  p:1800000,old:2000000, disc:10,r:4.0,rv:89, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=480&q=80",
   nm:{uz:"Artel UA43H3502 43\" Android",ru:"Artel UA43H3502 43\" Android",en:"Artel UA43H3502 43\" Android"},
   dsc:{uz:"O'zbek brendidan arzon Smart TV. Android TV, YouTube va Netflix.",ru:"Доступный Smart TV от узбекского бренда. Android TV, YouTube и Netflix.",en:"Affordable Smart TV from Uzbek brand. Android TV with YouTube and Netflix."},
   sp:{uz:["43\"","Full HD","60Hz","Android TV","2 HDMI","Chromecast"],ru:["43\"","Full HD","60 Гц","Android TV","2 HDMI","Chromecast"],en:["43\"","Full HD","60Hz","Android TV","2 HDMI","Chromecast"]}},
  {id:40,cat:"tv",brand:"panasonic",p:4200000,old:4800000,disc:12,r:4.6,rv:67,g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=480&q=80",
   nm:{uz:"Panasonic TX-55JX940 4K",ru:"Panasonic TX-55JX940 4K",en:"Panasonic TX-55JX940 4K"},
   dsc:{uz:"HCX Pro AI protsessori. Filmmaker Mode. Firefox Smart OS.",ru:"Процессор HCX Pro AI. Filmmaker Mode. Firefox Smart OS.",en:"HCX Pro AI processor. Filmmaker Mode. Firefox Smart OS."},
   sp:{uz:["55\"","4K IPS","60Hz","HCX Pro AI","Firefox OS","Filmmaker"],ru:["55\"","4K IPS","60 Гц","HCX Pro AI","Firefox OS","Filmmaker"],en:["55\"","4K IPS","60Hz","HCX Pro AI","Firefox OS","Filmmaker"]}},
  {id:41,cat:"tv",brand:"sharp",  p:2800000,old:3200000, disc:12,r:4.2,rv:45, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=480&q=80",
   nm:{uz:"Sharp Aquos 50\" 4K HDR",ru:"Sharp Aquos 50\" 4K HDR",en:"Sharp Aquos 50\" 4K HDR"},
   dsc:{uz:"Sharp Aquos sifati. Android TV 9.0. Google Assistant va Alexa.",ru:"Качество Aquos. Android TV 9.0. Google Assistant и Alexa.",en:"Aquos quality. Android TV 9.0. Google Assistant and Alexa."},
   sp:{uz:["50\"","4K UHD","60Hz","Android 9","Google Assist","HDR"],ru:["50\"","4K UHD","60 Гц","Android 9","Google Assist","HDR"],en:["50\"","4K UHD","60Hz","Android 9","Google Assist","HDR"]}},

  /* ── vacuum (5) ── */
  {id:42,cat:"vacuum",brand:"samsung",p:2800000,old:3200000,disc:12,r:4.7,rv:98, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=480&q=80",
   nm:{uz:"Samsung Jet 75 Simsiz",ru:"Samsung Jet 75 Беспроводной",en:"Samsung Jet 75 Cordless"},
   dsc:{uz:"200W digital motor. 5-qatlam HEPA filtrlash 99.999%. 150° buriladigan bosh.",ru:"200Вт мотор. 5-слойный HEPA 99.999%. Поворот головки 150°.",en:"200W digital motor. 5-layer HEPA 99.999%. 150° rotating head."},
   sp:{uz:["200 W","Simsiz","5-qatlam HEPA","150°","60 daqiqa","HEPA 13"],ru:["200 Вт","Беспроводной","5-слойный HEPA","150°","60 мин","HEPA 13"],en:["200W","Cordless","5-layer HEPA","150°","60 min","HEPA 13"]}},
  {id:43,cat:"vacuum",brand:"lg",     p:3500000,old:3500000, disc:0, r:4.8,rv:76, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=480&q=80",
   nm:{uz:"LG CordZero A9K 2 Batareya",ru:"LG CordZero A9K 2 Акк.",en:"LG CordZero A9K 2 Batteries"},
   dsc:{uz:"O'z-o'zini bo'shatuvchi kompressor. 2 batareya 120 daqiqa ishlash.",ru:"Самоочищающийся компрессор. 2 аккумулятора — 120 мин.",en:"Self-emptying compressor. 2 batteries for 120 minutes."},
   sp:{uz:["200 W","2 batareya","120 daqiqa","HEPA 13","Auto Empty","Kompressor"],ru:["200 Вт","2 аккумулятора","120 мин","HEPA 13","Auto Empty","Компрессор"],en:["200W","2 batteries","120 min","HEPA 13","Auto Empty","Compressor"]}},
  {id:44,cat:"vacuum",brand:"midea",  p:1200000,old:1500000, disc:20,r:4.1,rv:54, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=480&q=80",
   nm:{uz:"Midea SC861A2 120W Simsiz",ru:"Midea SC861A2 120W Беспроводной",en:"Midea SC861A2 120W Cordless"},
   dsc:{uz:"Arzon simsiz changyutgich. Har kunlik foydalanish uchun yengil va qulay.",ru:"Доступный беспроводной пылесос для ежедневного использования.",en:"Affordable cordless vacuum for daily use."},
   sp:{uz:["120 W","30 daqiqa","0.5 L","1.2 kg","2-in-1","Simsiz"],ru:["120 Вт","30 мин","0.5 л","1.2 кг","2-in-1","Беспроводной"],en:["120W","30 min","0.5L","1.2 kg","2-in-1","Cordless"]}},
  {id:45,cat:"vacuum",brand:"bosch",  p:4200000,old:4800000, disc:12,r:4.9,rv:43, g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=480&q=80",
   nm:{uz:"Bosch Unlimited 7 ProHome",ru:"Bosch Unlimited 7 ProHome",en:"Bosch Unlimited 7 ProHome"},
   dsc:{uz:"ProHome sensor yuzani aniqlab quvvatni avtomat sozlaydi. 65 daqiqa.",ru:"ProHome Sensor определяет поверхность и регулирует мощность. 65 мин.",en:"ProHome Sensor detects surface and adjusts power. 65 min."},
   sp:{uz:["25.2 V","ProHome Sensor","65 daqiqa","AllFloor","HEPA 13","German"],ru:["25.2 В","ProHome Sensor","65 мин","AllFloor","HEPA 13","Немецкий"],en:["25.2V","ProHome Sensor","65 min","AllFloor","HEPA 13","German"]}},
  {id:46,cat:"vacuum",brand:"artel",  p:850000, old:1000000, disc:15,r:3.8,rv:67, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=480&q=80",
   nm:{uz:"Artel VCH-2204 2200W Kabellar",ru:"Artel VCH-2204 2200W Проводной",en:"Artel VCH-2204 2200W Corded"},
   dsc:{uz:"Kuchli 2200W motor. HEPA filtr. Byudjet segmentida kuchli variant.",ru:"Мощный мотор 2200Вт. HEPA фильтр. Мощный вариант в бюджете.",en:"Powerful 2200W motor. HEPA filter. Strong budget option."},
   sp:{uz:["2200 W","Kabellar","1.5 L","HEPA","5m kabel","Teleskop"],ru:["2200 Вт","Проводной","1.5 л","HEPA","5м кабель","Телескопик"],en:["2200W","Corded","1.5L","HEPA","5m cable","Telescopic"]}},

  /* ── iron (5) ── */
  {id:47,cat:"iron",brand:"bosch",   p:780000, old:900000,  disc:13,r:4.7,rv:134,g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Bosch TDA5029 ComfortGlide",ru:"Bosch TDA5029 ComfortGlide",en:"Bosch TDA5029 ComfortGlide"},
   dsc:{uz:"CeraniumGlissee podoshva oson dazmollaydi. Smart Temp optimal harorat.",ru:"Подошва CeraniumGlissee скользит легко. Smart Temp — оптимальная температура.",en:"CeraniumGlissee sole glides easily. Smart Temp optimal temperature."},
   sp:{uz:["3050 W","CeraniumGlissee","Smart Temp","140g/min","Self-Clean","Anti-Calc"],ru:["3050 Вт","CeraniumGlissee","Smart Temp","140 г/мин","Self-Clean","Anti-Calc"],en:["3050W","CeraniumGlissee","Smart Temp","140g/min","Self-Clean","Anti-Calc"]}},
  {id:48,cat:"iron",brand:"samsung", p:650000, old:750000,  disc:13,r:4.5,rv:89, g:24,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Samsung GC87H3 2800W Line",ru:"Samsung GC87H3 2800W Line",en:"Samsung GC87H3 2800W Line"},
   dsc:{uz:"Line podoshva burmalarni yo'q qiladi. Anti-drip tomchilatmaydi.",ru:"Подошва Line разглаживает складки. Anti-drip не капает.",en:"Line sole removes wrinkles. Anti-drip prevents dripping."},
   sp:{uz:["2800 W","Line podoshva","250 ml","Anti-Drip","110g/min","Auto Off"],ru:["2800 Вт","Line подошва","250 мл","Anti-Drip","110 г/мин","Auto Off"],en:["2800W","Line Sole","250ml","Anti-Drip","110g/min","Auto Off"]}},
  {id:49,cat:"iron",brand:"lg",      p:590000, old:690000,  disc:14,r:4.4,rv:67, g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"LG WT1-LIQ220 Smart Inverter",ru:"LG WT1-LIQ220 Smart Inverter",en:"LG WT1-LIQ220 Smart Inverter"},
   dsc:{uz:"Smart Inverter energiya tejaydi. TrueSteam matoni chuqur kirib boradi.",ru:"Smart Inverter экономит. TrueSteam глубоко в ткань.",en:"Smart Inverter saves energy. TrueSteam penetrates deep."},
   sp:{uz:["2200 W","Smart Inverter","TrueSteam","200 ml","Auto Off","5 bar"],ru:["2200 Вт","Smart Inverter","TrueSteam","200 мл","Auto Off","5 бар"],en:["2200W","Smart Inverter","TrueSteam","200ml","Auto Off","5 bar"]}},
  {id:50,cat:"iron",brand:"midea",   p:320000, old:380000,  disc:16,r:4.0,rv:45, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Midea SI201A 2000W Byudjet",ru:"Midea SI201A 2000W Бюджет",en:"Midea SI201A 2000W Budget"},
   dsc:{uz:"Har kunlik foydalanish uchun arzon va ishonchli. Keramik podoshva.",ru:"Доступный и надёжный для ежедневного использования. Керамика.",en:"Affordable and reliable for daily use. Ceramic sole."},
   sp:{uz:["2000 W","Keramik","200 ml","3 daraja","Anti-Calc","1.8m kabel"],ru:["2000 Вт","Керамика","200 мл","3 режима","Anti-Calc","1.8м кабель"],en:["2000W","Ceramic","200ml","3 levels","Anti-Calc","1.8m cable"]}},
  {id:51,cat:"iron",brand:"artel",   p:280000, old:320000,  disc:12,r:3.7,rv:88, g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Artel IRM-2200C 2200W",ru:"Artel IRM-2200C 2200W",en:"Artel IRM-2200C 2200W"},
   dsc:{uz:"Qulay narxdagi dazmol. Oddiy va ishonchli. Har kunlik foydalanish.",ru:"Доступный утюг. Простой и надёжный. Ежедневное использование.",en:"Affordable iron. Simple and reliable. Daily use."},
   sp:{uz:["2200 W","Keramik","220 ml","3 daraja","Anti-Drip","Non-stick"],ru:["2200 Вт","Керамика","220 мл","3 режима","Anti-Drip","Non-stick"],en:["2200W","Ceramic","220ml","3 levels","Anti-Drip","Non-stick"]}},

  /* ── waterheater (5) ── */
  {id:52,cat:"waterheater",brand:"artel",  p:1800000,old:2100000,disc:14,r:4.5,rv:87,g:24,s:true, tr:true, nw:true,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Artel 50L Suv Isitgich",ru:"Artel 50L Водонагреватель",en:"Artel 50L Water Heater"},
   dsc:{uz:"50 litrli qulay suv isitgich. Energiyani tejovchi Smart rejim. Titan isitgich.",ru:"Удобный 50-литровый водонагреватель. Умный режим. Titanовый нагреватель.",en:"Convenient 50L water heater. Smart energy-saving mode. Titanium heater."},
   sp:{uz:["50 L","Smart rejim","Titan isitgich","2000 W","Dry Protect","A+"],ru:["50 л","Smart режим","Titan нагреватель","2000 Вт","Dry Protect","A+"],en:["50L","Smart mode","Titanium heater","2000W","Dry Protect","A+"]}},
  {id:53,cat:"waterheater",brand:"bosch",  p:2800000,old:3200000,disc:12,r:4.7,rv:54,g:36,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Bosch TR2000 80L",ru:"Bosch TR2000 80L",en:"Bosch TR2000 80L"},
   dsc:{uz:"80 litr katta oila uchun. German sifati. EcoSmart texnologiyasi.",ru:"80 литров для большой семьи. Немецкое качество. EcoSmart.",en:"80L for large families. German quality. EcoSmart technology."},
   sp:{uz:["80 L","EcoSmart","2000 W","AntiCorrosion","Dry Protect","A++"],ru:["80 л","EcoSmart","2000 Вт","AntiCorrosion","Dry Protect","A++"],en:["80L","EcoSmart","2000W","AntiCorrosion","Dry Protect","A++"]}},
  {id:54,cat:"waterheater",brand:"midea",  p:1350000,old:1550000,disc:13,r:4.2,rv:44,g:12,s:true, tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Midea F50-20SD1 50L",ru:"Midea F50-20SD1 50L",en:"Midea F50-20SD1 50L"},
   dsc:{uz:"Byudjet segmentida ishonchli 50 litrli suv isitgich. Oson o'rnatish.",ru:"Надёжный 50-литровый водонагреватель в бюджете. Простая установка.",en:"Reliable 50L water heater in budget. Easy installation."},
   sp:{uz:["50 L","2000 W","Enamel","Dry Protect","Termostat","2 yil"],ru:["50 л","2000 Вт","Эмаль","Dry Protect","Терморегулятор","2 года"],en:["50L","2000W","Enamel","Dry Protect","Thermostat","2 years"]}},
  {id:55,cat:"waterheater",brand:"haier",  p:2100000,old:2450000,disc:14,r:4.4,rv:38,g:24,s:true, tr:false,nw:true,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Haier ES80H-F5 80L",ru:"Haier ES80H-F5 80L",en:"Haier ES80H-F5 80L"},
   dsc:{uz:"80 litrli katta idish. Oq rangdagi zamonaviy dizayn. Elektron panel.",ru:"80 литров. Современный белый дизайн. Электронная панель.",en:"80L tank. Modern white design. Electronic panel."},
   sp:{uz:["80 L","1500 W","Elektron panel","AntiCorr","Termostat","A+"],ru:["80 л","1500 Вт","Электронная панель","AntiCorr","Терморегулятор","A+"],en:["80L","1500W","Electronic panel","AntiCorr","Thermostat","A+"]}},
  {id:56,cat:"waterheater",brand:"samsung",p:3200000,old:3700000,disc:13,r:4.6,rv:29,g:36,s:false,tr:false,nw:false,
   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
   nm:{uz:"Samsung SWH-F80 80L Smart",ru:"Samsung SWH-F80 80L Smart",en:"Samsung SWH-F80 80L Smart"},
   dsc:{uz:"Smart WiFi boshqaruv. Aqlli iste'molni kuzatish. Premium dizayn.",ru:"Умное WiFi управление. Мониторинг потребления. Премиум дизайн.",en:"Smart WiFi control. Smart consumption monitoring. Premium design."},
   sp:{uz:["80 L","WiFi Smart","2000 W","Titan","Dry Protect","A++"],ru:["80 л","WiFi Smart","2000 Вт","Titan","Dry Protect","A++"],en:["80L","WiFi Smart","2000W","Titan","Dry Protect","A++"]}},
];

/* ─── FRAMER VARIANTS ──────────────────────────────────────────────────────── */
const V = {
  fadeUp:  {hidden:{opacity:0,y:28},  visible:{opacity:1,y:0,  transition:{duration:.55,ease:[.16,1,.3,1]}}},
  fadeIn:  {hidden:{opacity:0},       visible:{opacity:1,       transition:{duration:.4}}},
  fadeLeft:{hidden:{opacity:0,x:-24}, visible:{opacity:1,x:0,  transition:{duration:.5,ease:[.16,1,.3,1]}}},
  scaleIn: {hidden:{opacity:0,scale:.92},visible:{opacity:1,scale:1,transition:{type:"spring",stiffness:260,damping:24}}},
  stagger: {hidden:{},visible:{transition:{staggerChildren:.07,delayChildren:.05}}},
  card:    {hidden:{opacity:0,y:22},  visible:{opacity:1,y:0,  transition:{duration:.4,ease:[.16,1,.3,1]}}},
};

/* ─── LOADING SCREEN ──────────────────────────────────────────────────────── */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setPct(p => { if (p >= 100) { clearInterval(t); setTimeout(onDone, 320); return 100; } return p + Math.random()*3+1.5; });
    }, 35);
    return () => clearInterval(t);
  }, [onDone]);
  const clamp = Math.min(100, Math.round(pct));

  return (
    <motion.div exit={{opacity:0,scale:1.06}} transition={{duration:.6,ease:[.76,0,.24,1]}}
      style={{position:"fixed",inset:0,background:"#03060f",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:36}}>
      {/* rotating ring */}
      <motion.div style={{position:"relative",width:110,height:110}}>
        <motion.div animate={{rotate:360}} transition={{duration:2.5,repeat:Infinity,ease:"linear"}}
          style={{position:"absolute",inset:0,borderRadius:"50%",border:"2px solid transparent",borderTopColor:"#7c3aed",borderRightColor:"#06b6d4",boxShadow:"0 0 30px rgba(124,58,237,.4)"}} />
        <motion.div animate={{rotate:-360}} transition={{duration:4,repeat:Infinity,ease:"linear"}}
          style={{position:"absolute",inset:8,borderRadius:"50%",border:"1px solid transparent",borderBottomColor:"#f59e0b",opacity:.6}} />
        <motion.div initial={{scale:0,rotate:-180}} animate={{scale:1,rotate:0}} transition={{type:"spring",stiffness:180,damping:18,delay:.2}}
          style={{position:"absolute",inset:16,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:900,color:"#fff",fontFamily:"Unbounded",boxShadow:"0 0 40px rgba(124,58,237,.5)"}}>A</motion.div>
      </motion.div>

      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.3}} style={{textAlign:"center"}}>
        <div className="UB gtxt" style={{fontSize:22,fontWeight:800,letterSpacing:-.5,marginBottom:6}}>Aka-Uka Maishiy Texnika</div>
        <div style={{fontSize:11,color:"#374151",letterSpacing:3,textTransform:"uppercase"}}>yuklanmoqda</div>
      </motion.div>

      <div style={{width:220,height:3,borderRadius:99,background:"#111827",overflow:"hidden",position:"relative"}}>
        <motion.div initial={{width:0}} animate={{width:`${clamp}%`}} transition={{ease:"easeOut"}}
          style={{height:"100%",borderRadius:99,background:"linear-gradient(90deg,#7c3aed,#06b6d4,#f59e0b)",boxShadow:"0 0 10px rgba(124,58,237,.6)"}} />
      </div>
      <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.4}}
        style={{fontSize:13,color:"#7c3aed",fontWeight:700,fontFamily:"Unbounded"}}>{clamp}%</motion.span>

      {/* floating dots */}
      {[0,1,2].map(i=>(
        <motion.div key={i} animate={{y:[-6,6,-6],opacity:[.4,1,.4]}}
          transition={{duration:1.2,delay:i*.2,repeat:Infinity}}
          style={{position:"absolute",width:5,height:5,borderRadius:"50%",background:"#7c3aed",
                  left:`${40+i*10}%`,bottom:"15%"}} />
      ))}
    </motion.div>
  );
}

/* ─── CURSOR GLOW ─────────────────────────────────────────────────────────── */
function CursorGlow() {
  const mx = useMotionValue(-200), my = useMotionValue(-200);
  const sx = useSpring(mx,{stiffness:200,damping:25});
  const sy = useSpring(my,{stiffness:200,damping:25});
  useEffect(()=>{
    const h = e=>{mx.set(e.clientX-20);my.set(e.clientY-20);};
    window.addEventListener("mousemove",h);
    return()=>window.removeEventListener("mousemove",h);
  },[mx,my]);
  return <motion.div style={{position:"fixed",left:sx,top:sy,width:40,height:40,borderRadius:"50%",border:"1.5px solid rgba(124,58,237,.45)",zIndex:10000,pointerEvents:"none",mixBlendMode:"difference"}} />;
}

/* ─── TOAST ───────────────────────────────────────────────────────────────── */
function Toast({msg,type}){
  return(
    <motion.div initial={{opacity:0,y:-40,x:"-50%"}} animate={{opacity:1,y:0,x:"-50%"}} exit={{opacity:0,y:-40,x:"-50%"}}
      style={{position:"fixed",top:80,left:"50%",zIndex:8000,padding:"12px 24px",borderRadius:99,fontSize:14,fontWeight:700,whiteSpace:"nowrap",
        background:type==="success"?"linear-gradient(135deg,#10b981,#059669)":"linear-gradient(135deg,#f43f5e,#dc2626)",
        color:"#fff",boxShadow:"0 8px 30px rgba(0,0,0,.25)"}}>
      {msg}
    </motion.div>
  );
}

/* ─── HERO PARTICLES ──────────────────────────────────────────────────────── */
function HeroParticles({dark}){
  const dots = useMemo(()=>Array.from({length:22},(_,i)=>({
    id:i, x:Math.random()*100, y:Math.random()*100,
    s:Math.random()*2.5+1, d:Math.random()*8+5, delay:Math.random()*4,
  })),[]);
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      {dots.map(d=>(
        <motion.div key={d.id} animate={{y:[0,-22,0],opacity:[.15,.55,.15]}}
          transition={{duration:d.d,delay:d.delay,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",left:`${d.x}%`,top:`${d.y}%`,width:d.s,height:d.s,borderRadius:"50%",
            background:dark?"rgba(124,58,237,.7)":"rgba(124,58,237,.35)"}} />
      ))}
    </div>
  );
}

/* ═══════════════ MAIN APP ════════════════════════════════════════════════════ */
export default function App(){
  const [loading,  setLoading]  = useState(true);
  const [lang,     setLang]     = useState("uz");
  const [dark,     setDark]     = useState(true);
  const [cat,      setCat]      = useState("all");
  const [query,    setQuery]    = useState("");
  const [sort,     setSort]     = useState("default");
  const [modal,    setModal]    = useState(null);
  const [filterOpen,setFilterOpen]=useState(false);
  const [contact,  setContact]  = useState(false);
  const [toast,    setToast]    = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [filters,  setFilters]  = useState({brands:[],min:0,max:15000000,rating:0,stock:false});
  const [tmpF,     setTmpF]     = useState({brands:[],min:0,max:15000000,rating:0,stock:false});
  const tickerRef = useRef(null);
  const t = TR[lang];

  /* scroll header */
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>64);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  /* ticker */
  useEffect(()=>{
    const el=tickerRef.current; if(!el) return;
    let pos=0;
    const id=setInterval(()=>{ pos+=.55; if(pos>=el.scrollWidth/2) pos=0; el.scrollLeft=pos; },16);
    return()=>clearInterval(id);
  },[]);

  const notify = useCallback((msg,type="success")=>{
    setToast({msg,type}); setTimeout(()=>setToast(null),2800);
  },[]);

  /* theme */
  const C = useMemo(()=>({
    bg:    dark?"#03060f":"#eef0f8",
    surf:  dark?"#080d1c":"#ffffff",
    card:  dark?"#0c1128":"#ffffff",
    bord:  dark?"#1a2040":"#e0e4f0",
    txt:   dark?"#dde4f8":"#111827",
    sub:   dark?"#5a6a8a":"#6b7280",
    acc:   "#7c3aed",
    acc2:  "#06b6d4",
    glow:  "rgba(124,58,237,.14)",
    grn:   "#10b981",
    red:   "#f43f5e",
    gold:  "#f59e0b",
  }),[dark]);

  /* filtered products — category strict match */
  const shown = useMemo(()=>{
    let list = cat==="all"
      ? [...PRODS]
      : PRODS.filter(p=>p.cat===cat);

    if(filters.brands.length) list=list.filter(p=>filters.brands.includes(p.brand));
    if(filters.stock) list=list.filter(p=>p.s);
    list=list.filter(p=>p.p>=filters.min&&p.p<=filters.max);
    if(filters.rating>0) list=list.filter(p=>p.r>=filters.rating);
    if(query.trim()){
      const q=query.toLowerCase();
      list=list.filter(p=>p.nm[lang].toLowerCase().includes(q)||p.brand.toLowerCase().includes(q));
    }
    if(sort==="price-asc")  list=[...list].sort((a,b)=>a.p-b.p);
    if(sort==="price-desc") list=[...list].sort((a,b)=>b.p-a.p);
    if(sort==="rating")     list=[...list].sort((a,b)=>b.r-a.r);
    if(sort==="disc")       list=[...list].sort((a,b)=>b.disc-a.disc);
    return list;
  },[cat,filters,query,sort,lang]);

  const trending = useMemo(()=>PRODS.filter(p=>p.tr).slice(0,8),[]);
  const onSale   = useMemo(()=>[...PRODS].filter(p=>p.disc>0).sort((a,b)=>b.disc-a.disc).slice(0,8),[]);
  const newItems = useMemo(()=>PRODS.filter(p=>p.nw).slice(0,6),[]);

  const filterCount = filters.brands.length+(filters.rating>0?1:0)+(filters.stock?1:0)+(filters.min>0||filters.max<15000000?1:0);

  const applyFilter = ()=>{ setFilters({...tmpF}); setFilterOpen(false); notify(t.filterApplied); };
  const clearFilter = ()=>{
    const d={brands:[],min:0,max:15000000,rating:0,stock:false};
    setTmpF(d); setFilters(d); notify(t.filterCleared,"info");
  };

  if(loading) return(
    <>
      <style>{GS}</style>
      <AnimatePresence><Loader onDone={()=>setLoading(false)} /></AnimatePresence>
    </>
  );

  return(
    <>
      <style>{GS}</style>
      <CursorGlow />
      <AnimatePresence>{toast&&<Toast msg={toast.msg} type={toast.type}/>}</AnimatePresence>

      <div className="ON" style={{background:C.bg,color:C.txt,minHeight:"100vh",transition:"background .35s,color .35s"}}>

        {/* ══ NAV ══ */}
        <motion.nav style={{
          position:"fixed",top:0,left:0,right:0,zIndex:500,height:68,
          background:scrolled?(dark?"rgba(3,6,15,.9)":"rgba(238,240,248,.9)"):"transparent",
          backdropFilter:scrolled?"blur(22px)":"none",
          borderBottom:`1px solid ${scrolled?C.bord:"transparent"}`,
          boxShadow:scrolled?"0 2px 30px rgba(0,0,0,.12)":"none",
          transition:"all .4s",display:"flex",alignItems:"center",
        }}>
          <div style={{maxWidth:1360,margin:"0 auto",padding:"0 20px",width:"100%",display:"flex",alignItems:"center",gap:14}}>
            {/* logo */}
            <motion.div whileHover={{scale:1.04}} style={{display:"flex",alignItems:"center",gap:10,flexShrink:0,cursor:"pointer"}}>
              <div style={{width:40,height:40,borderRadius:13,background:"linear-gradient(135deg,#7c3aed,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,color:"#fff",fontFamily:"Unbounded",boxShadow:"0 6px 20px rgba(124,58,237,.4)"}}>A</div>
              <div>
                <div className="UB" style={{fontSize:13,fontWeight:700,letterSpacing:-.4,lineHeight:1}}>{t.name}</div>
                <div className="nav-logo-sub" style={{fontSize:9,color:C.sub,letterSpacing:.5}}>{t.tag}</div>
              </div>
            </motion.div>

            {/* search */}
            <div className="nav-search" style={{flex:1,maxWidth:460,position:"relative"}}>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}
                style={{width:"100%",padding:"9px 40px 9px 40px",borderRadius:14,border:`1.5px solid ${C.bord}`,background:dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",color:C.txt,fontSize:13,outline:"none",fontFamily:"Onest",transition:"border-color .2s,box-shadow .2s"}}
                onFocus={e=>{e.target.style.borderColor="#7c3aed";e.target.style.boxShadow="0 0 0 3px rgba(124,58,237,.15)";}}
                onBlur={e=>{e.target.style.borderColor=C.bord;e.target.style.boxShadow="none";}}/>
              <svg style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",opacity:.4,pointerEvents:"none"}} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              {query&&<motion.button whileTap={{scale:.88}} onClick={()=>setQuery("")}
                style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:C.sub,fontSize:19,lineHeight:1}}>×</motion.button>}
            </div>

            {/* controls */}
            <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
              {/* sort */}
              <select className="nav-sort" value={sort} onChange={e=>setSort(e.target.value)}
                style={{padding:"7px 10px",borderRadius:11,border:`1.5px solid ${C.bord}`,background:dark?"#0c1128":"#fff",color:C.txt,fontSize:12,fontFamily:"Onest",cursor:"pointer",outline:"none"}}>
                <option value="default">{t.sortDef}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
                <option value="rating">{t.sortRating}</option>
                <option value="disc">{t.sortDisc}</option>
              </select>

              {/* lang */}
              <div style={{display:"flex",gap:3,background:dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",borderRadius:11,padding:3}}>
                {["uz","ru","en"].map(l=>(
                  <motion.button key={l} whileTap={{scale:.9}} onClick={()=>setLang(l)}
                    style={{padding:"5px 9px",borderRadius:8,border:"none",background:l===lang?"linear-gradient(135deg,#7c3aed,#06b6d4)":"transparent",color:l===lang?"#fff":C.sub,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"Onest",transition:"all .2s"}}>
                    {l.toUpperCase()}
                  </motion.button>
                ))}
              </div>

              {/* theme */}
              <motion.button whileTap={{scale:.88}} onClick={()=>setDark(!dark)}
                style={{width:38,height:38,borderRadius:12,border:`1.5px solid ${C.bord}`,background:dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",fontSize:17,cursor:"pointer",color:C.txt,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {dark?"☀️":"🌙"}
              </motion.button>

              {/* filter */}
              <motion.button whileHover={{scale:1.04}} whileTap={{scale:.95}}
                onClick={()=>{setTmpF({...filters});setFilterOpen(true);}}
                style={{display:"flex",alignItems:"center",gap:7,padding:"8px 16px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#06b6d4)",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Onest",position:"relative",boxShadow:"0 4px 16px rgba(124,58,237,.35)"}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                {t.filter}
                {filterCount>0&&<span style={{position:"absolute",top:-6,right:-6,width:17,height:17,borderRadius:"50%",background:C.red,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{filterCount}</span>}
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* ══ HERO ══ */}
        <motion.section initial="hidden" animate="visible" variants={V.stagger}
          style={{position:"relative",overflow:"hidden",paddingTop:68,minHeight:560,display:"flex",alignItems:"center"}}>
          <HeroParticles dark={dark}/>
          {/* grid bg */}
          <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.bord} 1px,transparent 1px),linear-gradient(90deg,${C.bord} 1px,transparent 1px)`,backgroundSize:"55px 55px",opacity:dark?.22:.1}}/>
          {/* orbs */}
          {[["#7c3aed",-100,-100,500],["#06b6d4",null,80,350],["#f59e0b",200,-50,280]].map(([clr,t2,r,sz],i)=>(
            <motion.div key={i} animate={{scale:[1,1.18,1],opacity:[.12,.22,.12]}} transition={{duration:6+i*2,repeat:Infinity,delay:i*1.5}}
              style={{position:"absolute",width:sz,height:sz,borderRadius:"50%",background:`radial-gradient(circle,${clr}30,transparent)`,
                      top:t2??undefined,bottom:t2===null?r:undefined,right:r<0?undefined:i===1?r:undefined,left:t2!==null&&i!==1?r:undefined,pointerEvents:"none"}}/>
          ))}

          <div style={{position:"relative",zIndex:2,maxWidth:1360,margin:"0 auto",padding:"80px 20px 60px",width:"100%"}}>
            <div style={{maxWidth:700}}>
              <motion.div variants={V.fadeUp} style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.25)",borderRadius:99,padding:"7px 18px",marginBottom:26}}>
                <motion.div animate={{scale:[1,1.5,1]}} transition={{duration:1.6,repeat:Infinity,ease:"easeInOut"}}
                  style={{width:7,height:7,borderRadius:"50%",background:"#7c3aed",boxShadow:"0 0 8px #7c3aed"}}/>
                <span style={{fontSize:12,color:"#a78bfa",fontWeight:600}}>{t.tag}</span>
              </motion.div>

              <motion.h1 variants={V.fadeUp} className="UB gtxt"
                style={{fontSize:"clamp(1.9rem,5vw,3.6rem)",fontWeight:900,lineHeight:1.06,letterSpacing:-1.5,marginBottom:20}}>
                {t.name}
              </motion.h1>

              <motion.p variants={V.fadeUp} style={{fontSize:15,color:C.sub,lineHeight:1.85,maxWidth:500,marginBottom:36}}>
                Samsung · LG · Bosch · Artel · Midea · Haier · Beko · Hisense · Vestel · Sharp · Panasonic
              </motion.p>

              <motion.div variants={V.fadeUp} style={{display:"flex",gap:32,flexWrap:"wrap"}}>
                {[["56+",t.prods],["12+","Brend"],["5 ★","Xizmat"],["3 yil","Kafolat"]].map(([v,l])=>(
                  <div key={l}>
                    <div className="UB gtxt" style={{fontSize:26,fontWeight:900}}>{v}</div>
                    <div style={{fontSize:11,color:C.sub,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ══ BRANDS TICKER ══ */}
        <div style={{borderTop:`1px solid ${C.bord}`,borderBottom:`1px solid ${C.bord}`,padding:"14px 0",background:dark?"rgba(8,13,28,.95)":"rgba(255,255,255,.95)",overflow:"hidden"}}>
          <div ref={tickerRef} style={{overflow:"hidden",userSelect:"none"}}>
            <div className="ticker-ani">
              {[...BRANDS,...BRANDS,...BRANDS].map((b,i)=>(
                <div key={i} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:116,height:46,borderRadius:13,background:dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",border:`1px solid ${C.bord}`,cursor:"pointer",flexShrink:0,transition:"all .25s"}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor=b.clr;e.currentTarget.style.background=b.clr+"1a";}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor=C.bord;e.currentTarget.style.background=dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)";}}>
                  <span className="UB" style={{fontWeight:800,fontSize:13,color:C.sub}}>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CATEGORIES ══ */}
        <section style={{maxWidth:1360,margin:"0 auto",padding:"40px 20px 0"}}>
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true,amount:.3}} variants={V.fadeLeft} style={{marginBottom:16}}>
            <SecHead icon="🗂️" label={t.cats} C={C} color={C.acc}/>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={V.stagger}
            className="cats-wrap">
            {CATS.map((c)=>{
              const active=cat===c.id;
              const count=c.id==="all"?PRODS.length:PRODS.filter(p=>p.cat===c.id).length;
              return(
                <motion.button key={c.id} variants={V.card}
                  whileHover={{y:-3,boxShadow:`0 6px 18px ${c.clr}28`}} whileTap={{scale:.94}}
                  onClick={()=>setCat(c.id)}
                  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,
                    padding:"12px 8px",borderRadius:14,width:"100%",
                    border:`2px solid ${active?c.clr:C.bord}`,
                    background:active?c.clr+"20":(dark?"rgba(255,255,255,.03)":"#fff"),
                    color:active?c.clr:C.sub,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:"Onest",
                    boxShadow:active?`0 0 16px ${c.clr}28`:"none",transition:"all .22s",textAlign:"center"}}>
                  <span style={{fontSize:22}}>{c.icon}</span>
                  <span style={{lineHeight:1.2}}>{t[c.key]}</span>
                  <span style={{background:active?c.clr:"rgba(128,128,128,.15)",color:active?"#fff":C.sub,
                    borderRadius:99,padding:"1px 6px",fontSize:9,fontWeight:700}}>{count}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        {/* ══ MOBILE SORT+SEARCH (hidden on desktop) ══ */}
        <div className="msort" style={{maxWidth:1360,margin:"0 auto",padding:"12px 20px 0",gap:8,alignItems:"center"}}>
          <style>{`@media(max-width:768px){.msort{display:flex!important}} .msort{display:none}`}</style>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}
            style={{flex:1,padding:"9px 14px",borderRadius:12,border:`1.5px solid ${C.bord}`,background:dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",color:C.txt,fontSize:13,outline:"none",fontFamily:"Onest"}}/>
          <select value={sort} onChange={e=>setSort(e.target.value)}
            style={{padding:"8px 10px",borderRadius:11,border:`1.5px solid ${C.bord}`,background:dark?"#0c1128":"#fff",color:C.txt,fontSize:12,fontFamily:"Onest",cursor:"pointer",outline:"none",flexShrink:0}}>
            <option value="default">{t.sortDef}</option>
            <option value="price-asc">{t.sortPriceAsc}</option>
            <option value="price-desc">{t.sortPriceDesc}</option>
            <option value="rating">{t.sortRating}</option>
            <option value="disc">{t.sortDisc}</option>
          </select>
        </div>

        {/* ══ TRENDING (only on "all") ══ */}
        {cat==="all"&&(
          <CatSection title={t.trending} icon="🔥" color={C.red} C={C}>
            <PGrid items={trending} lang={lang} t={t} C={C} dark={dark} onOpen={setModal} notify={notify}/>
          </CatSection>
        )}

        {/* ══ ON SALE (only on "all") ══ */}
        {cat==="all"&&(
          <CatSection title={t.sale} icon="🏷️" color={C.gold} C={C}>
            <PGrid items={onSale} lang={lang} t={t} C={C} dark={dark} onOpen={setModal} notify={notify}/>
          </CatSection>
        )}

        {/* ══ NEW ARRIVALS (only on "all") ══ */}
        {cat==="all"&&(
          <CatSection title={t.newArr} icon="✨" color={C.grn} C={C}>
            <PGrid items={newItems} lang={lang} t={t} C={C} dark={dark} onOpen={setModal} notify={notify}/>
          </CatSection>
        )}

        {/* ══ MAIN GRID ══ */}
        <section style={{maxWidth:1360,margin:"0 auto",padding:"42px 20px 80px"}}>
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={V.fadeLeft}
            style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <span style={{fontSize:25}}>{CATS.find(c=>c.id===cat)?.icon||"📦"}</span>
            <h2 className="UB" style={{fontSize:21,fontWeight:800,letterSpacing:-.5}}>
              {cat==="all"?t.cats:t[cat]}
            </h2>
            <motion.span key={shown.length} initial={{scale:1.4}} animate={{scale:1}}
              style={{background:"rgba(124,58,237,.14)",color:"#a78bfa",borderRadius:99,padding:"3px 12px",fontSize:12,fontWeight:700,border:"1px solid rgba(124,58,237,.22)"}}>
              {shown.length} {t.prods}
            </motion.span>
            <div style={{flex:1,height:2,borderRadius:99,background:`linear-gradient(90deg,${C.acc},transparent)`}}/>
          </motion.div>

          <AnimatePresence mode="wait">
            {shown.length===0?(
              <motion.div key="empty" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                style={{textAlign:"center",padding:"80px 20px",color:C.sub}}>
                <div style={{fontSize:58,marginBottom:14}}>🔍</div>
                <p className="UB" style={{fontSize:18,fontWeight:700}}>{t.noRes}</p>
              </motion.div>
            ):(
              <motion.div key={`${cat}-${query}-${sort}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <PGrid items={shown} lang={lang} t={t} C={C} dark={dark} onOpen={setModal} notify={notify}/>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{borderTop:`1px solid ${C.bord}`,background:dark?"#03060f":"#fff"}}>
          <div style={{maxWidth:1360,margin:"0 auto",padding:"60px 20px 36px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(255px,1fr))",gap:44}}>
            {/* brand */}
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={V.fadeLeft}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
                <div style={{width:46,height:46,borderRadius:15,background:"linear-gradient(135deg,#7c3aed,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:22,color:"#fff",fontFamily:"Unbounded",boxShadow:"0 6px 22px rgba(124,58,237,.4)"}}>A</div>
                <div>
                  <div className="UB" style={{fontSize:16,fontWeight:800}}>{t.name}</div>
                  <div style={{fontSize:10,color:C.sub}}>{t.tag}</div>
                </div>
              </div>
              <p style={{color:C.sub,fontSize:13,lineHeight:1.85,marginBottom:18}}>
                [Brand haqida ma'lumot bu yerga qo'shiladi.]
              </p>
              {[["📅",`${t.founded}: [Yil]`],["🕐",t.hours]].map(([ic,tx])=>(
                <div key={tx} style={{display:"flex",alignItems:"center",gap:8,color:C.sub,fontSize:12,marginBottom:8}}>
                  <span style={{fontSize:15}}>{ic}</span><span>{tx}</span>
                </div>
              ))}
            </motion.div>

            {/* contact */}
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={V.fadeUp}>
              <h3 className="UB" style={{fontSize:16,fontWeight:800,marginBottom:20}}>{t.contact}</h3>
              {[
                {href:"tel:+998901234567",icon:"📞",title:t.phone,sub:"+998 90 123 45 67",hc:C.grn},
                {href:"https://maps.google.com",icon:"📍",title:t.address,sub:"[Manzil]",hc:C.acc},
                {href:"https://t.me/akaukatech",icon:"✈️",title:"Telegram",sub:"@akaukatech",hc:"#0088cc"},
              ].map(item=>(
                <motion.a key={item.title} whileHover={{x:5}} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noreferrer"
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:13,background:dark?"rgba(255,255,255,.04)":"#f4f6fa",border:`1px solid ${C.bord}`,textDecoration:"none",color:C.txt,transition:"all .2s",marginBottom:9}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor=item.hc;e.currentTarget.style.background=item.hc+"14";}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor=C.bord;e.currentTarget.style.background=dark?"rgba(255,255,255,.04)":"#f4f6fa";}}>
                  <span style={{fontSize:20}}>{item.icon}</span>
                  <div><div style={{fontSize:10,color:C.sub}}>{item.title}</div><div style={{fontSize:13,fontWeight:600}}>{item.sub}</div></div>
                </motion.a>
              ))}
            </motion.div>

            {/* brands */}
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={V.fadeRight??V.fadeUp}>
              <h3 className="UB" style={{fontSize:16,fontWeight:800,marginBottom:20}}>{t.allBrands}</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {BRANDS.map(b=>(
                  <motion.div key={b.id} whileHover={{x:3}}
                    style={{padding:"8px 12px",borderRadius:10,border:`1px solid ${C.bord}`,background:dark?"rgba(255,255,255,.03)":"#f8faff",display:"flex",alignItems:"center",gap:7,cursor:"pointer",transition:"all .2s"}}
                    onMouseOver={e=>{e.currentTarget.style.borderColor=b.clr;e.currentTarget.style.background=b.clr+"14";}}
                    onMouseOut={e=>{e.currentTarget.style.borderColor=C.bord;e.currentTarget.style.background=dark?"rgba(255,255,255,.03)":"#f8faff";}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:b.clr,flexShrink:0}}/>
                    <span className="UB" style={{fontWeight:700,fontSize:12}}>{b.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div style={{borderTop:`1px solid ${C.bord}`,padding:"18px 20px",textAlign:"center",color:C.sub,fontSize:12}}>
            © 2024 <span className="UB gtxt" style={{fontWeight:800}}>{t.name}</span>. Barcha huquqlar himoyalangan.
          </div>
        </footer>

        {/* ══ FLOATING CONTACT ══ */}
        <div style={{position:"fixed",bottom:28,right:28,zIndex:600,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:12}}>
          <AnimatePresence>
            {contact&&(
              <motion.div initial={{opacity:0,scale:.88,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.88,y:12}}
                style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:22,padding:22,minWidth:255,boxShadow:"0 24px 70px rgba(0,0,0,.4)",transformOrigin:"bottom right"}}>
                <div className="UB" style={{fontWeight:800,fontSize:15,marginBottom:16}}>📞 {t.contact}</div>
                {[
                  {href:"tel:+998901234567",bg:"linear-gradient(135deg,#10b981,#059669)",icon:"📲",label:"+998 90 123 45 67"},
                  {href:"https://maps.google.com",bg:"linear-gradient(135deg,#7c3aed,#06b6d4)",icon:"📍",label:t.loc,blank:true},
                ].map(item=>(
                  <motion.a key={item.label} whileHover={{scale:1.02}} whileTap={{scale:.97}}
                    href={item.href} target={item.blank?"_blank":undefined} rel="noreferrer"
                    style={{display:"flex",alignItems:"center",gap:10,padding:"11px 15px",borderRadius:13,background:item.bg,color:"#fff",textDecoration:"none",fontWeight:700,fontSize:14,marginBottom:9}}>
                    <span style={{fontSize:18}}>{item.icon}</span>{item.label}
                  </motion.a>
                ))}
                <div style={{padding:"10px 15px",borderRadius:12,background:dark?"rgba(255,255,255,.05)":"#f4f6fa",border:`1px solid ${C.bord}`,fontSize:12,color:C.sub}}>
                  🕐 {t.hours}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button whileHover={{scale:1.12}} whileTap={{scale:.9}} onClick={()=>setContact(c=>!c)}
            className={contact?"":"pulse-ring"}
            style={{width:58,height:58,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,
              background:contact?"linear-gradient(135deg,#f43f5e,#dc2626)":"linear-gradient(135deg,#10b981,#059669)",
              boxShadow:contact?"0 8px 28px rgba(244,63,94,.5)":"0 8px 28px rgba(16,185,129,.5)",
              transition:"background .3s,box-shadow .3s"}}>
            <motion.span animate={{rotate:contact?45:0}} transition={{type:"spring",stiffness:300}}>
              {contact?"✕":"📞"}
            </motion.span>
          </motion.button>
        </div>

        {/* ══ FILTER MODAL ══ */}
        <AnimatePresence>
          {filterOpen&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setFilterOpen(false)}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,.78)",zIndex:700,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0"}}>
              <motion.div initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} exit={{opacity:0,y:60}}
                onClick={e=>e.stopPropagation()}
                style={{background:C.card,borderRadius:"28px 28px 0 0",width:"100%",maxWidth:520,maxHeight:"88vh",overflow:"hidden",boxShadow:"0 -20px 60px rgba(0,0,0,.4)",display:"flex",flexDirection:"column"}}>
                {/* head */}
                <div style={{padding:"20px 24px",borderBottom:`1px solid ${C.bord}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                  <h2 className="UB" style={{fontSize:18,fontWeight:800,display:"flex",alignItems:"center",gap:9}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    {t.filter}
                    {filterCount>0&&<span style={{background:C.red,color:"#fff",borderRadius:99,padding:"2px 8px",fontSize:10,fontWeight:800}}>{filterCount}</span>}
                  </h2>
                  <motion.button whileTap={{scale:.88}} onClick={()=>setFilterOpen(false)}
                    style={{width:34,height:34,borderRadius:10,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",color:C.txt,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</motion.button>
                </div>
                {/* body */}
                <div style={{padding:"20px 24px",overflowY:"auto",flex:1}}>
                  {/* brands */}
                  <FSection title={`🏷️ ${t.brand}`} C={C}>
                    <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                      {BRANDS.map(b=>{
                        const sel=tmpF.brands.includes(b.id);
                        return(
                          <motion.button key={b.id} whileTap={{scale:.92}}
                            onClick={()=>setTmpF(f=>({...f,brands:sel?f.brands.filter(x=>x!==b.id):[...f.brands,b.id]}))}
                            style={{padding:"5px 12px",borderRadius:99,border:`2px solid ${sel?b.clr:C.bord}`,background:sel?b.clr+"20":"transparent",color:sel?b.clr:C.sub,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"Onest",transition:"all .2s"}}>
                            {b.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </FSection>
                  {/* price */}
                  <FSection title={`💰 ${t.price}`} C={C}>
                    <div style={{display:"flex",gap:10,marginBottom:12}}>
                      {[["min",t.pFrom],["max",t.pTo]].map(([k,lbl])=>(
                        <div key={k} style={{flex:1}}>
                          <label style={{fontSize:10,color:C.sub,fontWeight:600,display:"block",marginBottom:5}}>{lbl}</label>
                          <input type="number" value={tmpF[k]} onChange={e=>setTmpF(f=>({...f,[k]:+e.target.value}))}
                            style={{width:"100%",padding:"8px 10px",borderRadius:11,border:`1.5px solid ${C.bord}`,background:dark?"#080d1c":"#f4f6fa",color:C.txt,fontSize:13,fontFamily:"Onest",outline:"none"}}/>
                        </div>
                      ))}
                    </div>
                    <input type="range" min={0} max={15000000} step={100000} value={tmpF.max}
                      onChange={e=>setTmpF(f=>({...f,max:+e.target.value}))}
                      style={{background:`linear-gradient(90deg,#7c3aed ${tmpF.max/150000}%,${C.bord} 0)`}}/>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.sub,marginTop:4}}>
                      <span>0</span>
                      <span style={{color:"#a78bfa",fontWeight:700}}>{fm(tmpF.max)} {t.soum}</span>
                    </div>
                  </FSection>
                  {/* rating */}
                  <FSection title={`⭐ ${t.rating}`} C={C}>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                      {[0,3,3.5,4,4.5,4.8].map(r=>{
                        const sel=tmpF.rating===r;
                        return(
                          <motion.button key={r} whileTap={{scale:.92}}
                            onClick={()=>setTmpF(f=>({...f,rating:r}))}
                            style={{padding:"5px 12px",borderRadius:99,border:`2px solid ${sel?C.gold:C.bord}`,background:sel?"rgba(245,158,11,.18)":"transparent",color:sel?C.gold:C.sub,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"Onest",transition:"all .2s"}}>
                            {r===0?t.allCat:`${r}+⭐`}
                          </motion.button>
                        );
                      })}
                    </div>
                  </FSection>
                  {/* stock toggle */}
                  <div style={{display:"flex",alignItems:"center",gap:13}}>
                    <motion.div whileTap={{scale:.93}} onClick={()=>setTmpF(f=>({...f,stock:!f.stock}))}
                      style={{width:48,height:26,borderRadius:99,cursor:"pointer",background:tmpF.stock?"#7c3aed":C.bord,position:"relative",transition:"background .3s",flexShrink:0}}>
                      <motion.div layout style={{position:"absolute",top:3,left:tmpF.stock?26:3,width:20,height:20,borderRadius:"50%",background:"#fff",boxShadow:"0 2px 6px rgba(0,0,0,.2)"}}/>
                    </motion.div>
                    <span style={{fontWeight:600,fontSize:14}}>{t.inStock}</span>
                  </div>
                </div>
                {/* footer */}
                <div style={{padding:"16px 24px",borderTop:`1px solid ${C.bord}`,display:"flex",gap:10,flexShrink:0}}>
                  <motion.button whileTap={{scale:.95}} onClick={clearFilter}
                    style={{flex:1,padding:12,borderRadius:12,border:`1.5px solid ${C.bord}`,background:"transparent",color:C.sub,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"Onest"}}>
                    🔄 {t.reset}
                  </motion.button>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:.95}} onClick={applyFilter}
                    style={{flex:2,padding:12,borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#06b6d4)",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Onest",boxShadow:"0 6px 20px rgba(124,58,237,.4)"}}>
                    ✓ {t.apply}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ PRODUCT MODAL ══ */}
        <AnimatePresence>
          {modal&&<PModal p={modal} lang={lang} t={t} C={C} dark={dark}
            onClose={()=>setModal(null)}
            notify={notify}/>}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ─── SECTION HEAD ─────────────────────────────────────────────────────────── */
function SecHead({icon,label,C,color}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <motion.span animate={{rotate:[0,12,-12,0]}} transition={{duration:2.5,repeat:Infinity,repeatDelay:4}} style={{fontSize:26}}>{icon}</motion.span>
      <h2 className="UB" style={{fontSize:21,fontWeight:800,letterSpacing:-.5}}>{label}</h2>
      <div style={{flex:1,height:2,borderRadius:99,background:`linear-gradient(90deg,${color||C.acc},transparent)`}}/>
    </div>
  );
}

/* ─── CAT SECTION ──────────────────────────────────────────────────────────── */
function CatSection({title,icon,color,C,children}){
  return(
    <section style={{maxWidth:1360,margin:"0 auto",padding:"42px 20px 0"}}>
      <motion.div initial="hidden" whileInView="visible" viewport={{once:true,amount:.3}} variants={V.fadeLeft} style={{marginBottom:18}}>
        <SecHead icon={icon} label={title} C={C} color={color}/>
      </motion.div>
      {children}
    </section>
  );
}

/* ─── FILTER SECTION ──────────────────────────────────────────────────────── */
function FSection({title,C,children}){
  return(
    <div style={{marginBottom:24}}>
      <p className="UB" style={{fontWeight:700,marginBottom:12,fontSize:13,color:C.txt}}>{title}</p>
      {children}
    </div>
  );
}

/* ─── PRODUCT GRID ─────────────────────────────────────────────────────────── */
function PGrid({items,lang,t,C,dark,onOpen,notify}){
  return(
    <motion.div initial="hidden" whileInView="visible" viewport={{once:true,amount:.04}} variants={V.stagger}
      className="pgrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(252px,1fr))",gap:18}}>
      {items.map(p=><PCard key={p.id} p={p} lang={lang} t={t} C={C} dark={dark} onOpen={onOpen} notify={notify}/>)}
    </motion.div>
  );
}

/* ─── PRODUCT CARD ─────────────────────────────────────────────────────────── */
function PCard({p,lang,t,C,dark,onOpen,notify}){
  const brand=BRANDS.find(b=>b.id===p.brand);
  const [hov,setHov]=useState(false);

  return(
    <motion.div variants={V.card}
      whileHover={{y:-7}}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      className="card-img"
      style={{background:C.card,borderRadius:20,overflow:"hidden",cursor:"pointer",
        border:`1px solid ${hov?(brand?.clr||C.acc):C.bord}`,
        boxShadow:hov?`0 16px 44px ${brand?.clr||C.acc}1e`:(dark?"0 4px 18px rgba(0,0,0,.32)":"0 4px 18px rgba(0,0,0,.07)"),
        transition:"border-color .25s,box-shadow .25s"}}
      onClick={()=>onOpen(p)}>

      {/* image */}
      <div style={{position:"relative",aspectRatio:"4/3",overflow:"hidden",background:dark?"#080d1c":"#eef2f9"}}>
        <img src={p.img} alt={p.nm[lang]} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.28) 0%,transparent 55%)"}}/>
        {/* badges */}
        <div style={{position:"absolute",top:10,left:10,display:"flex",flexDirection:"column",gap:5}}>
          {p.disc>0&&<motion.span initial={{scale:0}} animate={{scale:1}} style={{background:C.red,color:"#fff",borderRadius:7,padding:"3px 9px",fontSize:11,fontWeight:800}}>-{p.disc}%</motion.span>}
          {p.nw&&<span style={{background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",borderRadius:7,padding:"3px 9px",fontSize:11,fontWeight:800}}>{t.isNew}</span>}
        </div>
        {p.tr&&<span style={{position:"absolute",top:10,right:10,background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",borderRadius:7,padding:"3px 9px",fontSize:10,fontWeight:700}}>🔥 {t.hot}</span>}
        {!p.s&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontWeight:700,fontSize:13,background:"rgba(0,0,0,.7)",padding:"7px 16px",borderRadius:9}}>{t.outStock}</span></div>}
      </div>

      {/* body */}
      <div style={{padding:"15px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
          <span style={{fontSize:9,fontWeight:800,color:brand?.clr||C.acc,letterSpacing:1,textTransform:"uppercase"}}>{p.brand}</span>
          <div style={{display:"flex",alignItems:"center",gap:3}}>
            <span style={{color:C.gold,fontSize:11}}>★</span>
            <span style={{fontSize:11,fontWeight:700}}>{p.r}</span>
            <span style={{fontSize:10,color:C.sub}}>({p.rv})</span>
          </div>
        </div>
        <h3 className="UB" style={{fontWeight:700,fontSize:13,lineHeight:1.38,marginBottom:10,color:C.txt}}>{p.nm[lang]}</h3>

        {/* spec pills */}
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:11}}>
          {p.sp[lang].slice(0,3).map((s,i)=>(
            <span key={i} style={{fontSize:9,background:dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",borderRadius:5,padding:"2px 6px",color:C.sub,fontWeight:500}}>{s}</span>
          ))}
        </div>

        {/* price */}
        <div style={{marginBottom:12}}>
          {p.disc>0&&<div style={{fontSize:11,color:C.sub,textDecoration:"line-through",lineHeight:1}}>{fm(p.old)} {t.soum}</div>}
          <div className="UB" style={{fontSize:19,fontWeight:900,color:p.disc>0?C.red:C.txt,lineHeight:1.2}}>
            {fm(p.p)} <span style={{fontSize:11,fontWeight:500}}>{t.soum}</span>
          </div>
          {p.disc>0&&<div style={{fontSize:10,color:C.grn,fontWeight:600}}>↓ {fm(p.old-p.p)} {t.soum} {t.save}</div>}
        </div>

        {/* actions */}
        <div style={{display:"flex",gap:7}}>
          <motion.button whileTap={{scale:.94}} onClick={e=>{e.stopPropagation();onOpen(p);}}
            style={{flex:1,padding:"9px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#7c3aed,#06b6d4)",color:"#fff",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"Onest",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            {t.details}
          </motion.button>
          <motion.button whileTap={{scale:.9}} onClick={e=>{e.stopPropagation();notify(`📞 ${p.nm[lang].slice(0,22)}...`,"success");}}
            style={{width:40,height:40,borderRadius:11,border:`1.5px solid ${C.bord}`,background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,transition:"all .2s"}}
            onMouseOver={e=>{e.currentTarget.style.borderColor=C.grn;e.currentTarget.style.background="rgba(16,185,129,.1)";}}
            onMouseOut={e=>{e.currentTarget.style.borderColor=C.bord;e.currentTarget.style.background="transparent";}}>
            📞
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PRODUCT MODAL ─────────────────────────────────────────────────────────── */
function PModal({p,lang,t,C,dark,onClose,notify}){
  const brand=BRANDS.find(b=>b.id===p.brand);
  const [tab,setTab]=useState("specs");
  const [imgOk,setImgOk]=useState(false);

  const doShare=()=>{
    if(navigator.share){navigator.share({title:p.nm[lang],text:`${fm(p.p)} ${t.soum}`});}
    else{navigator.clipboard?.writeText(window.location.href).catch(()=>{});notify(t.copy,"success");}
  };

  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.82)",zIndex:800,display:"flex",alignItems:"center",justifyContent:"center",padding:14}}>
      <motion.div initial={{opacity:0,scale:.88,y:32}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.88,y:32}}
        transition={{type:"spring",stiffness:260,damping:26}}
        onClick={e=>e.stopPropagation()}
        style={{background:C.card,borderRadius:28,width:"100%",maxWidth:780,maxHeight:"93vh",overflowY:"auto",boxShadow:"0 50px 120px rgba(0,0,0,.6)"}}>

        {/* sticky header */}
        <div style={{position:"sticky",top:0,background:C.card,zIndex:10,padding:"17px 24px",borderBottom:`1px solid ${C.bord}`,display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"28px 28px 0 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:brand?.clr||C.acc}}/>
            <span className="UB" style={{fontSize:11,fontWeight:800,color:brand?.clr||C.acc,textTransform:"uppercase",letterSpacing:1}}>{p.brand}</span>
            {p.nw&&<span style={{background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",borderRadius:99,padding:"2px 9px",fontSize:10,fontWeight:800}}>{t.isNew}</span>}
          </div>
          <div style={{display:"flex",gap:7}}>
            <motion.button whileTap={{scale:.88}} onClick={doShare}
              style={{width:34,height:34,borderRadius:9,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",color:C.sub,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>📤</motion.button>
            <motion.button whileTap={{scale:.88}} onClick={onClose}
              style={{width:34,height:34,borderRadius:9,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",color:C.txt,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</motion.button>
          </div>
        </div>

        <div style={{padding:24}}>
          {/* top grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:26}}>
            {/* image */}
            <div style={{borderRadius:20,overflow:"hidden",aspectRatio:"1",background:dark?"#080d1c":"#eef2f9",position:"relative"}}>
              {!imgOk&&<div style={{position:"absolute",inset:0}} className="shimmer"/>}
              <motion.img src={p.img} alt={p.nm[lang]} onLoad={()=>setImgOk(true)}
                initial={{opacity:0}} animate={{opacity:imgOk?1:0}} transition={{duration:.4}}
                style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              {p.disc>0&&<div style={{position:"absolute",top:12,left:12,background:C.red,color:"#fff",borderRadius:10,padding:"6px 13px",fontSize:14,fontWeight:900}}>-{p.disc}%</div>}
            </div>
            {/* info */}
            <div>
              <h2 className="UB" style={{fontSize:19,fontWeight:800,lineHeight:1.25,marginBottom:12}}>{p.nm[lang]}</h2>
              {/* stars */}
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:17}}>
                <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><span key={s} style={{fontSize:16,color:s<=Math.round(p.r)?C.gold:C.bord}}>★</span>)}</div>
                <span style={{fontSize:13,color:C.sub}}>{p.r} ({p.rv} {t.reviews})</span>
              </div>
              {/* price */}
              <div style={{marginBottom:19}}>
                {p.disc>0&&<div style={{fontSize:13,color:C.sub,textDecoration:"line-through"}}>{fm(p.old)} {t.soum}</div>}
                <div className="UB" style={{fontSize:28,fontWeight:900,color:p.disc>0?C.red:C.txt,lineHeight:1}}>
                  {fm(p.p)}<span style={{fontSize:13,fontWeight:500}}> {t.soum}</span>
                </div>
                {p.disc>0&&<div style={{color:C.grn,fontSize:12,fontWeight:700,marginTop:3}}>✓ {fm(p.old-p.p)} {t.soum} {t.save}</div>}
              </div>
              {/* badge pills */}
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:19}}>
                {[
                  {icon:"🛡️",txt:`${p.g} ${t.months}`,c:C.acc,bg:"rgba(124,58,237,.14)"},
                  {icon:"🚚",txt:t.freeDel,c:C.grn,bg:"rgba(16,185,129,.14)"},
                  {icon:"💳",txt:t.install,c:C.gold,bg:"rgba(245,158,11,.14)"},
                  {icon:p.s?"✅":"❌",txt:p.s?t.inStock:t.outStock,c:p.s?C.grn:C.red,bg:p.s?"rgba(16,185,129,.14)":"rgba(244,63,94,.14)"},
                ].map((b,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:8,background:b.bg,color:b.c,fontSize:11,fontWeight:600}}>
                    {b.icon} {b.txt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* tabs */}
          <div style={{display:"flex",gap:7,marginBottom:18,borderBottom:`1px solid ${C.bord}`,paddingBottom:0}}>
            {[["specs",`⚡ ${t.specs}`],["desc",`📝 ${t.desc}`]].map(([id,lbl])=>(
              <motion.button key={id} whileTap={{scale:.95}} onClick={()=>setTab(id)}
                style={{padding:"9px 16px",borderRadius:"11px 11px 0 0",border:"none",
                  background:tab===id?"linear-gradient(135deg,#7c3aed,#06b6d4)":"transparent",
                  color:tab===id?"#fff":C.sub,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"Onest",
                  borderBottom:tab===id?"2px solid #7c3aed":"2px solid transparent"}}>
                {lbl}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab==="specs"?(
              <motion.div key="specs" initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:12}} style={{marginBottom:26}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                  {p.sp[lang].map((s,i)=>(
                    <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}
                      style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderRadius:12,background:dark?"#080d1c":"#f4f6fa",border:`1px solid ${C.bord}`}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#06b6d4)",flexShrink:0}}/>
                      <span style={{fontSize:12,fontWeight:500}}>{s}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ):(
              <motion.div key="desc" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-12}}
                style={{background:dark?"#080d1c":"#f8faff",borderRadius:15,padding:18,marginBottom:26,border:`1px solid ${C.bord}`}}>
                <p style={{color:C.sub,lineHeight:1.85,fontSize:13}}>{p.dsc[lang]}</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </motion.div>
  );
}