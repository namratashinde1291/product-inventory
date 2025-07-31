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

const updateProduct = async(req,res) => {
    const {id} = req.params;
    const {name,price,stock,category_id} = req.body;
    try{
        const result = await db.query("update products set name =$1, price=$2, stock=$3,category_id=$4 where id=$5 returning *",[name,price,stock,category_id,id]);
        if(result.rows.length === 0)
            return res.status(404).json({error:'Product not updated'});
            res.json(result.rows[0]);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

const createProduct = async (req,res) =>{
    const {name, price, stock, category_id} =req.body;
    try{
        const result = await db.query("insert into products (name, price, stock, category_id) values ($1,$2,$3,$4) returning *",[name, price, stock, category_id]);
         res.status(201).json(result.rows[0]);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
};

function deleteProduct(req,res){
    const {id} = req.params;
    try{
        const result = db.query("update products set active=false where id = $1",[id]);
        res.json({ message: "Product marked as inactive" });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports = {getProducts, getProductById, updateProduct, createProduct, deleteProduct};