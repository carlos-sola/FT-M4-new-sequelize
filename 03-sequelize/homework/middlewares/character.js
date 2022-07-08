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
      return res.status(201).send(newCharacter)
    } catch(error){
        return res.status(404).send("Error en alguno de los datos provistos")
    }
});

router.get("/", async(req,res)=>{
  const {race}= req.query;
  const {age}= req.query;
  let characters;
  try{
    if(race&&age){
      characters= await Character.findAll({
        where :{
          race:race,
          age: age
        }
      });
    }else if(race){
      characters= await Character.findAll({
        where:{
          race:race
        }
      });
    }else{
      characters = await Character.findAll();
      
    }
    res.send(characters)
  } catch (error){
      res.status(404).send('Hubo un error...')
  }
});

router.get("/young",async(req,res)=>{
  try{
    const characterYoung= await Character.findAll({
      where:{
        age: {
          [Op.lt]: 25,
        }
      }
    });
    res.send(characterYoung);
  }catch(error){
    res.status(404).send("Hubo un error...")
  }
});

router.get("/:code",async(req,res)=>{
    try{
      const characterCode= await Character.findByPk(req.params.code);
      if(characterCode){res.send(characterCode);
      }else{res.status(404).send(`El código ${req.params.code} no corresponde a un personaje existente`)}
    }catch(error){
      res.status(4004).send("Hubo un error...")
    }
});
router.put("/:attribute",async(req,res)=>{
  const{attribute}=req.params;
  const{value}=req.query;
  try{
    await Character.update({
     [attribute]:value,
   },{
     where:{
      [attribute] : null     
     }
   });

   res.send("Personajes actualizados")
  }catch(error){
    res.status(404).send("Hubo un error...")
  }
})

module.exports = router;
