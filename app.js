async function consumeApi() {
    try {
        const response = await fetch('http://127.0.0.1:5005/nasa');
        const result = await response.json();
        showData(result);
    } catch (error) {
        console.log('Ocurrió un error en la petición',error);
    }
};  
function showData(data) {
    const lastDay = data.near_earth_objects['2023-07-07'];
    const firstDay = data.near_earth_objects['2023-07-06'];
    const table = document.querySelector('#asteroidInfo');

    function createTableRow(element) {
        const tr = document.createElement('tr');
        const name = document.createElement('td');
        const size = document.createElement('td');
        const velocity = document.createElement('td');
        const approachDate = document.createElement('td');

        name.textContent = element.name;
        size.textContent = element.estimated_diameter.kilometers.estimated_diameter_max;
        velocity.textContent = element.close_approach_data[0].relative_velocity.kilometers_per_hour;
        approachDate.textContent = element.close_approach_data[0].close_approach_date;

        tr.appendChild(name);
        tr.appendChild(size);
        tr.appendChild(velocity);
        tr.appendChild(approachDate);

        return tr;
    }

    const asteroids = [...firstDay, ...lastDay];
    const tableRows = asteroids.map(createTableRow);

    tableRows.forEach(row => {
        table.appendChild(row);
    });
}
consumeApi()                                                                                                                               