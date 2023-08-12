# csv-crafter

Craft CSV files effortlessly. This package equips you with the tools to construct, adjust, and enhance CSV data in a way that suits your needs.

## Installation

```bash
npm install csv-crafter
```
### Test code
```Js
const Csv = require('../csv');
const path = require('path');

const filePath = path.join(__dirname, 'addresses.csv');
const csvInstance = new Csv(filePath);

/*

Import csv

available methods:
    getHeader() -> returns header of the csv file
    getData() -> returns data of the csv file
    addData() -> appends data to the csv file & filter out duplicates

Note: all methods are async/await

*/

async function displayCsv(){
    const header = await csvInstance.getHeader();
    console.log(header);
    // [ 'FirsName', 'LastName', 'Address', 'State', 'Country', 'Pincode' ]

    const data = await csvInstance.getData();
    console.log(data);
    /*

        [
            {
                FirsName: 'John',
                LastName: 'Doe',
                Address: '120 jefferson st.',
                State: 'Riverside',
                Country: ' NJ',
                Pincode: ' 08075'
            },
        ]

    */

    const exampleDataObj =   {
        FirsName: 'kevin',
        LastName: 'tronte',
        Address: 'will milles',
        State: 'Riverside',
        Country: 'Tennesse',
        Pincode: '09023'
    };
    const exampleDataList = ['kevin','tronte','will milles','Riverside','Tennesse','09023'];
    const exampleObj = await csvInstance.addData(exampleDataObj);
    console.log(exampleDataObj);
    await csvInstance.addData(exampleDataList);
    console.log(exampleDataList);
}

displayCsv();
```