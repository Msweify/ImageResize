# ImageResize
This project resizes images according to user choice 

The project includes the follwoing:
  1. src: This directory has all the typescript files
  2. images: This directory has all the images that can be resized
  3. package and tsconfig json files: These are used to configure the npm module as well as the typescript
  4. .prettierrc and .eslintrc: These files are used to configure prettier and eslint

Scripts to run:
  1. build: This script is used to compile typescript files in src directory to javascript files. Javascript files are created in dist file
  2. test: This script is used to run the created tests.
  3. prettier: This script is used to run prettier on typescrit and javascript fies
  4. eslint: This script is used to run the linting tool on typescript files
  5. start: This script is used to start serve using nodemon.
To run any script, use: "npm run <script name>"

To start the application:
  1. npm run build
  2. node dist/index
  3. open browser to: http://localhost:3000/api/images?filename=encenadaport&width=500&height=300
  4. Change image name, width and height as required.
  
To run the tests:
  1. npm run test
