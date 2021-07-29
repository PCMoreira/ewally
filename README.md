# ewally
Check barcode - Ewally


## Requirements

- node 10.16.0
- nodemon (Suggested: 1.19.4 - Not Required)


## Running in local
``` bash
# change the file .env.example to .env
mv .env.example .env

# install dependences
npm install

# serve with hot reload at localhost:3000
npm run start
npm run dev (NODEMON)


# Running basic tests with coverage
npm run test


# Example request
- http://localhost:3000/v1/barcodes?code=00190500954014481606906809350314337370000000100 (Success)
- http://localhost:3000/v1/barcodes?code=00190500954014481606906809350314037370000000100 (Error)
