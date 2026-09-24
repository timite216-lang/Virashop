const products=[
{id:1,n:"Mixa Lait Corps Hydratant Peaux Sensibles 400ml",b:"MIXA",c:"Corps",p:7500},
{id:2,n:"NIVEA Body Milk Hydratation 48h 400ml",b:"NIVEA",c:"Corps",p:7650,o:8500,promo:1},
{id:3,n:"Vaseline Healthy Bright Lotion 400ml",b:"VASELINE",c:"Corps",p:6500},
{id:4,n:"CeraVe Crème Hydratante Visage & Corps 340g",b:"CeraVe",c:"Visage",p:8900},
{id:5,n:"Mixa Crème Hydratante Anti-Dessèchement 400ml",b:"MIXA",c:"Corps",p:6900},
{id:6,n:"NIVEA Crème Soft Hydratante 200ml",b:"NIVEA",c:"Visage",p:5500},
{id:7,n:"Garnier Gel Nettoyant Visage 200ml",b:"GARNIER",c:"Visage",p:6200},
{id:8,n:"Dove Lait Corps Hydratation 400ml",b:"DOVE",c:"Corps",p:6800},
{id:9,n:"Eucerin Lait Hydratant Corps 400ml",b:"EUCERIN",c:"Corps",p:9800},
{id:10,n:"CeraVe Nettoyant Hydratant 236ml",b:"CeraVe",c:"Visage",p:8500,promo:1}
];
let cart=JSON.parse(localStorage.getItem("virashop")||"[]"), current="Tous", query="";
const money=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
function render(){
 const list=products.filter(x=>(current==="Tous"||(current==="Promo"?x.promo:x.c===current))&&(x.n+" "+x.b).toLowerCase().includes(query.toLowerCase()));
 document.querySelector("#grid").innerHTML=list.map(x=>`<article class="card"><div class="prodpic">${x.promo?'<span class="badge">Promo</span>':""}<div class="fake">${x.b}<small></small></div></div><div class="info"><h3>${x.n}</h3><div class="price">${money(x.p)} ${x.o?`<span class="old">${money(x.o)}</span>`:""}</div><button class="add" onclick="add(${x.id})">🛒 Ajouter au panier</button></div></article>`).join("");
 document.querySelector("#empty").style.display=list.length?"none":"block";
}
function save(){localStorage.setItem("virashop",JSON.stringify(cart))}
function add(id){let x=cart.find(a=>a.id===id);if(x)x.q++;else{let p=products.find(a=>a.id===id);cart.push({...p,q:1})}save();renderCart();openCart()}
function renderCart(){
 let qty=cart.reduce((a,x)=>a+x.q,0), total=cart.reduce((a,x)=>a+x.p*x.q,0);
 document.querySelector("#count").textContent=qty;document.querySelector("#total").textContent=money(total);document.querySelector("#grand").textContent=money(total);
 document.querySelector("#items").innerHTML=cart.length?cart.map(x=>`<div class="row"><div class="mini">${x.b}</div><div><h4>${x.n}</h4>${money(x.p)}<div class="qty"><button onclick="change(${x.id},-1)">−</button>${x.q}<button onclick="change(${x.id},1)">+</button><button onclick="removeItem(${x.id})">Supprimer</button></div></div><b>${money(x.p*x.q)}</b></div>`).join(""):"<p style='text-align:center;color:#777;padding:50px 10px'>Votre panier est vide.</p>";
}
function change(id,d){let x=cart.find(a=>a.id===id);if(!x)return;x.q+=d;if(x.q<1)cart=cart.filter(a=>a.id!==id);save();renderCart()}
function removeItem(id){cart=cart.filter(a=>a.id!==id);save();renderCart()}
function openCart(){document.querySelector("#drawer").classList.add("open");document.querySelector("#shade").classList.add("show")}
function closeCart(){document.querySelector("#drawer").classList.remove("open");document.querySelector("#shade").classList.remove("show")}
function filter(f){current=f;document.querySelectorAll(".filters button").forEach(b=>b.classList.toggle("selected",b.textContent.includes(f==="Tous"?"Tous":f==="Promo"?"Promotions":f)));render();document.querySelector("#produits").scrollIntoView({behavior:"smooth"})}
function checkout(){
 if(!cart.length){alert("Votre panier est vide.");return}
 const nom=prompt("Votre nom complet :");if(!nom)return;
 const tel=prompt("Votre numéro de téléphone :");if(!tel)return;
 const ville=prompt("Votre ville / commune :");if(!ville)return;
 const adresse=prompt("Votre adresse ou repère de livraison :");if(!adresse)return;
 const paiement=prompt("Mode de paiement (Orange Money, MTN MoMo, Moov Money, Wave ou à la livraison) :","À la livraison")||"À la livraison";
 const lines=cart.map(x=>`• ${x.n} x${x.q} — ${money(x.p*x.q)}`).join("\n");
 const total=cart.reduce((a,x)=>a+x.p*x.q,0);
 const msg=`Bonjour ViraShop 👋\n\nJe souhaite commander :\n${lines}\n\nTotal : ${money(total)}\nNom : ${nom}\nTéléphone : ${tel}\nVille/commune : ${ville}\nAdresse/repère : ${adresse}\nPaiement : ${paiement}`;
 window.open("https://wa.me/2250720136126?text="+encodeURIComponent(msg),"_blank");
}
document.querySelector("#openCart").onclick=openCart;
document.querySelector("#search").oninput=e=>{query=e.target.value;render()};
render();renderCart();
 
