document.getElementById('contact').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
console.log("Données envoyées :", data);



  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Message envoyé !");
    } else {
       console.log("Code erreur :", response.status);
      alert("Échec de l'envoi.");
    }
  } catch (error) {
    alert("Erreur de connexion au serveur.");
  }
});
