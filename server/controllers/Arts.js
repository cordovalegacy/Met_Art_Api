const axios = require("axios");
const Opinion = require('../models/opinions');

    const culture = ["american", "asian", "european","african"]
    const getArtCollection = async (queryString) => {
        const response = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/search?" + queryString);
        const totalCultureData = await response.data;
        return totalCultureData;
    }

    const getSingleArt = async (totalCultureData) => {
        const res = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/" 
                    + totalCultureData.objectIDs[Math.floor(Math.random() * totalCultureData.total) + 1]);
            const singleCultureArt = await res.data;
            
            return singleCultureArt;
    }
    

    module.exports = {
        //@desc         Get Single Art by culture
        //@route        GET /api/art/:culture
        
        getArtsByCulture: async (req, res) => {
            const searchString = req.params.search.includes("dateBegin") 
                    ? req.params.search + "&q=" + culture[Math.floor(Math.random() * culture.length) -1 ]
                    : "artistOrCulture=true&q=" + req.params.search;
            try {
                const totalCultureData = await getArtCollection(searchString);
                const singleCultureArt = await getSingleArt(totalCultureData);
                res.status(200).json(singleCultureArt)
                
            } catch (error) {
                console.log("Test error")
                res.status(400).json(error);
            }
        },
    
        createOpinion: (req, res) => {
            console.log('!!!opinion info!!!', req.body)
            Opinion.create(req.body)
                //.then(resp => resp.json())
                .then(opinion => 
                    {
                        console.log('===posting opinion', opinion)
                        return res.json(opinion)
                    }
                    )
                .catch((error) => { res.status(400).json({error}) });
            },

        updateOpinions: async (req, res) => {
            try {
                const updatedOpinions = await Opinion.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
                res.status(200).json(updatedOpinions)
            } catch (error) { res.status(400).json({error}) };
        },

        getOneOpinion: async (req, res) => {
            try {
                const oneOpinion = await Opinion.findOne({_id: req.params.id})
                res.status(200).json(oneOpinion)
            } catch (error) { res.status(400).json({error}) };
        },

        getOpinions: async (req, res) => {
            try {
                const opinions = await Opinion.find();
                res.status(200).json(opinions);
            } catch (error) { res.status(400).json({error}) };
        },
        
        deleteOpinion: (req, res) => {
            console.log(req.params);
            Opinion.deleteOne({_id: req.params.id})
            .then(deleteOpinion => res.json(deleteOpinion))
            .catch((err) => { res.status(400).json({err}) });
        },
}
