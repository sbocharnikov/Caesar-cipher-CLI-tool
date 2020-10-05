### Caesar cipher CLI tool
CLI tool that encodes and decodes a text by Caesar cipher.

CLI tool can accept 4 options (short alias and full name):

1. -s, --shift: a shift  
2. -i, --input: an input file
3. -o, --output: an output file
4. -a, --action: an action encode/decode

Shift and action are mandatory, others are optional.

If input argument is not provided then stdin will be used as input source. 
If input argument is provided but file isn't accessible then error will be shown.
The same is for writing.

To start CLI tool go to `app` folder and run  
`node app -s 1 -a encode`  
`node app -s 1 -a encode -i input.txt -o output.txt`
    
