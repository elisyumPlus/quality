// Tema geçişi
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
document.body.classList.toggle("light");
document.body.classList.toggle("dark");
});


// Yerel depolama anahtarları
const STORAGE_KEY = "istek_listesi";


// Talep gönderme
const sendBtn = document.getElementById("sendRequest");
if (sendBtn) {
sendBtn.onclick = () => {
const platform = document.getElementById("platform").value;
const service = document.getElementById("service").value;
const link = document.getElementById("link").value;
const note = document.getElementById("note").value;


const newReq = {
platform,
service,
link,
note,
status: "Hazırlanıyor"
};


let list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
list.push(newReq);
localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
location.reload();
};
}


// Talepleri listeleme (kullanıcı)
const table = document.querySelector("#requestsTable tbody");
if (table) {
let list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
list.forEach((r, i) => {
table.innerHTML += `
<tr>
<td>${r.platform}</td>
<td>${r.service}</td>
<td><a href="${r.link}" target="_blank">Link</a></td>
<td>${r.status}</td>
<td><button onclick="alert('Durum: ${r.status}')">Detay</button></td>
</tr>`;
});
}


// Admin listeleme
const adminTable = document.querySelector("#adminTable tbody");
if (adminTable) {
let list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


list.forEach((r, i) => {
adminTable.innerHTML += `
<tr>
<td>${r.platform}</td>
<td>${r.service}</td>
<td><a href="${r.link}" target="_blank">Link</a></td>
<td>${r.note || '-'}</td>
<td>${r.status}</td>
<td>
<select onchange="updateStatus(${i}, this.value)">
<option value="Hazırlanıyor">Hazırlanıyor</option>
<option value="Tamamlandı">Tamamlandı</option>
</select>
</td>
</tr>`;
});
}


function updateStatus(i, newStatus) {
let list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
list[i].status = newStatus;
localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
location.reload();
}
