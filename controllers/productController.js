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

const getProductById = async (req,res) => {
    const { id } = req.params;
    try{
        const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
        if(result.rows.length == 0)
            return res.status(404).json({error:'Product not found'});
            res.json(result.rows[0]);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

module.exports = {getProducts, getProductById};