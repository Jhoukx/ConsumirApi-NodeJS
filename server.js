    import dotenv from 'dotenv';
    import express from 'express';
    import https from 'https';
    import fs from 'fs';
    import cors from 'cors';
    
    dotenv.config();

    const appExpress = express();
    appExpress.use(cors());
    const config = JSON.parse(process.env.MYCONFIG);

    appExpress.get('/index.html', function (req, res) {
        console.log(req.params.file);
        fs.readFile(`index.html`, 'utf-8', (error,file) => {
            error ? res.send('Error reading the file') : res.send(file)
        });
    });

    appExpress.get('/nasa',function (req, res) {
        const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-07-06&end_date=2023-07-07&api_key=mnjBLYR4oTKkv15GabbD0hOGTVNxS8NfDaroP9YN";
        const request = https.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                res.send(JSON.parse(data));
            });
        });
        request.on('error', (err) => {
            console.error('Error con la petición', err.message);
        });
    });

    appExpress.listen(config, function () {
        console.log(`Server is running on http://${config.hostname}:${config.port}/nasa`);
    });

