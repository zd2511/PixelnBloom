const $ = (s) => document.querySelector(s);
const cart = [];
const money = n => `$${n.toFixed(2)}`;
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2100)}
function renderCart(){
  $("#cartCount").textContent=cart.reduce((n,x)=>n+x.qty,0);
  $("#subtotal").textContent=money(cart.reduce((n,x)=>n+x.price*x.qty,0));
  const target=$("#cartItems");
  if(!cart.length){target.innerHTML='<p class="empty-cart">Your bag is waiting for something lovely.</p>';return}
  target.innerHTML=cart.map((item,i)=>`<div class="cart-line"><span>${item.name} × ${item.qty}<br><small>${money(item.price)} each</small></span><strong>${money(item.price*item.qty)}</strong><button data-remove="${i}" aria-label="Remove ${item.name}">×</button></div>`).join("");
  target.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart.splice(+b.dataset.remove,1);renderCart()}));
}
function openCart(){ $("#cartDrawer").classList.add("open");$("#overlay").classList.add("show");}
function closeCart(){ $("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show");}
document.querySelectorAll(".add-btn").forEach(btn=>btn.addEventListener("click",()=>{
  const card=btn.closest(".product-card"),name=card.dataset.name,price=Number(card.dataset.price);
  const found=cart.find(x=>x.name===name);if(found)found.qty++;else cart.push({name,price,qty:1});
  renderCart();toast(`${name} added to your bag`);
}));
document.querySelectorAll(".heart").forEach(btn=>btn.addEventListener("click",()=>{btn.classList.toggle("active");btn.textContent=btn.classList.contains("active")?"♥":"♡";toast(btn.classList.contains("active")?"Added to your loved list":"Removed from your loved list")}));
$("#cartToggle").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
$("#checkout").addEventListener("click",()=>toast(cart.length?"Demo checkout — connect your payment provider to accept orders.":"Your bag is empty"));
$("#searchToggle").addEventListener("click",()=>{$("#searchBar").classList.toggle("open");if($("#searchBar").classList.contains("open"))$("#searchInput").focus()});
function searchProducts(){const q=$("#searchInput").value.trim().toLowerCase();let count=0;document.querySelectorAll(".product-card").forEach(card=>{const show=card.dataset.name.toLowerCase().includes(q);card.style.display=show?"":"none";if(show)count++});toast(q?`${count} lovely find${count===1?"":"s"} found`:"Showing all finds");$("#new").scrollIntoView({behavior:"smooth"})}
$("#searchGo").addEventListener("click",searchProducts);$("#searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")searchProducts()});
$("#viewAll").addEventListener("click",()=>{document.querySelectorAll(".product-card").forEach(c=>c.style.display="");toast("You’re viewing the latest collection")});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="Thank you — you’re on the list!";e.target.reset()});
$("#wishlistTop").addEventListener("click",()=>{const count=document.querySelectorAll(".heart.active").length;toast(count?`${count} item${count===1?"":"s"} in your loved list`:"Tap a heart on a product to save it")});
$("#year").textContent=new Date().getFullYear();
