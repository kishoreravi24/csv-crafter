const fs = require('fs');
const path = require('path');

class Csvcrafter {
    constructor(filePath) {
        try {
            this.filePath = path.resolve(filePath);
            this.csvData = null;
            this.csvRow = [];
            this.csvHeader = [];
            this.csvPromise = new Promise((resolve, reject) => {
                fs.readFile(this.filePath, 'utf-8', (err, data) => {
                    if (err) {
                        console.log("Error in reading data from the file.");
                        reject(err);
                    } else {
                        this.csvData = data.split("\n");
                        this.csvParser(data);
                        resolve(data);
                    }
                });
            });
        } catch (err) {
            console.log("Error in reading the file.");
        }
    }

    csvParser(data) {
        const rows = data.split("\n");
        this.csvHeader = rows[0].split(",");
        this.csvRow = rows.slice(1).map(row => {
            const values = row.split(',');
            const rowData = {};
            this.csvHeader.forEach((key, index) => {
                if (values[index]) {
                    rowData[key] = values[index];
                }
            });
            return rowData;
        });
    }

    async getHeader() {
        await this.csvPromise;
        return this.csvHeader;
    }

    async getData() {
        await this.csvPromise;
        return this.csvRow;
    }

    async addData(appendData) {
        this.newData = null;
        if (Array.isArray(appendData) && appendData != null) {
            if (this.csvHeader.length == appendData.length) {
                this.newData = appendData.join(',');
            }
        } else if (typeof appendData === 'object' && appendData != null) {
            const length = Object.keys(appendData).length;
            if (this.csvHeader.length == length) {
                this.newData = Object.values(appendData).join(',');
            }
        }
        if(!this.csvData.includes(this.newData)){
            fs.appendFile(this.filePath,"\n"+this.newData,(err) => {
                if(err){
                    console.log("Error in appending data to the file");
                }
            })
            this.csvData.push(this.newData);
        }      
    }


}

module.exports = Csvcrafter;
