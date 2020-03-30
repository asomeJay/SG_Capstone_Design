import mysql from 'mysql';

export const insert_sensor = (device, unit, type, value, seq, ip) => {
    sensor_instance = {
        seq: seq,
        device: device,
        unit: unit,
        type: type,
        value: value,
        ip: ip.replace(/^.*:/, '')
    };

    var query = connection.query('insert into sensors set?', sensor_instance, (err, row, col) => {
        try {
            if (err) throw err;
            console.log("database insertion ok = %j", sensor_instance);
        } catch (error) {
            console.log(error);
        }
    })

};