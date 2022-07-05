const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/',async (req,res)=>{
    const {code,name,age,race,hp,mana,data_added}= req.body;
    try {
      if(!code || !name || !hp || !mana){
        return res.status(404).send("Falta enviar datos obligatorios")
      }
      const newCharacter = await Character.create({
          code: code,
          name:name,
          age:age,
          race:race,
          hp: hp,
          mana: mana,
          data_added: data_added
      })
    } catch(error){
        return res.status(404).send("Error en alguno de los datos provistos")
    }
})

module.exports = router;
