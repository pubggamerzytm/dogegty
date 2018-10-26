const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("766455948:AAGVXOOS5bkL2pDlxZ6sbh03cyVuAClMyyA");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'
var Client = require('coinbase').Client;
var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var acc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var con = mysql.createConnection({
    host: "bgdiheuar-mysql.services.clever-cloud.com",
    user: "uko7zijkihlgnqne",
    password: "hEwKE4U99SH9TuKhJ9y",
    database:"bgdiheuar"
});
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start

bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    if (message.text == start) {
        var chatid = ctx.from.id;
        var firstname = ctx.from.first_name;
        var bal = 0;
        var tim = new Date();
        var address = 'none';
        var power = 0;
        var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, power: power};
        con.query("insert into `account` SET ?", user, function (error, results) {
            ctx.reply('welcome' + ctx.from.first_name + '\n\n✨🔥 Easiest and most reliable dogecoin Mine Bot for Telegram!\n\n⚡️ Automatic payments!', Markup
                .keyboard([
                    ['👤ACCOUNT'], // Row1 with 2 buttons
                    ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                    ['🌎LANGUAGE', 'ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
                ])

                .resize()
                .extra())
        })
    } else if (message.text.split(start)[1] == id) {
        ctx.reply('🚫You cannot refer yourself', Markup
            .keyboard([
                ['👤ACCOUNT'], // Row1 with 2 buttons
                ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
            ])

            .resize()
            .extra())
    }else if (message.text.split(start)[1] !== id) {
        var chatd = message.text.split(start)[1]
        con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {
            console.log(result[0].ref)
            if (result[0].ref <= 0) {
                var refbonus = 25;
                var ref = 1;
                var refid = message.text.split(start)[1];
                var sql = "update `account` set `power` =power+ '" + refbonus + "', friends =friends+ " +
                    ref + ", ref = " + refid + " where `id` = '" + refid + "'";
                con.query(sql)
                console.log(err)
                ctx.reply('welcome' + ctx.from.first_name + '\n\n✨🔥 Easiest and most reliable dogecoin Mine Bot for Telegram!\n\n⚡️ Automatic payments!', Markup
                    .keyboard([
                        ['👤ACCOUNT'], // Row1 with 2 buttons
                        ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                        ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
                    ])

                    .resize()
                    .extra())
                con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                    ctx.telegram.sendMessage(result[0].id, 'you have a new refferal\nyou receive:+25🌟')


                })
            } else if (result[0].ref==ctx.message.text.split(start)[1]) {
                ctx.reply('🚫you have already used this link', Markup
                    .keyboard([
                        ['👤ACCOUNT'], // Row1 with 2 buttons
                        ['✨POWER', '💵PAYMENTS', '👨‍👧‍👦REFFERALS'], // Row2 with 2 buttons
                        ['🌎LANGUAGE', '❓ABOUT US'] // Row3 with 3 buttons Row3 with 3 buttons
                    ])

                    .resize()
                    .extra())
            }
        })
    }
})

bot.hears('👨‍👧‍👦REFFERALS',ctx => {
    const id = ctx.from.id
    con.query("SELECT friends FROM account WHERE id=" + id, function (err, result, fields) {
        ctx.reply('invite friends and get 25mhs for each friend\n your refferal link is:http://t.me/doge_testerbot?start=' + id + '\n\n invited refferals:' + result[0].friends+' 👥'+'\n\nearned from refferals: '+result[0].friends*25+'mhs')

    })
})


bot.startPolling()