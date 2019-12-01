const Sample = require('../models/Sample');

function verification(sample){
    if(sample.temperature >= 45 || sample.gas >= 1000){
        return "UnNormal"
    }
    else
        return "Normal"
}


const SampleController = {

    async getAll(req,res){
        let samples = await Sample.find().sort('-createdAt');
        return res.json(samples);
    },

    async getLast(req,res){
        let sample = await Sample.findOne().sort('-createdAt')
        return res.json(sample)
    },


    async getLasts(req,res){
        const samples = []
        for (let element of req.body) {
            console.log(element);
            samples.push(Sample.findOne({
                deviceName : element
            }).sort('-createdAt').then(r=>{
                console.log(r);
                return r
            }))
        }
        console.log(samples)
        return res.send(samples)
    },


    async insertSample(req,res){
        const body = req.body;
        body.status = verification(body)
        if(body.status === 'UnNormal'){
            io.emit('unNormalNotify',body);
        }
        return res.json(await Sample.create(body))
    }

}

module.exports = SampleController;