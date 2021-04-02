//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/nsi'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/nsi/index.html'));
});

app.get('/api/data', function(request, reply) {
  let dbData = {
    "header": [{
    "type": "number",
    "name": "id",
    "description": "record's id"
  }, {
    "type": "number",
    "name": "parentId",
    "description": "record's parent id"
  }, {
    "type": "string",
    "name": "fullname",
    "description": "Полное наименование"
  }],
    "body": [
    ["0", "", "Запись справочника http №1", "Опубликованная", "IC_PROP", "26.06.2026", "26.08.2027", "18.10.2014"],
    ["1", "", "Запись справочника http №2", "Новая", "IC_PROP", "10.10.2015", "08.01.2019", "20.01.2013"],
    ["2", "", "Запись справочника http №3", "Опубликованная", "IC_PROP", "31.12.2016", "18.11.2021", "18.08.2018"],
    ["3", "", "Запись справочника http №4", "Новая", "IC_PROP", "26.01.2019", "12.12.2020", "13.01.2021"],
    ["4", "", "Запись справочника http №5", "Опубликованная", "IC_CTR_OP", "08.03.2030", "26.11.2033", "08.05.2025"],
    ["5", "", "Запись справочника http №6", "Новая", "IC_CTR_OP", "22.03.2016", "22.09.2020", "12.08.2024"],
    ["6", "", "Запись справочника http №7", "Опубликованная", "IC_PROP", "19.04.2019", "13.09.2023", "27.10.2026"],
    ["7", "", "Запись справочника http №8", "Новая", "IC_CTR_OP", "19.04.2028", "27.07.2030", "02.09.2020"]
  ]
  }
  console.log('get data request');
  reply.send(dbData);
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, (err, address) => {
  console.log(`start server on ${address}`);
});

