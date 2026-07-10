import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GS=`@import url('https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&family=Unbounded:wght@400;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;overflow-x:hidden}
body{overflow-x:hidden;font-family:'Onest',sans-serif;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#C8C8C8;border-radius:99px}::selection{background:#000;color:#fff}
.UB{font-family:'Unbounded',sans-serif}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pB{0%,100%{box-shadow:0 0 0 0 rgba(0,0,0,.18)}60%{box-shadow:0 0 0 14px rgba(0,0,0,0)}}
@keyframes pW{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.2)}60%{box-shadow:0 0 0 14px rgba(255,255,255,0)}}
.ta{animation:ticker 50s linear infinite;display:inline-flex;gap:12px}.ta:hover{animation-play-state:paused}
.pb{animation:pB 2.8s infinite}.pw{animation:pW 2.8s infinite}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:3px;border-radius:99px;outline:none;cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#111;cursor:pointer;border:2px solid #fff}
input[type=range].dr::-webkit-slider-thumb{background:#fff;border:2px solid #111}
@media(max-width:768px){.ns{display:none!important}.nt{display:none!important}}
@media(max-width:640px){.pg{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}.hh{font-size:clamp(1.6rem,6.5vw,2.2rem)!important}}
@media(max-width:380px){.pg{grid-template-columns:1fr!important}}`;

const TR={
  uz:{brand:"Aka-Uka Maishiy Texnika",tag:"Sifat va Ishonch",search:"Mahsulot qidirish...",allCat:"Barchasi",
    conditioner:"Konditsioner",fridge:"Xolodilnik",washer:"Kir Mashinasi",builtin:"Vstoyenniy Texnika",
    filter:"Filtr",brands:"Brendlar",usdPrice:"Narx (USD)",rating:"Reyting",inStock:"Mavjud",outStock:"Tugagan",
    apply:"Qo'llash",reset:"Tozalash",contact:"Aloqa",phone:"Telefon",guarantee:"Kafolat",
    delivery:"Bepul Yetkazish",install:"Bo'lib to'lash",reviews:"sharh",specs:"Xususiyatlar",months:"oy",
    isNew:"Yangi",hot:"Trend",prods:"mahsulot",desc:"Tavsif",noRes:"Mahsulot topilmadi",
    filterApplied:"Filtr qo'llandi",filterCleared:"Filtr tozalandi",sort:"Saralash",sortDef:"Standart",
    sortPriceAsc:"Narx ↑",sortPriceDesc:"Narx ↓",sortRating:"Reyting",allBrands:"Barcha Brendlar",
    workHours:"09:00-20:00",payNote:"To'lov Markaziy Bank kursi bo'yicha so'mda",wall:"Devordagi",
    floor:"Kolonnik",copy:"Nusxalandi!",currency:"So'mda to'lov",founded:"Tashkil etilgan: 2019",
    address:"Toshkent, O'zbekiston",hours:"Ish vaqti",subFront:"Old yuklanadigan",subTop:"Yuqoridan",
    subRange:"Plita",subHob:"Qo'shma pech",subHood:"Vityajka",subSide:"Yon tomondan",
    subTop2:"Ustdan muzlatgichli",subBot:"Pastdan muzlatgichli",subBuiltFr:"O'rnatiluvchi"},
  ru:{brand:"Ака-Ука Бытовая Техника",tag:"Качество и Доверие",search:"Поиск товаров...",allCat:"Все",
    conditioner:"Кондиционер",fridge:"Холодильник",washer:"Стир. машина",builtin:"Встраиваемая техника",
    filter:"Фильтр",brands:"Бренды",usdPrice:"Цена (USD)",rating:"Рейтинг",inStock:"В наличии",outStock:"Нет",
    apply:"Применить",reset:"Сбросить",contact:"Контакты",phone:"Телефон",guarantee:"Гарантия",
    delivery:"Бесплатная доставка",install:"Рассрочка",reviews:"отзывов",specs:"Характеристики",months:"мес",
    isNew:"Новинка",hot:"Хит",prods:"товаров",desc:"Описание",noRes:"Товары не найдены",
    filterApplied:"Фильтр применён",filterCleared:"Фильтр сброшен",sort:"Сортировка",sortDef:"По умолчанию",
    sortPriceAsc:"Цена ↑",sortPriceDesc:"Цена ↓",sortRating:"По рейтингу",allBrands:"Все бренды",
    workHours:"09:00-20:00",payNote:"Оплата по курсу ЦБ в сумах",wall:"Настенный",floor:"Напольный",
    copy:"Скопировано!",currency:"Оплата в сумах",founded:"Основан: 2019",address:"Ташкент, Узбекистан",
    hours:"Время работы",subFront:"Фронтальная",subTop:"Вертикальная",subRange:"Плита",
    subHob:"Поверхность",subHood:"Вытяжка",subSide:"Side-by-Side",
    subTop2:"Верхняя морозилка",subBot:"Нижняя морозилка",subBuiltFr:"Встраиваемый"},
  en:{brand:"Aka-Uka Home Appliances",tag:"Quality & Trust",search:"Search products...",allCat:"All",
    conditioner:"Air Conditioner",fridge:"Refrigerator",washer:"Washing Machine",builtin:"Built-in Appliances",
    filter:"Filter",brands:"Brands",usdPrice:"Price (USD)",rating:"Rating",inStock:"In Stock",outStock:"Out of Stock",
    apply:"Apply",reset:"Reset",contact:"Contact",phone:"Phone",guarantee:"Warranty",
    delivery:"Free Delivery",install:"Installment",reviews:"reviews",specs:"Specs",months:"mo",
    isNew:"New",hot:"Hot",prods:"products",desc:"Description",noRes:"No products found",
    filterApplied:"Filter applied",filterCleared:"Filter cleared",sort:"Sort",sortDef:"Default",
    sortPriceAsc:"Price ↑",sortPriceDesc:"Price ↓",sortRating:"By Rating",allBrands:"All Brands",
    workHours:"09:00-20:00",payNote:"Payment at CBU rate in UZS",wall:"Wall-mount",floor:"Floor-standing",
    copy:"Copied!",currency:"Pay in UZS",founded:"Founded: 2019",address:"Tashkent, Uzbekistan",
    hours:"Working hours",subFront:"Front-load",subTop:"Top-load",subRange:"Range",
    subHob:"Gas Hob",subHood:"Hood",subSide:"Side-by-Side",
    subTop2:"Top-freezer",subBot:"Bottom-freezer",subBuiltFr:"Built-in"},
};

const BL=[
  {id:"hofmann",name:"Hofmann"},{id:"lg",name:"LG"},{id:"beston",name:"Beston"},
  {id:"aufit",name:"Aufit"},{id:"ttech",name:"T-Tech"},{id:"gree",name:"Gree"},
  {id:"samsung",name:"Samsung"},{id:"ziffler",name:"Ziffler"},{id:"ferre",name:"Ferre"},
  {id:"hisense",name:"Hisense"},{id:"immer",name:"Immer"},{id:"bench",name:"Bench"},
  {id:"tcl",name:"TCL"},
];
const CATS=[
  {id:"conditioner",key:"conditioner",icon:"❄️"},{id:"fridge",key:"fridge",icon:"🧊"},
  {id:"washer",key:"washer",icon:"🔄"},{id:"builtin",key:"builtin",icon:"🔧"},
];
const IM={
  w1:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  w2:"https://images.unsplash.com/photo-1631525968550-b0ae7ff4ff8c?w=600&q=80",
  w3:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
  w4:"https://images.unsplash.com/photo-1621571948695-3eaa0427f4b5?w=600&q=80",
  f1:"https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&q=80",
  fr1:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80",
  fr2:"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
  fr3:"https://images.unsplash.com/photo-1562184552-997c461abbe3?w=600&q=80",
  fr4:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  wm1:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80",
  wm2:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  wm3:"https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80",
  bi1:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  bi2:"https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&q=80",
  bi3:"https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80",
};

/* ══════════════════════════════════════════════════════════════════════
   🖼️ RASM LINKLARI — BU YERGA O'ZINGIZ TOPGAN RASM LINKINI QO'YING
   ────────────────────────────────────────────────────────────────────
   Har bir qatorda: model kodi: "" — bo'sh joyga rasm URL manzilini yozing.
   Google Images'da qatorning oxiridagi izohdagi nomni qidiring, rasmni
   oching, o'ng tugma → "nusxalash rasm manzili" (copy image address),
   keyin o'sha linkni "" ichiga joylashtiring. Masalan:
   tcl_br18: "https://sizning-topgan-rasm-linkingiz.jpg",
   Bo'sh qoldirilgan modellar avtomatik ravishda modelning nomi yozilgan
   kulrang placeholder rasmni ko'rsatadi — sayt hech qachon buzilmaydi.
══════════════════════════════════════════════════════════════════════ */
const PIMG={
  // ─── TCL Konditsioner (rasm 1dan) ───
  tcl_br18:  "https://tcl-russia.ru/upload/resize_cache/iblock/176/396_396_0/aqu15ctpof0v462w5ehzxq6z597jiaod.jpg", // Qidiring: TCL Breezein TAC-BR18HSV/TA
  tcl_br24:  "https://www.itsklad.kz/upload/iblock/402/ypmpb7p9ohsnfdu4aptzv0pdqwyey16a/Melkaya-bytovaya-tekhnika.jpg", // Qidiring: TCL Breezein TAC-BR24HSV/TA
  tcl_vx24:  "https://alsat.com.tm/storage/preproduct/50560-images-1-6a215ccd3d3bd.webp", // Qidiring: TCL VoxIN TAC-VX24HSV/UA
  tcl_fr18w: "https://www.clima-vent.com/images/thumbnails/420/390/detailed/41/tcl-FRESH_IN_grey_h24s-45.jpg", // Qidiring: TCL Fresh In 3.0 TAC-FR18HSV/P7W white
  tcl_fr18s: "https://aws-obg-image-lb-5.tcl.com/content/dam/brandsite/region/russia/products/ac/freshin-plus/silver/new/1.jpg?t=1751355813700&w=800", // Qidiring: TCL Fresh In 3.0 TAC-FR18HSV/P7S silver
  tcl_fr18b: "https://aws-obg-image-lb-5.tcl.com/content/dam/brandsite/region/russia/products/ac/freshin-plus/black/new/1.jpg?t=1751355813700&w=800", // Qidiring: TCL Fresh In 3.0 TAC-FR18HSV/P7B black
  tcl_k24mci:"https://olcha.uz/image/675x900/products/2021-06-09/konditsioner-lenox-24-inverter-column-moon-24044-0.jpeg", // Qidiring: TCL Kolonnik TAC-24CHFD/MCI
  tcl_k24fhi:"", // Qidiring: TCL Kolonnik TAC-24CHFA/FHI
  tcl_k36fhi:" https://abedtahan.com/cdn/shop/files/TAC-36CHFAFHI_2.jpg?v=1748871795&width=1200 ", // Qidiring: TCL Kolonnik TAC-36CHFA/FHI
  // ─── Ziffler Konditsioner (rasm 2dan) ───
  zif_z12:   "https://cdn.asaxiy.uz/asaxiy-content/product/items/mobile/1732cb437260c60a0744aea8aedfa3312025031010475195029qabkkPK5RE.jpg.webp", // Qidiring: Ziffler FAC-Z12W2MW Full DC Inverter
  // ─── GREE Konditsioner — Devordagi (挂机) ───
  gr_bora09: "https://jara.md/public/upload/catalog/khxl8npwwc.webp", // Qidiring: Gree Bora 9000 BTU
  gr_bora12: "https://conditionere.md/public/upload/catalog/0lbc89firz.webp", // Qidiring: Gree Bora 12000 BTU
  gr_bora18: "https://on-off.uz/wp-content/uploads/2025/05/gree_2.png", // Qidiring: Gree Bora 18000 BTU
  gr_bora24: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLHvrGIiKO6yQOvziABdARSFYYgo6vMFQuLMQd16oQaeSaUSKib71fZag&s=10", // Qidiring: Gree Bora 24000 BTU
  gr_pular12:"https://frankfurt.apollo.olxcdn.com/v1/files/0y2fcds4xwgb2-UZ/image", // Qidiring: Gree Pular 12000 BTU
  gr_pular18:"https://gree-climat.com.ua/images/detailed/27/003_Pular_jck5-ej.jpg", // Qidiring: Gree Pular 18000 BTU
  gr_pular24:"https://kyriakoselectric.com/wp-content/uploads/2024/04/Gree-Pular-24000-BTU-Air-Conditioner-GWH24AGE-K6DNA1A.png", // Qidiring: Gree Pular 24000 BTU
  gr_lomo12: "https://maxcom.uz/storage/product/rtwhDFDwnBayQmVNpLLdHAaYhBK2iYADJXNp4zrN.png", // Qidiring: Gree Lomo 12000 BTU
  gr_lomo18: "https://eurosanteh.md/public/upload/gallery/dfjllkm93hl6zir.webp", // Qidiring: Gree Lomo 18000 BTU
  gr_lomo24: "https://conditionere.md/public/upload/catalog/plkm3b1gki.webp", // Qidiring: Gree Lomo 24000 BTU
  gr_fairyw12:"https://conditionere.md/public/upload/catalog/6badt7m4nl.webp",// Qidiring: Gree Fairy White 12000 BTU
  gr_fairyw18:"https://aer-conditionat.md/public/upload/catalog/17/climatizator-gree-fairy-inverter-gwh18acd-18000-btu-foto-uy9.webp",// Qidiring: Gree Fairy White 18000 BTU
  gr_fairyw24:"https://jara.md/public/upload/catalog/7zmd05whhh.webp",// Qidiring: Gree Fairy White 24000 BTU
  gr_fairyb12:"https://aer-conditionat.md/public/upload/catalog/24/climatizator-gree-fairy-black-strip-inverter-r32-gwh12acc-12000-btu-foto.webp",// Qidiring: Gree Fairy Black 12000 BTU
  gr_fairyb18:"https://frankfurt.apollo.olxcdn.com/v1/files/0c33rts4kx0n-UZ/image",// Qidiring: Gree Fairy Black 18000 BTU
  gr_fairyb24:"https://on-off.uz/wp-content/uploads/2024/10/cesipkeprj.jpg",// Qidiring: Gree Fairy Black 24000 BTU
  gr_iceg12: "https://s3.fortifai.uz/shop/moderation/partner-1266/1778093997-1762862613-66.webp", // Qidiring: Gree Iceberg Gold 12000 BTU
  gr_iceg18: "https://asset.openshop.uz/uploads/products/thumbnail/202606/7NaCgZX0iPZbTxTXIcx2mUcNizsyty6K.png", // Qidiring: Gree Iceberg Gold 18000 BTU
  gr_iceg24: " https://cdn.mediapark.uz/imgs/980ada3e-1d08-4a30-ab64-0896f9cecb80_1.webp ", // Qidiring: Gree Iceberg Gold 24000 BTU
  gr_icew12: " https://asset.openshop.uz/uploads/products/thumbnail/202606/57ZhFIuukkBcwQ1ml1S15jS6BnU1Nk4C.png ", // Qidiring: Gree Iceberg White 12000 BTU
  gr_icew18: "https://asset.openshop.uz/storage/uploads/products/thumbnail/202506/lscPUJU3F8fVC7zf5qCElhdtSHoPpb6l.png", // Qidiring: Gree Iceberg White 18000 BTU
  gr_icew24: "https://asset.openshop.uz/uploads/products/photos/202606/Z10CKNhD5sxaWQ6UEjfcmy4RzPLdEXy4.png", // Qidiring: Gree Iceberg White 24000 BTU
  gr_ucrown9:"https://tehnoformat.md/wp-content/uploads/2024/04/gree-u-crown5.jpg", // Qidiring: Gree U-Crown 9000 BTU
  gr_ucrown12:"https://aer-conditionat.md/public/upload/catalog/1023/conditioner-gree-u-crown-gold-inverter-gwh12ub-12000-btu-foto-preview.webp",// Qidiring: Gree U-Crown 12000 BTU
  gr_gtech12:"https://watt.md/public/upload/catalog/9523/conditioner-gree-g-tech-r32-inverter-gwh12aec-k6dna1a-12000-btu-foto.webp", // Qidiring: Gree G-Tech 12000 BTU
  gr_charmo12:"https://frankfurt.apollo.olxcdn.com/v1/files/39bf21nmxfhb1-UZ/image;s=890x717",// Qidiring: Gree Charmo 12000 BTU
  gr_charmo18:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFhn_NXLZMWXpPK9KNIe9-ofOBSX1S2_-XQvYlYttA-5XdPogCao0bLy4&s=10",// Qidiring: Gree Charmo 18000 BTU
  gr_charmo24:"https://cdn.mediapark.uz/imgs/600x600_78769937-bf7f-4021-86fb-30d34af15cbc_1.webp",// Qidiring: Gree Charmo 24000 BTU
  gr_freshair:"https://on-off.uz/wp-content/uploads/2023/12/kondiczioner-gree-fresh-air-inverter-24.jpg",// Qidiring: Gree Fresh Air 24000 BTU
  gr_ishine: "https://assets.asaxiy.uz/product/items/desktop/c4ca4238a0b923820dcc509a6f75849b2026062210570769513jS80WOEt74.png", // Qidiring: Gree I-Shine 24000 BTU
  gr_goldenh:"https://assets.asaxiy.uz/product/items/desktop/751d31dd6b56b26b29dac2c0e1839e342025042109552877159toaf12voUw.jpg.webp", // Qidiring: Gree Golden House 24000 BTU
  // ─── GREE Konditsioner — Kolonnik (柜机) ───
  gr_tfresh24:"https://iororwxhlpoilo5p-static.micyjz.com/cloud/llBpiKijlmSRjlqlqikqkq/H12058ed5955a48c4983b24379d231c54w.jpg",// Qidiring: Gree T-Fresh 24000 BTU floor standing
  gr_tfresh48:"https://sc04.alicdn.com/kf/H11542466120c45ddacb7235257fe277et.jpg",// Qidiring: Gree T-Fresh 48000 BTU floor standing
  gr_tfresh55:"https://iororwxhlpoilo5p-static.micyjz.com/cloud/lnBpiKijlmSRjlqlqilqkq/Ha3606e3ede6e42b4b8243851f214e4aaT.jpg",// Qidiring: Gree T-Fresh 55000 BTU floor standing
  gr_t3_60:  "https://sc04.alicdn.com/kf/Ha864e7dcf4a44a10a4e40b3cff9ad21bT.jpg", // Qidiring: Gree T-3 60000 BTU floor standing
  gr_grand100:"https://assets.asaxiy.uz/product/items/desktop/1679091c5a880faf6fb5e6087eb1b2dc2025042110243470893eOCbyhkPk7.jpg.webp",// Qidiring: Gree Grand 100000 BTU floor standing
};

/* Model nomi yozilgan kulrang placeholder — rasm topilmaguncha shu ko'rinadi */
function ph(text){
  return `https://placehold.co/600x450/EFEFEF/9A9A9A?font=roboto&text=${encodeURIComponent(text)}`;
}

