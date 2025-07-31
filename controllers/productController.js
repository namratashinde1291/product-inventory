const db = require('../models/db');

const getProducts = async (req,res) => {
    try{;
        const result = await db.query(`select p.*,c.name as category_name from products 
            p left join categories c on p.category_id = c.id`)
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

module.exports = {getProducts};