const yargs = require('yargs')

const {getPdf} = require('./services/getPdf');

yargs.command({
    command:'scrape',
    describe:'Fuck TOI. Just give the URL',
    builder:{
        url:{
            describe: 'url of the link',
            demandOption:true,
            type:'string'
        }
    },

   async handler(argv){
        const lalle = await getPdf(argv.url)
        console.log('Successfuly written')
    }
})

yargs.parse();