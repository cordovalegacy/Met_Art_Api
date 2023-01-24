const ArtController = require("../controllers/Arts.js");

module.exports = (app) => {
    app.get('/api/art/:search', ArtController.getArtsByCulture);
    app.get('/api/art/critique/all', ArtController.getOpinions);
    app.get('/api/art/critique/:id', ArtController.getOneOpinion);
    app.put('/api/art/critique/edit/:id', ArtController.updateOpinions);
    app.post('/api/art/critique', ArtController.createOpinion);
    app.delete('/api/art/critique/:id', ArtController.deleteOpinion);
}