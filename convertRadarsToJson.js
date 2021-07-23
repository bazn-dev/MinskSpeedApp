const fs = require('fs');
const radarsWithTrash = fs.readFileSync('./radars.js', 'utf8');

const radarsData = radarsWithTrash
  .split('\n')
  .filter(line => {
    return line.match(/\.name/g) || line.match(/var lnglat/g);
  })
  .map(item => {
    const data = item.split('= ')[1];
    if (item.match(/new YMaps.GeoPoint/g)) {
      const latlng = data.replace('new YMaps.GeoPoint(', '').slice(0, -2);
      return {
        coordinate: {
          latitude: Number(latlng.split(', ')[1]),
          longitude: Number(latlng.split(', ')[0]),
        },
      };
    } else {
      return {
        title: data.slice(1, -2),
        description: data.slice(1, -2),
      };
    }
  });

//console.log(radarsData);

const radars = [];

for (let i = 0; i < radarsData.length; i = i + 2) {
  const coordinate = radarsData[i].coordinate;
  const info = radarsData[i + 1];
  radars.push({
    coordinate,
    info,
  });
}

fs.writeFileSync('./output/radars.json', JSON.stringify(radars));