const PRODS=[
// ═══ KONDITSIONER WALL ═══
{id:1,cat:"conditioner",sub:"wall",brand:"hofmann",usd:385,r:4.4,rv:31,s:true,tr:false,nw:false,img:IM.w2,
nm:{uz:"Hofmann Compact 09 — 3D Inverter Wi-Fi",ru:"Hofmann Compact 09 — 3D Inverter Wi-Fi",en:"Hofmann Compact 09 — 3D Inverter Wi-Fi"},
dsc:{uz:"9000 BTU, 3D Inverter, 130–265V keng kuchlanish, R32, Wi-Fi, PTC isitgich. 3 yil kafolat.",ru:"9000 BTU, 3D Inverter, 130–265В, R32, Wi-Fi, PTC. 3 года гарантии.",en:"9000 BTU, 3D Inverter, 130–265V, R32, Wi-Fi, PTC heater. 3yr warranty."},
sp:{uz:["9000 BTU","3D Inverter","130–265V","R32","Wi-Fi","PTC Isitgich","3 Yil"],ru:["9000 BTU","3D Inverter","130–265В","R32","Wi-Fi","PTC","3 года"],en:["9000 BTU","3D Inverter","130–265V","R32","Wi-Fi","PTC Heater","3yr"]}},
{id:2,cat:"conditioner",sub:"wall",brand:"hofmann",usd:420,r:4.6,rv:52,s:true,tr:true,nw:false,img:IM.w2,
nm:{uz:"Hofmann Compact 12 — 3D Inverter Wi-Fi",ru:"Hofmann Compact 12 — 3D Inverter Wi-Fi",en:"Hofmann Compact 12 — 3D Inverter Wi-Fi"},
dsc:{uz:"12000 BTU eng ommabop! 3D Inverter, 130–265V, R32, Wi-Fi. A++ energiya sinfi.",ru:"12000 BTU самая популярная! 3D Inverter, 130–265В, R32, Wi-Fi. A++.",en:"12000 BTU most popular! 3D Inverter, 130–265V, R32, Wi-Fi. A++ energy."},
sp:{uz:["12000 BTU","3D Inverter","130–265V","R32","Wi-Fi","A++","3 Yil"],ru:["12000 BTU","3D Inverter","130–265В","R32","Wi-Fi","A++","3 года"],en:["12000 BTU","3D Inverter","130–265V","R32","Wi-Fi","A++","3yr"]}},
{id:3,cat:"conditioner",sub:"wall",brand:"hofmann",usd:520,r:4.5,rv:23,s:true,tr:false,nw:false,img:IM.w2,
nm:{uz:"Hofmann Compact 18 — 3D Inverter Wi-Fi",ru:"Hofmann Compact 18 — 3D Inverter Wi-Fi",en:"Hofmann Compact 18 — 3D Inverter Wi-Fi"},
dsc:{uz:"18000 BTU katta xonalar uchun. 3D Inverter, 130–265V, R32, Wi-Fi.",ru:"18000 BTU для больших комнат. 3D Inverter, 130–265В, R32, Wi-Fi.",en:"18000 BTU for large rooms. 3D Inverter, 130–265V, R32, Wi-Fi."},
sp:{uz:["18000 BTU","3D Inverter","130–265V","R32","Wi-Fi","A++","3 Yil"],ru:["18000 BTU","3D Inverter","130–265В","R32","Wi-Fi","A++","3 года"],en:["18000 BTU","3D Inverter","130–265V","R32","Wi-Fi","A++","3yr"]}},
{id:4,cat:"conditioner",sub:"wall",brand:"hofmann",usd:690,r:4.5,rv:16,s:true,tr:false,nw:false,img:IM.w2,
nm:{uz:"Hofmann Compact 24 — 3D Inverter Wi-Fi",ru:"Hofmann Compact 24 — 3D Inverter Wi-Fi",en:"Hofmann Compact 24 — 3D Inverter Wi-Fi"},
dsc:{uz:"24000 BTU kuchli. Katta maydonlar uchun. PTC isitgich, Wi-Fi.",ru:"24000 BTU для больших площадей. PTC нагреватель, Wi-Fi.",en:"24000 BTU for large areas. PTC heater, Wi-Fi."},
sp:{uz:["24000 BTU","3D Inverter","130–265V","R32","Wi-Fi","PTC","A++"],ru:["24000 BTU","3D Inverter","130–265В","R32","Wi-Fi","PTC","A++"],en:["24000 BTU","3D Inverter","130–265V","R32","Wi-Fi","PTC","A++"]}},
{id:5,cat:"conditioner",sub:"wall",brand:"hofmann",usd:555,r:4.7,rv:44,s:true,tr:true,nw:false,img:IM.w3,
nm:{uz:"Hofmann S-Class Black 12 — UV 3D G10",ru:"Hofmann S-Class Black 12 — UV 3D G10",en:"Hofmann S-Class Black 12 — UV 3D G10"},
dsc:{uz:"Premium qora. UV Lamp dezinfeksiya, 3D G10 Inverter, Wi-Fi Smart.",ru:"Премиум чёрный. UV Lamp, 3D G10 Inverter, Wi-Fi.",en:"Premium black. UV Lamp disinfection, 3D G10 Inverter, Wi-Fi."},
sp:{uz:["12000 BTU","3D G10 Inverter","UV LAMP","R32","Wi-Fi","Qora","A++"],ru:["12000 BTU","3D G10 Inverter","UV LAMP","R32","Wi-Fi","Чёрный","A++"],en:["12000 BTU","3D G10 Inverter","UV LAMP","R32","Wi-Fi","Black","A++"]}},
{id:6,cat:"conditioner",sub:"wall",brand:"hofmann",usd:710,r:4.7,rv:28,s:true,tr:false,nw:false,img:IM.w3,
nm:{uz:"Hofmann S-Class Black 18 — UV 3D G10",ru:"Hofmann S-Class Black 18 — UV 3D G10",en:"Hofmann S-Class Black 18 — UV 3D G10"},
dsc:{uz:"18000 BTU S-Class qora. UV Lamp, 3D G10 Inverter, Wi-Fi Smart.",ru:"18000 BTU S-Class чёрный. UV Lamp, 3D G10 Inverter, Wi-Fi.",en:"18000 BTU S-Class black. UV Lamp, 3D G10 Inverter, Wi-Fi."},
sp:{uz:["18000 BTU","3D G10 Inverter","UV LAMP","R32","Wi-Fi","Qora","A++"],ru:["18000 BTU","3D G10 Inverter","UV LAMP","R32","Wi-Fi","Чёрный","A++"],en:["18000 BTU","3D G10 Inverter","UV LAMP","R32","Wi-Fi","Black","A++"]}},
{id:7,cat:"conditioner",sub:"wall",brand:"hofmann",usd:510,r:4.6,rv:33,s:true,tr:false,nw:false,img:IM.w1,
nm:{uz:"Hofmann Solo Gold 12 — 3D G10 Wi-Fi",ru:"Hofmann Solo Gold 12 — 3D G10 Wi-Fi",en:"Hofmann Solo Gold 12 — 3D G10 Wi-Fi"},
dsc:{uz:"Oltin dizayn. 3D G10 Inverter, Wi-Fi Smart, R32.",ru:"Золотой дизайн. 3D G10 Inverter, Wi-Fi Smart, R32.",en:"Gold design. 3D G10 Inverter, Wi-Fi Smart, R32."},
sp:{uz:["12000 BTU","3D G10 Inverter","R32","Wi-Fi","Oltin Dizayn","A++","3+10 Yil"],ru:["12000 BTU","3D G10 Inverter","R32","Wi-Fi","Золотой","A++","3+10 лет"],en:["12000 BTU","3D G10 Inverter","R32","Wi-Fi","Gold Design","A++","3+10yr"]}},
{id:8,cat:"conditioner",sub:"wall",brand:"hofmann",usd:490,r:4.6,rv:37,s:true,tr:true,nw:false,img:IM.w1,
nm:{uz:"Hofmann Elegance 12 — G10 UV Wi-Fi",ru:"Hofmann Elegance 12 — G10 UV Wi-Fi",en:"Hofmann Elegance 12 — G10 UV Wi-Fi"},
dsc:{uz:"Nafis Elegance dizayn. G10 Inverter, UV Lamp, Wi-Fi. 3+10 yil kafolat.",ru:"Elegance дизайн. G10 Inverter, UV Lamp, Wi-Fi. 3+10 лет.",en:"Elegant design. G10 Inverter, UV Lamp, Wi-Fi. 3+10yr warranty."},
sp:{uz:["12000 BTU","G10 Inverter","UV Lamp","R32","Wi-Fi","A++","3+10 Yil"],ru:["12000 BTU","G10 Inverter","UV Lamp","R32","Wi-Fi","A++","3+10 лет"],en:["12000 BTU","G10 Inverter","UV Lamp","R32","Wi-Fi","A++","3+10yr"]}},
{id:9,cat:"conditioner",sub:"wall",brand:"hofmann",usd:770,r:4.8,rv:19,s:true,tr:false,nw:true,img:IM.w1,
nm:{uz:"Hofmann Infinity 12 — G10 Wi-Fi Premium",ru:"Hofmann Infinity 12 — G10 Wi-Fi Premium",en:"Hofmann Infinity 12 — G10 Wi-Fi Premium"},
dsc:{uz:"Eng premium Hofmann modeli. Infinity dizayn, G10 Inverter, Wi-Fi Smart.",ru:"Топовая модель. Дизайн Infinity, G10 Inverter, Wi-Fi.",en:"Top Hofmann model. Infinity design, G10 Inverter, Wi-Fi Smart."},
sp:{uz:["12000 BTU","G10 Inverter","Infinity Dizayn","R32","Wi-Fi","A++","3+10 Yil"],ru:["12000 BTU","G10 Inverter","Infinity","R32","Wi-Fi","A++","3+10 лет"],en:["12000 BTU","G10 Inverter","Infinity Design","R32","Wi-Fi","A++","3+10yr"]}},
{id:10,cat:"conditioner",sub:"wall",brand:"lg",usd:590,r:4.8,rv:91,s:true,tr:true,nw:false,img:IM.w4,
nm:{uz:"LG AB12BK Objet Collection — Bej 36m²",ru:"LG AB12BK Objet Collection — Бежевый 36м²",en:"LG AB12BK Objet Collection — Beige 36m²"},
dsc:{uz:"LG Objet Collection bej rang. DUAL Inverter, UVnano, ThinQ Wi-Fi. 10 yil kompressor.",ru:"LG Objet Collection бежевый. DUAL Inverter, UVnano, ThinQ Wi-Fi. 10 лет.",en:"LG Objet Collection beige. DUAL Inverter, UVnano, ThinQ Wi-Fi. 10yr compressor."},
sp:{uz:["12000 BTU","DUAL Inverter","UVnano™","ThinQ™","36 m²","Bej","10 Yil"],ru:["12000 BTU","DUAL Inverter","UVnano™","ThinQ™","36 м²","Бежевый","10 лет"],en:["12000 BTU","DUAL Inverter","UVnano™","ThinQ™","36 m²","Beige","10yr"]}},
{id:11,cat:"conditioner",sub:"wall",brand:"lg",usd:720,r:4.9,rv:114,s:true,tr:true,nw:false,img:IM.w4,
nm:{uz:"LG AG12BK Objet Collection — Qora 36m²",ru:"LG AG12BK Objet Collection — Чёрный 36м²",en:"LG AG12BK Objet Collection — Black 36m²"},
dsc:{uz:"LG Objet Collection qora. DUAL Inverter 10 yil, UVnano, ThinQ Smart.",ru:"LG Objet Collection чёрный. DUAL Inverter 10 лет, UVnano, ThinQ.",en:"LG Objet black premium. DUAL Inverter 10yr, UVnano, ThinQ."},
sp:{uz:["12000 BTU","DUAL Inverter","UVnano™","ThinQ™","36 m²","Qora","10 Yil"],ru:["12000 BTU","DUAL Inverter","UVnano™","ThinQ™","36 м²","Чёрный","10 лет"],en:["12000 BTU","DUAL Inverter","UVnano™","ThinQ™","36 m²","Black","10yr"]}},
{id:12,cat:"conditioner",sub:"wall",brand:"lg",usd:690,r:4.7,rv:56,s:true,tr:false,nw:false,img:IM.w1,
nm:{uz:"LG AP12RK ProCool — Ionizator 36m²",ru:"LG AP12RK ProCool — Ионизатор 36м²",en:"LG AP12RK ProCool — Ionizer 36m²"},
dsc:{uz:"ProCool Ionizator, Active Energy Control, ThinQ Wi-Fi. 10 yil kompressor.",ru:"Ионизатор, Active Energy Control, ThinQ Wi-Fi. 10 лет компрессор.",en:"Ionizer, Active Energy Control, ThinQ Wi-Fi. 10yr compressor warranty."},
sp:{uz:["12000 BTU","DUAL Inverter","Ionizator","Active Energy Control","ThinQ™","36 m²","10 Yil"],ru:["12000 BTU","DUAL Inverter","Ионизатор","Active Energy Control","ThinQ™","36 м²","10 лет"],en:["12000 BTU","DUAL Inverter","Ionizer","Active Energy Control","ThinQ™","36 m²","10yr"]}},
{id:13,cat:"conditioner",sub:"wall",brand:"lg",usd:1236,r:4.9,rv:36,s:true,tr:false,nw:true,img:IM.w4,
nm:{uz:"LG A12GA1 Art Gallery — Ultra Premium",ru:"LG A12GA1 Art Gallery — Ультра Премиум",en:"LG A12GA1 Art Gallery — Ultra Premium"},
dsc:{uz:"Devor san'at asari. 652×652mm ramkada chiroyli rasm. DUAL Inverter, R32, Plasmaster.",ru:"Картина на стене. Рамка 652×652мм. DUAL Inverter, R32, Plasmaster.",en:"Art gallery on wall. 652×652mm frame. DUAL Inverter, R32, Plasmaster."},
sp:{uz:["12000 BTU","DUAL Inverter","Art Gallery Ramka","R32","652×652mm","Plasmaster","Ultra Premium"],ru:["12000 BTU","DUAL Inverter","Art Gallery","R32","652×652мм","Plasmaster","Ультра Премиум"],en:["12000 BTU","DUAL Inverter","Art Gallery","R32","652×652mm","Plasmaster","Ultra Premium"]}},
{id:14,cat:"conditioner",sub:"wall",brand:"beston",usd:270,r:4.3,rv:68,s:true,tr:true,nw:false,img:IM.w2,
nm:{uz:"Beston Victory 12 — Full DC Inverter R32",ru:"Beston Victory 12 — Full DC Inverter R32",en:"Beston Victory 12 — Full DC Inverter R32"},
dsc:{uz:"A++. Full DC Inverter, Gree kompressor, R32, Wi-Fi, Golden Fin, 12 qator radiator.",ru:"A++. Full DC Inverter, Gree, R32, Wi-Fi, Golden Fin, 12 рядов.",en:"A++. Full DC Inverter, Gree compressor, R32, Wi-Fi, Golden Fin, 12-row."},
sp:{uz:["12000 BTU","Full DC Inverter","Gree Kompressor","R32","Wi-Fi","Golden Fin","A++"],ru:["12000 BTU","Full DC Inverter","Gree","R32","Wi-Fi","Golden Fin","A++"],en:["12000 BTU","Full DC Inverter","Gree","R32","Wi-Fi","Golden Fin","A++"]}},
{id:15,cat:"conditioner",sub:"wall",brand:"aufit",usd:330,r:4.4,rv:29,s:true,tr:false,nw:false,img:IM.w2,
nm:{uz:"Aufit H12 GMCC — DC Inverter PTC Wi-Fi",ru:"Aufit H12 GMCC — DC Inverter PTC Wi-Fi",en:"Aufit H12 GMCC — DC Inverter PTC Wi-Fi"},
dsc:{uz:"DC Inverter, GMCC kompressor, PTC isitgich, 130–265V, R32, Wi-Fi.",ru:"DC Inverter, GMCC, PTC, 130–265В, R32, Wi-Fi.",en:"DC Inverter, GMCC compressor, PTC heater, 130–265V, R32, Wi-Fi."},
sp:{uz:["12000 BTU","DC Inverter","GMCC","PTC","130–265V","R32","Wi-Fi"],ru:["12000 BTU","DC Inverter","GMCC","PTC","130–265В","R32","Wi-Fi"],en:["12000 BTU","DC Inverter","GMCC","PTC Heater","130–265V","R32","Wi-Fi"]}},
{id:16,cat:"conditioner",sub:"wall",brand:"aufit",usd:430,r:4.5,rv:21,s:true,tr:false,nw:false,img:IM.w2,
nm:{uz:"Aufit H18 SANYO — DC Inverter PTC Wi-Fi",ru:"Aufit H18 SANYO — DC Inverter PTC Wi-Fi",en:"Aufit H18 SANYO — DC Inverter PTC Wi-Fi"},
dsc:{uz:"18000 BTU. DC Inverter, SANYO kompressor, PTC, 130–265V, R32, Wi-Fi.",ru:"18000 BTU. DC Inverter, SANYO, PTC, 130–265В, R32, Wi-Fi.",en:"18000 BTU. DC Inverter, SANYO compressor, PTC, 130–265V, R32, Wi-Fi."},
sp:{uz:["18000 BTU","DC Inverter","SANYO","PTC","130–265V","R32","Wi-Fi"],ru:["18000 BTU","DC Inverter","SANYO","PTC","130–265В","R32","Wi-Fi"],en:["18000 BTU","DC Inverter","SANYO","PTC Heater","130–265V","R32","Wi-Fi"]}},
{id:17,cat:"conditioner",sub:"wall",brand:"aufit",usd:500,r:4.6,rv:17,s:true,tr:false,nw:true,img:IM.w1,
nm:{uz:"Aufit H12 Panasonic — Gentle Wind DC Wi-Fi",ru:"Aufit H12 Panasonic — Gentle Wind DC Wi-Fi",en:"Aufit H12 Panasonic — Gentle Wind DC Wi-Fi"},
dsc:{uz:"Panasonic kompressor, Gentle Wind texnologiyasi, DC Inverter, 130–265V, R32, Wi-Fi.",ru:"Panasonic, Gentle Wind, DC Inverter, 130–265В, R32, Wi-Fi.",en:"Panasonic compressor, Gentle Wind technology, DC Inverter, 130–265V, R32, Wi-Fi."},
sp:{uz:["12000 BTU","Panasonic","Gentle Wind","DC Inverter","130–265V","R32","Wi-Fi"],ru:["12000 BTU","Panasonic","Gentle Wind","DC Inverter","130–265В","R32","Wi-Fi"],en:["12000 BTU","Panasonic","Gentle Wind","DC Inverter","130–265V","R32","Wi-Fi"]}},
// ═══ KONDITSIONER FLOOR ═══
{id:18,cat:"conditioner",sub:"floor",brand:"beston",usd:750,r:4.6,rv:44,s:true,tr:true,nw:false,img:IM.f1,
nm:{uz:"Beston Air Box 24 — Kolonnik Full DC",ru:"Beston Air Box 24 — Напольный Full DC",en:"Beston Air Box 24 — Floor Full DC Inverter"},
dsc:{uz:"Kolonnik konditsioner. Full DC Inverter, GMCC Toshiba, PTC, Golden Fin, Wi-Fi, 3D Air Flow.",ru:"Напольный. Full DC Inverter, GMCC Toshiba, PTC, Golden Fin, Wi-Fi, 3D Air Flow.",en:"Floor-standing. Full DC Inverter, GMCC Toshiba, PTC, Golden Fin, Wi-Fi, 3D Air Flow."},
sp:{uz:["24000 BTU","Full DC Inverter","GMCC Toshiba","PTC","Golden Fin","Wi-Fi","3D Air Flow"],ru:["24000 BTU","Full DC Inverter","GMCC Toshiba","PTC","Golden Fin","Wi-Fi","3D Air Flow"],en:["24000 BTU","Full DC Inverter","GMCC Toshiba","PTC","Golden Fin","Wi-Fi","3D Air Flow"]}},
{id:19,cat:"conditioner",sub:"floor",brand:"beston",usd:1600,r:4.7,rv:27,s:true,tr:false,nw:false,img:IM.f1,
nm:{uz:"Beston Air Box 48 — Kuchli Kolonnik",ru:"Beston Air Box 48 — Мощный Напольный",en:"Beston Air Box 48 — Powerful Floor Unit"},
dsc:{uz:"48000 BTU. Katta binolar uchun. Full DC Inverter, GMCC, PTC, Wi-Fi, Ovozli boshqaruv.",ru:"48000 BTU для больших зданий. Full DC Inverter, GMCC, PTC, Wi-Fi.",en:"48000 BTU for large buildings. Full DC Inverter, GMCC, PTC, Wi-Fi, voice."},
sp:{uz:["48000 BTU","Full DC Inverter","GMCC Toshiba","PTC","Golden Fin","Wi-Fi","Ovozli"],ru:["48000 BTU","Full DC Inverter","GMCC Toshiba","PTC","Golden Fin","Wi-Fi","Голосовое"],en:["48000 BTU","Full DC Inverter","GMCC Toshiba","PTC","Golden Fin","Wi-Fi","Voice Control"]}},
{id:20,cat:"conditioner",sub:"floor",brand:"ttech",usd:700,r:4.5,rv:32,s:true,tr:false,nw:true,img:IM.f1,
nm:{uz:"T-Tech 7AC4P24WFS1 — Oq Kolonnik Wi-Fi",ru:"T-Tech 7AC4P24WFS1 — Белый Напольный Wi-Fi",en:"T-Tech 7AC4P24WFS1 — White Floor Wi-Fi"},
dsc:{uz:"Full DC Inverter kolonnik. TEN isitgich, Wi-Fi, 135–265V, Super sokin, Turbo sovutish.",ru:"Full DC Inverter. TEN, Wi-Fi, 135–265В, тихий, Turbo.",en:"Full DC Inverter floor unit. TEN heater, Wi-Fi, 135–265V, super quiet, Turbo cooling."},
sp:{uz:["24000 BTU","Full DC Inverter","TEN Isitgich","Wi-Fi","135–265V","Super Sokin","Turbo"],ru:["24000 BTU","Full DC Inverter","TEN","Wi-Fi","135–265В","Тихий","Turbo"],en:["24000 BTU","Full DC Inverter","TEN Heater","Wi-Fi","135–265V","Super Quiet","Turbo"]}},
{id:21,cat:"conditioner",sub:"floor",brand:"ttech",usd:730,r:4.6,rv:24,s:true,tr:false,nw:true,img:IM.f1,
nm:{uz:"T-Tech 7AC4P24GWFS1 — Oltin Kolonnik Wi-Fi",ru:"T-Tech 7AC4P24GWFS1 — Золотой Напольный Wi-Fi",en:"T-Tech 7AC4P24GWFS1 — Gold Floor Wi-Fi"},
dsc:{uz:"Premium oltin-kulrang kolonnik. Full DC Inverter, TEN, Wi-Fi, 135–265V, Turbo.",ru:"Золотистый премиум напольный. Full DC Inverter, TEN, Wi-Fi, 135–265В.",en:"Gold-grey premium floor unit. Full DC Inverter, TEN heater, Wi-Fi, 135–265V."},
sp:{uz:["24000 BTU","Full DC Inverter","TEN","Wi-Fi","135–265V","Oltin Dizayn","Turbo"],ru:["24000 BTU","Full DC Inverter","TEN","Wi-Fi","135–265В","Золотой","Turbo"],en:["24000 BTU","Full DC Inverter","TEN Heater","Wi-Fi","135–265V","Gold Design","Turbo"]}},
// ═══ XOLODILNIK ═══
{id:22,cat:"fridge",sub:"top",brand:"beston",usd:440,r:4.6,rv:51,s:true,tr:true,nw:false,img:IM.fr1,
nm:{uz:"Beston BC-543INV — No Frost Inverter 413L",ru:"Beston BC-543INV — No Frost Inverter 413L",en:"Beston BC-543INV — No Frost Inverter 413L"},
dsc:{uz:"413L, No Frost, Inverter, Inox. 700×630×1780 mm. Ustdan muzlatgich.",ru:"413 л, No Frost, Inverter, Inox. 700×630×1780 мм. Верхняя морозилка.",en:"413L, No Frost, Inverter, Inox. 700×630×1780 mm. Top-freezer."},
sp:{uz:["413L","No Frost","Inverter","700×630×1780mm","Inox","Display","Ustdan muzlatgich"],ru:["413 л","No Frost","Inverter","700×630×1780мм","Inox","Display","Верхняя морозилка"],en:["413L","No Frost","Inverter","700×630×1780mm","Inox","Display","Top-Freezer"]}},
{id:23,cat:"fridge",sub:"top",brand:"beston",usd:450,r:4.5,rv:38,s:true,tr:false,nw:false,img:IM.fr1,
nm:{uz:"Beston BC-543DNV — No Frost Dark Inox 413L",ru:"Beston BC-543DNV — No Frost Dark Inox 413L",en:"Beston BC-543DNV — No Frost Dark Inox 413L"},
dsc:{uz:"413L, No Frost, Dark Inox, Inverter. Zamonaviy dizayn.",ru:"413 л, No Frost, Dark Inox, Inverter. Современный дизайн.",en:"413L, No Frost, Dark Inox, Inverter. Modern design."},
sp:{uz:["413L","No Frost","Inverter","700×630×1780mm","Dark Inox","A+","Ustdan muzlatgich"],ru:["413 л","No Frost","Inverter","700×630×1780мм","Dark Inox","A+","Верхняя морозилка"],en:["413L","No Frost","Inverter","700×630×1780mm","Dark Inox","A+","Top-Freezer"]}},
{id:24,cat:"fridge",sub:"top",brand:"beston",usd:490,r:4.6,rv:43,s:true,tr:false,nw:false,img:IM.fr1,
nm:{uz:"Beston BC-815INV — No Frost Inverter 527L XXL",ru:"Beston BC-815INV — No Frost Inverter 527L XXL",en:"Beston BC-815INV — No Frost Inverter 527L XXL"},
dsc:{uz:"527L katta hajm, No Frost, Inverter, Dark Inox. XXL size seriyasi.",ru:"527 л, No Frost, Inverter, Dark Inox. Серия XXL.",en:"527L large, No Frost, Inverter, Dark Inox. XXL size series."},
sp:{uz:["527L","No Frost","Inverter","750×700×1830mm","Dark Inox","XXL Size","A+"],ru:["527 л","No Frost","Inverter","750×700×1830мм","Dark Inox","XXL","A+"],en:["527L","No Frost","Inverter","750×700×1830mm","Dark Inox","XXL Size","A+"]}},
{id:25,cat:"fridge",sub:"top",brand:"beston",usd:540,r:4.7,rv:29,s:true,tr:false,nw:false,img:IM.fr1,
nm:{uz:"Beston BC-865DNV — No Frost Dark Inox 635L",ru:"Beston BC-865DNV — No Frost Dark Inox 635L",en:"Beston BC-865DNV — No Frost Dark Inox 635L"},
dsc:{uz:"635L eng katta No Frost. Dark Inox, Inverter, XXL Size. Katta oilalar uchun.",ru:"635 л самый большой. Dark Inox, Inverter, XXL. Для большой семьи.",en:"635L largest No Frost. Dark Inox, Inverter, XXL Size."},
sp:{uz:["635L","No Frost","Inverter","830×700×1870mm","Dark Inox","XXL Size","A+"],ru:["635 л","No Frost","Inverter","830×700×1870мм","Dark Inox","XXL","A+"],en:["635L","No Frost","Inverter","830×700×1870mm","Dark Inox","XXL Size","A+"]}},
{id:26,cat:"fridge",sub:"bot",brand:"beston",usd:305,r:4.3,rv:44,s:true,tr:false,nw:false,img:IM.fr3,
nm:{uz:"Beston BN-483SLV — No Frost Silver 239L",ru:"Beston BN-483SLV — No Frost Silver 239L",en:"Beston BN-483SLV — No Frost Silver 239L"},
dsc:{uz:"239L, pastdan muzlatgich, No Frost, Silver, Inverter. Iqtisodiy.",ru:"239 л, нижняя морозилка, No Frost, Silver, Inverter.",en:"239L, bottom freezer, No Frost, Silver, Inverter."},
sp:{uz:["239L","No Frost","Inverter","576×637×1740mm","Silver","A+","Pastdan muzlatgich"],ru:["239 л","No Frost","Inverter","576×637×1740мм","Silver","A+","Нижняя морозилка"],en:["239L","No Frost","Inverter","576×637×1740mm","Silver","A+","Bottom-Freezer"]}},
{id:27,cat:"fridge",sub:"bot",brand:"beston",usd:400,r:4.5,rv:37,s:true,tr:false,nw:false,img:IM.fr3,
nm:{uz:"Beston BN-567BLV — No Frost Black Glass 384L VIP",ru:"Beston BN-567BLV — No Frost Black Glass 384L VIP",en:"Beston BN-567BLV — No Frost Black Glass 384L VIP"},
dsc:{uz:"384L, qora oyna, No Frost, Inverter, VIP texnologiya. Pastdan muzlatgich.",ru:"384 л, чёрное стекло, No Frost, Inverter, VIP технология.",en:"384L, black glass, No Frost, Inverter, VIP technology."},
sp:{uz:["384L","No Frost","Inverter","600×680×1850mm","Qora Oyna","VIP","Pastdan muzlatgich"],ru:["384 л","No Frost","Inverter","600×680×1850мм","Чёрное стекло","VIP","Нижняя"],en:["384L","No Frost","Inverter","600×680×1850mm","Black Glass","VIP","Bottom-Freezer"]}},
{id:28,cat:"fridge",sub:"bot",brand:"beston",usd:505,r:4.6,rv:31,s:true,tr:false,nw:false,img:IM.fr3,
nm:{uz:"Beston BN-595DNV — No Frost Dark Inox 435L Premium",ru:"Beston BN-595DNV — No Frost Dark Inox 435L Premium",en:"Beston BN-595DNV — No Frost Dark Inox 435L Premium"},
dsc:{uz:"435L premium pastdan muzlatgich. Dark Inox, No Frost, Inverter, Metal Cooling.",ru:"435 л премиум. Dark Inox, No Frost, Inverter, Metal Cooling.",en:"435L premium bottom-freezer. Dark Inox, No Frost, Inverter, Metal Cooling."},
sp:{uz:["435L","No Frost","Inverter","700×666×1880mm","Dark Inox","Metal Cooling","Premium"],ru:["435 л","No Frost","Inverter","700×666×1880мм","Dark Inox","Metal Cooling","Premium"],en:["435L","No Frost","Inverter","700×666×1880mm","Dark Inox","Metal Cooling","Premium"]}},
{id:29,cat:"fridge",sub:"bot",brand:"beston",usd:660,r:4.7,rv:19,s:true,tr:false,nw:true,img:IM.fr3,
nm:{uz:"Beston BMF-577GLV — NoFrost Gray Glass 401L",ru:"Beston BMF-577GLV — NoFrost Gray Glass 401L",en:"Beston BMF-577GLV — NoFrost Gray Glass 401L"},
dsc:{uz:"401L Gray Glass, No Frost, Inverter, Metal Cooling. Perfect Slot-In dizayn.",ru:"401 л Gray Glass, No Frost, Inverter, Metal Cooling. Perfect Slot-In.",en:"401L Gray Glass, No Frost, Inverter, Metal Cooling. Perfect Slot-In."},
sp:{uz:["401L","No Frost","Inverter","643×600×1910mm","Gray Glass","Metal Cooling","Perfect Slot-In"],ru:["401 л","No Frost","Inverter","643×600×1910мм","Gray Glass","Metal Cooling","Perfect Slot-In"],en:["401L","No Frost","Inverter","643×600×1910mm","Gray Glass","Metal Cooling","Perfect Slot-In"]}},
{id:30,cat:"fridge",sub:"side",brand:"beston",usd:700,r:4.6,rv:42,s:true,tr:true,nw:false,img:IM.fr2,
nm:{uz:"Beston BSM-897BLV — Side-by-Side 503L",ru:"Beston BSM-897BLV — Side-by-Side 503L",en:"Beston BSM-897BLV — Side-by-Side 503L"},
dsc:{uz:"503L, qora oyna, Side by Side, No Frost, Inverter, Perfect Slot-In.",ru:"503 л, чёрное стекло, Side by Side, No Frost, Inverter.",en:"503L, black glass, Side by Side, No Frost, Inverter, Perfect Slot-In."},
sp:{uz:["503L","No Frost","Inverter","905×597×1902mm","Qora Oyna","Perfect Slot-In","Side by Side"],ru:["503 л","No Frost","Inverter","905×597×1902мм","Чёрное стекло","Perfect Slot-In","Side by Side"],en:["503L","No Frost","Inverter","905×597×1902mm","Black Glass","Perfect Slot-In","Side by Side"]}},
{id:31,cat:"fridge",sub:"side",brand:"beston",usd:810,r:4.7,rv:28,s:true,tr:false,nw:false,img:IM.fr2,
nm:{uz:"Beston BSB-907BLMV — Side-by-Side 584L",ru:"Beston BSB-907BLMV — Side-by-Side 584L",en:"Beston BSB-907BLMV — Side-by-Side 584L"},
dsc:{uz:"584L eng katta Side by Side. Qora matt oyna, No Frost, Inverter.",ru:"584 л крупнейший Side by Side. Чёрный матовый, No Frost, Inverter.",en:"584L largest Side by Side. Black matt glass, No Frost, Inverter."},
sp:{uz:["584L","No Frost","Inverter","910×700×1866mm","Qora Matt","Side by Side","Premium"],ru:["584 л","No Frost","Inverter","910×700×1866мм","Чёрный матовый","Side by Side","Премиум"],en:["584L","No Frost","Inverter","910×700×1866mm","Black Matt","Side by Side","Premium"]}},
{id:32,cat:"fridge",sub:"side",brand:"lg",usd:930,r:4.8,rv:87,s:true,tr:true,nw:false,img:IM.fr2,
nm:{uz:"LG GC-F689BLCM — Total No Frost 451L",ru:"LG GC-F689BLCM — Total No Frost 451L",en:"LG GC-F689BLCM — Total No Frost 451L"},
dsc:{uz:"451L, Total No Frost, LED displeyli, Dispenser, Fresh Balancer. LG sifati.",ru:"451 л, Total No Frost, LED, Диспенсер, Fresh Balancer.",en:"451L, Total No Frost, LED display, Dispenser, Fresh Balancer."},
sp:{uz:["451L","Total No Frost","Dispenser","LED Display","Fresh Balancer","700×700×1890mm","A++"],ru:["451 л","Total No Frost","Диспенсер","LED","Fresh Balancer","700×700×1890мм","A++"],en:["451L","Total No Frost","Dispenser","LED Display","Fresh Balancer","700×700×1890mm","A++"]}},
{id:33,cat:"fridge",sub:"builtin",brand:"beston",usd:510,r:4.5,rv:26,s:true,tr:false,nw:false,img:IM.fr4,
nm:{uz:"Beston BNI-542WT — O'rnatiluvchi NoFrost 307L",ru:"Beston BNI-542WT — Встраиваемый NoFrost 307L",en:"Beston BNI-542WT — Built-in NoFrost 307L"},
dsc:{uz:"307L o'rnatiluvchi. No Frost, Smart Inverter, Metal Cooling. 54×55×193 cm.",ru:"307 л встраиваемый. No Frost, Smart Inverter, Metal Cooling.",en:"307L built-in. No Frost, Smart Inverter, Metal Cooling."},
sp:{uz:["307L","No Frost","Smart Inverter","Metal Cooling","54×55×193cm","Chiller","O'rnatiluvchi"],ru:["307 л","No Frost","Smart Inverter","Metal Cooling","54×55×193см","Chiller","Встраиваемый"],en:["307L","No Frost","Smart Inverter","Metal Cooling","54×55×193cm","Chiller","Built-in"]}},
{id:34,cat:"fridge",sub:"builtin",brand:"beston",usd:650,r:4.6,rv:17,s:true,tr:false,nw:true,img:IM.fr4,
nm:{uz:"Beston BNI-592WT — O'rnatiluvchi NoFrost 403L",ru:"Beston BNI-592WT — Встраиваемый NoFrost 403L",en:"Beston BNI-592WT — Built-in NoFrost 403L"},
dsc:{uz:"403L premium o'rnatiluvchi. No Frost, Smart Inverter, Metal Ichki Devor. 69×55×195 cm.",ru:"403 л встраиваемый премиум. No Frost, Smart Inverter. 69×55×195 см.",en:"403L premium built-in. No Frost, Smart Inverter. 69×55×195 cm."},
sp:{uz:["403L","No Frost","Smart Inverter","Metal Ichki Devor","69×55×195cm","Chiller","O'rnatiluvchi"],ru:["403 л","No Frost","Smart Inverter","Metal стенка","69×55×195см","Chiller","Встраиваемый"],en:["403L","No Frost","Smart Inverter","Metal Interior","69×55×195cm","Chiller","Built-in"]}},
{id:35,cat:"fridge",sub:"bot",brand:"ziffler",usd:345,r:4.4,rv:33,s:true,tr:false,nw:false,img:IM.fr3,
nm:{uz:"Ziffler RF-BF-306I — NoFrost Inverter Inox 306L",ru:"Ziffler RF-BF-306I — NoFrost Inverter Inox 306L",en:"Ziffler RF-BF-306I — NoFrost Inverter Inox 306L"},
dsc:{uz:"306L, No Frost, Inverter, Metal Cooling. 600×600×1850mm. Inox rang.",ru:"306 л, No Frost, Inverter, Metal Cooling. 600×600×1850мм. Inox.",en:"306L, No Frost, Inverter, Metal Cooling. 600×600×1850mm. Inox."},
sp:{uz:["306L","No Frost","Inverter","Metal Cooling","600×600×1850mm","Inox","A+"],ru:["306 л","No Frost","Inverter","Metal Cooling","600×600×1850мм","Inox","A+"],en:["306L","No Frost","Inverter","Metal Cooling","600×600×1850mm","Inox","A+"]}},
{id:36,cat:"fridge",sub:"bot",brand:"ziffler",usd:412,r:4.5,rv:28,s:true,tr:false,nw:true,img:IM.fr3,
nm:{uz:"Ziffler RF-BF-400SV DARK — NoFrost 409L Silver VIP",ru:"Ziffler RF-BF-400SV DARK — NoFrost 409L Silver VIP",en:"Ziffler RF-BF-400SV DARK — NoFrost 409L Silver VIP"},
dsc:{uz:"409L, No Frost, Inverter, VIP texnologiya, Silver. 595×680×1850mm.",ru:"409 л, No Frost, Inverter, VIP технология, Silver.",en:"409L, No Frost, Inverter, VIP technology, Silver. 595×680×1850mm."},
sp:{uz:["409L","No Frost","Inverter","VIP Texnologiya","595×680×1850mm","Silver","Metal Cooling"],ru:["409 л","No Frost","Inverter","VIP технология","595×680×1850мм","Silver","Metal Cooling"],en:["409L","No Frost","Inverter","VIP Technology","595×680×1850mm","Silver","Metal Cooling"]}},
{id:37,cat:"fridge",sub:"bot",brand:"ziffler",usd:443,r:4.5,rv:21,s:true,tr:false,nw:true,img:IM.fr3,
nm:{uz:"Ziffler RF-BF-400BG DARK — NoFrost 409L Black Glass",ru:"Ziffler RF-BF-400BG DARK — NoFrost 409L Black Glass",en:"Ziffler RF-BF-400BG DARK — NoFrost 409L Black Glass"},
dsc:{uz:"409L, qora oyna, No Frost, Inverter, Metal Cooling. VIP texnologiya.",ru:"409 л, чёрное стекло, No Frost, Inverter, Metal Cooling.",en:"409L, black glass, No Frost, Inverter, Metal Cooling. VIP technology."},
sp:{uz:["409L","No Frost","Inverter","Metal Cooling","595×680×1850mm","Qora Oyna","VIP"],ru:["409 л","No Frost","Inverter","Metal Cooling","595×680×1850мм","Чёрное стекло","VIP"],en:["409L","No Frost","Inverter","Metal Cooling","595×680×1850mm","Black Glass","VIP"]}},
{id:38,cat:"fridge",sub:"side",brand:"ttech",usd:680,r:4.5,rv:22,s:true,tr:false,nw:true,img:IM.fr2,
nm:{uz:"T-Tech 7REF4P595BGS1 — Side-by-Side 595L",ru:"T-Tech 7REF4P595BGS1 — Side-by-Side 595L",en:"T-Tech 7REF4P595BGS1 — Side-by-Side 595L"},
dsc:{uz:"595L Side-by-Side. NoFrost, Inverter, R600a, qora oyna.",ru:"595 л Side-by-Side. NoFrost, Inverter, R600a, чёрное стекло.",en:"595L Side-by-Side. NoFrost, Inverter, R600a, black glass."},
sp:{uz:["595L","No Frost","Inverter","R600a","Qora Oyna","Side by Side","T-Tech"],ru:["595 л","No Frost","Inverter","R600a","Чёрное стекло","Side by Side","T-Tech"],en:["595L","No Frost","Inverter","R600a","Black Glass","Side by Side","T-Tech"]}},
{id:39,cat:"fridge",sub:"top",brand:"ttech",usd:350,r:4.4,rv:37,s:true,tr:false,nw:false,img:IM.fr1,
nm:{uz:"T-Tech 7REF4S300SS1 — NoFrost Inverter 300L",ru:"T-Tech 7REF4S300SS1 — NoFrost Inverter 300L",en:"T-Tech 7REF4S300SS1 — NoFrost Inverter 300L"},
dsc:{uz:"300L, NoFrost, Inverter, R600a, ACDC. Ustdan muzlatgich.",ru:"300 л, NoFrost, Inverter, R600a, ACDC. Верхняя морозилка.",en:"300L, NoFrost, Inverter, R600a, ACDC. Top-freezer."},
sp:{uz:["300L","No Frost","Inverter","R600a","ACDC","Silver","Ustdan muzlatgich"],ru:["300 л","No Frost","Inverter","R600a","ACDC","Silver","Верхняя морозилка"],en:["300L","No Frost","Inverter","R600a","ACDC","Silver","Top-Freezer"]}},
// ═══ KIR MASHINASI ═══
{id:40,cat:"washer",sub:"front",brand:"lg",usd:317,r:4.5,rv:61,s:true,tr:false,nw:false,img:IM.wm1,
nm:{uz:"LG F2J3WS1W — 6.5kg Oq Front Load",ru:"LG F2J3WS1W — 6.5кг Белая Front Load",en:"LG F2J3WS1W — 6.5kg White Front Load"},
dsc:{uz:"6.5 kg, 1200 rpm. Motor Digital Inverter. A+ energiya sinfi.",ru:"6.5 кг, 1200 об/мин. Motor Digital Inverter. A+ класс.",en:"6.5kg, 1200 RPM. Motor Digital Inverter Technology. A+ energy."},
sp:{uz:["6.5 kg","1200 rpm","Digital Inverter","A+","Oq rang","Standart","6 dastur"],ru:["6.5 кг","1200 об/мин","Digital Inverter","A+","Белый","Стандарт","6 программ"],en:["6.5kg","1200 RPM","Digital Inverter","A+","White","Standard","6 programs"]}},
{id:41,cat:"washer",sub:"front",brand:"lg",usd:360,r:4.5,rv:54,s:true,tr:true,nw:false,img:IM.wm1,
nm:{uz:"LG F2V3HS6J — 7kg Qora AI DD Inverter",ru:"LG F2V3HS6J — 7кг Чёрный AI DD Inverter",en:"LG F2V3HS6J — 7kg Black AI DD Inverter"},
dsc:{uz:"7 kg, 1400 rpm. AI DD texnologiyasi matoga qarab tanlaydi. Steam+ 99.9% bakteriya.",ru:"7 кг, 1400 об/мин. AI DD выбирает программу. Steam+ 99.9% бактерий.",en:"7kg, 1400 RPM. AI DD selects by fabric type. Steam+ kills 99.9% bacteria."},
sp:{uz:["7 kg","1400 rpm","AI DD™","Steam+","Qora rang","A+++","ThinQ™"],ru:["7 кг","1400 об/мин","AI DD™","Steam+","Чёрный","A+++","ThinQ™"],en:["7kg","1400 RPM","AI DD™","Steam+","Black","A+++","ThinQ™"]}},
{id:42,cat:"washer",sub:"front",brand:"lg",usd:410,r:4.6,rv:46,s:true,tr:false,nw:false,img:IM.wm1,
nm:{uz:"LG F2V5HYPYJE — 7kg AI DD Wi-Fi ThinQ",ru:"LG F2V5HYPYJE — 7кг AI DD Wi-Fi ThinQ",en:"LG F2V5HYPYJE — 7kg AI DD Wi-Fi ThinQ"},
dsc:{uz:"7 kg, 1200 rpm. AI DD, ThinQ Smart Wi-Fi boshqaruv, Steam funksiyasi.",ru:"7 кг, 1200 об/мин. AI DD, ThinQ Smart Wi-Fi, Steam.",en:"7kg, 1200 RPM. AI DD technology. ThinQ Smart Wi-Fi. Steam function."},
sp:{uz:["7 kg","1200 rpm","AI DD™","ThinQ™ Wi-Fi","Steam","Qora","A+++"],ru:["7 кг","1200 об/мин","AI DD™","ThinQ™","Steam","Чёрный","A+++"],en:["7kg","1200 RPM","AI DD™","ThinQ™ Wi-Fi","Steam","Black","A+++"]}},
{id:43,cat:"washer",sub:"front",brand:"lg",usd:450,r:4.7,rv:38,s:true,tr:false,nw:false,img:IM.wm1,
nm:{uz:"LG F2V7GWL2P — 8.5kg AI DD Inverter",ru:"LG F2V7GWL2P — 8.5кг AI DD Inverter",en:"LG F2V7GWL2P — 8.5kg AI DD Inverter"},
dsc:{uz:"8.5 kg, 1200 rpm. AI DD va Steam texnologiyalari. ThinQ Wi-Fi. Yirik oilalar uchun.",ru:"8.5 кг, 1200 об/мин. AI DD, Steam. ThinQ Wi-Fi.",en:"8.5kg, 1200 RPM. AI DD and Steam. ThinQ Wi-Fi. Large families."},
sp:{uz:["8.5 kg","1200 rpm","AI DD™","Steam","ThinQ™","A+++","Motor Inverter"],ru:["8.5 кг","1200 об/мин","AI DD™","Steam","ThinQ™","A+++","Motor Inverter"],en:["8.5kg","1200 RPM","AI DD™","Steam","ThinQ™","A+++","Motor Inverter"]}},
{id:44,cat:"washer",sub:"front",brand:"lg",usd:532,r:4.7,rv:33,s:true,tr:false,nw:false,img:IM.wm1,
nm:{uz:"LG F2T9FW9W — 9kg AI DD Inverter",ru:"LG F2T9FW9W — 9кг AI DD Inverter",en:"LG F2T9FW9W — 9kg AI DD Inverter"},
dsc:{uz:"9 kg, 1400 rpm. AI DD, Steam+ 99.9% bakteriya. Katta yuklamalar uchun.",ru:"9 кг, 1400 об/мин. AI DD, Steam+. Для больших загрузок.",en:"9kg, 1400 RPM. AI DD, Steam+. For large loads."},
sp:{uz:["9 kg","1400 rpm","AI DD™","Steam+","ThinQ™","A+++","Inverter Motor"],ru:["9 кг","1400 об/мин","AI DD™","Steam+","ThinQ™","A+++","Inverter Motor"],en:["9kg","1400 RPM","AI DD™","Steam+","ThinQ™","A+++","Inverter Motor"]}},
{id:45,cat:"washer",sub:"front",brand:"lg",usd:860,r:4.8,rv:28,s:true,tr:false,nw:false,img:IM.wm2,
nm:{uz:"LG F0L9DYP2S — 15kg Twin Wash",ru:"LG F0L9DYP2S — 15кг Twin Wash",en:"LG F0L9DYP2S — 15kg Twin Wash"},
dsc:{uz:"15 kg. Twin Wash texnologiyasi ikki dasturni bir vaqtda. Tijorat uchun.",ru:"15 кг. Twin Wash — два цикла одновременно. Коммерческое.",en:"15kg. Twin Wash runs two programs simultaneously. Commercial use."},
sp:{uz:["15 kg","1400 rpm","Twin Wash","AI DD™","ThinQ™","A+++","Drum Motor"],ru:["15 кг","1400 об/мин","Twin Wash","AI DD™","ThinQ™","A+++","Drum Motor"],en:["15kg","1400 RPM","Twin Wash","AI DD™","ThinQ™","A+++","Drum Motor"]}},
{id:46,cat:"washer",sub:"front",brand:"lg",usd:600,r:4.7,rv:22,s:true,tr:false,nw:true,img:IM.wm1,
nm:{uz:"LG L5C0905PSGC — 9/5kg Kir Yuvish+Quritish",ru:"LG L5C0905PSGC — 9/5кг Стирка+Сушка",en:"LG L5C0905PSGC — 9/5kg Washer-Dryer Combo"},
dsc:{uz:"9 kg yuvish, 5 kg quritish. AI DD, 1200 rpm. Steam. 475mm tor.",ru:"9 кг стирка, 5 кг сушка. AI DD, 1200 об/мин. Steam. 475мм.",en:"9kg wash, 5kg dry. AI DD. 1200 RPM. Steam. 475mm narrow."},
sp:{uz:["9 kg yuvish","5 kg quritish","AI DD™","1200 rpm","Steam","475mm Tor","A+++"],ru:["9 кг стирка","5 кг сушка","AI DD™","1200 об/мин","Steam","475 мм","A+++"],en:["9kg wash","5kg dry","AI DD™","1200 RPM","Steam","475mm narrow","A+++"]}},
{id:47,cat:"washer",sub:"front",brand:"beston",usd:345,r:4.3,rv:41,s:true,tr:false,nw:false,img:IM.wm1,
nm:{uz:"Beston BWM-6612D12 — 12kg Front Load",ru:"Beston BWM-6612D12 — 12кг Front Load",en:"Beston BWM-6612D12 — 12kg Front Load"},
dsc:{uz:"12 kg, 1200 rpm. Inverter motor, Auto Clean. Tejamkor va ishonchli.",ru:"12 кг, 1200 об/мин. Inverter, Auto Clean. Экономичный.",en:"12kg, 1200 RPM. Inverter motor, Auto Clean. Economical."},
sp:{uz:["12 kg","1200 rpm","Inverter Motor","Auto Clean","Display","A+","Tejamkor"],ru:["12 кг","1200 об/мин","Inverter","Auto Clean","Дисплей","A+","Экономичный"],en:["12kg","1200 RPM","Inverter Motor","Auto Clean","Display","A+","Economical"]}},
{id:48,cat:"washer",sub:"front",brand:"beston",usd:437,r:4.5,rv:29,s:true,tr:false,nw:true,img:IM.wm1,
nm:{uz:"Beston BWM-6010D14 — 10kg Front Load Inverter",ru:"Beston BWM-6010D14 — 10кг Front Load Inverter",en:"Beston BWM-6010D14 — 10kg Front Load Inverter"},
dsc:{uz:"10 kg, 1400 rpm Inverter. Display panel. A+ energiya. 14 dastur.",ru:"10 кг, 1400 об/мин Inverter. Дисплей. A+. 14 программ.",en:"10kg, 1400 RPM Inverter. Display. A+ energy. 14 programs."},
sp:{uz:["10 kg","1400 rpm","Inverter Motor","Display","Auto Clean","A+","14 dastur"],ru:["10 кг","1400 об/мин","Inverter","Display","Auto Clean","A+","14 программ"],en:["10kg","1400 RPM","Inverter Motor","Display","Auto Clean","A+","14 programs"]}},
{id:49,cat:"washer",sub:"top",brand:"bench",usd:270,r:4.2,rv:48,s:true,tr:false,nw:false,img:IM.wm3,
nm:{uz:"Bench BW-B7005G — 7kg Top Load Inverter",ru:"Bench BW-B7005G — 7кг Вертикальная Inverter",en:"Bench BW-B7005G — 7kg Top Load Inverter"},
dsc:{uz:"7 kg yuqoridan yuklanadigan. Inverter motor. 5 yil motor kafolati.",ru:"7 кг вертикальная. Inverter мотор. 5 лет гарантия двигателя.",en:"7kg top-loading. Inverter motor. 5-year motor warranty."},
sp:{uz:["7 kg","Top Load","Inverter Motor","5 Yil Motor Kafolat","Display","A+","Qulay"],ru:["7 кг","Вертикальная","Inverter","5 лет двигатель","Дисплей","A+","Удобная"],en:["7kg","Top Load","Inverter Motor","5yr Motor Warranty","Display","A+","Convenient"]}},
{id:50,cat:"washer",sub:"top",brand:"bench",usd:310,r:4.3,rv:37,s:true,tr:false,nw:false,img:IM.wm3,
nm:{uz:"Bench BW-B1005G — 10kg Top Load Inverter",ru:"Bench BW-B1005G — 10кг Вертикальная Inverter",en:"Bench BW-B1005G — 10kg Top Load Inverter"},
dsc:{uz:"10 kg katta hajm. Inverter motor. 5 yil motor kafolati.",ru:"10 кг. Inverter мотор. 5 лет гарантия.",en:"10kg large capacity. Inverter motor. 5yr motor warranty."},
sp:{uz:["10 kg","Top Load","Inverter Motor","5 Yil kafolat","Display","A+","Katta hajm"],ru:["10 кг","Вертикальная","Inverter","5 лет","Дисплей","A+","Большой"],en:["10kg","Top Load","Inverter Motor","5yr Warranty","Display","A+","Large"]}},
{id:51,cat:"washer",sub:"top",brand:"bench",usd:520,r:4.5,rv:24,s:true,tr:false,nw:true,img:IM.wm3,
nm:{uz:"Bench BW-B1855G — 18kg Top Load Tijorat",ru:"Bench BW-B1855G — 18кг Top Load Коммерческий",en:"Bench BW-B1855G — 18kg Top Load Commercial"},
dsc:{uz:"18 kg tijorat uchun. Inverter Motor. 5 yil kafolat. Mehmonxona uchun.",ru:"18 кг коммерческий. Inverter. 5 лет. Для отелей.",en:"18kg commercial. Inverter Motor. 5yr warranty. For hotels."},
sp:{uz:["18 kg","Top Load","Inverter Motor","5 Yil kafolat","Tijorat","Display","A"],ru:["18 кг","Вертикальная","Inverter","5 лет","Коммерческий","Дисплей","A"],en:["18kg","Top Load","Inverter Motor","5yr Warranty","Commercial","Display","A"]}},
{id:52,cat:"washer",sub:"top",brand:"samsung",usd:690,r:4.6,rv:41,s:true,tr:false,nw:false,img:IM.wm3,
nm:{uz:"Samsung WA80F18B9BGM — 18kg Top Load",ru:"Samsung WA80F18B9BGM — 18кг Top Load",en:"Samsung WA80F18B9BGM — 18kg Top Load"},
dsc:{uz:"18 kg Samsung top load. Digital Inverter. Smart Motion. 10 yil motor kafolati.",ru:"18 кг Samsung. Digital Inverter. Smart Motion. 10 лет мотор.",en:"18kg Samsung top load. Digital Inverter. Smart Motion. 10yr motor warranty."},
sp:{uz:["18 kg","Top Load","Digital Inverter","Smart Motion","10 Yil Motor","Display","A+"],ru:["18 кг","Вертикальная","Digital Inverter","Smart Motion","10 лет мотор","Дисплей","A+"],en:["18kg","Top Load","Digital Inverter","Smart Motion","10yr Motor","Display","A+"]}},
// ═══ VSTROYENNIY TEXNIKA ═══

{id:53,cat:"builtin",sub:"range",brand:"ferre",usd:220,r:4.1,rv:67,s:true,tr:false,nw:false,img:IM.bi1,
nm:{uz:"Ferre NL90-1T Oddiy — Gaz Plita 90sm",ru:"Ferre NL90-1T Простая — Газовая Плита 90см",en:"Ferre NL90-1T Simple — Gas Range 90cm"},
dsc:{uz:"Oddiy 90sm gaz plita. 5 goreli, cast iron panjara, elektr yoqish. Turkiyada ishlab chiqarilgan.",ru:"Простая 90см газовая плита. 5 горелок, чугун, электроподжиг. Турция.",en:"Simple 90cm gas range. 5 burners, cast iron, electric ignition. Turkey."},
sp:{uz:["5 goreli","Cast Iron","Elektr yoqish","90 sm","FFD","Mexanik","Turkiya"],ru:["5 горелок","Чугун","Электроподжиг","90 см","FFD","Механика","Турция"],en:["5 Burners","Cast Iron","Auto Ignition","90 cm","FFD","Mechanical","Turkey"]}},
{id:54,cat:"builtin",sub:"range",brand:"ferre",usd:285,r:4.3,rv:56,s:true,tr:false,nw:false,img:IM.bi1,
nm:{uz:"Ferre NL90-1 Full — 90sm Gaz+Elektr Duxovka",ru:"Ferre NL90-1 Full — 90см Газ+Электрическая духовка",en:"Ferre NL90-1 Full — 90cm Gas+Electric Oven"},
dsc:{uz:"90sm kombinatsiyali. 5 gaz goreli, elektr duxovka, grill, timer, cast iron, FFD.",ru:"90см комбинированная. 5 горелок, эл. духовка, гриль, таймер, чугун.",en:"90cm combination. 5 gas burners, electric oven, grill, timer, cast iron."},
sp:{uz:["5 Gaz goreli","Elektr Duxovka","Grill","Timer","FFD","Cast Iron","Turkiya"],ru:["5 газ горелок","Эл. духовка","Гриль","Таймер","FFD","Чугун","Турция"],en:["5 Gas Burners","Electric Oven","Grill","Timer","FFD","Cast Iron","Turkey"]}},
{id:55,cat:"builtin",sub:"range",brand:"ferre",usd:370,r:4.4,rv:38,s:true,tr:false,nw:false,img:IM.bi1,
nm:{uz:"Ferre Full Konveksiya — 90sm Gaz+Konveksiya",ru:"Ferre Full Конвекция — 90см Газ+Конвекция",en:"Ferre Full Convection — 90cm Gas+Convection"},
dsc:{uz:"90sm premium. 5 goreli, konveksiyali elektr duxovka, timer, grill, FFD.",ru:"90см премиум. 5 горелок, конвекция, эл. духовка, таймер, гриль.",en:"90cm premium. 5 burners, convection electric oven, timer, grill, FFD."},
sp:{uz:["5 Gaz goreli","Konveksiya","Elektr Duxovka","Timer","Grill","FFD","Turkiya"],ru:["5 горелок","Конвекция","Эл. духовка","Таймер","Гриль","FFD","Турция"],en:["5 Gas Burners","Convection","Electric Oven","Timer","Grill","FFD","Turkey"]}},
{id:56,cat:"builtin",sub:"range",brand:"hisense",usd:470,r:4.5,rv:34,s:true,tr:true,nw:false,img:IM.bi1,
nm:{uz:"Hisense HFS90GA5EBL — 90sm Qora Gaz Plita",ru:"Hisense HFS90GA5EBL — 90см Чёрная Газовая Плита",en:"Hisense HFS90GA5EBL — 90cm Black Gas Range"},
dsc:{uz:"90sm 5 goreli qora gaz plita. Cast iron. Gaz nazorat. Elektr yoqish.",ru:"90см газовая плита, чёрная. Чугун. Газ-контроль. Электроподжиг.",en:"90cm 5-burner gas range, black. Cast iron. Gas control. Auto ignition."},
sp:{uz:["5 goreli","Cast Iron","Gaz nazorat","Elektr yoqish","90 sm","Qora","Gaz Duxovka"],ru:["5 горелок","Чугун","Газ-контроль","Электроподжиг","90 см","Чёрный","Газ духовка"],en:["5 Burners","Cast Iron","Gas Control","Auto Ignition","90 cm","Black","Gas Oven"]}},
{id:57,cat:"builtin",sub:"range",brand:"hisense",usd:260,r:4.2,rv:52,s:true,tr:false,nw:false,img:IM.bi1,
nm:{uz:"Hisense HFG60121X — 60sm Gaz Plita",ru:"Hisense HFG60121X — 60см Газовая Плита",en:"Hisense HFG60121X — 60cm Gas Range"},
dsc:{uz:"60sm 4 goreli gaz plita. Cast iron. Elektr yoqish. Gaz nazorat.",ru:"60см 4 горелки. Чугун. Электроподжиг. Газ-контроль.",en:"60cm 4-burner gas range. Cast iron. Auto ignition. Gas control."},
sp:{uz:["4 goreli","Cast Iron","Gaz nazorat","Elektr yoqish","60 sm","Kumush","Gaz Duxovka"],ru:["4 горелки","Чугун","Газ-контроль","Электроподжиг","60 см","Серебристый","Газ духовка"],en:["4 Burners","Cast Iron","Gas Control","Auto Ignition","60 cm","Silver","Gas Oven"]}},
{id:58,cat:"builtin",sub:"range",brand:"immer",usd:468,r:4.5,rv:29,s:true,tr:false,nw:false,img:IM.bi1,
nm:{uz:"Immer X90 — 90sm Oq Gaz+Elektr Premium",ru:"Immer X90 — 90см Белый Газ+Электр Премиум",en:"Immer X90 — 90cm White Gas+Electric Premium"},
dsc:{uz:"Premium 90sm. Low-e Glass, Gas Regulator, Cast Iron, 5 goreli, Electric Grill, FFD.",ru:"Премиум 90см. Low-e Glass, Gas Regulator, Чугун, 5 горелок, Electric Grill.",en:"Premium 90cm. Low-e Glass, Gas Regulator, Cast Iron, 5 burners, Electric Grill."},
sp:{uz:["5 goreli","Low-e Glass","Gas Regulator","Cast Iron","Electric Grill","FFD","Oq rang"],ru:["5 горелок","Low-e Glass","Gas Regulator","Чугун","Electric Grill","FFD","Белый"],en:["5 Burners","Low-e Glass","Gas Regulator","Cast Iron","Electric Grill","FFD","White"]}},
{id:59,cat:"builtin",sub:"range",brand:"immer",usd:455,r:4.4,rv:26,s:true,tr:false,nw:false,img:IM.bi1,
nm:{uz:"Immer B90 — 90sm Qora Gaz+Elektr",ru:"Immer B90 — 90см Чёрный Газ+Электр",en:"Immer B90 — 90cm Black Gas+Electric"},
dsc:{uz:"Qora 90sm. Low-e Glass, Gas Regulator, Cast Iron, 5 goreli, Electric Grill, FFD.",ru:"Чёрная 90см. Low-e Glass, Gas Regulator, Чугун, 5 горелок, Electric Grill.",en:"Black 90cm. Low-e Glass, Gas Regulator, Cast Iron, 5 burners, Electric Grill."},
sp:{uz:["5 goreli","Low-e Glass","Gas Regulator","Cast Iron","Electric Grill","Qora","FFD"],ru:["5 горелок","Low-e Glass","Gas Regulator","Чугун","Electric Grill","Чёрный","FFD"],en:["5 Burners","Low-e Glass","Gas Regulator","Cast Iron","Electric Grill","Black","FFD"]}},
{id:60,cat:"builtin",sub:"hob",brand:"beston",usd:145,r:4.3,rv:78,s:true,tr:true,nw:false,img:IM.bi2,
nm:{uz:"Beston BHS-11090BT — 5 Goreli 90sm Qo'shma Pech",ru:"Beston BHS-11090BT — 5 горелок 90см Поверхность",en:"Beston BHS-11090BT — 5-Burner 90cm Gas Hob"},
dsc:{uz:"90sm 5 goreli. Bardoshli oyna 8mm. Elektr yoqish. Wok stand. Qora rang.",ru:"90см 5 горелок. Стекло 8мм. Электроподжиг. Wok stand. Чёрный.",en:"90cm 5-burner. 8mm tempered glass. Auto ignition. Wok stand. Black."},
sp:{uz:["5 goreli","8mm Bardoshli Oyna","Elektr yoqish","860×520mm","Wok stand","Qora","A"],ru:["5 горелок","Стекло 8мм","Электроподжиг","860×520мм","Wok stand","Чёрный","A"],en:["5 Burners","8mm Glass","Auto Ignition","860×520mm","Wok stand","Black","A"]}},
{id:61,cat:"builtin",sub:"hob",brand:"beston",usd:119,r:4.2,rv:64,s:true,tr:false,nw:false,img:IM.bi2,
nm:{uz:"Beston BHS-11060BT — 4 Goreli 60sm Qo'shma Pech",ru:"Beston BHS-11060BT — 4 горелки 60см Поверхность",en:"Beston BHS-11060BT — 4-Burner 60cm Gas Hob"},
dsc:{uz:"60sm 4 goreli. Bardoshli oyna 8mm. Elektr yoqish. Wok stand. Qora.",ru:"60см 4 горелки. Стекло 8мм. Электроподжиг. Wok stand.",en:"60cm 4-burner. 8mm tempered glass. Auto ignition. Wok stand."},
sp:{uz:["4 goreli","8mm Bardoshli Oyna","Elektr yoqish","600×520mm","Wok stand","Qora","A"],ru:["4 горелки","Стекло 8мм","Электроподжиг","600×520мм","Wok stand","Чёрный","A"],en:["4 Burners","8mm Glass","Auto Ignition","600×520mm","Wok stand","Black","A"]}},
{id:62,cat:"builtin",sub:"hob",brand:"beston",usd:95,r:4.2,rv:44,s:true,tr:false,nw:false,img:IM.bi2,
nm:{uz:"Beston BHC-10660BT — 4+1 Wok Goreli O'rnatiluvchi",ru:"Beston BHC-10660BT — 4+1 Wok горелки Встраиваемая",en:"Beston BHC-10660BT — 4+1 Wok Burner Built-in"},
dsc:{uz:"O'rnatiluvchi 4+1 Wok goreli. Panel 8mm. 60×50sm. Elektr yoqish. FFD. Yangi model.",ru:"Встраиваемая 4+1 Wok. Стекло 8мм. 60×50см. Электроподжиг. FFD.",en:"Built-in 4+1 Wok burner. 8mm glass. 60×50cm. Auto ignition. FFD. New model."},
sp:{uz:["4+1 Wok goreli","8mm Panel","60×50sm","Elektr yoqish","FFD","O'rnatiluvchi","Yangi"],ru:["4+1 Wok","Стекло 8мм","60×50см","Электроподжиг","FFD","Встраиваемая","Новинка"],en:["4+1 Wok","8mm Glass","60×50cm","Auto Ignition","FFD","Built-in","New Model"]}},
{id:63,cat:"builtin",sub:"hood",brand:"beston",usd:125,r:4.4,rv:62,s:true,tr:true,nw:false,img:IM.bi3,
nm:{uz:"Beston BRH-60B13801 — 60sm 1380m³ Sensor+Voice",ru:"Beston BRH-60B13801 — 60см 1380м³ Sensor+Voice",en:"Beston BRH-60B13801 — 60cm 1380m³ Sensor+Voice"},
dsc:{uz:"60sm qora vityajka. Sensor, Gesture va Voice control. 1380 m³/soat. LED 1×3W. Karbon+Baffle filtr.",ru:"60см. Sensor, Gesture, Voice. 1380 м³/ч. LED 1×3W. Карбон+Baffle.",en:"60cm black hood. Sensor, Gesture & Voice control. 1380 m³/h. LED. Carbon+Baffle."},
sp:{uz:["60 sm","1380 m³/soat","Sensor+Gesture+Voice","LED 1×3W","Karbon+Baffle","2 ta mo'ri","Qora"],ru:["60 см","1380 м³/ч","Sensor+Gesture+Voice","LED 1×3W","Карбон+Baffle","2 трубы","Чёрный"],en:["60 cm","1380 m³/h","Sensor+Gesture+Voice","LED 1×3W","Carbon+Baffle","2 ducts","Black"]}},
{id:64,cat:"builtin",sub:"hood",brand:"beston",usd:140,r:4.5,rv:44,s:true,tr:false,nw:false,img:IM.bi3,
nm:{uz:"Beston BRH-60BCT1KBS — 60sm 1000m³ Sensor",ru:"Beston BRH-60BCT1KBS — 60см 1000м³ Sensor",en:"Beston BRH-60BCT1KBS — 60cm 1000m³ Sensor"},
dsc:{uz:"60sm. Sensor va Gesture control. 1000 m³/soat. LED 1×5W. Misli Motor. Inox.",ru:"60см. Sensor, Gesture. 1000 м³/ч. LED 1×5W. Мотор Inox.",en:"60cm. Sensor & Gesture. 1000 m³/h. LED 1×5W. Inox motor."},
sp:{uz:["60 sm","1000 m³/soat","Sensor+Gesture","LED 1×5W","Misli Motor","Inox","2 ta mo'ri"],ru:["60 см","1000 м³/ч","Sensor+Gesture","LED 1×5W","Мотор Inox","Inox","2 трубы"],en:["60 cm","1000 m³/h","Sensor+Gesture","LED 1×5W","Inox Motor","Inox","2 ducts"]}},
{id:65,cat:"builtin",sub:"hood",brand:"beston",usd:155,r:4.6,rv:38,s:true,tr:false,nw:false,img:IM.bi3,
nm:{uz:"Beston BRH-90BCT1KBS — 90sm 1000m³ Sensor",ru:"Beston BRH-90BCT1KBS — 90см 1000м³ Sensor",en:"Beston BRH-90BCT1KBS — 90cm 1000m³ Sensor"},
dsc:{uz:"90sm keng vityajka. Sensor. 1000 m³/soat. LED 1×5W. Misli motor. 2 ta mo'ri.",ru:"90см широкая. Sensor. 1000 м³/ч. LED 1×5W. Мотор Inox.",en:"90cm wide. Sensor. 1000 m³/h. LED 1×5W. Inox motor. 2 ducts."},
sp:{uz:["90 sm","1000 m³/soat","Sensor","LED 1×5W","Misli Motor","2 ta mo'ri","Inox+Oyna"],ru:["90 см","1000 м³/ч","Sensor","LED 1×5W","Мотор Inox","2 трубы","Inox+Стекло"],en:["90 cm","1000 m³/h","Sensor","LED 1×5W","Inox Motor","2 ducts","Inox+Glass"]}},
{id:66,cat:"builtin",sub:"hood",brand:"beston",usd:130,r:4.3,rv:55,s:true,tr:false,nw:false,img:IM.bi3,
nm:{uz:"Beston BRH-60BSTKS800SS — 60sm 800m³ Inox Slimline",ru:"Beston BRH-60BSTKS800SS — 60см 800м³ Inox Slimline",en:"Beston BRH-60BSTKS800SS — 60cm 800m³ Inox Slimline"},
dsc:{uz:"60sm Inox slimline vityajka. Sensor. 800 m³/soat. LED 1×3W. Misli motor.",ru:"60см Inox Slimline. Sensor. 800 м³/ч. LED 1×3W. Мотор Inox.",en:"60cm Inox slimline. Sensor. 800 m³/h. LED 1×3W. Inox motor."},
sp:{uz:["60 sm","800 m³/soat","Sensor","LED 1×3W","Misli Motor","Inox","Slimline"],ru:["60 см","800 м³/ч","Sensor","LED 1×3W","Мотор Inox","Inox","Slimline"],en:["60 cm","800 m³/h","Sensor","LED 1×3W","Inox Motor","Inox","Slimline"]}},
{id:67,cat:"builtin",sub:"hood",brand:"beston",usd:97,r:4.2,rv:43,s:true,tr:false,nw:false,img:IM.bi3,
nm:{uz:"Beston BHR-60W1055B — 60sm Qora Slim Vityajka",ru:"Beston BHR-60W1055B — 60см Чёрная Slim Вытяжка",en:"Beston BHR-60W1055B — 60cm Black Slim Hood"},
dsc:{uz:"60sm arzon qora slim vityajka. 3 ta tezlik. LED yoritish. Oddiy va ishonchli.",ru:"60см доступная чёрная slim. 3 скорости. LED подсветка.",en:"60cm affordable black slim hood. 3 speed settings. LED lighting."},
sp:{uz:["60 sm","3 ta tezlik","LED yoritish","Qora rang","Karbon filtr","Slim","Arzon"],ru:["60 см","3 скорости","LED","Чёрный","Карбон фильтр","Slim","Доступная"],en:["60 cm","3 speed","LED lighting","Black","Carbon filter","Slim","Affordable"]}},
{id:68,cat:"conditioner",sub:"wall",brand:"tcl",usd:424,r:4.5,rv:14,s:true,tr:true,nw:true,img:PIMG.tcl_br18||ph("TCL Breezein TAC-BR18HSV/TA"),
nm:{uz:"TCL Breezein 18 — TAC-BR18HSV/TA Full DC",ru:"TCL Breezein 18 — TAC-BR18HSV/TA Full DC",en:"TCL Breezein 18 — TAC-BR18HSV/TA Full DC"},
dsc:{uz:"18000 BTU. Full DC Inverter, R32 freon, AI Rapid Cooling, Golden Fin, 4D Air, UVC dezinfeksiya, Bipolar Ionizer.",ru:"18000 BTU. Full DC Inverter, R32, AI Rapid Cooling, Golden Fin, 4D Air, UVC, Bipolar Ionizer.",en:"18000 BTU. Full DC Inverter, R32, AI Rapid Cooling, Golden Fin, 4D Air, UVC, Bipolar Ionizer."},
sp:{uz:["18000 BTU","Full DC Inverter","R32","AI Rapid Cooling","Golden Fin","UVC","Bipolar Ionizer"],ru:["18000 BTU","Full DC Inverter","R32","AI Rapid Cooling","Golden Fin","UVC","Bipolar Ionizer"],en:["18000 BTU","Full DC Inverter","R32","AI Rapid Cooling","Golden Fin","UVC","Bipolar Ionizer"]}},
{id:69,cat:"conditioner",sub:"wall",brand:"tcl",usd:541,r:4.6,rv:11,s:true,tr:false,nw:true,img:PIMG.tcl_br24||ph("TCL Breezein TAC-BR24HSV/TA"),
nm:{uz:"TCL Breezein 24 — TAC-BR24HSV/TA Full DC",ru:"TCL Breezein 24 — TAC-BR24HSV/TA Full DC",en:"TCL Breezein 24 — TAC-BR24HSV/TA Full DC"},
dsc:{uz:"24000 BTU. Full DC Inverter, R32 freon, AI Rapid Cooling, Golden Fin, 4D Air, UVC, Bipolar Ionizer. Katta xonalar uchun.",ru:"24000 BTU. Full DC Inverter, R32, AI Rapid Cooling, Golden Fin, 4D Air, UVC, Bipolar Ionizer.",en:"24000 BTU. Full DC Inverter, R32, AI Rapid Cooling, Golden Fin, 4D Air, UVC, Bipolar Ionizer."},
sp:{uz:["24000 BTU","Full DC Inverter","R32","AI Rapid Cooling","Golden Fin","UVC","Bipolar Ionizer"],ru:["24000 BTU","Full DC Inverter","R32","AI Rapid Cooling","Golden Fin","UVC","Bipolar Ionizer"],en:["24000 BTU","Full DC Inverter","R32","AI Rapid Cooling","Golden Fin","UVC","Bipolar Ionizer"]}},
{id:70,cat:"conditioner",sub:"wall",brand:"tcl",usd:691,r:4.7,rv:9,s:true,tr:true,nw:true,img:PIMG.tcl_vx24||ph("TCL VoxIN TAC-VX24HSV/UA"),
nm:{uz:"TCL VoxIN 24 — TAC-VX24HSV/UA Wi-Fi & Voice",ru:"TCL VoxIN 24 — TAC-VX24HSV/UA Wi-Fi & Voice",en:"TCL VoxIN 24 — TAC-VX24HSV/UA Wi-Fi & Voice"},
dsc:{uz:"24000 BTU. Full DC Inverter, Wi-Fi va Ovozli boshqaruv, R32, 6-in-1 Gentle Breeze texnologiyasi, 4D Air.",ru:"24000 BTU. Full DC Inverter, Wi-Fi и голосовое управление, R32, 6-in-1 Gentle Breeze, 4D Air.",en:"24000 BTU. Full DC Inverter, Wi-Fi & Voice control, R32, 6-in-1 Gentle Breeze, 4D Air."},
sp:{uz:["24000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","6-in-1 Gentle Breeze","4D Air","Premium"],ru:["24000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","6-in-1 Gentle Breeze","4D Air","Premium"],en:["24000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","6-in-1 Gentle Breeze","4D Air","Premium"]}},
{id:71,cat:"conditioner",sub:"wall",brand:"tcl",usd:542,r:4.6,rv:13,s:true,tr:false,nw:true,img:PIMG.tcl_fr18w||ph("TCL Fresh In 3.0 TAC-FR18HSV P7W White"),
nm:{uz:"TCL Fresh In 3.0 — TAC-FR18HSV/P7W Oq",ru:"TCL Fresh In 3.0 — TAC-FR18HSV/P7W Белый",en:"TCL Fresh In 3.0 — TAC-FR18HSV/P7W White"},
dsc:{uz:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa filtr, 4D Air. Oq rang.",ru:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa фильтр, 4D Air. Белый.",en:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa filter, 4D Air. White."},
sp:{uz:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa filtr","4D Air","Oq rang"],ru:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa фильтр","4D Air","Белый"],en:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa Filter","4D Air","White"]}},
{id:72,cat:"conditioner",sub:"wall",brand:"tcl",usd:557,r:4.6,rv:10,s:true,tr:false,nw:true,img:PIMG.tcl_fr18s||ph("TCL Fresh In 3.0 TAC-FR18HSV P7S Silver"),
nm:{uz:"TCL Fresh In 3.0 — TAC-FR18HSV/P7S Kumush",ru:"TCL Fresh In 3.0 — TAC-FR18HSV/P7S Серебристый",en:"TCL Fresh In 3.0 — TAC-FR18HSV/P7S Silver"},
dsc:{uz:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa filtr, 4D Air. Kumush rang.",ru:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa фильтр. Серебристый.",en:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa filter. Silver."},
sp:{uz:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa filtr","4D Air","Kumush rang"],ru:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa фильтр","4D Air","Серебристый"],en:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa Filter","4D Air","Silver"]}},
{id:73,cat:"conditioner",sub:"wall",brand:"tcl",usd:578,r:4.7,rv:12,s:true,tr:false,nw:true,img:PIMG.tcl_fr18b||ph("TCL Fresh In 3.0 TAC-FR18HSV P7B Black"),
nm:{uz:"TCL Fresh In 3.0 — TAC-FR18HSV/P7B Qora",ru:"TCL Fresh In 3.0 — TAC-FR18HSV/P7B Чёрный",en:"TCL Fresh In 3.0 — TAC-FR18HSV/P7B Black"},
dsc:{uz:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa filtr, 4D Air. Qora rang, premium dizayn.",ru:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa фильтр. Чёрный, премиум.",en:"18000 BTU. Full DC Inverter, Wi-Fi & Voice, R32, Gentle Breeze, Hepa filter. Black, premium design."},
sp:{uz:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa filtr","4D Air","Qora Premium"],ru:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa фильтр","4D Air","Чёрный Премиум"],en:["18000 BTU","Full DC Inverter","Wi-Fi & Voice","R32","Hepa Filter","4D Air","Black Premium"]}},
{id:74,cat:"conditioner",sub:"floor",brand:"tcl",usd:722,r:4.6,rv:17,s:true,tr:true,nw:true,img:PIMG.tcl_k24mci||ph("TCL Kolonnik TAC-24CHFD MCI"),
nm:{uz:"TCL Kolonnik — TAC-24CHFD/MCI 30S Fast Cooling",ru:"TCL Kolonnik — TAC-24CHFD/MCI 30S Fast Cooling",en:"TCL Floor Standing — TAC-24CHFD/MCI 30S Fast Cooling"},
dsc:{uz:"24000 BTU kolonnik konditsioner. Full DC Inverter, R32, 30 soniyada tez sovutish, Golden Fin, Smart 3D Airflow, Auto Clean. 38dB(A) juda sokin.",ru:"24000 BTU напольный. Full DC Inverter, R32, быстрое охлаждение за 30 сек, Golden Fin, Smart 3D Airflow, Auto Clean. 38дБ.",en:"24000 BTU floor unit. Full DC Inverter, R32, 30-second fast cooling, Golden Fin, Smart 3D Airflow, Auto Clean. 38dB(A) very quiet."},
sp:{uz:["24000 BTU","Full DC Inverter","R32","30S Fast Cooling","Golden Fin","Smart 3D Airflow","38dB(A)"],ru:["24000 BTU","Full DC Inverter","R32","30S Fast Cooling","Golden Fin","Smart 3D Airflow","38дБ"],en:["24000 BTU","Full DC Inverter","R32","30S Fast Cooling","Golden Fin","Smart 3D Airflow","38dB(A)"]}},
{id:75,cat:"conditioner",sub:"floor",brand:"tcl",usd:861,r:4.6,rv:8,s:true,tr:false,nw:true,img:PIMG.tcl_k24fhi||ph("TCL Kolonnik TAC-24CHFA FHI"),
nm:{uz:"TCL Kolonnik — TAC-24CHFA/FHI 30S Fast Cooling",ru:"TCL Kolonnik — TAC-24CHFA/FHI 30S Fast Cooling",en:"TCL Floor Standing — TAC-24CHFA/FHI 30S Fast Cooling"},
dsc:{uz:"24000 BTU kolonnik. Full DC Inverter, R410A, 30S tez sovutish, Golden Fin, Smart, Auto Clean. 47dB(A).",ru:"24000 BTU напольный. Full DC Inverter, R410A, 30S, Golden Fin, Smart, Auto Clean. 47дБ.",en:"24000 BTU floor unit. Full DC Inverter, R410A, 30S fast cooling, Golden Fin, Smart, Auto Clean. 47dB(A)."},
sp:{uz:["24000 BTU","Full DC Inverter","R410A","30S Fast Cooling","Golden Fin","Smart+Auto","47dB(A)"],ru:["24000 BTU","Full DC Inverter","R410A","30S Fast Cooling","Golden Fin","Smart+Auto","47дБ"],en:["24000 BTU","Full DC Inverter","R410A","30S Fast Cooling","Golden Fin","Smart+Auto","47dB(A)"]}},
{id:76,cat:"conditioner",sub:"floor",brand:"tcl",usd:1083,r:4.7,rv:6,s:true,tr:false,nw:true,img:PIMG.tcl_k36fhi||ph("TCL Kolonnik TAC-36CHFA FHI"),
nm:{uz:"TCL Kolonnik — TAC-36CHFA/FHI 36000BTU",ru:"TCL Kolonnik — TAC-36CHFA/FHI 36000BTU",en:"TCL Floor Standing — TAC-36CHFA/FHI 36000BTU"},
dsc:{uz:"36000 BTU eng kuchli TCL kolonnik. Full DC Inverter, R410, 30S tez sovutish, Golden Fin, Smart, Auto Clean. 42dB(A) past shovqin.",ru:"36000 BTU самый мощный TCL. Full DC Inverter, R410, 30S, Golden Fin, Smart, Auto. 42дБ.",en:"36000 BTU most powerful TCL floor unit. Full DC Inverter, R410, 30S fast cooling, Golden Fin, Smart, Auto Clean. 42dB(A) low noise."},
sp:{uz:["36000 BTU","Full DC Inverter","R410","30S Fast Cooling","Golden Fin","Smart+Auto","42dB(A)"],ru:["36000 BTU","Full DC Inverter","R410","30S Fast Cooling","Golden Fin","Smart+Auto","42дБ"],en:["36000 BTU","Full DC Inverter","R410","30S Fast Cooling","Golden Fin","Smart+Auto","42dB(A)"]}},
{id:77,cat:"conditioner",sub:"wall",brand:"ziffler",usd:275,r:4.4,rv:19,s:true,tr:true,nw:true,img:PIMG.zif_z12||ph("Ziffler FAC-Z12W2MW Full DC Inverter"),
nm:{uz:"Ziffler FAC-Z12W2MW — Full DC Inverter",ru:"Ziffler FAC-Z12W2MW — Full DC Inverter",en:"Ziffler FAC-Z12W2MW — Full DC Inverter"},
dsc:{uz:"12000 BTU. Full DC Inverter, 12 qator mis trubka, R32 freon, A+++ energiya, Gree Landa kompressor, Isitish teni, Golden Fin, Soft Wind yumshoq havo oqimi.",ru:"12000 BTU. Full DC Inverter, 12 рядов медной трубки, R32, A+++, компрессор Gree Landa, ТЭН, Golden Fin, Soft Wind.",en:"12000 BTU. Full DC Inverter, 12-row copper tube, R32, A+++ energy, Gree Landa compressor, heating element, Golden Fin, Soft Wind."},
sp:{uz:["12000 BTU","Full DC Inverter","12 qator mis trubka","R32","A+++","Gree Landa Kompressor","Soft Wind"],ru:["12000 BTU","Full DC Inverter","12 рядов трубки","R32","A+++","Gree Landa","Soft Wind"],en:["12000 BTU","Full DC Inverter","12-row Copper Tube","R32","A+++","Gree Landa Compressor","Soft Wind"]}},
{id:78,cat:"conditioner",sub:"wall",brand:"gree",usd:400,r:4.3,rv:22,s:true,tr:false,nw:false,img:PIMG.gr_bora09||ph("Gree Bora 9000 BTU"),
nm:{uz:"Gree Bora 9 — Inverter R32",ru:"Gree Bora 9 — Inverter R32",en:"Gree Bora 9 — Inverter R32"},
dsc:{uz:"9000 BTU. Gree Bora seriyasi, Inverter texnologiyasi, R32 freon. Ishonchli va arzon.",ru:"9000 BTU. Серия Gree Bora, Inverter, R32. Надёжный и доступный.",en:"9000 BTU. Gree Bora series, Inverter technology, R32. Reliable and affordable."},
sp:{uz:["9000 BTU","Inverter","R32","Gree Original","Ishonchli","Arzon"],ru:["9000 BTU","Inverter","R32","Gree Original","Надёжный","Доступный"],en:["9000 BTU","Inverter","R32","Gree Original","Reliable","Affordable"]}},
{id:79,cat:"conditioner",sub:"wall",brand:"gree",usd:400,r:4.4,rv:31,s:true,tr:true,nw:false,img:PIMG.gr_bora12||ph("Gree Bora 12000 BTU"),
nm:{uz:"Gree Bora 12 — Inverter R32",ru:"Gree Bora 12 — Inverter R32",en:"Gree Bora 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Bora seriyasi eng ommabop model. Inverter, R32 freon.",ru:"12000 BTU. Самая популярная модель Gree Bora. Inverter, R32.",en:"12000 BTU. Most popular Gree Bora model. Inverter, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Ommabop","3 Yil kafolat"],ru:["12000 BTU","Inverter","R32","Gree Original","Популярная","3 года"],en:["12000 BTU","Inverter","R32","Gree Original","Popular","3yr Warranty"]}},
{id:80,cat:"conditioner",sub:"wall",brand:"gree",usd:540,r:4.4,rv:18,s:true,tr:false,nw:false,img:PIMG.gr_bora18||ph("Gree Bora 18000 BTU"),
nm:{uz:"Gree Bora 18 — Inverter R32",ru:"Gree Bora 18 — Inverter R32",en:"Gree Bora 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Bora, katta xonalar uchun. Inverter, R32 freon.",ru:"18000 BTU. Gree Bora для больших комнат. Inverter, R32.",en:"18000 BTU. Gree Bora for large rooms. Inverter, R32."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","Katta xona","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","Большая комната","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","Large Room","3yr"]}},
{id:81,cat:"conditioner",sub:"wall",brand:"gree",usd:720,r:4.5,rv:14,s:true,tr:false,nw:false,img:PIMG.gr_bora24||ph("Gree Bora 24000 BTU"),
nm:{uz:"Gree Bora 24 — Inverter R32",ru:"Gree Bora 24 — Inverter R32",en:"Gree Bora 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Bora kuchli model. Inverter, R32 freon. Katta maydonlar uchun.",ru:"24000 BTU. Мощная модель Gree Bora. Inverter, R32.",en:"24000 BTU. Powerful Gree Bora model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","Kuchli","3 Yil"],ru:["24000 BTU","Inverter","R32","Gree Original","Мощный","3 года"],en:["24000 BTU","Inverter","R32","Gree Original","Powerful","3yr"]}},
{id:82,cat:"conditioner",sub:"wall",brand:"gree",usd:400,r:4.3,rv:16,s:true,tr:false,nw:false,img:PIMG.gr_pular12||ph("Gree Pular 12000 BTU"),
nm:{uz:"Gree Pular 12 — Inverter R32",ru:"Gree Pular 12 — Inverter R32",en:"Gree Pular 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Pular seriyasi. Inverter texnologiyasi, R32 freon.",ru:"12000 BTU. Серия Gree Pular. Inverter, R32.",en:"12000 BTU. Gree Pular series. Inverter technology, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","3 Yil kafolat"],ru:["12000 BTU","Inverter","R32","Gree Original","3 года"],en:["12000 BTU","Inverter","R32","Gree Original","3yr Warranty"]}},
{id:83,cat:"conditioner",sub:"wall",brand:"gree",usd:540,r:4.4,rv:12,s:true,tr:false,nw:false,img:PIMG.gr_pular18||ph("Gree Pular 18000 BTU"),
nm:{uz:"Gree Pular 18 — Inverter R32",ru:"Gree Pular 18 — Inverter R32",en:"Gree Pular 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Pular, o'rta xonalar uchun. Inverter, R32 freon.",ru:"18000 BTU. Gree Pular для средних комнат. Inverter, R32.",en:"18000 BTU. Gree Pular for medium rooms. Inverter, R32."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","3yr"]}},
{id:84,cat:"conditioner",sub:"wall",brand:"gree",usd:720,r:4.5,rv:9,s:true,tr:false,nw:false,img:PIMG.gr_pular24||ph("Gree Pular 24000 BTU"),
nm:{uz:"Gree Pular 24 — Inverter R32",ru:"Gree Pular 24 — Inverter R32",en:"Gree Pular 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Pular kuchli model. Inverter, R32 freon.",ru:"24000 BTU. Мощная модель Gree Pular. Inverter, R32.",en:"24000 BTU. Powerful Gree Pular model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","3 Yil"],ru:["24000 BTU","Inverter","R32","Gree Original","3 года"],en:["24000 BTU","Inverter","R32","Gree Original","3yr"]}},
{id:85,cat:"conditioner",sub:"wall",brand:"gree",usd:455,r:4.5,rv:21,s:true,tr:true,nw:false,img:PIMG.gr_lomo12||ph("Gree Lomo 12000 BTU"),
nm:{uz:"Gree Lomo 12 — Inverter R32",ru:"Gree Lomo 12 — Inverter R32",en:"Gree Lomo 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Lomo seriyasi, zamonaviy dizayn. Inverter, R32 freon.",ru:"12000 BTU. Серия Gree Lomo, современный дизайн. Inverter, R32.",en:"12000 BTU. Gree Lomo series, modern design. Inverter, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Zamonaviy","3 Yil"],ru:["12000 BTU","Inverter","R32","Gree Original","Современный","3 года"],en:["12000 BTU","Inverter","R32","Gree Original","Modern","3yr"]}},
{id:86,cat:"conditioner",sub:"wall",brand:"gree",usd:600,r:4.5,rv:13,s:true,tr:false,nw:false,img:PIMG.gr_lomo18||ph("Gree Lomo 18000 BTU"),
nm:{uz:"Gree Lomo 18 — Inverter R32",ru:"Gree Lomo 18 — Inverter R32",en:"Gree Lomo 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Lomo, katta xonalar uchun. Inverter, R32 freon.",ru:"18000 BTU. Gree Lomo для больших комнат. Inverter, R32.",en:"18000 BTU. Gree Lomo for large rooms. Inverter, R32."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","3yr"]}},
{id:87,cat:"conditioner",sub:"wall",brand:"gree",usd:770,r:4.6,rv:8,s:true,tr:false,nw:false,img:PIMG.gr_lomo24||ph("Gree Lomo 24000 BTU"),
nm:{uz:"Gree Lomo 24 — Inverter R32",ru:"Gree Lomo 24 — Inverter R32",en:"Gree Lomo 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Lomo kuchli model. Inverter, R32 freon. Katta maydonlar uchun.",ru:"24000 BTU. Мощная модель Gree Lomo. Inverter, R32.",en:"24000 BTU. Powerful Gree Lomo model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","Kuchli","3 Yil"],ru:["24000 BTU","Inverter","R32","Gree Original","Мощный","3 года"],en:["24000 BTU","Inverter","R32","Gree Original","Powerful","3yr"]}},
{id:88,cat:"conditioner",sub:"wall",brand:"gree",usd:470,r:4.5,rv:17,s:true,tr:false,nw:false,img:PIMG.gr_fairyw12||ph("Gree Fairy White 12000 BTU"),
nm:{uz:"Gree Fairy White 12 — Inverter R32",ru:"Gree Fairy White 12 — Inverter R32",en:"Gree Fairy White 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Fairy oq rang, nafis dizayn. Inverter, R32 freon.",ru:"12000 BTU. Gree Fairy белый, элегантный дизайн. Inverter, R32.",en:"12000 BTU. Gree Fairy white, elegant design. Inverter, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Oq rang","Nafis dizayn"],ru:["12000 BTU","Inverter","R32","Gree Original","Белый","Элегантный"],en:["12000 BTU","Inverter","R32","Gree Original","White","Elegant Design"]}},
{id:89,cat:"conditioner",sub:"wall",brand:"gree",usd:625,r:4.5,rv:11,s:true,tr:false,nw:false,img:PIMG.gr_fairyw18||ph("Gree Fairy White 18000 BTU"),
nm:{uz:"Gree Fairy White 18 — Inverter R32",ru:"Gree Fairy White 18 — Inverter R32",en:"Gree Fairy White 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Fairy oq rang. Inverter, R32 freon. Katta xonalar uchun.",ru:"18000 BTU. Gree Fairy белый. Inverter, R32.",en:"18000 BTU. Gree Fairy white. Inverter, R32. For large rooms."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","Oq rang","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","Белый","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","White","3yr"]}},
{id:90,cat:"conditioner",sub:"wall",brand:"gree",usd:790,r:4.6,rv:7,s:true,tr:false,nw:false,img:PIMG.gr_fairyw24||ph("Gree Fairy White 24000 BTU"),
nm:{uz:"Gree Fairy White 24 — Inverter R32",ru:"Gree Fairy White 24 — Inverter R32",en:"Gree Fairy White 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Fairy oq rang kuchli model. Inverter, R32 freon.",ru:"24000 BTU. Мощная модель Gree Fairy белый. Inverter, R32.",en:"24000 BTU. Powerful Gree Fairy white model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","Oq rang","Kuchli"],ru:["24000 BTU","Inverter","R32","Gree Original","Белый","Мощный"],en:["24000 BTU","Inverter","R32","Gree Original","White","Powerful"]}},
{id:91,cat:"conditioner",sub:"wall",brand:"gree",usd:480,r:4.6,rv:15,s:true,tr:true,nw:false,img:PIMG.gr_fairyb12||ph("Gree Fairy Black 12000 BTU"),
nm:{uz:"Gree Fairy Black 12 — Inverter R32",ru:"Gree Fairy Black 12 — Inverter R32",en:"Gree Fairy Black 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Fairy qora rang, premium dizayn. Inverter, R32 freon.",ru:"12000 BTU. Gree Fairy чёрный, премиум дизайн. Inverter, R32.",en:"12000 BTU. Gree Fairy black, premium design. Inverter, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Qora rang","Premium"],ru:["12000 BTU","Inverter","R32","Gree Original","Чёрный","Премиум"],en:["12000 BTU","Inverter","R32","Gree Original","Black","Premium"]}},
{id:92,cat:"conditioner",sub:"wall",brand:"gree",usd:640,r:4.6,rv:9,s:true,tr:false,nw:false,img:PIMG.gr_fairyb18||ph("Gree Fairy Black 18000 BTU"),
nm:{uz:"Gree Fairy Black 18 — Inverter R32",ru:"Gree Fairy Black 18 — Inverter R32",en:"Gree Fairy Black 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Fairy qora rang. Inverter, R32 freon. Katta xonalar uchun.",ru:"18000 BTU. Gree Fairy чёрный. Inverter, R32.",en:"18000 BTU. Gree Fairy black. Inverter, R32. For large rooms."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","Qora rang","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","Чёрный","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","Black","3yr"]}},
{id:93,cat:"conditioner",sub:"wall",brand:"gree",usd:800,r:4.7,rv:6,s:true,tr:false,nw:false,img:PIMG.gr_fairyb24||ph("Gree Fairy Black 24000 BTU"),
nm:{uz:"Gree Fairy Black 24 — Inverter R32",ru:"Gree Fairy Black 24 — Inverter R32",en:"Gree Fairy Black 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Fairy qora rang kuchli model. Inverter, R32 freon.",ru:"24000 BTU. Мощная модель Gree Fairy чёрный. Inverter, R32.",en:"24000 BTU. Powerful Gree Fairy black model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","Qora rang","Kuchli"],ru:["24000 BTU","Inverter","R32","Gree Original","Чёрный","Мощный"],en:["24000 BTU","Inverter","R32","Gree Original","Black","Powerful"]}},
{id:94,cat:"conditioner",sub:"wall",brand:"gree",usd:540,r:4.6,rv:19,s:true,tr:true,nw:false,img:PIMG.gr_iceg12||ph("Gree Iceberg Gold 12000 BTU"),
nm:{uz:"Gree Iceberg Gold 12 — Inverter R32",ru:"Gree Iceberg Gold 12 — Inverter R32",en:"Gree Iceberg Gold 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Iceberg oltin rang, premium seriya. Inverter, R32 freon.",ru:"12000 BTU. Gree Iceberg золотой, премиум серия. Inverter, R32.",en:"12000 BTU. Gree Iceberg gold, premium series. Inverter, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Oltin rang","Premium"],ru:["12000 BTU","Inverter","R32","Gree Original","Золотой","Премиум"],en:["12000 BTU","Inverter","R32","Gree Original","Gold","Premium"]}},
{id:95,cat:"conditioner",sub:"wall",brand:"gree",usd:690,r:4.6,rv:10,s:true,tr:false,nw:false,img:PIMG.gr_iceg18||ph("Gree Iceberg Gold 18000 BTU"),
nm:{uz:"Gree Iceberg Gold 18 — Inverter R32",ru:"Gree Iceberg Gold 18 — Inverter R32",en:"Gree Iceberg Gold 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Iceberg oltin rang. Inverter, R32 freon. Katta xonalar uchun.",ru:"18000 BTU. Gree Iceberg золотой. Inverter, R32.",en:"18000 BTU. Gree Iceberg gold. Inverter, R32. For large rooms."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","Oltin rang","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","Золотой","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","Gold","3yr"]}},
{id:96,cat:"conditioner",sub:"wall",brand:"gree",usd:830,r:4.7,rv:7,s:true,tr:false,nw:false,img:PIMG.gr_iceg24||ph("Gree Iceberg Gold 24000 BTU"),
nm:{uz:"Gree Iceberg Gold 24 — Inverter R32",ru:"Gree Iceberg Gold 24 — Inverter R32",en:"Gree Iceberg Gold 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Iceberg oltin rang kuchli model. Inverter, R32 freon.",ru:"24000 BTU. Мощная модель Gree Iceberg золотой. Inverter, R32.",en:"24000 BTU. Powerful Gree Iceberg gold model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","Oltin rang","Kuchli"],ru:["24000 BTU","Inverter","R32","Gree Original","Золотой","Мощный"],en:["24000 BTU","Inverter","R32","Gree Original","Gold","Powerful"]}},
{id:97,cat:"conditioner",sub:"wall",brand:"gree",usd:530,r:4.5,rv:16,s:true,tr:false,nw:false,img:PIMG.gr_icew12||ph("Gree Iceberg White 12000 BTU"),
nm:{uz:"Gree Iceberg White 12 — Inverter R32",ru:"Gree Iceberg White 12 — Inverter R32",en:"Gree Iceberg White 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Iceberg oq rang, premium seriya. Inverter, R32 freon.",ru:"12000 BTU. Gree Iceberg белый, премиум серия. Inverter, R32.",en:"12000 BTU. Gree Iceberg white, premium series. Inverter, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Oq rang","Premium"],ru:["12000 BTU","Inverter","R32","Gree Original","Белый","Премиум"],en:["12000 BTU","Inverter","R32","Gree Original","White","Premium"]}},
{id:98,cat:"conditioner",sub:"wall",brand:"gree",usd:680,r:4.5,rv:9,s:true,tr:false,nw:false,img:PIMG.gr_icew18||ph("Gree Iceberg White 18000 BTU"),
nm:{uz:"Gree Iceberg White 18 — Inverter R32",ru:"Gree Iceberg White 18 — Inverter R32",en:"Gree Iceberg White 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Iceberg oq rang. Inverter, R32 freon. Katta xonalar uchun.",ru:"18000 BTU. Gree Iceberg белый. Inverter, R32.",en:"18000 BTU. Gree Iceberg white. Inverter, R32. For large rooms."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","Oq rang","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","Белый","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","White","3yr"]}},
{id:99,cat:"conditioner",sub:"wall",brand:"gree",usd:820,r:4.6,rv:5,s:true,tr:false,nw:false,img:PIMG.gr_icew24||ph("Gree Iceberg White 24000 BTU"),
nm:{uz:"Gree Iceberg White 24 — Inverter R32",ru:"Gree Iceberg White 24 — Inverter R32",en:"Gree Iceberg White 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Iceberg oq rang kuchli model. Inverter, R32 freon.",ru:"24000 BTU. Мощная модель Gree Iceberg белый. Inverter, R32.",en:"24000 BTU. Powerful Gree Iceberg white model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","Oq rang","Kuchli"],ru:["24000 BTU","Inverter","R32","Gree Original","Белый","Мощный"],en:["24000 BTU","Inverter","R32","Gree Original","White","Powerful"]}},
{id:100,cat:"conditioner",sub:"wall",brand:"gree",usd:570,r:4.5,rv:11,s:true,tr:false,nw:true,img:PIMG.gr_ucrown9||ph("Gree U-Crown 9000 BTU"),
nm:{uz:"Gree U-Crown 9 — Inverter R32",ru:"Gree U-Crown 9 — Inverter R32",en:"Gree U-Crown 9 — Inverter R32"},
dsc:{uz:"9000 BTU. Gree U-Crown seriyasi, kompakt va tejamkor. Inverter, R32 freon.",ru:"9000 BTU. Серия Gree U-Crown, компактный и экономичный. Inverter, R32.",en:"9000 BTU. Gree U-Crown series, compact and efficient. Inverter, R32."},
sp:{uz:["9000 BTU","Inverter","R32","Gree Original","Kompakt","3 Yil"],ru:["9000 BTU","Inverter","R32","Gree Original","Компактный","3 года"],en:["9000 BTU","Inverter","R32","Gree Original","Compact","3yr"]}},
{id:101,cat:"conditioner",sub:"wall",brand:"gree",usd:610,r:4.6,rv:14,s:true,tr:false,nw:true,img:PIMG.gr_ucrown12||ph("Gree U-Crown 12000 BTU"),
nm:{uz:"Gree U-Crown 12 — Inverter R32",ru:"Gree U-Crown 12 — Inverter R32",en:"Gree U-Crown 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree U-Crown seriyasi. Inverter, R32 freon. Zamonaviy dizayn.",ru:"12000 BTU. Серия Gree U-Crown. Inverter, R32. Современный дизайн.",en:"12000 BTU. Gree U-Crown series. Inverter, R32. Modern design."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Zamonaviy","3 Yil"],ru:["12000 BTU","Inverter","R32","Gree Original","Современный","3 года"],en:["12000 BTU","Inverter","R32","Gree Original","Modern","3yr"]}},
{id:102,cat:"conditioner",sub:"wall",brand:"gree",usd:605,r:4.5,rv:8,s:true,tr:false,nw:true,img:PIMG.gr_gtech12||ph("Gree G-Tech 12000 BTU"),
nm:{uz:"Gree G-Tech 12 — Inverter R32",ru:"Gree G-Tech 12 — Inverter R32",en:"Gree G-Tech 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree G-Tech seriyasi, texnologik dizayn. Inverter, R32 freon.",ru:"12000 BTU. Серия Gree G-Tech, технологичный дизайн. Inverter, R32.",en:"12000 BTU. Gree G-Tech series, tech design. Inverter, R32."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","Texnologik","3 Yil"],ru:["12000 BTU","Inverter","R32","Gree Original","Технологичный","3 года"],en:["12000 BTU","Inverter","R32","Gree Original","Tech Design","3yr"]}},
{id:103,cat:"conditioner",sub:"wall",brand:"gree",usd:450,r:4.4,rv:13,s:true,tr:false,nw:false,img:PIMG.gr_charmo12||ph("Gree Charmo 12000 BTU"),
nm:{uz:"Gree Charmo 12 — Inverter R32",ru:"Gree Charmo 12 — Inverter R32",en:"Gree Charmo 12 — Inverter R32"},
dsc:{uz:"12000 BTU. Gree Charmo seriyasi. Inverter, R32 freon. Yaxshi narx-sifat nisbati.",ru:"12000 BTU. Серия Gree Charmo. Inverter, R32. Хорошее соотношение цена-качество.",en:"12000 BTU. Gree Charmo series. Inverter, R32. Good value for money."},
sp:{uz:["12000 BTU","Inverter","R32","Gree Original","3 Yil","Yaxshi narx"],ru:["12000 BTU","Inverter","R32","Gree Original","3 года","Цена-качество"],en:["12000 BTU","Inverter","R32","Gree Original","3yr","Good Value"]}},
{id:104,cat:"conditioner",sub:"wall",brand:"gree",usd:640,r:4.4,rv:9,s:true,tr:false,nw:false,img:PIMG.gr_charmo18||ph("Gree Charmo 18000 BTU"),
nm:{uz:"Gree Charmo 18 — Inverter R32",ru:"Gree Charmo 18 — Inverter R32",en:"Gree Charmo 18 — Inverter R32"},
dsc:{uz:"18000 BTU. Gree Charmo, katta xonalar uchun. Inverter, R32 freon.",ru:"18000 BTU. Gree Charmo для больших комнат. Inverter, R32.",en:"18000 BTU. Gree Charmo for large rooms. Inverter, R32."},
sp:{uz:["18000 BTU","Inverter","R32","Gree Original","3 Yil"],ru:["18000 BTU","Inverter","R32","Gree Original","3 года"],en:["18000 BTU","Inverter","R32","Gree Original","3yr"]}},
{id:105,cat:"conditioner",sub:"wall",brand:"gree",usd:780,r:4.5,rv:6,s:true,tr:false,nw:false,img:PIMG.gr_charmo24||ph("Gree Charmo 24000 BTU"),
nm:{uz:"Gree Charmo 24 — Inverter R32",ru:"Gree Charmo 24 — Inverter R32",en:"Gree Charmo 24 — Inverter R32"},
dsc:{uz:"24000 BTU. Gree Charmo kuchli model. Inverter, R32 freon.",ru:"24000 BTU. Мощная модель Gree Charmo. Inverter, R32.",en:"24000 BTU. Powerful Gree Charmo model. Inverter, R32."},
sp:{uz:["24000 BTU","Inverter","R32","Gree Original","Kuchli","3 Yil"],ru:["24000 BTU","Inverter","R32","Gree Original","Мощный","3 года"],en:["24000 BTU","Inverter","R32","Gree Original","Powerful","3yr"]}},
{id:106,cat:"conditioner",sub:"wall",brand:"gree",usd:1400,r:4.7,rv:5,s:true,tr:false,nw:true,img:PIMG.gr_freshair||ph("Gree Fresh Air 24000 BTU"),
nm:{uz:"Gree Fresh Air 24 — Yuqori quvvat",ru:"Gree Fresh Air 24 — Высокая мощность",en:"Gree Fresh Air 24 — High Capacity"},
dsc:{uz:"24000 BTU. Gree Fresh Air — yuqori quvvatli maxsus seriya, ko'p xonali binolar uchun mos.",ru:"24000 BTU. Gree Fresh Air — специальная серия высокой мощности, для многокомнатных зданий.",en:"24000 BTU. Gree Fresh Air — special high-capacity series, suitable for multi-room buildings."},
sp:{uz:["24000 BTU","Yuqori Quvvat","Gree Original","Maxsus seriya","Ko'p xonali binolar"],ru:["24000 BTU","Высокая мощность","Gree Original","Спецсерия","Многокомнатные здания"],en:["24000 BTU","High Capacity","Gree Original","Special Series","Multi-room Buildings"]}},
{id:107,cat:"conditioner",sub:"wall",brand:"gree",usd:1200,r:4.6,rv:4,s:true,tr:false,nw:true,img:PIMG.gr_ishine||ph("Gree I-Shine 24000 BTU"),
nm:{uz:"Gree I-Shine 24 — Yuqori quvvat",ru:"Gree I-Shine 24 — Высокая мощность",en:"Gree I-Shine 24 — High Capacity"},
dsc:{uz:"24000 BTU. Gree I-Shine — yuqori quvvatli maxsus seriya, tijorat maydonlari uchun.",ru:"24000 BTU. Gree I-Shine — специальная серия высокой мощности, для коммерческих помещений.",en:"24000 BTU. Gree I-Shine — special high-capacity series, for commercial spaces."},
sp:{uz:["24000 BTU","Yuqori Quvvat","Gree Original","Maxsus seriya","Tijorat"],ru:["24000 BTU","Высокая мощность","Gree Original","Спецсерия","Коммерческий"],en:["24000 BTU","High Capacity","Gree Original","Special Series","Commercial"]}},
{id:108,cat:"conditioner",sub:"wall",brand:"gree",usd:1300,r:4.6,rv:4,s:true,tr:false,nw:true,img:PIMG.gr_goldenh||ph("Gree Golden House 24000 BTU"),
nm:{uz:"Gree Golden House 24 — Yuqori quvvat",ru:"Gree Golden House 24 — Высокая мощность",en:"Gree Golden House 24 — High Capacity"},
dsc:{uz:"24000 BTU. Gree Golden House — yuqori quvvatli premium seriya, katta uylar uchun.",ru:"24000 BTU. Gree Golden House — премиум серия высокой мощности, для больших домов.",en:"24000 BTU. Gree Golden House — premium high-capacity series, for large homes."},
sp:{uz:["24000 BTU","Yuqori Quvvat","Gree Original","Premium seriya","Katta uylar"],ru:["24000 BTU","Высокая мощность","Gree Original","Премиум серия","Большие дома"],en:["24000 BTU","High Capacity","Gree Original","Premium Series","Large Homes"]}},
{id:109,cat:"conditioner",sub:"floor",brand:"gree",usd:1100,r:4.6,rv:12,s:true,tr:true,nw:false,img:PIMG.gr_tfresh24||ph("Gree T-Fresh 24000 BTU floor standing"),
nm:{uz:"Gree T-Fresh 24 — Kolonnik",ru:"Gree T-Fresh 24 — Напольный",en:"Gree T-Fresh 24 — Floor Standing"},
dsc:{uz:"24000 BTU kolonnik konditsioner. Gree T-Fresh seriyasi, ofis va uy uchun mos.",ru:"24000 BTU напольный кондиционер. Серия Gree T-Fresh, для офиса и дома.",en:"24000 BTU floor-standing AC. Gree T-Fresh series, suitable for office and home."},
sp:{uz:["24000 BTU","Kolonnik","Gree Original","Ofis/Uy","3 Yil"],ru:["24000 BTU","Напольный","Gree Original","Офис/Дом","3 года"],en:["24000 BTU","Floor Standing","Gree Original","Office/Home","3yr"]}},
{id:110,cat:"conditioner",sub:"floor",brand:"gree",usd:1700,r:4.7,rv:9,s:true,tr:false,nw:false,img:PIMG.gr_tfresh48||ph("Gree T-Fresh 48000 BTU floor standing"),
nm:{uz:"Gree T-Fresh 48 — Kolonnik",ru:"Gree T-Fresh 48 — Напольный",en:"Gree T-Fresh 48 — Floor Standing"},
dsc:{uz:"48000 BTU kolonnik konditsioner. Gree T-Fresh, katta zallar uchun kuchli model.",ru:"48000 BTU напольный. Gree T-Fresh, мощная модель для больших залов.",en:"48000 BTU floor-standing AC. Gree T-Fresh, powerful model for large halls."},
sp:{uz:["48000 BTU","Kolonnik","Gree Original","Katta zallar","3 Yil"],ru:["48000 BTU","Напольный","Gree Original","Большие залы","3 года"],en:["48000 BTU","Floor Standing","Gree Original","Large Halls","3yr"]}},
{id:111,cat:"conditioner",sub:"floor",brand:"gree",usd:1850,r:4.7,rv:7,s:true,tr:false,nw:false,img:PIMG.gr_tfresh55||ph("Gree T-Fresh 55000 BTU floor standing"),
nm:{uz:"Gree T-Fresh 55 — Kolonnik",ru:"Gree T-Fresh 55 — Напольный",en:"Gree T-Fresh 55 — Floor Standing"},
dsc:{uz:"55000 BTU kolonnik konditsioner. Gree T-Fresh eng kuchli modeli, savdo markazlari uchun.",ru:"55000 BTU напольный. Самая мощная модель Gree T-Fresh, для торговых центров.",en:"55000 BTU floor-standing AC. Most powerful Gree T-Fresh model, for shopping centers."},
sp:{uz:["55000 BTU","Kolonnik","Gree Original","Savdo markazlari","3 Yil"],ru:["55000 BTU","Напольный","Gree Original","Торговые центры","3 года"],en:["55000 BTU","Floor Standing","Gree Original","Shopping Centers","3yr"]}},
{id:112,cat:"conditioner",sub:"floor",brand:"gree",usd:2300,r:4.7,rv:5,s:true,tr:false,nw:false,img:PIMG.gr_t3_60||ph("Gree T-3 60000 BTU floor standing"),
nm:{uz:"Gree T-3 60 — Kolonnik Kuchli",ru:"Gree T-3 60 — Напольный Мощный",en:"Gree T-3 60 — Powerful Floor Standing"},
dsc:{uz:"60000 BTU. Gree T-3 seriyasi, sanoat va tijorat binolar uchun kuchli kolonnik.",ru:"60000 BTU. Серия Gree T-3, мощный напольный для промышленных и коммерческих зданий.",en:"60000 BTU. Gree T-3 series, powerful floor unit for industrial and commercial buildings."},
sp:{uz:["60000 BTU","Kolonnik","Gree Original","Sanoat/Tijorat","3 Yil"],ru:["60000 BTU","Напольный","Gree Original","Промышленный","3 года"],en:["60000 BTU","Floor Standing","Gree Original","Industrial/Commercial","3yr"]}},
{id:113,cat:"conditioner",sub:"floor",brand:"gree",usd:3800,r:4.8,rv:3,s:true,tr:false,nw:true,img:PIMG.gr_grand100||ph("Gree Grand 100000 BTU floor standing"),
nm:{uz:"Gree Grand 100 — Kolonnik Ultra Kuchli",ru:"Gree Grand 100 — Напольный Ультра Мощный",en:"Gree Grand 100 — Ultra Powerful Floor Standing"},
dsc:{uz:"100000 BTU. Gree Grand — eng kuchli kolonnik model, katta sanoat binolari va omborlar uchun.",ru:"100000 BTU. Gree Grand — самая мощная напольная модель, для промышленных зданий и складов.",en:"100000 BTU. Gree Grand — the most powerful floor unit, for large industrial buildings and warehouses."},
sp:{uz:["100000 BTU","Kolonnik","Gree Original","Ultra Kuchli","Sanoat/Ombor"],ru:["100000 BTU","Напольный","Gree Original","Ультра мощный","Промышленный/Склад"],en:["100000 BTU","Floor Standing","Gree Original","Ultra Powerful","Industrial/Warehouse"]}},
];
const V={
  stagger:{hidden:{},visible:{transition:{staggerChildren:.06,delayChildren:.04}}},
  card:{hidden:{opacity:0,y:18},visible:{opacity:1,y:0,transition:{duration:.38,ease:[.16,1,.3,1]}}},
};

function Loader({onDone}){
  const[pct,setPct]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setPct(p=>{if(p>=100){clearInterval(t);setTimeout(onDone,280);return 100;}return Math.min(100,p+Math.random()*3+1.5);}),32);return()=>clearInterval(t);},[onDone]);
  const cl=Math.min(100,Math.round(pct));
  return(
    <motion.div exit={{opacity:0}} transition={{duration:.45}}
      style={{position:"fixed",inset:0,background:"#0A0A0A",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:28}}>
      <motion.div initial={{scale:.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:220,damping:22}}>
        <div style={{width:68,height:68,borderRadius:"50%",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <motion.div animate={{rotate:360}} transition={{duration:1.6,repeat:Infinity,ease:"linear"}}
            style={{position:"absolute",inset:0,borderRadius:"50%",border:"1.5px solid transparent",borderTopColor:"#fff",borderRightColor:"rgba(255,255,255,.3)"}}/>
          <span className="UB" style={{color:"#fff",fontWeight:900,fontSize:22}}>A</span>
        </div>
      </motion.div>
      <div style={{textAlign:"center"}}>
        <div className="UB" style={{color:"#fff",fontSize:15,fontWeight:800,marginBottom:5}}>Aka-Uka</div>
        <div style={{color:"#444",fontSize:11,letterSpacing:3,textTransform:"uppercase"}}>yuklanmoqda</div>
      </div>
      <div style={{width:180,height:1,background:"#1a1a1a",overflow:"hidden"}}>
        <motion.div initial={{width:0}} animate={{width:`${cl}%`}} transition={{ease:"easeOut"}} style={{height:"100%",background:"#fff"}}/>
      </div>
      <div className="UB" style={{color:"#333",fontSize:11}}>{cl}%</div>
    </motion.div>
  );
}

function Toast({msg,dark}){
  return(
    <motion.div initial={{opacity:0,y:-28,x:"-50%"}} animate={{opacity:1,y:0,x:"-50%"}} exit={{opacity:0,y:-28,x:"-50%"}}
      style={{position:"fixed",top:68,left:"50%",zIndex:7000,padding:"9px 18px",borderRadius:7,fontSize:12,fontWeight:600,whiteSpace:"nowrap",
        background:dark?"#1c1c1c":"#111",color:"#fff",border:`1px solid ${dark?"#333":"transparent"}`,boxShadow:"0 6px 24px rgba(0,0,0,.28)"}}>
      {msg}
    </motion.div>
  );
}

function FSect({title,C,children}){
  return(
    <div style={{marginBottom:20}}>
      <p className="UB" style={{fontWeight:700,marginBottom:11,fontSize:11,color:C.txt,letterSpacing:.3}}>{title}</p>
      {children}
    </div>
  );
}

function Stars({r,C}){
  return <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><span key={s} style={{fontSize:11,color:s<=Math.round(r)?"#F59E0B":C.bord}}>★</span>)}</div>;
}

function PCard({p,lang,t,C,dark,onOpen,notify}){
  const[hov,setHov]=useState(false);
  const[imgOk,setImgOk]=useState(false);
  const brand=BL.find(b=>b.id===p.brand);
  const subLabel=()=>{
    if(p.cat==="conditioner") return p.sub==="floor"?t.floor:t.wall;
    if(p.cat==="fridge"){
      if(p.sub==="top") return t.subTop2;
      if(p.sub==="bot") return t.subBot;
      if(p.sub==="side") return t.subSide;
      if(p.sub==="builtin") return t.subBuiltFr;
      return p.sub;
    }
    if(p.cat==="washer") return p.sub==="front"?t.subFront:t.subTop;
    if(p.cat==="builtin"){
      if(p.sub==="range") return t.subRange;
      if(p.sub==="hob") return t.subHob;
      if(p.sub==="hood") return t.subHood;
    }
    return p.sub;
  };
  return(
    <motion.div variants={V.card} whileHover={{y:-5}}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      style={{background:C.card,borderRadius:12,overflow:"hidden",cursor:"pointer",
        border:`1px solid ${hov?C.txt:C.bord}`,
        boxShadow:hov?`0 10px 34px rgba(0,0,0,${dark?.28:.09})`:"none",
        transition:"border-color .22s,box-shadow .22s"}}
      onClick={()=>onOpen(p)}>
      <div style={{position:"relative",aspectRatio:"4/3",overflow:"hidden",background:dark?"#0f0f0f":"#F2F2F2"}}>
        {!imgOk&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,opacity:.14}}>
          {p.cat==="conditioner"?"❄️":p.cat==="fridge"?"🧊":p.cat==="washer"?"🔄":"🔧"}
        </div>}
        <motion.img src={p.img} alt={p.nm[lang]} onLoad={()=>setImgOk(true)}
          initial={{opacity:0}} animate={{opacity:imgOk?1:0}} transition={{duration:.35}}
          style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .45s ease"}}
          onMouseOver={e=>e.target.style.transform="scale(1.05)"}
          onMouseOut={e=>e.target.style.transform="scale(1)"}/>
        <div style={{position:"absolute",top:9,left:9,display:"flex",flexDirection:"column",gap:4}}>
          {p.nw&&<span style={{background:C.txt,color:C.inv,borderRadius:4,padding:"2px 8px",fontSize:8,fontWeight:800,letterSpacing:.6}}>NEW</span>}
          {p.tr&&<span style={{background:C.txt,color:C.inv,borderRadius:4,padding:"2px 8px",fontSize:8,fontWeight:800,letterSpacing:.6}}>TREND</span>}
        </div>
        <div style={{position:"absolute",bottom:7,right:7,background:"rgba(0,0,0,.58)",backdropFilter:"blur(4px)",color:"#fff",borderRadius:4,padding:"2px 7px",fontSize:7.5,fontWeight:600}}>
          {subLabel()}
        </div>
        {!p.s&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontWeight:700,fontSize:11,background:"rgba(0,0,0,.6)",padding:"6px 14px",borderRadius:6}}>{t.outStock}</span></div>}
      </div>
      <div style={{padding:"12px 13px 13px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontSize:8.5,fontWeight:800,color:C.sub,letterSpacing:1,textTransform:"uppercase"}}>{brand?.name||p.brand}</span>
          <div style={{display:"flex",alignItems:"center",gap:3}}><Stars r={p.r} C={C}/><span style={{fontSize:8.5,color:C.sub,marginLeft:1}}>({p.rv})</span></div>
        </div>
        <h3 className="UB" style={{fontWeight:700,fontSize:11,lineHeight:1.42,marginBottom:9,color:C.txt}}>{p.nm[lang]}</h3>
        <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:11}}>
          {p.sp[lang].slice(0,3).map((s,i)=>(
            <span key={i} style={{fontSize:8,background:dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.05)",borderRadius:4,padding:"2px 6px",color:C.sub,fontWeight:500}}>{s}</span>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:8}}>
          <div>
            <div className="UB" style={{fontSize:19,fontWeight:900,color:C.txt,lineHeight:1}}>${p.usd.toLocaleString()}</div>
            <div style={{fontSize:8.5,color:C.sub,marginTop:2}}>{t.currency}</div>
          </div>
          <motion.button whileTap={{scale:.9}}
            onClick={e=>{e.stopPropagation();notify(`📞 ${p.nm[lang].slice(0,28)}...`);}}
            style={{padding:"7px 12px",borderRadius:7,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",fontSize:10,fontWeight:600,fontFamily:"Onest",color:C.txt,transition:"all .2s",flexShrink:0}}
            onMouseOver={e=>{e.currentTarget.style.background=C.txt;e.currentTarget.style.color=C.inv;e.currentTarget.style.borderColor=C.txt;}}
            onMouseOut={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.txt;e.currentTarget.style.borderColor=C.bord;}}>
            📞
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function PModal({p,lang,t,C,dark,onClose,notify}){
  const[tab,setTab]=useState("specs");
  const[imgOk,setImgOk]=useState(false);
  const brand=BL.find(b=>b.id===p.brand);
  useEffect(()=>{
    document.body.style.overflow="hidden";
    const fn=e=>e.key==="Escape"&&onClose();
    window.addEventListener("keydown",fn);
    return()=>{document.body.style.overflow="";window.removeEventListener("keydown",fn);};
  },[onClose]);
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,.72)",zIndex:800,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)"}}>
      <motion.div initial={{opacity:0,scale:.92,y:24}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.92,y:24}}
        transition={{type:"spring",stiffness:290,damping:28}}
        onClick={e=>e.stopPropagation()}
        style={{background:C.card,borderRadius:18,width:"100%",maxWidth:700,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 32px 90px rgba(0,0,0,.45)",border:`1px solid ${C.bord}`}}>
        <div style={{position:"sticky",top:0,zIndex:10,background:C.card,borderBottom:`1px solid ${C.bord}`,borderRadius:"18px 18px 0 0",padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span className="UB" style={{fontSize:9,fontWeight:800,color:C.sub,textTransform:"uppercase",letterSpacing:1}}>{brand?.name||p.brand}</span>
            {p.nw&&<span style={{background:C.txt,color:C.inv,borderRadius:4,padding:"1px 7px",fontSize:8.5,fontWeight:800}}>NEW</span>}
            {p.tr&&<span style={{background:C.bord,color:C.sub,borderRadius:4,padding:"1px 7px",fontSize:8.5,fontWeight:700}}>TREND</span>}
          </div>
          <div style={{display:"flex",gap:7}}>
            <motion.button whileTap={{scale:.88}} onClick={()=>{navigator.clipboard?.writeText(`${p.nm[lang]} — $${p.usd}`).catch(()=>{});notify(t.copy);}}
              style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",color:C.sub,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>📤</motion.button>
            <motion.button whileTap={{scale:.88}} onClick={onClose}
              style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",color:C.txt,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</motion.button>
          </div>
        </div>
        <div style={{padding:"20px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:20}}>
            <div style={{borderRadius:12,overflow:"hidden",aspectRatio:"1",background:dark?"#0c0c0c":"#F0F0F0",position:"relative"}}>
              {!imgOk&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,opacity:.14}}>
                {p.cat==="conditioner"?"❄️":p.cat==="fridge"?"🧊":p.cat==="washer"?"🔄":"🔧"}
              </div>}
              <motion.img src={p.img} alt={p.nm[lang]} onLoad={()=>setImgOk(true)}
                initial={{opacity:0}} animate={{opacity:imgOk?1:0}} transition={{duration:.35}}
                style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              <div>
                <h2 className="UB" style={{fontSize:14,fontWeight:800,lineHeight:1.35,color:C.txt,marginBottom:7}}>{p.nm[lang]}</h2>
                <div style={{display:"flex",alignItems:"center",gap:6}}><Stars r={p.r} C={C}/><span style={{fontSize:11,color:C.sub}}>{p.r} · {p.rv} {t.reviews}</span></div>
              </div>
              <div style={{padding:"12px",borderRadius:10,background:dark?"#0d0d0d":"#F6F6F6",border:`1px solid ${C.bord}`}}>
                <div className="UB" style={{fontSize:26,fontWeight:900,lineHeight:1,color:C.txt,marginBottom:5}}>${p.usd.toLocaleString()}</div>
                <div style={{fontSize:9.5,color:C.sub}}>{t.payNote}</div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {[{ic:"🛡️",tx:`24 ${t.months} ${t.guarantee}`},{ic:"🚚",tx:t.delivery},{ic:"💳",tx:t.install},{ic:p.s?"✅":"❌",tx:p.s?t.inStock:t.outStock}].map((b,i)=>(
                  <div key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 8px",borderRadius:6,background:dark?"#111":"#F4F4F4",border:`1px solid ${C.bord}`,fontSize:10,color:C.sub}}>
                    {b.ic} {b.tx}
                  </div>
                ))}
              </div>
              <motion.a href="tel:+998901234567" whileHover={{scale:1.02}} whileTap={{scale:.97}}
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"11px",borderRadius:10,background:C.txt,color:C.inv,fontWeight:700,fontSize:13,cursor:"pointer",textDecoration:"none",fontFamily:"Unbounded",marginTop:"auto"}}>
                📞 {t.contact}
              </motion.a>
            </div>
          </div>
          <div style={{display:"flex",gap:4,borderBottom:`1px solid ${C.bord}`,marginBottom:14}}>
            {[["specs",`⚡ ${t.specs}`],["desc",`📝 ${t.desc}`]].map(([id,lbl])=>(
              <button key={id} onClick={()=>setTab(id)}
                style={{padding:"8px 14px",borderRadius:"8px 8px 0 0",border:"none",background:"transparent",color:tab===id?C.txt:C.sub,fontWeight:tab===id?700:400,fontSize:12,cursor:"pointer",fontFamily:"Onest",borderBottom:`2px solid ${tab===id?C.txt:"transparent"}`,transition:"all .2s"}}>
                {lbl}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {tab==="specs"?(
              <motion.div key="sp" initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} exit={{opacity:0}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                  {p.sp[lang].map((s,i)=>(
                    <motion.div key={i} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*.04}}
                      style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:8,border:`1px solid ${C.bord}`,background:dark?"#0d0d0d":"#F9F9F9"}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:C.txt,flexShrink:0,opacity:.7}}/>
                      <span style={{fontSize:11,color:C.sub,fontWeight:500}}>{s}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ):(
              <motion.div key="ds" initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} exit={{opacity:0}}
                style={{background:dark?"#0d0d0d":"#F9F9F9",borderRadius:10,padding:14,border:`1px solid ${C.bord}`}}>
                <p style={{color:C.sub,lineHeight:1.85,fontSize:13}}>{p.dsc[lang]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App(){
  const[loading,setLoading]=useState(true);
  const[lang,setLang]=useState("uz");
  const[dark,setDark]=useState(false);
  const[cat,setCat]=useState("conditioner");
  const[sub,setSub]=useState("all");
  const[query,setQuery]=useState("");
  const[sort,setSort]=useState("default");
  const[modal,setModal]=useState(null);
  const[filterOpen,setFilterOpen]=useState(false);
  const[contact,setContact]=useState(false);
  const[toast,setToast]=useState(null);
  const[scrolled,setScrolled]=useState(false);
  const[filters,setFilters]=useState({brands:[],minUsd:0,maxUsd:4000,rating:0,stock:false});
  const[tmpF,setTmpF]=useState({brands:[],minUsd:0,maxUsd:4000,rating:0,stock:false});
  const tickRef=useRef(null);
  const t=TR[lang];

  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>54);window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);
  useEffect(()=>{const el=tickRef.current;if(!el)return;let pos=0;const id=setInterval(()=>{pos+=.38;if(pos>=el.scrollWidth/2)pos=0;el.scrollLeft=pos;},16);return()=>clearInterval(id);},[]);
  const notify=useCallback((msg)=>{setToast(msg);setTimeout(()=>setToast(null),2500);},[]);

  const C=useMemo(()=>({
    bg:dark?"#0A0A0A":"#FAFAFA",surf:dark?"#141414":"#FFFFFF",
    card:dark?"#181818":"#FFFFFF",bord:dark?"#272727":"#E8E8E8",
    txt:dark?"#F4F4F4":"#0D0D0D",sub:dark?"#6B6B6B":"#888888",
    acc:dark?"#FFFFFF":"#0D0D0D",inv:dark?"#0D0D0D":"#FFFFFF",
  }),[dark]);

  const subOpts=useMemo(()=>{
    if(cat==="conditioner") return [{v:"all",l:t.allCat},{v:"wall",l:t.wall},{v:"floor",l:t.floor}];
    if(cat==="fridge") return [{v:"all",l:t.allCat},{v:"top",l:t.subTop2},{v:"bot",l:t.subBot},{v:"side",l:t.subSide},{v:"builtin",l:t.subBuiltFr}];
    if(cat==="washer") return [{v:"all",l:t.allCat},{v:"front",l:t.subFront},{v:"top",l:t.subTop}];
    if(cat==="builtin") return [{v:"all",l:t.allCat},{v:"range",l:t.subRange},{v:"hob",l:t.subHob},{v:"hood",l:t.subHood}];
    return [];
  },[cat,t]);

  const shown=useMemo(()=>{
    let list=PRODS.filter(p=>p.cat===cat);
    if(sub!=="all") list=list.filter(p=>p.sub===sub);
    if(filters.brands.length) list=list.filter(p=>filters.brands.includes(p.brand));
    if(filters.stock) list=list.filter(p=>p.s);
    list=list.filter(p=>p.usd>=filters.minUsd&&p.usd<=filters.maxUsd);
    if(filters.rating>0) list=list.filter(p=>p.r>=filters.rating);
    if(query.trim()){const q=query.toLowerCase();list=list.filter(p=>p.nm[lang].toLowerCase().includes(q)||p.brand.toLowerCase().includes(q));}
    if(sort==="price-asc") list=[...list].sort((a,b)=>a.usd-b.usd);
    if(sort==="price-desc") list=[...list].sort((a,b)=>b.usd-a.usd);
    if(sort==="rating") list=[...list].sort((a,b)=>b.r-a.r);
    return list;
  },[cat,sub,filters,query,sort,lang]);

  const filterCount=filters.brands.length+(filters.rating>0?1:0)+(filters.stock?1:0)+(filters.minUsd>0||filters.maxUsd<4000?1:0);
  const applyFilter=()=>{setFilters({...tmpF});setFilterOpen(false);notify(t.filterApplied);};
  const clearFilter=()=>{const d={brands:[],minUsd:0,maxUsd:4000,rating:0,stock:false};setTmpF(d);setFilters(d);notify(t.filterCleared);};

  if(loading) return(<><style>{GS}</style><AnimatePresence><Loader onDone={()=>setLoading(false)}/></AnimatePresence></>);

  return(
    <>
      <style>{GS}</style>
      <AnimatePresence>{toast&&<Toast msg={toast} dark={dark}/>}</AnimatePresence>
      <div style={{background:C.bg,color:C.txt,minHeight:"100vh",transition:"background .3s,color .3s"}}>

        {/* NAV */}
        <motion.nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,height:58,
          background:scrolled?C.bg+"f2":"transparent",backdropFilter:scrolled?"blur(22px)":"none",
          borderBottom:`1px solid ${scrolled?C.bord:"transparent"}`,transition:"all .32s"}}>
          <div style={{maxWidth:1320,margin:"0 auto",padding:"0 20px",height:"100%",display:"flex",alignItems:"center",gap:14}}>
            <motion.div whileHover={{scale:1.04}} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
              <div style={{width:32,height:32,borderRadius:9,background:C.txt,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span className="UB" style={{color:C.inv,fontWeight:900,fontSize:14}}>A</span>
              </div>
              <div>
                <div className="UB" style={{fontSize:11,fontWeight:800,lineHeight:1}}>AKA-UKA</div>
                <div style={{fontSize:8,color:C.sub,letterSpacing:.4}}>{t.tag}</div>
              </div>
            </motion.div>
            <div className="ns" style={{flex:1,maxWidth:380,position:"relative"}}>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}
                style={{width:"100%",padding:"7px 32px 7px 32px",borderRadius:7,border:`1px solid ${C.bord}`,background:C.surf,color:C.txt,fontSize:12,outline:"none",fontFamily:"Onest",transition:"border .18s"}}
                onFocus={e=>e.target.style.borderColor=C.txt} onBlur={e=>e.target.style.borderColor=C.bord}/>
              <svg style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",opacity:.3,pointerEvents:"none"}} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              {query&&<button onClick={()=>setQuery("")} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:C.sub,fontSize:16,lineHeight:1}}>×</button>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:7,marginLeft:"auto",flexShrink:0}}>
              <select className="nt" value={sort} onChange={e=>setSort(e.target.value)}
                style={{padding:"6px 9px",borderRadius:7,border:`1px solid ${C.bord}`,background:C.surf,color:C.txt,fontSize:11,fontFamily:"Onest",cursor:"pointer",outline:"none"}}>
                <option value="default">{t.sortDef}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
                <option value="rating">{t.sortRating}</option>
              </select>
              <div style={{display:"flex",gap:2,background:C.bord,borderRadius:7,padding:2}}>
                {["uz","ru","en"].map(l=>(
                  <motion.button key={l} whileTap={{scale:.88}} onClick={()=>setLang(l)}
                    style={{padding:"4px 8px",borderRadius:5,border:"none",background:l===lang?C.txt:"transparent",color:l===lang?C.inv:C.sub,fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"Onest",transition:"all .18s"}}>
                    {l.toUpperCase()}
                  </motion.button>
                ))}
              </div>
              <motion.button whileTap={{scale:.88}} onClick={()=>setDark(!dark)}
                style={{width:32,height:32,borderRadius:7,border:`1px solid ${C.bord}`,background:C.surf,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {dark?"☀️":"🌙"}
              </motion.button>
              <motion.button whileTap={{scale:.93}} onClick={()=>{setTmpF({...filters});setFilterOpen(true);}}
                style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:7,border:`1px solid ${C.txt}`,background:C.txt,color:C.inv,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"Onest",position:"relative"}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                {t.filter}
                {filterCount>0&&<span style={{position:"absolute",top:-5,right:-5,width:14,height:14,borderRadius:"50%",background:"#DC2626",color:"#fff",fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{filterCount}</span>}
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* HERO */}
        <section style={{paddingTop:58,minHeight:340,display:"flex",alignItems:"center",borderBottom:`1px solid ${C.bord}`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.bord} 1px,transparent 1px),linear-gradient(90deg,${C.bord} 1px,transparent 1px)`,backgroundSize:"44px 44px",opacity:.5,pointerEvents:"none"}}/>
          <div style={{maxWidth:1320,margin:"0 auto",padding:"52px 20px",position:"relative",zIndex:1,width:"100%"}}>
            <div style={{maxWidth:660}}>
              <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.08}}
                style={{display:"inline-flex",alignItems:"center",gap:7,border:`1px solid ${C.bord}`,borderRadius:5,padding:"4px 11px",marginBottom:18}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#22C55E"}}/>
                <span style={{fontSize:10,color:C.sub,fontWeight:600,letterSpacing:.4,textTransform:"uppercase"}}>{t.tag}</span>
              </motion.div>
              <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.15}}
                className="UB hh" style={{fontSize:"clamp(1.9rem,4.2vw,3rem)",fontWeight:900,lineHeight:1.05,letterSpacing:-1.5,marginBottom:13,color:C.txt}}>
                {t.brand}
              </motion.h1>
              <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.24}}
                style={{fontSize:13,color:C.sub,lineHeight:1.8,maxWidth:440,marginBottom:26}}>
                {t.payNote} · Hofmann · LG · Beston · Aufit · T-Tech · Ferre · Hisense · Immer · Bench
              </motion.p>
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.32}}
                style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                {[["113",t.prods],["13","Brend"],["4",t.allBrands.split(" ")[0]]].map(([n,l])=>(
                  <div key={l}><div className="UB" style={{fontSize:20,fontWeight:900,color:C.txt}}>{n}</div><div style={{fontSize:10,color:C.sub,marginTop:1}}>{l}</div></div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* BRAND TICKER */}
        <div style={{borderBottom:`1px solid ${C.bord}`,padding:"10px 0",overflow:"hidden",background:C.surf}} ref={tickRef}>
          <div className="ta">
            {[...BL,...BL,...BL].map((b,i)=>(
              <div key={i} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:88,height:32,borderRadius:6,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",flexShrink:0,padding:"0 12px",transition:"all .2s"}}
                onMouseOver={e=>{e.currentTarget.style.background=C.txt;e.currentTarget.style.borderColor=C.txt;e.currentTarget.querySelector("span").style.color=C.inv;}}
                onMouseOut={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=C.bord;e.currentTarget.querySelector("span").style.color=C.sub;}}>
                <span className="UB" style={{fontWeight:800,fontSize:10,color:C.sub,transition:"color .2s"}}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div style={{maxWidth:1320,margin:"0 auto",padding:"22px 20px 0"}}>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
            {CATS.map(c=>{
              const active=cat===c.id;
              const cnt=PRODS.filter(p=>p.cat===c.id).length;
              return(
                <motion.button key={c.id} whileTap={{scale:.95}}
                  onClick={()=>{setCat(c.id);setSub("all");}}
                  style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:7,
                    border:`1px solid ${active?C.txt:C.bord}`,background:active?C.txt:"transparent",
                    color:active?C.inv:C.sub,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:"Onest",transition:"all .2s"}}>
                  <span style={{fontSize:13}}>{c.icon}</span>{t[c.key]}
                  <span style={{background:active?"rgba(255,255,255,.2)":C.bord,color:active?C.inv:C.sub,borderRadius:99,padding:"0 5px",fontSize:9,fontWeight:700,transition:"all .2s"}}>{cnt}</span>
                </motion.button>
              );
            })}
            {subOpts.length>0&&(
              <div style={{marginLeft:"auto",display:"flex",gap:5,flexWrap:"wrap"}}>
                {subOpts.map(s=>(
                  <motion.button key={s.v} whileTap={{scale:.93}} onClick={()=>setSub(s.v)}
                    style={{padding:"6px 10px",borderRadius:6,border:`1px solid ${sub===s.v?C.txt:C.bord}`,background:sub===s.v?C.txt:"transparent",color:sub===s.v?C.inv:C.sub,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"Onest",transition:"all .2s"}}>
                    {s.l}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div style={{maxWidth:1320,margin:"0 auto",padding:"10px 20px 0"}}>
          <style>{`@media(max-width:768px){.mc{display:flex!important}}.mc{display:none;gap:8px;align-items:center}`}</style>
          <div className="mc">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search}
              style={{flex:1,padding:"7px 11px",borderRadius:7,border:`1px solid ${C.bord}`,background:C.surf,color:C.txt,fontSize:12,outline:"none",fontFamily:"Onest"}}/>
            <select value={sort} onChange={e=>setSort(e.target.value)}
              style={{padding:"6px 9px",borderRadius:7,border:`1px solid ${C.bord}`,background:C.surf,color:C.txt,fontSize:11,fontFamily:"Onest",cursor:"pointer",outline:"none",flexShrink:0}}>
              <option value="default">{t.sortDef}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
              <option value="rating">{t.sortRating}</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS */}
        <section style={{maxWidth:1320,margin:"0 auto",padding:"22px 20px 80px"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:18}}>
            <h2 className="UB" style={{fontSize:15,fontWeight:800}}>{t[cat]||cat}</h2>
            <motion.span key={shown.length} initial={{scale:1.4}} animate={{scale:1}}
              style={{background:C.bord,color:C.sub,borderRadius:5,padding:"2px 9px",fontSize:10,fontWeight:600}}>
              {shown.length} {t.prods}
            </motion.span>
            <div style={{flex:1,height:1,background:C.bord}}/>
          </div>
          {shown.length===0?(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:"center",padding:"60px 20px"}}>
              <div style={{fontSize:42,marginBottom:11}}>🔍</div>
              <p className="UB" style={{fontSize:15,fontWeight:700}}>{t.noRes}</p>
            </motion.div>
          ):(
            <AnimatePresence mode="wait">
              <motion.div key={`${cat}-${sub}-${query}-${sort}`} initial="hidden" animate="visible" variants={V.stagger} exit={{opacity:0}}
                className="pg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:13}}>
                {shown.map(p=><PCard key={p.id} p={p} lang={lang} t={t} C={C} dark={dark} onOpen={setModal} notify={notify}/>)}
              </motion.div>
            </AnimatePresence>
          )}
        </section>

        {/* FOOTER */}
        <footer style={{borderTop:`1px solid ${C.bord}`,background:C.surf}}>
          <div style={{maxWidth:1320,margin:"0 auto",padding:"44px 20px 24px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:36}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
                <div style={{width:36,height:36,borderRadius:9,background:C.txt,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span className="UB" style={{color:C.inv,fontWeight:900,fontSize:15}}>A</span>
                </div>
                <div><div className="UB" style={{fontSize:12,fontWeight:800}}>{t.brand}</div><div style={{fontSize:9,color:C.sub}}>{t.tag}</div></div>
              </div>
              <p style={{color:C.sub,fontSize:12,lineHeight:1.8,marginBottom:14}}>{t.payNote}.</p>
              <div style={{color:C.sub,fontSize:11,lineHeight:2.2}}>
                <div>📅 {t.founded}</div><div>📍 {t.address}</div><div>🕐 {t.hours}: {t.workHours}</div>
              </div>
            </div>
            <div>
              <h4 className="UB" style={{fontSize:11,fontWeight:800,marginBottom:14,textTransform:"uppercase",letterSpacing:.5}}>{t.contact}</h4>
              {[{ic:"📞",lb:t.phone,tx:"+998 90 123 45 67"},{ic:"✈️",lb:"Telegram",tx:"@akaukauz"},{ic:"📧",lb:"Email",tx:"info@akaukauz.uz"}].map(({ic,lb,tx})=>(
                <div key={tx} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:`1px solid ${C.bord}`}}>
                  <span style={{fontSize:14,flexShrink:0}}>{ic}</span>
                  <div><div style={{fontSize:9,color:C.sub}}>{lb}</div><div style={{fontSize:11,fontWeight:600}}>{tx}</div></div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="UB" style={{fontSize:11,fontWeight:800,marginBottom:14,textTransform:"uppercase",letterSpacing:.5}}>{t.allBrands}</h4>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                {BL.map(b=>(
                  <div key={b.id}
                    style={{padding:"6px 10px",borderRadius:6,border:`1px solid ${C.bord}`,fontSize:10,fontWeight:700,fontFamily:"Unbounded",cursor:"pointer",transition:"all .18s",color:C.sub}}
                    onMouseOver={e=>{e.currentTarget.style.borderColor=C.txt;e.currentTarget.style.color=C.txt;}}
                    onMouseOut={e=>{e.currentTarget.style.borderColor=C.bord;e.currentTarget.style.color=C.sub;}}>
                    {b.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{borderTop:`1px solid ${C.bord}`,padding:"14px 20px",textAlign:"center",color:C.sub,fontSize:11}}>
            © 2025 <span className="UB" style={{fontWeight:800,color:C.txt}}>Aka-Uka Maishiy Texnika</span>. Barcha huquqlar himoyalangan.
          </div>
        </footer>

        {/* FLOATING CONTACT */}
        <div style={{position:"fixed",bottom:22,right:22,zIndex:600,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:10}}>
          <AnimatePresence>
            {contact&&(
              <motion.div initial={{opacity:0,scale:.9,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.9,y:10}}
                style={{background:C.card,border:`1px solid ${C.bord}`,borderRadius:14,padding:18,minWidth:230,boxShadow:`0 18px 50px rgba(0,0,0,${dark?.38:.14})`,transformOrigin:"bottom right"}}>
                <p className="UB" style={{fontWeight:800,fontSize:12,marginBottom:12}}>{t.contact}</p>
                <a href="tel:+998901234567"
                  style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:8,border:`1px solid ${C.bord}`,textDecoration:"none",color:C.txt,marginBottom:7,transition:"all .2s",fontSize:12}}
                  onMouseOver={e=>{e.currentTarget.style.background=C.txt;e.currentTarget.style.color=C.inv;}}
                  onMouseOut={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.txt;}}>
                  <span>📞</span><div><div style={{fontSize:9,color:"inherit",opacity:.6}}>{t.phone}</div><div style={{fontWeight:700}}>+998 90 123 45 67</div></div>
                </a>
                <div style={{padding:"8px 12px",borderRadius:8,background:dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",fontSize:11,color:C.sub}}>
                  🕐 {t.workHours}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button whileHover={{scale:1.09}} whileTap={{scale:.9}} onClick={()=>setContact(c=>!c)}
            className={contact?"":"pb pw"}
            style={{width:50,height:50,borderRadius:"50%",border:`1.5px solid ${C.bord}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,background:C.txt,color:C.inv,boxShadow:`0 6px 22px rgba(0,0,0,${dark?.35:.18})`,transition:"background .25s"}}>
            <motion.span animate={{rotate:contact?45:0}} transition={{type:"spring",stiffness:300}}>{contact?"✕":"💬"}</motion.span>
          </motion.button>
        </div>

        {/* FILTER MODAL */}
        <AnimatePresence>
          {filterOpen&&(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setFilterOpen(false)}
              style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:700,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(6px)"}}>
              <motion.div initial={{y:70,opacity:0}} animate={{y:0,opacity:1}} exit={{y:70,opacity:0}}
                onClick={e=>e.stopPropagation()}
                style={{background:C.card,borderRadius:"18px 18px 0 0",width:"100%",maxWidth:500,maxHeight:"84vh",overflow:"hidden",boxShadow:"0 -18px 55px rgba(0,0,0,.35)",display:"flex",flexDirection:"column",border:`1px solid ${C.bord}`}}>
                <div style={{padding:"16px 22px 12px",borderBottom:`1px solid ${C.bord}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                  <h2 className="UB" style={{fontSize:15,fontWeight:800,display:"flex",alignItems:"center",gap:8}}>
                    {t.filter}
                    {filterCount>0&&<span style={{background:"#DC2626",color:"#fff",borderRadius:99,padding:"1px 7px",fontSize:9,fontWeight:800}}>{filterCount}</span>}
                  </h2>
                  <motion.button whileTap={{scale:.88}} onClick={()=>setFilterOpen(false)}
                    style={{width:30,height:30,borderRadius:7,border:`1px solid ${C.bord}`,background:"transparent",cursor:"pointer",color:C.txt,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</motion.button>
                </div>
                <div style={{padding:"16px 22px",overflowY:"auto",flex:1}}>
                  <FSect title={`🏷️ ${t.brands}`} C={C}>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {BL.map(b=>{const sel=tmpF.brands.includes(b.id);return(
                        <motion.button key={b.id} whileTap={{scale:.9}}
                          onClick={()=>setTmpF(f=>({...f,brands:sel?f.brands.filter(x=>x!==b.id):[...f.brands,b.id]}))}
                          style={{padding:"5px 11px",borderRadius:6,border:`1px solid ${sel?C.txt:C.bord}`,background:sel?C.txt:"transparent",color:sel?C.inv:C.sub,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:"Onest",transition:"all .18s"}}>
                          {b.name}
                        </motion.button>
                      );})}
                    </div>
                  </FSect>
                  <FSect title={`💰 ${t.usdPrice}`} C={C}>
                    <div style={{display:"flex",gap:9,marginBottom:10}}>
                      {[["minUsd","Min $"],["maxUsd","Max $"]].map(([k,lbl])=>(
                        <div key={k} style={{flex:1}}>
                          <label style={{fontSize:9,color:C.sub,fontWeight:600,display:"block",marginBottom:4}}>{lbl}</label>
                          <input type="number" value={tmpF[k]} onChange={e=>setTmpF(f=>({...f,[k]:+e.target.value}))}
                            style={{width:"100%",padding:"7px 9px",borderRadius:6,border:`1px solid ${C.bord}`,background:dark?"#0d0d0d":"#F5F5F5",color:C.txt,fontSize:12,fontFamily:"Onest",outline:"none"}}/>
                        </div>
                      ))}
                    </div>
                    <input type="range" min={0} max={4000} step={50} value={tmpF.maxUsd}
                      onChange={e=>setTmpF(f=>({...f,maxUsd:+e.target.value}))}
                      className={dark?"dr":""}
                      style={{background:`linear-gradient(90deg,${C.txt} ${(tmpF.maxUsd/4000)*100}%,${C.bord} 0)`}}/>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.sub,marginTop:4}}>
                      <span>$0</span><span style={{fontWeight:700,color:C.txt}}>${tmpF.maxUsd.toLocaleString()}</span>
                    </div>
                  </FSect>
                  <FSect title={`⭐ ${t.rating}`} C={C}>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {[0,4,4.5,4.8].map(r=>{const sel=tmpF.rating===r;return(
                        <motion.button key={r} whileTap={{scale:.9}}
                          onClick={()=>setTmpF(f=>({...f,rating:r}))}
                          style={{padding:"5px 11px",borderRadius:6,border:`1px solid ${sel?C.txt:C.bord}`,background:sel?C.txt:"transparent",color:sel?C.inv:C.sub,fontWeight:600,fontSize:11,cursor:"pointer",fontFamily:"Onest",transition:"all .18s"}}>
                          {r===0?t.allCat:`${r}+★`}
                        </motion.button>
                      );})}
                    </div>
                  </FSect>
                  <div style={{display:"flex",alignItems:"center",gap:11}}>
                    <motion.div whileTap={{scale:.9}} onClick={()=>setTmpF(f=>({...f,stock:!f.stock}))}
                      style={{width:42,height:22,borderRadius:99,cursor:"pointer",background:tmpF.stock?C.txt:C.bord,position:"relative",transition:"background .25s",flexShrink:0}}>
                      <motion.div layout style={{position:"absolute",top:3,left:tmpF.stock?21:3,width:16,height:16,borderRadius:"50%",background:tmpF.stock?C.inv:"#aaa"}}/>
                    </motion.div>
                    <span style={{fontWeight:600,fontSize:12}}>{t.inStock}</span>
                  </div>
                </div>
                <div style={{padding:"12px 22px",borderTop:`1px solid ${C.bord}`,display:"flex",gap:9,flexShrink:0}}>
                  <motion.button whileTap={{scale:.94}} onClick={clearFilter}
                    style={{flex:1,padding:10,borderRadius:8,border:`1px solid ${C.bord}`,background:"transparent",color:C.sub,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"Onest"}}>
                    {t.reset}
                  </motion.button>
                  <motion.button whileTap={{scale:.94}} onClick={applyFilter}
                    style={{flex:2,padding:10,borderRadius:8,border:"none",background:C.txt,color:C.inv,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"Onest"}}>
                    ✓ {t.apply}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {modal&&<PModal p={modal} lang={lang} t={t} C={C} dark={dark} onClose={()=>setModal(null)} notify={notify}/>}
        </AnimatePresence>
      </div>
    </>
  );
}