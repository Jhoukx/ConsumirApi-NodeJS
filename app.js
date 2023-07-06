import https from 'https';

const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-07-06&end_date=2023-07-07&api_key=mnjBLYR4oTKkv15GabbD0hOGTVNxS8NfDaroP9YN';

https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
    });
}).on('error', (error) => {
    console.error(`Error al realizar la petición: ${error.message}`);
});
