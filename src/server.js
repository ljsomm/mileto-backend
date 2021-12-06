const app = require('./app')();

app.listen(app.get('port'), () => {
    console.log("Aplicação dísponivel em: http://localhost:" + app.get('port'));
});
