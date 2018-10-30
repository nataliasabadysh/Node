const fs = require('fs');
const path = require('path');// путь ЮРЛ + картинки

const motocycleRoute = (request, response) => {
  const filePath = path.join(__dirname, '../../../', 'assets', 'yamaha-v-star-1300-1.jpg');

  const image = fs.statSync(filePath);// создание файла
    // statSync - статичтика файла, все фун-и и  чтения файлов Асинхронные и что бы не блокировать лучше делать Синхр

  response.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Length': image.size
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(response);
};

module.exports = motocycleRoute;
