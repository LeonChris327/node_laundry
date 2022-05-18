'use strict'
const db = require("../db");

//GET endpoints

module.exports = {
    getData: (req,res) => {
        let sql = "select * from tb_cuci_komplit";
        db.query(sql, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    data: result
                })
            }
        })
    },
    selectData: (req,res) => {
        let id = req.params.id;
        let sql = "select * from tb_cuci_komplit where id_ck = ?";
        db.query(sql, id, (err,result) => {
            if(err){
                throw err;
            }else{
                if(result[0]){
                    res.json({
                        data: result[0]
                    })
                }else{
                    res.json({
                        message: "Data not found."
                    })
                }
            }
        })        
    },

    //CRUD data

    add: (req,res) => {
        const { nama_paket_ck, waktu_kerja_ck, kuantitas_ck, tarif_ck } = req.body;
        if(!nama_paket_ck || !waktu_kerja_ck || !kuantitas_ck || !tarif_ck ) {


            res.status(402).json({
                message: "Please fill all the required fields."
            })
        }else{
            return db.query('insert into tb_cuci_komplit set ?', { nama_paket_ck, waktu_kerja_ck, kuantitas_ck, tarif_ck }, (err, result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "Data added",
                        data: result
                    })
                }
            })
        }
    },
    delete: (req,res) => {
        let id = req.params.id;
        let sql = "delete from tb_cuci_komplit where id_ck = ?";
        db.query(sql,id, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Row deleted with id_ck = ${id}.`
                })
            }
        })        
    },
    update: (req,res) => {
        let id = req.params.id;
        let data = {
            
            nama_paket_ck: req.body.nama_paket_ck, 
            waktu_kerja_ck: req.body.waktu_kerja_ck,
            kuantitas_ck: req.body.kuantitas_ck, 
            tarif_ck: req.body.tarif_ck,
          
        }
        let sql = "update tb_cuci_komplit set ? where id_ck = ?";
        db.query(sql,[data, id], (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Row updated with id = ${id}.`,
                    data
                })
            }
        })        
    }
}