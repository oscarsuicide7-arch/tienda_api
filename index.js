require('dotenv').config();
// OJO: Debe apuntar a './src/app' porque app.js está dentro de src
const app = require('./src/app'); 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});